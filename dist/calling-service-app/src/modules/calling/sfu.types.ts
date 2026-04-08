import type {
  DtlsParameters,
  RtpParameters,
  RtpCapabilities,
  RtpCodecCapability,
  MediaKind,
} from 'mediasoup/types';

// Re-export mediasoup types for convenience
export type { DtlsParameters, RtpParameters, RtpCapabilities, RtpCodecCapability, MediaKind };

// ---------------------------------------------------------------------------
// SFU configuration (resolved from process.env at startup)
// ---------------------------------------------------------------------------

export interface SfuConfig {
  /** Maximum number of mediasoup Workers to spawn. Default: os.cpus().length */
  workerMax: number;
  /** Minimum UDP port for RTP/RTCP. Default: 10000 */
  workerRtcMinPort: number;
  /** Maximum UDP port for RTP/RTCP. Default: 10999 */
  workerRtcMaxPort: number;
  /** Maximum number of Routers per Worker. Default: 100 */
  maxRoutersPerWorker: number;
  /** Log a warning when participant count in a call exceeds this value. Default: 50 */
  participantWarningThreshold: number;
}

// ---------------------------------------------------------------------------
// In-memory state metadata
// ---------------------------------------------------------------------------

export interface TransportMeta {
  callUuid: string;
  participantUuid: string;
  direction: 'send' | 'recv';
}

export interface ParticipantTransportPair {
  sendTransportId: string;
  recvTransportId: string;
}

export interface ProducerMeta {
  callUuid: string;
  participantUuid: string;
}

// ---------------------------------------------------------------------------
// Health / observability
// ---------------------------------------------------------------------------

export interface SfuHealthStats {
  workerCount: number;
  routerCount: number;
  transportCount: number;
  producerCount: number;
  consumerCount: number;
}

// ---------------------------------------------------------------------------
// Signaling payload types
// ---------------------------------------------------------------------------

export interface SfuCreateTransportPayload {
  callUuid: string;
  participantUuid: string;
  direction: 'send' | 'recv';
}

export interface SfuConnectTransportPayload {
  transportId: string;
  dtlsParameters: DtlsParameters;
}

export interface SfuProducePayload {
  transportId: string;
  kind: MediaKind;
  rtpParameters: RtpParameters;
}

export interface SfuConsumePayload {
  callUuid: string;
  participantUuid: string;
  producerId: string;
  rtpCapabilities: RtpCapabilities;
}

// ---------------------------------------------------------------------------
// Router media codecs — VP8, VP9, H.264, Opus
// ---------------------------------------------------------------------------

export const ROUTER_MEDIA_CODECS: RtpCodecCapability[] = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    preferredPayloadType: 100,
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    preferredPayloadType: 101,
    clockRate: 90000,
    parameters: { 'x-google-start-bitrate': 1000 },
  },
  {
    kind: 'video',
    mimeType: 'video/VP9',
    preferredPayloadType: 102,
    clockRate: 90000,
    parameters: { 'profile-id': 2, 'x-google-start-bitrate': 1000 },
  },
  {
    kind: 'video',
    mimeType: 'video/h264',
    preferredPayloadType: 103,
    clockRate: 90000,
    parameters: {
      'packetization-mode': 1,
      'profile-level-id': '4d0032',
      'level-asymmetry-allowed': 1,
      'x-google-start-bitrate': 1000,
    },
  },
];
