import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChatBody, DoneEvent, StreamHandlers, WireToolCall } from '../llm/client';
import type { CodefyUIPluginAPI, GraphOp, NodeDefinition, SerializedGraph } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { RunLiveGraphOptions } from './runGraph';

vi.mock('../llm/client', async (original) => ({ ...await original<typeof import('../llm/client')>(), streamChat: vi.fn() }));
vi.mock('./runGraph', async (original) => ({ ...await original<typeof import('./runGraph')>(), runLiveGraph: vi.fn() }));
vi.mock('./experiments', async (original) => ({ ...await original<typeof import('./experiments')>(), runGraphExperiments: vi.fn() }));
import { streamChat } from '../llm/client';
import { runLiveGraph } from './runGraph';
import { runGraphExperiments } from './experiments';
import { readActiveRun } from './runPointer';
import { resetRunHistoryProbeForTests } from './runHistory';
import { runTurn, TOOLS } from './loop';
import type { TurnCallbacks } from './loop';

const settings: Settings = { provider: 'openai', models: { openai: 'test' }, apiKeys: {}, customBaseUrl: '' };
const call = (name: string, id = 'one', args: Record<string, unknown> = {}): WireToolCall => ({ id, name, arguments: args });
const done = (calls: WireToolCall[] = [], content = ''): DoneEvent => ({
  message: { role: 'assistant', content, tool_calls: calls }, stop_reason: calls.length ? 'tool_use' : 'end', usage: {},
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => { resolve = res; });
  return { promise, resolve };
}
const outcome = { status: 'complete' as const, durationMs: 500, runId: 'host-1', nodeErrors: {}, completedNodes: 1, totalNodes: 1, outputs: {}, finalProgress: {}, metrics: {}, textTail: '', media: [] };
const study = { hypothesis: 'compare', objective: { metric: 'score', direction: 'maximize' }, variants: [{ label: 'baseline', operations: [] }] };
function fixture() {
  const graph: SerializedGraph = { nodes: [{ id: 'n', type: 'Tunable', data: { params: { width: 1 } } }], edges: [], presets: [] };
  const defs: NodeDefinition[] = [{ node_name: 'Tunable', category: '', description: '', inputs: [], outputs: [], params: [{ name: 'width', param_type: 'int', default: 1, description: '', options: [], min_value: 1, max_value: 8 }] }];
  const store = new Map<string, string>();
  const api = {
    apiVersion: 1, pluginId: 'merge-test', ui: { toast: vi.fn(), addFloatingWidget: vi.fn() },
    graph: { getGraph: vi.fn(() => graph), getNodeDefinitions: vi.fn(() => defs), onGraphChanged: vi.fn((_callback: (graph: SerializedGraph) => void) => () => {}),
      applyOperations: vi.fn((ops: GraphOp[]) => ({ results: ops.map((_, index) => ({ index, ok: true })), refs: {}, node_count: 1, edge_count: 0 })) },
    http: { fetch: vi.fn(async () => ({ ok: true, json: async () => ({ valid: true, errors: [], default: 'cpu' }) }) as Response) },
    storage: { get: vi.fn((key: string) => store.get(key) ?? null), set: vi.fn((key: string, value: string) => { store.set(key, value); }), remove: vi.fn((key: string) => { store.delete(key); }) },
  } satisfies CodefyUIPluginAPI;
  const callbacks: TurnCallbacks = { onTextDelta: vi.fn(), onTurnAppended: vi.fn(), onOpsApplied: vi.fn(), onTurnsCommitted: vi.fn(), onError: vi.fn(), onFinished: vi.fn(), onRunApproval: vi.fn(async () => true), onExperimentApproval: vi.fn(async () => true), onRunProgress: vi.fn(), onRunFinished: vi.fn(), onRunStarted: vi.fn() };
  const bodies: ChatBody[] = [];
  function script(events: DoneEvent[]) {
    vi.mocked(streamChat).mockImplementation(async (_api, body, handlers) => { bodies.push(body); handlers.onDone(events.shift() ?? done([], 'done')); });
  }
  return { api, graph, callbacks, bodies, script, run: (extra: Partial<Parameters<typeof runTurn>[0]> = {}) => runTurn({ api, settings, callbacks, history: [], userText: 'run', ...extra }) };
}
beforeEach(() => { vi.resetAllMocks(); resetRunHistoryProbeForTests(); vi.mocked(runLiveGraph).mockResolvedValue(outcome); vi.mocked(runGraphExperiments).mockResolvedValue({ status: 'completed' } as any); });

