import { Injectable } from '@nestjs/common';
import type { IceConfiguration, IceServer } from '@app/common/interfaces/webrtc.interface';

/**
 * Dedicated ICE/TURN configuration service.
 * Mirrors the Backend/api/services/iceConfigService.js logic in NestJS.
 */
@Injectable()
export class IceConfigService {
    private readonly turnUrls: string[];
    private readonly turnUsername: string;
    private readonly turnCredential: string;
    private readonly iceConfig: IceConfiguration;

    constructor() {
        this.turnUrls = process.env.TURN_URLS
            ? process.env.TURN_URLS.split(',').map(u => u.trim())
            : ['turn:51.21.167.29:3478', 'turns:51.21.167.29:5349'];

        this.turnUsername = process.env.TURN_USERNAME || 'webrtcuser';
        this.turnCredential = process.env.TURN_CREDENTIAL || 'webrtcpass123';

        this.iceConfig = {
            iceServers: [
                {
                    urls: [
                        'stun:stun.l.google.com:19302',
                        'stun:stun1.l.google.com:19302',
                        'stun:stun2.l.google.com:19302',
                        'stun:stun3.l.google.com:19302',
                        'stun:stun4.l.google.com:19302',
                    ],
                },
                {
                    urls: this.turnUrls,
                    username: this.turnUsername,
                    credential: this.turnCredential,
                },
            ],
            iceCandidatePoolSize: 10,
            iceTransportPolicy: 'all',
            bundlePolicy: 'max-bundle',
            rtcpMuxPolicy: 'require',
        };

        this.logConfiguration();
    }

    /** Full ICE configuration (for WebRTC peer connections) */
    getIceConfig(): IceConfiguration {
        return this.iceConfig;
    }

    /** Just the iceServers array (convenience) */
    getIceServers(): IceServer[] {
        return this.iceConfig.iceServers;
    }

    /** TURN-only servers (for health/stats reporting) */
    getTurnServers(): IceServer[] {
        return this.iceConfig.iceServers.filter(s => {
            const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
            return urls.some(u => u.startsWith('turn:') || u.startsWith('turns:'));
        });
    }

    /** Full TURN config response (mirrors Backend /api/health/turn-config) */
    getTurnConfigResponse(): object {
        return {
            success: true,
            iceServers: this.iceConfig.iceServers,
            config: {
                iceCandidatePoolSize: this.iceConfig.iceCandidatePoolSize,
                iceTransportPolicy: this.iceConfig.iceTransportPolicy,
                bundlePolicy: this.iceConfig.bundlePolicy,
                rtcpMuxPolicy: this.iceConfig.rtcpMuxPolicy,
            },
            info: {
                stunServers: (this.iceConfig.iceServers[0].urls as string[]).length,
                turnServers: this.turnUrls.length,
                turnUsername: this.turnUsername,
                note: 'Use these ICE servers for WebRTC peer connections',
            },
        };
    }

    private logConfiguration(): void {
        console.log('\n🔧 ICE Server Configuration:');
        console.log('   STUN Servers: Google (5 servers)');
        console.log(`   TURN Servers: ${this.turnUrls.join(', ')}`);
        console.log(`   TURN Username: ${this.turnUsername}`);
        console.log(`   TURN Credential: ***${this.turnCredential.slice(-4)}`);
        const usingOwn = this.turnUrls.some(u => u.includes('51.21.167.29'));
        console.log(`   Status: ${usingOwn ? '✅ Using YOUR TURN server' : '⚠️  Using public TURN'}`);
    }
}
