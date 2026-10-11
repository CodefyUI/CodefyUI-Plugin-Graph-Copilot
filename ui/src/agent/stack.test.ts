import { describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI, GraphOp, SerializedGraph } from '../types/codefyui';
import type { DoneEvent, WireToolCall } from '../llm/client';
import { runTurn } from './loop';

// The actual SSE transport is used. No module or streamChat mock in this file.
const settings = { provider: 'openai' as const, models: { openai: 'fixture' }, apiKeys: { openai: 'fixture-only' }, customBaseUrl: '' };
const call = (id: string, name = 'apply_graph_operations', args: Record<string, unknown> = { operations: [{ op: 'add_node', node_type: 'Test' }] }): WireToolCall => ({ id, name, arguments: args });
const done = (calls: WireToolCall[] = [], content = 'done'): Record<string, unknown> => ({ type: 'done', message: { role: 'assistant', content, tool_calls: calls }, stop_reason: calls.length ? 'tool_use' : 'end', usage: {} } satisfies { type: string } & DoneEvent);
const frame = (event: Record<string, unknown>) => `data: ${JSON.stringify(event)}\n\n`;
const encode = (text: string) => new TextEncoder().encode(text);

function sse(text: string): Response {
  // A deterministic reader exercises real SSE framing without sleeps or timers.
  let read = false;
  const reader = {
    read: vi.fn(async () => {
      if (read) return { done: true, value: undefined };
      read = true;
      return { done: false, value: encode(text) };
    }),
    cancel: vi.fn(async () => {}), releaseLock: vi.fn(),
  };
  return { ok: true, status: 200, body: { getReader: () => reader } } as unknown as Response;
}
function fixture(responses: Response[]) {
  const graph: SerializedGraph = { nodes: [], edges: [] };
  const requests: Array<{ url: string; body: Record<string, any>; signal?: AbortSignal | null }> = [];
  const callbacks = {
    onTextDelta: vi.fn(), onTurnAppended: vi.fn(), onOpsApplied: vi.fn(), onTurnsCommitted: vi.fn(), onError: vi.fn(), onFinished: vi.fn(), onPhase: vi.fn(),
  };
  const fetch = async (url: string, init?: RequestInit): Promise<Response> => {
    requests.push({ url, body: JSON.parse(init?.body as string), signal: init?.signal });
    if (url === '/api/graph/validate') return { ok: true, json: async () => ({ valid: true, errors: [] }) } as Response;
    const response = responses.shift();
    if (!response) throw new Error('unexpected request');
    return response;
  };
  const api: CodefyUIPluginAPI = {
    apiVersion: 1, pluginId: 'stack-fixture', ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(() => graph), getNodeDefinitions: vi.fn(() => []), onGraphChanged: vi.fn(() => () => {}),
      applyOperations: vi.fn((ops: GraphOp[]) => {
        const results = ops.map((op, index) => {
          const node_id = `n${graph.nodes.length}`;
          if (op.op === 'add_node') graph.nodes.push({ id: node_id, type: op.node_type });
          return { index, ok: true, node_id };
        });
        return { results, refs: {}, node_count: graph.nodes.length, edge_count: graph.edges.length };
      }),
    },
    http: { fetch: vi.fn(fetch) },
    storage: { get: vi.fn(), set: vi.fn(), remove: vi.fn() },
  };
  const run = (signal?: AbortSignal) => runTurn({ api, settings, callbacks, history: [], userText: 'build', runId: 'actual-stack', signal });
  return { api, callbacks, requests, graph, run, fetch };
}

