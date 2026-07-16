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

// Keep the real module (composeUserContent etc.) and stub only streamChat.
vi.mock('../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

vi.mock('./experiments', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./experiments')>();
  return { ...actual, runGraphExperiments: vi.fn() };
});

import { streamChat } from '../llm/client';
import { runGraphExperiments } from './experiments';
import {
  MAX_TOOL_ROUNDS,
  MAX_VALIDATION_NUDGES,
  TOOLS,
  runTurn,
  validateCurrentGraph,
} from './loop';
import type { ExperimentApprovalRequest, TurnCallbacks } from './loop';

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

const SECRET_DEF: NodeDefinition = {
  node_name: 'SecureClient',
  category: 'Integration',
  description: '',
  inputs: [],
  outputs: [],
  params: [
    {
      name: 'account',
      param_type: 'secret',
      default: '',
      description: '',
      options: [],
      min_value: null,
      max_value: null,
    },
    {
      name: 'retries',
      param_type: 'int',
      default: 1,
      description: '',
      options: [],
      min_value: 0,
      max_value: 10,
    },
  ],
};

const TUNABLE_CONV_DEF: NodeDefinition = {
  ...FAKE_DEFS[0],
  params: [{
    name: 'channels',
    param_type: 'int',
    default: 1,
    description: '',
    options: [],
    min_value: 1,
    max_value: 8,
  }],
};

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
    http: { fetch: vi.fn().mockResolvedValue({ ok: true, json: async () => ({ valid: true, errors: [] }) }) },
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
    onExperimentApproval: async () => true,
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

  it('redacts legacy raw assistant/tool history again before sending it to a provider', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    const secret = 'legacy-history-secret';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    const history: ChatTurn[] = [
      {
        role: 'assistant',
        content: `I configured ${secret}`,
        tool_calls: [{
          id: 'legacy-call',
          name: 'apply_graph_operations',
          arguments: {
            operations: [{ op: 'add_node', node_type: 'SecureClient', params: { account: secret } }],
          },
        }],
      },
      {
        role: 'tool',
        tool_call_id: 'legacy-call',
        content: JSON.stringify({ authorization: `Bearer ${secret}`, error: `echo ${secret}` }),
      },
    ];
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    await runTurn({ api, settings: FAKE_SETTINGS, history, userText: 'continue', callbacks: cbs });

    const body = (streamChat as Mock).mock.calls[0][1] as ChatBody;
    expect(JSON.stringify(body.messages)).not.toContain(secret);
    expect(JSON.stringify(body.messages)).toContain('[REDACTED]');
  });

  it('uses tool calls outside the 20-turn wire window to redact in-window legacy echoes', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    const secret = 'boundary-history-secret';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    const history: ChatTurn[] = [
      {
        role: 'assistant',
        content: '',
        tool_calls: [{
          id: 'outside-window-call',
          name: 'apply_graph_operations',
          arguments: {
            operations: [{ op: 'add_node', node_type: 'SecureClient', params: { account: secret } }],
          },
        }],
      },
      {
        role: 'tool',
        tool_call_id: 'outside-window-call',
        content: JSON.stringify({ error: `backend echoed ${secret}` }),
      },
      { role: 'assistant', content: `legacy prose echoed ${secret}` },
      ...Array.from({ length: 18 }, (_, index) => ({
        role: 'user' as const,
        content: `filler-${index}`,
      })),
    ];
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    await runTurn({ api, settings: FAKE_SETTINGS, history, userText: 'continue', callbacks: cbs });

    const body = (streamChat as Mock).mock.calls[0][1] as ChatBody;
    expect(body.messages).toHaveLength(22);
    expect(JSON.stringify(body.messages)).not.toContain(secret);
    expect(JSON.stringify(body.messages)).toContain('[REDACTED]');
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
    expect(body).not.toHaveProperty('reasoning_effort');
  });

  it('includes reasoning_effort only when the host advertises support', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd() }]);

    const settings: Settings = {
      ...FAKE_SETTINGS,
      models: { openai: 'gpt-5.6-sol' },
      reasoningEfforts: { openai: 'max' },
      providerCapabilities: {
        openai: { reasoningEffort: true, reasoningModel: 'gpt-5.6-sol' },
      },
    };
    await runTurn({ api, settings, history: [], userText: 'hi', callbacks: cbs });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    expect(body.reasoning_effort).toBe('max');
  });

  it('omits reasoning_effort when a legacy host has not advertised support', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd() }]);

    const settings: Settings = {
      ...FAKE_SETTINGS,
      reasoningEfforts: { openai: 'high' },
    };
    await runTurn({ api, settings, history: [], userText: 'hi', callbacks: cbs });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    expect(body).not.toHaveProperty('reasoning_effort');
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
    const resultContent = JSON.parse(toolResultMsg!.content as string);
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
    expect(() => JSON.parse(toolResultMsg!.content as string)).not.toThrow();
    const snap = JSON.parse(toolResultMsg!.content as string);
    expect(snap).toHaveProperty('nodes');
    expect(snap).toHaveProperty('edges');
  });

  it('redacts live graph secrets before system context, tool results, and history', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const secret = 'live-graph-secret-never-send';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    (api.graph.getGraph as Mock).mockReturnValue({
      nodes: [{
        id: 'secure-1',
        type: 'SecureClient',
        data: {
          params: { account: secret, retries: 2, future_auth: 'unknown-secret' },
          note: `configured with ${secret}`,
          authorization: `Bearer ${secret}`,
        },
      }],
      edges: [],
    });

    scriptStreamChat([
      { done: makeDoneToolUse('graph-secret', 'get_current_graph', {}) },
      { done: makeDoneEnd('Reviewed the redacted graph.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'show graph', callbacks: state.cbs });

    const firstBody = (streamChat as Mock).mock.calls[0][1] as ChatBody;
    const secondBody = (streamChat as Mock).mock.calls[1][1] as ChatBody;
    expect(JSON.stringify(firstBody)).not.toContain(secret);
    expect(JSON.stringify(secondBody)).not.toContain(secret);
    expect(JSON.stringify(state.committed)).not.toContain(secret);
    expect(JSON.stringify(secondBody)).not.toContain('unknown-secret');
    const toolMessage = secondBody.messages.find((message) => message.role === 'tool');
    expect(toolMessage?.content).toContain('[REDACTED]');
  });

  it('tool round: get_node_schemas returns on-demand ports/params for requested types', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tcs', 'get_node_schemas', { node_types: ['Conv2d', 'Nonexistent'] }) },
      { done: makeDoneEnd('got schemas') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'schemas', callbacks: cbs });

    const [, body2] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    const toolMsg = body2.messages.find((m) => m.role === 'tool' && m.tool_call_id === 'tcs');
    expect(toolMsg).toBeDefined();
    // Detail (ports) for the known node is returned on demand...
    expect(toolMsg!.content).toContain('Conv2d:');
    expect(toolMsg!.content).toContain('in[x:TENSOR]');
    // ...and unknown types are reported back.
    expect(toolMsg!.content).toMatch(/unknown node types.*Nonexistent/i);
  });

  it('tool round: validate_graph forwards the server {valid,errors}', async () => {
    const api = makeFakeApi();
    // First fetch (the tool call) reports invalid; the gate's later fetch uses
    // the default valid response so the loop still finishes.
    (api.http.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: false, errors: ['boom'] }),
    });
    const { cbs } = makeCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tcv', 'validate_graph', {}) },
      { done: makeDoneEnd('validated') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'validate', callbacks: cbs });

    const [, body2] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    const toolMsg = body2.messages.find((m) => m.role === 'tool' && m.tool_call_id === 'tcv');
    expect(toolMsg).toBeDefined();
    const parsed = JSON.parse(toolMsg!.content as string);
    expect(parsed.valid).toBe(false);
    expect(parsed.errors).toEqual(['boom']);
  });

  it('validateCurrentGraph rejects truthy non-booleans and valid responses that still report errors', async () => {
    const api = makeFakeApi();
    (api.http.fetch as Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: 'false', errors: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: ['inconsistent'] }) });

    await expect(validateCurrentGraph(api)).resolves.toEqual({
      valid: false,
      errors: ['Graph validation failed without diagnostic details.'],
    });
    await expect(validateCurrentGraph(api)).resolves.toEqual({
      valid: false,
      errors: ['inconsistent'],
    });
  });

  it('runnability gate: re-prompts to fix when the final graph fails validation', async () => {
    const api = makeFakeApi();
    // Gate's first validate -> invalid (nudge); second -> valid (finish).
    (api.http.fetch as Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: false, errors: ['Missing required input x on node n0 (Conv2d)'] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: [] }) });
    const state = makeCallbacks();

    // Model tries to finish twice; the gate forces the extra round.
    scriptStreamChat([
      { done: makeDoneToolUse('gate-edit', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] }) },
      { done: makeDoneEnd('All done (but invalid).') },
      { done: makeDoneEnd('Fixed it.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'build', callbacks: state.cbs });

    // The gate caused a second streamChat round with a fix nudge.
    expect(streamChat).toHaveBeenCalledTimes(3);
    const [, body3] = (streamChat as Mock).mock.calls[2] as [unknown, ChatBody, ...unknown[]];
    const nudge = body3.messages.find(
      (m) => m.role === 'user' && typeof m.content === 'string' && /not runnable yet/i.test(m.content),
    );
    expect(nudge).toBeDefined();
    expect(nudge!.content as string).toMatch(/Missing required input/);
    // Validated twice (once per finish attempt); finished exactly once.
    expect(api.http.fetch).toHaveBeenCalledTimes(2);
    expect(state.finished).toBe(1);
  });

  it('does not inject graph-fix instructions into a read-only turn on an invalid graph', async () => {
    const api = makeFakeApi();
    (api.http.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ valid: false, errors: ['Existing graph is invalid'] }),
    });
    const state = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd('Here is the conceptual explanation.') }]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'Explain what this node does without changing the graph.',
      callbacks: state.cbs,
    });

    expect(api.http.fetch).not.toHaveBeenCalled();
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(state.committed?.at(-1)?.content).toBe('Here is the conceptual explanation.');
  });

  it('runnability gate fails closed when validation is false without diagnostics', async () => {
    const api = makeFakeApi();
    (api.http.fetch as Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: false, errors: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: [] }) });
    const state = makeCallbacks();
    scriptStreamChat([
      { done: makeDoneToolUse('gate-empty-errors-edit', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] }) },
      { done: makeDoneEnd('The graph is ready.') },
      { done: makeDoneEnd('The graph is now validated.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'build', callbacks: state.cbs });

    expect(streamChat).toHaveBeenCalledTimes(3);
    const thirdBody = (streamChat as Mock).mock.calls[2][1] as ChatBody;
    const nudge = thirdBody.messages.find(
      (message) => message.role === 'user' && typeof message.content === 'string' && /not runnable yet/i.test(message.content),
    );
    expect(nudge?.content).toContain('Graph validation failed without diagnostic details.');
    expect(state.committed?.at(-1)?.content).toBe('The graph is now validated.');
  });

  it('runnability gate rejects a validation result from a graph revision that changed in flight', async () => {
    const api = makeFakeApi();
    let graphChanged: (() => void) | undefined;
    (api.graph.onGraphChanged as Mock).mockImplementation((callback: () => void) => {
      graphChanged = callback;
      return vi.fn();
    });
    (api.http.fetch as Mock)
      .mockImplementationOnce(async () => {
        graphChanged?.();
        return { ok: true, json: async () => ({ valid: true, errors: [] }) };
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: [] }) });
    const state = makeCallbacks();
    scriptStreamChat([
      { done: makeDoneToolUse('gate-race-edit', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] }) },
      { done: makeDoneEnd('Validated the old revision.') },
      { done: makeDoneEnd('Validated the current revision.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'layout and validate', callbacks: state.cbs });

    expect(api.http.fetch).toHaveBeenCalledTimes(2);
    const thirdBody = (streamChat as Mock).mock.calls[2][1] as ChatBody;
    expect(JSON.stringify(thirdBody.messages)).toContain('changed while validation was in flight');
    expect(state.committed?.at(-1)?.content).toBe('Validated the current revision.');
  });

  it('runnability gate redacts graph-secret echoes from validation errors', async () => {
    const api = makeFakeApi();
    const secret = 'validation-error-secret';
    const presetSecret = 'validation-preset-secret';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    (api.graph.getGraph as Mock).mockReturnValue({
      nodes: [{ id: 'secure', type: 'SecureClient', data: { params: { account: secret } } }],
      edges: [],
      presets: [{ opaque: presetSecret }],
    });
    (api.http.fetch as Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: false, errors: [`Invalid account ${secret}; preset ${presetSecret}`] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: [] }) });
    const state = makeCallbacks();
    scriptStreamChat([
      { done: makeDoneToolUse('gate-secret-edit', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] }) },
      { done: makeDoneEnd('Done.') },
      { done: makeDoneEnd('Fixed.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'build', callbacks: state.cbs });

    const thirdBody = (streamChat as Mock).mock.calls[2][1] as ChatBody;
    expect(JSON.stringify(thirdBody)).not.toContain(secret);
    expect(JSON.stringify(thirdBody)).not.toContain(presetSecret);
    expect(JSON.stringify(thirdBody)).toContain('[REDACTED]');
    expect(JSON.stringify(state.committed)).not.toContain(secret);
  });

  it('runnability gate: reports a blocked result when bounded correction attempts stay invalid', async () => {
    const api = makeFakeApi();
    (api.http.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ valid: false, errors: ['Missing required input x on node n0'] }),
    });
    const state = makeCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('gate-blocked-edit', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] }) },
      { done: makeDoneEnd('The graph is complete.') },
      { done: makeDoneEnd('The graph is fixed and ready.') },
      { done: makeDoneEnd('Everything now validates.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'build', callbacks: state.cbs });

    expect(streamChat).toHaveBeenCalledTimes(MAX_VALIDATION_NUDGES + 2);
    expect(api.http.fetch).toHaveBeenCalledTimes(MAX_VALIDATION_NUDGES + 1);
    expect(state.committed?.at(-1)?.content).toMatch(/could not complete a runnable graph/i);
    expect(state.committed?.at(-1)?.content).toContain('Missing required input x');
    expect(state.finished).toBe(1);
  });

  it('tool round: research fans out parallel sub-agents and merges their answers', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();

    // call 0: main asks research; calls 1-2: the two parallel sub-agents;
    // call 3: main finishes.
    scriptStreamChat([
      { done: makeDoneToolUse('tcr', 'research', { questions: ['build data pipeline?', 'build model?'] }) },
      { done: makeDoneEnd('data: use Dataset -> DataLoader') },
      { done: makeDoneEnd('model: use SequentialModel') },
      { done: makeDoneEnd('planned') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'complex build', callbacks: cbs });

    // 1 main + 2 sub-agents + 1 main finish = 4 streamChat calls
    expect(streamChat).toHaveBeenCalledTimes(4);
    // Sub-agent calls are text-only (no tools) and low max_tokens (token-cheap).
    const subCall = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    expect(subCall[1].tools).toEqual([]);
    expect(subCall[1].max_tokens).toBe(1024);
    // The merged research result is fed back to the main agent.
    const [, body4] = (streamChat as Mock).mock.calls[3] as [unknown, ChatBody, ...unknown[]];
    const toolMsg = body4.messages.find((m) => m.role === 'tool' && m.tool_call_id === 'tcr');
    expect(toolMsg).toBeDefined();
    expect(toolMsg!.content).toContain('build data pipeline?');
    expect(toolMsg!.content).toContain('data: use Dataset');
    expect(toolMsg!.content).toContain('model: use SequentialModel');
  });

  it('executes raw GraphOps but renders and commits only schema-redacted tool arguments', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const secret = 'sk-never-persist-this-value';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    const operations = [
      {
        op: 'add_node',
        node_type: 'SecureClient',
        ref: 'secure',
        params: { account: secret, retries: 2 },
      },
      {
        op: 'set_params',
        node_id: 'secure',
        params: { account: secret, retries: 3 },
      },
    ];
    const args = {
      operations,
      note: `Configure this account with ${secret} and do not expose it.`,
      request_metadata: {
        authorization: `Bearer ${secret}`,
        max_tokens: 128,
      },
    };
    scriptStreamChat([
      { done: makeDoneToolUse('secret-op', 'apply_graph_operations', args) },
      { done: makeDoneEnd(`Applied ${secret} securely.`) },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'configure it', callbacks: state.cbs });

    // Execution and the current provider protocol receive the exact raw call.
    expect(api.graph.applyOperations).toHaveBeenCalledWith(operations);
    const [, secondBody] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    const rawProviderCall = secondBody.messages.find((message) => message.tool_calls?.[0]?.id === 'secret-op');
    expect(rawProviderCall?.tool_calls?.[0].arguments).toEqual(args);

    // Browser history and staged UI receive a separate redacted copy.
    const stored = state.committed!.find((turn) => turn.tool_calls?.[0]?.id === 'secret-op')!;
    expect(JSON.stringify(stored)).not.toContain(secret);
    const storedArgs = stored.tool_calls![0].arguments as typeof args;
    expect(storedArgs.operations[0].params).toEqual({ account: '[REDACTED]', retries: 2 });
    expect(storedArgs.operations[1].params).toEqual({ account: '[REDACTED]', retries: 3 });
    expect(storedArgs.request_metadata).toEqual({ authorization: '[REDACTED]', max_tokens: 128 });
    expect(storedArgs.note).toBe('Configure this account with [REDACTED] and do not expose it.');
    expect(state.committed?.at(-1)?.content).toBe('Applied [REDACTED] securely.');
  });

  it('redacts secret echoes from partial assistant text before error-path persistence', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const secret = 'partial-stream-secret-never-persist';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    scriptStreamChat([
      {
        done: makeDoneToolUse('partial-secret', 'apply_graph_operations', {
          operations: [{ op: 'add_node', node_type: 'SecureClient', params: { account: secret } }],
        }),
      },
      { textDeltas: [`The account is ${secret}`], error: 'proxy timeout' },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'configure', callbacks: state.cbs });

    expect(JSON.stringify(state.committed)).not.toContain(secret);
    expect(state.committed?.at(-1)?.content).toBe('The account is [REDACTED]');
    expect(state.errors).toEqual(['proxy timeout']);
  });

  it('scrubs a secret echoed across different tool calls in one assistant batch', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const secret = 'cross-call-secret-never-persist';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    const done: DoneEvent = {
      message: {
        role: 'assistant',
        content: '',
        tool_calls: [
          {
            id: 'introduce-secret',
            name: 'apply_graph_operations',
            arguments: {
              operations: [{ op: 'add_node', node_type: 'SecureClient', params: { account: secret } }],
            },
          },
          {
            id: 'echo-secret',
            name: 'get_node_schemas',
            arguments: { node_types: ['Conv2d'], note: `same value: ${secret}` },
          },
        ],
      },
      stop_reason: 'tool_use',
      usage: {},
    };
    scriptStreamChat([{ done }, { done: makeDoneEnd('Done.') }]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'configure', callbacks: state.cbs });

    const stored = state.committed!.find((turn) => turn.tool_calls?.length === 2)!;
    expect(JSON.stringify(stored)).not.toContain(secret);
    expect(stored.tool_calls?.[1].arguments.note).toBe('same value: [REDACTED]');
    const secondBody = (streamChat as Mock).mock.calls[1][1] as ChatBody;
    expect(secondBody.messages.find((message) => message.tool_calls)?.tool_calls?.[1].arguments.note)
      .toBe(`same value: ${secret}`);
  });

  it('redacts secret and unknown params inside persisted experiment variants', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const secret = 'credential-value-that-must-not-survive';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([...FAKE_DEFS, SECRET_DEF]);
    (runGraphExperiments as Mock).mockResolvedValue({ status: 'completed' });
    const approve = vi.fn(async (_request: ExperimentApprovalRequest) => true);
    state.cbs.onExperimentApproval = approve;
    const args = {
      hypothesis: 'compare secure clients',
      objective: { metric: 'accuracy', direction: 'maximize' },
      variants: [{
        id: 'secure',
        label: 'Secure candidate',
        operations: [{
          op: 'add_node',
          node_type: 'SecureClient',
          params: { account: secret, retries: 4 },
        }],
      }, {
        id: 'unknown',
        label: 'Unknown schema candidate',
        operations: [{
          op: 'add_node',
          node_type: 'ThirdPartyNode',
          params: { innocentLookingName: secret },
        }],
      }],
    };
    scriptStreamChat([
      { done: makeDoneToolUse('secret-study', 'run_graph_experiments', args) },
      { done: makeDoneEnd('Study complete.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'run it', callbacks: state.cbs });

    expect(runGraphExperiments).toHaveBeenCalledWith(api, args, undefined);
    const stored = state.committed!.find((turn) => turn.tool_calls?.[0]?.id === 'secret-study')!;
    expect(JSON.stringify(stored)).not.toContain(secret);
    const variants = stored.tool_calls![0].arguments.variants as Array<{ operations: Array<{ params: Record<string, unknown> }> }>;
    expect(variants[0].operations[0].params).toEqual({ account: '[REDACTED]', retries: 4 });
    expect(variants[1].operations[0].params).toEqual({ innocentLookingName: '[REDACTED]' });
    const approval = approve.mock.calls[0][0];
    expect(JSON.stringify(approval)).not.toContain(secret);
    expect(approval.variants[0].operations[0]).toContain('account="[REDACTED]"');
    expect(approval.variants[0].operations[0]).toContain('retries=4');
  });

  it('tool round: experiment result is fed back and promoted ops surface through callbacks', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const args = {
      hypothesis: 'wider is better',
      objective: { metric: 'accuracy', direction: 'maximize' },
      variants: [{ id: 'wide', label: 'Wide', operations: [] }],
      apply_best: true,
    };
    (runGraphExperiments as Mock).mockResolvedValue({
      id: 'study-1',
      createdAt: '2026-07-14T00:00:00.000Z',
      hypothesis: args.hypothesis,
      objective: args.objective,
      repetitions: 1,
      status: 'completed',
      variants: [],
      winnerId: 'wide',
      winnerLabel: 'Wide',
      appliedVariantId: 'wide',
      insights: { summary: [], warnings: [], paperIdeas: [] },
      applyResult: FAKE_APPLY_RESULT,
      appliedOperations: [
        { op: 'add_node', node_type: 'Conv2d', ref: 'mynode' },
        { op: 'auto_layout' },
      ],
    });
    scriptStreamChat([
      { done: makeDoneToolUse('exp1', 'run_graph_experiments', args) },
      { done: makeDoneEnd('Wide won.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'optimize', callbacks: state.cbs });

    expect(runGraphExperiments).toHaveBeenCalledWith(api, args, undefined);
    expect(state.opsApplied).toHaveLength(1);
    expect(state.opsApplied[0].summary).toContain('promote experiment winner');
    const tool = state.committed!.find((turn) => turn.role === 'tool');
    expect(tool?.content).toContain('"winnerId":"wide"');
    expect(tool?.content).not.toContain('applyResult');
    expect(tool?.content).not.toContain('appliedOperations');
  });

  it('rejects caller-supplied optimizer provenance on the direct experiment tool', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const args = {
      hypothesis: 'forged planner metadata',
      objective: { metric: 'accuracy', direction: 'maximize' },
      variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
      search: {
        strategy: 'grid', algorithm: 'forged', totalVariantCount: 1,
        totalExecutionCount: 1, bindings: [], assignments: [],
      },
    };
    scriptStreamChat([
      { done: makeDoneToolUse('forged-search', 'run_graph_experiments', args) },
      { done: makeDoneEnd('Rejected.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'run', callbacks: state.cbs });

    expect(runGraphExperiments).not.toHaveBeenCalled();
    const result = state.committed!.find((turn) => turn.role === 'tool');
    expect(result?.content).toMatch(/internal optimizer provenance/i);
  });

  it('compiles parameter optimization into the same approval, runner, and turn budget path', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([TUNABLE_CONV_DEF, FAKE_DEFS[1]]);
    (api.graph.getGraph as Mock).mockReturnValue({
      nodes: [{ id: 'n0', type: 'Conv2d', data: { params: { channels: 1 } } }],
      edges: [],
    });
    const approve = vi.fn(async () => true);
    state.cbs.onExperimentApproval = approve;
    (runGraphExperiments as Mock).mockResolvedValue({
      status: 'completed',
      winnerId: 'optimizer-grid-001',
      winnerLabel: 'Grid 1: n0.channels=2',
    });
    const args = {
      strategy: 'grid',
      hypothesis: 'More channels improve accuracy',
      objective: { metric: 'accuracy', direction: 'maximize' },
      bindings: [{ node_id: 'n0', param: 'channels', values: [1, 2] }],
      repetitions: 2,
      apply_best: true,
    };
    scriptStreamChat([
      { done: makeDoneToolUse('optimizer-1', 'optimize_graph_parameters', args) },
      { done: makeDoneEnd('Search complete.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'optimize channels', callbacks: state.cbs });

    expect(approve).toHaveBeenCalledWith(expect.objectContaining({
      variantCount: 2,
      repetitions: 2,
      executionCount: 4,
      applyBest: true,
      variants: expect.arrayContaining([
        expect.objectContaining({ label: 'Grid 1: n0.channels=2' }),
      ]),
    }));
    expect(runGraphExperiments).toHaveBeenCalledTimes(1);
    const compiled = (runGraphExperiments as Mock).mock.calls[0][1];
    expect(compiled.variants).toEqual([
      { id: 'baseline', label: 'Baseline', operations: [] },
      {
        id: 'optimizer-grid-001',
        label: 'Grid 1: n0.channels=2',
        operations: [{ op: 'set_params', node_id: 'n0', params: { channels: 2 } }],
      },
    ]);
    const toolResult = state.committed!.find((turn) => turn.tool_call_id === 'optimizer-1')!;
    expect(JSON.parse(toolResult.content).optimizer).toMatchObject({
      strategy: 'grid',
      totalExecutionCount: 4,
      generatedCandidateCount: 1,
    });
  });

  it('rejects unsafe optimizer bindings before approval and redacts their persisted domain', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const secret = 'optimizer-secret-value';
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([SECRET_DEF]);
    (api.graph.getGraph as Mock).mockReturnValue({
      nodes: [{ id: 'n0', type: 'SecureClient', data: { params: { account: secret } } }],
      edges: [],
    });
    const approve = vi.fn(async () => true);
    state.cbs.onExperimentApproval = approve;
    scriptStreamChat([
      { done: makeDoneToolUse('unsafe-optimizer', 'optimize_graph_parameters', {
        strategy: 'grid',
        hypothesis: 'Never optimize credentials',
        objective: { metric: 'accuracy', direction: 'maximize' },
        bindings: [{ node_id: 'n0', param: 'account', values: [secret] }],
      }) },
      { done: makeDoneEnd('Rejected.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'try it', callbacks: state.cbs });

    expect(approve).not.toHaveBeenCalled();
    expect(runGraphExperiments).not.toHaveBeenCalled();
    const assistant = state.committed!.find((turn) => turn.tool_calls?.[0]?.id === 'unsafe-optimizer')!;
    expect(JSON.stringify(assistant)).not.toContain(secret);
    expect((assistant.tool_calls![0].arguments.bindings as any[])[0].values).toEqual(['[REDACTED]']);
    const toolResult = state.committed!.find((turn) => turn.tool_call_id === 'unsafe-optimizer')!;
    expect(toolResult.content).toContain('unsupported type');
  });

  it('requires an explicit interactive approval before executing graph experiments', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const args = {
      hypothesis: 'compare candidates',
      objective: { metric: 'accuracy', direction: 'maximize' },
      variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
    };
    scriptStreamChat([
      { done: makeDoneToolUse('exp-denied', 'run_graph_experiments', args) },
      { done: makeDoneEnd('I need your authorization first.') },
    ]);
    state.cbs.onExperimentApproval = async () => false;

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'Explain the current graph.', callbacks: state.cbs });

    expect(runGraphExperiments).not.toHaveBeenCalled();
    const tool = state.committed!.find((turn) => turn.role === 'tool');
    expect(tool?.content).toContain('not approved by the user');
  });

  it('lists every node type that may execute in the approval instead of hiding a capped tail', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const nodeTypes = Array.from({ length: 15 }, (_, index) => `NodeType${index + 1}`);
    (api.graph.getGraph as Mock).mockReturnValue({
      nodes: nodeTypes.map((type, index) => ({ id: `node-${index}`, type })),
      edges: [],
    });
    const approve = vi.fn(async (_request: ExperimentApprovalRequest) => false);
    state.cbs.onExperimentApproval = approve;
    scriptStreamChat([
      { done: makeDoneToolUse('all-node-types', 'run_graph_experiments', {
        hypothesis: 'inventory execution scope',
        objective: { metric: 'accuracy', direction: 'maximize' },
        variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
      }) },
      { done: makeDoneEnd('Cancelled.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'review', callbacks: state.cbs });

    expect(approve.mock.calls[0][0].nodeTypes).toEqual(nodeTypes);
    expect(runGraphExperiments).not.toHaveBeenCalled();
  });

  it('requires replanning if the active graph changes while approval is open', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    let graphChanged = () => {};
    (api.graph.onGraphChanged as ReturnType<typeof vi.fn>).mockImplementation((callback: () => void) => {
      graphChanged = callback;
      return () => { graphChanged = () => {}; };
    });
    state.cbs.onExperimentApproval = async () => {
      graphChanged();
      return true;
    };
    scriptStreamChat([
      { done: makeDoneToolUse('exp-stale-approval', 'run_graph_experiments', {
        hypothesis: 'stale plan',
        objective: { metric: 'accuracy', direction: 'maximize' },
        variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
      }) },
      { done: makeDoneEnd('I will re-read the graph.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'Run an experiment.', callbacks: state.cbs });

    expect(runGraphExperiments).not.toHaveBeenCalled();
    const tool = state.committed!.find((turn) => turn.role === 'tool');
    expect(tool?.content).toContain('"replan":true');
    expect(tool?.content).toContain('changed while execution approval was open');
  });

  it('rejects coercible experiment arguments before approval or budget accounting', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const approve = vi.fn(async () => true);
    state.cbs.onExperimentApproval = approve;
    const base = {
      hypothesis: 'strict inputs',
      objective: { metric: 'accuracy', direction: 'maximize' },
      variants: Array.from({ length: 4 }, (_, index) => ({ id: `v${index}`, label: `V${index}`, operations: [] })),
    };
    scriptStreamChat([
      { done: makeDoneToolUse('exp-string-reps', 'run_graph_experiments', { ...base, repetitions: '5' }) },
      { done: makeDoneToolUse('exp-string-apply', 'run_graph_experiments', { ...base, apply_best: 'false' }) },
      { done: makeDoneEnd('Rejected invalid arguments.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'Run an experiment.', callbacks: state.cbs });

    expect(runGraphExperiments).not.toHaveBeenCalled();
    expect(approve).not.toHaveBeenCalled();
    const tools = state.committed!.filter((turn) => turn.role === 'tool');
    expect(tools[0].content).toContain('repetitions must be an integer');
    expect(tools[1].content).toContain('apply_best must be a boolean');
  });

  it('shares one 16-execution budget across every experiment call in the turn', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const variants = Array.from({ length: 8 }, (_, index) => ({
      id: `v${index}`,
      label: `Variant ${index}`,
      operations: [],
    }));
    const args = {
      hypothesis: 'bounded study',
      objective: { metric: 'accuracy', direction: 'maximize' },
      variants,
    };
    (runGraphExperiments as Mock).mockResolvedValue({ status: 'completed' });
    scriptStreamChat([
      { done: makeDoneToolUse('exp-budget-1', 'run_graph_experiments', args) },
      { done: makeDoneToolUse('exp-budget-2', 'run_graph_experiments', args) },
      { done: makeDoneToolUse('exp-budget-3', 'run_graph_experiments', { ...args, variants: variants.slice(0, 1) }) },
      { done: makeDoneEnd('Budget exhausted.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'Run an experiment.', callbacks: state.cbs });

    expect(runGraphExperiments).toHaveBeenCalledTimes(2);
    const tools = state.committed!.filter((turn) => turn.role === 'tool');
    expect(tools[2].content).toContain('turn budget exceeded');
    expect(tools[2].content).toContain('0 of 16');
  });

  it('charges optimizer-generated candidates to the same 16-execution turn ledger', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    (api.graph.getNodeDefinitions as Mock).mockReturnValue([TUNABLE_CONV_DEF]);
    (api.graph.getGraph as Mock).mockReturnValue({
      nodes: [{ id: 'n0', type: 'Conv2d', data: { params: { channels: 1 } } }],
      edges: [],
    });
    (runGraphExperiments as Mock).mockResolvedValue({ status: 'completed' });
    const optimizerArgs = {
      strategy: 'grid',
      hypothesis: 'bounded search',
      objective: { metric: 'accuracy', direction: 'maximize' },
      bindings: [{ node_id: 'n0', param: 'channels', values: [2, 3, 4] }],
      repetitions: 2,
    };
    scriptStreamChat([
      { done: makeDoneToolUse('optimizer-budget-1', 'optimize_graph_parameters', optimizerArgs) },
      { done: makeDoneToolUse('optimizer-budget-2', 'optimize_graph_parameters', optimizerArgs) },
      { done: makeDoneToolUse('optimizer-budget-3', 'run_graph_experiments', {
        hypothesis: 'one more',
        objective: { metric: 'accuracy', direction: 'maximize' },
        variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
      }) },
      { done: makeDoneEnd('Budget enforced.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'search twice', callbacks: state.cbs });

    expect(runGraphExperiments).toHaveBeenCalledTimes(2);
    const tools = state.committed!.filter((turn) => turn.role === 'tool');
    expect(tools[2].content).toContain('turn budget exceeded');
    expect(tools[2].content).toContain('0 of 16');
  });

  it('closes the tool call cleanly when an experiment is cancelled', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();
    const controller = new AbortController();
    (runGraphExperiments as Mock).mockImplementation(async () => {
      controller.abort();
      throw new DOMException('Experiment cancelled', 'AbortError');
    });
    scriptStreamChat([
      { done: makeDoneToolUse('exp-cancel', 'run_graph_experiments', {
        hypothesis: 'cancel me',
        objective: { metric: 'accuracy', direction: 'maximize' },
        variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
      }) },
    ]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'Run an experiment.',
      callbacks: state.cbs,
      signal: controller.signal,
    });

    expect(state.errors).toEqual([]);
    expect(state.finished).toBe(1);
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(state.committed?.map((turn) => turn.role)).toEqual(['assistant', 'tool']);
    expect(state.committed?.[1].content).toContain('"cancelled":true');
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
    const content = JSON.parse(toolMsg!.content as string);
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
    expect(lastTurn.content).toContain(`stopped after ${MAX_TOOL_ROUNDS} tool rounds`);
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

  // -------------------------------------------------------------------------
  // 6. applyOperations throws -> error tool result, loop continues (Fix 2a)
  // -------------------------------------------------------------------------

  it('applyOperations throw: tool result contains "threw", loop continues, single onTurnsCommitted + onFinished', async () => {
    const api = makeFakeApi();
    // Override applyOperations to throw
    (api.graph.applyOperations as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error('DB write failed');
    });

    const state = makeCallbacks();

    const ops = [{ op: 'add_node', node_type: 'Conv2d' }];

    scriptStreamChat([
      { done: makeDoneToolUse('tc_throw', 'apply_graph_operations', { operations: ops }) },
      { done: makeDoneEnd('recovered') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'throw test', callbacks: state.cbs });

    // The tool result sent back to the model must contain the error
    expect(streamChat).toHaveBeenCalledTimes(2);
    const [, body2] = (streamChat as Mock).mock.calls[1] as [unknown, ChatBody, ...unknown[]];
    const toolMsg = body2.messages.find((m) => m.role === 'tool');
    expect(toolMsg).toBeDefined();
    const content = JSON.parse(toolMsg!.content as string);
    expect(content.error).toMatch(/threw/i);

    // Loop continues and finishes normally (no outer error)
    expect(state.errors).toHaveLength(0);
    expect(state.finished).toBe(1);
    // onTurnsCommitted called exactly once
    expect(state.committed).not.toBeNull();
  });

  // -------------------------------------------------------------------------
  // 7. Callback (onOpsApplied) throwing -> outer catch fires once (Fix 2b)
  // -------------------------------------------------------------------------

  it('callback throw (onOpsApplied): outer catch commits turns, calls onError + onFinished exactly once', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks();

    // Make onOpsApplied throw
    const originalOnOpsApplied = state.cbs.onOpsApplied;
    let onTurnsCommittedCount = 0;
    let onFinishedCount = 0;
    state.cbs.onOpsApplied = () => {
      throw new Error('callback boom');
    };
    state.cbs.onTurnsCommitted = (turns) => {
      onTurnsCommittedCount++;
      state.committed = turns;
    };
    state.cbs.onFinished = () => { onFinishedCount++; };

    const ops = [{ op: 'add_node', node_type: 'Conv2d' }];

    scriptStreamChat([
      { done: makeDoneToolUse('tc_cb', 'apply_graph_operations', { operations: ops }) },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'callback error', callbacks: state.cbs });

    // onError must have been called with the throw message
    expect(state.errors).toHaveLength(1);
    expect(state.errors[0]).toContain('callback boom');

    // onTurnsCommitted and onFinished must each fire exactly once
    expect(onTurnsCommittedCount).toBe(1);
    expect(onFinishedCount).toBe(1);

    void originalOnOpsApplied; // silence unused var lint
  });
});

// ---------------------------------------------------------------------------
// 8. Incremental turn events (staged streaming display)
// ---------------------------------------------------------------------------

describe('runTurn — incremental turn events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  interface StagedState {
    cbs: TurnCallbacks;
    events: string[]; // interleaving log: 'appended:<role>' | 'ops'
    appended: ChatTurn[];
    committed: ChatTurn[] | null;
    errors: string[];
    finished: number;
  }

  function makeStagedCallbacks(): StagedState {
    const state: StagedState = {
      cbs: null as unknown as TurnCallbacks,
      events: [],
      appended: [],
      committed: null,
      errors: [],
      finished: 0,
    };
    state.cbs = {
      onTextDelta: () => {},
      onTurnAppended: (turn) => {
        state.events.push(`appended:${turn.role}`);
        state.appended.push(turn);
      },
      onOpsApplied: () => state.events.push('ops'),
      onTurnsCommitted: (turns) => { state.committed = turns; },
      onError: (msg) => state.errors.push(msg),
      onFinished: () => { state.finished++; },
    };
    return state;
  }

  const TOOL_OPS = [{ op: 'add_node', node_type: 'Conv2d' }];

  it('emits the tool-round assistant turn BEFORE tool execution, tool result after, final assistant last', async () => {
    const api = makeFakeApi();
    const state = makeStagedCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tc1', 'apply_graph_operations', { operations: TOOL_OPS }, 'Adding...') },
      { textDeltas: ['Done!'], done: makeDoneEnd('Done!') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'add', callbacks: state.cbs });

    // The assistant turn (with tool_calls) must be visible before ops execute.
    expect(state.events).toEqual(['appended:assistant', 'ops', 'appended:tool', 'appended:assistant']);
    expect(state.appended[0].tool_calls).toHaveLength(1);
    expect(state.appended[0].content).toBe('Adding...');
    expect(state.appended[1].tool_call_id).toBe('tc1');
    expect(state.appended[2].content).toBe('Done!');
  });

  it('appended turns match committed turns one-to-one (commit only enriches opsSummary)', async () => {
    const api = makeFakeApi();
    const state = makeStagedCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tc1', 'apply_graph_operations', { operations: TOOL_OPS }, 'working') },
      { done: makeDoneEnd('finished') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'go', callbacks: state.cbs });

    expect(state.committed).not.toBeNull();
    expect(state.committed!).toHaveLength(state.appended.length);
    state.committed!.forEach((turn, i) => {
      expect(turn.role).toBe(state.appended[i].role);
      expect(turn.content).toBe(state.appended[i].content);
      expect(turn.tool_calls ?? []).toEqual(state.appended[i].tool_calls ?? []);
    });
    // The committed tool-round assistant turn carries the ops summary.
    const toolRound = state.committed!.find((t) => t.role === 'assistant' && t.tool_calls?.length);
    expect(toolRound!.opsSummary).toMatch(/add_node/);
  });

  it('runnability gate: the pre-nudge assistant text is appended and committed (streamed text never vanishes)', async () => {
    const api = makeFakeApi();
    (api.http.fetch as Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: false, errors: ['Missing input x'] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ valid: true, errors: [] }) });
    const state = makeStagedCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('staged-gate-edit', 'apply_graph_operations', { operations: [{ op: 'auto_layout' }] }) },
      { done: makeDoneEnd('All done (but invalid).') },
      { done: makeDoneEnd('Fixed it.') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'build', callbacks: state.cbs });

    expect(state.committed).not.toBeNull();
    const contents = state.committed!
      .filter((turn) => turn.role === 'assistant' && !turn.tool_calls?.length)
      .map((turn) => turn.content);
    expect(contents).toEqual(['All done (but invalid).', 'Fixed it.']);
    expect(state.appended
      .filter((turn) => turn.role === 'assistant' && !turn.tool_calls?.length)
      .map((turn) => turn.content)).toEqual(contents);
    expect(state.finished).toBe(1);
  });

  it('stream error mid-round: partial streamed text is committed as an assistant turn', async () => {
    const api = makeFakeApi();
    const state = makeStagedCallbacks();

    scriptStreamChat([
      { done: makeDoneToolUse('tc1', 'apply_graph_operations', { operations: TOOL_OPS }) },
      { textDeltas: ['partial...'], error: 'proxy timeout' },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'err', callbacks: state.cbs });

    expect(state.errors).toEqual(['proxy timeout']);
    const last = state.committed![state.committed!.length - 1];
    expect(last.role).toBe('assistant');
    expect(last.content).toBe('partial...');
    // Round-1 turns were appended live before the failure.
    expect(state.appended.some((t) => t.role === 'tool')).toBe(true);
  });

  it('aborted stream (no done event): partial text is committed, empty partials are not', async () => {
    const api = makeFakeApi();
    const state = makeStagedCallbacks();

    // Stream yields text then ends without done/error (abort path).
    scriptStreamChat([{ textDeltas: ['cut off'] }]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'stop me', callbacks: state.cbs });

    expect(state.committed).not.toBeNull();
    expect(state.committed!).toHaveLength(1);
    expect(state.committed![0]).toMatchObject({ role: 'assistant', content: 'cut off' });
    expect(state.finished).toBe(1);

    // A silent abort with no text commits nothing.
    vi.clearAllMocks();
    const state2 = makeStagedCallbacks();
    scriptStreamChat([{}]);
    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'stop again', callbacks: state2.cbs });
    expect(state2.committed).toEqual([]);
  });

  it('back-compat: callbacks without onTurnAppended still work through a tool round', async () => {
    const api = makeFakeApi();
    const state = makeCallbacks(); // no onTurnAppended

    scriptStreamChat([
      { done: makeDoneToolUse('tc1', 'apply_graph_operations', { operations: TOOL_OPS }) },
      { done: makeDoneEnd('ok') },
    ]);

    await runTurn({ api, settings: FAKE_SETTINGS, history: [], userText: 'compat', callbacks: state.cbs });

    expect(state.errors).toHaveLength(0);
    expect(state.finished).toBe(1);
    expect(state.committed!.length).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// 9. Attachments — multimodal user content
// ---------------------------------------------------------------------------

describe('runTurn — attachments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('image attachment: the user wire message content is a multimodal parts array', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'what is this?',
      attachments: [
        { id: '1', kind: 'image', name: 'a.png', size: 10, mime: 'image/png', dataUrl: 'data:image/png;base64,AAA' },
      ],
      callbacks: cbs,
    });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    const userMsg = body.messages[body.messages.length - 1];
    expect(userMsg.role).toBe('user');
    expect(Array.isArray(userMsg.content)).toBe(true);
    const parts = userMsg.content as Array<Record<string, any>>;
    expect(parts[0]).toEqual({ type: 'text', text: 'what is this?' });
    expect(parts.some((p) => p.type === 'image_url' && p.image_url.url.startsWith('data:image/png'))).toBe(true);
  });

  it('text-file attachment: the user wire message inlines the file as a string', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    await runTurn({
      api,
      settings: FAKE_SETTINGS,
      history: [],
      userText: 'explain',
      attachments: [
        { id: '2', kind: 'text', name: 'main.py', size: 8, mime: 'text/plain', text: 'print(1)' },
      ],
      callbacks: cbs,
    });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    const userMsg = body.messages[body.messages.length - 1];
    expect(typeof userMsg.content).toBe('string');
    expect(userMsg.content as string).toContain('main.py');
    expect(userMsg.content as string).toContain('print(1)');
  });

  it('historical user-turn attachments are composed into the window too', async () => {
    const api = makeFakeApi();
    const { cbs } = makeCallbacks();
    scriptStreamChat([{ done: makeDoneEnd('ok') }]);

    const history: ChatTurn[] = [
      {
        role: 'user',
        content: 'earlier',
        attachments: [
          { id: '3', kind: 'image', name: 'p.png', size: 10, mime: 'image/png', dataUrl: 'data:image/png;base64,ZZZ' },
        ],
      },
      { role: 'assistant', content: 'sure' },
    ];

    await runTurn({ api, settings: FAKE_SETTINGS, history, userText: 'now', callbacks: cbs });

    const [, body] = (streamChat as Mock).mock.calls[0] as [unknown, ChatBody, ...unknown[]];
    const histUser = body.messages[1]; // system is [0]
    expect(histUser.role).toBe('user');
    expect(Array.isArray(histUser.content)).toBe(true);
  });
});
