import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  ApplyResult,
  CodefyUIPluginAPI,
  GraphOp,
  NodeDefinition,
  SerializedGraph,
} from '../types/codefyui';
import {
  EXPERIMENTS_CHANGED_EVENT,
  EXPERIMENTS_STORAGE_KEY,
  MAX_EXPERIMENT_VARIANTS,
  applyOperationsToClone,
  executeCandidateGraph,
  loadExperimentSessions,
  resolveObjectiveMetric,
  runGraphExperiments,
  saveExperimentSession,
} from './experiments';
import type { GraphExperimentRequest, GraphExperimentResult } from './experiments';
import {
  STUDY_STORAGE_BUNDLE_PREFIX,
  loadStudyBundle,
  loadStudyIndex,
} from './studyStorage';
import { verifyStudyBundle } from './studyBundle';

const DEFINITIONS: NodeDefinition[] = [
  {
    node_name: 'Start', category: 'Control', description: '', inputs: [], outputs: [], params: [],
  },
  {
    node_name: 'Model', category: 'Model', description: '', inputs: [], outputs: [],
    params: [
      { name: 'quality', param_type: 'float', default: 1, description: '', options: [], min_value: 0, max_value: 10 },
      { name: 'optional', param_type: 'string', default: undefined, description: '', options: [], min_value: null, max_value: null },
    ],
  },
  {
    node_name: 'Accuracy', category: 'Metric', description: '', inputs: [], outputs: [], params: [],
  },
];

const BASE_GRAPH: SerializedGraph = {
  nodes: [
    { id: 'start', type: 'Start', position: { x: 0, y: 0 }, data: { params: {} } },
    { id: 'model', type: 'Model', position: { x: 100, y: 0 }, data: { params: { quality: 1 } } },
    { id: 'metric', type: 'Accuracy', position: { x: 200, y: 0 }, data: { params: {} } },
    { id: 'note', type: 'note', position: { x: 0, y: 100 }, data: {} },
  ],
  edges: [
    { id: 'trigger', source: 'start', target: 'model', sourceHandle: 'trigger', targetHandle: '__trigger', type: 'trigger' },
    { id: 'score', source: 'model', target: 'metric', sourceHandle: 'output', targetHandle: 'input' },
    { id: 'note-edge', source: 'note', target: 'model', sourceHandle: '', targetHandle: '' },
  ],
  presets: [],
};

type SocketBehavior = (socket: MockWebSocket, payload: Record<string, unknown>) => void;
let socketBehavior: SocketBehavior;
let sentPayloads: Record<string, unknown>[];

class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 3;
  static instances: MockWebSocket[] = [];

  readyState = MockWebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  sent: Record<string, unknown> | null = null;

  constructor(public url: string) {
    MockWebSocket.instances.push(this);
    queueMicrotask(() => {
      if (this.readyState !== MockWebSocket.CONNECTING) return;
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.(new Event('open'));
    });
  }

  send(raw: string) {
    this.sent = JSON.parse(raw) as Record<string, unknown>;
    sentPayloads.push(this.sent);
    socketBehavior(this, this.sent);
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
  }

  emit(value: unknown) {
    this.onmessage?.({ data: JSON.stringify(value) } as MessageEvent);
  }

  emitRaw(value: string) {
    this.onmessage?.({ data: value } as MessageEvent);
  }

  fail() {
    this.onerror?.(new Event('error'));
  }

  drop() {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.(new CloseEvent('close'));
  }
}

interface FakeApiState {
  api: CodefyUIPluginAPI;
  storage: Map<string, string>;
  apply: ReturnType<typeof vi.fn>;
  setGraph(graph: SerializedGraph): void;
  setValidation(fn: (body: any) => { valid: boolean; errors: string[] }): void;
  triggerGraphChange(): void;
}

function fakeApi(): FakeApiState {
  let graph = structuredClone(BASE_GRAPH);
  let validation = (_body: any) => ({ valid: true, errors: [] as string[] });
  let graphChanged = () => {};
  const storage = new Map<string, string>();
  const apply = vi.fn((ops: GraphOp[]): ApplyResult => ({
    results: ops.map((_, index) => ({ index, ok: true })),
    refs: {}, node_count: graph.nodes.length, edge_count: graph.edges.length,
  }));
  const api = {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(() => structuredClone(graph)),
      getNodeDefinitions: vi.fn(() => DEFINITIONS),
      applyOperations: apply,
      onGraphChanged: vi.fn((callback: () => void) => {
        graphChanged = callback;
        return () => { graphChanged = () => {}; };
      }),
    },
    http: {
      fetch: vi.fn(async (url: string, init?: RequestInit) => {
        if (url === '/api/auth/bootstrap') {
          return { ok: true, status: 200, json: async () => ({ token: 'token-123' }) };
        }
        if (url === '/api/graph/validate') {
          const answer = validation(JSON.parse(String(init?.body ?? '{}')));
          return { ok: true, status: 200, json: async () => answer };
        }
        throw new Error(`unexpected URL ${url}`);
      }),
    },
    storage: {
      get: vi.fn((key: string) => storage.get(key) ?? null),
      set: vi.fn((key: string, value: string) => { storage.set(key, value); }),
      remove: vi.fn((key: string) => { storage.delete(key); }),
    },
  } as unknown as CodefyUIPluginAPI;
  return {
    api,
    storage,
    apply,
    setGraph(value) { graph = structuredClone(value); },
    setValidation(fn) { validation = fn; },
    triggerGraphChange() { graphChanged(); },
  };
}

