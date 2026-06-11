/**
 * Agent tool loop for Graph Copilot.
 *
 * Runs a multi-round conversation with the LLM, executing tool calls
 * (apply_graph_operations, get_current_graph) and feeding results back until
 * the model emits stop_reason==='end' or MAX_TOOL_ROUNDS is reached.
 */

import { streamChat } from '../llm/client';
import type { WireMessage, WireToolCall, DoneEvent } from '../llm/client';
import { buildSystemPrompt, graphSnapshot } from './prompt';
import type { Settings } from '../state/settings';
import type { ChatTurn } from '../state/conversations';
import type { CodefyUIPluginAPI, GraphOp, ApplyResult, OpResult } from '../types/codefyui';

// ---------------------------------------------------------------------------
// Constants & tool definitions
// ---------------------------------------------------------------------------

export const MAX_TOOL_ROUNDS = 8;

export const TOOLS = [
  {
    name: 'apply_graph_operations',
    description:
      'Apply a batch of graph edits to the canvas. Failing operations are skipped and reported; the batch is one undo step.',
    input_schema: {
      type: 'object',
      properties: {
        operations: {
          type: 'array',
          items: { type: 'object' }, // GraphOp union documented in description
        },
      },
      required: ['operations'],
    },
  },
  {
    name: 'get_current_graph',
    description: 'Read the current serialized graph (the user may have edited it manually).',
    input_schema: { type: 'object', properties: {} },
  },
];

// ---------------------------------------------------------------------------
// Callbacks interface
// ---------------------------------------------------------------------------

export interface TurnCallbacks {
  onTextDelta(t: string): void;
  onOpsApplied(summary: string, result: ApplyResult): void;
  /** Called once at the end (success, error, or cap) with ALL turns accumulated. */
  onTurnsCommitted(turns: ChatTurn[]): void;
  onError(message: string): void;
  onFinished(): void;
}

// ---------------------------------------------------------------------------
// runTurn options
// ---------------------------------------------------------------------------

