/** A bounded, journal-first graph agent. Receipts and terminal results are
 * authoritative; UI observers never control execution or finalization. */
import { streamChat, composeUserContent } from '../llm/client';
import type { ChatBody, WireMessage, WireToolCall, DoneEvent, Provider } from '../llm/client';
import { buildSystemPrompt, graphSnapshot, compactCatalog, compactIndex } from './prompt';
import { historyWindow, historicalCallIds, isToolCall } from './history';
import {
  MAX_GRAPH_OPS, awaitWithSignal, buildOpsSummary, comparisonSnapshot,
  guardOperations, isAbortError, isRecord, rememberAffectedNodes, repairScopeError, reviewReceipt, throwIfAborted,
} from './toolGuards';
import type { Settings } from '../state/settings';
import { activeReasoningEffort } from '../state/settings';
import type { ChatTurn } from '../state/conversations';
import type { Attachment } from '../state/attachments';
import type { CodefyUIPluginAPI, ApplyResult, GraphOp, NodeDefinition, SerializedGraph } from '../types/codefyui';
import {
  redactAssistantTextForHistory, redactToolCallForHistory, redactToolCallsForHistory, redactToolResultForContext,
} from './historyRedaction';
import { executeRuntimeTool, isRuntimeTool, READ_ONLY_TOOLS, RuntimeToolExit } from './runtimeTools';
export type { ExperimentApprovalRequest, RunApprovalRequest } from './runtimeTools';
export { graphSemanticFingerprint } from './runtimeTools';
import type { ExperimentApprovalRequest, RunApprovalRequest } from './runtimeTools';
import type { RunGraphOutcome, RunProgressUpdate } from './runGraph';
import { MAX_EXPERIMENT_RUNS } from './experiments';
import type {
  AgentMode, ClearGraphRequest, RunPhase, RunStatus, RunSummary, ToolOutcome, TurnResult, ValidationReport,
} from './types';

export const MAX_TOOL_ROUNDS = 16;
export const MAX_VALIDATION_NUDGES = 2;
const MAX_TOOLS_PER_ROUND = 32;