function successfulSocketBehavior(transform: (quality: number, run: number) => number = (quality) => quality) {
  let run = 0;
  socketBehavior = (socket, payload) => {
    run += 1;
    const currentRun = run;
    const nodes = payload.nodes as Array<{ id: string; data?: { params?: Record<string, unknown> } }>;
    const quality = Number(nodes.find((node) => node.id === 'model')?.data?.params?.quality ?? 1);
    queueMicrotask(() => {
      socket.emitRaw('not-json');
      socket.emit({
        type: 'node_status', node_id: 'model', status: 'progress',
        progress: { epoch: currentRun, loss: 1 / quality, ignored: 'x' },
      });
      socket.emit({
        type: 'node_status', node_id: 'metric', status: 'completed',
        output_summary: {
          accuracy: { type: 'scalar', value: transform(quality, currentRun) },
          label: { type: 'string', value: 'ignored' },
        },
      });
      socket.emit({ type: 'execution_complete' });
    });
  };
}

function request(overrides: Partial<GraphExperimentRequest> = {}): GraphExperimentRequest {
  return {
    hypothesis: 'Higher quality improves accuracy',
    objective: { metric: 'accuracy', direction: 'maximize' },
    variants: [
      { id: 'baseline', label: 'Baseline', operations: [] },
      { id: 'high', label: 'High quality', operations: [{ op: 'set_params', node_id: 'model', params: { quality: 3 } }] },
    ],
    repetitions: 1,
    ...overrides,
  };
}

function installWebLocks(): void {
  let tail: Promise<void> = Promise.resolve();
  const requestLock = <T>(
    _name: string,
    _options: { mode: 'exclusive' },
    callback: () => Promise<T>,
  ): Promise<T> => {
    const result = tail.then(callback);
    tail = result.then(() => undefined, () => undefined);
    return result;
  };
  vi.stubGlobal('navigator', { locks: { request: vi.fn(requestLock) } });
}

