import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ExperimentSession } from './experiments';
import {
  STUDY_BUNDLE_FORMAT,
  STUDY_BUNDLE_MAX_BYTES,
  STUDY_BUNDLE_MAX_DEPTH,
  STUDY_BUNDLE_MAX_RUNS,
  STUDY_BUNDLE_MAX_STRING_LENGTH,
  STUDY_BUNDLE_VERSION,
  StudyBundleError,
  canonicalStudyJson,
  createStudyBundle,
  encodeStudyBundle,
  parseStudyBundle,
  verifyStudyBundle,
  type CreateStudyBundleInput,
  type PortableGraphV1,
  type StudyBundleErrorCode,
  type StudyBundleV1,
  type StudyRunRecordV1,
  type StudyVariantSpecV1,
} from './studyBundle';

const CREATED_AT = '2026-07-14T01:00:00.000Z';
const COMPLETED_AT = '2026-07-14T01:02:00.000Z';

function session(): ExperimentSession {
  return {
    id: 'study-golden-1',
    createdAt: CREATED_AT,
    hypothesis: 'A smaller learning rate improves held-out accuracy.',
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    repetitions: 1,
    status: 'completed',
    winnerId: 'tuned',
    winnerLabel: 'Tuned',
    variants: [
      {
        id: 'baseline',
        label: 'Baseline',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.8],
        mean: 0.8,
        runtimeMs: 1_000,
        observedMetrics: {
          'Accuracy.accuracy': 0.8,
          'system.runtime_ms': 1_000,
        },
        operationSummary: [],
        errors: [],
      },
      {
        id: 'tuned',
        label: 'Tuned',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.9],
        mean: 0.9,
        runtimeMs: 900,
        observedMetrics: {
          'system.runtime_ms': 900,
          'Accuracy.accuracy': 0.9,
        },
        operationSummary: ['set trainer: learning_rate, api_key'],
        errors: [],
      },
    ],
    insights: {
      summary: ['Tuned has the top observed mean.'],
      warnings: ['Pilot evidence only.'],
      paperIdeas: [{
        title: 'Learning-rate sensitivity',
        evidence: 'The tuned candidate led this pilot.',
        nextStep: 'Repeat with controlled seeds.',
      }],
    },
  };
}

function baseline(): PortableGraphV1 {
  return {
    name: 'portable-study',
    description: 'Golden portable graph',
    nodes: [
      {
        id: 'trainer',
        type: 'Trainer',
        position: { x: 10, y: 20 },
        data: {
          params: {
            learning_rate: 0.01,
            api_key: { $gcpSecretRef: 'trainer-api-key' },
          },
        },
      },
      {
        id: 'accuracy',
        type: 'Accuracy',
        position: { x: 300, y: 20 },
        data: { params: {} },
      },
    ],
    edges: [{
      id: 'edge-1',
      source: 'trainer',
      target: 'accuracy',
      sourceHandle: 'predictions',
      targetHandle: 'predictions',
      type: 'data',
    }],
    presets: [],
    segmentGroups: [],
  };
}

function variants(): StudyVariantSpecV1[] {
  return [
    { id: 'baseline', label: 'Baseline', operations: [] },
    {
      id: 'tuned',
      label: 'Tuned',
      operations: [{
        op: 'set_params',
        node_id: 'trainer',
        params: {
          learning_rate: 0.001,
          api_key: { $gcpSecretRef: 'trainer-api-key' },
        },
      }],
    },
  ];
}

function runs(): StudyRunRecordV1[] {
  return [
    {
      runKey: 'baseline:1',
      runId: 'run-baseline-1',
      graphId: 'graph-baseline',
      variantId: 'baseline',
      repetition: 1,
      status: 'completed',
      startedAt: '2026-07-14T01:00:10.000Z',
      completedAt: '2026-07-14T01:00:11.000Z',
      durationMs: 1_000,
      metrics: [
        {
          observedKey: 'accuracy.accuracy',
          canonicalKey: 'Accuracy.accuracy',
          value: 0.8,
          source: 'output_summary',
        },
        {
          observedKey: 'system.runtime_ms',
          canonicalKey: 'system.runtime_ms',
          value: 1_000,
          source: 'client',
        },
      ],
    },
    {
      runKey: 'tuned:1',
      runId: 'run-tuned-1',
      graphId: 'graph-tuned',
      variantId: 'tuned',
      repetition: 1,
      status: 'completed',
      startedAt: '2026-07-14T01:01:00.000Z',
      completedAt: '2026-07-14T01:01:00.900Z',
      durationMs: 900,
      metrics: [
        {
          observedKey: 'accuracy.accuracy',
          canonicalKey: 'Accuracy.accuracy',
          value: 0.9,
          source: 'output_summary',
        },
        {
          observedKey: 'system.runtime_ms',
          canonicalKey: 'system.runtime_ms',
          value: 900,
          source: 'client',
        },
      ],
    },
  ];
}

