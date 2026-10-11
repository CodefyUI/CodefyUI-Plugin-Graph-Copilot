import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChatBody, DoneEvent, StreamHandlers, WireToolCall } from '../llm/client';
import type { CodefyUIPluginAPI, GraphOp, SerializedGraph } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { ChatTurn } from '../state/conversations';
import type { TurnResult } from './types';

vi.mock('../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

import { streamChat } from '../llm/client';
import { MAX_TOOL_ROUNDS, MAX_VALIDATION_NUDGES, runTurn, validateCurrentGraph } from './loop';

const settings: Settings = {
  provider: 'openai', models: { openai: 'test-model' }, apiKeys: { openai: 'secret-key' }, customBaseUrl: '',
};
const add: GraphOp = { op: 'add_node', node_type: 'Test', ref: 'new' };
const call = (id: string, name = 'apply_graph_operations', args: Record<string, unknown> = { operations: [add] }): WireToolCall => ({ id, name, arguments: args });
const done = (calls: WireToolCall[] = [], content = 'done'): DoneEvent => ({
  message: { role: 'assistant', content, tool_calls: calls }, stop_reason: calls.length ? 'tool_use' : 'end', usage: {},
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
function setup() {
  let graph: SerializedGraph = { nodes: [{ id: 'old', type: 'Test' }], edges: [], presets: [] };
  const api: CodefyUIPluginAPI = {
    apiVersion: 1, pluginId: 'test', ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(() => graph),
      getNodeDefinitions: vi.fn(() => []),
      applyOperations: vi.fn((ops: GraphOp[]) => {
        ops.forEach((op, index) => {
          if (op.op === 'add_node') graph.nodes.push({ id: `new${index}`, type: op.node_type });
          if (op.op === 'clear_graph') graph = { nodes: [], edges: [] };
        });
        return { results: ops.map((_, index) => ({ index, ok: true })), refs: { new: 'new0' }, node_count: graph.nodes.length, edge_count: graph.edges.length };
      }),
      onGraphChanged: vi.fn(() => () => {}),
    },
    http: { fetch: vi.fn(async () => ({ ok: true, json: async () => ({ valid: true, errors: [] }) }) as Response) },
    storage: { get: vi.fn(), set: vi.fn(), remove: vi.fn() },
  };
  const callbacks = {
    onTextDelta: vi.fn(), onTurnAppended: vi.fn(), onOpsApplied: vi.fn(),
    onTurnsCommitted: vi.fn(), onError: vi.fn(), onFinished: vi.fn(), onPhase: vi.fn(),
  };
  const requests: ChatBody[] = [];
  const script = (steps: Array<DoneEvent | ((handlers: StreamHandlers, signal?: AbortSignal) => void | Promise<void>)>) => {
    vi.mocked(streamChat).mockImplementation(async (_api, body, handlers, signal) => {
      requests.push(JSON.parse(JSON.stringify(body)));
      const step = steps.shift();
      if (!step) return handlers.onError('unexpected extra request');
      if (typeof step === 'function') await step(handlers, signal);
      else handlers.onDone(step);
    });
  };
  const run = (extra: Record<string, unknown> = {}) => runTurn({ api, settings, callbacks, history: [], userText: 'build', runId: 'run-test', ...extra } as Parameters<typeof runTurn>[0]);
  return { api, callbacks, requests, script, run, graph: () => graph };
}
function assertPairs(result: TurnResult) {
  for (let i = 0; i < result.turns.length; i++) {
    const turn = result.turns[i];
    if (!turn.tool_calls?.length) continue;
    const tools = result.turns.slice(i + 1, i + 1 + turn.tool_calls.length);
    expect(tools.map((tool) => tool.tool_call_id)).toEqual(turn.tool_calls.map((tool) => tool.id));
    expect(tools.every((tool) => tool.role === 'tool' && !!tool.toolOutcome)).toBe(true);
  }
}

beforeEach(() => vi.resetAllMocks());

describe('run lifecycle reliability', () => {
  it('returns authoritative local summary; default mode is Edit and metadata is never sent', async () => {
    const t = setup(); t.script([done([call('one')]), done()]);
    const result = await t.run();
    expect(result).toMatchObject({ id: 'run-test', mode: 'edit', status: 'completed', mutation: 'applied', mutationAttempted: true, appliedOps: 1, failedOps: 0, validation: { status: 'valid' } });
    expect(result.turns.at(-1)?.runSummary).toEqual(expect.objectContaining({ id: 'run-test', status: 'completed' }));
    expect(t.callbacks.onFinished).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ id: 'run-test' }));
    expect(JSON.stringify(t.requests[1].messages)).not.toMatch(/runSummary|runId|mutationAttempted|secret-key/);
    assertPairs(result);
  });

  it('pre-abort prevents graph initialization, network, and tools while finalizing once', async () => {
    const t = setup(); const controller = new AbortController(); controller.abort();
    const result = await t.run({ signal: controller.signal });
    expect(result).toMatchObject({ status: 'cancelled', mutation: 'none', mutationAttempted: false });
    expect(t.api.graph.getGraph).not.toHaveBeenCalled();
    expect(streamChat).not.toHaveBeenCalled();
    expect(t.callbacks.onTurnsCommitted).toHaveBeenCalledTimes(1);
    expect(t.callbacks.onFinished).toHaveBeenCalledTimes(1);
    expect(t.callbacks.onError).not.toHaveBeenCalled();
  });

  it('initialization errors enter the controlled failure path', async () => {
    const t = setup(); vi.mocked(t.api.graph.getNodeDefinitions).mockImplementation(() => { throw new Error('catalog unavailable'); });
    const result = await t.run();
    expect(result.status).toBe('failed');
    expect(t.callbacks.onTurnsCommitted).toHaveBeenCalledTimes(1);
    expect(t.callbacks.onFinished).toHaveBeenCalledTimes(1);
  });

  it('done followed by abort preserves the complete unexecuted tool group', async () => {
    const t = setup(); const controller = new AbortController();
    t.script([(handlers) => { handlers.onDone(done([call('one'), call('two')])); controller.abort(); }]);
    const result = await t.run({ signal: controller.signal });
    expect(result.status).toBe('cancelled');
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.turns.filter((turn) => turn.role === 'tool').map((turn) => turn.toolOutcome)).toEqual(['cancelled', 'cancelled']);
    assertPairs(result);
  });

  it('abort between tools retains exact applied receipt and prevents every later write', async () => {
    const t = setup(); const controller = new AbortController();
    t.callbacks.onOpsApplied.mockImplementation(() => controller.abort());
    t.script([done([call('one'), call('two')])]);
    const result = await t.run({ signal: controller.signal });
    expect(t.api.graph.applyOperations).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({ status: 'cancelled', mutation: 'applied', appliedOps: 1 });
    expect(JSON.parse(result.turns[1].content).refs).toEqual({ new: 'new0' });
    expect(result.turns[1].toolOutcome).toBe('completed');
    expect(result.turns[2].toolOutcome).toBe('cancelled');
    assertPairs(result);
  });

  it('observers throwing cannot destroy mutation receipts or change the result', async () => {
    const t = setup();
    Object.values(t.callbacks).forEach((observer) => observer.mockImplementation(() => { throw new Error('observer boom'); }));
    t.script([done([call('one')]), done()]);
    const result = await t.run();
    expect(result.status).toBe('completed');
    expect(result.appliedOps).toBe(1);
    expect(JSON.parse(result.turns[1].content).results).toEqual([{ index: 0, ok: true }]);
    expect(t.callbacks.onTurnsCommitted).toHaveBeenCalledTimes(1);
    expect(t.callbacks.onFinished).toHaveBeenCalledTimes(1);
    assertPairs(result);
  });

  it('host throw after a side effect is unknown, terminal, and never safe to retry', async () => {
    const t = setup();
    vi.mocked(t.api.graph.applyOperations).mockImplementation(() => { t.graph().nodes.push({ id: 'side-effect' }); throw new Error('write exploded'); });
    t.script([done([call('one'), call('two')]), done()]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'failed', mutationAttempted: true, mutation: 'unknown', appliedOps: 0 });
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(t.api.graph.applyOperations).toHaveBeenCalledTimes(1);
    expect(result.turns[1].toolOutcome).toBe('unknown');
    expect(result.turns[2].toolOutcome).toBe('not_executed');
    assertPairs(result);
  });

  it('late callbacks from a noncooperative cancelled stream cannot notify UI or extend the journal', async () => {
    const t = setup(); const controller = new AbortController(); const entered = deferred<void>(); const held = deferred<void>();
    let late!: StreamHandlers;
    t.script([async (handlers) => { late = handlers; handlers.onText('partial'); entered.resolve(); await held.promise; }]);
    const pending = t.run({ signal: controller.signal }); await entered.promise; controller.abort();
    const result = await pending;
    expect(result.status).toBe('cancelled');
    late.onText('should not appear'); late.onDone(done([call('late-write')]));
    expect(t.callbacks.onTextDelta).toHaveBeenCalledExactlyOnceWith('partial');
    expect(result.turns[0].content).toBe('partial');
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    held.resolve(); await Promise.resolve();
  });

  it('host-side abort after a successful synchronous write preserves the exact receipt and UI summary', async () => {
    const t = setup(); const controller = new AbortController();
    vi.mocked(t.api.graph.applyOperations).mockImplementation(() => {
      t.graph().nodes.push({ id: 'done' }); controller.abort();
      return { results: [{ index: 0, ok: true }], refs: {}, node_count: 2, edge_count: 0 };
    });
    t.script([done([call('one'), call('two')])]);
    const result = await t.run({ signal: controller.signal });
    expect(result).toMatchObject({ status: 'cancelled', mutation: 'applied', appliedOps: 1 });
    expect(result.turns[1].toolOutcome).toBe('completed');
    expect(t.callbacks.onOpsApplied).toHaveBeenCalledTimes(1);
    assertPairs(result);
  });

  it('missing done is failed, not silently completed; partial text is retained', async () => {
    const t = setup(); t.script([(handlers) => handlers.onText('partial')]);
    const result = await t.run();
    expect(result.status).toBe('failed');
    expect(result.turns[0].content).toBe('partial');
  });
});

