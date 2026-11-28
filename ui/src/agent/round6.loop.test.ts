/** Round 6 (real-LLM findings): run failures go back to the model (P1), the
 * validation nudge only covers this turn's own errors (P2), and the turn
 * summary says what was corrected and what ran (P4). */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChatBody, DoneEvent, StreamHandlers, WireToolCall } from '../llm/client';
import type { CodefyUIPluginAPI, GraphOp, SerializedGraph } from '../types/codefyui';
import type { Settings } from '../state/settings';

vi.mock('../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});
vi.mock('./runGraph', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./runGraph')>();
  return { ...actual, runLiveGraph: vi.fn() };
});
vi.mock('./experiments', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./experiments')>();
  return { ...actual, runGraphExperiments: vi.fn() };
});

import { streamChat } from '../llm/client';
import { runLiveGraph } from './runGraph';
import type { RunGraphOutcome } from './runGraph';
import { runGraphExperiments } from './experiments';
import { runTurn } from './loop';
import { MAX_LIVE_RUNS_PER_TURN } from './runtimeTools';
import { resetRunHistoryProbeForTests } from './runHistory';

const settings: Settings = { provider: 'openai', models: { openai: 'm' }, apiKeys: { openai: 'k' }, customBaseUrl: '' };
const call = (id: string, name: string, args: Record<string, unknown> = {}): WireToolCall => ({ id, name, arguments: args });
const done = (calls: WireToolCall[] = [], content = 'done'): DoneEvent => ({
  message: { role: 'assistant', content, tool_calls: calls }, stop_reason: calls.length ? 'tool_use' : 'end', usage: {},
});
const OK: RunGraphOutcome = {
  status: 'complete', durationMs: 1000, runId: 'run-ok', nodeErrors: {}, completedNodes: 2, totalNodes: 2,
  outputs: {}, finalProgress: {}, metrics: {}, textTail: '', media: [],
};
const FAILED: RunGraphOutcome = {
  ...OK, status: 'error', runId: 'run-bad', terminalConfirmed: true, submitted: true, completedNodes: 1,
  error: 'PythonScript: import of sklearn.datasets is not allowed', nodeErrors: { py: 'import of sklearn.datasets is not allowed' },
};

function setup(opts: { validate?: (body: { nodes: Array<{ id: string }> }) => { valid: boolean; errors: string[] } } = {}) {
  let graph: SerializedGraph = { nodes: [{ id: 'old', type: 'Test' }], edges: [] };
  const storage = new Map<string, string>();
  const api = {
    apiVersion: 6, pluginId: 'graph-copilot', ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(() => graph),
      getNodeDefinitions: vi.fn(() => []),
      applyOperations: vi.fn((ops: GraphOp[]) => {
        const results = ops.map((op, index) => {
          if (op.op === 'clear_graph') { graph = { nodes: [], edges: [] }; return { index, ok: true }; }
          if (op.op === 'add_node') { graph = { ...graph, nodes: [...graph.nodes, { id: `${op.ref ?? 'n'}${graph.nodes.length}`, type: op.node_type }] }; return { index, ok: true }; }
          if (op.op === 'connect' && op.source_handle === 'missing') return { index, ok: false, error: "no output 'missing'" };
          if (op.op === 'set_params') { graph = { ...graph, nodes: graph.nodes.map((node) => node.id === op.node_id ? { ...node, data: { params: op.params } } : node) }; }
          return { index, ok: true };
        });
        return { results, refs: {}, node_count: graph.nodes.length, edge_count: graph.edges.length };
      }),
      onGraphChanged: vi.fn(() => () => {}),
    },
    http: { fetch: vi.fn(async (url: string, init?: RequestInit) => {
      if (url === '/api/runs?limit=1') return { ok: true, status: 200, json: async () => ({ runs: [], total: 0 }) };
      if (url.startsWith('/api/runs/')) return { ok: true, status: 200, json: async () => ({ id: url.slice(10), status: 'failed' }) };
      const body = JSON.parse(String(init?.body ?? '{"nodes":[]}')) as { nodes: Array<{ id: string }> };
      const report = opts.validate ? opts.validate(body) : { valid: true, errors: [] };
      return { ok: true, status: 200, json: async () => report };
    }) },
    storage: { get: vi.fn((key: string) => storage.get(key) ?? null), set: vi.fn((key: string, value: string) => { storage.set(key, value); }), remove: vi.fn((key: string) => { storage.delete(key); }) },
  } as unknown as CodefyUIPluginAPI;
  const requests: ChatBody[] = [];
  const script = (steps: DoneEvent[]) => {
    vi.mocked(streamChat).mockImplementation(async (_api, body, handlers: StreamHandlers) => {
      requests.push(JSON.parse(JSON.stringify(body)));
      const step = steps.shift();
      if (!step) return handlers.onError('unexpected extra request');
      handlers.onDone(step);
    });
  };
  const approvals: string[] = [];
  const callbacks = {
    onTextDelta: vi.fn(), onOpsApplied: vi.fn(), onTurnsCommitted: vi.fn(), onError: vi.fn(), onFinished: vi.fn(),
    onRunApproval: vi.fn(async () => { approvals.push('run'); return true; }),
    onExperimentApproval: vi.fn(async (_request: unknown) => { approvals.push('study'); return true; }),
  };
  const run = () => runTurn({
    api, settings, history: [], userText: 'go', callbacks,
    confirmClearGraph: async () => { approvals.push('clear'); return true; },
  });
  return { api, requests, script, run, approvals, callbacks, setGraph: (next: SerializedGraph) => { graph = next; }, graph: () => graph };
}