beforeEach(() => {
  sentPayloads = [];
  MockWebSocket.instances = [];
  successfulSocketBehavior();
  vi.stubGlobal('WebSocket', MockWebSocket);
  installWebLocks();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('applyOperationsToClone', () => {
  it('creates a fully isolated structural candidate and resolves same-batch refs', () => {
    const baseline = structuredClone(BASE_GRAPH);
    const result = applyOperationsToClone(baseline, [
      { op: 'add_node', node_type: 'Model', ref: 'second', params: { quality: 2 } },
      { op: 'set_params', node_id: 'second', params: { quality: 4 } },
      { op: 'connect', source: 'start', source_handle: 'trigger', target: 'second', target_handle: '' },
      { op: 'remove_edge', source: 'model', target: 'metric' },
      { op: 'remove_node', node_id: 'metric' },
      { op: 'auto_layout' },
    ], DEFINITIONS);

    expect(result.results.every((item) => item.ok)).toBe(true);
    expect(result.refs.second).toMatch(/^candidate-node-/);
    expect(result.graph.nodes.find((node) => node.id === result.refs.second)?.data?.params?.quality).toBe(4);
    expect(result.graph.edges.some((edge) => edge.type === 'trigger' && edge.target === result.refs.second)).toBe(true);
    expect(result.graph.nodes.some((node) => node.id === 'metric')).toBe(false);
    expect(result.graph.nodes[0].position).not.toEqual(baseline.nodes[0].position);
    expect(baseline).toEqual(BASE_GRAPH);
  });

  it('supports clear_graph and reports every malformed operation without mutating baseline', () => {
    const bad = applyOperationsToClone(BASE_GRAPH, [
      { op: 'add_node', node_type: 'Ghost' },
      { op: 'set_params', node_id: 'missing', params: {} },
      { op: 'connect', source: 'missing', source_handle: 'x', target: 'model', target_handle: 'x' },
      { op: 'connect', source: 'model', source_handle: 'x', target: 'missing', target_handle: 'x' },
      { op: 'remove_node', node_id: 'missing' },
      { op: 'remove_edge', source: 'missing', target: 'model' },
      { op: 'remove_edge', source: 'start', target: 'metric' },
      { op: 'mystery' } as unknown as GraphOp,
    ], DEFINITIONS);
    expect(bad.results).toHaveLength(8);
    expect(bad.results.every((item) => !item.ok)).toBe(true);
    expect(bad.graph).toEqual(BASE_GRAPH);

    const cleared = applyOperationsToClone(BASE_GRAPH, [{ op: 'clear_graph' }], DEFINITIONS);
    expect(cleared.graph.nodes).toEqual([]);
    expect(cleared.graph.edges).toEqual([]);
  });

  it('mirrors core parameter validation before a candidate can run or promote', () => {
    const result = applyOperationsToClone(BASE_GRAPH, [
      { op: 'set_params', node_id: 'model', params: { quality: '3' } as any },
      { op: 'set_params', node_id: 'model', params: { unknown: 1 } },
      { op: 'add_node', node_type: 'Model', params: { quality: 11 } },
      { op: 'set_params', node_id: 'model', params: { optional: 42 } },
      { op: 'set_params', node_id: 'note', params: {} },
      null as unknown as GraphOp,
      { op: 'set_params', node_id: 'model', params: { quality: 5 } },
    ], DEFINITIONS);

    expect(result.results.slice(0, 6).every((item) => !item.ok)).toBe(true);
    expect(result.results[0].error).toContain('must be a number');
    expect(result.results[1].error).toContain('Unknown parameter');
    expect(result.results[2].error).toContain('must be <= 10');
    expect(result.results[4].error).toContain('no known definition');
    expect(result.results[6].ok).toBe(true);
    expect(result.graph.nodes.find((node) => node.id === 'model')?.data?.params?.quality).toBe(5);
  });
});

describe('metric resolution', () => {
  const metrics = {
    'node.accuracy': 0.8,
    'Accuracy.accuracy': 0.8,
    'node.loss': 0.2,
    'system.runtime_ms': 30,
    bad: Number.NaN,
  };

  it('supports exact, case-insensitive, unique suffix and auto selectors', () => {
    expect(resolveObjectiveMetric(metrics, { metric: 'node.accuracy', direction: 'maximize' })?.value).toBe(0.8);
    expect(resolveObjectiveMetric(metrics, { metric: 'NODE.LOSS', direction: 'minimize' })?.value).toBe(0.2);
    expect(resolveObjectiveMetric(metrics, { metric: 'runtime ms', direction: 'minimize' })?.key).toBe('system.runtime_ms');
    expect(resolveObjectiveMetric(
      metrics,
      { metric: 'accuracy', direction: 'maximize' },
      { 'node.accuracy': 'Accuracy.accuracy', 'Accuracy.accuracy': 'Accuracy.accuracy' },
    )?.key).toBe('Accuracy.accuracy');
    expect(resolveObjectiveMetric({ score: 2 }, { metric: 'auto', direction: 'maximize' })?.value).toBe(2);
    expect(resolveObjectiveMetric(metrics, { metric: 'auto', direction: 'minimize' })?.key).toContain('loss');
  });

  it('rejects absent or ambiguous suffixes and empty metric sets', () => {
    expect(resolveObjectiveMetric(
      { 'a.accuracy': 0.7, 'b.accuracy': 0.8 },
      { metric: 'accuracy', direction: 'maximize' },
    )).toBeUndefined();
    expect(resolveObjectiveMetric(
      { 'a.accuracy': 0.8, 'b.accuracy': 0.8 },
      { metric: 'accuracy', direction: 'maximize' },
    )).toBeUndefined();
    expect(resolveObjectiveMetric(metrics, { metric: 'missing', direction: 'maximize' })).toBeUndefined();
    expect(resolveObjectiveMetric({}, { metric: 'auto', direction: 'maximize' })).toBeUndefined();
  });
});

describe('executeCandidateGraph', () => {
  it('runs an unsaved clone, filters notes, and collects scalar plus progress metrics', async () => {
    const result = await executeCandidateGraph(BASE_GRAPH, 'abc');
    expect(MockWebSocket.instances[0].url).toContain('token=abc');
    const nodes = sentPayloads[0].nodes as Array<{ id: string }>;
    const edges = sentPayloads[0].edges as Array<{ id: string }>;
    expect(nodes.some((node) => node.id === 'note')).toBe(false);
    expect(edges.some((edge) => edge.id === 'note-edge')).toBe(false);
    expect(result.metrics['metric.accuracy']).toBe(1);
    expect(result.metrics['Accuracy.accuracy']).toBe(1);
    expect(result.metrics['model.progress.loss']).toBe(1);
    expect(result.metrics['Model.progress.loss']).toBe(1);
    expect(result.metrics['system.runtime_ms']).toBeGreaterThanOrEqual(0);
    expect(result.metricSources['Accuracy.accuracy']).toBe('output_summary');
    expect(result.metricSources['Model.progress.loss']).toBe('progress');
    expect(result.metricSources['system.runtime_ms']).toBe('client');
  });

  it('surfaces backend, socket, close, abort, and timeout failures', async () => {
    socketBehavior = (socket) => queueMicrotask(() => socket.emit({ type: 'execution_error', error: 'boom' }));
    await expect(executeCandidateGraph(BASE_GRAPH, 'x')).rejects.toThrow('boom');

    socketBehavior = (socket) => queueMicrotask(() => socket.emit({ type: 'error' }));
    await expect(executeCandidateGraph(BASE_GRAPH, 'x')).rejects.toThrow('error');

    socketBehavior = (socket) => queueMicrotask(() => socket.fail());
    await expect(executeCandidateGraph(BASE_GRAPH, 'x')).rejects.toThrow('WebSocket failed');

    socketBehavior = (socket) => queueMicrotask(() => socket.drop());
    await expect(executeCandidateGraph(BASE_GRAPH, 'x')).rejects.toThrow('closed before completion');

    const controller = new AbortController();
    controller.abort();
    await expect(executeCandidateGraph(BASE_GRAPH, 'x', controller.signal)).rejects.toMatchObject({ name: 'AbortError' });

    vi.useFakeTimers();
    socketBehavior = () => {};
    const pending = executeCandidateGraph(BASE_GRAPH, 'x', undefined, 10);
    const assertion = expect(pending).rejects.toThrow('timed out');
    await vi.advanceTimersByTimeAsync(11);
    await assertion;
  });

  it('attaches elapsed time and scalar observations collected before execution failure', async () => {
    let now = 1_000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    socketBehavior = (socket) => queueMicrotask(() => {
      socket.emit({
        type: 'node_status',
        node_id: 'metric',
        output_summary: { accuracy: { type: 'scalar', value: 0.75 } },
      });
      now = 1_125;
      socket.emit({ type: 'execution_error', error: 'failed after metric' });
    });

    const error = await executeCandidateGraph(BASE_GRAPH, 'x').catch((reason: unknown) => reason);

    expect(error).toMatchObject({
      message: 'failed after metric',
      observation: {
        durationMs: 125,
        metrics: expect.objectContaining({
          'Accuracy.accuracy': 0.75,
          'system.runtime_ms': 125,
        }),
      },
    });
  });
});

describe('runGraphExperiments', () => {
  it('captures a verified portable bundle and the legacy session after a successful run', async () => {
    const state = fakeApi();

    const result = await runGraphExperiments(state.api, request());
    const portable = await loadStudyBundle(state.api, result.id);

    await expect(verifyStudyBundle(portable)).resolves.toStrictEqual(portable);
    expect(portable.payload.id).toBe(result.id);
    expect(portable.payload.spec.hypothesis).toBe(result.hypothesis);
    expect(portable.payload.spec.variants.map((variant) => variant.id)).toEqual(['baseline', 'high']);
    expect(portable.payload.runs).toHaveLength(2);
    expect(loadStudyIndex(state.api).entries).toEqual([
      expect.objectContaining({ id: result.id, digest: portable.integrity.contentSha256 }),
    ]);
    expect(state.storage.has(`${STUDY_STORAGE_BUNDLE_PREFIX}${portable.integrity.contentSha256}`)).toBe(true);
    expect(loadExperimentSessions(state.api)[0]).toEqual(expect.objectContaining({
      id: result.id,
      winnerId: 'high',
    }));
  });

  it('keeps portable persistence failure nonfatal, persists its warning, and never re-executes', async () => {
    const state = fakeApi();
    (state.api.storage.set as ReturnType<typeof vi.fn>).mockImplementation((key: string, value: string) => {
      if (key.startsWith(STUDY_STORAGE_BUNDLE_PREFIX)) throw new Error('portable quota exceeded');
      state.storage.set(key, value);
    });

    const result = await runGraphExperiments(state.api, request());

    expect(result.status).toBe('completed');
    expect(sentPayloads).toHaveLength(2);
    expect(result.insights.warnings.join(' ')).toContain('portable study bundle could not be captured or saved');
    expect(result.insights.warnings.join(' ')).toContain('Could not store portable study blob');
    expect(loadStudyIndex(state.api).entries).toEqual([]);
    expect(loadExperimentSessions(state.api)[0].insights.warnings.join(' ')).toContain(
      'portable study bundle could not be captured or saved',
    );
    expect(state.api.ui.toast).toHaveBeenCalledWith(
      expect.stringContaining('Could not store portable study blob'),
      'warning',
    );
  });

  it('validates, executes, ranks, promotes, persists, and emits a change event', async () => {
    const state = fakeApi();
    const event = vi.fn();
    window.addEventListener(EXPERIMENTS_CHANGED_EVENT, event);
    const result = await runGraphExperiments(state.api, request({ apply_best: true }));
    window.removeEventListener(EXPERIMENTS_CHANGED_EVENT, event);

    expect(result.status).toBe('completed');
    expect(result.winnerId).toBe('high');
    expect(result.variants.find((item) => item.id === 'high')?.mean).toBe(3);
    expect(result.baselineVariantId).toBe('baseline');
    expect(result.variants.find((item) => item.id === 'high')?.runs).toEqual([
      expect.objectContaining({
        repetition: 1,
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValue: 3,
        metricSource: 'output_summary',
      }),
    ]);
    expect(result.appliedVariantId).toBe('high');
    expect(state.apply).toHaveBeenCalledWith([{ op: 'set_params', node_id: 'model', params: { quality: 3 } }]);
    expect(result.insights.summary[0]).toContain('High quality');
    expect(result.insights.warnings.join(' ')).toContain('pilot');
    expect(loadExperimentSessions(state.api)[0].winnerId).toBe('high');
    expect(state.storage.get(EXPERIMENTS_STORAGE_KEY)).not.toContain('appliedOperations');
    expect(event).toHaveBeenCalled();
  });

  it('supports repetitions, minimize ranking, variance insights, and bounded concurrency', async () => {
    const state = fakeApi();
    successfulSocketBehavior((quality, run) => quality * (run % 2 === 0 ? 2 : 0.5));
    const result = await runGraphExperiments(state.api, request({
      objective: { metric: 'Accuracy.accuracy', direction: 'minimize' },
      repetitions: 3,
      concurrency: 2,
    }));
    expect(result.variants.every((item) => item.metricValues.length === 3)).toBe(true);
    expect(result.variants.every((item) => item.runs?.length === 3)).toBe(true);
    expect(result.variants.every((item) => item.confidenceInterval95?.level === 0.95)).toBe(true);
    expect(result.variants.find((item) => item.id === 'high')?.baselineComparison).toEqual(
      expect.objectContaining({ baselineId: 'baseline' }),
    );
    expect(result.winnerId).toBe('baseline');
    expect(result.insights.warnings.join(' ')).toContain('variation');
    expect(result.insights.warnings.join(' ')).toContain('Hedges g');
    expect(result.insights.paperIdeas.some((idea) => idea.title.includes('Sensitivity'))).toBe(true);
  });

  it('never lets a lucky partial candidate outrank fully completed repetitions', async () => {
    const state = fakeApi();
    const runsByQuality = new Map<number, number>();
    socketBehavior = (socket, payload) => {
      const quality = Number((payload.nodes as any[]).find((node) => node.id === 'model')?.data?.params?.quality ?? 1);
      const run = (runsByQuality.get(quality) ?? 0) + 1;
      runsByQuality.set(quality, run);
      queueMicrotask(() => {
        if (quality === 3 && run > 1) {
          socket.emit({ type: 'execution_error', error: 'intermittent failure' });
          return;
        }
        socket.emit({
          type: 'node_status',
          node_id: 'metric',
          output_summary: { accuracy: { type: 'scalar', value: quality === 3 ? 100 : 1 } },
        });
        socket.emit({ type: 'execution_complete' });
      });
    };

    const result = await runGraphExperiments(state.api, request({ repetitions: 3 }));

    expect(result.winnerId).toBe('baseline');
    const lucky = result.variants.find((variant) => variant.id === 'high')!;
    expect(lucky.status).toBe('failed');
    expect(lucky.mean).toBeUndefined();
    expect(lucky.metricValues).toEqual([100]);
    expect(lucky.errors.join(' ')).toContain('Only 1/3 repetitions completed');
  });

  it('retains failed-run elapsed time and scalar evidence without rerunning it', async () => {
    const state = fakeApi();
    let now = 2_000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    socketBehavior = (socket) => queueMicrotask(() => {
      socket.emit({
        type: 'node_status',
        node_id: 'metric',
        output_summary: { accuracy: { type: 'scalar', value: 0.42 } },
      });
      now = 2_240;
      socket.emit({ type: 'execution_error', error: 'backend failed after observation' });
    });

    const result = await runGraphExperiments(state.api, request({
      variants: [{ id: 'only', label: 'Only', operations: [] }],
    }));

    expect(sentPayloads).toHaveLength(1);
    expect(result.status).toBe('failed');
    expect(result.winnerId).toBeUndefined();
    expect(result.variants[0].runtimeMs).toBe(240);
    expect(result.variants[0].observedMetrics).toEqual(expect.objectContaining({
      'Accuracy.accuracy': 0.42,
      'system.runtime_ms': 240,
    }));
    expect(result.variants[0].runs).toEqual([
      expect.objectContaining({
        status: 'failed',
        durationMs: 240,
        metricKey: 'Accuracy.accuracy',
        metricValue: 0.42,
        observedMetrics: expect.objectContaining({ 'Accuracy.accuracy': 0.42 }),
        error: expect.stringContaining('backend failed after observation'),
      }),
    ]);
  });

  it('refuses ranking when repetitions or candidates resolve different metric identities', async () => {
    const inconsistent = fakeApi();
    let run = 0;
    socketBehavior = (socket) => {
      run += 1;
      queueMicrotask(() => {
        if (run < 3) {
          const port = run === 1 ? 'accuracy' : 'score';
          socket.emit({
            type: 'node_status',
            node_id: 'metric',
            output_summary: { [port]: { type: 'scalar', value: run } },
          });
        }
        socket.emit({ type: 'execution_complete' });
      });
    };
    const within = await runGraphExperiments(inconsistent.api, request({
      objective: { metric: 'auto', direction: 'maximize' },
      variants: [{ id: 'only', label: 'Only', operations: [] }],
      repetitions: 3,
    }));
    expect(within.winnerId).toBeUndefined();
    expect(within.variants[0].errors.join(' ')).toContain('missing in 1/3');
    expect(within.variants[0].errors.join(' ')).toContain('inconsistent keys');

    const across = fakeApi();
    socketBehavior = (socket, payload) => {
      const quality = Number((payload.nodes as any[]).find((node) => node.id === 'model')?.data?.params?.quality ?? 1);
      const port = quality === 1 ? 'accuracy' : 'score';
      queueMicrotask(() => {
        socket.emit({
          type: 'node_status',
          node_id: 'metric',
          output_summary: { [port]: { type: 'scalar', value: quality } },
        });
        socket.emit({ type: 'execution_complete' });
      });
    };
    const crossCandidate = await runGraphExperiments(across.api, request({
      objective: { metric: 'auto', direction: 'maximize' },
      repetitions: 2,
    }));
    expect(crossCandidate.winnerId).toBeUndefined();
    expect(crossCandidate.status).toBe('failed');
    expect(crossCandidate.variants.every((variant) => variant.status === 'failed')).toBe(true);
    expect(crossCandidate.variants.every((variant) => variant.metricValues.length === 0)).toBe(true);
    expect(crossCandidate.variants.every((variant) => variant.mean === undefined)).toBe(true);
    expect(crossCandidate.variants.every((variant) => variant.stddev === undefined)).toBe(true);
    expect(crossCandidate.variants.every((variant) => variant.confidenceInterval95 === undefined)).toBe(true);
    expect(crossCandidate.variants.every((variant) => variant.baselineComparison === undefined)).toBe(true);
    expect(crossCandidate.variants.every((variant) => (
      variant.runs?.every((runRecord) => runRecord.metricValue !== undefined)
    ))).toBe(true);
    expect(crossCandidate.variants[0].errors.join(' ')).toContain('cross-candidate ranking was refused');
  });

  it('reports exact ties and does not use runtime as a winner or promotion tie-breaker', async () => {
    const state = fakeApi();
    successfulSocketBehavior(() => 1);
    const result = await runGraphExperiments(state.api, request({ apply_best: true }));
    expect(result.winnerId).toBeUndefined();
    expect(result.insights.summary.join(' ')).toContain('No unique winner');
    expect(result.insights.warnings.join(' ')).toContain('tied');
    expect(result.variants.every((variant) => variant.stddev === undefined)).toBe(true);
    expect(state.apply).not.toHaveBeenCalled();
  });

  it('keeps invalid and failed candidates as evidence and returns partial status', async () => {
    const state = fakeApi();
    state.setValidation((body) => {
      const quality = body.nodes.find((node: any) => node.id === 'model')?.data?.params?.quality;
      return quality === 9 ? { valid: false, errors: ['quality rejected'] } : { valid: true, errors: [] };
    });
    socketBehavior = (socket, payload) => {
      const quality = Number((payload.nodes as any[]).find((node) => node.id === 'model')?.data?.params?.quality ?? 1);
      queueMicrotask(() => quality === 7
        ? socket.emit({ type: 'execution_error', error: 'training failed' })
        : (socket.emit({ type: 'execution_complete' })));
    };
    const result = await runGraphExperiments(state.api, request({ variants: [
      { id: 'bad-op', label: 'Bad op', operations: [{ op: 'set_params', node_id: 'missing', params: {} }] },
      { id: 'invalid', label: 'Invalid', operations: [{ op: 'set_params', node_id: 'model', params: { quality: 9 } }] },
      { id: 'failed', label: 'Failed', operations: [{ op: 'set_params', node_id: 'model', params: { quality: 7 } }] },
    ] }));
    expect(result.status).toBe('failed');
    expect(result.variants.map((item) => item.status)).toEqual(['invalid', 'invalid', 'failed']);
    expect(result.insights.warnings.join(' ')).toContain('No candidate exposed');
    expect(result.insights.warnings.join(' ')).toContain('3 candidate');
  });

  it('fails malformed or internally inconsistent validation responses closed before execution', async () => {
    const state = fakeApi();
    state.setValidation((body) => {
      const quality = body.nodes.find((node: any) => node.id === 'model')?.data?.params?.quality;
      return quality === 1
        ? { valid: 'false', errors: [] } as any
        : { valid: true, errors: ['validator reported an error'] };
    });

    const result = await runGraphExperiments(state.api, request());

    expect(MockWebSocket.instances).toHaveLength(0);
    expect(result.variants.map((variant) => variant.status)).toEqual(['invalid', 'invalid']);
    expect(result.variants[0].errors.join(' ')).toContain('malformed');
    expect(result.variants[1].errors.join(' ')).toContain('valid=true together with errors');
  });

  it('scrubs execution bootstrap tokens from WebSocket failure evidence', async () => {
    const state = fakeApi();
    socketBehavior = (socket) => {
      queueMicrotask(() => socket.emit({
        type: 'execution_error',
        error: 'WebSocket rejected credential token-123',
      }));
    };

    const result = await runGraphExperiments(state.api, request({
      variants: [{ id: 'only', label: 'Only', operations: [] }],
    }));

    expect(JSON.stringify(result)).not.toContain('token-123');
    expect(result.variants[0].errors.join(' ')).toContain('[REDACTED]');
    expect([...state.storage.values()].join('\n')).not.toContain('token-123');
  });

  it('sanitizes backend echoes from the captured baseline after the live graph changes', async () => {
    const state = fakeApi();
    const presetSecret = 'captured-baseline-preset-secret';
    state.setGraph({ ...structuredClone(BASE_GRAPH), presets: [{ opaque: presetSecret }] });
    state.setValidation(() => {
      state.setGraph(structuredClone(BASE_GRAPH));
      state.triggerGraphChange();
      return { valid: false, errors: [`backend echoed ${presetSecret}`] };
    });

    const result = await runGraphExperiments(state.api, request({
      variants: [{ id: 'only', label: 'Only', operations: [] }],
    }));

    expect(JSON.stringify(result)).not.toContain(presetSecret);
    expect(result.variants[0].errors.join(' ')).toContain('[REDACTED]');
    expect([...state.storage.values()].join('\n')).not.toContain(presetSecret);
  });

  it('refuses promotion after a live graph change and handles an empty baseline winner', async () => {
    const state = fakeApi();
    let reads = 0;
    const changed = structuredClone(BASE_GRAPH);
    changed.nodes[1].data!.params!.quality = 8;
    (state.api.graph.getGraph as ReturnType<typeof vi.fn>).mockImplementation(() => {
      reads += 1;
      return structuredClone(reads === 1 ? BASE_GRAPH : changed);
    });
    const conflict = await runGraphExperiments(state.api, request({ apply_best: true }));
    expect(conflict.applyConflict).toContain('changed');
    expect(state.apply).not.toHaveBeenCalled();

    const baselineState = fakeApi();
    successfulSocketBehavior((quality) => 10 - quality);
    const baseline = await runGraphExperiments(baselineState.api, request({ apply_best: true }));
    expect(baseline.winnerId).toBe('baseline');
    expect(baseline.appliedVariantId).toBe('baseline');
    expect(baselineState.apply).not.toHaveBeenCalled();
  });

  it('detects byte-identical tab changes and keeps structural winners as review summaries', async () => {
    const tabState = fakeApi();
    const normal = socketBehavior;
    socketBehavior = (socket, payload) => {
      tabState.triggerGraphChange();
      normal(socket, payload);
    };
    const tabConflict = await runGraphExperiments(tabState.api, request({ apply_best: true }));
    expect(tabConflict.winnerId).toBe('high');
    expect(tabConflict.applyConflict).toContain('live graph changed');
    expect(tabState.apply).not.toHaveBeenCalled();

    const structuralState = fakeApi();
    successfulSocketBehavior();
    const structural = await runGraphExperiments(structuralState.api, request({
      variants: [
        { id: 'baseline', label: 'Baseline', operations: [] },
        {
          id: 'structural',
          label: 'Structural',
          operations: [
            { op: 'set_params', node_id: 'model', params: { quality: 3 } },
            { op: 'remove_node', node_id: 'note' },
          ],
        },
      ],
      apply_best: true,
    }));
    expect(structural.winnerId).toBe('structural');
    expect(structural.applyConflict).toContain('structural winner');
    expect(structural.variants.find((variant) => variant.id === 'structural')?.operationSummary).toEqual([
      'set model: quality',
      'remove node note',
    ]);
    expect(structuralState.apply).not.toHaveBeenCalled();
  });

  it('records partial promotion errors instead of claiming the winner was applied', async () => {
    const state = fakeApi();
    state.apply.mockReturnValue({
      results: [{ index: 0, ok: false, error: 'stale node' }],
      refs: {}, node_count: 4, edge_count: 3,
    });
    const result = await runGraphExperiments(state.api, request({ apply_best: true }));
    expect(result.appliedVariantId).toBeUndefined();
    expect(result.applyConflict).toContain('partially');

    const throwing = fakeApi();
    throwing.apply.mockImplementation(() => { throw new Error('host commit failed'); });
    const thrown = await runGraphExperiments(throwing.api, request({ apply_best: true }));
    expect(thrown.appliedVariantId).toBeUndefined();
    expect(thrown.applyConflict).toContain('threw unexpectedly');
    expect(throwing.api.ui.toast).toHaveBeenCalledWith(expect.stringContaining('host commit failed'), 'error');
  });

  it('returns a completed promoted study when browser persistence fails', async () => {
    const state = fakeApi();
    (state.api.storage.set as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    const result = await runGraphExperiments(state.api, request({ apply_best: true }));

    expect(result.appliedVariantId).toBe('high');
    expect(result.insights.warnings.join(' ')).toContain('could not be saved');
    expect(state.api.ui.toast).toHaveBeenCalledWith(expect.stringContaining('quota exceeded'), 'warning');
  });

  it('rejects invalid study definitions and auth/validation transport failures', async () => {
    const state = fakeApi();
    const invalid: GraphExperimentRequest[] = [
      request({ hypothesis: '' }),
      request({ objective: { metric: '', direction: 'maximize' } }),
      request({ objective: { metric: 'x', direction: 'sideways' as any } }),
      request({ variants: [] }),
      request({ variants: Array.from({ length: MAX_EXPERIMENT_VARIANTS + 1 }, (_, i) => ({ label: `v${i}`, operations: [] })) }),
      request({ repetitions: 5, variants: Array.from({ length: 4 }, (_, i) => ({ label: `v${i}`, operations: [] })) }),
      request({ repetitions: '5' as any }),
      request({ concurrency: 3 }),
      request({ apply_best: 'false' as any }),
      request({ variants: [{ id: 'same', label: 'a', operations: [] }, { id: 'same', label: 'b', operations: [] }] }),
      request({ variants: [{ label: '', operations: [] }] }),
      request({ variants: [{ label: 'x', operations: null as any }] }),
      request({ variants: [{ label: 'x', operations: [null as any] }] }),
    ];
    for (const item of invalid) await expect(runGraphExperiments(state.api, item)).rejects.toThrow();

    const auth = fakeApi();
    (auth.api.http.fetch as ReturnType<typeof vi.fn>).mockImplementation(async (url: string) =>
      url === '/api/auth/bootstrap'
        ? { ok: false, status: 403, json: async () => ({}) }
        : { ok: true, status: 200, json: async () => ({ valid: true, errors: [] }) });
    await expect(runGraphExperiments(auth.api, request())).rejects.toThrow('auth bootstrap');

    const noToken = fakeApi();
    (noToken.api.http.fetch as ReturnType<typeof vi.fn>).mockImplementation(async (url: string) =>
      url === '/api/auth/bootstrap'
        ? { ok: true, status: 200, json: async () => ({}) }
        : { ok: true, status: 200, json: async () => ({ valid: true, errors: [] }) });
    await expect(runGraphExperiments(noToken.api, request())).rejects.toThrow('no token');
  });
});

describe('experiment persistence', () => {
  function session(id: string): GraphExperimentResult {
    return {
      id, createdAt: '2026-07-14T00:00:00.000Z', hypothesis: id,
      objective: { metric: 'accuracy', direction: 'maximize' }, repetitions: 1,
      status: 'completed', variants: [], insights: { summary: [], warnings: [], paperIdeas: [] },
    };
  }

  it('tolerates corrupt storage, replaces duplicate ids, and caps history', async () => {
    const state = fakeApi();
    state.storage.set(EXPERIMENTS_STORAGE_KEY, '{bad');
    expect(loadExperimentSessions(state.api)).toEqual([]);
    state.storage.set(EXPERIMENTS_STORAGE_KEY, '{}');
    expect(loadExperimentSessions(state.api)).toEqual([]);
    state.storage.set(EXPERIMENTS_STORAGE_KEY, JSON.stringify([null, {}, session('valid')]));
    expect(loadExperimentSessions(state.api).map((item) => item.id)).toEqual(['valid']);
    // The tolerant read view may recover a valid entry, but mutations require
    // a lossless canonical archive rather than silently dropping bad records.
    state.storage.set(EXPERIMENTS_STORAGE_KEY, JSON.stringify([session('valid')]));
    for (let index = 0; index < 22; index += 1) await saveExperimentSession(state.api, session(`s${index}`));
    await saveExperimentSession(state.api, { ...session('s21'), hypothesis: 'replacement' });
    const stored = loadExperimentSessions(state.api);
    expect(stored).toHaveLength(20);
    expect(stored[0].hypothesis).toBe('replacement');
    expect(stored.filter((item) => item.id === 's21')).toHaveLength(1);
  });

  it('fails session mutations closed without Web Locks', async () => {
    const state = fakeApi();
    state.storage.set(EXPERIMENTS_STORAGE_KEY, JSON.stringify([session('existing')]));
    vi.stubGlobal('navigator', {});

    await expect(saveExperimentSession(state.api, session('new'))).rejects.toMatchObject({
      code: 'LOCK_UNAVAILABLE',
    });
    expect(loadExperimentSessions(state.api).map((item) => item.id)).toEqual(['existing']);
    expect(state.api.storage.set).not.toHaveBeenCalled();
  });

  it('serializes concurrent session writes and checks import collisions inside the same lock', async () => {
    const state = fakeApi();

    await Promise.all([
      saveExperimentSession(state.api, session('first')),
      saveExperimentSession(state.api, session('second')),
    ]);

    expect(new Set(loadExperimentSessions(state.api).map((item) => item.id))).toEqual(
      new Set(['first', 'second']),
    );
    await expect(saveExperimentSession(
      state.api,
      { ...session('first'), hypothesis: 'must not replace' },
      { rejectIfExists: true },
    )).rejects.toThrow(/already uses study id 'first'/i);
    expect(loadExperimentSessions(state.api).find((item) => item.id === 'first')?.hypothesis)
      .toBe('first');
  });

  it('does not overwrite an unreadable or lossy Experiment Lab archive', async () => {
    const readFailure = fakeApi();
    (readFailure.api.storage.get as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error('temporary read failure');
    });
    await expect(saveExperimentSession(readFailure.api, session('new'))).rejects.toThrow(/could not read/i);
    expect(readFailure.api.storage.set).not.toHaveBeenCalled();

    const malformed = fakeApi();
    malformed.storage.set(EXPERIMENTS_STORAGE_KEY, JSON.stringify([session('keep'), null]));
    await expect(saveExperimentSession(malformed.api, session('new'))).rejects.toThrow(/entry 1 is invalid/i);
    expect(malformed.api.storage.set).not.toHaveBeenCalled();
    expect(malformed.storage.get(EXPERIMENTS_STORAGE_KEY)).toContain('"keep"');
  });
});