describe('actual runTurn + SSE + mutable host', () => {
  it('completed receipt becomes next-round evidence and only the final graph is validated', async () => {
    const t = fixture([sse(frame(done([call('add')]))), sse(frame(done()))]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'completed', mutation: 'applied', appliedOps: 1, validation: { status: 'valid' } });
    expect(t.graph.nodes).toHaveLength(1);
    expect(t.requests.map((request) => request.url)).toEqual(['/api/llm/chat', '/api/llm/chat', '/api/graph/validate']);
    expect(t.requests[0].body.messages).toHaveLength(2);
    expect(t.requests[1].body.messages).toHaveLength(4);
    expect(t.requests[1].body.messages[3].tool_call_id).toBe('add');
    expect(t.requests[2].body.nodes).toHaveLength(1);
    expect(t.callbacks.onFinished).toHaveBeenCalledTimes(1);
  });

  it('done received then Stop on tools phase cannot dispatch a host mutation', async () => {
    const controller = new AbortController();
    const t = fixture([sse(frame(done([call('one'), call('two')]))) ]);
    t.callbacks.onPhase.mockImplementation((phase) => { if (phase === 'tools') controller.abort(); });
    const result = await t.run(controller.signal);
    expect(result).toMatchObject({ status: 'cancelled', mutationAttempted: false });
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.turns.filter((turn) => turn.role === 'tool').map((turn) => turn.toolOutcome)).toEqual(['cancelled', 'cancelled']);
    expect(t.requests).toHaveLength(1);
  });

  it('Stop between synchronous tools preserves applied effects and completes every call slot', async () => {
    const controller = new AbortController();
    const t = fixture([sse(frame(done([call('one'), call('two')]))) ]);
    t.callbacks.onOpsApplied.mockImplementation(() => controller.abort());
    const result = await t.run(controller.signal);
    expect(result).toMatchObject({ status: 'cancelled', mutation: 'applied', appliedOps: 1 });
    expect(t.graph.nodes).toHaveLength(1);
    expect(result.turns.filter((turn) => turn.role === 'tool').map((turn) => turn.toolOutcome)).toEqual(['completed', 'cancelled']);
    expect(t.requests).toHaveLength(1);
  });

  it('post-mutation provider failure preserves the raw receipt and is unsafe to replay', async () => {
    const t = fixture([sse(frame(done([call('one')]))), sse(frame({ type: 'text_delta', text: 'partial answer' }) + frame({ type: 'error', message: 'proxy failed' }))]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'failed', mutation: 'applied', mutationAttempted: true, appliedOps: 1 });
    expect(t.graph.nodes).toHaveLength(1);
    expect(JSON.parse(result.turns[1].content).results[0].ok).toBe(true);
    expect(result.turns.at(-1)?.content).toBe('partial answer');
    expect(result.turns.at(-1)?.runSummary?.mutationAttempted).toBe(true);
    expect(t.callbacks.onFinished).toHaveBeenCalledTimes(1);
  });

  it('real malformed or missing terminal streams cannot execute tool calls or complete', async () => {
    const t = fixture([sse(frame({ type: 'text_delta', text: 'partial' }) + 'data: {bad json}\n\n')]);
    const result = await t.run();
    expect(result).toMatchObject({ status: 'failed', mutationAttempted: false });
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.turns[0].content).toBe('partial');
    const silent = fixture([sse(frame({ type: 'text_delta', text: 'no done' }))]);
    expect((await silent.run()).status).toBe('failed');
  });

  it('a real abort inside streamed text preserves partials without reporting a network failure', async () => {
    const controller = new AbortController();
    const t = fixture([sse(frame({ type: 'text_delta', text: 'keep this' }))]);
    t.callbacks.onTextDelta.mockImplementation(() => controller.abort());
    const result = await t.run(controller.signal);
    expect(result.status).toBe('cancelled');
    expect(result.turns[0].content).toBe('keep this');
    expect(t.callbacks.onError).not.toHaveBeenCalled();
    expect(t.api.graph.applyOperations).not.toHaveBeenCalled();
  });

  it('validation abort stops all later requests and preserves the mutation already applied', async () => {
    const controller = new AbortController();
    const t = fixture([sse(frame(done([call('one')]))), sse(frame(done()))]);
    vi.mocked(t.api.http.fetch).mockImplementation(async (url, init) => {
      if (url === '/api/graph/validate') controller.abort();
      return t.fetch(url, init);
    });
    const result = await t.run(controller.signal);
    expect(result).toMatchObject({ status: 'cancelled', mutation: 'applied', validation: { status: 'not_run' } });
    expect(t.graph.nodes).toHaveLength(1);
  });
});