const toolResults = (body: ChatBody) => body.messages.filter((message) => message.role === 'tool').map((message) => String(message.content));

beforeEach(() => {
  vi.resetAllMocks();
  resetRunHistoryProbeForTests();
});

describe('P1: a definite run failure goes back to the model', () => {
  it('gives the model the receipt and lets it explain; the turn reports the failure', async () => {
    const t = setup();
    vi.mocked(runLiveGraph).mockResolvedValue({ ...FAILED });
    t.script([done([call('r1', 'run_graph', { reason: 'train' })]), done([], 'The import is blocked; use CSVReader instead.')]);
    const result = await t.run();
    expect(streamChat).toHaveBeenCalledTimes(2);
    const receipt = toolResults(t.requests[1])[0];
    expect(receipt).toContain('sklearn.datasets');
    expect(receipt).toContain('next_step');
    expect(result.turns.at(-1)?.content).toContain('CSVReader');
    expect(result).toMatchObject({ status: 'incomplete', reason: 'execution_failed', executions: { runs: 1, failedRuns: 1, studies: 0 } });
    expect(result.executionUnknown).toBe(false);
  });

  it('lets the model fix the graph and rerun after a new approval; a later success completes the turn', async () => {
    const t = setup();
    vi.mocked(runLiveGraph).mockResolvedValueOnce({ ...FAILED }).mockResolvedValueOnce({ ...OK });
    t.script([
      done([call('r1', 'run_graph', { reason: 'train' })]),
      done([call('fix', 'apply_graph_operations', { operations: [{ op: 'set_params', node_id: 'old', params: { code: 'fixed' } }] })]),
      done([call('r2', 'run_graph', { reason: 'train again' })]),
      done([], 'Fixed and ran.'),
    ]);
    const result = await t.run();
    expect(runLiveGraph).toHaveBeenCalledTimes(2);
    expect(t.approvals).toEqual(['run', 'run']);
    expect(result).toMatchObject({ status: 'completed', executions: { runs: 2, failedRuns: 1 } });
    expect(result.executions?.runIds).toEqual(['run-bad', 'run-ok']);
  });

  it('refuses to run the same unchanged graph again after it failed', async () => {
    const t = setup();
    vi.mocked(runLiveGraph).mockResolvedValue({ ...FAILED });
    t.script([done([call('r1', 'run_graph', { reason: 'train' })]), done([call('r2', 'run_graph', { reason: 'again' })]), done()]);
    const result = await t.run();
    expect(runLiveGraph).toHaveBeenCalledTimes(1);
    expect(t.approvals).toEqual(['run']);
    expect(toolResults(t.requests[2])[1]).toMatch(/exact graph already failed/);
    expect(result.reason).toBe('execution_failed');
  });

  it(`refuses a ${MAX_LIVE_RUNS_PER_TURN + 1}th run_graph in one turn`, async () => {
    const t = setup();
    let edits = 0;
    vi.mocked(runLiveGraph).mockImplementation(async () => {
      // Each run sees a different graph, so only the count can refuse.
      t.setGraph({ nodes: [{ id: 'old', type: 'Test', data: { params: { edit: ++edits } } }], edges: [] });
      return { ...FAILED, runId: `run-${edits}` };
    });
    t.script([
      ...[1, 2, 3, 4].map((index) => done([call(`r${index}`, 'run_graph', { reason: `try ${index}` })])),
      done([], 'Three runs failed; here is what happened.'),
    ]);
    const result = await t.run();
    expect(runLiveGraph).toHaveBeenCalledTimes(MAX_LIVE_RUNS_PER_TURN);
    expect(t.approvals).toHaveLength(MAX_LIVE_RUNS_PER_TURN);
    const fourth = toolResults(t.requests[4])[3];
    expect(fourth).toMatch(/limit 3/);
    expect(result.executions).toMatchObject({ runs: 3, failedRuns: 3 });
  });

  it('still ends the turn when the outcome is uncertain (socket lost, run may still be running)', async () => {
    const t = setup();
    vi.mocked(t.api.http.fetch).mockImplementation(async (url: string) => {
      if (url === '/api/runs?limit=1') return { ok: true, json: async () => ({ runs: [], total: 0 }) } as Response;
      if (url === '/api/runs/run-x') return { ok: true, json: async () => ({ id: 'run-x', status: 'running' }) } as Response;
      return { ok: true, json: async () => ({ valid: true, errors: [] }) } as Response;
    });
    vi.mocked(runLiveGraph).mockImplementation(async (_api, opts) => {
      opts.onRunId?.('run-x');
      return { ...OK, status: 'error', runId: 'run-x', submitted: true, error: 'WebSocket closed' };
    });
    t.script([done([call('r1', 'run_graph', { reason: 'train' })]), done()]);
    const result = await t.run();
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({ reason: 'execution_unknown', executionUnknown: true });
  });

  it('gives a failed study back to the model too', async () => {
    const t = setup();
    vi.mocked(runGraphExperiments).mockResolvedValue({ status: 'failed', error: 'every candidate failed', candidates: [] } as never);
    t.script([
      done([call('s1', 'run_graph_experiments', {
        hypothesis: 'h', objective: { metric: 'auto', direction: 'maximize' }, variants: [{ label: 'base', operations: [] }],
      })]),
      done([], 'The study failed because every candidate failed.'),
    ]);
    const result = await t.run();
    expect(streamChat).toHaveBeenCalledTimes(2);
    expect(toolResults(t.requests[1])[0]).toContain('every candidate failed');
    expect(result.executions).toMatchObject({ runs: 0, studies: 1 });
  });
});

