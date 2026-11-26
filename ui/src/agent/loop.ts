/** A bounded, journal-first graph agent. Receipts and terminal results are
 * authoritative; UI observers never control execution or finalization. */
import { streamChat, composeUserContent } from '../llm/client';
import type { WireMessage, WireToolCall, DoneEvent, Provider } from '../llm/client';
import { buildSystemPrompt } from './prompt';
import { historyWindow, historicalCallIds, isToolCall } from './history';
import {
  awaitWithSignal, buildOpsSummary, comparisonSnapshot,
  isAbortError, isRecord, rememberAffectedNodes, repairScopeError, reviewReceipt, throwIfAborted,
} from './toolGuards';
import type { Settings } from '../state/settings';
import type { ChatTurn, SkillInvocation } from '../state/conversations';
import type { AgentContext } from './hostContext';
import { skillSession, withSkills } from './skillSession';
export { skillNamesIn, skillSession, withSkills } from './skillSession';
import type { Attachment } from '../state/attachments';
import type { CodefyUIPluginAPI, ApplyResult, GraphOp, NodeDefinition, SerializedGraph } from '../types/codefyui';
import {
  redactAssistantTextForHistory, redactToolCallsForHistory, redactToolResultForContext,
} from './historyRedaction';
import { RuntimeToolExit } from './runtimeTools';
export type { ExperimentApprovalRequest, RunApprovalRequest } from './runtimeTools';
export { graphSemanticFingerprint } from './runtimeTools';
import type { ExperimentApprovalRequest, RunApprovalRequest } from './runtimeTools';
import type { RunGraphOutcome, RunProgressUpdate } from './runGraph';
import { MAX_EXPERIMENT_RUNS } from './experiments';
import type {
  AgentMode, ClearGraphRequest, RunPhase, RunSummary, ToolOutcome, TurnResult, ValidationReport,
} from './types';
import { buildChatBody, copy, observe } from './chatBody';
import { RunExit } from './runExit';
import { validateCurrentGraph } from './validation';
import { toolRegistry, toWire } from './tools';
import type {
  ApprovalRequest, ApprovalRequirement, ProjectCommitApprovalRequest, SkillSession, ToolContext, ToolEnvironment, ToolRegistry, TurnState,
} from './tools';
export { validateCurrentGraph } from './validation';
export type { CurrentGraphValidation } from './validation';
import type { CurrentGraphValidation } from './validation';

export const MAX_TOOL_ROUNDS = 16;
export const MAX_VALIDATION_NUDGES = 2;
const MAX_TOOLS_PER_ROUND = 32;

/** The built-in tools every host gets, as sent to the model in Edit mode.
 * Tools gated by `available` (skills, workspace, project) join per turn. */
export const TOOLS = toolRegistry.all().filter((tool) => !tool.available).map(toWire);

export interface TurnCallbacks {
  onTextDelta(t: string): void;
  /** Live turn notifications may expose a pending assistant group. Only the
   * once-only commit is persisted, always with one terminal result per call. */
  onTurnAppended?(turn: ChatTurn): void;
  onOpsApplied(summary: string, result: ApplyResult): void;
  onExperimentApproval?(request: ExperimentApprovalRequest, signal?: AbortSignal): Promise<boolean>;
  onRunApproval?(request: RunApprovalRequest, signal?: AbortSignal): Promise<boolean>;
  onProjectCommitApproval?(request: ProjectCommitApprovalRequest, signal?: AbortSignal): Promise<boolean>;
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
  /** Explicit host Stop, independent of passive browser-observation teardown. */
  cancelSignal?: AbortSignal;
  runId?: string;
  mode?: AgentMode;
  confirmClearGraph?: (request: ClearGraphRequest, signal?: AbortSignal) => Promise<boolean>;
  /** The tools this turn may use; the built-in registry by default. */
  registry?: ToolRegistry;
  /** `GET /api/agent/context`; null or absent on a host without Agent Skills.
   * A reader is called, and awaited, at the start of the turn (Stop still works). */
  agentContext?: AgentContext | null | (() => Promise<AgentContext | null>);
  /** Skills the user invoked with `/name` on this message. */
  skills?: SkillInvocation[];
  /** Whether the host is in project mode on a git repository (the project
   * tools need it). A reader is called and awaited like `agentContext`. */
  gitProject?: boolean | (() => Promise<boolean>);
}

