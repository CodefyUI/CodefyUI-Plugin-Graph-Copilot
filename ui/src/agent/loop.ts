/**
 * Agent tool loop for Graph Copilot.
 *
 * Runs a multi-round conversation with the LLM, executing tool calls
 * (apply_graph_operations, get_current_graph) and feeding results back until
 * the model emits stop_reason==='end' or MAX_TOOL_ROUNDS is reached.
 */

import { streamChat, composeUserContent } from '../llm/client';
import type { WireMessage, WireToolCall, DoneEvent, Provider } from '../llm/client';
import { buildSystemPrompt, graphSnapshot, compactCatalog, compactIndex } from './prompt';
import {
  MAX_EXPERIMENT_RUNS,
  experimentRunTimeoutMs,
  getExperimentExecutionCount,
  runGraphExperiments,
} from './experiments';
import type { GraphExperimentRequest } from './experiments';
import type { Settings } from '../state/settings';
import { activeReasoningEffort } from '../state/settings';
import type { ChatTurn } from '../state/conversations';
import type { Attachment } from '../state/attachments';
import type { CodefyUIPluginAPI, GraphOp, ApplyResult, OpResult } from '../types/codefyui';
import {
  redactAssistantTextForHistory,
  redactToolCallForHistory,
  redactToolCallsForHistory,
  redactToolResultForContext,
} from './historyRedaction';
import { compileParameterOptimizer } from './optimizer';
import {
  DEFAULT_RUN_TIMEOUT_MINUTES,
  MAX_RUN_TIMEOUT_MINUTES,
  fetchDefaultDevice,
  runLiveGraph,
} from './runGraph';
import type { RunGraphOutcome, RunProgressUpdate } from './runGraph';
import {
  fetchRun,
  fetchRunArtifacts,
  fetchRunList,
  isTerminalRunStatus,
  probeRunHistory,
} from './runHistory';
import type { RunRow } from './runHistory';
import { clearActiveRun, readActiveRun, writeActiveRun } from './runPointer';

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
    name: 'run_graph',
    description:
      `Execute the CURRENT canvas graph on the CodefyUI backend — the user's real run, with real side effects (file writes, network calls, GPU time). A user-facing confirmation is required before it starts. Call this AFTER validate_graph reports "valid": true, when the user asked to run, train, or evaluate their graph. Node statuses and live training progress (loss, epochs) stream to the panel while it runs; long training runs are expected and fine — do not cancel or restart one without being asked. Returns the final status, per-node scalar/string outputs, last progress values, metric tails, any node errors, and a "media" list when the run produced renderable artifacts (VideoWrite clips, image previews) — each entry is a reference {node, port, kind, format, url?, frames?, bytes?}; the clip itself plays inline in the panel, and you should mention it and its url in your report. Use run_graph for "run it / train it"; use run_graph_experiments only for comparing variants.`,
    input_schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'One short sentence shown in the user confirmation: what this run does and why.',
        },
        timeout_minutes: {
          type: 'integer',
          minimum: 1,
          maximum: 720,
          description: 'Optional wall-clock cap in minutes (default 360). Pick generously for training runs.',
        },
        device: {
          type: 'string',
          enum: ['cpu', 'cuda', 'mps'],
          description: 'Optional run-level compute device (what device="auto" nodes follow). Defaults to the host\'s preferred device — set this only when the user asked for a specific one.',
        },
      },
      required: ['reason'],
    },
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
  {
    name: 'run_graph_experiments',
    description:
      `Run a bounded experiment study on canvas-isolated clones of the current graph, then rank candidates by a numeric backend metric. A user-facing confirmation is required before execution because graph nodes retain their normal side effects (for example file writes, network calls, or paid API usage). Candidate edits never touch the live canvas while running. Each variant has a label and a GraphOp operations array using the same exact fields as apply_graph_operations. Include an empty-operations baseline when useful. The metric can be an exact "node-id.port", a unique suffix such as "accuracy", a unique "NodeType.port", or "auto". direction is "maximize" or "minimize". Use repetitions >=3 for variance estimates (max 16 executions across the entire agent turn); concurrency defaults to 1 and is capped at 2 to protect GPU memory. Set apply_best=true only when the user asked to optimize/apply the winner; automatic promotion is parameter-only and is refused if they changed the live graph mid-study. Structural winners remain review-only summaries. The result includes rankings, observed metrics, warnings, and evidence-grounded paper follow-ups.`,
    input_schema: {
      type: 'object',
      properties: {
        hypothesis: { type: 'string' },
        objective: {
          type: 'object',
          properties: {
            metric: { type: 'string' },
            direction: { type: 'string', enum: ['maximize', 'minimize'] },
          },
          required: ['metric', 'direction'],
        },
        variants: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              label: { type: 'string' },
              operations: { type: 'array', items: { type: 'object' } },
            },
            required: ['label', 'operations'],
          },
        },
        repetitions: { type: 'integer', minimum: 1, maximum: 5 },
        concurrency: { type: 'integer', minimum: 1, maximum: 2 },
        timeout_minutes: {
          type: 'integer', minimum: 1, maximum: 60,
          description: 'Per-run wall-clock cap in minutes (default 10). Raise for training-process studies whose single runs are longer, e.g. small-LM ablations.',
        },
        apply_best: { type: 'boolean' },
      },
      required: ['hypothesis', 'objective', 'variants'],
    },
  },
  {
    name: 'optimize_graph_parameters',
    description:
      `Compile and run a transparent, bounded parameter search on the current graph. Use this instead of manually inventing variants when the user asks to optimize existing numeric, boolean, or select parameters. Only existing-node int/float/bool/select parameters are accepted; secret, string, file, tensor, preset, and unknown parameters are refused. "grid" evaluates the complete Cartesian product and refuses to truncate it. "seeded_random" requires candidate_count and a uint32 seed; that seed makes candidate PLANNING repeatable but does NOT seed graph-node execution. Values must be explicit schema-valid domains. The compiler creates only set_params variants, optionally includes the current graph as baseline, and delegates to the same confirmation, 16-execution turn budget, isolated runner, and guarded promotion path as run_graph_experiments.`,
    input_schema: {
      type: 'object',
      properties: {
        version: { type: 'integer', enum: [1] },
        strategy: { type: 'string', enum: ['grid', 'seeded_random'] },
        hypothesis: { type: 'string' },
        objective: {
          type: 'object',
          properties: {
            metric: { type: 'string' },
            direction: { type: 'string', enum: ['maximize', 'minimize'] },
          },
          required: ['metric', 'direction'],
        },
        bindings: {
          type: 'array',
          minItems: 1,
          maxItems: 4,
          items: {
            type: 'object',
            properties: {
              node_id: { type: 'string' },
              param: { type: 'string' },
              values: { type: 'array', minItems: 1, maxItems: 32, items: {} },
            },
            required: ['node_id', 'param', 'values'],
          },
        },
        candidate_count: { type: 'integer', minimum: 1, maximum: 8 },
        seed: { type: 'integer', minimum: 0, maximum: 4294967295 },
        include_baseline: { type: 'boolean' },
        repetitions: { type: 'integer', minimum: 1, maximum: 5 },
        concurrency: { type: 'integer', minimum: 1, maximum: 2 },
        timeout_minutes: {
          type: 'integer', minimum: 1, maximum: 60,
          description: 'Per-run wall-clock cap in minutes (default 10). Raise for parameter searches over real training runs.',
        },
        apply_best: { type: 'boolean' },
      },
      required: ['strategy', 'hypothesis', 'objective', 'bindings'],
    },
  },
  {
    name: 'list_runs',
    description:
      'List recent graph runs on the CodefyUI host, newest first — INCLUDING runs the user started from the editor\'s own Run button. Each row: run_id, name, status (queued|running|succeeded|failed|cancelled|interrupted), queue_position (when queued), created_at, duration_s, error, and final_metrics (the last value of every metric series the run recorded, e.g. val_loss). Use this when asked what ran recently, whether something is still running, or which run to inspect; then use get_run for one run\'s detail. Requires a host with server-owned runs.',
    input_schema: {
      type: 'object',
      properties: {
        limit: { type: 'integer', minimum: 1, maximum: 20, description: 'Rows to return (default 10).' },
        active_only: { type: 'boolean', description: 'Only queued/running runs.' },
      },
    },
  },
  {
    name: 'get_run',
    description:
      'Fetch one run\'s server-side record by run_id: status, timing, error, final_metrics, and recorded artifacts (checkpoints etc.). This is the ground truth for "how did that run go" — report its numbers exactly; never reconstruct them from memory. Works for editor-started runs too.',
    input_schema: {
      type: 'object',
      properties: { run_id: { type: 'string' } },
      required: ['run_id'],
    },
  },
];