describe('mutation authorization and receipts', () => {
  it('Ask filters the mutation tool and refuses an unsolicited call at execution time', async () => {
    const t = setup(); t.script([done([call('one')]), done()]);
    const result = await t.run({ mode: 'ask' });
    expect(t.requests[0].tools?.some((tool) => tool.name === 'apply_graph_operations')).toBe(false);
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result).toMatchObject({ mode: 'ask', mutationAttempted: false, mutation: 'none', status: 'incomplete' });
    assertPairs(result);
  });

  it.each([
    [], [null], [{ op: 'connect', source: 'a', target: 'b' }],
    [{ op: 'add_node', node_type: '' }], [{ op: 'set_params', node_id: 'n', params: [] }],
    [{ op: 'add_node', node_type: 'Test', position: { x: Infinity, y: 0 } }],
    [add, { op: 'not_real' }], [{ op: 'clear_graph' }, add],
  ].map((operations) => ({ operations })))('rejects the entire malformed operation batch $operations before host dispatch', async ({ operations }) => {
    const t = setup(); t.script([done([call('one', 'apply_graph_operations', { operations })]), done()]);
    const result = await t.run();
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.mutationAttempted).toBe(false);
    expect(result.turns[1].toolOutcome).toBe('error');
  });

  it('maps reversed receipts by index, not array position', async () => {
    const t = setup();
    vi.mocked(t.api.graph.applyOperations).mockReturnValue({ results: [{ index: 1, ok: false, error: 'no' }, { index: 0, ok: true }], refs: { new: 'new0' }, node_count: 2, edge_count: 0 });
    t.script([done([call('one', 'apply_graph_operations', { operations: [add, { op: 'auto_layout' }] })]), done()]);
    const result = await t.run();
    expect(result).toMatchObject({ appliedOps: 1, failedOps: 1, mutation: 'applied', status: 'incomplete' });
    expect(result.turns[0].opsSummary).toBe('add_node x1 ok, auto_layout x1 FAILED');
  });

  it.each([
    [], [{ index: 0, ok: true }, { index: 0, ok: true }],
    [{ index: 8, ok: true }], [{ index: 0, ok: 'yes' }],
  ].map((receipts) => ({ receipts })))('unknown receipt $receipts cannot complete or trigger automatic repair', async ({ receipts }) => {
    const t = setup();
    vi.mocked(t.api.graph.applyOperations).mockReturnValue({ results: receipts, refs: {}, node_count: 2, edge_count: 0 } as any);
    t.script([done([call('one')]), done()]);
    const result = await t.run();
    expect(result).toMatchObject({ mutation: 'unknown', mutationAttempted: true, status: 'incomplete', appliedOps: 0 });
    expect(t.callbacks.onOpsApplied.mock.calls[0]?.[0]).toMatch(/UNKNOWN/);
    expect(t.api.http.fetch).not.toHaveBeenCalled();
  });

  it('later layout success cannot erase an unresolved failed connection receipt', async () => {
    const t = setup(); vi.mocked(t.api.graph.applyOperations)
      .mockReturnValueOnce({ results: [{ index: 0, ok: false, error: 'missing output' }], refs: {}, node_count: 1, edge_count: 0 });
    t.script([done([call('failed-connect', 'apply_graph_operations', { operations: [{ op: 'connect', source: 'old', source_handle: 'out', target: 'old', target_handle: 'in' }] })]),
      done([call('layout', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] })]), done()]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', appliedOps: 1, failedOps: 1, validation: { status: 'valid' } });
  });

  it('later schema success cannot erase an unrelated failed lookup', async () => {
    const t = setup(); vi.mocked(t.api.graph.getNodeDefinitions).mockReturnValue([{ node_name: 'Known', category: '', description: '', inputs: [], outputs: [], params: [] }]);
    t.script([done([call('failed-schema', 'get_node_schemas', { node_types: ['Unknown'] })]), done([call('good-schema', 'get_node_schemas', { node_types: ['Known'] })]), done()]);
    expect((await t.run()).status).toBe('incomplete');
  });

  it('a repeated historical call id is never executed', async () => {
    const t = setup(); t.script([done([call('old-call')])]);
    const history: ChatTurn[] = [{ role: 'assistant', content: '', tool_calls: [call('old-call')] }, { role: 'tool', content: '{}', tool_call_id: 'old-call' }];
    const result = await t.run({ history });
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.status).toBe('failed');
  });
});

