/**
 * Agent tool loop for Graph Copilot.
 *
 * Runs a multi-round conversation with the LLM, executing tool calls
 * (apply_graph_operations, get_current_graph) and feeding results back until
 * the model emits stop_reason==='end' or MAX_TOOL_ROUNDS is reached.
 */

import { streamChat } from '../llm/client';
import type { WireMessage, WireToolCall, DoneEvent } from '../llm/client';
import { buildSystemPrompt, graphSnapshot, compactCatalog, compactIndex } from './prompt';
import type { Settings } from '../state/settings';
import type { ChatTurn } from '../state/conversations';
import type { CodefyUIPluginAPI, GraphOp, ApplyResult, OpResult } from '../types/codefyui';

// ---------------------------------------------------------------------------
// Constants & tool definitions
// ---------------------------------------------------------------------------

export const MAX_TOOL_ROUNDS = 16;

/** Extra rounds the runnability gate may spend nudging the model to fix
 * validation errors after it tries to finish. */
export const MAX_VALIDATION_NUDGES = 2;

export const TOOLS = [
  {
    name: 'apply_graph_operations',
    description:
      `Apply a batch of graph edits to the canvas as ONE undo step. Failing operations are skipped and reported per-index (with an error message) so you can self-correct and retry.
Each entry in "operations" is one GraphOp object; use these EXACT field names:
- {"op":"add_node","node_type":"<exact catalog name>","ref":"<alias>","params":{...},"position":{"x":<num>,"y":<num>}} — ref/params/position optional. "ref" is a temporary alias usable as source/target/node_id ONLY within this SAME batch. In a LATER apply_graph_operations call refs are gone — use the real node id from the previous result (the "refs" map or each op's "node_id"), or call get_current_graph.
- {"op":"connect","source":"<node id or ref>","source_handle":"<output port name>","target":"<node id or ref>","target_handle":"<input port name>"} — handle names are the port names from the catalog out[...] / in[...]. For control-flow trigger edges use source_handle "trigger".
- {"op":"set_params","node_id":"<node id or ref>","params":{...}}
- {"op":"remove_node","node_id":"<node id or ref>"}
- {"op":"remove_edge","source":"<node id or ref>","target":"<node id or ref>","source_handle":"<optional>","target_handle":"<optional>"}
- {"op":"clear_graph"} — wipes the whole graph; only when the user asks to start over.
- {"op":"auto_layout"} — auto-positions all nodes; run once after a structural batch.`,
    input_schema: {
      type: 'object',
      properties: {
        operations: {
          type: 'array',
          items: { type: 'object' }, // GraphOp union documented in the tool description above
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
  {
    name: 'get_node_schemas',
    description:
      'Get the exact input/output ports and params for specific node types. Call this before adding/connecting those nodes so you use correct port and param names (the catalog index lists names only). Returns one detail line per node: "Name: in[port:TYPE, ...] out[...] params[name:type=default{range}, ...] [category: X]".',
    input_schema: {
      type: 'object',
      properties: {
        node_types: { type: 'array', items: { type: 'string' } },
      },
      required: ['node_types'],
    },
  },
  {
    name: 'validate_graph',
    description:
      'Validate the current graph on the server: checks for unknown node types, MISSING REQUIRED INPUT connections, and out-of-range params. Returns {"valid": boolean, "errors": string[]}. Call this after building and fix every error until valid is true — this is what makes the graph actually runnable.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'research',
    description:
      'For COMPLEX graphs only: research several independent sub-tasks IN PARALLEL using focused lightweight sub-agents (each sees just the node index, not this whole conversation, so it stays token-cheap). Returns a concise answer per question. Example: ["which nodes build the data pipeline for MNIST?", "which nodes build a CNN classifier?", "which nodes form the training loop?"]. Use the answers to plan, then build with apply_graph_operations.',
    input_schema: {
      type: 'object',
      properties: {
        questions: { type: 'array', items: { type: 'string' } },
      },
      required: ['questions'],
    },
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
  tools: typeof TOOLS = TOOLS,
  maxTokens = 8192,
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
    tools,
    max_tokens: maxTokens,
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
// Server-side graph validation (runnability check)
// ---------------------------------------------------------------------------

/** POST the current graph to /api/graph/validate. The backend checks unknown
 * node types, missing REQUIRED input connections, and out-of-range params —
 * i.e. the things that stop a graph from running. */
export async function validateCurrentGraph(
  api: CodefyUIPluginAPI,
): Promise<{ valid: boolean; errors: string[] }> {
  const g = api.graph.getGraph();
  try {
    const res = await api.http.fetch('/api/graph/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes: g.nodes, edges: g.edges }),
    });
    if (!res.ok) {
      return { valid: false, errors: [`validate request failed: HTTP ${res.status}`] };
    }
    const data = (await res.json()) as { valid?: boolean; errors?: string[] };
    return { valid: !!data.valid, errors: Array.isArray(data.errors) ? data.errors : [] };
  } catch (err) {
    return { valid: false, errors: [`validate request error: ${String(err)}`] };
  }
}

// ---------------------------------------------------------------------------
// Parallel research sub-agents
// ---------------------------------------------------------------------------

/** Run ONE focused, text-only research sub-agent. It sees only the compact
 * node index (not the main conversation), so it stays cheap; several of these
 * run in parallel to decompose a complex request without bloating the main
 * agent's context. */
async function researchSubagent(
  api: CodefyUIPluginAPI,
  settings: Settings,
  question: string,
  indexText: string,
  signal?: AbortSignal,
): Promise<string> {
  const sys =
    'You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, ' +
    'answer CONCISELY which node types (exact names from the index) are needed and how to wire ' +
    'them (which output connects to which input). List node names + a one-line wiring plan. ' +
    'No preamble, no code.\n\n## Node index\n' + indexText;
  const messages: WireMessage[] = [
    { role: 'system', content: sys },
    { role: 'user', content: question },
  ];
  let text = '';
  try {
    await streamChat(
      api,
      buildChatBody(settings, messages, [], 1024),
      {
        onText: (t) => { text += t; },
        onDone: (d) => { if (!text && d.message.content) text = d.message.content; },
        onError: (e) => { text += `\n(research error: ${e})`; },
      },
      signal,
    );
  } catch (err) {
    return `(research failed: ${String(err)})`;
  }
  return text.trim() || '(no answer)';
}

// ---------------------------------------------------------------------------
// execute a single tool call, return the tool-result wire message content
// and optionally trigger callbacks
// ---------------------------------------------------------------------------

async function executeTool(
  toolCall: WireToolCall,
  api: CodefyUIPluginAPI,
  settings: Settings,
  callbacks: TurnCallbacks,
  roundOpsSummaries: string[],
  signal?: AbortSignal,
): Promise<string> {
  const { name, arguments: args } = toolCall;

  if (name === 'apply_graph_operations') {
    const ops = args.operations;
    if (!Array.isArray(ops)) {
      return JSON.stringify({ error: 'operations must be an array of GraphOp objects' });
    }

    let result: ReturnType<typeof api.graph.applyOperations>;
    try {
      result = api.graph.applyOperations(ops as GraphOp[]);
    } catch (err) {
      return JSON.stringify({ error: `applyOperations threw: ${String(err)}` });
    }
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

  if (name === 'get_node_schemas') {
    const requested = Array.isArray(args.node_types) ? (args.node_types as unknown[]) : [];
    const names = requested.map((n) => String(n));
    const defs = api.graph.getNodeDefinitions();
    const byName = new Map(defs.map((d) => [d.node_name, d]));
    const found = names
      .map((n) => byName.get(n))
      .filter((d): d is NonNullable<typeof d> => !!d);
    const missing = names.filter((n) => !byName.has(n));
    let out = found.length > 0 ? compactCatalog(found) : '(no matching node types)';
    if (missing.length > 0) {
      out += `\n(unknown node types, not in catalog: ${missing.join(', ')})`;
    }
    return out;
  }

  if (name === 'validate_graph') {
    return JSON.stringify(await validateCurrentGraph(api));
  }

  if (name === 'research') {
    const raw = Array.isArray(args.questions) ? (args.questions as unknown[]) : [];
    const questions = raw.map((q) => String(q)).filter((q) => q.trim()).slice(0, 4);
    if (questions.length === 0) {
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    }
    const indexText = compactIndex(api.graph.getNodeDefinitions());
    const answers = await Promise.all(
      questions.map((q) => researchSubagent(api, settings, q, indexText, signal)),
    );
    return questions.map((q, i) => `[${i + 1}] Q: ${q}\nA: ${answers[i]}`).join('\n\n');
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
  let validationNudges = 0;

  // Loop up to MAX_TOOL_ROUNDS
  try {
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
      // Prefer non-empty: streamed text is the source of truth when content is ''.
      const content = done.message.content || accumulatedText;

      if (done.stop_reason === 'end' || toolCalls.length === 0) {
        // Runnability gate: before accepting "done", make sure the graph
        // actually validates. If not, feed the errors back (up to
        // MAX_VALIDATION_NUDGES times) so the model fixes them. The nudge is
        // context-only (not persisted to history) to keep the transcript clean.
        const g = api.graph.getGraph();
        if (
          validationNudges < MAX_VALIDATION_NUDGES &&
          Array.isArray(g.nodes) && g.nodes.length > 0
        ) {
          const v = await validateCurrentGraph(api);
          if (!v.valid && v.errors.length > 0) {
            validationNudges++;
            wireMessages.push({ role: 'assistant', content });
            wireMessages.push({
              role: 'user',
              content:
                'The graph is not runnable yet — validate_graph reported these errors. ' +
                'Fix them with graph operations, then validate again before finishing:\n' +
                v.errors.map((e) => `- ${e}`).join('\n'),
            });
            continue;
          }
        }

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
        const resultContent = await executeTool(toolCall, api, settings, callbacks, roundOpsSummaries, signal);
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
  } catch (err) {
    // Unexpected synchronous throw (e.g. from a callback or executeTool path
    // not caught by the inner try). Commit accumulated turns once, then signal
    // error and finish so the UI never strands in busy state.
    callbacks.onTurnsCommitted(allTurns);
    callbacks.onError(String(err));
    callbacks.onFinished();
  }
}