// ---------------------------------------------------------------------------
// Callbacks interface
// ---------------------------------------------------------------------------

export interface ExperimentApprovalRequest {
  hypothesis: string;
  variantCount: number;
  repetitions: number;
  executionCount: number;
  concurrency: number;
  /** Per-run wall-clock cap shown to the user (minutes). */
  runTimeoutMinutes: number;
  applyBest: boolean;
  variants: Array<{ label: string; operations: string[] }>;
  nodeTypes: string[];
}

export interface RunApprovalRequest {
  reason: string;
  nodeCount: number;
  edgeCount: number;
  nodeTypes: string[];
  timeoutMinutes: number;
  /** Run-level compute device shown to the user; 'host default' when the
   * host exposes no preference. */
  device: string;
}

export interface TurnCallbacks {
  onTextDelta(t: string): void;
  /**
   * A turn was finalized mid-run — fired once per turn, in order, as the run
   * progresses (assistant round with tool_calls BEFORE its tools execute, each
   * tool result as it lands, the final assistant reply). Lets the UI render
   * staged progress instead of one growing blob. Optional for back-compat.
   */
  onTurnAppended?(turn: ChatTurn): void;
  onOpsApplied(summary: string, result: ApplyResult): void;
  /** Explicit user confirmation before real graph nodes are executed. */
  onExperimentApproval?(request: ExperimentApprovalRequest): Promise<boolean>;
  /** Explicit user confirmation before the LIVE canvas graph is executed. */
  onRunApproval?(request: RunApprovalRequest): Promise<boolean>;
  /** Live progress stream while a run_graph execution is in flight. */
  onRunProgress?(update: RunProgressUpdate): void;
  /** The live run is over from the plugin's perspective (complete, cancelled,
   * timed out, or failed-and-confirmed-dead). Not fired when a socket error
   * leaves a server-owned run alive. */
  onRunFinished?(outcome: RunGraphOutcome): void;
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
  /** Files attached to this user turn (images/pdf/text). */
  attachments?: Attachment[];
  callbacks: TurnCallbacks;
  signal?: AbortSignal;
}