describe('clear confirmation boundary', () => {
  const clear = call('clear', 'apply_graph_operations', { operations: [{ op: 'clear_graph' }] });
  it('requires explicit confirmation for a singleton clear; no callback is not approval', async () => {
    const t = setup(); t.script([done([clear]), done()]);
    const result = await t.run();
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.status).toBe('incomplete');
    expect(streamChat).toHaveBeenCalledTimes(1);
  });
  it('accepted confirmation binds run/call/counts without disclosing the graph', async () => {
    const t = setup(); t.script([done([clear]), done()]); const confirm = vi.fn(async () => true);
    const result = await t.run({ confirmClearGraph: confirm });
    expect(confirm).toHaveBeenCalledExactlyOnceWith({ runId: 'run-test', toolCallId: 'clear', nodeCount: 1, edgeCount: 0 }, undefined);
    expect(result).toMatchObject({ status: 'completed', appliedOps: 1 });
    expect(t.callbacks.onPhase).toHaveBeenCalledWith('awaiting_confirmation');
  });
  it('declining terminates immediately so the model cannot bypass with remove_node', async () => {
    const t = setup(); t.script([done([clear]), done([call('bypass', 'apply_graph_operations', { operations: [{ op: 'remove_node', node_id: 'old' }] })])]);
    const result = await t.run({ confirmClearGraph: async () => false });
    expect(result.status).toBe('cancelled');
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(streamChat).toHaveBeenCalledTimes(1);
  });
  it('graph differences beyond the prompt truncation invalidate approval', async () => {
    const t = setup(); t.graph().nodes[0].data = 'x'.repeat(40_000); t.graph().presets = [{ late: false }];
    t.script([done([clear])]);
    const result = await t.run({ confirmClearGraph: async () => { (t.graph().presets![0] as any).late = true; return true; } });
    expect(result).toMatchObject({ status: 'incomplete', mutationAttempted: false });
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
  });
  it('an observer changing the graph after approval cannot exploit the last synchronous clear boundary', async () => {
    const t = setup(); t.script([done([clear])]); let waiting = false;
    t.callbacks.onPhase.mockImplementation((phase) => {
      if (phase === 'awaiting_confirmation') waiting = true;
      else if (phase === 'tools' && waiting) t.graph().nodes.push({ id: 'late-manual' });
    });
    const result = await t.run({ confirmClearGraph: async () => true });
    expect(result).toMatchObject({ status: 'incomplete', mutationAttempted: false });
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
  });

  it('Stop releases a noncooperative pending confirmation and a late approval cannot write', async () => {
    const t = setup(); const controller = new AbortController(); const approval = deferred<boolean>(); const entered = deferred<void>();
    t.script([done([clear])]);
    const pending = t.run({ signal: controller.signal, confirmClearGraph: () => { entered.resolve(); return approval.promise; } });
    await entered.promise; controller.abort();
    const result = await pending;
    expect(result.status).toBe('cancelled');
    approval.resolve(true); await Promise.resolve();
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    assertPairs(result);
  });
});