describe('merged runtime and authoritative lifecycle', () => {
  it('preserves the ten-tool upstream catalog', () => {
    expect(TOOLS.map((tool) => tool.name)).toEqual(expect.arrayContaining(['run_graph', 'run_graph_experiments', 'optimize_graph_parameters', 'list_runs', 'get_run']));
    expect(TOOLS).toHaveLength(10);
  });
  it.each(['apply_graph_operations', 'run_graph', 'run_graph_experiments', 'optimize_graph_parameters'])('Ask filters and independently refuses %s', async (name) => {
    const t = fixture(); t.script([done([call(name, 'ask', name === 'apply_graph_operations' ? { operations: [{ op: 'auto_layout' }] } : study)])]);
    const result = await t.run({ mode: 'ask' });
    expect(t.bodies[0].tools?.map((tool) => tool.name)).toEqual(['get_current_graph', 'get_node_schemas', 'validate_graph', 'research', 'list_runs', 'get_run']);
    expect(result).toMatchObject({ status: 'incomplete', mutationAttempted: false, sideEffectAttempted: false });
    expect(result.turns[1].toolOutcome).toBe('error');
    expect(runLiveGraph).not.toHaveBeenCalled(); expect(runGraphExperiments).not.toHaveBeenCalled(); expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
  });
  it('records live execution separately from canvas mutation and retains host identity', async () => {
    const t = fixture(); t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' })])]);
    vi.mocked(runLiveGraph).mockImplementation(async (_api, opts) => { opts.onRunId?.('host-1'); return outcome; });
    const result = await t.run();
    expect(result).toMatchObject({ status: 'completed', mutation: 'none', mutationAttempted: false, sideEffectAttempted: true, hostRunId: 'host-1' });
    expect(t.callbacks.onRunStarted).toHaveBeenCalledWith('host-1');
    expect(result.turns[1]).toMatchObject({ toolOutcome: 'completed', durationMs: expect.any(Number) });
    expect(JSON.stringify(t.bodies.at(-1)?.messages)).not.toMatch(/sideEffectAttempted|hostRunId|runSummary/);
  });
  it('host execution throws after dispatch: unknown tool result terminates without replay', async () => {
    const t = fixture(); t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' }), call('run_graph', 'replay', { reason: 'again', device: 'cpu' })])]);
    vi.mocked(runLiveGraph).mockRejectedValue(new Error('post-submit failure'));
    const result = await t.run();
    expect(result).toMatchObject({ status: 'failed', mutation: 'none', sideEffectAttempted: true });
    expect(result.turns[1].toolOutcome).toBe('unknown'); expect(result.turns[2].toolOutcome).toBe('not_executed');
    expect(runLiveGraph).toHaveBeenCalledTimes(1); expect(streamChat).toHaveBeenCalledTimes(1);
  });
  it('declining live execution ends the run before later mutations', async () => {
    const t = fixture(); t.callbacks.onRunApproval = vi.fn(async () => false);
    t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' }), call('apply_graph_operations', 'later', { operations: [{ op: 'auto_layout' }] })])]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'cancelled', mutationAttempted: false, sideEffectAttempted: false });
    expect(runLiveGraph).not.toHaveBeenCalled(); expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
  });
  it('Stop awaits native runner cleanup and journals its exact terminal outcome', async () => {
    const t = fixture(); const c = new AbortController(); const entered = deferred<void>(); const cleanup = deferred<typeof outcome>();
    t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' })])]);
    vi.mocked(runLiveGraph).mockImplementation(async (_api, opts: RunLiveGraphOptions) => { opts.onRunId?.('host-1'); entered.resolve(); return cleanup.promise; });
    let settled = false; const pending = t.run({ signal: c.signal }).then((result) => { settled = true; return result; });
    await entered.promise; c.abort(); await Promise.resolve(); await Promise.resolve(); expect(settled).toBe(false);
    cleanup.resolve({ ...outcome, status: 'cancelled', cancelConfirmed: true } as any);
    const result = await pending;
    expect(result).toMatchObject({ status: 'cancelled', sideEffectAttempted: true });
    expect(result.turns[1].toolOutcome).toBe('cancelled');
    expect(JSON.parse(result.turns[1].content).status).toBe('cancelled');
    expect(t.callbacks.onRunFinished).toHaveBeenCalledTimes(1);
  });
  it('retains unknown host Stop evidence and blocks another execution until host termination', async () => {
    const t = fixture(); const c = new AbortController();
    t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' })])]);
    vi.mocked(runLiveGraph).mockImplementation(async (_api, opts) => {
      opts.onRunId?.('host-1'); c.abort();
      return { ...outcome, status: 'cancelled', cancelConfirmed: false, error: 'Host termination is unconfirmed.' } as any;
    });
    const result = await t.run({ signal: c.signal });
    expect(result).toMatchObject({ status: 'cancelled', hostRunId: 'host-1', sideEffectAttempted: true });
    expect(result.turns[1].toolOutcome).toBe('unknown');
    expect(JSON.parse(result.turns[1].content)).toMatchObject({ cancelConfirmed: false, run_may_still_be_running: true });
    expect(readActiveRun(t.api)?.runId).toBe('host-1');
    expect(t.callbacks.onRunFinished).not.toHaveBeenCalled();
    t.api.http.fetch.mockImplementation(async () => ({ ok: true, json: async () => ({ id: 'host-1', status: 'running' }) }) as Response);
    t.script([done([call('run_graph', 'again', { reason: 'again', device: 'cpu' })])]);
    await t.run();
    expect(runLiveGraph).toHaveBeenCalledTimes(1);
    expect(readActiveRun(t.api)?.runId).toBe('host-1');
  });
  it('approval Stop races noncooperative user callback without dispatching', async () => {
    const t = fixture(); const c = new AbortController(); const entered = deferred<void>(); const approval = deferred<boolean>();
    t.callbacks.onRunApproval = vi.fn(() => { entered.resolve(); return approval.promise; });
    t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' })])]);
    const pending = t.run({ signal: c.signal }); await entered.promise; c.abort(); const result = await pending;
    expect(result).toMatchObject({ status: 'cancelled', sideEffectAttempted: false }); approval.resolve(true); await Promise.resolve();
    expect(runLiveGraph).not.toHaveBeenCalled();
  });
  it('study dispatch blocks Retry even when no canvas promotion happened', async () => {
    const t = fixture(); t.script([done([call('run_graph_experiments', 'study', study)])]);
    vi.mocked(runGraphExperiments).mockRejectedValue(new Error('socket closed after execution'));
    const result = await t.run();
    expect(result).toMatchObject({ status: 'failed', mutation: 'none', mutationAttempted: false, sideEffectAttempted: true });
    expect(result.turns[1].toolOutcome).toBe('unknown'); expect(streamChat).toHaveBeenCalledTimes(1);
  });
  it('observer exceptions cannot erase live-run receipts', async () => {
    const t = fixture(); t.script([done([call('run_graph', 'run', { reason: 'train', device: 'cpu' })])]);
    t.callbacks.onRunStarted = () => { throw new Error('observer'); };
    t.callbacks.onRunProgress = () => { throw new Error('observer'); };
    t.callbacks.onRunFinished = () => { throw new Error('observer'); };
    vi.mocked(runLiveGraph).mockImplementation(async (_api, opts) => { opts.onRunId?.('host-1'); opts.onProgress?.({ phase: 'running', elapsedMs: 10, completedNodes: 0, totalNodes: 1 }); return outcome; });
    expect((await t.run()).turns[1].toolOutcome).toBe('completed');
  });
  it('promotion receipts survive cancellation after the synchronous canvas write', async () => {
    const t = fixture(); const c = new AbortController();
    const operations: GraphOp[] = [{ op: 'set_params', node_id: 'n', params: { width: 2 } }];
    const receipt = { results: [{ index: 0, ok: true }], refs: {}, node_count: 1, edge_count: 0 };
    t.script([done([call('run_graph_experiments', 'study', { ...study, apply_best: true })])]);
    vi.mocked(runGraphExperiments).mockImplementation(async (_api, _request, _signal, hooks) => {
      hooks?.beforePromotion?.(operations);
      hooks?.onPromotionReceipt?.(operations, receipt);
      c.abort(); throw new DOMException('cancelled after promotion', 'AbortError');
    });
    const result = await t.run({ signal: c.signal });
    expect(result).toMatchObject({ status: 'cancelled', mutationAttempted: true, mutation: 'applied', appliedOps: 1, sideEffectAttempted: true });
    expect(JSON.parse(result.turns[1].content).promotion).toEqual(receipt);
  });
  it('undefined promotion receipt is unknown rather than a completed study', async () => {
    const t = fixture(); const operations: GraphOp[] = [{ op: 'set_params', node_id: 'n', params: { width: 2 } }];
    t.script([done([call('run_graph_experiments', 'study', { ...study, apply_best: true })])]);
    vi.mocked(runGraphExperiments).mockImplementation(async (_api, _request, _signal, hooks) => {
      hooks?.beforePromotion?.(operations); hooks?.onPromotionReceipt?.(operations, undefined as any);
      return { status: 'completed' } as any;
    });
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', mutationAttempted: true, mutation: 'unknown' });
    expect(result.turns[1].toolOutcome).toBe('unknown'); expect(streamChat).toHaveBeenCalledTimes(1);
  });
  it('promotion host throw remains unknown and is never swallowed by study completion', async () => {
    const t = fixture(); const operations: GraphOp[] = [{ op: 'set_params', node_id: 'n', params: { width: 2 } }];
    t.script([done([call('run_graph_experiments', 'study', { ...study, apply_best: true })])]);
    vi.mocked(runGraphExperiments).mockImplementation(async (_api, _request, _signal, hooks) => {
      hooks?.beforePromotion?.(operations); hooks?.onPromotionError?.(operations, new Error('host threw'));
      return { status: 'completed' } as any;
    });
    const result = await t.run();
    expect(result).toMatchObject({ status: 'failed', mutationAttempted: true, mutation: 'unknown', sideEffectAttempted: true });
    expect(result.turns[1].toolOutcome).toBe('unknown'); expect(streamChat).toHaveBeenCalledTimes(1);
  });
  it('event-only graph/tab drift during validation ends stale without repair', async () => {
    const t = fixture(); let changed = () => {};
    t.api.graph.onGraphChanged.mockImplementation((fn) => { changed = () => fn(t.graph); return () => {}; });
    t.api.http.fetch.mockImplementation(async () => { changed(); return { ok: true, json: async () => ({ valid: true, errors: [] }) } as Response; });
    t.script([done([call('apply_graph_operations', 'edit', { operations: [{ op: 'auto_layout' }] })])]);
    expect(await t.run()).toMatchObject({ status: 'incomplete', validation: { status: 'stale' } }); expect(streamChat).toHaveBeenCalledTimes(2);
  });
});