function turnToWire(turn: ChatTurn, provider: Provider): WireMessage {
  const text = turn.role === 'user' ? withSkills(turn.content, turn.skills) : turn.content;
  const message: WireMessage = {
    role: turn.role,
    content: turn.role === 'user' && turn.attachments?.length
      ? composeUserContent(text, turn.attachments, provider) : text,
  };
  if (turn.tool_calls?.length) message.tool_calls = copy(turn.tool_calls);
  if (turn.tool_call_id) message.tool_call_id = turn.tool_call_id;
  return message;
}

function buildInitialMessages(opts: RunTurnOpts, mode: AgentMode, context: AgentContext | null, readOnlyTools?: string[]): WireMessage[] {
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
    { role: 'system', content: buildSystemPrompt(definitions, graph, mode, { context, readOnlyTools }) },
    ...safeHistory,
    { role: 'user', content: composeUserContent(withSkills(opts.userText, opts.skills), opts.attachments, opts.settings.provider) },
  ];
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
  let agentContext: AgentContext | null = null;
  let gitProject = false;
  const readers: Array<Promise<void>> = [];
  // A failed or stopped read is "feature off": the turn itself reports Stop.
  if (typeof opts.agentContext === 'function') {
    const read = opts.agentContext;
    readers.push(awaitWithSignal(read(), opts.signal).then((value) => { agentContext = value; }, () => { agentContext = null; }));
  } else agentContext = opts.agentContext ?? null;
  if (typeof opts.gitProject === 'function') {
    const read = opts.gitProject;
    readers.push(awaitWithSignal(read(), opts.signal).then((value) => { gitProject = value === true; }, () => { gitProject = false; }));
  } else gitProject = opts.gitProject === true;
  if (readers.length) await Promise.all(readers);
  return runTurnWithContext(opts, agentContext, gitProject);
}