function input(): CreateStudyBundleInput {
  return {
    session: session(),
    completedAt: COMPLETED_AT,
    producer: {
      pluginId: 'graph-copilot',
      pluginVersion: '0.2.0',
      codefyuiApiVersion: 2,
    },
    provenance: {
      facts: [
        {
          key: 'codefyui.api_version',
          status: 'observed',
          source: 'plugin-api',
          collectedAt: CREATED_AT,
          value: 2,
        },
        {
          key: 'codefyui.release',
          status: 'unavailable',
          source: 'plugin-api',
        },
      ],
    },
    baseline: baseline(),
    variants: variants(),
    runs: runs(),
    redactionReport: {
      policy: 'explicit-secret-ref-v1',
      secretRequirements: [{
        id: 'trainer-api-key',
        locations: [
          '/spec/baseline/nodes/0/data/params/api_key',
          '/spec/variants/1/operations/0/params/api_key',
        ],
        reason: 'Trainer.api_key is declared as a secret parameter.',
        requiredAtReplay: false,
        nodeType: 'Trainer',
        parameter: 'api_key',
      }],
      textRedactions: [],
    },
  };
}

async function bundle(): Promise<StudyBundleV1> {
  return createStudyBundle(input());
}

async function mutableBundle(): Promise<Record<string, any>> {
  return JSON.parse(await encodeStudyBundle(await bundle())) as Record<string, any>;
}

async function resignMutableBundle(value: Record<string, any>): Promise<Record<string, any>> {
  const unsigned = canonicalStudyJson({
    format: value.format,
    formatVersion: value.formatVersion,
    payload: value.payload,
  });
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(unsigned));
  value.integrity.contentSha256 = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return value;
}