export const TOOLS = [
  {
    name: 'apply_graph_operations',
    description:
      `Apply up to ${MAX_GRAPH_OPS} graph edits as ONE undo step. Read indexed receipts and refs; unknown effects must not be replayed. Each entry uses these EXACT fields:
- {"op":"add_node","node_type":"<exact catalog name>","ref":"<alias>","params":{...},"position":{"x":<num>,"y":<num>}} — ref/params/position optional. A ref is usable as source/target/node_id ONLY in this SAME batch. Later calls must use real node IDs from receipts/refs or get_current_graph.
- {"op":"connect","source":"<node id or ref>","source_handle":"<output port>","target":"<node id or ref>","target_handle":"<input port>"} — use exact schema ports; control-flow trigger edges use source_handle "trigger".
- {"op":"set_params","node_id":"<node id or ref>","params":{...}}
- {"op":"remove_node","node_id":"<node id or ref>"}
- {"op":"remove_edge","source":"<node id or ref>","target":"<node id or ref>","source_handle":"<optional>","target_handle":"<optional>"}
- {"op":"clear_graph"} — singleton batch only, requires fresh user confirmation. Never bypass a refusal with node removal.
- {"op":"auto_layout"} — auto-positions nodes after structural changes.
Malformed batches are rejected in full before host dispatch. The host validates operation semantics; known failing operations are skipped and reported by index.`,
    input_schema: {
      type: 'object', properties: { operations: { type: 'array', minItems: 1, maxItems: MAX_GRAPH_OPS, items: { type: 'object' } } }, required: ['operations'],
    },
  },
  {
    name: 'get_current_graph',
    description: 'Read the current serialized graph; the user may have edited it manually.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'get_node_schemas',
    description: 'Get exact ports, required/optional inputs, and params for catalog node types. Always look up schemas before wiring; the catalog index and research candidates are not port evidence.',
    input_schema: { type: 'object', properties: { node_types: { type: 'array', items: { type: 'string' } } }, required: ['node_types'] },
  },
  {
    name: 'validate_graph',
    description: 'Read-only structural validation: checks unknown types, missing required inputs, and out-of-range params. Returns {valid, errors, status}; status valid/invalid/unavailable/stale. Validation does not execute the graph or prove runtime success. Never repair unavailable or stale results.',
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
    description: 'For complex requests, research up to FOUR independent questions in parallel. Index-only subagents suggest candidate catalog node types, not verified ports or wiring. Get exact schemas before any connections.',
    input_schema: { type: 'object', properties: { questions: { type: 'array', items: { type: 'string' }, maxItems: 4 } }, required: ['questions'] },
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

export interface TurnCallbacks {
  onTextDelta(t: string): void;
  /** Live turn notifications may expose a pending assistant group. Only the
   * once-only commit is persisted, always with one terminal result per call. */
  onTurnAppended?(turn: ChatTurn): void;
  onOpsApplied(summary: string, result: ApplyResult): void;
  onExperimentApproval?(request: ExperimentApprovalRequest, signal?: AbortSignal): Promise<boolean>;
  onRunApproval?(request: RunApprovalRequest, signal?: AbortSignal): Promise<boolean>;
  onRunProgress?(update: RunProgressUpdate): void;
  onRunFinished?(outcome: RunGraphOutcome): void;
  onRunStarted?(hostRunId: string): void;
  onTurnsCommitted(turns: ChatTurn[]): void;
  onError(message: string): void;
  onFinished(summary?: RunSummary): void;
  onPhase?(phase: RunPhase): void;
}

export interface RunTurnOpts {
  api: CodefyUIPluginAPI;
  settings: Settings;
  history: ChatTurn[];
  userText: string;
  attachments?: Attachment[];
  callbacks: TurnCallbacks;
  signal?: AbortSignal;
  runId?: string;
  mode?: AgentMode;
  confirmClearGraph?: (request: ClearGraphRequest, signal?: AbortSignal) => Promise<boolean>;
}

/** Swallow observer errors, including accidental async callback rejections.
 * No observer can lose an already captured receipt or strand a run. */
function observe(fn: () => unknown): void {
  try { void Promise.resolve(fn()).catch(() => {}); } catch { /* observers are not execution */ }
}
function copy<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }

function turnToWire(turn: ChatTurn, provider: Provider): WireMessage {
  const message: WireMessage = {
    role: turn.role,
    content: turn.role === 'user' && turn.attachments?.length
      ? composeUserContent(turn.content, turn.attachments, provider) : turn.content,
  };
  if (turn.tool_calls?.length) message.tool_calls = copy(turn.tool_calls);
  if (turn.tool_call_id) message.tool_call_id = turn.tool_call_id;
  return message;
}

function buildInitialMessages(opts: RunTurnOpts, mode: AgentMode): WireMessage[] {
  throwIfAborted(opts.signal);
  const definitions = opts.api.graph.getNodeDefinitions();
  throwIfAborted(opts.signal);
  const graph = opts.api.graph.getGraph();
  throwIfAborted(opts.signal);
  const historicalCalls = opts.history.flatMap((turn) => turn.tool_calls ?? []).filter(isToolCall);
  const callsById = new Map(historicalCalls.map((call) => [call.id, call]));
  const safeHistory = historyWindow(opts.history).map((turn) => {
    if (turn.role === 'user') return turnToWire(turn, opts.settings.provider);
    if (turn.role === 'tool') return turnToWire({ ...turn, content: redactToolResultForContext(
      callsById.get(turn.tool_call_id ?? '') ?? { id: 'legacy', name: 'legacy_tool', arguments: {} }, turn.content, opts.api,
    ) }, opts.settings.provider);
    return turnToWire({ ...turn,
      content: redactAssistantTextForHistory(turn.content, historicalCalls, opts.api),
      ...(turn.tool_calls ? { tool_calls: redactToolCallsForHistory(turn.tool_calls, opts.api) } : {}),
    }, opts.settings.provider);
  });
  return [
    { role: 'system', content: buildSystemPrompt(definitions, graph, mode) },
    ...safeHistory,
    { role: 'user', content: composeUserContent(opts.userText, opts.attachments, opts.settings.provider) },
  ];
}

function buildChatBody(settings: Settings, messages: WireMessage[], tools = TOOLS, maxTokens = 8192): ChatBody {
  const provider = settings.provider;
  const body: ChatBody = {
    provider, model: settings.models[provider] ?? '', messages: copy(messages), tools, max_tokens: maxTokens,
  };
  if (provider !== 'openai-codex' && settings.apiKeys[provider]) body.api_key = settings.apiKeys[provider];
  if (provider === 'custom' && settings.customBaseUrl) body.base_url = settings.customBaseUrl;
  const effort = activeReasoningEffort(settings);
  if (effort) body.reasoning_effort = effort;
  return body;
}

export type CurrentGraphValidation = ValidationReport & { valid: boolean };

/**
 * Read-only POST /api/graph/validate. Optional signal is checked before reads,
 * dispatch, and after every await; cancellation rejects with AbortError. A full,
 * ephemeral before/after snapshot guards against validating an outdated graph.
 * HTTP/transport/malformed responses mean unavailable, never graph invalidity.
 */
export async function validateCurrentGraph(api: CodefyUIPluginAPI, signal?: AbortSignal): Promise<CurrentGraphValidation> {
  throwIfAborted(signal);
  let changed = false;
  let unsubscribe: (() => void) | undefined;
  try { unsubscribe = api.graph.onGraphChanged(() => { changed = true; }); }
  catch { return { valid: false, status: 'unavailable', errors: ['Structural validation could not safely monitor the active graph.'] }; }
  try {
    throwIfAborted(signal);
    const graph = api.graph.getGraph();
    const before = comparisonSnapshot(graph);
    const definitions = api.graph.getNodeDefinitions();
    const nodes = graph.nodes.filter((node) => node.type !== 'note');
    const ids = new Set(nodes.map((node) => node.id));
    const edges = graph.edges.filter((edge) => typeof edge.source === 'string' && typeof edge.target === 'string' && ids.has(edge.source) && ids.has(edge.target));
    const body = JSON.stringify({ nodes, edges, presets: graph.presets ?? [] });
    let report: CurrentGraphValidation;
    try {
      throwIfAborted(signal);
      const response = await awaitWithSignal(api.http.fetch('/api/graph/validate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal,
      }), signal);
      throwIfAborted(signal);
      if (!response.ok) {
        report = { valid: false, status: 'unavailable', errors: [`validate request failed: HTTP ${response.status}`] };
      } else {
        const data: unknown = await awaitWithSignal(response.json(), signal);
        throwIfAborted(signal);
        if (!isRecord(data) || typeof data.valid !== 'boolean' || !Array.isArray(data.errors) ||
          !data.errors.every((error) => typeof error === 'string') || (data.valid && data.errors.length > 0)) {
          report = { valid: false, status: 'unavailable', errors: ['Malformed validation response.'] };
        } else {
          report = { valid: data.valid, status: data.valid ? 'valid' : 'invalid', errors: data.errors.length || data.valid ? data.errors as string[] : ['Graph validation failed without diagnostic details.'] };
        }
      }
    } catch (error) {
      throwIfAborted(signal);
      if (isAbortError(error)) throw error;
      report = { valid: false, status: 'unavailable', errors: ['The structural validation service is unavailable.'] };
    }
    throwIfAborted(signal);
    let stable = false;
    try { stable = !changed && comparisonSnapshot(api.graph.getGraph()) === before; } catch { /* unreadable means stale */ }
    if (!stable) report = { valid: false, status: 'stale', errors: ['The graph changed while validation was in flight.'] };
    const safe = redactToolResultForContext({ id: 'validation-gate', name: 'validate_graph', arguments: {} }, JSON.stringify(report), api, [{ graph, definitions }]);
    throwIfAborted(signal);
    return JSON.parse(safe) as CurrentGraphValidation;
  } finally {
    try { unsubscribe?.(); } catch { /* listener cleanup is best effort */ }
  }
}

