import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CallingService } from './calling.service';
import { IceConfigService } from './ice-config.service';
import { OnlineUserService } from '../online-user/online-user.service';
import { SfuService } from './sfu.service';
import type {
    SfuCreateTransportPayload,
    SfuConnectTransportPayload,
    SfuProducePayload,
    SfuConsumePayload,
} from './sfu.types';
import type {
    RegisterUserPayload,
    JoinCallSocketPayload,
    SignalPayload,
    CallInvitationPayload,
    AcceptCallPayload,
    RejectCallPayload,
    LeaveCallSocketPayload,
} from '@app/common/interfaces/webrtc.interface';

@WebSocketGateway({
    namespace: '/calling',
    cors: { origin: '*' },
    transports: ['websocket', 'polling'],
})
export class CallingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // socket.id → participantUuid
    private readonly socketToParticipant = new Map<string, string>();

    constructor(
        private readonly callingService: CallingService,
        private readonly iceConfigService: IceConfigService,
        private readonly onlineUserService: OnlineUserService,
        private readonly sfuService: SfuService,
    ) {
        this.sfuService.onProducerClosed = (producerId: string, callUuid: string) => {
            this.server.to(callUuid).emit('sfu-producer-closed', { producerId });
        };
    }

    // ─── Lifecycle ───────────────────────────────────────────────────────────

    async handleConnection(client: Socket) {
        console.log(`[CallingGateway] Connected: ${client.id}`);
        // Send current online users to the newly connected client
        const users = this.onlineUserService.getAll();
        client.emit('users-online', users);
    }

    async handleDisconnect(client: Socket) {
        console.log(`[CallingGateway] Disconnected: ${client.id}`);
        await this.cleanupOnDisconnect(client);
    }

    // ─── User Registration ────────────────────────────────────────────────────

    @SubscribeMessage('register-user')
    async handleRegisterUser(
        @MessageBody() data: RegisterUserPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { userId, userName } = data;

        if (!userName?.trim()) {
            client.emit('error', { message: 'USERNAME_REQUIRED' });
            return;
        }

        const onlineUsers = this.onlineUserService.register(userId, userName, client.id);
        client['userId'] = userId;

        // Broadcast updated online list to everyone
        this.server.emit('users-online', onlineUsers);
    }

    // ─── Join Call Room ───────────────────────────────────────────────────────

    @SubscribeMessage('join-call')
    async handleJoinCall(
        @MessageBody() data: JoinCallSocketPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { callUuid, participantUuid, userName } = data;

        try {
            const call = await this.callingService.getCallByUuid(callUuid);

            // Update participant socket mapping in DB
            await this.callingService.updateParticipantSocket({ participantUuid, socketId: client.id });

            this.socketToParticipant.set(client.id, participantUuid);
            client.join(callUuid);

            // Notify others in the room
            client.to(callUuid).emit('participant-joined', {
                participantUuid,
                userName,
                participantCount: call.participants?.length ?? 0,
            });

            // Send current participants + ICE config to the joining client
            const iceConfig = this.iceConfigService.getIceConfig();
            client.emit('call-joined', {
                callUuid,
                participants: (call.participants || [])
                    .filter(p => p.participantUuid !== participantUuid)
                    .map(p => ({ participantUuid: p.participantUuid, userName: p.userName })),
                iceServers: iceConfig.iceServers,
            });

            // SFU setup — skip if client explicitly opts out
            if ((data as JoinCallSocketPayload & { sfuSupported?: boolean }).sfuSupported === false) {
                client.emit('sfu-not-supported', { callUuid });
                return;
            }

            try {
                // Create router if one doesn't already exist for this call (idempotent)
                if (!this.sfuService.getRouter(callUuid)) {
                    await this.sfuService.createRouter(callUuid);
                }

                await this.sfuService.createWebRtcTransport(callUuid, participantUuid, 'send');
                await this.sfuService.createWebRtcTransport(callUuid, participantUuid, 'recv');
                this.sfuService.trackParticipantJoined(callUuid);
            } catch (sfuError) {
                // SFU setup failure must not fail the join — log and continue
                console.error(`[CallingGateway] SFU setup failed for participant ${participantUuid} in call ${callUuid}: ${(sfuError as Error).message}`);
            }
        } catch (error) {
            client.emit('error', { message: error.message });
        }
    }

    // ─── WebRTC Signaling ─────────────────────────────────────────────────────

    @SubscribeMessage('signal')
    async handleSignal(
        @MessageBody() data: SignalPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { callUuid, targetParticipantUuid, signal, type } = data;
        const fromParticipantUuid = this.socketToParticipant.get(client.id);

        if (!fromParticipantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        if (targetParticipantUuid) {
            // Unicast to specific participant
            const target = await this.callingService.getParticipantByUuid(targetParticipantUuid);
            if (target?.socketId) {
                this.server.to(target.socketId).emit('signal', { fromParticipantUuid, signal, type });
            }
        } else {
            // Broadcast to all in the call room
            client.to(callUuid).emit('signal', { fromParticipantUuid, signal, type });
        }
    }

    // ─── Call Invitation ──────────────────────────────────────────────────────

    @SubscribeMessage('send-call-invitation')
    async handleSendInvitation(
        @MessageBody() data: CallInvitationPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { targetUserId, callUuid, callType, callerId, callerName } = data;

        const targetUser = this.onlineUserService.getOne(targetUserId);
        if (!targetUser) {
            client.emit('invitation-result', { success: false, error: 'USER_OFFLINE' });
            return;
        }

        this.server.to(targetUser.socketId!).emit('incoming-call', {
            callUuid,
            callType,
            callerId,
            callerName,
        });

        client.emit('invitation-result', { success: true });
    }

    // ─── Accept / Reject Call ─────────────────────────────────────────────────

    @SubscribeMessage('accept-call')
    async handleAcceptCall(
        @MessageBody() data: AcceptCallPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { callUuid, callerId } = data;
        const caller = this.onlineUserService.getOne(callerId);

        if (caller?.socketId) {
            const accepter = this.onlineUserService.getOne(client['userId']);
            this.server.to(caller.socketId).emit('call-accepted', {
                callUuid,
                acceptedBy: client['userId'],
                acceptedByName: accepter?.userName ?? 'User',
            });
        }
    }

    @SubscribeMessage('reject-call')
    async handleRejectCall(
        @MessageBody() data: RejectCallPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { callUuid, callerId } = data;
        const caller = this.onlineUserService.getOne(callerId);

        if (caller?.socketId) {
            const rejecter = this.onlineUserService.getOne(client['userId']);
            this.server.to(caller.socketId).emit('call-rejected', {
                callUuid,
                rejectedBy: client['userId'],
                rejectedByName: rejecter?.userName ?? 'User',
            });
        }
    }

    // ─── Leave Call ───────────────────────────────────────────────────────────

    @SubscribeMessage('leave-call')
    async handleLeaveCall(
        @MessageBody() data: LeaveCallSocketPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const { callUuid, reason = 'left' } = data || {};

        if (callUuid) {
            const user = this.onlineUserService.getOne(client['userId']);
            client.to(callUuid).emit('user-left-call', {
                userId: client['userId'],
                userName: user?.userName ?? 'User',
                reason,
            });
        }

        await this.cleanupOnDisconnect(client);
    }

    // ─── SFU Signaling ────────────────────────────────────────────────────────

    @SubscribeMessage('sfu-get-rtp-capabilities')
    async handleSfuGetRtpCapabilities(
        @MessageBody() data: { callUuid: string },
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { callUuid } = data;
            const router = this.sfuService.getRouter(callUuid);
            if (!router) {
                client.emit('error', { message: 'ROUTER_NOT_FOUND' });
                return;
            }
            client.emit('sfu-rtp-capabilities', { rtpCapabilities: router.rtpCapabilities });
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-create-transport')
    async handleSfuCreateTransport(
        @MessageBody() data: SfuCreateTransportPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { callUuid, direction } = data;
            const transport = await this.sfuService.createWebRtcTransport(callUuid, participantUuid, direction);
            client.emit('sfu-transport-created', {
                transportId: transport.id,
                iceParameters: transport.iceParameters,
                iceCandidates: transport.iceCandidates,
                dtlsParameters: transport.dtlsParameters,
                sctpParameters: transport.sctpParameters,
            });
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-connect-transport')
    async handleSfuConnectTransport(
        @MessageBody() data: SfuConnectTransportPayload,
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { transportId, dtlsParameters } = data;
            await this.sfuService.connectTransport(transportId, dtlsParameters);
            client.emit('sfu-transport-connected', { transportId });
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-produce')
    async handleSfuProduce(
        @MessageBody() data: SfuProducePayload,
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { transportId, kind, rtpParameters } = data;
            const meta = this.sfuService.getTransportMeta(transportId);
            const callUuid = meta?.callUuid;

            const producer = await this.sfuService.createProducer(transportId, rtpParameters, kind);
            client.emit('sfu-produced', { producerId: producer.id });

            if (callUuid) {
                client.to(callUuid).emit('sfu-new-producer', { producerId: producer.id, participantUuid });
            }
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-consume')
    async handleSfuConsume(
        @MessageBody() data: SfuConsumePayload,
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { callUuid, producerId, rtpCapabilities } = data;
            const consumer = await this.sfuService.createConsumer(callUuid, participantUuid, producerId, rtpCapabilities);
            client.emit('sfu-consumed', {
                consumerId: consumer.id,
                producerId: consumer.producerId,
                kind: consumer.kind,
                rtpParameters: consumer.rtpParameters,
            });
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-consumer-resume')
    async handleSfuConsumerResume(
        @MessageBody() data: { consumerId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            await this.sfuService.resumeConsumer(data.consumerId);
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-producer-pause')
    async handleSfuProducerPause(
        @MessageBody() data: { producerId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { producerId } = data;
            await this.sfuService.pauseProducer(producerId);
            const meta = this.sfuService.getProducerMeta(producerId);
            if (meta?.callUuid) {
                client.to(meta.callUuid).emit('sfu-producer-paused', { producerId });
            }
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    @SubscribeMessage('sfu-producer-resume')
    async handleSfuProducerResume(
        @MessageBody() data: { producerId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (!participantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }

        try {
            const { producerId } = data;
            await this.sfuService.resumeProducer(producerId);
            const meta = this.sfuService.getProducerMeta(producerId);
            if (meta?.callUuid) {
                client.to(meta.callUuid).emit('sfu-producer-resumed', { producerId });
            }
        } catch (error) {
            client.emit('error', { message: (error as Error).message });
        }
    }

    // ─── Cleanup ──────────────────────────────────────────────────────────────

    private async cleanupOnDisconnect(client: Socket) {
        const participantUuid = this.socketToParticipant.get(client.id);

        if (participantUuid) {
            try {
                const participant = await this.callingService.getParticipantByUuid(participantUuid);
                if (participant?.callId) {
                    const call = await this.callingService.getCallById(participant.callId);
                    if (call) {
                        const callUuid = call.callUuid!;

                        await this.callingService.leaveCall({ callUuid, participantUuid });

                        client.to(callUuid).emit('participant-left', {
                            participantUuid,
                            participantCount: Math.max(0, (call.participants?.length ?? 1) - 1),
                        });

                        // Close participant's SFU transports
                        this.sfuService.closeParticipantTransports(participantUuid);

                        // Close all producers owned by this participant
                        const producerIds = this.sfuService.getProducersByParticipant(participantUuid);
                        for (const producerId of producerIds) {
                            this.sfuService.closeProducer(producerId);
                            // sfu-producer-closed is broadcast via the onProducerClosed callback set in the constructor
                        }

                        // If the call has ended, release the SFU router
                        try {
                            const updatedCall = await this.callingService.getCallByUuid(callUuid);
                            if (updatedCall.status === 'ended') {
                                this.sfuService.closeRouter(callUuid);
                            }
                        } catch (_) {
                            // call may already be cleaned up
                        }
                    }
                }
            } catch (_) {
                // participant may already be gone
            }

            this.socketToParticipant.delete(client.id);
        }

        // Remove from online users and broadcast updated list
        if (client['userId']) {
            this.onlineUserService.remove(client['userId']);
            const onlineUsers = this.onlineUserService.getAll();
            this.server.emit('users-online', onlineUsers);
        }
    }
}
