import { Test, TestingModule } from '@nestjs/testing';
import { SfuService } from './sfu.service';
import { IceConfigService } from './ice-config.service';
import * as mediasoup from 'mediasoup';

// ---------------------------------------------------------------------------
// Minimal Worker stub
// ---------------------------------------------------------------------------

function makeWorkerStub(pid: number) {
    const listeners: Record<string, ((...args: unknown[]) => void)[]> = {};
    return {
        pid,
        close: jest.fn(),
        on(event: string, cb: (...args: unknown[]) => void) {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(cb);
        },
        emit(event: string, ...args: unknown[]) {
            (listeners[event] ?? []).forEach(cb => cb(...args));
        },
    };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SfuService — Worker pool', () => {
    let service: SfuService;
    let createWorkerSpy: jest.SpyInstance;
    let workerStubs: ReturnType<typeof makeWorkerStub>[];

    beforeEach(async () => {
        workerStubs = [];
        let pidCounter = 1000;

        createWorkerSpy = jest
            .spyOn(mediasoup, 'createWorker')
            .mockImplementation(async () => {
                const stub = makeWorkerStub(pidCounter++);
                workerStubs.push(stub);
                return stub as unknown as mediasoup.types.Worker;
            });

        const module: TestingModule = await Test.createTestingModule({
            providers: [SfuService, IceConfigService],
        }).compile();

        service = module.get<SfuService>(SfuService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllTimers();
    });

    // -----------------------------------------------------------------------
    // 1.1 — createWorkers spawns correct number of Workers
    // -----------------------------------------------------------------------

    it('spawns one Worker per CPU core by default', async () => {
        const cpuCount = require('os').cpus().length;
        delete process.env.MEDIASOUP_WORKER_MAX;

        await service.createWorkers();

        expect(createWorkerSpy).toHaveBeenCalledTimes(cpuCount);
    });

    it('respects MEDIASOUP_WORKER_MAX env variable', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '2';

        await service.createWorkers();

        expect(createWorkerSpy).toHaveBeenCalledTimes(2);
        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    it('passes rtcMinPort and rtcMaxPort to createWorker', async () => {
        process.env.MEDIASOUP_RTC_MIN_PORT = '20000';
        process.env.MEDIASOUP_RTC_MAX_PORT = '20999';
        process.env.MEDIASOUP_WORKER_MAX = '1';

        await service.createWorkers();

        expect(createWorkerSpy).toHaveBeenCalledWith({
            rtcMinPort: 20000,
            rtcMaxPort: 20999,
        });

        delete process.env.MEDIASOUP_RTC_MIN_PORT;
        delete process.env.MEDIASOUP_RTC_MAX_PORT;
        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    // -----------------------------------------------------------------------
    // 1.5 — getLeastLoadedWorker
    // -----------------------------------------------------------------------

    it('getLeastLoadedWorker returns the only worker when pool has one', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const worker = service.getLeastLoadedWorker();
        expect(worker).toBeDefined();
        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    it('getLeastLoadedWorker throws SFU_NO_WORKERS_AVAILABLE when pool is empty', () => {
        // Do NOT call createWorkers — pool stays empty
        expect(() => service.getLeastLoadedWorker()).toThrow(
            expect.objectContaining({ code: 'SFU_NO_WORKERS_AVAILABLE' }),
        );
    });

    it('getLeastLoadedWorker returns worker with fewest routers', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '2';
        await service.createWorkers();

        const [w1, w2] = workerStubs;

        // Simulate w1 hosting 2 routers, w2 hosting 0
        const routerWorkerMap: Map<string, mediasoup.types.Worker> = (service as unknown as { routerWorkerMap: Map<string, mediasoup.types.Worker> }).routerWorkerMap;
        routerWorkerMap.set('router-a', w1 as unknown as mediasoup.types.Worker);
        routerWorkerMap.set('router-b', w1 as unknown as mediasoup.types.Worker);

        const chosen = service.getLeastLoadedWorker();
        expect(chosen).toBe(w2);

        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    // -----------------------------------------------------------------------
    // 1.2 — replaceWorker spawns replacement within 5 s
    // -----------------------------------------------------------------------

    it('replaces a crashed Worker within 5 seconds', async () => {
        jest.useFakeTimers();
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const [deadWorker] = workerStubs;
        const initialCallCount = createWorkerSpy.mock.calls.length;

        // Trigger replacement
        await service.replaceWorker(deadWorker as unknown as mediasoup.types.Worker);

        // Replacement not yet spawned
        expect(createWorkerSpy).toHaveBeenCalledTimes(initialCallCount);

        // Advance 5 seconds
        await jest.advanceTimersByTimeAsync(5000);

        expect(createWorkerSpy).toHaveBeenCalledTimes(initialCallCount + 1);

        jest.useRealTimers();
        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    it('removes dead worker from pool on replaceWorker', async () => {
        jest.useFakeTimers();
        process.env.MEDIASOUP_WORKER_MAX = '2';

        // Reset pool and spawn fresh workers
        const svcInternal = service as unknown as { workers: mediasoup.types.Worker[] };
        svcInternal.workers = [];
        workerStubs = [];
        await service.createWorkers();

        const [deadWorker] = workerStubs;
        expect(svcInternal.workers).toHaveLength(2);

        await service.replaceWorker(deadWorker as unknown as mediasoup.types.Worker);

        // Dead worker removed immediately (replaceWorker reassigns this.workers)
        expect(svcInternal.workers).toHaveLength(1);
        expect(svcInternal.workers).not.toContain(deadWorker);

        // After 5 s, replacement added
        await jest.advanceTimersByTimeAsync(5000);
        expect(svcInternal.workers).toHaveLength(2);

        jest.useRealTimers();
        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    it('registers died listener that triggers replaceWorker', async () => {
        jest.useFakeTimers();
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const [stub] = workerStubs;
        const initialCallCount = createWorkerSpy.mock.calls.length;

        // Simulate unexpected worker death
        stub.emit('died', new Error('segfault'));

        await jest.advanceTimersByTimeAsync(5000);

        expect(createWorkerSpy).toHaveBeenCalledTimes(initialCallCount + 1);

        jest.useRealTimers();
        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    // -----------------------------------------------------------------------
    // onModuleDestroy closes all workers
    // -----------------------------------------------------------------------

    it('closes all workers on module destroy', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '2';
        await service.createWorkers();

        await service.onModuleDestroy();

        for (const stub of workerStubs) {
            expect(stub.close).toHaveBeenCalled();
        }

        delete process.env.MEDIASOUP_WORKER_MAX;
    });
});

// ---------------------------------------------------------------------------
// Router lifecycle tests (Task 4.1)
// ---------------------------------------------------------------------------

describe('SfuService — Router lifecycle', () => {
    let service: SfuService;
    let createWorkerSpy: jest.SpyInstance;
    let workerStubs: ReturnType<typeof makeWorkerStub>[];

    function makeRouterStub() {
        return {
            id: `router-${Math.random().toString(36).slice(2)}`,
            close: jest.fn(),
            rtpCapabilities: {},
        };
    }

    beforeEach(async () => {
        workerStubs = [];
        let pidCounter = 2000;

        createWorkerSpy = jest
            .spyOn(mediasoup, 'createWorker')
            .mockImplementation(async () => {
                const stub = makeWorkerStub(pidCounter++);
                // Attach createRouter to the worker stub
                (stub as unknown as Record<string, unknown>).createRouter = jest.fn().mockResolvedValue(makeRouterStub());
                workerStubs.push(stub);
                return stub as unknown as mediasoup.types.Worker;
            });

        const module: TestingModule = await Test.createTestingModule({
            providers: [SfuService, IceConfigService],
        }).compile();

        service = module.get<SfuService>(SfuService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllTimers();
    });

    // -----------------------------------------------------------------------
    // 4.1a — createRouter stores mapping correctly
    // -----------------------------------------------------------------------

    it('createRouter stores router and worker mapping for callUuid', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const callUuid = 'call-abc-123';
        const router = await service.createRouter(callUuid);

        expect(router).toBeDefined();

        const storedRouter = service.getRouter(callUuid);
        expect(storedRouter).toBe(router);

        const routerWorkerMap: Map<string, mediasoup.types.Worker> = (service as unknown as { routerWorkerMap: Map<string, mediasoup.types.Worker> }).routerWorkerMap;
        expect(routerWorkerMap.has(callUuid)).toBe(true);

        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    it('getRouter returns undefined for unknown callUuid', async () => {
        const result = service.getRouter('nonexistent-call');
        expect(result).toBeUndefined();
    });

    // -----------------------------------------------------------------------
    // 4.1b — ROUTER_NOT_FOUND error path
    // -----------------------------------------------------------------------

    it('closeRouter throws ROUTER_NOT_FOUND for unknown callUuid', () => {
        expect(() => service.closeRouter('no-such-call')).toThrow(
            expect.objectContaining({ code: 'ROUTER_NOT_FOUND' }),
        );
    });

    it('closeRouter removes router and worker mapping after closing', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const callUuid = 'call-to-close';
        const router = await service.createRouter(callUuid);

        service.closeRouter(callUuid);

        expect(service.getRouter(callUuid)).toBeUndefined();

        const routerWorkerMap: Map<string, mediasoup.types.Worker> = (service as unknown as { routerWorkerMap: Map<string, mediasoup.types.Worker> }).routerWorkerMap;
        expect(routerWorkerMap.has(callUuid)).toBe(false);

        expect((router as unknown as { close: jest.Mock }).close).toHaveBeenCalled();

        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    // -----------------------------------------------------------------------
    // 4.1c — SFU_NO_WORKERS_AVAILABLE error path via createRouter
    // -----------------------------------------------------------------------

    it('createRouter throws SFU_NO_WORKERS_AVAILABLE when no workers exist', async () => {
        // Do NOT call createWorkers — pool stays empty
        await expect(service.createRouter('call-no-workers')).rejects.toThrow(
            expect.objectContaining({ code: 'SFU_NO_WORKERS_AVAILABLE' }),
        );
    });
});

// ---------------------------------------------------------------------------
// Transport lifecycle tests (Task 5.1)
// ---------------------------------------------------------------------------

describe('SfuService — Transport lifecycle', () => {
    let service: SfuService;
    let workerStubs: ReturnType<typeof makeWorkerStub>[];

    function makeTransportStub() {
        const iceListeners: Record<string, ((...args: unknown[]) => void)[]> = {};
        const stub = {
            id: `transport-${Math.random().toString(36).slice(2)}`,
            iceParameters: { usernameFragment: 'ufrag', password: 'pwd', iceLite: false },
            iceCandidates: [{ foundation: 'f1', priority: 1, ip: '127.0.0.1', protocol: 'udp', port: 10000, type: 'host' }],
            dtlsParameters: { role: 'auto', fingerprints: [{ algorithm: 'sha-256', value: 'AA:BB' }] },
            sctpParameters: undefined,
            iceState: 'new' as string,
            close: jest.fn(),
            connect: jest.fn().mockResolvedValue(undefined),
            on(event: string, cb: (...args: unknown[]) => void) {
                if (!iceListeners[event]) iceListeners[event] = [];
                iceListeners[event].push(cb);
            },
            emit(event: string, ...args: unknown[]) {
                (iceListeners[event] ?? []).forEach(cb => cb(...args));
            },
        };
        return stub;
    }

    function makeRouterStubWithTransport(transportStub: ReturnType<typeof makeTransportStub>) {
        return {
            id: `router-${Math.random().toString(36).slice(2)}`,
            close: jest.fn(),
            rtpCapabilities: {},
            createWebRtcTransport: jest.fn().mockResolvedValue(transportStub),
        };
    }

    beforeEach(async () => {
        workerStubs = [];
        let pidCounter = 3000;

        jest.spyOn(mediasoup, 'createWorker').mockImplementation(async () => {
            const stub = makeWorkerStub(pidCounter++);
            workerStubs.push(stub);
            return stub as unknown as mediasoup.types.Worker;
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [SfuService, IceConfigService],
        }).compile();

        service = module.get<SfuService>(SfuService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllTimers();
    });

    // -----------------------------------------------------------------------
    // 5.1a — createWebRtcTransport returns correct parameters
    // -----------------------------------------------------------------------

    it('createWebRtcTransport returns transport with id, iceParameters, iceCandidates, dtlsParameters', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const transportStub = makeTransportStub();
        const routerStub = makeRouterStubWithTransport(transportStub);

        // Inject router directly
        const routers: Map<string, unknown> = (service as unknown as { routers: Map<string, unknown> }).routers;
        routers.set('call-transport-test', routerStub as unknown as mediasoup.types.Router);

        const transport = await service.createWebRtcTransport('call-transport-test', 'participant-1', 'send');

        expect(transport.id).toBeDefined();
        expect(transport.iceParameters).toBeDefined();
        expect(transport.iceCandidates).toBeDefined();
        expect(transport.dtlsParameters).toBeDefined();

        // Verify stored in maps
        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        expect(transports.has(transport.id)).toBe(true);

        const transportMeta: Map<string, unknown> = (service as unknown as { transportMeta: Map<string, unknown> }).transportMeta;
        expect(transportMeta.get(transport.id)).toEqual({
            callUuid: 'call-transport-test',
            participantUuid: 'participant-1',
            direction: 'send',
        });

        const participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> =
            (service as unknown as { participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> }).participantTransports;
        expect(participantTransports.get('participant-1')?.sendTransportId).toBe(transport.id);

        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    it('createWebRtcTransport throws ROUTER_NOT_FOUND for unknown callUuid', async () => {
        await expect(service.createWebRtcTransport('no-such-call', 'p1', 'send')).rejects.toThrow(
            expect.objectContaining({ code: 'ROUTER_NOT_FOUND' }),
        );
    });

    // -----------------------------------------------------------------------
    // 5.1b — connectTransport TRANSPORT_CONNECT_FAILED error path
    // -----------------------------------------------------------------------

    it('connectTransport throws TRANSPORT_CONNECT_FAILED and closes transport on connect error', async () => {
        const transportStub = makeTransportStub();
        transportStub.connect = jest.fn().mockRejectedValue(new Error('DTLS handshake failed'));

        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        transports.set(transportStub.id, transportStub as unknown as mediasoup.types.WebRtcTransport);

        await expect(
            service.connectTransport(transportStub.id, { role: 'client', fingerprints: [] }),
        ).rejects.toThrow(expect.objectContaining({ code: 'TRANSPORT_CONNECT_FAILED' }));

        expect(transportStub.close).toHaveBeenCalled();
        expect(transports.has(transportStub.id)).toBe(false);
    });

    it('connectTransport throws TRANSPORT_NOT_FOUND for unknown transportId', async () => {
        await expect(
            service.connectTransport('nonexistent-transport', { role: 'client', fingerprints: [] }),
        ).rejects.toThrow(expect.objectContaining({ code: 'TRANSPORT_NOT_FOUND' }));
    });

    // -----------------------------------------------------------------------
    // 5.1c — ICE 'failed' state triggers immediate close and callback
    // -----------------------------------------------------------------------

    it('ICE failed state closes transport immediately and invokes onTransportFailed', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const transportStub = makeTransportStub();
        const routerStub = makeRouterStubWithTransport(transportStub);

        const routers: Map<string, unknown> = (service as unknown as { routers: Map<string, unknown> }).routers;
        routers.set('call-ice-test', routerStub as unknown as mediasoup.types.Router);

        const failedCallback = jest.fn();
        service.onTransportFailed = failedCallback;

        const transport = await service.createWebRtcTransport('call-ice-test', 'participant-ice', 'send');

        // Simulate ICE failed
        (transportStub as ReturnType<typeof makeTransportStub>).emit('icestatechange', 'failed');

        expect(transportStub.close).toHaveBeenCalled();
        expect(failedCallback).toHaveBeenCalledWith('participant-ice', transport.id);

        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        expect(transports.has(transport.id)).toBe(false);

        delete process.env.MEDIASOUP_WORKER_MAX;
    });

    // -----------------------------------------------------------------------
    // closeParticipantTransports
    // -----------------------------------------------------------------------

    it('closeParticipantTransports closes both send and recv transports and cleans up maps', async () => {
        process.env.MEDIASOUP_WORKER_MAX = '1';
        await service.createWorkers();

        const sendStub = makeTransportStub();
        const recvStub = makeTransportStub();

        const routerStub = {
            id: 'router-close-test',
            close: jest.fn(),
            rtpCapabilities: {},
            createWebRtcTransport: jest.fn()
                .mockResolvedValueOnce(sendStub)
                .mockResolvedValueOnce(recvStub),
        };

        const routers: Map<string, unknown> = (service as unknown as { routers: Map<string, unknown> }).routers;
        routers.set('call-close-test', routerStub as unknown as mediasoup.types.Router);

        await service.createWebRtcTransport('call-close-test', 'participant-close', 'send');
        await service.createWebRtcTransport('call-close-test', 'participant-close', 'recv');

        service.closeParticipantTransports('participant-close');

        expect(sendStub.close).toHaveBeenCalled();
        expect(recvStub.close).toHaveBeenCalled();

        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        expect(transports.has(sendStub.id)).toBe(false);
        expect(transports.has(recvStub.id)).toBe(false);

        const participantTransports: Map<string, unknown> = (service as unknown as { participantTransports: Map<string, unknown> }).participantTransports;
        expect(participantTransports.has('participant-close')).toBe(false);

        delete process.env.MEDIASOUP_WORKER_MAX;
    });
});

// ---------------------------------------------------------------------------
// Producer lifecycle tests (Task 6.1)
// ---------------------------------------------------------------------------

describe('SfuService — Producer lifecycle', () => {
    let service: SfuService;

    function makeProducerStub() {
        return {
            id: `producer-${Math.random().toString(36).slice(2)}`,
            pause: jest.fn().mockResolvedValue(undefined),
            resume: jest.fn().mockResolvedValue(undefined),
            close: jest.fn(),
        };
    }

    function makeTransportStubWithProduce(producerStub: ReturnType<typeof makeProducerStub>) {
        return {
            id: `transport-${Math.random().toString(36).slice(2)}`,
            produce: jest.fn().mockResolvedValue(producerStub),
        };
    }

    beforeEach(async () => {
        jest.spyOn(mediasoup, 'createWorker').mockImplementation(async () => {
            return makeWorkerStub(9000) as unknown as mediasoup.types.Worker;
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [SfuService, IceConfigService],
        }).compile();

        service = module.get<SfuService>(SfuService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // -----------------------------------------------------------------------
    // 6.1a — TRANSPORT_NOT_FOUND error path
    // -----------------------------------------------------------------------

    it('createProducer throws TRANSPORT_NOT_FOUND for unknown transportId', async () => {
        await expect(
            service.createProducer('nonexistent-transport', {} as never, 'audio'),
        ).rejects.toThrow(expect.objectContaining({ code: 'TRANSPORT_NOT_FOUND' }));
    });

    // -----------------------------------------------------------------------
    // 6.1b — createProducer stores producer and meta
    // -----------------------------------------------------------------------

    it('createProducer stores producer in map and returns it', async () => {
        const producerStub = makeProducerStub();
        const transportStub = makeTransportStubWithProduce(producerStub);

        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        const transportMeta: Map<string, unknown> = (service as unknown as { transportMeta: Map<string, unknown> }).transportMeta;

        transports.set(transportStub.id, transportStub as unknown as mediasoup.types.WebRtcTransport);
        transportMeta.set(transportStub.id, { callUuid: 'call-1', participantUuid: 'p-1', direction: 'send' });

        const producer = await service.createProducer(transportStub.id, {} as never, 'audio');

        expect(producer).toBe(producerStub);

        const producers: Map<string, unknown> = (service as unknown as { producers: Map<string, unknown> }).producers;
        expect(producers.has(producerStub.id)).toBe(true);

        const producerMeta: Map<string, unknown> = (service as unknown as { producerMeta: Map<string, unknown> }).producerMeta;
        expect(producerMeta.get(producerStub.id)).toEqual({ callUuid: 'call-1', participantUuid: 'p-1' });
    });

    // -----------------------------------------------------------------------
    // 6.1c — pause/resume state transitions
    // -----------------------------------------------------------------------

    it('pauseProducer calls producer.pause()', async () => {
        const producerStub = makeProducerStub();
        const producers: Map<string, unknown> = (service as unknown as { producers: Map<string, unknown> }).producers;
        producers.set(producerStub.id, producerStub as unknown as mediasoup.types.Producer);

        await service.pauseProducer(producerStub.id);

        expect(producerStub.pause).toHaveBeenCalled();
    });

    it('pauseProducer throws PRODUCER_NOT_FOUND for unknown producerId', async () => {
        await expect(service.pauseProducer('no-such-producer')).rejects.toThrow(
            expect.objectContaining({ code: 'PRODUCER_NOT_FOUND' }),
        );
    });

    it('resumeProducer calls producer.resume()', async () => {
        const producerStub = makeProducerStub();
        const producers: Map<string, unknown> = (service as unknown as { producers: Map<string, unknown> }).producers;
        producers.set(producerStub.id, producerStub as unknown as mediasoup.types.Producer);

        await service.resumeProducer(producerStub.id);

        expect(producerStub.resume).toHaveBeenCalled();
    });

    it('resumeProducer throws PRODUCER_NOT_FOUND for unknown producerId', async () => {
        await expect(service.resumeProducer('no-such-producer')).rejects.toThrow(
            expect.objectContaining({ code: 'PRODUCER_NOT_FOUND' }),
        );
    });

    // -----------------------------------------------------------------------
    // 6.1d — closeProducer removes from maps
    // -----------------------------------------------------------------------

    it('closeProducer calls producer.close() and removes from maps', () => {
        const producerStub = makeProducerStub();
        const producers: Map<string, unknown> = (service as unknown as { producers: Map<string, unknown> }).producers;
        const producerMeta: Map<string, unknown> = (service as unknown as { producerMeta: Map<string, unknown> }).producerMeta;

        producers.set(producerStub.id, producerStub as unknown as mediasoup.types.Producer);
        producerMeta.set(producerStub.id, { callUuid: 'call-1', participantUuid: 'p-1' });

        service.closeProducer(producerStub.id);

        expect(producerStub.close).toHaveBeenCalled();
        expect(producers.has(producerStub.id)).toBe(false);
        expect(producerMeta.has(producerStub.id)).toBe(false);
    });

    it('closeProducer is a no-op for unknown producerId', () => {
        // Should not throw
        expect(() => service.closeProducer('nonexistent-producer')).not.toThrow();
    });
});

// ---------------------------------------------------------------------------
// Consumer lifecycle tests (Task 7.1)
// ---------------------------------------------------------------------------

describe('SfuService — Consumer lifecycle', () => {
    let service: SfuService;

    function makeConsumerStub(producerId: string) {
        return {
            id: `consumer-${Math.random().toString(36).slice(2)}`,
            producerId,
            paused: true,
            resume: jest.fn().mockResolvedValue(undefined),
            close: jest.fn(),
        };
    }

    function makeTransportStubWithConsume(consumerStub: ReturnType<typeof makeConsumerStub>) {
        return {
            id: `transport-${Math.random().toString(36).slice(2)}`,
            consume: jest.fn().mockResolvedValue(consumerStub),
        };
    }

    function makeRouterStubWithCanConsume(canConsume: boolean) {
        return {
            id: `router-${Math.random().toString(36).slice(2)}`,
            close: jest.fn(),
            rtpCapabilities: {},
            canConsume: jest.fn().mockReturnValue(canConsume),
        };
    }

    beforeEach(async () => {
        jest.spyOn(mediasoup, 'createWorker').mockImplementation(async () => {
            return makeWorkerStub(9001) as unknown as mediasoup.types.Worker;
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [SfuService, IceConfigService],
        }).compile();

        service = module.get<SfuService>(SfuService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // -----------------------------------------------------------------------
    // 7.1a — Consumer is created in paused state
    // -----------------------------------------------------------------------

    it('createConsumer creates consumer in paused state', async () => {
        const producerId = 'producer-abc';
        const consumerStub = makeConsumerStub(producerId);
        const transportStub = makeTransportStubWithConsume(consumerStub);
        const routerStub = makeRouterStubWithCanConsume(true);

        // Inject router
        const routers: Map<string, unknown> = (service as unknown as { routers: Map<string, unknown> }).routers;
        routers.set('call-consumer-test', routerStub as unknown as mediasoup.types.Router);

        // Inject recv transport
        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        transports.set(transportStub.id, transportStub as unknown as mediasoup.types.WebRtcTransport);

        // Set up participant recv transport mapping
        const participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> =
            (service as unknown as { participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> }).participantTransports;
        participantTransports.set('participant-consumer', { recvTransportId: transportStub.id });

        const consumer = await service.createConsumer(
            'call-consumer-test',
            'participant-consumer',
            producerId,
            {} as never,
        );

        // Consumer should be created with paused: true
        expect(transportStub.consume).toHaveBeenCalledWith(
            expect.objectContaining({ paused: true }),
        );
        expect(consumer.paused).toBe(true);

        // Consumer should be stored
        const consumers: Map<string, unknown> = (service as unknown as { consumers: Map<string, unknown> }).consumers;
        expect(consumers.has(consumer.id)).toBe(true);
    });

    // -----------------------------------------------------------------------
    // 7.1b — INCOMPATIBLE_RTP_CAPABILITIES error path
    // -----------------------------------------------------------------------

    it('createConsumer throws INCOMPATIBLE_RTP_CAPABILITIES when router.canConsume returns false', async () => {
        const routerStub = makeRouterStubWithCanConsume(false);

        const routers: Map<string, unknown> = (service as unknown as { routers: Map<string, unknown> }).routers;
        routers.set('call-incompat-test', routerStub as unknown as mediasoup.types.Router);

        const transportStub = { id: `transport-${Math.random().toString(36).slice(2)}` };
        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        transports.set(transportStub.id, transportStub as unknown as mediasoup.types.WebRtcTransport);

        const participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> =
            (service as unknown as { participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> }).participantTransports;
        participantTransports.set('participant-incompat', { recvTransportId: transportStub.id });

        await expect(
            service.createConsumer('call-incompat-test', 'participant-incompat', 'producer-xyz', {} as never),
        ).rejects.toThrow(expect.objectContaining({ code: 'INCOMPATIBLE_RTP_CAPABILITIES' }));
    });

    it('createConsumer throws TRANSPORT_NOT_FOUND when no recv transport exists for participant', async () => {
        await expect(
            service.createConsumer('call-no-transport', 'participant-no-transport', 'producer-xyz', {} as never),
        ).rejects.toThrow(expect.objectContaining({ code: 'TRANSPORT_NOT_FOUND' }));
    });

    it('createConsumer throws ROUTER_NOT_FOUND when router does not exist', async () => {
        const transportStub = { id: `transport-${Math.random().toString(36).slice(2)}` };
        const transports: Map<string, unknown> = (service as unknown as { transports: Map<string, unknown> }).transports;
        transports.set(transportStub.id, transportStub as unknown as mediasoup.types.WebRtcTransport);

        const participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> =
            (service as unknown as { participantTransports: Map<string, { sendTransportId?: string; recvTransportId?: string }> }).participantTransports;
        participantTransports.set('participant-no-router', { recvTransportId: transportStub.id });

        await expect(
            service.createConsumer('call-no-router', 'participant-no-router', 'producer-xyz', {} as never),
        ).rejects.toThrow(expect.objectContaining({ code: 'ROUTER_NOT_FOUND' }));
    });

    // -----------------------------------------------------------------------
    // 7.1c — Closing a Producer closes its Consumers
    // -----------------------------------------------------------------------

    it('closeProducer closes all consumers associated with that producer', () => {
        const producerId = 'producer-to-close';
        const consumerStub1 = makeConsumerStub(producerId);
        const consumerStub2 = makeConsumerStub(producerId);
        const otherConsumerStub = makeConsumerStub('other-producer');

        const producers: Map<string, unknown> = (service as unknown as { producers: Map<string, unknown> }).producers;
        const producerMeta: Map<string, unknown> = (service as unknown as { producerMeta: Map<string, unknown> }).producerMeta;
        const consumers: Map<string, unknown> = (service as unknown as { consumers: Map<string, unknown> }).consumers;

        producers.set(producerId, { id: producerId, close: jest.fn() } as unknown as mediasoup.types.Producer);
        producerMeta.set(producerId, { callUuid: 'call-1', participantUuid: 'p-1' });

        consumers.set(consumerStub1.id, consumerStub1 as unknown as mediasoup.types.Consumer);
        consumers.set(consumerStub2.id, consumerStub2 as unknown as mediasoup.types.Consumer);
        consumers.set(otherConsumerStub.id, otherConsumerStub as unknown as mediasoup.types.Consumer);

        service.closeProducer(producerId);

        // Consumers for the closed producer should be closed and removed
        expect(consumerStub1.close).toHaveBeenCalled();
        expect(consumerStub2.close).toHaveBeenCalled();
        expect(consumers.has(consumerStub1.id)).toBe(false);
        expect(consumers.has(consumerStub2.id)).toBe(false);

        // Consumer for a different producer should be unaffected
        expect(otherConsumerStub.close).not.toHaveBeenCalled();
        expect(consumers.has(otherConsumerStub.id)).toBe(true);
    });

    it('closeProducer invokes onProducerClosed callback with producerId and callUuid', () => {
        const producerId = 'producer-callback-test';
        const callback = jest.fn();
        service.onProducerClosed = callback;

        const producers: Map<string, unknown> = (service as unknown as { producers: Map<string, unknown> }).producers;
        const producerMeta: Map<string, unknown> = (service as unknown as { producerMeta: Map<string, unknown> }).producerMeta;

        producers.set(producerId, { id: producerId, close: jest.fn() } as unknown as mediasoup.types.Producer);
        producerMeta.set(producerId, { callUuid: 'call-callback', participantUuid: 'p-1' });

        service.closeProducer(producerId);

        expect(callback).toHaveBeenCalledWith(producerId, 'call-callback');
    });

    // -----------------------------------------------------------------------
    // resumeConsumer
    // -----------------------------------------------------------------------

    it('resumeConsumer calls consumer.resume()', async () => {
        const consumerStub = makeConsumerStub('some-producer');
        const consumers: Map<string, unknown> = (service as unknown as { consumers: Map<string, unknown> }).consumers;
        consumers.set(consumerStub.id, consumerStub as unknown as mediasoup.types.Consumer);

        await service.resumeConsumer(consumerStub.id);

        expect(consumerStub.resume).toHaveBeenCalled();
    });

    it('resumeConsumer throws CONSUMER_NOT_FOUND for unknown consumerId', async () => {
        await expect(service.resumeConsumer('nonexistent-consumer')).rejects.toThrow(
            expect.objectContaining({ code: 'CONSUMER_NOT_FOUND' }),
        );
    });
});