interface ResearchAnswer { text: string; failed: boolean }
async function researchSubagent(
  api: CodefyUIPluginAPI, settings: Settings, question: string, indexText: string, signal?: AbortSignal,
): Promise<ResearchAnswer> {
  const messages: WireMessage[] = [
    { role: 'system', content: 'You are an index-only CodefyUI research assistant. Suggest CONCISE candidate node types using exact names present in this index and a one-line rationale. You have NO schemas: do not invent ports, parameter names, connections, or a wiring plan. Say when the index has no candidate. get_node_schemas is required before wiring. No tools, preamble, or code.\n\n## Node index\n' + indexText },
    { role: 'user', content: question },
  ];
  let text = '';
  let terminal = false;
  let active = true;
  let failed = false;
  try {
    throwIfAborted(signal);
    await awaitWithSignal(streamChat(api, buildChatBody(settings, messages, [], 1024), {
      onText(delta) { if (active && !signal?.aborted && !terminal) text += delta; },
      onDone(event) { if (active && !signal?.aborted && !terminal) { terminal = true; if (!text) text = event.message.content; } },
      onError() { if (active && !signal?.aborted && !terminal) { terminal = true; failed = true; } },
    }, signal), signal);
    throwIfAborted(signal);
    failed ||= !terminal;
  } catch (error) {
    throwIfAborted(signal);
    if (isAbortError(error)) throw error;
    failed = true;
  } finally {
    active = false;
  }
  return { text: failed ? '(research unavailable)' : text.trim() || '(no candidate)', failed };
}

class RunExit extends Error {
  constructor(public status: RunStatus, public reason: string, public message: string, public reportError?: string) { super(message); }
}
interface PendingTool { index: number; published: boolean; terminal: boolean }
interface LiveRound { text: string; done: DoneEvent | null; error: string | null; retained: boolean }

/** Bounded, redacted local metadata. Full raw receipts remain only in tool turns. */
function localValidation(report: ValidationReport): ValidationReport {
  return {
    status: report.status,
    // Server strings may embed params, serialized graph content or credentials.
    // Keep details in the existing tool receipt, not duplicate them in metadata.
    errors: report.errors.slice(0, 20).map((_, index) => `Structural validation issue ${index + 1}; review the validation result.`),
  };
}