describe('P2: the validation nudge only covers this turn\'s own errors', () => {
  it('does not add nodes back after an approved clear (the c6 transcript)', async () => {
    // The host says an empty graph has no entry point, as 3.4.0 does.
    const t = setup({ validate: (body) => (body.nodes.length ? { valid: true, errors: [] } : { valid: false, errors: ['Graph has no entry points. Add a Start node.'] }) });
    t.script([done([call('c', 'apply_graph_operations', { operations: [{ op: 'clear_graph' }] })]), done([], 'Cleared.')]);
    const result = await t.run();
    expect(t.approvals).toEqual(['clear']);
    expect(streamChat).toHaveBeenCalledTimes(2);
    expect(t.graph().nodes).toHaveLength(0);
    expect(JSON.stringify(t.requests)).not.toMatch(/did not pass structural validation/);
    expect(result).toMatchObject({ status: 'completed', validation: { status: 'not_run' } });
  });

  it('does not nudge after an approved clear even when the rebuilt graph has issues', async () => {
    const t = setup({ validate: (body) => (body.nodes.length ? { valid: false, errors: ['Missing input on new'] } : { valid: true, errors: [] }) });
    t.script([
      done([call('c', 'apply_graph_operations', { operations: [{ op: 'clear_graph' }] })]),
      done([call('a', 'apply_graph_operations', { operations: [{ op: 'add_node', node_type: 'Test', ref: 'new' }] })]),
      done([], 'Rebuilt.'),
    ]);
    const result = await t.run();
    expect(streamChat).toHaveBeenCalledTimes(3);
    expect(result).toMatchObject({ status: 'incomplete', reason: 'validation_issues' });
  });

  it('lists only errors the turn introduced, and none when every error predates the turn', async () => {
    const t = setup({ validate: () => ({ valid: false, errors: ['Pre-existing: old has no input'] }) });
    t.script([done([call('a', 'apply_graph_operations', { operations: [{ op: 'add_node', node_type: 'Test', ref: 'new' }] })]), done([], 'Added.')]);
    const result = await t.run();
    expect(streamChat).toHaveBeenCalledTimes(2);
    expect(result.status).toBe('completed');
    expect(result.validation.status).toBe('invalid');
  });

  it('nudges with the new errors only', async () => {
    const t = setup({ validate: (body) => ({
      valid: false,
      errors: ['Pre-existing: old has no input', ...(body.nodes.length > 1 ? ['New: new has no input'] : [])],
    }) });
    t.script([done([call('a', 'apply_graph_operations', { operations: [{ op: 'add_node', node_type: 'Test', ref: 'new' }] })]), done([], 'Added.'), done([], 'Still.'), done([], 'Still.')]);
    await t.run();
    const nudge = t.requests[2].messages.find((message) => typeof message.content === 'string' && message.content.includes('did not pass structural validation'));
    expect(nudge?.content).toContain('New: new has no input');
    expect(nudge?.content).not.toContain('Pre-existing');
  });
});