interface ExperimentBudget {
  remaining: number;
}

function graphRevisionFingerprint(api: CodefyUIPluginAPI): string {
  const graph = api.graph.getGraph();
  return JSON.stringify({ nodes: graph.nodes, edges: graph.edges, presets: graph.presets ?? [] });
}

/** Execution-relevant graph identity: node ids/types/params, edge wiring, and
 * presets — deliberately excluding positions and note nodes. The run-approval
 * guard compares this, so cosmetic drift (auto-layout animations settling
 * while the approval card is open) cannot void an approval, while any change
 * that alters what would execute still does. */
export function graphSemanticFingerprint(api: CodefyUIPluginAPI): string {
  const graph = api.graph.getGraph();
  const nodes = graph.nodes
    .filter((node) => node.type !== 'note')
    .map((node) => ({
      id: node.id,
      type: node.type ?? '',
      params: node.data?.params ?? {},
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
  const edges = graph.edges
    .map((edge) => ({
      source: edge.source ?? '',
      sourceHandle: edge.sourceHandle ?? '',
      target: edge.target ?? '',
      targetHandle: edge.targetHandle ?? '',
      type: edge.type ?? '',
    }))
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return JSON.stringify({ nodes, edges, presets: graph.presets ?? [] });
}

function approvalValue(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value);
  const encoded = JSON.stringify(value);
  if (encoded === undefined) return String(value);
  return encoded.length > 180 ? `${encoded.slice(0, 177)}...` : encoded;
}

function approvalParams(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  const entries = Object.entries(params).map(([name, value]) => `${name}=${approvalValue(value)}`);
  return entries.length > 0 ? entries.join(', ') : 'no parameters';
}

/** Summaries are built only from a schema-redacted copy of the request. */
function approvalOperationSummary(operation: GraphOp): string {
  switch (operation.op) {
    case 'add_node': {
      const params = approvalParams(operation.params);
      return `add ${operation.node_type}${params ? ` with ${params}` : ''}`;
    }
    case 'set_params': return `set ${operation.node_id}: ${approvalParams(operation.params)}`;
    case 'connect': return `connect ${operation.source}.${operation.source_handle} -> ${operation.target}.${operation.target_handle}`;
    case 'remove_node': return `remove node ${operation.node_id}`;
    case 'remove_edge': return `remove edge ${operation.source} -> ${operation.target}`;
    case 'clear_graph': return 'clear graph';
    case 'auto_layout': return 'auto layout';
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a ChatTurn to a WireMessage, stripping opsSummary (local-only). User
 *  turns with attachments get their content composed (text inlined, images as
 *  multimodal parts); everything else passes through as a plain string. */
function turnToWire(turn: ChatTurn, provider: Provider): WireMessage {
  const content =
    turn.role === 'user' && turn.attachments && turn.attachments.length > 0
      ? composeUserContent(turn.content, turn.attachments, provider)
      : turn.content;
  const msg: WireMessage = { role: turn.role, content };
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
  attachments: Attachment[] | undefined,
  provider: Provider,
): WireMessage[] {
  const systemContent = buildSystemPrompt(
    api.graph.getNodeDefinitions(),
    api.graph.getGraph(),
  );
  const systemMsg: WireMessage = { role: 'system', content: systemContent };
  const rawHistoryWindow = history.slice(-20);
  // Redaction context must span the full transcript even though only the last
  // 20 turns are sent. A window may begin with a tool result or assistant echo
  // whose secret-bearing call is just outside the provider window.
  const historicalToolCalls = history.flatMap((turn) => turn.tool_calls ?? []);
  const historicalCallsById = new Map(historicalToolCalls.map((call) => [call.id, call]));
  const windowedHistory = rawHistoryWindow.map((turn) => {
    if (turn.role === 'user') return turnToWire(turn, provider);
    if (turn.role === 'tool') {
      const matchingCall = turn.tool_call_id
        ? historicalCallsById.get(turn.tool_call_id)
        : undefined;
      const safeContent = redactToolResultForContext(
        matchingCall ?? { id: turn.tool_call_id ?? 'legacy', name: 'legacy_tool', arguments: {} },
        turn.content,
        api,
      );
      return turnToWire({ ...turn, content: safeContent }, provider);
    }
    return turnToWire({
      ...turn,
      content: redactAssistantTextForHistory(turn.content, historicalToolCalls, api),
      ...(turn.tool_calls
        ? { tool_calls: redactToolCallsForHistory(turn.tool_calls, api) }
        : {}),
    }, provider);
  });
  const userMsg: WireMessage = {
    role: 'user',
    content: composeUserContent(userText, attachments, provider),
  };
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
    reasoning_effort?: ReturnType<typeof activeReasoningEffort>;
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

  const reasoningEffort = activeReasoningEffort(settings);
  if (reasoningEffort) {
    body.reasoning_effort = reasoningEffort;
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
  const safeResult = (result: { valid: boolean; errors: string[] }) => {
    const redacted = redactToolResultForContext(
      { id: 'validation-gate', name: 'validate_graph', arguments: {} },
      JSON.stringify(result),
      api,
    );
    try {
      const parsed = JSON.parse(redacted) as { valid?: unknown; errors?: unknown };
      let valid = parsed.valid === true;
      const errors = Array.isArray(parsed.errors)
        ? parsed.errors.filter((error): error is string => typeof error === 'string')
        : [];
      if (valid && errors.length > 0) valid = false;
      if (!valid && errors.length === 0) {
        errors.push('Graph validation failed without diagnostic details.');
      }
      return { valid, errors };
    } catch {
      return { valid: false, errors: ['Graph validation returned an unreadable result.'] };
    }
  };
  const g = api.graph.getGraph();
  const nodes = g.nodes.filter((node) => node.type !== 'note');
  const ids = new Set(nodes.map((node) => node.id));
  const edges = g.edges.filter((edge) =>
    typeof edge.source === 'string'
    && typeof edge.target === 'string'
    && ids.has(edge.source)
    && ids.has(edge.target));
  try {
    const res = await api.http.fetch('/api/graph/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges, presets: g.presets ?? [] }),
    });
    if (!res.ok) {
      return safeResult({ valid: false, errors: [`validate request failed: HTTP ${res.status}`] });
    }
    const data = (await res.json()) as { valid?: unknown; errors?: unknown };
    return safeResult({
      valid: data.valid === true,
      errors: Array.isArray(data.errors)
        ? data.errors.filter((error): error is string => typeof error === 'string')
        : [],
    });
  } catch (err) {
    return safeResult({ valid: false, errors: [`validate request error: ${String(err)}`] });
  }
}

async function validateCurrentGraphAtStableRevision(
  api: CodefyUIPluginAPI,
): Promise<{ valid: boolean; errors: string[] }> {
  let changed = false;
  let stopWatching: (() => void) | undefined;
  try {
    stopWatching = api.graph.onGraphChanged(() => { changed = true; });
  } catch {
    return {
      valid: false,
      errors: ['Graph validation could not safely monitor the active graph for concurrent changes.'],
    };
  }

  let before: string;
  try {
    before = graphRevisionFingerprint(api);
  } catch {
    try { stopWatching(); } catch { /* best-effort listener cleanup */ }
    return {
      valid: false,
      errors: ['Graph validation could not capture the active graph revision.'],
    };
  }

  const result = await validateCurrentGraph(api);
  let after: string | undefined;
  try {
    after = graphRevisionFingerprint(api);
  } catch {
    // An unreadable post-validation graph is a revision conflict, not success.
  }
  const changedDuringValidation = changed || after === undefined || after !== before;
  try { stopWatching(); } catch { /* best-effort listener cleanup */ }
  if (changedDuringValidation) {
    return {
      valid: false,
      errors: [
        'The active graph changed while validation was in flight. Re-read the current graph and validate that revision before finishing.',
      ],
    };
  }
  return result;
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
    'You are a focused research sub-agent for CodefyUI Graph Copilot. Answer ONE sub-question ' +
    'about building a node graph, using ONLY node types that appear in the index below (exact ' +
    'names; if nothing in the index fits, say so instead of inventing a type). Answer with: ' +
    '(1) the node types needed, (2) a one-line wiring plan (which output feeds which input), ' +
    '(3) any params worth setting. CONCISE — no preamble, no code blocks.\n\n## Node index\n' + indexText;
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

/** One live run at a time, across all turns in this page session. The host's
 * interactive lane has its own cap, but failing fast here gives the model an
 * actionable message instead of a queueing surprise. */
let liveRunInFlight = false;

async function executeTool(
  toolCall: WireToolCall,
  api: CodefyUIPluginAPI,
  settings: Settings,
  callbacks: TurnCallbacks,
  roundOpsSummaries: string[],
  experimentBudget: ExperimentBudget,
  signal?: AbortSignal,
  trustedOptimizerSearch = false,
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

  if (name === 'run_graph') {
    if (liveRunInFlight) {
      return JSON.stringify({
        error: 'A live graph run is already in progress. Wait for it to finish or cancel it before starting another.',
      });
    }

    // A reload can orphan a live server-owned run this panel started. The
    // turn-scoped liveRunInFlight flag cannot see it — the pointer can.
    const previousPointer = readActiveRun(api);
    if (previousPointer) {
      if (await probeRunHistory(api, signal)) {
        let previousRow: RunRow | null = null;
        try { previousRow = await fetchRun(api, previousPointer.runId, signal); } catch { previousRow = null; }
        if (previousRow && !isTerminalRunStatus(previousRow.status)) {
          return JSON.stringify({
            error: `Run ${previousPointer.runId} is still ${previousRow.status} on the host`
              + `${previousPointer.reason ? ` (${previousPointer.reason})` : ''}. `
              + 'One run at a time: wait for it, or the user can stop it from the reattach card '
              + '(reopen or reload the panel to see it).',
          });
        }
      }
      // Terminal, unknown, or a 1.3.0 host (whose run died with its socket).
      clearActiveRun(api, previousPointer.runId);
    }

    const reason = typeof args.reason === 'string' && args.reason.trim()
      ? args.reason.trim().slice(0, 300)
      : 'Run the current graph.';
    const rawTimeout = typeof args.timeout_minutes === 'number' && Number.isFinite(args.timeout_minutes)
      ? Math.round(args.timeout_minutes)
      : DEFAULT_RUN_TIMEOUT_MINUTES;
    const timeoutMinutes = Math.min(Math.max(rawTimeout, 1), MAX_RUN_TIMEOUT_MINUTES);
    // Resolve the run-level device BEFORE approval so the card shows what
    // will actually run. Without an explicit submission the host defaults
    // the run to CPU, which device='auto' nodes then follow — a silent way
    // to turn a GPU training run into a CPU crawl.
    const requestedDevice = typeof args.device === 'string' && ['cpu', 'cuda', 'mps'].includes(args.device)
      ? args.device
      : undefined;
    const device = requestedDevice ?? await fetchDefaultDevice(api, signal);
    if (signal?.aborted) {
      return JSON.stringify({ cancelled: true, error: 'Run cancelled before execution.' });
    }

    // Refuse to launch a graph the host already reports as broken.
    const validation = await validateCurrentGraph(api);
    if (!validation.valid) {
      return JSON.stringify({
        error: 'The current graph is not runnable — fix these validation errors, then call run_graph again.',
        errors: validation.errors,
      });
    }

    if (!callbacks.onRunApproval) {
      return JSON.stringify({
        error: 'Running the live graph requires an interactive user confirmation, but this client did not provide one.',
      });
    }

    // Approval guard: what the user approves must be what runs. The
    // comparison is the SEMANTIC fingerprint (ids/types/params/wiring), so a
    // cosmetic position drift — e.g. an auto-layout animation settling while
    // the approval card is open — cannot void an approval, while any change
    // to what would execute still does.
    let approvalFingerprint: string;
    try {
      approvalFingerprint = graphSemanticFingerprint(api);
    } catch (error) {
      return JSON.stringify({ error: `Cannot capture the graph before approval: ${String(error)}` });
    }
    let approved: boolean;
    try {
      const graph = api.graph.getGraph();
      approved = await callbacks.onRunApproval({
        reason,
        nodeCount: graph.nodes.filter((node) => node.type !== 'note').length,
        edgeCount: graph.edges.length,
        nodeTypes: [...new Set(
          graph.nodes
            .map((node) => node.type)
            .filter((type): type is string => !!type && type !== 'note'),
        )],
        timeoutMinutes,
        device: device ?? 'host default',
      });
    } catch (error) {
      if (signal?.aborted) {
        return JSON.stringify({ cancelled: true, error: 'Run cancelled before execution.' });
      }
      return JSON.stringify({ error: `Run approval failed: ${String(error)}` });
    }
    if (!approved) {
      return JSON.stringify({ cancelled: true, error: 'The run was not approved by the user.' });
    }
    if (signal?.aborted) {
      return JSON.stringify({ cancelled: true, error: 'Run cancelled before execution.' });
    }
    let fingerprintChanged: boolean;
    try {
      fingerprintChanged = graphSemanticFingerprint(api) !== approvalFingerprint;
    } catch (error) {
      return JSON.stringify({ error: `Cannot re-check the graph after approval: ${String(error)}` });
    }
    if (fingerprintChanged) {
      return JSON.stringify({
        cancelled: true,
        replan: true,
        error: 'The graph changed while the run approval was open. Re-read the graph, re-validate, and propose the run again.',
      });
    }

    const serverOwnedRuns = await probeRunHistory(api, signal);
    if (signal?.aborted) {
      return JSON.stringify({ cancelled: true, error: 'Run cancelled before execution.' });
    }

    liveRunInFlight = true;
    try {
      const outcome = await runLiveGraph(api, {
        signal,
        timeoutMs: timeoutMinutes * 60_000,
        serverOwnedRuns,
        ...(device ? { device } : {}),
        onProgress: callbacks.onRunProgress,
        onRunId: (id) => writeActiveRun(api, {
          runId: id,
          reason,
          submittedAt: Date.now(),
          timeoutMinutes,
          ...(device ? { device } : {}),
        }),
      });

      if (outcome.status === 'detached') {
        return JSON.stringify({
          status: 'detached',
          run_id: outcome.runId,
          run_continues: true,
        });
      }

      // Pointer cleanup + finish signal. On a socket-level 'error' the server-
      // owned run may still be alive — keep the pointer so the reattach card can
      // pick it up, and do not announce a finish that has not happened.
      let runMayStillBeRunning = false;
      if (outcome.runId) {
        if (outcome.status === 'error' && await probeRunHistory(api, signal)) {
          let liveRow: RunRow | null = null;
          try { liveRow = await fetchRun(api, outcome.runId, signal); } catch { liveRow = null; }
          runMayStillBeRunning = liveRow !== null && !isTerminalRunStatus(liveRow.status);
        }
        if (!runMayStillBeRunning) clearActiveRun(api, outcome.runId);
      }
      if (!runMayStillBeRunning) callbacks.onRunFinished?.(outcome);

      const { durationMs, textTail, media, ...rest } = outcome;
      // Media go to the model as REFERENCES only: inline image bytes would
      // burn context for something the panel already renders.
      const mediaRefs = (media ?? []).map(({ data, ...ref }) => ({
        ...ref,
        ...(data ? { inline_preview: true } : {}),
      }));
      return JSON.stringify({
        ...rest,
        ...(device ? { device } : {}),
        duration_s: Math.round(durationMs / 1000),
        ...(textTail ? { text_tail: textTail } : {}),
        ...(mediaRefs.length ? { media: mediaRefs } : {}),
        ...(runMayStillBeRunning ? { run_may_still_be_running: true } : {}),
      });
    } catch (error) {
      return JSON.stringify({ error: `Run failed: ${String(error)}` });
    } finally {
      liveRunInFlight = false;
    }
  }

  if (name === 'list_runs' || name === 'get_run') {
    if (!(await probeRunHistory(api, signal))) {
      return JSON.stringify({
        error: 'Run history is unavailable: this CodefyUI host does not expose /api/runs (server-owned runs). Only results returned in this conversation are known.',
      });
    }
  }

  if (name === 'list_runs') {
    const rawLimit = typeof args.limit === 'number' && Number.isFinite(args.limit)
      ? Math.round(args.limit) : 10;
    try {
      const { runs, total } = await fetchRunList(api, {
        limit: Math.min(Math.max(rawLimit, 1), 20), signal,
      });
      const filtered = args.active_only === true
        ? runs.filter((run) => !isTerminalRunStatus(run.status))
        : runs;
      return JSON.stringify({
        total,
        runs: filtered.map((run) => ({
          run_id: run.runId,
          ...(run.name ? { name: run.name } : {}),
          status: run.status,
          active: run.active,
          ...(run.queuePosition !== null ? { queue_position: run.queuePosition } : {}),
          ...(run.createdAt ? { created_at: run.createdAt } : {}),
          ...(run.durationS !== null ? { duration_s: run.durationS } : {}),
          ...(run.error ? { error: run.error } : {}),
          ...(Object.keys(run.finalMetrics).length ? { final_metrics: run.finalMetrics } : {}),
        })),
      });
    } catch (error) {
      return JSON.stringify({ error: `Could not list runs: ${String(error)}` });
    }
  }

  if (name === 'get_run') {
    const runId = typeof args.run_id === 'string' ? args.run_id.trim() : '';
    if (!runId) return JSON.stringify({ error: 'get_run requires a non-empty "run_id".' });
    try {
      const run = await fetchRun(api, runId, signal);
      if (!run) return JSON.stringify({ error: `run '${runId}' not found on this host.` });
      const artifacts = await fetchRunArtifacts(api, runId, signal);
      return JSON.stringify({
        run: {
          run_id: run.runId,
          ...(run.name ? { name: run.name } : {}),
          status: run.status,
          active: run.active,
          ...(run.createdAt ? { created_at: run.createdAt } : {}),
          ...(run.startedAt ? { started_at: run.startedAt } : {}),
          ...(run.finishedAt ? { finished_at: run.finishedAt } : {}),
          ...(run.durationS !== null ? { duration_s: run.durationS } : {}),
          ...(run.error ? { error: run.error } : {}),
          final_metrics: run.finalMetrics,
        },
        artifacts: artifacts.map((artifact) => ({
          kind: artifact.kind,
          path: artifact.path,
          ...(artifact.createdAt ? { created_at: artifact.createdAt } : {}),
        })),
      });
    } catch (error) {
      return JSON.stringify({ error: `Could not fetch run '${runId}': ${String(error)}` });
    }
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

  if (name === 'optimize_graph_parameters') {
    let compiled: ReturnType<typeof compileParameterOptimizer>;
    try {
      compiled = compileParameterOptimizer(
        args,
        api.graph.getGraph(),
        api.graph.getNodeDefinitions(),
      );
    } catch (error) {
      return JSON.stringify({ error: String(error) });
    }
    const delegated = await executeTool(
      {
        id: toolCall.id,
        name: 'run_graph_experiments',
        arguments: compiled.request as unknown as Record<string, unknown>,
      },
      api,
      settings,
      callbacks,
      roundOpsSummaries,
      experimentBudget,
      signal,
      true,
    );
    try {
      const result = JSON.parse(delegated) as Record<string, unknown>;
      return JSON.stringify({ ...result, optimizer: compiled.metadata });
    } catch {
      return delegated;
    }
  }

  if (name === 'run_graph_experiments') {
    if (args.search !== undefined && !trustedOptimizerSearch) {
      return JSON.stringify({
        error: 'search metadata is internal optimizer provenance; call optimize_graph_parameters instead',
      });
    }
    let plannedRuns: number;
    try {
      plannedRuns = getExperimentExecutionCount(args as unknown as GraphExperimentRequest);
    } catch (error) {
      return JSON.stringify({ error: String(error) });
    }
    if (plannedRuns > experimentBudget.remaining) {
      return JSON.stringify({
        error: `Experiment turn budget exceeded: ${plannedRuns} requested, ${experimentBudget.remaining} of ${MAX_EXPERIMENT_RUNS} executions remain.`,
      });
    }
    if (signal?.aborted) {
      return JSON.stringify({ cancelled: true, error: 'Experiment cancelled before execution.' });
    }
    if (!callbacks.onExperimentApproval) {
      return JSON.stringify({
        error: 'Experiment execution requires an interactive user confirmation, but this client did not provide one.',
      });
    }
    const request = args as unknown as GraphExperimentRequest;
    let approvalGraphChanged = false;
    let stopApprovalGraphWatch: (() => void) | undefined;
    try {
      stopApprovalGraphWatch = api.graph.onGraphChanged(() => {
        approvalGraphChanged = true;
      });
    } catch (error) {
      return JSON.stringify({ error: `Cannot safely watch the graph during approval: ${String(error)}` });
    }
    let approvalFingerprint: string;
    try {
      approvalFingerprint = graphRevisionFingerprint(api);
    } catch (error) {
      stopApprovalGraphWatch();
      return JSON.stringify({ error: `Cannot capture the graph before approval: ${String(error)}` });
    }
    let approved: boolean;
    try {
      try {
        // Optimizer provenance is trusted only on this private delegation path.
        // It is unnecessary in the approval copy and would otherwise be
        // treated as caller-forged fail-closed content by the history redactor.
        const approvalToolCall = trustedOptimizerSearch
          ? {
            ...toolCall,
            arguments: Object.fromEntries(
              Object.entries(toolCall.arguments).filter(([key]) => key !== 'search'),
            ),
          }
          : toolCall;
        const approvalRequest = redactToolCallForHistory(approvalToolCall, api).arguments as unknown as GraphExperimentRequest;
        approved = await callbacks.onExperimentApproval({
          hypothesis: approvalRequest.hypothesis,
          variantCount: request.variants.length,
          repetitions: request.repetitions ?? 1,
          executionCount: plannedRuns,
          concurrency: request.concurrency ?? 1,
          runTimeoutMinutes: Math.round(experimentRunTimeoutMs(request) / 60_000),
          applyBest: request.apply_best ?? false,
          variants: approvalRequest.variants.map((variant) => ({
            label: variant.label,
            operations: variant.operations.map(approvalOperationSummary),
          })),
          nodeTypes: [...new Set([
            ...api.graph.getGraph().nodes
              .map((node) => node.type)
              .filter((type): type is string => !!type && type !== 'note'),
            ...request.variants.flatMap((variant) => variant.operations
              .filter((operation): operation is Extract<GraphOp, { op: 'add_node' }> => operation.op === 'add_node')
              .map((operation) => operation.node_type)),
          ])],
        });
      } catch (error) {
        if (signal?.aborted) {
          return JSON.stringify({ cancelled: true, error: 'Experiment cancelled before execution.' });
        }
        return JSON.stringify({ error: `Experiment approval failed: ${String(error)}` });
      }
    } finally {
      stopApprovalGraphWatch();
    }
    if (!approved) {
      return JSON.stringify({ cancelled: true, error: 'Experiment execution was not approved by the user.' });
    }
    if (signal?.aborted) {
      return JSON.stringify({ cancelled: true, error: 'Experiment cancelled before execution.' });
    }
    let approvalFingerprintChanged: boolean;
    try {
      approvalFingerprintChanged = graphRevisionFingerprint(api) !== approvalFingerprint;
    } catch (error) {
      return JSON.stringify({ error: `Cannot re-check the graph after approval: ${String(error)}` });
    }
    if (approvalGraphChanged || approvalFingerprintChanged) {
      return JSON.stringify({
        cancelled: true,
        replan: true,
        error: 'The active graph changed while execution approval was open. Re-read the graph and propose the study again.',
      });
    }
    // Reserve up front: a transport failure may happen after some graph runs
    // have already produced side effects, so a failed study does not refund.
    experimentBudget.remaining -= plannedRuns;
    try {
      const result = await runGraphExperiments(
        api,
        args as unknown as GraphExperimentRequest,
        signal,
      );
      if (result.applyResult && result.appliedOperations) {
        const summary = `promote experiment winner: ${buildOpsSummary(
          result.appliedOperations,
          result.applyResult.results,
        )}`;
        roundOpsSummaries.push(summary);
        callbacks.onOpsApplied(summary, result.applyResult);
      }
      const { applyResult: _applyResult, appliedOperations: _appliedOperations, ...publicResult } = result;
      return JSON.stringify(publicResult);
    } catch (error) {
      if (signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
        return JSON.stringify({ cancelled: true, error: 'Experiment cancelled.' });
      }
      return JSON.stringify({ error: String(error) });
    }
  }

  if (name === 'get_current_graph') {
    return graphSnapshot(api.graph.getGraph(), api.graph.getNodeDefinitions());
  }

  return JSON.stringify({ error: `Unknown tool: ${name}` });
}

// ---------------------------------------------------------------------------
// Main runTurn
// ---------------------------------------------------------------------------

export async function runTurn(opts: RunTurnOpts): Promise<void> {
  const { api, settings, history, userText, attachments, callbacks, signal } = opts;

  // Accumulated ChatTurns across all rounds (to commit at the end)
  const allTurns: ChatTurn[] = [];

  // Wire messages start with system + windowed history + user
  const wireMessages: WireMessage[] = buildInitialMessages(
    api, history, userText, attachments, settings.provider,
  );

  let roundsWithToolUse = 0;
  let validationNudges = 0;
  let graphEditAttempted = false;
  const rawToolCallsSeenThisTurn: WireToolCall[] = [];
  const experimentBudget: ExperimentBudget = { remaining: MAX_EXPERIMENT_RUNS };

  /** Append a finalized turn and surface it to the UI immediately. */
  const appendTurn = (turn: ChatTurn): void => {
    allTurns.push(turn);
    callbacks.onTurnAppended?.(turn);
  };

  /** Keep partially-streamed text visible (stop button / dropped stream). */
  const commitPartialText = (text: string): void => {
    const content = redactAssistantTextForHistory(text, rawToolCallsSeenThisTurn, api);
    if (content.trim()) appendTurn({ role: 'assistant', content });
  };

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
        commitPartialText(accumulatedText);
        callbacks.onTurnsCommitted(allTurns);
        callbacks.onError(streamError);
        callbacks.onFinished();
        return;
      }

      if (!doneEvent) {
        // Stream ended without a done event (user stop or dropped connection)
        commitPartialText(accumulatedText);
        callbacks.onTurnsCommitted(allTurns);
        callbacks.onFinished();
        return;
      }

      const done = doneEvent as DoneEvent;
      const toolCalls = done.message.tool_calls ?? [];
      // Prefer non-empty: streamed text is the source of truth when content is ''.
      const rawContent = done.message.content || accumulatedText;
      const content = redactAssistantTextForHistory(
        rawContent,
        [...rawToolCallsSeenThisTurn, ...toolCalls],
        api,
      );

      if (done.stop_reason === 'end' || toolCalls.length === 0) {
        // Runnability gate: before accepting "done", make sure the graph
        // actually validates. If not, feed the errors back (up to
        // MAX_VALIDATION_NUDGES times) so the model fixes them. The nudge is
        // context-only (not persisted to history) to keep the transcript clean.
        const g = api.graph.getGraph();
        if (graphEditAttempted && Array.isArray(g.nodes) && g.nodes.length > 0) {
          const v = await validateCurrentGraphAtStableRevision(api);
          if (!v.valid) {
            if (validationNudges >= MAX_VALIDATION_NUDGES) {
              // Never turn an unverified success claim into the final answer
              // merely because the bounded self-correction budget is spent.
              if (content.trim()) appendTurn({ role: 'assistant', content });
              appendTurn({
                role: 'assistant',
                content:
                  `I could not complete a runnable graph after ${MAX_VALIDATION_NUDGES} correction attempts. ` +
                  'The current graph still fails CodefyUI validation:\n' +
                  v.errors.map((error) => `- ${error}`).join('\n'),
              });
              callbacks.onTurnsCommitted(allTurns);
              callbacks.onFinished();
              return;
            }
            validationNudges++;
            // The assistant's text stays in history (the user watched it
            // stream); only the corrective user nudge is context-only.
            if (content.trim()) appendTurn({ role: 'assistant', content });
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
        appendTurn({ role: 'assistant', content });
        callbacks.onTurnsCommitted(allTurns);
        callbacks.onFinished();
        return;
      }

      // stop_reason === 'tool_use'
      roundsWithToolUse++;

      // Surface this round's assistant turn (text + pending tool calls)
      // BEFORE executing, so the UI can show the stages as they run.
      // Persist/render only a schema-redacted copy. The raw calls remain below
      // for execution and for the provider's same-turn tool protocol.
      const historyToolCalls = redactToolCallsForHistory(toolCalls, api);
      rawToolCallsSeenThisTurn.push(...toolCalls);
      const assistantTurn: ChatTurn = {
        role: 'assistant',
        content,
        tool_calls: historyToolCalls,
      };
      const assistantIdx = allTurns.length;
      appendTurn(assistantTurn);

      // Execute each tool call, surfacing results as they land
      const roundOpsSummaries: string[] = [];
      const toolResultWireMsgs: WireMessage[] = [];

      for (const toolCall of toolCalls) {
        const summaryCountBefore = roundOpsSummaries.length;
        const toolStartedAt = Date.now();
        const rawResultContent = await executeTool(
          toolCall,
          api,
          settings,
          callbacks,
          roundOpsSummaries,
          experimentBudget,
          signal,
        );
        if (roundOpsSummaries.length > summaryCountBefore) graphEditAttempted = true;
        const resultContent = redactToolResultForContext(toolCall, rawResultContent, api);
        appendTurn({
          role: 'tool',
          content: resultContent,
          tool_call_id: toolCall.id,
          durationMs: Date.now() - toolStartedAt,
        });
        toolResultWireMsgs.push({
          role: 'tool',
          content: resultContent,
          tool_call_id: toolCall.id,
        });
        if (signal?.aborted) {
          callbacks.onTurnsCommitted(allTurns);
          callbacks.onFinished();
          return;
        }
      }

      // Enrich the committed assistant turn with the ops summary (a copy, so
      // the object already handed to the UI is never mutated).
      if (roundOpsSummaries.length > 0) {
        allTurns[assistantIdx] = { ...assistantTurn, opsSummary: roundOpsSummaries.join('; ') };
      }

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
        appendTurn({
          role: 'assistant',
          content: `(stopped after ${MAX_TOOL_ROUNDS} tool rounds)`,
        });
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
