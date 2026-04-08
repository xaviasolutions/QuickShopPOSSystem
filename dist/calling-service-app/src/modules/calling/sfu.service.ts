import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as os from 'os';
import * as mediasoup from 'mediasoup';
import type { Worker, Router, WebRtcTransport, Producer, Consumer } from 'mediasoup/types';
import { IceConfigService } from './ice-config.service';
import type {
    TransportMeta,
    ParticipantTransportPair,
    ProducerMeta,
    SfuHealthStats,
    SfuConfig,
    DtlsParameters,
    RtpParameters,
    RtpCapabilities,
    MediaKind,
} from './sfu.types';
import { ROUTER_MEDIA_CODECS } from './sfu.types';

@Injectable()
export class SfuService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(SfuService.name);

    // Worker pool
    private workers: Worker[] = [];
    private workerResourceIntervals: ReturnType<typeof setInterval>[] = [];

    // In-memory state maps
    private routers: Map<string, Router> = new Map();
    private routerWorkerMap: Map<string, Worker> = new Map();
    private transports: Map<string, WebRtcTransport> = new Map();
    private transportMeta: Map<string, TransportMeta> = new Map();
    private producers: Map<string, Producer> = new Map();
    private producerMeta: Map<string, ProducerMeta> = new Map();
    private consumers: Map<string, Consumer> = new Map();
    private participantTransports: Map<string, ParticipantTransportPair> = new Map();

    // Router observability metadata
    private routerCreatedAt: Map<string, number> = new Map();
    private callParticipantCount: Map<string, number> = new Map();
    private callPeakParticipantCount: Map<string, number> = new Map();

    /** Optional callback set by the gateway to handle transport ICE failures */
    onTransportFailed?: (participantUuid: string, transportId: string) => void;

    /** Optional callback set by the gateway when a producer is closed */
    onProducerClosed?: (producerId: string, callUuid: string) => void;

    constructor(private readonly iceConfigService: IceConfigService) {}

    async onModuleInit(): Promise<void> {
        await this.createWorkers();
    }

    async onModuleDestroy(): Promise<void> {
        for (const interval of this.workerResourceIntervals) {
            clearInterval(interval);
        }
        this.workerResourceIntervals = [];

        for (const worker of this.workers) {
            worker.close();
        }
        this.workers = [];
        this.logger.log('All mediasoup Workers closed');
    }

    async createWorkers(): Promise<void> {
        const config = this.resolveConfig();
        const numWorkers = config.workerMax;
        const rtcMinPort = config.workerRtcMinPort;
        const rtcMaxPort = config.workerRtcMaxPort;

        this.logger.log(`Spawning ${numWorkers} mediasoup Worker(s) (ports ${rtcMinPort}–${rtcMaxPort})`);

        for (let i = 0; i < numWorkers; i++) {
            const worker = await mediasoup.createWorker({
                rtcMinPort,
                rtcMaxPort,
            });

            this.logger.log(`Worker created — PID ${worker.pid}`);

            worker.on('died', (error) => {
                this.logger.error(`Worker PID ${worker.pid} died: ${error?.message ?? 'unknown reason'}`);
                this.replaceWorker(worker);
            });

            const resourceThresholdKb = parseInt(
                process.env.MEDIASOUP_WORKER_MAX_RSS_KB ?? '524288',
                10,
            );
            const interval = setInterval(async () => {
                try {
                    const usage = await worker.getResourceUsage();
                    if (usage.ru_maxrss > resourceThresholdKb) {
                        this.logger.warn(
                            `Worker PID ${worker.pid} resource usage: maxrss=${usage.ru_maxrss}KB (threshold: ${resourceThresholdKb}KB)`,
                        );
                    }
                } catch {
                    // Worker may have died; ignore errors here
                }
            }, 60_000);
            this.workerResourceIntervals.push(interval);

            this.workers.push(worker);
        }
    }

    getLeastLoadedWorker(): Worker {
        if (this.workers.length === 0) {
            const err = new Error('No mediasoup Workers available') as Error & { code: string };
            err.code = 'SFU_NO_WORKERS_AVAILABLE';
            throw err;
        }

        // Count routers per worker
        const routerCounts = new Map<Worker, number>();
        for (const worker of this.workers) {
            routerCounts.set(worker, 0);
        }

        for (const worker of this.routerWorkerMap.values()) {
            const current = routerCounts.get(worker) ?? 0;
            routerCounts.set(worker, current + 1);
        }

        let leastLoaded = this.workers[0];
        let minCount = routerCounts.get(leastLoaded) ?? 0;

        for (const worker of this.workers) {
            const count = routerCounts.get(worker) ?? 0;
            if (count < minCount) {
                minCount = count;
                leastLoaded = worker;
            }
        }

        return leastLoaded;
    }

    async replaceWorker(deadWorker: Worker): Promise<void> {
        // Remove dead worker from pool immediately
        this.workers = this.workers.filter(w => w !== deadWorker);

        setTimeout(async () => {
            try {
                const config = this.resolveConfig();
                const replacement = await mediasoup.createWorker({
                    rtcMinPort: config.workerRtcMinPort,
                    rtcMaxPort: config.workerRtcMaxPort,
                });

                this.logger.log(`Replacement Worker created — PID ${replacement.pid}`);

                replacement.on('died', (error) => {
                    this.logger.error(`Worker PID ${replacement.pid} died: ${error?.message ?? 'unknown reason'}`);
                    this.replaceWorker(replacement);
                });

                this.workers.push(replacement);
            } catch (err) {
                this.logger.error(`Failed to spawn replacement Worker: ${(err as Error).message}`);
            }
        }, 5000);
    }

    async createRouter(callUuid: string): Promise<Router> {
        const worker = this.getLeastLoadedWorker();
        const router = await worker.createRouter({ mediaCodecs: ROUTER_MEDIA_CODECS });

        this.routers.set(callUuid, router);
        this.routerWorkerMap.set(callUuid, worker);
        this.routerCreatedAt.set(callUuid, Date.now());
        this.callParticipantCount.set(callUuid, 0);
        this.callPeakParticipantCount.set(callUuid, 0);

        this.logger.log(`Router created for call ${callUuid}`);
        return router;
    }

    getRouter(callUuid: string): Router | undefined {
        return this.routers.get(callUuid);
    }

    closeRouter(callUuid: string): void {
        const router = this.routers.get(callUuid);
        if (!router) {
            const err = new Error(`Router not found for call ${callUuid}`) as Error & { code: string };
            err.code = 'ROUTER_NOT_FOUND';
            throw err;
        }

        router.close();
        this.routers.delete(callUuid);
        this.routerWorkerMap.delete(callUuid);

        const createdAt = this.routerCreatedAt.get(callUuid) ?? Date.now();
        const durationMs = Date.now() - createdAt;
        const peakParticipants = this.callPeakParticipantCount.get(callUuid) ?? 0;

        this.routerCreatedAt.delete(callUuid);
        this.callParticipantCount.delete(callUuid);
        this.callPeakParticipantCount.delete(callUuid);

        this.logger.log(
            `Router closed for call ${callUuid} — duration: ${durationMs}ms, peak participants: ${peakParticipants}, bytes forwarded: 0`,
        );
    }

    trackParticipantJoined(callUuid: string): void {
        const config = this.resolveConfig();
        const current = (this.callParticipantCount.get(callUuid) ?? 0) + 1;
        this.callParticipantCount.set(callUuid, current);

        const peak = this.callPeakParticipantCount.get(callUuid) ?? 0;
        if (current > peak) {
            this.callPeakParticipantCount.set(callUuid, current);
        }

        if (current > config.participantWarningThreshold) {
            this.logger.warn(`Call ${callUuid} has ${current} participants (threshold: ${config.participantWarningThreshold})`);
        }
    }

    // ---------------------------------------------------------------------------
    // Transport lifecycle
    // ---------------------------------------------------------------------------

    async createWebRtcTransport(
        callUuid: string,
        participantUuid: string,
        direction: 'send' | 'recv',
    ): Promise<WebRtcTransport> {
        const router = this.routers.get(callUuid);
        if (!router) {
            const err = new Error(`Router not found for call ${callUuid}`) as Error & { code: string };
            err.code = 'ROUTER_NOT_FOUND';
            throw err;
        }

        const iceServers = this.iceConfigService.getIceServers();

        const transport = await router.createWebRtcTransport({
            listenIps: [{ ip: '0.0.0.0', announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP ?? '127.0.0.1' }],
            enableUdp: true,
            enableTcp: true,
            preferUdp: true,
            appData: { iceServers },
        });

        this.transports.set(transport.id, transport);
        this.transportMeta.set(transport.id, { callUuid, participantUuid, direction });

        // Update participant transport pair
        const pair = this.participantTransports.get(participantUuid) ?? ({} as ParticipantTransportPair);
        if (direction === 'send') {
            pair.sendTransportId = transport.id;
        } else {
            pair.recvTransportId = transport.id;
        }
        this.participantTransports.set(participantUuid, pair);

        // ICE state change listeners
        transport.on('icestatechange', (iceState: string) => {
            if (iceState === 'disconnected') {
                setTimeout(() => {
                    const current = this.transports.get(transport.id);
                    if (current && (transport as unknown as { iceState: string }).iceState === 'disconnected') {
                        this.logger.warn(`Transport ${transport.id} still disconnected after 10s — closing`);
                        transport.close();
                        this.transports.delete(transport.id);
                        this.transportMeta.delete(transport.id);
                    }
                }, 10_000);
            } else if (iceState === 'failed') {
                this.logger.error(`Transport ${transport.id} ICE failed — closing immediately`);
                transport.close();
                this.transports.delete(transport.id);
                this.transportMeta.delete(transport.id);
                this.onTransportFailed?.(participantUuid, transport.id);
            }
        });

        this.logger.log(`WebRtcTransport created — call: ${callUuid}, participant: ${participantUuid}, direction: ${direction}, id: ${transport.id}`);
        return transport;
    }

    async connectTransport(transportId: string, dtlsParameters: DtlsParameters): Promise<void> {
        const transport = this.transports.get(transportId);
        if (!transport) {
            const err = new Error(`Transport not found: ${transportId}`) as Error & { code: string };
            err.code = 'TRANSPORT_NOT_FOUND';
            throw err;
        }

        try {
            await transport.connect({ dtlsParameters });
            this.logger.log(`Transport ${transportId} connected`);
        } catch (err) {
            const error = err as Error & { code?: string };
            this.logger.error(`Transport ${transportId} connect failed: ${error.message}`);
            transport.close();
            this.transports.delete(transportId);
            this.transportMeta.delete(transportId);
            const connectErr = new Error(`Transport connect failed: ${error.message}`) as Error & { code: string };
            connectErr.code = 'TRANSPORT_CONNECT_FAILED';
            throw connectErr;
        }
    }

    closeParticipantTransports(participantUuid: string): void {
        const pair = this.participantTransports.get(participantUuid);
        if (!pair) {
            this.logger.warn(`No transports found for participant ${participantUuid}`);
            return;
        }

        for (const transportId of [pair.sendTransportId, pair.recvTransportId]) {
            if (!transportId) continue;
            const transport = this.transports.get(transportId);
            if (transport) {
                transport.close();
                this.transports.delete(transportId);
                this.transportMeta.delete(transportId);
            }
        }

        this.participantTransports.delete(participantUuid);
        this.logger.log(`Transports closed for participant ${participantUuid}`);
    }

    // ---------------------------------------------------------------------------
    // Producer lifecycle
    // ---------------------------------------------------------------------------

    async createProducer(transportId: string, rtpParameters: RtpParameters, kind: MediaKind): Promise<Producer> {
        const transport = this.transports.get(transportId);
        if (!transport) {
            const err = new Error(`Transport not found: ${transportId}`) as Error & { code: string };
            err.code = 'TRANSPORT_NOT_FOUND';
            throw err;
        }

        const producer = await transport.produce({ kind, rtpParameters });

        this.producers.set(producer.id, producer);

        const meta = this.transportMeta.get(transportId);
        const callUuid = meta?.callUuid ?? 'unknown';
        const participantUuid = meta?.participantUuid ?? 'unknown';
        this.producerMeta.set(producer.id, { callUuid, participantUuid });

        this.logger.log(`Producer created — id: ${producer.id}, call: ${callUuid}, participant: ${participantUuid}`);
        return producer;
    }

    async pauseProducer(producerId: string): Promise<void> {
        const producer = this.producers.get(producerId);
        if (!producer) {
            const err = new Error(`Producer not found: ${producerId}`) as Error & { code: string };
            err.code = 'PRODUCER_NOT_FOUND';
            throw err;
        }

        await producer.pause();
        this.logger.log(`Producer paused — id: ${producerId}`);
    }

    async resumeProducer(producerId: string): Promise<void> {
        const producer = this.producers.get(producerId);
        if (!producer) {
            const err = new Error(`Producer not found: ${producerId}`) as Error & { code: string };
            err.code = 'PRODUCER_NOT_FOUND';
            throw err;
        }

        await producer.resume();
        this.logger.log(`Producer resumed — id: ${producerId}`);
    }

    closeProducer(producerId: string): void {
        const producer = this.producers.get(producerId);
        if (!producer) {
            return;
        }

        producer.close();
        this.producers.delete(producerId);

        const meta = this.producerMeta.get(producerId);
        const callUuid = meta?.callUuid ?? 'unknown';
        this.producerMeta.delete(producerId);

        // Close all consumers associated with this producer
        for (const [consumerId, consumer] of this.consumers) {
            if ((consumer as unknown as { producerId: string }).producerId === producerId) {
                consumer.close();
                this.consumers.delete(consumerId);
                this.logger.log(`Consumer ${consumerId} closed due to producer ${producerId} closing`);
            }
        }

        this.onProducerClosed?.(producerId, callUuid);
        this.logger.log(`Producer closed — id: ${producerId}`);
    }

    // ---------------------------------------------------------------------------
    // Consumer lifecycle
    // ---------------------------------------------------------------------------

    async createConsumer(
        callUuid: string,
        consumerParticipantUuid: string,
        producerId: string,
        rtpCapabilities: RtpCapabilities,
    ): Promise<Consumer> {
        const pair = this.participantTransports.get(consumerParticipantUuid);
        if (!pair?.recvTransportId) {
            const err = new Error(`Recv transport not found for participant ${consumerParticipantUuid}`) as Error & { code: string };
            err.code = 'TRANSPORT_NOT_FOUND';
            throw err;
        }

        const router = this.routers.get(callUuid);
        if (!router) {
            const err = new Error(`Router not found for call ${callUuid}`) as Error & { code: string };
            err.code = 'ROUTER_NOT_FOUND';
            throw err;
        }

        if (!router.canConsume({ producerId, rtpCapabilities })) {
            const err = new Error(`Incompatible RTP capabilities for producer ${producerId}`) as Error & { code: string };
            err.code = 'INCOMPATIBLE_RTP_CAPABILITIES';
            throw err;
        }

        const recvTransport = this.transports.get(pair.recvTransportId);
        if (!recvTransport) {
            const err = new Error(`Recv transport not found: ${pair.recvTransportId}`) as Error & { code: string };
            err.code = 'TRANSPORT_NOT_FOUND';
            throw err;
        }

        const consumer = await recvTransport.consume({ producerId, rtpCapabilities, paused: true });

        this.consumers.set(consumer.id, consumer);
        this.logger.log(`Consumer created — id: ${consumer.id}, call: ${callUuid}, participant: ${consumerParticipantUuid}`);

        return consumer;
    }

    async resumeConsumer(consumerId: string): Promise<void> {
        const consumer = this.consumers.get(consumerId);
        if (!consumer) {
            const err = new Error(`Consumer not found: ${consumerId}`) as Error & { code: string };
            err.code = 'CONSUMER_NOT_FOUND';
            throw err;
        }

        await consumer.resume();
        this.logger.log(`Consumer resumed — id: ${consumerId}`);
    }

    getTransportMeta(transportId: string): TransportMeta | undefined {
        return this.transportMeta.get(transportId);
    }

    getProducerMeta(producerId: string): ProducerMeta | undefined {
        return this.producerMeta.get(producerId);
    }

    getProducersByParticipant(participantUuid: string): string[] {
        const producerIds: string[] = [];
        for (const [producerId, meta] of this.producerMeta.entries()) {
            if (meta.participantUuid === participantUuid) {
                producerIds.push(producerId);
            }
        }
        return producerIds;
    }

    getHealthStats(): SfuHealthStats {
        return {
            workerCount: this.workers.length,
            routerCount: this.routers.size,
            transportCount: this.transports.size,
            producerCount: this.producers.size,
            consumerCount: this.consumers.size,
        };
    }

    private resolveConfig(): SfuConfig {
        const cpuCount = os.cpus().length;
        return {
            workerMax: parseInt(process.env.MEDIASOUP_WORKER_MAX ?? String(cpuCount), 10),
            workerRtcMinPort: parseInt(process.env.MEDIASOUP_RTC_MIN_PORT ?? '10000', 10),
            workerRtcMaxPort: parseInt(process.env.MEDIASOUP_RTC_MAX_PORT ?? '10999', 10),
            maxRoutersPerWorker: parseInt(process.env.MEDIASOUP_MAX_ROUTERS_PER_WORKER ?? '100', 10),
            participantWarningThreshold: parseInt(process.env.MEDIASOUP_PARTICIPANT_WARNING_THRESHOLD ?? '50', 10),
        };
    }
}