describe('research cancellation and evidence', () => {
  it('caps parallel research at four questions and cannot treat index answers as port schemas', async () => {
    const t = setup(); t.script([done([call('research', 'research', { questions: ['one', 'two', 'three', 'four', 'ignored'] })]),
      done([], 'candidate one'), done([], 'candidate two'), done([], 'candidate three'), done([], 'candidate four'), done()]);
    const result = await t.run();
    expect(streamChat).toHaveBeenCalledTimes(6);
    expect(result.status).toBe('completed');
    expect(result.turns[1].content).not.toContain('ignored');
    expect(result.turns[1].content).toContain('verify exact schemas before wiring');
    expect(t.requests[1].messages[0].content).toContain('do not invent ports');
    expect(t.requests.slice(1, 5).every((request) => request.tools?.length === 0)).toBe(true);
  });

  it('Stop in parallel research completes the group and prevents later mutation calls', async () => {
    const t = setup(); const controller = new AbortController(); const entered = deferred<void>(); const held = deferred<void>();
    t.script([done([call('research', 'research', { questions: ['one', 'two'] }), call('never')]),
      async () => { entered.resolve(); await held.promise; }, async () => { await held.promise; }]);
    const pending = t.run({ signal: controller.signal }); await entered.promise; controller.abort();
    const result = await pending;
    expect(result.status).toBe('cancelled');
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.turns.filter((turn) => turn.role === 'tool').map((turn) => turn.toolOutcome)).toEqual(['cancelled', 'cancelled']);
    held.resolve(); await Promise.resolve();
    assertPairs(result);
  });
});

