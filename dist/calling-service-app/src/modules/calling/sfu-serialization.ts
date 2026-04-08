import type { RtpCapabilities, DtlsParameters } from './sfu.types';

/**
 * Serializes RTP capabilities to a JSON string for transmission to a client.
 * The resulting string can be parsed by a mediasoup-client Device without error.
 *
 * Validates: Requirements 11.1
 */
export function serializeRtpCapabilities(caps: RtpCapabilities): string {
  return JSON.stringify(caps);
}

/**
 * Parses a client JSON string into a mediasoup DtlsParameters object.
 * Used before calling transport.connect().
 *
 * Validates: Requirements 11.2
 */
export function deserializeDtlsParameters(json: string): DtlsParameters {
  return JSON.parse(json) as DtlsParameters;
}

/**
 * Returns a human-readable formatted JSON string of RTP capabilities.
 *
 * Validates: Requirements 11.3
 */
export function prettyPrintRtpCapabilities(caps: RtpCapabilities): string {
  return JSON.stringify(caps, null, 2);
}
