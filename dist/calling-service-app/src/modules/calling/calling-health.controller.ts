import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CALLING_SERVICE_PATTERNS } from '@app/common/constants/patterns';
import { CallingService } from './calling.service';
import { IceConfigService } from './ice-config.service';
import { SfuService } from './sfu.service';
import { OnlineUserService } from '../online-user/online-user.service';

@Controller()
export class CallingHealthController {
    constructor(
        private readonly callingService: CallingService,
        private readonly iceConfigService: IceConfigService,
        private readonly sfuService: SfuService,
        private readonly onlineUserService: OnlineUserService,
    ) {}

    /** Mirrors Backend GET /api/health */
    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_STATS)
    async getStats(): Promise<object> {
        try {
            const activeCalls = await this.callingService.getAllCalls('active');
            const turnServers = this.iceConfigService.getTurnServers();

            const sfuStats = this.sfuService.getHealthStats();

            return {
                activeCalls: activeCalls.length,
                activeParticipants: activeCalls.reduce((sum, c) => sum + ((c.participants || []).length), 0),
                onlineUsers: this.onlineUserService.count(),
                service: 'Calling Microservice',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                turnServer: {
                    configured: turnServers.length > 0,
                    servers: turnServers.flatMap(s => Array.isArray(s.urls) ? s.urls : [s.urls]),
                    username: process.env.TURN_USERNAME || 'webrtcuser',
                },
                sfu: {
                    workerCount: sfuStats.workerCount,
                    routerCount: sfuStats.routerCount,
                    transportCount: sfuStats.transportCount,
                    producerCount: sfuStats.producerCount,
                    consumerCount: sfuStats.consumerCount,
                },
            };
        } catch (error) {
            throw new RpcException({ message: error.message || 'STATS_ERROR', status: 500 });
        }
    }

    /** Mirrors Backend GET /api/health/turn-config */
    @MessagePattern(CALLING_SERVICE_PATTERNS.CALL.GET_TURN_CONFIG)
    getTurnConfig(): object {
        try {
            return this.iceConfigService.getTurnConfigResponse();
        } catch (error) {
            throw new RpcException({ message: error.message || 'TURN_CONFIG_ERROR', status: 500 });
        }
    }
}