describe('P4: corrected operations and execution facts', () => {
  it('a failed connect corrected by a later connect, with the graph valid, completes with a note', async () => {
    const t = setup();
    t.script([
      done([call('a', 'apply_graph_operations', { operations: [{ op: 'connect', source: 'old', source_handle: 'missing', target: 'old', target_handle: 'in' }] })]),
      done([call('b', 'apply_graph_operations', { operations: [{ op: 'connect', source: 'old', source_handle: 'out1', target: 'old', target_handle: 'in' }] })]),
      done([], 'Rewired through out1.'),
    ]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'completed', failedOps: 1, correctedOps: 1, validation: { status: 'valid' } });
  });

  it('a later layout alone does not correct a failed connect', async () => {
    const t = setup();
    t.script([
      done([call('a', 'apply_graph_operations', { operations: [{ op: 'connect', source: 'old', source_handle: 'missing', target: 'old', target_handle: 'in' }] })]),
      done([call('b', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] })]),
      done(),
    ]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', reason: 'tool_errors' });
    expect(result.correctedOps).toBeUndefined();
  });

  it('a successful run records what ran, with nothing unknown', async () => {
    const t = setup();
    vi.mocked(runLiveGraph).mockResolvedValue({ ...OK });
    t.script([done([call('r1', 'run_graph', { reason: 'train' })]), done()]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'completed', sideEffectAttempted: true, executionUnknown: false, executions: { runs: 1, failedRuns: 0, runIds: ['run-ok'] } });
  });
});

describe('P6: the approval card counts the baseline row', () => {
  it('k = 1, 3, 5, 9, 15 with k = 5 current asks once for 5 settings including the baseline', async () => {
    const t = setup();
    t.setGraph({ nodes: [{ id: 'knn', type: 'KNN', data: { params: { n_neighbors: 5 } } }], edges: [] });
    vi.mocked(t.api.graph.getNodeDefinitions).mockReturnValue([{
      node_name: 'KNN', category: 'ML', description: '', inputs: [], outputs: [],
      params: [{ name: 'n_neighbors', param_type: 'int', default: 5, description: '', options: [], min_value: 1, max_value: 50 }],
    }]);
    const requests: unknown[] = [];
    t.callbacks.onExperimentApproval.mockImplementation(async (request: unknown) => { requests.push(request); return false; });
    t.script([done([call('o', 'optimize_graph_parameters', {
      strategy: 'grid', hypothesis: 'k matters', objective: { metric: 'accuracy', direction: 'maximize' },
      include_baseline: false, repetitions: 3, bindings: [{ node_id: 'knn', param: 'n_neighbors', values: [1, 3, 5, 9, 15] }],
    })])]);
    await t.run();
    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({ variantCount: 5, includesBaseline: true, executionCount: 15 });
  });
});

describe('P10: the loop forwards reasoning as a signal', () => {
  it('calls onReasoning for each reasoning event and keeps no reasoning text', async () => {
    const t = setup();
    const onReasoning = vi.fn();
    vi.mocked(streamChat).mockImplementation(async (_api, _body, handlers: StreamHandlers) => {
      handlers.onReasoning?.(); handlers.onReasoning?.();
      handlers.onDone(done([], 'Answer.'));
    });
    const result = await runTurn({ api: t.api, settings, history: [], userText: 'q', callbacks: { ...t.callbacks, onReasoning } });
    expect(onReasoning).toHaveBeenCalledTimes(2);
    expect(result.turns.map((turn) => turn.content)).toEqual(['Answer.']);
  });
});