export interface RunTurnOpts {
  api: CodefyUIPluginAPI;
  settings: Settings;
  history: ChatTurn[]; // prior conversation turns (no system)
  userText: string;
  callbacks: TurnCallbacks;
  signal?: AbortSignal;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a ChatTurn to a WireMessage, stripping opsSummary (local-only). */
function turnToWire(turn: ChatTurn): WireMessage {
  const msg: WireMessage = { role: turn.role, content: turn.content };
  if (turn.tool_calls) msg.tool_calls = turn.tool_calls;
  if (turn.tool_call_id) msg.tool_call_id = turn.tool_call_id;
  return msg;
}

/**
 * Build an op-level summary string for the ops applied in one batch.
 * Groups by op field, counts ok/fail per group.
 * e.g. "add_node x2 ok, connect x1 ok, set_params x1 FAILED"
 */
function buildOpsSummary(ops: GraphOp[], results: OpResult[]): string {
  // Map each op to its outcome
  const opGroups: Map<string, { ok: number; fail: number }> = new Map();

  ops.forEach((op, i) => {
    const opName = op.op;
    const res = results[i];
    const ok = res ? res.ok : false;

    if (!opGroups.has(opName)) {
      opGroups.set(opName, { ok: 0, fail: 0 });
    }
    const g = opGroups.get(opName)!;
    if (ok) g.ok++; else g.fail++;
  });

  const parts: string[] = [];
  for (const [opName, counts] of opGroups) {
    const total = counts.ok + counts.fail;
    if (counts.fail === 0) {
      parts.push(`${opName} x${total} ok`);
    } else if (counts.ok === 0) {
      parts.push(`${opName} x${total} FAILED`);
    } else {
      parts.push(`${opName} x${total} (${counts.ok} ok, ${counts.fail} FAILED)`);
    }
  }
  return parts.join(', ');
}

/**
 * Build the initial wire message window:
 * [system, ...last-20-history, user]
 */
function buildInitialMessages(
  api: CodefyUIPluginAPI,
  history: ChatTurn[],
  userText: string,
): WireMessage[] {
  const systemContent = buildSystemPrompt(
    api.graph.getNodeDefinitions(),
    api.graph.getGraph(),
  );
  const systemMsg: WireMessage = { role: 'system', content: systemContent };
  const windowedHistory = history.slice(-20).map(turnToWire);
  const userMsg: WireMessage = { role: 'user', content: userText };
  return [systemMsg, ...windowedHistory, userMsg];
}

/**
 * Build a ChatBody for a streamChat call.
 */
function buildChatBody(
  settings: Settings,
  messages: WireMessage[],
) {
  const provider = settings.provider;
  const model = settings.models[provider] ?? '';

  const body: {
    provider: typeof provider;
    model: string;
    messages: WireMessage[];
    tools: typeof TOOLS;
    max_tokens: number;
    api_key?: string;
    base_url?: string;
  } = {
    provider,
    model,
    messages,
    tools: TOOLS,
    max_tokens: 8192,
  };

  // api_key: all providers except openai-codex
  if (provider !== 'openai-codex') {
    const key = provider === 'openai'
      ? settings.apiKeys.openai
      : provider === 'openrouter'
      ? settings.apiKeys.openrouter
      : provider === 'anthropic'
      ? settings.apiKeys.anthropic
      : provider === 'custom'
      ? settings.apiKeys.custom
      : undefined;
    if (key) body.api_key = key;
  }

  // base_url: only for custom provider
  if (provider === 'custom' && settings.customBaseUrl) {
    body.base_url = settings.customBaseUrl;
  }

  return body;
}

// ---------------------------------------------------------------------------
// execute a single tool call, return the tool-result wire message content
// and optionally trigger callbacks
// ---------------------------------------------------------------------------

function executeTool(
  toolCall: WireToolCall,
  api: CodefyUIPluginAPI,
  callbacks: TurnCallbacks,
  roundOpsSummaries: string[],
): string {
  const { name, arguments: args } = toolCall;

  if (name === 'apply_graph_operations') {
    const ops = args.operations;
    if (!Array.isArray(ops)) {
      return JSON.stringify({ error: 'operations must be an array of GraphOp objects' });
    }

    const result = api.graph.applyOperations(ops as GraphOp[]);
    const summary = buildOpsSummary(ops as GraphOp[], result.results);
    roundOpsSummaries.push(summary);
    callbacks.onOpsApplied(summary, result);

    return JSON.stringify({
      results: result.results,
      refs: result.refs,
      node_count: result.node_count,
      edge_count: result.edge_count,
    });
  }

  if (name === 'get_current_graph') {
    return graphSnapshot(api.graph.getGraph());
  }

  return JSON.stringify({ error: `Unknown tool: ${name}` });
}

// ---------------------------------------------------------------------------
// Main runTurn
// ---------------------------------------------------------------------------

export async function runTurn(opts: RunTurnOpts): Promise<void> {
  const { api, settings, history, userText, callbacks, signal } = opts;

  // Accumulated ChatTurns across all rounds (to commit at the end)
  const allTurns: ChatTurn[] = [];

  // Wire messages start with system + windowed history + user
  const wireMessages: WireMessage[] = buildInitialMessages(api, history, userText);

  let roundsWithToolUse = 0;

  // Loop up to MAX_TOOL_ROUNDS
  while (true) {
    let accumulatedText = '';
    let doneEvent: DoneEvent | null = null;
    let streamError: string | null = null;

    await streamChat(
      api,
      buildChatBody(settings, wireMessages),
      {
        onText(t) {
          accumulatedText += t;
          callbacks.onTextDelta(t);
        },
        onDone(done) {
          doneEvent = done;
        },
        onError(msg) {
          streamError = msg;
        },
      },
      signal,
    );

    if (streamError !== null) {
      // Commit whatever we've accumulated so far
      callbacks.onTurnsCommitted(allTurns);
      callbacks.onError(streamError);
      callbacks.onFinished();
      return;
    }

    if (!doneEvent) {
      // Stream ended without a done event (abnormal)
      callbacks.onTurnsCommitted(allTurns);
      callbacks.onFinished();
      return;
    }

    const done = doneEvent as DoneEvent;
    const toolCalls = done.message.tool_calls ?? [];
    const content = done.message.content ?? accumulatedText;

    if (done.stop_reason === 'end' || toolCalls.length === 0) {
      // Final assistant turn
      const finalTurn: ChatTurn = { role: 'assistant', content };
      allTurns.push(finalTurn);
      callbacks.onTurnsCommitted(allTurns);
      callbacks.onFinished();
      return;
    }

    // stop_reason === 'tool_use'
    roundsWithToolUse++;

    // Execute each tool call
    const roundOpsSummaries: string[] = [];
    const toolResultTurns: ChatTurn[] = [];
    const toolResultWireMsgs: WireMessage[] = [];

    for (const toolCall of toolCalls) {
      const resultContent = executeTool(toolCall, api, callbacks, roundOpsSummaries);
      const toolTurn: ChatTurn = {
        role: 'tool',
        content: resultContent,
        tool_call_id: toolCall.id,
      };
      toolResultTurns.push(toolTurn);
      toolResultWireMsgs.push({
        role: 'tool',
        content: resultContent,
        tool_call_id: toolCall.id,
      });
    }

    // Build the assistant ChatTurn for this round (with opsSummary if any)
    const assistantTurn: ChatTurn = {
      role: 'assistant',
      content,
      tool_calls: toolCalls,
    };
    if (roundOpsSummaries.length > 0) {
      assistantTurn.opsSummary = roundOpsSummaries.join('; ');
    }

    // Append assistant turn + tool result turns to allTurns
    allTurns.push(assistantTurn);
    allTurns.push(...toolResultTurns);

    // Update wire messages for next round
    const assistantWireMsg: WireMessage = {
      role: 'assistant',
      content,
      tool_calls: toolCalls,
    };
    wireMessages.push(assistantWireMsg);
    wireMessages.push(...toolResultWireMsgs);

    // Check cap: if we've done MAX_TOOL_ROUNDS of tool_use, stop
    if (roundsWithToolUse >= MAX_TOOL_ROUNDS) {
      const capTurn: ChatTurn = {
        role: 'assistant',
        content: `(stopped after ${MAX_TOOL_ROUNDS} tool rounds)`,
      };
      allTurns.push(capTurn);
      callbacks.onTurnsCommitted(allTurns);
      callbacks.onFinished();
      return;
    }
  }
}
