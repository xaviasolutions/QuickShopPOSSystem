import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CallingService } from './calling.service';
import { CallRepository } from '@app/database/repositories/call.repository';
import { CallParticipantRepository } from '@app/database/repositories/call-participant.repository';
import { IceConfigService } from './ice-config.service';
import { Call } from '@app/database/models/call.model';
import { CallParticipant } from '@app/database/models/call-participant.model';
import { Op } from 'sequelize';

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockCall = (overrides: Partial<Call> = {}): Partial<Call> => ({
    id: 1,
    callUuid: 'test-call-uuid-1234',
    callType: 'video',
    isGroup: false,
    maxParticipants: 2,
    status: 'active',
    isDeleted: false,
    participants: [],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    update: jest.fn().mockImplementation(function (data) {
        Object.assign(this, data);
        return Promise.resolve(this);
    }),
    ...overrides,
});

const mockParticipant = (overrides: Partial<CallParticipant> = {}): Partial<CallParticipant> => ({
    id: 1,
    callId: 1,
    participantUuid: 'test-participant-uuid-1234',
    userName: 'Alice',
    userId: 'user-alice',
    socketId: undefined,
    leftAt: undefined,
    createdAt: new Date('2026-01-01'),
    update: jest.fn().mockImplementation(function (data) {
        Object.assign(this, data);
        return Promise.resolve(this);
    }),
    ...overrides,
});

const mockCallRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    findAndCountAll: jest.fn(),
    delete: jest.fn(),
};

const mockParticipantRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
};

// ─── Test Suite ───────────────────────────────────────────────────────────────

