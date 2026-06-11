/**
 * Tests for ui/src/agent/loop.ts
 *
 * Mocks streamChat via vi.mock('../llm/client', ...); uses a fake api with
 * vi.fn() graph methods.
 *
 * Covered scenarios:
 *   1. Text-only turn (end immediately).
 *   2. One tool round (apply_graph_operations) then end — asserts wire messages
 *      of 2nd streamChat call include assistant tool_calls + tool result with
 *      refs JSON; asserts onOpsApplied summary; asserts committed turns shape
 *      incl. opsSummary.
 *   3. Invalid arguments (operations not array) -> error tool result, loop
 *      continues and finishes normally.
 *   4. Cap at MAX_TOOL_ROUNDS (8) — synthetic note appended.
 *   5. Stream error mid-loop commits prior turns.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import type { DoneEvent, StreamHandlers, ChatBody } from '../llm/client';
import type { ApplyResult, CodefyUIPluginAPI, NodeDefinition, SerializedGraph } from '../types/codefyui';
import type { ChatTurn } from '../state/conversations';

// ---------------------------------------------------------------------------
// vi.mock must be at module scope (hoisted by vitest)
// ---------------------------------------------------------------------------

vi.mock('../llm/client', () => ({
  streamChat: vi.fn(),
}));

import { streamChat } from '../llm/client';
import { MAX_TOOL_ROUNDS, TOOLS, runTurn } from './loop';
import type { TurnCallbacks } from './loop';

// ---------------------------------------------------------------------------
// Scripted streamChat helper
// ---------------------------------------------------------------------------

type StreamScript = Array<{
  textDeltas?: string[];
  done?: DoneEvent;
  error?: string;
}>;

/**
 * Program the streamChat mock with a sequence of scripts.
 * Each call to streamChat consumes the next script entry:
 *   - emits textDeltas via onText
 *   - calls onDone or onError as terminal
 */
function scriptStreamChat(scripts: StreamScript): void {
  let callIndex = 0;
  (streamChat as Mock).mockImplementation(
    async (
      _api: unknown,
      _body: ChatBody,
      handlers: StreamHandlers,
      _signal?: AbortSignal,
    ) => {
      const script = scripts[callIndex++];
      if (!script) {
        handlers.onError('no more scripts');
        return;
      }
      for (const text of script.textDeltas ?? []) {
        handlers.onText(text);
      }
      if (script.error !== undefined) {
        handlers.onError(script.error);
      } else if (script.done) {
        handlers.onDone(script.done);
      }
    },
  );
}

function makeDoneEnd(content = ''): DoneEvent {
  return {
    message: { role: 'assistant', content, tool_calls: [] },
    stop_reason: 'end',
    usage: {},
  };
}

function makeDoneToolUse(toolCallId: string, toolName: string, args: Record<string, unknown>, content = ''): DoneEvent {
  return {
    message: {
      role: 'assistant',
      content,
      tool_calls: [{ id: toolCallId, name: toolName, arguments: args }],
    },
    stop_reason: 'tool_use',
    usage: {},
  };
}

// ---------------------------------------------------------------------------
// Fake CodefyUIPluginAPI
// ---------------------------------------------------------------------------

const FAKE_DEFS: NodeDefinition[] = [
  {
    node_name: 'Conv2d',
    category: 'Layer',
    description: '',
    inputs: [{ name: 'x', data_type: 'TENSOR', description: '', optional: false }],
    outputs: [{ name: 'y', data_type: 'TENSOR', description: '', optional: false }],
    params: [],
  },
  {
    node_name: 'ReLU',
    category: 'Activation',
    description: '',
    inputs: [],
    outputs: [],
    params: [],
  },
];

const FAKE_GRAPH: SerializedGraph = {
  nodes: [{ id: 'n0', type: 'Conv2d' }],
  edges: [],
};

const FAKE_APPLY_RESULT: ApplyResult = {
  results: [
    { index: 0, ok: true, node_id: 'n1' },
    { index: 1, ok: true },
  ],
  refs: { mynode: 'n1' },
  node_count: 2,
  edge_count: 0,
};

function makeFakeApi(): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn().mockReturnValue(FAKE_GRAPH),
      getNodeDefinitions: vi.fn().mockReturnValue(FAKE_DEFS),
      applyOperations: vi.fn().mockReturnValue(FAKE_APPLY_RESULT),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: { get: vi.fn(), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

// ---------------------------------------------------------------------------
// Settings helper
// ---------------------------------------------------------------------------

import type { Settings } from '../state/settings';

const FAKE_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-4o' },
  apiKeys: { openai: 'sk-test' },
  customBaseUrl: '',
};

// ---------------------------------------------------------------------------
// Callback helpers
// ---------------------------------------------------------------------------

interface CallbackState {
  cbs: TurnCallbacks;
  textDeltas: string[];
  opsApplied: Array<{ summary: string; result: ApplyResult }>;
  committed: ChatTurn[] | null;
  errors: string[];
  finished: number;
}

