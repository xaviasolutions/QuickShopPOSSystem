import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CALLING_SERVICE_PATTERNS } from '@app/common/constants/patterns';
import { CallingService } from './calling.service';
import { Call } from '@app/database/models/call.model';
import { CallParticipant } from '@app/database/models/call-participant.model';
import type { CreateCallInput, JoinCallInput, LeaveCallInput, UpdateSocketInput } from '@app/common/interfaces/calling.interface';
import type { ApiRequest } from '@app/common/interfaces/request.interface';

@Controller()
export class CallingController {
    constructor(private readonly callingService: CallingService) {}

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.CREATE)
    async createCall(@Payload() data: ApiRequest<CreateCallInput>): Promise<Call> {
        try {
            return await this.callingService.createCall(data.data);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_ONE)
    async getCall(@Payload() callUuid: string): Promise<Call> {
        try {
            return await this.callingService.getCallByUuid(callUuid);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_ALL)
    async getAllCalls(@Payload() data: ApiRequest<{ status?: string }>): Promise<Call[]> {
        try {
            return await this.callingService.getAllCalls(data.data?.status);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.JOIN)
    async joinCall(@Payload() data: ApiRequest<JoinCallInput>): Promise<{ participant: CallParticipant; call: Call; otherParticipants: CallParticipant[] }> {
        try {
            return await this.callingService.joinCall(data.data);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_JOIN_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.LEAVE)
    async leaveCall(@Payload() data: ApiRequest<LeaveCallInput>): Promise<{ success: boolean }> {
        try {
            return await this.callingService.leaveCall(data.data);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_LEAVE_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.END)
    async endCall(@Payload() data: ApiRequest<{ callUuid: string }>): Promise<{ success: boolean }> {
        try {
            return await this.callingService.endCall(data.data.callUuid);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_END_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_PARTICIPANTS)
    async getParticipants(@Payload() callUuid: string): Promise<CallParticipant[]> {
        try {
            return await this.callingService.getParticipants(callUuid);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_GET_PARTICIPANTS_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.UPDATE_SOCKET)
    async updateSocket(@Payload() data: UpdateSocketInput): Promise<CallParticipant> {
        try {
            return await this.callingService.updateParticipantSocket(data);
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_UPDATE_SOCKET_ERROR', status: error.getStatus?.() || 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_ICE_SERVERS)
    getIceServers(): object {
        try {
            return this.callingService.getIceServers();
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_ICE_SERVERS_ERROR', status: 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_TURN_CONFIG)
    getTurnConfig(): object {
        try {
            return this.callingService.getTurnConfig();
        } catch (error) {
            throw new RpcException({ message: error.message || 'CALL_TURN_CONFIG_ERROR', status: 400 });
        }
    }
}