async function runTurnWithContext(opts: RunTurnOpts, agentContext: AgentContext | null, gitProject: boolean): Promise<TurnResult> {
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
  const env: ToolEnvironment = {
    api, settings, mode,
    host: { skills: agentContext !== null, gitProject },
    ...(agentContext ? { skills: skillSession(agentContext, opts.history, historyWindow(opts.history), opts.skills) } : {}),
  };
  const offeredTools = (opts.registry ?? toolRegistry).list({ mode, env });
  const offered = new Map(offeredTools.map((tool) => [tool.name, tool]));
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
    // Only the tools offered this turn can run: Ask mode offers read-only ones.
    const tool = offered.get(call.name);
    if (mode === 'ask' && !tool?.readOnly) {
      errorResult(`Ask mode is read-only; ${call.name} is not authorized.`);
      throw new RunExit('incomplete', 'ask_mutation_denied', 'A side-effect tool was refused in Ask mode. No graph changes or execution were dispatched.');
    }
    if (!tool) { errorResult(`Unknown tool: ${call.name}`); return; }
    // Whether this call needs approval is the tool's declaration, never text.
    let requirement: ApprovalRequirement | null;
    try { requirement = tool.approval?.(args, env) ?? null; }
    catch { errorResult(`${call.name} could not determine whether it needs approval; it was not run.`); return; }
    let granted = false;
    const assertApproved = () => {
      if (!requirement || granted) return;
      recordTool(slot, JSON.stringify({ outcome: 'not_executed', error: `${call.name} needs the user's approval, which was not given. Nothing was dispatched.` }), 'not_executed');
      throw new RunExit('incomplete', 'approval_missing', 'An action that needs the user\'s approval was refused because it was not approved. Nothing was dispatched.');
    };
    const approve = async (request: ApprovalRequest): Promise<boolean> => {
      if (!requirement || request.kind !== requirement.kind) {
        throw new Error(`${call.name} did not declare a ${request.kind} approval.`);
      }
      let answer: boolean;
      switch (request.kind) {
        case 'clear_graph':
          if (!opts.confirmClearGraph) return false;
          answer = await awaitWithSignal(opts.confirmClearGraph(request.request, signal), signal); break;
        case 'run_graph':
          if (!callbacks.onRunApproval) return false;
          answer = await awaitWithSignal(callbacks.onRunApproval(request.request, signal), signal); break;
        case 'experiment':
          if (!callbacks.onExperimentApproval) return false;
          answer = await awaitWithSignal(callbacks.onExperimentApproval(request.request, signal), signal); break;
        case 'project_commit':
          if (!callbacks.onProjectCommitApproval) return false;
          answer = await awaitWithSignal(callbacks.onProjectCommitApproval(request.request, signal), signal); break;
      }
      granted = answer === true;
      return granted;
    };
    const canApprove = (kind: ApprovalRequest['kind']): boolean => {
      switch (kind) {
        case 'clear_graph': return !!opts.confirmClearGraph;
        case 'run_graph': return !!callbacks.onRunApproval;
        case 'experiment': return !!callbacks.onExperimentApproval;
        case 'project_commit': return !!callbacks.onProjectCommitApproval;
      }
    };
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
    let promotionCaptured = false;
    const turnState: TurnState = {
      summary, affectedNodes,
      get repairSnapshot() { return repairSnapshot; },
      set repairSnapshot(value) { repairSnapshot = value; },
      get lastMutationSnapshot() { return lastMutationSnapshot; },
      set lastMutationSnapshot(value) { lastMutationSnapshot = value; },
      currentSnapshot, assertRepairSnapshot, stale,
      rawReceipt: () => rawReceipts.get(slot.index),
      addRoundOps: (text) => { roundOps.push(text); },
    };
    const context: ToolContext = {
      ...env, call, signal, cancelSignal: opts.cancelSignal, callbacks, turn: turnState, budget: experimentBudget, phase,
      record: (content, outcome, terminal) => recordRuntime(content, outcome, terminal),
      fail: errorResult,
      markIssue: () => { issues.add(call.name); },
      validate: () => validateCurrentGraph(api, signal),
      canApprove, approve, assertApproved,
      dispatched: () => {
        assertApproved();
        summary.sideEffectAttempted = true;
        recordTool(slot, JSON.stringify({ outcome: 'unknown', error: 'The approved runner was dispatched; external effects are not yet known.' }), 'unknown', false);
      },
      hostRunStarted: (id) => {
        if (summary.hostRunId === id) return;
        summary.hostRunId = id;
        observe(() => callbacks.onRunStarted?.(id));
      },
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
    };
    const result = await tool.execute(args, context);
    if (result) {
      recordRuntime(result.content, result.outcome);
      if (result.outcome !== 'completed') issues.add(call.name);
    }
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
    const wire = buildInitialMessages(opts, mode, agentContext, mode === 'ask' ? offeredTools.map((tool) => tool.name) : undefined);
    const tools = offeredTools.map(toWire);
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
    if (error instanceof RuntimeToolExit) {
      // Native runner receipts (especially passive detach/unknown Stop) were
      // already journaled; an aborted browser signal cannot erase their reason.
      summary.status = error.status;
      summary.reason = error.reason;
      summary.message = error.message;
    } else if (signal?.aborted || isAbortError(error)) {
      summary.status = 'cancelled';
      summary.reason = 'aborted';
      summary.message = summary.sideEffectAttempted ? 'Stopped. Execution and storage side effects may remain; inspect the host run before continuing.' : summary.mutationAttempted ? 'Stopped. Applied or unknown changes are not rolled back.' : 'Stopped before any graph mutation or execution was dispatched.';
    } else if (error instanceof RunExit) {
      summary.status = error.status;
      summary.reason = error.reason;
      summary.message = error.message;
      if (error.reportError) observe(() => callbacks.onError(safeText(error.reportError!)));
    } else {
      summary.status = 'failed';
      summary.reason = 'run_error';
      summary.message = summary.mutationAttempted ? 'The run failed. Review recorded effects before continuing.' : 'The run failed before a graph mutation was dispatched.';
      observe(() => callbacks.onError('The agent could not complete this run.'));
    }
  }
  return finalize();
}