describe('CallingService', () => {
    let service: CallingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CallingService,
                { provide: CallRepository, useValue: mockCallRepository },
                { provide: CallParticipantRepository, useValue: mockParticipantRepository },
                IceConfigService,
            ],
        }).compile();

        service = module.get<CallingService>(CallingService);
        jest.clearAllMocks();
    });

    // ─── createCall ──────────────────────────────────────────────────────────

    describe('createCall', () => {
        it('should create a video call with defaults', async () => {
            const call = mockCall();
            mockCallRepository.create.mockResolvedValue(call);

            const result = await service.createCall({ callType: 'video', isGroup: false });

            expect(mockCallRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({ callType: 'video', isGroup: false, status: 'active', maxParticipants: 2 })
            );
            expect(result.callUuid).toBe('test-call-uuid-1234');
            expect(result.status).toBe('active');
        });

        it('should create a group call with custom maxParticipants', async () => {
            const call = mockCall({ isGroup: true, maxParticipants: 10 });
            mockCallRepository.create.mockResolvedValue(call);

            await service.createCall({ callType: 'audio', isGroup: true, maxParticipants: 10 });

            expect(mockCallRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({ isGroup: true, maxParticipants: 10 })
            );
        });

        it('should cap maxParticipants to 2 for 1-on-1 calls', async () => {
            mockCallRepository.create.mockResolvedValue(mockCall());

            await service.createCall({ callType: 'video', isGroup: false, maxParticipants: 50 });

            expect(mockCallRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({ maxParticipants: 2 })
            );
        });

        it('should generate a unique callUuid', async () => {
            mockCallRepository.create.mockResolvedValue(mockCall());

            await service.createCall({});

            const createArg = mockCallRepository.create.mock.calls[0][0];
            expect(createArg.callUuid).toBeDefined();
            expect(typeof createArg.callUuid).toBe('string');
            expect(createArg.callUuid.length).toBeGreaterThan(0);
        });

        it('should throw BadRequestException on repository error', async () => {
            mockCallRepository.create.mockRejectedValue(new Error('DB_ERROR'));

            await expect(service.createCall({})).rejects.toThrow(BadRequestException);
        });
    });

    // ─── getCallByUuid ───────────────────────────────────────────────────────

    describe('getCallByUuid', () => {
        it('should return call with active participants', async () => {
            const call = mockCall({ participants: [mockParticipant() as CallParticipant] });
            mockCallRepository.findOne.mockResolvedValue(call);

            const result = await service.getCallByUuid('test-call-uuid-1234');

            expect(result.callUuid).toBe('test-call-uuid-1234');
            expect(result.participants).toHaveLength(1);
        });

        it('should throw BadRequestException if call not found', async () => {
            mockCallRepository.findOne.mockResolvedValue(null);

            await expect(service.getCallByUuid('non-existent')).rejects.toThrow(BadRequestException);
            await expect(service.getCallByUuid('non-existent')).rejects.toThrow('CALL_NOT_FOUND');
        });
    });

    // ─── getAllCalls ─────────────────────────────────────────────────────────

    describe('getAllCalls', () => {
        it('should return all active calls', async () => {
            const calls = [mockCall(), mockCall({ id: 2, callUuid: 'uuid-2' })];
            mockCallRepository.findAll.mockResolvedValue(calls);

            const result = await service.getAllCalls('active');

            expect(result).toHaveLength(2);
            expect(mockCallRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({ where: { status: 'active' } })
            );
        });

        it('should return all calls when no status filter', async () => {
            mockCallRepository.findAll.mockResolvedValue([mockCall()]);

            await service.getAllCalls();

            expect(mockCallRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({ where: {} })
            );
        });
    });

    // ─── joinCall ────────────────────────────────────────────────────────────

    describe('joinCall', () => {
        it('should join a call successfully as first participant', async () => {
            const call = mockCall({ participants: [] });
            const participant = mockParticipant();
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.create.mockResolvedValue(participant);

            const result = await service.joinCall({ callUuid: 'test-call-uuid-1234', userName: 'Alice', userId: 'user-alice' });

            expect(result.participant.userName).toBe('Alice');
            expect(result.otherParticipants).toHaveLength(0);
            expect(mockParticipantRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({ callId: 1, userName: 'Alice', userId: 'user-alice' })
            );
        });

        it('should return existing participant if already in call', async () => {
            const existing = mockParticipant({ userId: 'user-alice' }) as CallParticipant;
            const call = mockCall({ participants: [existing] });
            mockCallRepository.findOne.mockResolvedValue(call);

            const result = await service.joinCall({ callUuid: 'test-call-uuid-1234', userName: 'Alice', userId: 'user-alice' });

            expect(result.participant.participantUuid).toBe('test-participant-uuid-1234');
            expect(mockParticipantRepository.create).not.toHaveBeenCalled();
        });

        it('should include other participants in response', async () => {
            const alice = mockParticipant({ id: 1, participantUuid: 'uuid-alice', userId: 'user-alice', userName: 'Alice' }) as CallParticipant;
            const call = mockCall({ participants: [alice], maxParticipants: 2 });
            const bob = mockParticipant({ id: 2, participantUuid: 'uuid-bob', userId: 'user-bob', userName: 'Bob' });
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.create.mockResolvedValue(bob);

            const result = await service.joinCall({ callUuid: 'test-call-uuid-1234', userName: 'Bob', userId: 'user-bob' });

            expect(result.otherParticipants).toHaveLength(1);
            expect(result.otherParticipants[0].userName).toBe('Alice');
        });

        it('should throw BadRequestException if call not found', async () => {
            mockCallRepository.findOne.mockResolvedValue(null);

            await expect(service.joinCall({ callUuid: 'bad-uuid', userName: 'Alice' }))
                .rejects.toThrow(BadRequestException);
            await expect(service.joinCall({ callUuid: 'bad-uuid', userName: 'Alice' }))
                .rejects.toThrow('CALL_NOT_FOUND');
        });

        it('should throw BadRequestException if call is ended', async () => {
            mockCallRepository.findOne.mockResolvedValue(mockCall({ status: 'ended' }));

            await expect(service.joinCall({ callUuid: 'test-call-uuid-1234', userName: 'Alice' }))
                .rejects.toThrow('CALL_ALREADY_ENDED');
        });

        it('should throw BadRequestException if call is full', async () => {
            const p1 = mockParticipant({ id: 1, userId: 'u1' }) as CallParticipant;
            const p2 = mockParticipant({ id: 2, userId: 'u2' }) as CallParticipant;
            const call = mockCall({ participants: [p1, p2], maxParticipants: 2 });
            mockCallRepository.findOne.mockResolvedValue(call);

            await expect(service.joinCall({ callUuid: 'test-call-uuid-1234', userName: 'Charlie', userId: 'u3' }))
                .rejects.toThrow('CALL_IS_FULL');
        });
    });

    // ─── leaveCall ───────────────────────────────────────────────────────────

    describe('leaveCall', () => {
        it('should leave call and mark leftAt', async () => {
            const call = mockCall();
            const participant = mockParticipant();
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.findOne.mockResolvedValue(participant);
            mockParticipantRepository.findAll.mockResolvedValue([]);  // no remaining

            const result = await service.leaveCall({ callUuid: 'test-call-uuid-1234', participantUuid: 'test-participant-uuid-1234' });

            expect(result.success).toBe(true);
            expect(participant.update).toHaveBeenCalledWith({ leftAt: expect.any(Date) });
        });

        it('should end call when last participant leaves', async () => {
            const call = mockCall();
            const participant = mockParticipant();
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.findOne.mockResolvedValue(participant);
            mockParticipantRepository.findAll.mockResolvedValue([]);  // no remaining

            await service.leaveCall({ callUuid: 'test-call-uuid-1234', participantUuid: 'test-participant-uuid-1234' });

            expect(call.update).toHaveBeenCalledWith({ status: 'ended' });
        });

        it('should NOT end call when other participants remain', async () => {
            const call = mockCall();
            const participant = mockParticipant();
            const remaining = [mockParticipant({ id: 2, userId: 'user-bob' }) as CallParticipant];
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.findOne.mockResolvedValue(participant);
            mockParticipantRepository.findAll.mockResolvedValue(remaining);

            await service.leaveCall({ callUuid: 'test-call-uuid-1234', participantUuid: 'test-participant-uuid-1234' });

            expect(call.update).not.toHaveBeenCalled();
        });

        it('should throw BadRequestException if call not found', async () => {
            mockCallRepository.findOne.mockResolvedValue(null);

            await expect(service.leaveCall({ callUuid: 'bad', participantUuid: 'bad' }))
                .rejects.toThrow('CALL_NOT_FOUND');
        });

        it('should throw BadRequestException if participant not found', async () => {
            mockCallRepository.findOne.mockResolvedValue(mockCall());
            mockParticipantRepository.findOne.mockResolvedValue(null);

            await expect(service.leaveCall({ callUuid: 'test-call-uuid-1234', participantUuid: 'bad' }))
                .rejects.toThrow('PARTICIPANT_NOT_FOUND');
        });
    });

    // ─── endCall ─────────────────────────────────────────────────────────────

    describe('endCall', () => {
        it('should end call and mark all participants as left', async () => {
            const call = mockCall();
            const p1 = mockParticipant({ id: 1 });
            const p2 = mockParticipant({ id: 2 });
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.findAll.mockResolvedValue([p1, p2]);

            const result = await service.endCall('test-call-uuid-1234');

            expect(result.success).toBe(true);
            expect(call.update).toHaveBeenCalledWith({ status: 'ended' });
            expect(p1.update).toHaveBeenCalledWith({ leftAt: expect.any(Date) });
            expect(p2.update).toHaveBeenCalledWith({ leftAt: expect.any(Date) });
        });

        it('should throw BadRequestException if call not found', async () => {
            mockCallRepository.findOne.mockResolvedValue(null);

            await expect(service.endCall('bad-uuid')).rejects.toThrow('CALL_NOT_FOUND');
        });
    });

    // ─── getParticipants ─────────────────────────────────────────────────────

    describe('getParticipants', () => {
        it('should return active participants', async () => {
            const call = mockCall();
            const participants = [mockParticipant(), mockParticipant({ id: 2, participantUuid: 'uuid-2' })];
            mockCallRepository.findOne.mockResolvedValue(call);
            mockParticipantRepository.findAll.mockResolvedValue(participants);

            const result = await service.getParticipants('test-call-uuid-1234');

            expect(result).toHaveLength(2);
            expect(mockParticipantRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({ where: expect.objectContaining({ callId: 1 }) })
            );
        });

        it('should throw BadRequestException if call not found', async () => {
            mockCallRepository.findOne.mockResolvedValue(null);

            await expect(service.getParticipants('bad-uuid')).rejects.toThrow('CALL_NOT_FOUND');
        });
    });

    // ─── updateParticipantSocket ──────────────────────────────────────────────

    describe('updateParticipantSocket', () => {
        it('should update socketId on participant', async () => {
            const participant = mockParticipant();
            mockParticipantRepository.findOne.mockResolvedValue(participant);

            await service.updateParticipantSocket({ participantUuid: 'test-participant-uuid-1234', socketId: 'socket-abc' });

            expect(participant.update).toHaveBeenCalledWith({ socketId: 'socket-abc' });
        });

        it('should throw BadRequestException if participant not found', async () => {
            mockParticipantRepository.findOne.mockResolvedValue(null);

            await expect(service.updateParticipantSocket({ participantUuid: 'bad', socketId: 'socket-abc' }))
                .rejects.toThrow('PARTICIPANT_NOT_FOUND');
        });
    });

    // ─── getIceServers ───────────────────────────────────────────────────────

    describe('getIceServers', () => {
        it('should return ICE server config with STUN and TURN', () => {
            const result = service.getIceServers() as any;

            expect(result.iceServers).toHaveLength(2);
            expect(result.iceServers[0].urls[0]).toContain('stun:');
            expect(result.iceServers[1].urls[0]).toContain('turn:');
            expect(result.iceServers[1].username).toBeDefined();
            expect(result.iceServers[1].credential).toBeDefined();
        });

        it('should include WebRTC config options', () => {
            const result = service.getIceServers() as any;

            expect(result.iceCandidatePoolSize).toBe(10);
            expect(result.iceTransportPolicy).toBe('all');
            expect(result.bundlePolicy).toBe('max-bundle');
            expect(result.rtcpMuxPolicy).toBe('require');
        });
    });
});
