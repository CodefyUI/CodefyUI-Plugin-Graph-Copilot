import { describe, expect, it } from 'vitest';
import type { NodeDefinition, SerializedGraph } from '../types/codefyui';
import type {
  ExperimentSearchMetadata,
  ExperimentSession,
  GraphExperimentRequest,
} from './experiments';
import { encodeStudyBundle, verifyStudyBundle } from './studyBundle';
import {
  createPortableStudyCapture,
  type CreatePortableStudyCaptureInput,
} from './studyCapture';

const CREATED_AT = '2026-07-14T02:00:00.000Z';
const COMPLETED_AT = '2026-07-14T02:01:00.000Z';

const DEFINITIONS: NodeDefinition[] = [
  {
    node_name: 'Trainer',
    category: 'test',
    description: 'Trainer',
    inputs: [],
    outputs: [],
    params: [
      {
        name: 'learning_rate',
        param_type: 'float',
        default: 0.1,
        description: 'Learning rate',
        options: [],
        min_value: 0,
        max_value: 1,
      },
      {
        name: 'config',
        param_type: 'string',
        default: '',
        description: 'Configuration',
        options: [],
        min_value: null,
        max_value: null,
      },
      {
        name: 'api_key',
        param_type: 'secret',
        default: '',
        description: 'Credential',
        options: [],
        min_value: null,
        max_value: null,
      },
    ],
  },
  {
    node_name: 'Added',
    category: 'test',
    description: 'Added node',
    inputs: [],
    outputs: [],
    params: [
      {
        name: 'token',
        param_type: 'secret',
        default: '',
        description: 'Credential',
        options: [],
        min_value: null,
        max_value: null,
      },
      {
        name: 'width',
        param_type: 'int',
        default: 7,
        description: 'Width',
        options: [],
        min_value: 1,
        max_value: 64,
      },
    ],
  },
];

function baseline(secret = 'sk-super-secret'): SerializedGraph {
  return {
    name: 'capture fixture',
    nodes: [{
      id: 'trainer',
      type: 'Trainer',
      position: { x: 10, y: 20 },
      data: {
        params: {
          learning_rate: 0.1,
          api_key: secret,
        },
      },
    }],
    edges: [],
    presets: [],
  };
}

function request(secret = 'sk-super-secret'): GraphExperimentRequest {
  return {
    hypothesis: `Using ${secret} should not leak into a study.`,
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    repetitions: 1,
    variants: [
      { id: 'baseline', label: 'Baseline', operations: [] },
      {
        id: 'tuned',
        label: `Tuned ${secret}`,
        operations: [{
          op: 'set_params',
          node_id: 'trainer',
          params: { learning_rate: 0.01, api_key: secret },
        }],
      },
    ],
  };
}

function session(secret = 'sk-super-secret'): ExperimentSession {
  return {
    id: 'study-capture-1',
    createdAt: CREATED_AT,
    hypothesis: `Using ${secret} should not leak into a study.`,
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    repetitions: 1,
    status: 'completed',
    baselineVariantId: 'baseline',
    winnerId: 'tuned',
    winnerLabel: `Tuned ${secret}`,
    variants: [
      {
        id: 'baseline',
        label: 'Baseline',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.8],
        mean: 0.8,
        runtimeMs: 100,
        observedMetrics: { 'Accuracy.accuracy': 0.8, 'system.runtime_ms': 100 },
        runs: [{
          repetition: 1,
          status: 'completed',
          durationMs: 100,
          metricKey: 'Accuracy.accuracy',
          metricValue: 0.8,
          metricSource: 'output_summary',
          observedMetrics: { 'Accuracy.accuracy': 0.8, 'system.runtime_ms': 100 },
        }],
        operationSummary: [],
        errors: [],
      },
      {
        id: 'tuned',
        label: `Tuned ${secret}`,
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.9],
        mean: 0.9,
        runtimeMs: 90,
        observedMetrics: { 'Accuracy.accuracy': 0.9, 'system.runtime_ms': 90 },
        runs: [{
          repetition: 1,
          status: 'completed',
          durationMs: 90,
          metricKey: 'Accuracy.accuracy',
          metricValue: 0.9,
          metricSource: 'progress',
          observedMetrics: { 'Accuracy.accuracy': 0.9, 'system.runtime_ms': 90 },
        }],
        operationSummary: ['set trainer: learning_rate, api_key'],
        errors: [`Diagnostic echo: ${secret}`],
      },
    ],
    insights: {
      summary: [`Winner used ${secret}.`],
      warnings: [`Never publish ${secret}.`],
      paperIdeas: [{
        title: `A study of ${secret}`,
        evidence: `${secret} appeared in the pilot input.`,
        nextStep: `Replace ${secret} before replication.`,
      }],
    },
  };
}