export async function runTurn(opts: RunTurnOpts): Promise<TurnResult> {
  const { api, settings, callbacks, signal } = opts;
  const mode = opts.mode ?? 'edit';
  const summary: RunSummary = {
    id: opts.runId ?? `run-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    mode, status: 'completed', mutation: 'none', mutationAttempted: false, sideEffectAttempted: false,
    appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] },
  };
  const turns: ChatTurn[] = [];
  let finalized: TurnResult | undefined;
  let pending: PendingTool[] = [];
  let liveRound: LiveRound | undefined;
  let lastMutationSnapshot: string | undefined;
  let repairSnapshot: string | undefined;
  let roundsWithTools = 0;
  let validationNudges = 0;
  // Conservative: a later unrelated success does not prove a failed request
  // was corrected. Preserve observed failure obligations for this run.
  const issues = new Set<string>();
  const affectedNodes = new Set<string>();
  const knownIds = new Set<string>();
  const rawCalls: WireToolCall[] = [];
  const rawReceipts = new Map<number, string>();
  const toolCallsBySlot = new Map<number, WireToolCall>();
  const secretContexts: Array<{ graph: SerializedGraph; definitions: NodeDefinition[] }> = [];
  const experimentBudget = { remaining: MAX_EXPERIMENT_RUNS };
  const safeText = (text: string): string => {
    try {
      const redacted = redactAssistantTextForHistory(text, rawCalls, api);
      return redactToolResultForContext({ id: 'assistant', name: 'assistant', arguments: {} }, redacted, api, secretContexts);
    } catch { return '[Content unavailable for safe display]'; }
  };

  const phase = (value: RunPhase) => observe(() => callbacks.onPhase?.(value));
  const publish = (turn: ChatTurn) => observe(() => callbacks.onTurnAppended?.(copy(turn)));
  const append = (turn: ChatTurn) => { const stored = { ...turn, ...(turn.role === 'assistant' ? { content: safeText(turn.content) } : {}), runId: summary.id }; turns.push(stored); publish(stored); };
  const partial = () => {
    if (liveRound && !liveRound.retained && liveRound.text.trim()) {
      liveRound.retained = true;
      append({ role: 'assistant', content: liveRound.text });
    }
  };
  const recordTool = (slot: PendingTool, content: string, outcome: ToolOutcome, terminal = true) => {
    // Exact execution-local receipt captured before redaction or observers.
    rawReceipts.set(slot.index, content);
    const call = toolCallsBySlot.get(slot.index) ?? { id: 'terminal', name: 'terminal', arguments: {} };
    let safe = JSON.stringify({ outcome, error: 'Tool receipt unavailable for safe display.' });
    try { safe = redactToolResultForContext(call, content, api, secretContexts); } catch { /* exact receipt remains execution-local */ }
    turns[slot.index] = { ...turns[slot.index], content: safe, toolOutcome: outcome };
    slot.terminal = terminal;
  };
  const publishTool = (slot: PendingTool) => {
    if (!slot.published) { slot.published = true; publish(turns[slot.index]); }
  };
  const startGroup = (event: DoneEvent, content: string): number => {
    const assistantIndex = turns.length;
    rawCalls.push(...copy(event.message.tool_calls));
    try { secretContexts.push({ graph: copy(api.graph.getGraph()), definitions: copy(api.graph.getNodeDefinitions()) }); } catch { /* redactors fail closed on missing schemas */ }
    turns.push({ role: 'assistant', content: safeText(content), tool_calls: redactToolCallsForHistory(event.message.tool_calls, api), runId: summary.id });
    pending = event.message.tool_calls.map((call) => {
      const index = turns.length;
      toolCallsBySlot.set(index, call);
      turns.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify({ outcome: 'not_executed', error: 'This tool was not executed.' }), toolOutcome: 'not_executed', runId: summary.id });
      return { index, published: false, terminal: false };
    });
    publish(turns[assistantIndex]);
    return assistantIndex;
  };
  const stale = (reason = 'validation_stale') => {
    summary.validation = { status: 'stale', errors: ['The graph changed outside this run; no automatic repair was applied.'] };
    throw new RunExit('incomplete', reason, 'The graph changed. Continue from its current state instead of replaying this run.');
  };
  const currentSnapshot = () => { throwIfAborted(signal); return comparisonSnapshot(api.graph.getGraph()); };
  const assertRepairSnapshot = () => {
    if (repairSnapshot !== undefined && currentSnapshot() !== repairSnapshot) stale();
  };

  const finalize = (): TurnResult => {
    if (finalized) return finalized;
    for (const slot of pending) {
      if (!slot.terminal) {
        const outcome = summary.status === 'cancelled' ? 'cancelled' : 'not_executed';
        recordTool(slot, JSON.stringify({ outcome, error: outcome === 'cancelled' ? 'The run was stopped before this tool executed.' : 'The run ended before this tool executed.' }), outcome);
      }
      publishTool(slot);
    }
    const local = { ...summary, validation: localValidation(summary.validation) };
    let lastAssistant = -1;
    turns.forEach((turn, index) => { if (turn.role === 'assistant') lastAssistant = index; });
    if (lastAssistant < 0) {
      turns.push({ role: 'assistant', content: '', runId: summary.id, runSummary: copy(local) });
      publish(turns[0]);
    } else {
      turns[lastAssistant] = { ...turns[lastAssistant], runSummary: copy(local) };
    }
    finalized = { ...local, turns };
    observe(() => callbacks.onTurnsCommitted(copy(turns)));
    observe(() => callbacks.onFinished(copy(local)));
    return finalized;
  };

  const validateForFinish = async (): Promise<CurrentGraphValidation> => {
    throwIfAborted(signal);
    phase('validating');
    throwIfAborted(signal);
    if (lastMutationSnapshot !== undefined && currentSnapshot() !== lastMutationSnapshot) stale();
    const report = await validateCurrentGraph(api, signal);
    throwIfAborted(signal);
    summary.validation = { status: report.status, errors: report.errors };
    if (report.status === 'stale' || (lastMutationSnapshot !== undefined && currentSnapshot() !== lastMutationSnapshot)) stale();
    return report;
  };

  const executeTool = async (call: WireToolCall, slot: PendingTool, roundOps: string[]): Promise<void> => {
    throwIfAborted(signal);
    assertRepairSnapshot();
    const args = call.arguments;
    const errorResult = (message: string) => {
      issues.add(call.name);
      recordTool(slot, JSON.stringify({ error: message }), 'error');
    };
    if (mode === 'ask' && !READ_ONLY_TOOLS.has(call.name)) {
      errorResult(`Ask mode is read-only; ${call.name} is not authorized.`);
      throw new RunExit('incomplete', 'ask_mutation_denied', 'A side-effect tool was refused in Ask mode. No graph changes or execution were dispatched.');
    }
    const checkRepairScope = (operations: GraphOp[]) => {
      throwIfAborted(signal);
      assertRepairSnapshot();
      if (repairSnapshot === undefined) return;
      const graph = api.graph.getGraph();
      const existing = new Set(graph.nodes.map((node) => node.id));
      const violation = repairScopeError(operations, affectedNodes, existing);
      if (violation) {
        errorResult(violation);
        throw new RunExit('incomplete', 'repair_scope', 'Validation repair would exceed the scope of current-run edits. No broader changes were applied.');
      }
    };
    let promotionReceipt: unknown;
    let promotionPriorMutation: RunSummary['mutation'] | undefined;
    const recordRuntime = (content: string, outcome: ToolOutcome, terminal = true) => {
      if (promotionReceipt !== undefined) {
        try { content = JSON.stringify({ ...JSON.parse(content), promotion: promotionReceipt }); }
        catch { content = JSON.stringify({ result: content, promotion: promotionReceipt }); }
      }
      recordTool(slot, content, outcome, terminal);
    };
    const acceptPromotion = (operations: GraphOp[], raw: unknown) => {
      // Synchronous hook invoked by the study engine immediately after the write.
      summary.mutationAttempted = true;
      const priorMutation = promotionPriorMutation ?? summary.mutation;
      summary.mutation = 'unknown';
      let encoded: string;
      try { encoded = JSON.stringify(raw); if (!encoded) throw new Error('missing receipt'); }
      catch {
        recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'Winner promotion returned an unreadable receipt.' }), 'unknown');
        throw new RunExit('incomplete', 'receipt_unknown', 'Winner promotion may have changed the graph, but its receipt is unreadable. Do not replay it.');
      }
      promotionReceipt = JSON.parse(encoded);
      recordRuntime(JSON.stringify({ promotion: promotionReceipt }), 'unknown');
      const review = reviewReceipt(promotionReceipt, operations.length);
      summary.appliedOps += review.applied;
      summary.failedOps += review.failed;
      summary.mutation = review.unknown ? 'unknown' : review.applied ? 'applied' : priorMutation;
      const text = `promote experiment winner: ${buildOpsSummary(operations, review)}`;
      roundOps.push(text);
      if (review.failed) issues.add(call.name);
      recordTool(slot, rawReceipts.get(slot.index)!, review.unknown ? 'unknown' : review.failed ? 'error' : 'completed');
      if (review.applied) {
        rememberAffectedNodes(operations, review, affectedNodes);
        summary.validation = { status: 'not_run', errors: [] };
        if (!signal?.aborted) {
          lastMutationSnapshot = currentSnapshot();
          if (repairSnapshot !== undefined) repairSnapshot = lastMutationSnapshot;
        }
      }
      if (review.result) observe(() => callbacks.onOpsApplied(text, copy(review.result!)));
      if (review.unknown) throw new RunExit('incomplete', 'receipt_unknown', 'Winner promotion has missing or invalid indexed receipts. Effects may be unknown; do not replay it.');
    };
    if (isRuntimeTool(call.name)) {
      let promotionCaptured = false;
      const result = await executeRuntimeTool(call, {
        api, signal, callbacks, budget: experimentBudget, phase,
        validate: () => validateCurrentGraph(api, signal),
        dispatched: () => { summary.sideEffectAttempted = true; recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'The approved runner was dispatched; external effects are not yet known.' }), 'unknown', false); },
        hostRunStarted: (id) => {
          if (summary.hostRunId === id) return;
          summary.hostRunId = id;
          observe(() => callbacks.onRunStarted?.(id));
        },
        record: (content, outcome, terminal) => recordRuntime(content, outcome, terminal),
        promotionHooks: {
          beforePromotion: (operations) => {
            checkRepairScope(operations);
            throwIfAborted(signal);
            promotionPriorMutation = summary.mutation;
            summary.mutationAttempted = true;
            summary.mutation = 'unknown';
            recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'Winner promotion was dispatched; its canvas receipt is not yet known.' }), 'unknown', false);
          },
          onPromotionReceipt: (operations, receipt) => { promotionCaptured = true; acceptPromotion(operations, receipt); },
          onPromotionError: () => {
            recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'Winner promotion threw after dispatch; canvas effects are unknown.' }), 'unknown');
            throw new RunExit('failed', 'mutation_unknown', 'Winner promotion threw. The canvas may have changed; do not replay it.');
          },
          receiptCaptured: () => promotionCaptured,
        },
      });
      recordRuntime(result.content, result.outcome);
      if (result.outcome !== 'completed') issues.add(call.name);
      return;
    }
    if (call.name === 'apply_graph_operations') {
      const guarded = guardOperations(args.operations);
      if (guarded.error !== undefined) { errorResult(guarded.error); return; }
      const operations = guarded.operations;
      if (repairSnapshot !== undefined) {
        const graph = api.graph.getGraph();
        throwIfAborted(signal);
        const existing = new Set(graph.nodes.map((node: unknown) => isRecord(node) && typeof node.id === 'string' ? node.id : '').filter(Boolean));
        const violation = repairScopeError(operations, affectedNodes, existing);
        if (violation) {
          errorResult(violation);
          throw new RunExit('incomplete', 'repair_scope', 'Validation repair would exceed the scope of current-run edits. No broader changes were applied.');
        }
      }
      let approvedClearSnapshot: string | undefined;
      if (operations[0].op === 'clear_graph') {
        const before = currentSnapshot();
        const graph = api.graph.getGraph();
        if (!opts.confirmClearGraph) {
          recordTool(slot, JSON.stringify({ outcome: 'not_executed', error: 'clear_graph requires explicit user confirmation.' }), 'not_executed');
          throw new RunExit('incomplete', 'confirmation_unavailable', 'Clearing was not confirmed. The graph was not cleared.');
        }
        phase('awaiting_confirmation');
        throwIfAborted(signal);
        const approved = await awaitWithSignal(opts.confirmClearGraph({
          runId: summary.id, toolCallId: call.id, nodeCount: graph.nodes.length, edgeCount: graph.edges.length,
        }, signal), signal);
        throwIfAborted(signal);
        if (approved !== true) {
          recordTool(slot, JSON.stringify({ outcome: 'cancelled', error: 'The user declined clearing the graph. The run ended; do not bypass this decision.' }), 'cancelled');
          throw new RunExit('cancelled', 'confirmation_declined', 'Clearing was declined. No clear operation was dispatched.');
        }
        if (currentSnapshot() !== before) stale('confirmation_stale');
        approvedClearSnapshot = before;
        phase('tools');
      }
      // No await or observer between this final snapshot/signal guard and write.
      throwIfAborted(signal);
      assertRepairSnapshot();
      if (approvedClearSnapshot !== undefined && currentSnapshot() !== approvedClearSnapshot) stale('confirmation_stale');
      throwIfAborted(signal);
      summary.mutationAttempted = true;
      const priorMutation = summary.mutation;
      summary.mutation = 'unknown';
      recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'The mutation was dispatched; its receipt is not yet known.' }), 'unknown', false);
      let raw: unknown;
      try { raw = api.graph.applyOperations(operations); }
      catch (error) {
        recordTool(slot, JSON.stringify({ outcome: 'unknown', error: `applyOperations threw: ${String(error)}` }), 'unknown');
        throw new RunExit('failed', 'mutation_unknown', 'The host mutation threw. Changes may have occurred; do not retry this request.', 'The host mutation failed after dispatch; its effects are unknown.');
      }
      // Capture exact receipt in the journal BEFORE interpretation or any observer.
      let receipt: unknown;
      try {
        const content = JSON.stringify(raw);
        if (content === undefined) throw new Error('missing receipt');
        recordTool(slot, content, 'unknown');
        receipt = JSON.parse(content);
      } catch {
        recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'The host mutation receipt could not be serialized.' }), 'unknown');
        throw new RunExit('incomplete', 'receipt_unknown', 'The mutation receipt is unreadable; changes may have occurred. Do not retry.');
      }
      const review = reviewReceipt(receipt, operations.length);
      summary.appliedOps += review.applied;
      summary.failedOps += review.failed;
      summary.mutation = review.unknown ? 'unknown' : review.applied > 0 ? 'applied' : priorMutation;
      const opSummary = buildOpsSummary(operations, review);
      roundOps.push(opSummary);
      if (review.unknown) {
        if (review.result) observe(() => callbacks.onOpsApplied(opSummary, copy(review.result!)));
        throw new RunExit('incomplete', 'receipt_unknown', 'The host returned missing or invalid indexed receipts. Changes may have occurred; do not retry.');
      }
      recordTool(slot, rawReceipts.get(slot.index)!, review.failed ? 'error' : 'completed');
      if (review.failed) issues.add(call.name);
      if (review.applied > 0) {
        rememberAffectedNodes(operations, review, affectedNodes);
        // Invalidate older validation before UI; retain receipts even when the
        // host aborts synchronously during the successful mutation.
        summary.validation = { status: 'not_run', errors: [] };
        if (!signal?.aborted) {
          lastMutationSnapshot = currentSnapshot();
          if (repairSnapshot !== undefined) repairSnapshot = lastMutationSnapshot;
        }
      }
      if (review.result) observe(() => callbacks.onOpsApplied(opSummary, copy(review.result!)));
      return;
    }
    if (call.name === 'get_current_graph') {
      const content = graphSnapshot(api.graph.getGraph(), api.graph.getNodeDefinitions());
      throwIfAborted(signal);
      recordTool(slot, content, 'completed');
      return;
    }
    if (call.name === 'get_node_schemas') {
      if (!Array.isArray(args.node_types) || !args.node_types.length ||
        !args.node_types.every((name) => typeof name === 'string' && !!name.trim())) {
        errorResult('node_types must be a non-empty array of exact catalog names.'); return;
      }
      const names = args.node_types as string[];
      const definitions = api.graph.getNodeDefinitions();
      throwIfAborted(signal);
      const byName = new Map(definitions.map((definition) => [definition.node_name, definition]));
      const found = names.map((name) => byName.get(name)).filter((definition): definition is NonNullable<typeof definition> => !!definition);
      const missing = names.filter((name) => !byName.has(name));
      let content = found.length ? compactCatalog(found) : '(no matching node types)';
      if (missing.length) content += `\n(unknown node types, not in catalog: ${missing.join(', ')})`;
      recordTool(slot, content, missing.length ? 'error' : 'completed');
      if (missing.length) issues.add(call.name);
      return;
    }
    if (call.name === 'validate_graph') {
      phase('validating');
      throwIfAborted(signal);
      if (lastMutationSnapshot !== undefined && currentSnapshot() !== lastMutationSnapshot) stale();
      const report = await validateCurrentGraph(api, signal);
      throwIfAborted(signal);
      summary.validation = { status: report.status, errors: report.errors };
      recordTool(slot, JSON.stringify(report), report.status === 'unavailable' || report.status === 'stale' ? 'error' : 'completed');
      if (report.status === 'stale' || (lastMutationSnapshot !== undefined && currentSnapshot() !== lastMutationSnapshot)) stale();
      if (report.status === 'invalid' && summary.appliedOps > 0 && mode === 'edit') {
        // An explicit invalid tool result authorizes no broader repairs than an
        // automatic nudge, including later tools in this same assistant group.
        repairSnapshot = currentSnapshot();
      }
      if (report.status === 'unavailable') {
        issues.add(call.name);
        if (summary.appliedOps > 0) throw new RunExit('incomplete', 'validation_unavailable', 'Structural validation is unavailable. No automatic repair was attempted.');
      }
      phase('tools');
      return;
    }
    if (call.name === 'research') {
      if (!Array.isArray(args.questions) || !args.questions.every((question) => typeof question === 'string')) {
        errorResult('research requires a non-empty "questions" array of strings.'); return;
      }
      const questions = (args.questions as string[]).filter((question) => question.trim()).slice(0, 4);
      if (!questions.length) { errorResult('research requires a non-empty "questions" array.'); return; }
      const index = compactIndex(api.graph.getNodeDefinitions());
      throwIfAborted(signal);
      const answers = await awaitWithSignal(Promise.all(questions.map((question) => researchSubagent(api, settings, question, index, signal))), signal);
      throwIfAborted(signal);
      const failed = answers.some((answer) => answer.failed);
      const content = 'Index-only candidate suggestions; verify exact schemas before wiring.\n\n' + questions.map((question, index) => `[${index + 1}] Q: ${question}\nA: ${answers[index].text}`).join('\n\n');
      recordTool(slot, content, failed ? 'error' : 'completed');
      if (failed) issues.add(call.name);
      return;
    }
    errorResult(`Unknown tool: ${call.name}`);
  };

  const validateDone = (event: unknown): event is DoneEvent => {
    if (!isRecord(event) || !isRecord(event.message) || event.message.role !== 'assistant' || typeof event.message.content !== 'string' || !Array.isArray(event.message.tool_calls)) return false;
    const calls: unknown[] = event.message.tool_calls;
    if (calls.length > MAX_TOOLS_PER_ROUND || !calls.every(isToolCall)) return false;
    const ids = calls.map((call) => (call as WireToolCall).id);
    return new Set(ids).size === ids.length && !ids.some((id) => knownIds.has(id)) &&
      ((event.stop_reason === 'end' && calls.length === 0) || (event.stop_reason === 'tool_use' && calls.length > 0));
  };

  try {
    throwIfAborted(signal);
    historicalCallIds(opts.history).forEach((id) => knownIds.add(id));
    throwIfAborted(signal);
    const wire = buildInitialMessages(opts, mode);
    const tools = mode === 'ask' ? TOOLS.filter((tool) => READ_ONLY_TOOLS.has(tool.name)) : TOOLS;
    while (true) {
      throwIfAborted(signal);
      assertRepairSnapshot();
      phase('thinking');
      throwIfAborted(signal);
      const round: LiveRound = { text: '', done: null, error: null, retained: false };
      liveRound = round;
      let streamActive = true;
      try {
        await awaitWithSignal(streamChat(api, buildChatBody(settings, wire, tools), {
          onText(delta) { if (streamActive && !signal?.aborted && !round.done && !round.error) { round.text += delta; observe(() => callbacks.onTextDelta(delta)); } },
          onDone(event) { if (streamActive && !signal?.aborted && !round.done && !round.error) round.done = event; },
          onError(message) { if (streamActive && !signal?.aborted && !round.done && !round.error) round.error = message; },
        }, signal), signal);
      } catch (error) {
        // Preserve known done calls even when Stop races the returning stream.
        if (round.done && validateDone(round.done)) {
          round.retained = true;
          const content = round.done.message.content || round.text;
          if (round.done.message.tool_calls.length) startGroup(round.done, content);
          else append({ role: 'assistant', content });
        } else partial();
        throw error;
      } finally {
        streamActive = false;
      }
      if (round.error !== null) {
        partial();
        throw new RunExit('failed', 'stream_error', 'The model request failed. Check the recorded mutation state before retrying.', round.error);
      }
      if (!round.done || !validateDone(round.done)) {
        partial();
        throw new RunExit('failed', 'invalid_done', 'The model stream ended without a valid terminal response.', 'Missing, malformed, or replayed terminal tool calls.');
      }
      const event = round.done;
      const content = event.message.content || round.text;
      round.retained = true;
      if (!event.message.tool_calls.length) {
        append({ role: 'assistant', content });
        throwIfAborted(signal);
        if (summary.appliedOps > 0 && mode === 'edit') {
          const report = await validateForFinish();
          throwIfAborted(signal);
          if (lastMutationSnapshot !== undefined && currentSnapshot() !== lastMutationSnapshot) stale();
          if (report.status === 'unavailable') throw new RunExit('incomplete', 'validation_unavailable', 'Structural validation is unavailable. No automatic repair was attempted.');
          if (report.status === 'invalid') {
            if (validationNudges >= MAX_VALIDATION_NUDGES || !report.errors.length) {
              throw new RunExit('incomplete', 'validation_limit', 'Structural validation still reports issues; the bounded repair limit was reached.');
            }
            validationNudges++;
            repairSnapshot = currentSnapshot();
            wire.push({ role: 'assistant', content });
            wire.push({ role: 'user', content: 'Current-run edits did not pass structural validation. Correct ONLY issues within these authorized edits, never unrelated graph content. This bounded nudge does not authorize clearing or broader rebuilding. Inspect exact schemas, fix these errors, then validate again:\n' + report.errors.map((error) => `- ${error}`).join('\n') });
            continue;
          }
        }
        if (issues.size) throw new RunExit('incomplete', 'tool_errors', 'Some tool requests or operations failed and were not corrected. Review their receipts.');
        break;
      }

      const assistantIndex = startGroup(event, content);
      event.message.tool_calls.forEach((call) => knownIds.add(call.id));
      roundsWithTools++;
      phase('tools');
      const roundOps: string[] = [];
      try {
        for (let index = 0; index < event.message.tool_calls.length; index++) {
          throwIfAborted(signal);
          const slot = pending[index];
          const startedAt = Date.now();
          try { await executeTool(event.message.tool_calls[index], slot, roundOps); }
          catch (error) {
            if (!slot.terminal && !isAbortError(error) && !signal?.aborted && !(error instanceof RunExit) && !(error instanceof RuntimeToolExit)) {
              recordTool(slot, JSON.stringify({ error: 'The tool failed before returning a result.' }), 'error');
            }
            throw error;
          } finally { turns[slot.index] = { ...turns[slot.index], durationMs: Math.max(0, Date.now() - startedAt) }; }
          publishTool(slot);
          throwIfAborted(signal);
        }
      } finally {
        if (roundOps.length) turns[assistantIndex] = { ...turns[assistantIndex], opsSummary: roundOps.join('; ') };
      }
      // Current protocol arguments are schema-redacted too; raw calls remain
      // execution-local and are never replayed from persisted conversation.
      wire.push(turnToWire(turns[assistantIndex], settings.provider));
      for (const slot of pending) wire.push(turnToWire(turns[slot.index], settings.provider));
      pending = [];
      if (roundsWithTools >= MAX_TOOL_ROUNDS) {
        if (summary.appliedOps > 0 && mode === 'edit') await validateForFinish();
        throwIfAborted(signal);
        append({ role: 'assistant', content: `(stopped after ${MAX_TOOL_ROUNDS} tool rounds)` });
        throw new RunExit('incomplete', 'tool_limit', 'The tool-round limit was reached. No additional tools were executed.');
      }
    }
  } catch (error) {
    partial();
    if (signal?.aborted || isAbortError(error)) {
      summary.status = 'cancelled';
      summary.reason = 'aborted';
      summary.message = summary.sideEffectAttempted ? 'Stopped. Execution and storage side effects may remain; inspect the host run before continuing.' : summary.mutationAttempted ? 'Stopped. Applied or unknown changes are not rolled back.' : 'Stopped before any graph mutation or execution was dispatched.';
    } else if (error instanceof RunExit || error instanceof RuntimeToolExit) {
      summary.status = error.status;
      summary.reason = error.reason;
      summary.message = error.message;
      if (error instanceof RunExit && error.reportError) observe(() => callbacks.onError(safeText(error.reportError!)));
    } else {
      summary.status = 'failed';
      summary.reason = 'run_error';
      summary.message = summary.mutationAttempted ? 'The run failed. Review recorded effects before continuing.' : 'The run failed before a graph mutation was dispatched.';
      observe(() => callbacks.onError('The agent could not complete this run.'));
    }
  }
  return finalize();
}
