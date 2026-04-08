import * as fc from 'fast-check';
import { serializeRtpCapabilities, deserializeDtlsParameters, prettyPrintRtpCapabilities } from './sfu-serialization';
import type { RtpCapabilities } from './sfu.types';

// ─── Arbitraries ─────────────────────────────────────────────────────────────

const rtpCodecCapabilityArb = fc.record({
  kind: fc.constantFrom('audio', 'video') as fc.Arbitrary<'audio' | 'video'>,
  mimeType: fc.oneof(
    fc.constant('audio/opus'),
    fc.constant('video/VP8'),
    fc.constant('video/VP9'),
    fc.constant('video/H264'),
  ),
  preferredPayloadType: fc.integer({ min: 96, max: 127 }),
  clockRate: fc.oneof(fc.constant(48000), fc.constant(90000)),
  channels: fc.option(fc.integer({ min: 1, max: 2 }), { nil: undefined }),
  parameters: fc.option(
    fc.dictionary(fc.string({ minLength: 1, maxLength: 20 }), fc.oneof(fc.integer(), fc.string())),
    { nil: undefined },
  ),
});

const rtpCapabilitiesArb: fc.Arbitrary<RtpCapabilities> = fc.record({
  codecs: fc.array(rtpCodecCapabilityArb, { minLength: 0, maxLength: 5 }),
  headerExtensions: fc.constant(undefined),
});

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('sfu-serialization', () => {
  describe('serializeRtpCapabilities', () => {
    it('should return a valid JSON string', () => {
      const caps: RtpCapabilities = { codecs: [] };
      const result = serializeRtpCapabilities(caps);
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('should serialize codecs correctly', () => {
      const caps: RtpCapabilities = {
        codecs: [{ kind: 'audio', mimeType: 'audio/opus', preferredPayloadType: 100, clockRate: 48000, channels: 2 }],
      };
      const parsed = JSON.parse(serializeRtpCapabilities(caps));
      expect(parsed.codecs[0].mimeType).toBe('audio/opus');
    });
  });

  describe('deserializeDtlsParameters', () => {
    it('should parse a valid DTLS parameters JSON string', () => {
      const dtls = {
        role: 'client',
        fingerprints: [{ algorithm: 'sha-256', value: 'AA:BB:CC' }],
      };
      const result = deserializeDtlsParameters(JSON.stringify(dtls));
      expect(result.role).toBe('client');
      expect(result.fingerprints[0].algorithm).toBe('sha-256');
    });
  });

  describe('prettyPrintRtpCapabilities', () => {
    it('should return indented JSON with 2 spaces', () => {
      const caps: RtpCapabilities = { codecs: [] };
      const result = prettyPrintRtpCapabilities(caps);
      expect(result).toBe(JSON.stringify(caps, null, 2));
    });

    it('should produce valid JSON', () => {
      const caps: RtpCapabilities = {
        codecs: [{ kind: 'video', mimeType: 'video/VP8', preferredPayloadType: 101, clockRate: 90000 }],
      };
      expect(() => JSON.parse(prettyPrintRtpCapabilities(caps))).not.toThrow();
    });
  });

  // ─── Property-based test ──────────────────────────────────────────────────

  /**
   * Property: Round-trip consistency
   * For all valid RtpCapabilities objects, deserialize(serialize(caps)) produces an equivalent object.
   *
   * Validates: Requirements 11.4
   */
  describe('round-trip property', () => {
    it('serialize then JSON.parse produces an equivalent RtpCapabilities object', () => {
      fc.assert(
        fc.property(rtpCapabilitiesArb, (caps) => {
          const serialized = serializeRtpCapabilities(caps);
          const deserialized = JSON.parse(serialized) as RtpCapabilities;
          expect(deserialized).toEqual(caps);
        }),
      );
    });
  });
});
