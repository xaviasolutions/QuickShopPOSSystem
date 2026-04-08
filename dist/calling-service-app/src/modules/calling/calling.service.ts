import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FindOptions, Op } from 'sequelize';
import { CallRepository } from '@app/database/repositories/call.repository';
import { CallParticipantRepository } from '@app/database/repositories/call-participant.repository';
import { Call } from '@app/database/models/call.model';
import { CallParticipant } from '@app/database/models/call-participant.model';
import { IceConfigService } from './ice-config.service';
import type { CreateCallInput, JoinCallInput, LeaveCallInput, UpdateSocketInput } from '@app/common/interfaces/calling.interface';

@Injectable()
export class CallingService {
    constructor(
        private readonly callRepository: CallRepository,
        private readonly participantRepository: CallParticipantRepository,
        private readonly iceConfigService: IceConfigService,
    ) {}

    async createCall(input: CreateCallInput): Promise<Call> {
        try {
            const { callType = 'video', isGroup = false, maxParticipants = 10 } = input || {};
            return await this.callRepository.create({
                callUuid: uuidv4(),
                callType,
                isGroup,
                maxParticipants: isGroup ? maxParticipants : 2,
                status: 'active',
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getCallByUuid(callUuid: string): Promise<Call> {
        try {
            const call = await this.callRepository.findOne({
                where: { callUuid },
                include: [{ model: CallParticipant, where: { leftAt: { [Op.is]: null } as any }, required: false }],
            });
            if (!call) throw new NotFoundException('CALL_NOT_FOUND');
            return call;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getAllCalls(status?: string): Promise<Call[]> {
        try {
            const options: FindOptions<Call> = {
                where: status ? { status } : {},
                include: [{ model: CallParticipant, where: { leftAt: { [Op.is]: null } as any }, required: false }],
            };
            return await this.callRepository.findAll(options);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async joinCall(input: JoinCallInput): Promise<{ participant: CallParticipant; call: Call; otherParticipants: CallParticipant[] }> {
        try {
            const { callUuid, userName, userId } = input;

            const call = await this.callRepository.findOne({
                where: { callUuid },
                include: [{ model: CallParticipant, where: { leftAt: { [Op.is]: null } as any }, required: false }],
            });
            if (!call) throw new NotFoundException('CALL_NOT_FOUND');
            if (call.status === 'ended') throw new BadRequestException('CALL_ALREADY_ENDED');

            const activeParticipants: CallParticipant[] = call.participants || [];

            if (userId) {
                const existing = activeParticipants.find(p => p.userId === userId);
                if (existing) {
                    return {
                        participant: existing,
                        call,
                        otherParticipants: activeParticipants.filter(p => p.userId !== userId),
                    };
                }
            }

            if (activeParticipants.length >= call.maxParticipants) {
                throw new BadRequestException('CALL_IS_FULL');
            }

            const participant = await this.participantRepository.create({
                callId: call.id,
                participantUuid: uuidv4(),
                userName,
                userId: userId || undefined,
            });

            return {
                participant,
                call,
                otherParticipants: activeParticipants,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async leaveCall(input: LeaveCallInput): Promise<{ success: boolean }> {
        try {
            const { callUuid, participantUuid } = input;

            const call = await this.callRepository.findOne({ where: { callUuid } });
            if (!call) throw new NotFoundException('CALL_NOT_FOUND');

            const participant = await this.participantRepository.findOne({
                where: { participantUuid, callId: call.id },
            });
            if (!participant) throw new NotFoundException('PARTICIPANT_NOT_FOUND');

            await participant.update({ leftAt: new Date() });

            const remaining = await this.participantRepository.findAll({
                where: { callId: call.id, leftAt: { [Op.is]: null } as any },
            });

            if (remaining.length === 0) {
                await call.update({ status: 'ended' });
            }

            return { success: true };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async endCall(callUuid: string): Promise<{ success: boolean }> {
        try {
            const call = await this.callRepository.findOne({ where: { callUuid } });
            if (!call) throw new NotFoundException('CALL_NOT_FOUND');

            await call.update({ status: 'ended' });

            const activeParticipants = await this.participantRepository.findAll({
                where: { callId: call.id, leftAt: { [Op.is]: null } as any },
            });

            for (const p of activeParticipants) {
                await p.update({ leftAt: new Date() });
            }

            return { success: true };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getParticipants(callUuid: string): Promise<CallParticipant[]> {
        try {
            const call = await this.callRepository.findOne({ where: { callUuid } });
            if (!call) throw new NotFoundException('CALL_NOT_FOUND');

            return await this.participantRepository.findAll({
                where: { callId: call.id, leftAt: { [Op.is]: null } as any },
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async updateParticipantSocket(input: UpdateSocketInput): Promise<CallParticipant> {
        try {
            const { participantUuid, socketId } = input;
            const participant = await this.participantRepository.findOne({ where: { participantUuid } });
            if (!participant) throw new NotFoundException('PARTICIPANT_NOT_FOUND');
            return await participant.update({ socketId });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getParticipantByUuid(participantUuid: string): Promise<CallParticipant | null> {
        return this.participantRepository.findOne({ where: { participantUuid } });
    }

    async getCallById(callId: number): Promise<Call | null> {
        return this.callRepository.findOne({
            where: { id: callId },
            include: [{ model: CallParticipant, where: { leftAt: { [Op.is]: null } as any }, required: false }],
        });
    }

    getIceServers(): object {
        return this.iceConfigService.getIceConfig();
    }

    getTurnConfig(): object {
        return this.iceConfigService.getTurnConfigResponse();
    }
}