async function expectCode(promise: Promise<unknown>, code: StudyBundleErrorCode): Promise<void> {
  await expect(promise).rejects.toMatchObject({ code });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('plugin-canonical-v1', () => {
  it('sorts object keys recursively while retaining array order', () => {
    expect(canonicalStudyJson({ z: 1, a: [3, { b: true, a: null }] })).toBe(
      '{"a":[3,{"a":null,"b":true}],"z":1}',
    );
    expect(canonicalStudyJson({ negativeZero: -0 })).toBe('{"negativeZero":0}');
  });

  it('rejects non-finite, unsupported, sparse, cyclic, over-deep, and over-long values', () => {
    expect(() => canonicalStudyJson({ bad: Number.NaN })).toThrowError(
      expect.objectContaining({ code: 'INVALID_VALUE' }),
    );
    expect(() => canonicalStudyJson({ bad: undefined })).toThrowError(
      expect.objectContaining({ code: 'INVALID_VALUE' }),
    );
    const sparse = new Array(2);
    sparse[1] = 1;
    expect(() => canonicalStudyJson(sparse)).toThrowError(
      expect.objectContaining({ code: 'INVALID_VALUE' }),
    );
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(() => canonicalStudyJson(cyclic)).toThrowError(
      expect.objectContaining({ code: 'INVALID_VALUE' }),
    );
    let deep: unknown = 'leaf';
    for (let index = 0; index < STUDY_BUNDLE_MAX_DEPTH + 2; index += 1) deep = { child: deep };
    expect(() => canonicalStudyJson(deep)).toThrowError(
      expect.objectContaining({ code: 'LIMIT_EXCEEDED' }),
    );
    expect(() => canonicalStudyJson('x'.repeat(STUDY_BUNDLE_MAX_STRING_LENGTH + 1))).toThrowError(
      expect.objectContaining({ code: 'LIMIT_EXCEEDED' }),
    );
  });
});

describe('StudyBundleV1 create, encode, and parse', () => {
  it('creates a deterministic golden bundle and round-trips immutable data', async () => {
    const first = await bundle();
    const second = await bundle();
    const firstEncoded = await encodeStudyBundle(first);
    const secondEncoded = await encodeStudyBundle(second);

    expect(first.format).toBe(STUDY_BUNDLE_FORMAT);
    expect(first.formatVersion).toBe(STUDY_BUNDLE_VERSION);
    expect(first.integrity.canonicalization).toBe('plugin-canonical-v1');
    expect(first.integrity.contentSha256).toBe(
      'ec752a90acc0bfa526f973c4718752e57c61896d912b0c4ac083700fa8ee40f7',
    );
    expect(second.integrity.contentSha256).toBe(first.integrity.contentSha256);
    expect(secondEncoded).toBe(firstEncoded);

    const parsed = await parseStudyBundle(firstEncoded);
    expect(parsed).toEqual(first);
    expect(Object.isFrozen(parsed)).toBe(true);
    expect(Object.isFrozen(parsed.payload.spec.baseline.nodes[0].data)).toBe(true);
    expect(parsed.payload.derived.variants[1].observedMetrics).toEqual([
      { key: 'accuracy.accuracy', value: 0.9 },
      { key: 'system.runtime_ms', value: 900 },
    ]);
  });

  it('clones caller data before hashing so later mutation cannot change the bundle', async () => {
    const source = input();
    const created = await createStudyBundle(source);
    (source.baseline.nodes[0].data.params as Record<string, unknown>).learning_rate = 999;
    (source.variants[1].operations as any[])[0].params.learning_rate = 999;
    expect((created.payload.spec.baseline.nodes[0].data.params as any).learning_rate).toBe(0.01);
    expect((created.payload.spec.variants[1].operations[0] as any).params.learning_rate).toBe(0.001);
    await expect(encodeStudyBundle(created)).resolves.toContain('study-golden-1');
  });

  it('retains raw per-run metric identities and a derived current-session summary', async () => {
    const created = await bundle();
    expect(created.payload.runs).toHaveLength(2);
    expect(created.payload.runs[1].metrics[0]).toEqual({
      observedKey: 'accuracy.accuracy',
      canonicalKey: 'Accuracy.accuracy',
      value: 0.9,
      source: 'output_summary',
    });
    expect(created.payload.derived.winnerId).toBe('tuned');
    expect(created.payload.derived.variants[1].metricValues).toEqual([0.9]);
  });

  it('retains execution policy while canonicalizing cached statistics from raw runs', async () => {
    const source: CreateStudyBundleInput = {
      ...input(),
      concurrency: 2,
      applyBestRequested: true,
    };
    source.session.baselineVariantId = 'baseline';
    source.session.variants[0].confidenceInterval95 = { level: 0.95, lower: 0.79, upper: 0.81 };
    source.session.variants[1].baselineComparison = {
      baselineId: 'baseline',
      meanDelta: 0.1,
      objectiveImprovement: 0.1,
      hedgesG: 1.2,
    };

    const created = await createStudyBundle(source);
    expect(created.payload.spec).toMatchObject({
      concurrency: 2,
      applyBestRequested: true,
    });
    expect(created.payload.derived.baselineVariantId).toBe('baseline');
    expect(created.payload.derived.variants[0].confidenceInterval95).toBeUndefined();
    expect(created.payload.derived.variants[1].baselineComparison).toMatchObject({
      baselineId: 'baseline',
    });
    expect(created.payload.derived.variants[1].baselineComparison?.meanDelta).toBeCloseTo(0.1);
    expect(created.payload.derived.variants[1].baselineComparison?.objectiveImprovement).toBeCloseTo(0.1);
    expect(created.payload.derived.variants[1].baselineComparison?.hedgesG).toBeUndefined();
  });

  it('clears ranked statistics when completed candidates resolve different canonical metrics', async () => {
    const original = input();
    const source: CreateStudyBundleInput = {
      ...original,
      runs: original.runs.map((run, runIndex) => runIndex !== 1
        ? run
        : {
          ...run,
          metrics: run.metrics.map((metric, metricIndex) => metricIndex !== 0
            ? metric
            : { ...metric, canonicalKey: 'OtherAccuracy.accuracy' }),
        }),
    };

    const created = await createStudyBundle(source);
    expect(created.payload.derived.status).toBe('failed');
    expect(created.payload.derived.winnerId).toBeUndefined();
    for (const variant of created.payload.derived.variants) {
      expect(variant.status).toBe('failed');
      expect(variant.metricValues).toEqual([]);
      expect(variant.mean).toBeUndefined();
      expect(variant.stddev).toBeUndefined();
      expect(variant.confidenceInterval95).toBeUndefined();
      expect(variant.baselineComparison).toBeUndefined();
    }
    await expect(verifyStudyBundle(created)).resolves.toStrictEqual(created);
  });

  it('uses explicit SecretRefs and verifies exact declared locations', async () => {
    const created = await bundle();
    const encoded = await encodeStudyBundle(created);
    expect(encoded).toContain('$gcpSecretRef');
    expect(encoded).toContain('trainer-api-key');
    expect(created.payload.redactionReport.secretRequirements[0].locations).toEqual([
      '/spec/baseline/nodes/0/data/params/api_key',
      '/spec/variants/1/operations/0/params/api_key',
    ]);

    const missing = input();
    (missing.redactionReport.secretRequirements as any[]).length = 0;
    await expectCode(createStudyBundle(missing), 'INVALID_BUNDLE');

    const wrongLocation = input();
    (wrongLocation.redactionReport.secretRequirements[0].locations as string[])[0] = '/spec/wrong';
    await expectCode(createStudyBundle(wrongLocation), 'INVALID_BUNDLE');
  });

  it('does not falsely claim it can recognize credentials in arbitrary ordinary strings', async () => {
    const source = input();
    (source.baseline.nodes[0].data.params as Record<string, unknown>).api_key = 'opaque ordinary string';
    (source.variants[1].operations[0] as any).params.api_key = 'opaque ordinary string';
    (source.redactionReport.secretRequirements as any[]).length = 0;
    const created = await createStudyBundle(source);
    expect((created.payload.spec.baseline.nodes[0].data.params as any).api_key).toBe(
      'opaque ordinary string',
    );
    expect(created.payload.redactionReport.secretRequirements).toEqual([]);
  });

  it('parses data without network, WebSocket, storage, or graph-apply authority', async () => {
    const fetchSpy = vi.fn();
    const webSocketSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    vi.stubGlobal('WebSocket', webSocketSpy);
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    const encoded = await encodeStudyBundle(await bundle());

    await expect(parseStudyBundle(encoded)).resolves.toMatchObject({ format: STUDY_BUNDLE_FORMAT });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(webSocketSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
  });
});

describe('strict import and integrity failures', () => {
  it('rejects tampering after a valid export', async () => {
    const tampered = await mutableBundle();
    tampered.payload.spec.hypothesis = 'A different, unsigned claim.';
    await expectCode(parseStudyBundle(JSON.stringify(tampered)), 'INTEGRITY_MISMATCH');
  });

  it('rejects rehashed derived statistics and winners that disagree with raw runs', async () => {
    const source = input();
    source.session.baselineVariantId = 'baseline';
    const valid = JSON.parse(await encodeStudyBundle(await createStudyBundle(source))) as Record<string, any>;
    const mutationCases: Array<(candidate: Record<string, any>) => void> = [
      (candidate) => { candidate.payload.derived.variants[1].metricValues = [99]; },
      (candidate) => { candidate.payload.derived.variants[1].mean = 99; },
      (candidate) => { candidate.payload.derived.variants[1].stddev = 99; },
      (candidate) => {
        candidate.payload.derived.variants[1].confidenceInterval95 = {
          level: 0.95,
          lower: 98,
          upper: 100,
        };
      },
      (candidate) => {
        candidate.payload.derived.variants[1].baselineComparison.objectiveImprovement = 99;
      },
      (candidate) => {
        candidate.payload.derived.winnerId = 'baseline';
        candidate.payload.derived.winnerLabel = 'Baseline';
      },
    ];

    for (const mutate of mutationCases) {
      const candidate = structuredClone(valid) as Record<string, any>;
      mutate(candidate);
      await expectCode(verifyStudyBundle(await resignMutableBundle(candidate)), 'INVALID_BUNDLE');
    }
  });

  it('rejects conflicting duplicate samples for the resolved canonical objective', async () => {
    const candidate = await mutableBundle();
    candidate.payload.runs[1].metrics.push({
      observedKey: 'accuracy.shadow',
      canonicalKey: 'Accuracy.accuracy',
      value: 0.1,
      source: 'progress',
    });
    await expectCode(verifyStudyBundle(await resignMutableBundle(candidate)), 'INVALID_BUNDLE');
  });

  it('rejects malformed JSON and input larger than five MiB before parsing', async () => {
    await expectCode(parseStudyBundle('{not-json'), 'INVALID_JSON');
    await expectCode(parseStudyBundle('x'.repeat(STUDY_BUNDLE_MAX_BYTES + 1)), 'BUNDLE_TOO_LARGE');
  });

  it('distinguishes unsupported formats, old versions, and future versions', async () => {
    const wrongFormat = await mutableBundle();
    wrongFormat.format = 'someone.else';
    await expectCode(verifyStudyBundle(wrongFormat), 'UNSUPPORTED_FORMAT');

    const old = await mutableBundle();
    old.formatVersion = 0;
    await expectCode(verifyStudyBundle(old), 'UNSUPPORTED_VERSION');

    const future = await mutableBundle();
    future.formatVersion = STUDY_BUNDLE_VERSION + 1;
    await expectCode(verifyStudyBundle(future), 'FUTURE_VERSION');
  });

  it('rejects unknown properties at root and nested controlled records', async () => {
    const rootExtra = await mutableBundle();
    rootExtra.surprise = true;
    await expectCode(verifyStudyBundle(rootExtra), 'INVALID_BUNDLE');

    const nestedExtra = await mutableBundle();
    nestedExtra.payload.spec.variants[0].surprise = true;
    await expectCode(verifyStudyBundle(nestedExtra), 'INVALID_BUNDLE');

    const secretExtra = await mutableBundle();
    secretExtra.payload.spec.baseline.nodes[0].data.params.api_key.extra = 'not allowed';
    await expectCode(verifyStudyBundle(secretExtra), 'INVALID_BUNDLE');
  });

  it('rejects non-finite direct values, invalid dates, duplicate ids, and duplicate run slots', async () => {
    const nonFinite = await mutableBundle();
    nonFinite.payload.runs[0].metrics[0].value = Number.NaN;
    await expectCode(verifyStudyBundle(nonFinite), 'INVALID_VALUE');

    const badDate = await mutableBundle();
    badDate.payload.completedAt = '2026-07-14';
    await expectCode(verifyStudyBundle(badDate), 'INVALID_BUNDLE');

    const duplicateVariant = await mutableBundle();
    duplicateVariant.payload.spec.variants[1].id = 'baseline';
    await expectCode(verifyStudyBundle(duplicateVariant), 'INVALID_BUNDLE');

    const duplicateRun = await mutableBundle();
    duplicateRun.payload.runs[1].runKey = duplicateRun.payload.runs[0].runKey;
    await expectCode(verifyStudyBundle(duplicateRun), 'INVALID_BUNDLE');

    const duplicateSlot = await mutableBundle();
    duplicateSlot.payload.runs[1].variantId = 'baseline';
    await expectCode(verifyStudyBundle(duplicateSlot), 'INVALID_BUNDLE');
  });

  it('enforces run and collection limits before integrity verification', async () => {
    const tooManyRuns = await mutableBundle();
    tooManyRuns.payload.runs = Array.from(
      { length: STUDY_BUNDLE_MAX_RUNS + 1 },
      (_, index) => ({ ...tooManyRuns.payload.runs[0], runKey: `run-${index}` }),
    );
    await expectCode(verifyStudyBundle(tooManyRuns), 'LIMIT_EXCEEDED');

    const tooManyVariantsInput = input();
    const originalSpec = tooManyVariantsInput.variants[0];
    const originalResult = tooManyVariantsInput.session.variants[0];
    (tooManyVariantsInput.variants as StudyVariantSpecV1[]).push(
      ...Array.from({ length: 8 }, (_, index) => ({
        ...originalSpec,
        id: `extra-${index}`,
        label: `Extra ${index}`,
      })),
    );
    tooManyVariantsInput.session.variants.push(
      ...Array.from({ length: 8 }, (_, index) => ({
        ...originalResult,
        id: `extra-${index}`,
        label: `Extra ${index}`,
      })),
    );
    await expectCode(createStudyBundle(tooManyVariantsInput), 'LIMIT_EXCEEDED');
  });

  it('returns typed StudyBundleError instances with useful codes', async () => {
    try {
      await parseStudyBundle('{');
      throw new Error('expected parse to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(StudyBundleError);
      expect((error as StudyBundleError).code).toBe('INVALID_JSON');
    }
  });
});