function input(secret = 'sk-super-secret'): CreatePortableStudyCaptureInput {
  return {
    session: session(secret),
    request: request(secret),
    baseline: baseline(secret),
    definitions: DEFINITIONS,
    pluginVersion: '0.2.0',
    codefyuiApiVersion: 2,
    completedAt: COMPLETED_AT,
    provenanceFacts: [{
      key: 'test.fixture',
      status: 'declared',
      source: 'unit test',
      value: true,
    }],
  };
}

describe('createPortableStudyCapture', () => {
  it('removes declared secret bytes, emits exact refs/locations, and verifies the bundle', async () => {
    const secret = 'sk-super-secret';
    const bundle = await createPortableStudyCapture(input(secret));
    const encoded = await encodeStudyBundle(bundle);

    expect(encoded).not.toContain(secret);
    expect(bundle.payload.spec.baseline.nodes[0].data.params).toEqual({
      learning_rate: 0.1,
      api_key: { $gcpSecretRef: 'trainer-api-key' },
    });
    expect(bundle.payload.spec.variants[1].operations[0]).toEqual({
      op: 'set_params',
      node_id: 'trainer',
      params: {
        learning_rate: 0.01,
        api_key: { $gcpSecretRef: 'trainer-api-key' },
      },
    });
    expect(bundle.payload.redactionReport.secretRequirements).toContainEqual(
      expect.objectContaining({
        id: 'trainer-api-key',
        locations: [
          '/spec/baseline/nodes/0/data/params/api_key',
          '/spec/variants/1/operations/0/params/api_key',
        ],
        nodeType: 'Trainer',
        parameter: 'api_key',
        requiredAtReplay: true,
      }),
    );
    const textLocations = bundle.payload.redactionReport.textRedactions.flatMap(
      (redaction) => redaction.locations,
    );
    expect(textLocations).toEqual(expect.arrayContaining([
      '/spec/hypothesis',
      '/spec/variants/1/label',
      '/derived/variants/1/label',
      '/derived/variants/1/errors/0',
      '/derived/insights/summary/0',
      '/derived/insights/paperIdeas/0/evidence',
    ]));
    await expect(verifyStudyBundle(bundle)).resolves.toStrictEqual(bundle);
  });

  it('redacts unknown schemas, unknown params, and credential-shaped nested keys fail-closed', async () => {
    const source = input();
    source.baseline.nodes.push({
      id: 'mystery',
      type: 'Uncatalogued',
      data: { params: { harmlessLooking: 'opaque-value' } },
    });
    (source.baseline.nodes[0].data!.params as Record<string, unknown>).future_param = 'future-value';
    (source.baseline.nodes[0].data!.params as Record<string, unknown>).config = {
      endpoint: 'local',
      nested: { authorization: 'Bearer nested-secret' },
    };

    const bundle = await createPortableStudyCapture(source);
    const encoded = await encodeStudyBundle(bundle);
    const trainerParams = bundle.payload.spec.baseline.nodes[0].data.params as Record<string, unknown>;
    const mysteryParams = bundle.payload.spec.baseline.nodes[1].data.params as Record<string, unknown>;

    expect(trainerParams.future_param).toEqual({ $gcpSecretRef: 'trainer-future-param' });
    expect(trainerParams.config).toEqual({
      endpoint: 'local',
      nested: { authorization: { $gcpSecretRef: expect.any(String) } },
    });
    expect(mysteryParams.harmlessLooking).toEqual({ $gcpSecretRef: 'mystery-harmlesslooking' });
    expect(encoded).not.toContain('opaque-value');
    expect(encoded).not.toContain('future-value');
    expect(encoded).not.toContain('nested-secret');
  });

  it('scrubs exact echoes of every fail-closed value from evidence and provenance text', async () => {
    const source = input();
    const unknownParam = 'unknown-param-echo';
    const unknownSchema = 'unknown-schema-echo';
    const nestedCredential = 'nested-credential-echo';
    const presetValue = 'preset-value-echo';
    const provenanceCredential = 'provenance-credential-echo';
    (source.baseline.nodes[0].data!.params as Record<string, unknown>).future_param = unknownParam;
    (source.baseline.nodes[0].data!.params as Record<string, unknown>).config = {
      nested: { authorization: nestedCredential },
    };
    source.baseline.nodes.push({
      id: 'mystery',
      type: 'Uncatalogued',
      data: { params: { ordinaryName: unknownSchema } },
    });
    source.baseline.presets = [{ label: presetValue }];
    const evidence = [unknownParam, unknownSchema, nestedCredential, presetValue].join(' / ');
    source.request.hypothesis = `Redacted evidence: ${evidence}`;
    source.session.hypothesis = source.request.hypothesis;
    source.session.variants[0].errors = [`Failure echoed ${evidence}`];
    const sourceWithProvenance: CreatePortableStudyCaptureInput = { ...source, provenanceFacts: [{
      key: 'runtime.auth-check',
      status: 'observed',
      source: 'unit test',
      value: {
        authorization: provenanceCredential,
        note: `the same value was ${provenanceCredential}`,
      },
    }] };

    const bundle = await createPortableStudyCapture(sourceWithProvenance);
    const encoded = await encodeStudyBundle(bundle);
    for (const removed of [
      unknownParam,
      unknownSchema,
      nestedCredential,
      presetValue,
      provenanceCredential,
    ]) {
      expect(encoded).not.toContain(removed);
    }
    expect(bundle.payload.spec.hypothesis).toContain('[REDACTED]');
    expect(bundle.payload.provenance.facts[0].value).toEqual({
      authorization: '[REDACTED]',
      note: 'the same value was [REDACTED]',
    });
  });

  it('resolves a sequential add_node ref for later set_params redaction', async () => {
    const source = input();
    source.request.variants[1].operations = [
      { op: 'add_node', node_type: 'Added', ref: 'new-node', params: { token: 'ref-secret' } },
      { op: 'set_params', node_id: 'new-node', params: { token: 'ref-secret' } },
    ];
    source.session.variants[1].operationSummary = ['add Added', 'set new-node: token'];

    const bundle = await createPortableStudyCapture(source);
    const requirement = bundle.payload.redactionReport.secretRequirements.find(
      (candidate) => candidate.id === 'new-node-token',
    );
    expect(requirement?.locations).toEqual([
      '/spec/variants/1/operations/0/params/token',
      '/spec/variants/1/operations/1/params/token',
    ]);
    expect(bundle.payload.spec.variants[1].operations).toEqual([
      {
        op: 'add_node',
        node_type: 'Added',
        ref: 'new-node',
        params: { token: { $gcpSecretRef: 'new-node-token' }, width: 7 },
      },
      {
        op: 'set_params',
        node_id: 'new-node',
        params: { token: { $gcpSecretRef: 'new-node-token' } },
      },
    ]);
    expect(await encodeStudyBundle(bundle)).not.toContain('ref-secret');
  });

  it('does not mutate the source session, request, graph, definitions, or provenance', async () => {
    const source = input();
    const before = JSON.stringify(source);
    await createPortableStudyCapture(source);
    expect(JSON.stringify(source)).toBe(before);
  });

  it('replaces every nonempty preset wholesale because its schema is unknown', async () => {
    const source = input();
    source.baseline.presets = [
      { name: 'one', api_key: 'preset-secret-1' },
      ['preset-secret-2'],
    ];
    const bundle = await createPortableStudyCapture(source);
    const encoded = await encodeStudyBundle(bundle);

    expect(bundle.payload.spec.baseline.presets).toEqual([
      { $gcpSecretRef: 'preset-1' },
      { $gcpSecretRef: 'preset-2' },
    ]);
    expect(encoded).not.toContain('preset-secret-1');
    expect(encoded).not.toContain('preset-secret-2');
    expect(bundle.payload.redactionReport.secretRequirements).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'preset-1', locations: ['/spec/baseline/presets/0'] }),
      expect.objectContaining({ id: 'preset-2', locations: ['/spec/baseline/presets/1'] }),
    ]));
  });

  it('converts per-run objective provenance, client runtime, and failure evidence', async () => {
    const source = input();
    source.request.repetitions = 2;
    source.session.repetitions = 2;
    source.session.status = 'partial';
    source.session.variants[0].status = 'failed';
    source.session.variants[0].runs = [
      {
        repetition: 1,
        status: 'completed',
        durationMs: 111,
        metricKey: 'Accuracy.accuracy',
        metricValue: 0.81,
        metricSource: 'progress',
        observedMetrics: { 'system.runtime_ms': 109 },
      },
      {
        repetition: 2,
        status: 'failed',
        durationMs: 22,
        observedMetrics: {},
        error: 'worker stopped',
      },
    ];
    source.session.variants[1].runs = [];

    const bundle = await createPortableStudyCapture(source);
    expect(bundle.payload.runs).toEqual([
      {
        runKey: 'baseline:rep:1',
        variantId: 'baseline',
        repetition: 1,
        status: 'completed',
        durationMs: 111,
        metrics: [
          {
            observedKey: 'Accuracy.accuracy',
            canonicalKey: 'Accuracy.accuracy',
            value: 0.81,
            source: 'progress',
          },
          {
            observedKey: 'system.runtime_ms',
            canonicalKey: 'system.runtime_ms',
            value: 109,
            source: 'client',
          },
        ],
      },
      {
        runKey: 'baseline:rep:2',
        variantId: 'baseline',
        repetition: 2,
        status: 'failed',
        durationMs: 22,
        metrics: [{
          observedKey: 'system.runtime_ms',
          canonicalKey: 'system.runtime_ms',
          value: 22,
          source: 'client',
        }],
        error: {
          phase: 'execute',
          code: 'EXPERIMENT_RUN_FAILED',
          message: 'worker stopped',
        },
      },
    ]);
  });

  it('normalizes only absent position/data and blocks missing semantic graph identities', async () => {
    const normalized = input();
    normalized.baseline.nodes[0] = { id: 'trainer', type: 'Trainer' };
    const bundle = await createPortableStudyCapture(normalized);
    expect(bundle.payload.spec.baseline.nodes[0]).toMatchObject({
      position: { x: 0, y: 0 },
      data: {},
    });

    const missingType = input();
    missingType.baseline.nodes[0] = { id: 'trainer', data: {} };
    await expect(createPortableStudyCapture(missingType)).rejects.toThrow('/spec/baseline/nodes/0/type');

    const missingHandle = input();
    missingHandle.baseline.edges = [{
      id: 'bad-edge',
      source: 'trainer',
      target: 'trainer',
      targetHandle: 'input',
    }];
    await expect(createPortableStudyCapture(missingHandle)).rejects.toThrow(
      '/spec/baseline/edges/0/sourceHandle',
    );

    const cyclic = input();
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    cyclic.baseline.nodes[0].data!.metadata = cycle;
    await expect(createPortableStudyCapture(cyclic)).rejects.toThrow('cyclic values are not portable');
  });

  it('preserves deterministic optimizer metadata only when it was present on the request', async () => {
    const search: ExperimentSearchMetadata = {
      schemaVersion: 1,
      strategy: 'seeded_random',
      prngVersion: 'mulberry32-v1',
      plannerSeed: 42,
      seedDescription: 'Planner-only seed; not a graph RNG seed.',
      includesBaseline: true,
      totalDomainAssignments: 4,
      baselineAssignmentExcluded: true,
      generatedCandidateCount: 1,
      totalVariantCount: 2,
      totalExecutionCount: 2,
      bindings: [{
        nodeId: 'trainer',
        nodeType: 'Trainer',
        param: 'learning_rate',
        paramType: 'float',
        baselineValue: 0.1,
        domain: [0.01, 0.1],
      }],
      assignments: [{
        variantId: 'tuned',
        domainIndex: 0,
        values: [{ nodeId: 'trainer', param: 'learning_rate', value: 0.01 }],
      }],
    };
    const optimized = input();
    optimized.request.search = search;
    optimized.session.search = JSON.parse(JSON.stringify(search)) as ExperimentSearchMetadata;
    const optimizedBundle = await createPortableStudyCapture(optimized);
    expect(optimizedBundle.payload.provenance.facts).toContainEqual({
      key: 'optimizer.plan',
      status: 'observed',
      source: 'graph-experiment request',
      value: search,
    });

    const directBundle = await createPortableStudyCapture(input());
    expect(directBundle.payload.provenance.facts.some((fact) => fact.key === 'optimizer.plan')).toBe(false);
  });

  it('keeps an empty baseline variant reviewable and portable', async () => {
    const bundle = await createPortableStudyCapture(input());
    expect(bundle.payload.spec.variants[0]).toEqual({
      id: 'baseline',
      label: 'Baseline',
      operations: [],
    });
  });
});