describe('validation boundaries', () => {
  it('plain Q&A never validates or repairs a pre-existing invalid graph', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['pre-existing'] }) } as Response);
    t.script([done()]); const result = await t.run();
    expect(t.api.http.fetch).not.toHaveBeenCalled();
    expect(result.validation.status).toBe('not_run');
    expect(result.status).toBe('completed');
  });
  it('Ask permits explicit read-only validation but never nudges invalid graph edits', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['pre-existing'] }) } as Response);
    t.script([done([call('validate', 'validate_graph', {})]), done()]); const result = await t.run({ mode: 'ask' });
    expect(result.validation).toEqual({ status: 'invalid', errors: [expect.stringContaining('issue 1')] });
    expect(JSON.parse(result.turns[1].content).errors).toEqual(['pre-existing']);
    expect(t.api.http.fetch).toHaveBeenCalledTimes(1);
    expect(streamChat).toHaveBeenCalledTimes(2);
    expect(result.status).toBe('completed');
  });
  it('validation HTTP failure after mutation is incomplete and cannot drive repair', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: false, status: 503 } as Response);
    t.script([done([call('one')]), done()]); const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', validation: { status: 'unavailable' } });
    expect(streamChat).toHaveBeenCalledTimes(2);
  });
  it('invalid final snapshot at the nudge limit is still validated and incomplete', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['required input'] }) } as Response);
    t.script([done([call('one')]), ...Array.from({ length: MAX_VALIDATION_NUDGES + 1 }, () => done())]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', validation: { status: 'invalid' } });
    expect(t.api.http.fetch).toHaveBeenCalledTimes(MAX_VALIDATION_NUDGES + 1);
    expect(streamChat).toHaveBeenCalledTimes(MAX_VALIDATION_NUDGES + 2);
  });
  it('successful corrective edits validate the last graph, not the first graph', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: false, errors: ['required input'] }) } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: [] }) } as Response);
    t.script([done([call('one')]), done(), done([call('fix')]), done()]);
    const result = await t.run();
    expect(result.status).toBe('completed');
    const bodies = vi.mocked(t.api.http.fetch).mock.calls.map(([, init]) => JSON.parse(init!.body as string));
    expect(bodies[0].nodes).toHaveLength(2); expect(bodies[1].nodes).toHaveLength(3);
  });
  it('manual changes during validation produce stale and no repair', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockImplementation(async () => { t.graph().nodes.push({ id: 'manual' }); return { ok: true, json: async () => ({ valid: true, errors: [] }) } as Response; });
    t.script([done([call('one')]), done()]); const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', validation: { status: 'stale' } });
    expect(streamChat).toHaveBeenCalledTimes(2);
  });
  it.each(['same round', 'next round'])('explicit invalid validation constrains repair scope in the $0', async (timing) => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['required input on old'] }) } as Response);
    const validate = call('validate', 'validate_graph', {});
    const unrelated = call('bad-fix', 'apply_graph_operations', { operations: [{ op: 'set_params', node_id: 'old', params: { bad: true } }] });
    t.script(timing === 'same round'
      ? [done([call('one')]), done([validate, unrelated])]
      : [done([call('one')]), done([validate]), done([unrelated])]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', reason: 'repair_scope', appliedOps: 1 });
    expect(t.api.graph.applyOperations).toHaveBeenCalledTimes(1);
    assertPairs(result);
  });

  it('explicit validation cannot hide manual changes since the current-run mutation', async () => {
    const t = setup(); t.script([done([call('one')]), (handlers) => {
      t.graph().nodes.push({ id: 'manual' }); handlers.onDone(done([call('validate', 'validate_graph', {})]));
    }]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', validation: { status: 'stale' } });
    expect(t.api.http.fetch).not.toHaveBeenCalled();
    assertPairs(result);
  });

  it('manual edits before a repair write invalidate the bounded repair authority', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['required input'] }) } as Response);
    t.script([done([call('one')]), done(), (handlers) => { t.graph().nodes.push({ id: 'manual' }); handlers.onDone(done([call('fix')])); }]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', validation: { status: 'stale' } });
    expect(t.api.graph.applyOperations).toHaveBeenCalledTimes(1);
    assertPairs(result);
  });
  it('repair nudges never authorize destructive edits of unrelated existing nodes', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['required input on old'] }) } as Response);
    t.script([done([call('one')]), done(), done([call('fix', 'apply_graph_operations', { operations: [{ op: 'remove_node', node_id: 'old' }] })])]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', reason: 'repair_scope', appliedOps: 1 });
    expect(t.api.graph.applyOperations).toHaveBeenCalledTimes(1);
    assertPairs(result);
  });

  it.each([
    [{ op: 'remove_node', node_id: 'old' }, { op: 'add_node', node_type: 'Test', ref: 'old' }],
    [{ op: 'add_node', node_type: 'Unknown', ref: 'old' }, { op: 'remove_node', node_id: 'old' }],
    [{ op: 'connect', source: 'new0', source_handle: 'out', target: 'old', target_handle: 'in' }],
  ].map((operations) => ({ operations })))('repair cannot promote unrelated existing nodes through aliases or source edges $operations', async ({ operations }) => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['required input'] }) } as Response);
    t.script([done([call('one')]), done(), done([call('bad-fix', 'apply_graph_operations', { operations })])]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', reason: 'repair_scope', appliedOps: 1 });
    expect(t.api.graph.applyOperations).toHaveBeenCalledTimes(1);
  });

  it('validation metadata never contains copied raw graph, attachments, or provider secrets', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: false, errors: ['Missing input x {"nodes":[{"secret":"sk-test"}]} data:image/png;base64,PRIVATE secret-key'] }) } as Response);
    t.script([done([call('validate', 'validate_graph', {})]), done()]);
    const result = await t.run({ mode: 'ask' });
    expect(JSON.stringify(result.validation)).not.toMatch(/sk-test|secret-key|PRIVATE|nodes|data:image/);
    expect(result.turns[1].content).toContain('sk-test');
  });

  it('tool cap validates the final snapshot but is always incomplete', async () => {
    const t = setup(); t.script(Array.from({ length: MAX_TOOL_ROUNDS }, (_, index) => done([call(`call${index}`)])));
    const result = await t.run();
    expect(result).toMatchObject({ status: 'incomplete', validation: { status: 'valid' } });
    expect(t.api.http.fetch).toHaveBeenCalledTimes(1);
    assertPairs(result);
  });
  it('validation helper distinguishes malformed service data and honors abort after json await', async () => {
    const t = setup(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => ({ valid: 'true', errors: [] }) } as Response);
    expect(await validateCurrentGraph(t.api)).toMatchObject({ valid: false, status: 'unavailable' });
    const controller = new AbortController(); vi.mocked(t.api.http.fetch).mockResolvedValue({ ok: true, json: async () => { controller.abort(); return { valid: true, errors: [] }; } } as Response);
    await expect(validateCurrentGraph(t.api, controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
  });
});