function makeCallbacks(): CallbackState {
  const state: CallbackState = {
    cbs: null as unknown as TurnCallbacks,
    textDeltas: [],
    opsApplied: [],
    committed: null,
    errors: [],
    finished: 0,
  };

  state.cbs = {
    onTextDelta: (t) => state.textDeltas.push(t),
    onOpsApplied: (summary, result) => state.opsApplied.push({ summary, result }),
    onTurnsCommitted: (turns) => { state.committed = turns; },
    onError: (msg) => state.errors.push(msg),
    onFinished: () => { state.finished++; },
  };

  return state;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('runTurn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Text-only turn
  // -------------------------------------------------------------------------

  it('text-only turn: streams text, commits one assistant turn, calls onFinished', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();

    scriptStreamChat([
      { textDeltas: ['Hello', ' world'], done: makeDoneEnd('Hello world') },
    ]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'Build a conv layer',
      callbacks: state.cbs,
    });

    expect(state.textDeltas).toEqual(['Hello', ' world']);
    expect(state.opsApplied).toHaveLength(0);
    expect(state.errors).toHaveLength(0);
    expect(state.finished).toBe(1);
    expect(state.committed).not.toBeNull();
    expect(state.committed).toHaveLength(1);
    const assistantTurn = state.committed![0];
    expect(assistantTurn.role).toBe('assistant');
    expect(assistantTurn.content).toBe('Hello world');
    expect(assistantTurn.opsSummary).toBeUndefined();
  });

  it('text-only turn: wire messages include system + user', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'hello',
      callbacks: cbs,
    });

    expect(streamChat).toHaveBeenCalledTimes(1);
    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    expect(body.messages[0].role).toBe('system');
    expect(body.messages[body.messages.length - 1]).toEqual({ role: 'user', content: 'hello' });
  });

  it('text-only turn: history turns (up to 20) included in wire messages', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    const history: ChatTurn[] = Array.from({ length: 25 }, (_, i) => ({
      role: 'user' as const,
      content: `msg${i}`,
    }));

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history,
      userText: 'new msg',
      callbacks: cbs,
    });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    // system + 20 history + 1 user = 22
    expect(body.messages).toHaveLength(22);
    // Last history message kept is msg24 (index 24), first in window is msg5 (25-20=5)
    expect(body.messages[1].content).toBe('msg5');
  });

  it('sends correct model, api_key, max_tokens for openai provider', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd() }]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'hi', callbacks: cbs });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    expect(body.model).toBe('gpt-4o');
    expect(body.api_key).toBe('sk-test');
    expect(body.max_tokens).toBe(8192);
    expect(body.tools).toEqual(TOOLS);
    expect(body).not.toHaveProperty('base_url');
  });

  it('omits api_key for openai-codex provider', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd() }]);

    const settings: Settings = { ...FAKE_SETTINGS, provider: 'openai-codex', models: { 'openai-codex': 'gpt-5.5' } };
    await runTurn({ api, settings, history: [], userText: 'hi', callbacks: cbs });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    expect(body.api_key).toBeUndefined();
  });

  it('includes base_url only for custom provider', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd() }]);

    const settings: Settings = {
      ...FAKE_SETTINGS,
      provider: 'custom',
      models: { custom: 'local-model' },
      customBaseUrl: 'http://127.0.0.1:11434/v1',
    };
    await runTurn({ api, settings, history: [], userText: 'hi', callbacks: cbs });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    expect(body.base_url).toBe('http://127.0.0.1:11434/v1');
  });

  // -------------------------------------------------------------------------
  // 2. One tool round then end
  // -------------------------------------------------------------------------

  it('tool round: applies ops, calls onOpsApplied, committed turns include opsSummary', async () => {
    const api = makeFakeApi();
    const { cbs, opsApplied } = makeCallbacks();
    let committed: ChatTurn[] | null = null;
    cbs.onTurnsCommitted = (turns) => { committed = turns; };

    const ops = [
      { op: 'add_node', node_type: 'Conv2d', ref: 'mynode' },
      { op: 'add_node', node_type: 'ReLU' },
    ];

    // Round 1: tool_use; Round 2: end
    scriptStreamChat([
      {
        done: makeDoneToolUse('tc1', 'apply_graph_operations', { operations: ops }, 'Adding nodes...'),
      },
      {
        textDeltas: ['Done!'],
        done: makeDoneEnd('Done!'),
      },
    ]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'add two nodes',
      callbacks: cbs,
    });

    // onOpsApplied was called once
    expect(opsApplied).toHaveLength(1);
    expect(opsApplied[0].result).toEqual(FAKE_APPLY_RESULT);
    // Summary mentions add_node
    expect(opsApplied[0].summary).toMatch(/add_node/);
    expect(opsApplied[0].summary).toMatch(/x2/);
    expect(opsApplied[0].summary).toMatch(/ok/);

    // Second call to streamChat included assistant tool_calls + tool result
    expect(streamChat).toHaveBeenCalledTimes(2);
    const [, body2] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    // Should have: system, user, assistant (with tool_calls), tool result
    const assistantMsg = body2.messages.find((m) => m.role === 'assistant' && m.tool_calls?.length);
    expect(assistantMsg).toBeDefined();
    expect(assistantMsg!.tool_calls![0].id).toBe('tc1');

    const toolResultMsg = body2.messages.find((m) => m.role === 'tool');
    expect(toolResultMsg).toBeDefined();
    expect(toolResultMsg!.tool_call_id).toBe('tc1');
    // Content must contain refs JSON
    const resultContent = JSON.parse(toolResultMsg!.content);
    expect(resultContent.refs).toEqual({ mynode: 'n1' });
    expect(resultContent.node_count).toBe(2);
    expect(resultContent.edge_count).toBe(0);

    // Committed turns: assistant with tool_calls, tool result, final assistant
    expect(committed).not.toBeNull();
    // Shape: [assistant(tool_use), tool(result), assistant(final)]
    expect(committed!.some((t) => t.role === 'assistant' && t.tool_calls?.length)).toBe(true);
    expect(committed!.some((t) => t.role === 'tool')).toBe(true);
    const firstAssistant = committed!.find((t) => t.role === 'assistant' && t.tool_calls?.length);
    // opsSummary on the assistant turn that had ops
    expect(firstAssistant!.opsSummary).toBeDefined();
    expect(firstAssistant!.opsSummary).toMatch(/add_node/);
  });

  it('tool round: get_current_graph returns graph snapshot', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tc2', 'get_current_graph', {}) },
      { done: makeDoneEnd('graph retrieved') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'show graph', callbacks: cbs });

    const [, body2] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    const toolResultMsg = body2.messages.find((m) => m.role === 'tool');
    expect(toolResultMsg).toBeDefined();
    // Content should be JSON parseable graph snapshot
    expect(() => JSON.parse(toolResultMsg!.content)).not.toThrow();
    const snap = JSON.parse(toolResultMsg!.content);
    expect(snap).toHaveProperty('nodes');
    expect(snap).toHaveProperty('edges');
  });

  // -------------------------------------------------------------------------
  // 3. Invalid operations (not array)
  // -------------------------------------------------------------------------

  it('non-array operations: error tool result sent, loop continues and finishes', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tc3', 'apply_graph_operations', { operations: 'not-an-array' }) },
      { done: makeDoneEnd('corrected') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'bad ops', callbacks: state.cbs });

    // applyOperations should NOT have been called
    expect(api.graph.applyOperations).not.toHaveBeenCalled();
    expect(state.opsApplied).toHaveLength(0);
    expect(state.errors).toHaveLength(0);
    expect(state.finished).toBe(1);

    // Tool result message in second call must be the error JSON
    const [, body2] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    const toolMsg = body2.messages.find((m) => m.role === 'tool');
    expect(toolMsg).toBeDefined();
    const content = JSON.parse(toolMsg!.content);
    expect(content.error).toMatch(/array/i);

    expect(state.committed).not.toBeNull();
  });

  // -------------------------------------------------------------------------
  // 4. Cap at MAX_TOOL_ROUNDS
  // -------------------------------------------------------------------------

  it(`caps at ${MAX_TOOL_ROUNDS} tool rounds and appends synthetic note`, async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();

    // 8 rounds of tool_use (no end)
    const scripts: StreamScript = Array.from({ length: MAX_TOOL_ROUNDS }, (_, i) => ({
      done: makeDoneToolUse(`tc${i}`, 'apply_graph_operations', {
        operations: [{ op: 'add_node', node_type: 'Conv2d' }],
      }),
    }));

    scriptStreamChat(scripts);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'loop forever', callbacks: state.cbs });

    expect(streamChat).toHaveBeenCalledTimes(MAX_TOOL_ROUNDS);
    expect(state.finished).toBe(1);
    expect(state.committed).not.toBeNull();
    // Last committed turn should be the synthetic cap message
    const lastTurn = state.committed![state.committed!.length - 1];
    expect(lastTurn.role).toBe('assistant');
    expect(lastTurn.content).toContain('stopped after 8 tool rounds');
  });

  // -------------------------------------------------------------------------
  // 5. Stream error mid-loop commits prior turns
  // -------------------------------------------------------------------------

  it('stream error mid-loop: commits turns accumulated so far, calls onError + onFinished', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();

    const ops = [{ op: 'add_node', node_type: 'Conv2d' }];

    scriptStreamChat([
      // Round 1 succeeds with tool_use
      { done: makeDoneToolUse('tc_err', 'apply_graph_operations', { operations: ops }, 'working...') },
      // Round 2 errors mid-stream
      { textDeltas: ['partial...'], error: 'proxy timeout' },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'error test', callbacks: state.cbs });

    expect(state.errors).toHaveLength(1);
    expect(state.errors[0]).toContain('proxy timeout');
    expect(state.finished).toBe(1);
    // Committed turns should include the round-1 assistant + tool turns
    expect(state.committed).not.toBeNull();
    expect(state.committed!.length).toBeGreaterThan(0);
    // At least the first assistant turn is there
    expect(state.committed!.some((t) => t.role === 'assistant')).toBe(true);
  });
});
