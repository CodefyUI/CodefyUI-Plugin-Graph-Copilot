/** Approved host execution tools, kept separate from read-only/model plumbing.
 * Once a runner is dispatched we await its native cleanup, never race away
 * from it on Stop. This module does not infer canvas mutation from execution. */
import type { WireToolCall } from '../llm/client';
import type { CodefyUIPluginAPI, GraphOp, SerializedGraph } from '../types/codefyui';
import type { TurnCallbacks, CurrentGraphValidation } from './loop';
import type { RunPhase, RunStatus, ToolOutcome } from './types';
import {
  MAX_EXPERIMENT_RUNS, experimentRunTimeoutMs, getExperimentExecutionCount,
  runGraphExperiments,
} from './experiments';
import type { ExperimentRuntimeHooks, GraphExperimentRequest } from './experiments';
import { compileParameterOptimizer } from './optimizer';
import { redactToolCallForHistory } from './historyRedaction';
import {
  DEFAULT_RUN_TIMEOUT_MINUTES, MAX_RUN_TIMEOUT_MINUTES, fetchDefaultDevice, runLiveGraph,
} from './runGraph';
import {
  fetchRun, fetchRunArtifacts, fetchRunList, isTerminalRunStatus, probeRunHistory,
} from './runHistory';
import { clearActiveRun, readActiveRun, writeActiveRun } from './runPointer';
import { awaitWithSignal, comparisonSnapshot, isAbortError, throwIfAborted } from './toolGuards';

export const READ_ONLY_TOOLS = new Set([
  'get_current_graph', 'get_node_schemas', 'validate_graph', 'research', 'list_runs', 'get_run',
]);
const RUNTIME_TOOLS = new Set(['run_graph', 'run_graph_experiments', 'optimize_graph_parameters', 'list_runs', 'get_run']);
export const isRuntimeTool = (name: string): boolean => RUNTIME_TOOLS.has(name);

export interface ExperimentApprovalRequest {
  hypothesis: string;
  variantCount: number;
  repetitions: number;
  executionCount: number;
  concurrency: number;
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
  device: string;
}
export interface RuntimeToolResult { content: string; outcome: ToolOutcome }
export class RuntimeToolExit extends Error {
  constructor(public status: RunStatus, public reason: string, message: string) { super(message); }
}
export interface RuntimeContext {
  api: CodefyUIPluginAPI;
  signal?: AbortSignal;
  callbacks: TurnCallbacks;
  budget: { remaining: number };
  validate(): Promise<CurrentGraphValidation>;
  phase(value: RunPhase): void;
  /** Set conservative side-effect metadata and the unknown pending receipt. */
  dispatched(): void;
  hostRunStarted(id: string): void;
  /** Journal the result BEFORE any finish observer or run-history awaits. */
  record(content: string, outcome: ToolOutcome, terminal?: boolean): void;
  promotionHooks: ExperimentRuntimeHooks;
}
function observe(fn: () => unknown): void {
  try { void Promise.resolve(fn()).catch(() => {}); } catch { /* observers do not own execution */ }
}
const json = (value: unknown, outcome: ToolOutcome = 'completed'): RuntimeToolResult => ({ content: JSON.stringify(value), outcome });
const error = (message: string): RuntimeToolResult => json({ error: message }, 'error');

/** Execution approval identity deliberately ignores positions and note nodes. */
export function graphSemanticFingerprint(api: CodefyUIPluginAPI): string {
  return semanticFingerprint(api.graph.getGraph());
}
function semanticFingerprint(graph: SerializedGraph): string {
  const nodes = graph.nodes.filter((node) => node.type !== 'note').map((node) => ({
    id: node.id, type: node.type ?? '', params: node.data?.params ?? {},
  })).sort((a, b) => a.id.localeCompare(b.id));
  const edges = graph.edges.map((edge) => ({
    source: edge.source ?? '', sourceHandle: edge.sourceHandle ?? '',
    target: edge.target ?? '', targetHandle: edge.targetHandle ?? '', type: edge.type ?? '',
  })).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return JSON.stringify({ nodes, edges, presets: graph.presets ?? [] });
}
function approvalValue(value: unknown): string {
  const encoded = JSON.stringify(value);
  if (encoded === undefined) return String(value);
  return encoded.length > 180 ? `${encoded.slice(0, 177)}...` : encoded;
}
function approvalParams(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  const entries = Object.entries(params).map(([name, value]) => `${name}=${approvalValue(value)}`);
  return entries.length ? entries.join(', ') : 'no parameters';
}
function approvalOperationSummary(operation: GraphOp): string {
  switch (operation.op) {
    case 'add_node': { const params = approvalParams(operation.params); return `add ${operation.node_type}${params ? ` with ${params}` : ''}`; }
    case 'set_params': return `set ${operation.node_id}: ${approvalParams(operation.params)}`;
    case 'connect': return `connect ${operation.source}.${operation.source_handle} -> ${operation.target}.${operation.target_handle}`;
    case 'remove_node': return `remove node ${operation.node_id}`;
    case 'remove_edge': return `remove edge ${operation.source} -> ${operation.target}`;
    case 'clear_graph': return 'clear graph';
    case 'auto_layout': return 'auto layout';
  }
}
let liveRunInFlight = false;

function declined(context: RuntimeContext, content: string, reason = 'execution_declined'): never {
  context.record(JSON.stringify({ cancelled: true, ...(reason === 'execution_stale' ? { replan: true } : {}), error: content }), 'cancelled');
  throw new RuntimeToolExit('cancelled', reason, content);
}

async function liveRun(call: WireToolCall, context: RuntimeContext): Promise<RuntimeToolResult> {
  const { api, signal, callbacks } = context;
  const args = call.arguments;
  if (liveRunInFlight) return error('A live graph run is already in progress. Wait for it to finish or cancel it before starting another.');
  const previousPointer = readActiveRun(api);
  if (previousPointer) {
    const supported = await awaitWithSignal(probeRunHistory(api, signal), signal);
    throwIfAborted(signal);
    if (supported) {
      let row;
      try { row = await awaitWithSignal(fetchRun(api, previousPointer.runId, signal), signal); }
      catch (err) { throwIfAborted(signal); if (isAbortError(err)) throw err; row = null; }
      throwIfAborted(signal);
      if (row && !isTerminalRunStatus(row.status)) return error(
        `Run ${previousPointer.runId} is still ${row.status} on the host${previousPointer.reason ? ` (${previousPointer.reason})` : ''}. `
        + 'One run at a time: wait for it, or the user can stop it from the reattach card (reopen or reload the panel to see it).',
      );
    }
    clearActiveRun(api, previousPointer.runId);
  }
  const reason = typeof args.reason === 'string' && args.reason.trim() ? args.reason.trim().slice(0, 300) : 'Run the current graph.';
  const rawTimeout = typeof args.timeout_minutes === 'number' && Number.isFinite(args.timeout_minutes) ? Math.round(args.timeout_minutes) : DEFAULT_RUN_TIMEOUT_MINUTES;
  const timeoutMinutes = Math.min(Math.max(rawTimeout, 1), MAX_RUN_TIMEOUT_MINUTES);
  const requestedDevice = typeof args.device === 'string' && ['cpu', 'cuda', 'mps'].includes(args.device) ? args.device : undefined;
  const device = requestedDevice ?? await awaitWithSignal(fetchDefaultDevice(api, signal), signal);
  throwIfAborted(signal);
  const validation = await context.validate();
  throwIfAborted(signal);
  if (!validation.valid) return json({
    error: 'The current graph is not runnable — fix stable structural validation errors before executing; unavailable or stale validation cannot authorize a run.',
    errors: validation.errors, validation_status: validation.status,
  }, 'error');
  if (!callbacks.onRunApproval) return error('Running the live graph requires an interactive user confirmation, but this client did not provide one.');
  const graph = structuredClone(api.graph.getGraph());
  const fingerprint = semanticFingerprint(graph);
  context.phase('awaiting_confirmation');
  throwIfAborted(signal);
  let approved: boolean;
  try {
    approved = await awaitWithSignal(callbacks.onRunApproval({
      reason, nodeCount: graph.nodes.filter((node) => node.type !== 'note').length,
      edgeCount: graph.edges.length,
      nodeTypes: [...new Set(graph.nodes.map((node) => node.type).filter((type): type is string => !!type && type !== 'note'))],
      timeoutMinutes, device: device ?? 'host default',
    }, signal), signal);
  } catch (err) { throwIfAborted(signal); if (isAbortError(err)) throw err; return error(`Run approval failed: ${String(err)}`); }
  throwIfAborted(signal);
  if (approved !== true) declined(context, 'The run was not approved by the user.');
  if (graphSemanticFingerprint(api) !== fingerprint) declined(context, 'The graph changed while the run approval was open. Re-read, re-validate, and propose the run again.', 'execution_stale');
  context.phase('tools');
  throwIfAborted(signal);
  // Final read after the phase observer, immediately before approved dispatch.
  if (graphSemanticFingerprint(api) !== fingerprint) declined(context, 'The graph changed before execution; the previous approval is stale.', 'execution_stale');
  if (liveRunInFlight) return error('A live graph run is already in progress. Wait for it or cancel it before starting another.');
  throwIfAborted(signal);
  liveRunInFlight = true;
  context.dispatched();
  try {
    let outcome;
    try {
      // Do not awaitWithSignal here: native cancellation has a cleanup handshake.
      outcome = await runLiveGraph(api, {
        signal, timeoutMs: timeoutMinutes * 60_000, ...(device ? { device } : {}),
        approvedGraph: graph,
        beforeExecute: () => {
          throwIfAborted(signal);
          if (graphSemanticFingerprint(api) !== fingerprint) declined(context, 'The graph changed during execution bootstrap or connection; re-read, re-validate, and request approval again.', 'execution_stale');
        },
        onProgress: (update) => { if (!signal?.aborted || update.phase === 'cancelling') observe(() => callbacks.onRunProgress?.(update)); },
        onRunId: (id) => {
          context.hostRunStarted(id);
          try { writeActiveRun(api, { runId: id, reason, submittedAt: Date.now(), timeoutMinutes, ...(device ? { device } : {}) }); } catch { /* identity remains in authoritative summary */ }
        },
      });
    } catch (err) {
      if (err instanceof RuntimeToolExit) throw err;
      context.record(JSON.stringify({ outcome: 'unknown', error: `Run failed after dispatch: ${String(err)}` }), 'unknown');
      throw new RuntimeToolExit('failed', 'execution_unknown', 'The execution runner failed after dispatch. External effects may have occurred; do not retry.');
    }
    if (outcome.runId) context.hostRunStarted(outcome.runId);
    const { durationMs, textTail, media, ...rest } = outcome;
    const refs = (media ?? []).map(({ data, ...ref }) => ({ ...ref, ...(data ? { inline_preview: true } : {}) }));
    const receipt = {
      ...rest, ...(device ? { device } : {}), duration_s: Math.round(durationMs / 1000),
      ...(textTail ? { text_tail: textTail } : {}), ...(refs.length ? { media: refs } : {}),
    };
    const unconfirmedStop = (outcome.status === 'cancelled' || outcome.status === 'timeout') && outcome.cancelConfirmed !== true;
    let terminal: ToolOutcome = unconfirmedStop ? 'unknown' : outcome.status === 'complete' ? 'completed' : outcome.status === 'cancelled' ? 'cancelled' : 'error';
    // Capture the terminal runner receipt before history checks or UI observers.
    context.record(JSON.stringify({ ...receipt, ...(unconfirmedStop ? { run_may_still_be_running: true } : {}) }), terminal);
    let mayStillRun = unconfirmedStop;
    if (outcome.runId) {
      if (outcome.status === 'error' && !signal?.aborted) {
        try {
          if (await awaitWithSignal(probeRunHistory(api, signal), signal)) {
            const row = await awaitWithSignal(fetchRun(api, outcome.runId, signal), signal);
            mayStillRun = row !== null && !isTerminalRunStatus(row.status);
          }
        } catch { mayStillRun = true; /* never invent a finish after unreadable host state */ }
      }
      if (!mayStillRun) { try { clearActiveRun(api, outcome.runId); } catch { /* best effort */ } }
    }
    if (mayStillRun) {
      terminal = 'unknown';
      context.record(JSON.stringify({ ...receipt, run_may_still_be_running: true }), terminal);
      throw new RuntimeToolExit(signal?.aborted || outcome.status === 'cancelled' ? 'cancelled' : 'incomplete', 'execution_unknown', 'Cancellation or socket cleanup did not confirm host termination. The run may still be running; reattach and inspect its status before starting another.');
    }
    observe(() => callbacks.onRunFinished?.(outcome));
    if (outcome.status === 'cancelled') throw new RuntimeToolExit('cancelled', 'execution_cancelled', 'The host run was cancelled. External effects are not rolled back.');
    if (outcome.status !== 'complete') throw new RuntimeToolExit('incomplete', 'execution_failed', 'The host execution did not complete successfully. Inspect its terminal receipt; do not automatically rerun it.');
    return json(receipt, terminal);
  } finally { liveRunInFlight = false; }
}

async function studyRun(call: WireToolCall, context: RuntimeContext, trustedSearch = false): Promise<RuntimeToolResult> {
  const { api, signal, callbacks, budget } = context;
  const args = call.arguments;
  if (args.search !== undefined && !trustedSearch) return error('search metadata is internal optimizer provenance; call optimize_graph_parameters instead');
  const request = args as unknown as GraphExperimentRequest;
  let plannedRuns: number;
  try { plannedRuns = getExperimentExecutionCount(request); } catch (err) { return error(String(err)); }
  if (plannedRuns > budget.remaining) return error(`Experiment turn budget exceeded: ${plannedRuns} requested, ${budget.remaining} of ${MAX_EXPERIMENT_RUNS} executions remain.`);
  throwIfAborted(signal);
  if (!callbacks.onExperimentApproval) return error('Experiment execution requires an interactive user confirmation, but this client did not provide one.');
  let changed = false;
  let unsubscribe: (() => void) | undefined;
  try { unsubscribe = api.graph.onGraphChanged(() => { changed = true; }); }
  catch (err) { return error(`Cannot safely watch the graph during approval: ${String(err)}`); }
  try {
    const fingerprint = comparisonSnapshot(api.graph.getGraph());
    const approvalCall = trustedSearch ? { ...call, arguments: Object.fromEntries(Object.entries(args).filter(([key]) => key !== 'search')) } : call;
    const approval = redactToolCallForHistory(approvalCall, api).arguments as unknown as GraphExperimentRequest;
    context.phase('awaiting_confirmation');
    throwIfAborted(signal);
    let approved: boolean;
    try {
      approved = await awaitWithSignal(callbacks.onExperimentApproval({
        hypothesis: approval.hypothesis, variantCount: request.variants.length,
        repetitions: request.repetitions ?? 1, executionCount: plannedRuns,
        concurrency: request.concurrency ?? 1, runTimeoutMinutes: Math.round(experimentRunTimeoutMs(request) / 60_000), applyBest: request.apply_best ?? false,
        variants: approval.variants.map((variant) => ({ label: variant.label, operations: variant.operations.map(approvalOperationSummary) })),
        nodeTypes: [...new Set([
          ...api.graph.getGraph().nodes.map((node) => node.type).filter((type): type is string => !!type && type !== 'note'),
          ...request.variants.flatMap((variant) => variant.operations.filter((operation): operation is Extract<GraphOp, { op: 'add_node' }> => operation.op === 'add_node').map((operation) => operation.node_type)),
        ])],
      }, signal), signal);
    } catch (err) { throwIfAborted(signal); if (isAbortError(err)) throw err; return error(`Experiment approval failed: ${String(err)}`); }
    throwIfAborted(signal);
    if (approved !== true) declined(context, 'Experiment execution was not approved by the user.');
    if (changed || comparisonSnapshot(api.graph.getGraph()) !== fingerprint) declined(context, 'The active graph changed while execution approval was open. Re-read the graph and propose the study again.', 'execution_stale');
    context.phase('tools');
    throwIfAborted(signal);
    if (changed || comparisonSnapshot(api.graph.getGraph()) !== fingerprint) declined(context, 'The active graph changed before study dispatch; the previous approval is stale.', 'execution_stale');
    // Reserve before dispatch; transport failures never refund an execution budget.
    budget.remaining -= plannedRuns;
    throwIfAborted(signal);
    context.dispatched();
  } finally { try { unsubscribe?.(); } catch { /* best effort */ } }
  let result;
  try { result = await runGraphExperiments(api, request, signal, context.promotionHooks); }
  catch (err) {
    if (err instanceof RuntimeToolExit) throw err;
    // Promotion callbacks may throw the reliable loop's structured terminal exit.
    if (err instanceof Error && 'status' in err && 'reason' in err) throw err;
    if (isAbortError(err) || signal?.aborted) {
      context.record(JSON.stringify({ cancelled: true, error: 'Experiment cancelled; external effects may remain.' }), 'cancelled');
      throw new RuntimeToolExit('cancelled', 'execution_cancelled', 'The study was stopped. Completed execution and storage side effects are not rolled back.');
    }
    context.record(JSON.stringify({ outcome: 'unknown', error: `Experiment failed after dispatch: ${String(err)}` }), 'unknown');
    throw new RuntimeToolExit('failed', 'execution_unknown', 'The study failed after dispatch. Its external effects may be unknown; do not retry.');
  }
  const { applyResult: _receipt, appliedOperations: _operations, ...publicResult } = result;
  const terminal: ToolOutcome = result.status === 'completed' && !result.applyConflict ? 'completed' : 'error';
  context.record(JSON.stringify(publicResult), terminal);
  // Test/legacy runners may return a promotion without implementing hooks. Still
  // journal the exact receipt before observers; production hooks capture earlier.
  if (result.applyResult && result.appliedOperations && !context.promotionHooks.receiptCaptured?.()) {
    context.promotionHooks.onPromotionReceipt?.(result.appliedOperations, result.applyResult);
  }
  throwIfAborted(signal);
  return json(publicResult, terminal);
}

export async function executeRuntimeTool(call: WireToolCall, context: RuntimeContext): Promise<RuntimeToolResult> {
  const { api, signal } = context;
  throwIfAborted(signal);
  if (call.name === 'run_graph') return liveRun(call, context);
  if (call.name === 'run_graph_experiments') return studyRun(call, context);
  if (call.name === 'optimize_graph_parameters') {
    let compiled;
    try { compiled = compileParameterOptimizer(call.arguments, api.graph.getGraph(), api.graph.getNodeDefinitions()); }
    catch (err) { return error(String(err)); }
    throwIfAborted(signal);
    const result = await studyRun({ ...call, name: 'run_graph_experiments', arguments: compiled.request as unknown as Record<string, unknown> }, context, true);
    throwIfAborted(signal);
    return { ...result, content: JSON.stringify({ ...JSON.parse(result.content), optimizer: compiled.metadata }) };
  }
  if (!(await awaitWithSignal(probeRunHistory(api, signal), signal))) return error('Run history is unavailable: this CodefyUI host does not expose /api/runs (server-owned runs). Only results returned in this conversation are known.');
  throwIfAborted(signal);
  if (call.name === 'list_runs') {
    const raw = call.arguments.limit;
    const limit = typeof raw === 'number' && Number.isFinite(raw) ? Math.round(raw) : 10;
    try {
      const { runs, total } = await awaitWithSignal(fetchRunList(api, { limit: Math.min(Math.max(limit, 1), 20), signal }), signal);
      throwIfAborted(signal);
      const filtered = call.arguments.active_only === true ? runs.filter((run) => !isTerminalRunStatus(run.status)) : runs;
      return json({ total, runs: filtered.map((run) => ({
        run_id: run.runId, ...(run.name ? { name: run.name } : {}), status: run.status, active: run.active,
        ...(run.queuePosition !== null ? { queue_position: run.queuePosition } : {}), ...(run.createdAt ? { created_at: run.createdAt } : {}),
        ...(run.durationS !== null ? { duration_s: run.durationS } : {}), ...(run.error ? { error: run.error } : {}),
        ...(Object.keys(run.finalMetrics).length ? { final_metrics: run.finalMetrics } : {}),
      })) });
    } catch (err) { throwIfAborted(signal); if (isAbortError(err)) throw err; return error(`Could not list runs: ${String(err)}`); }
  }
  const runId = typeof call.arguments.run_id === 'string' ? call.arguments.run_id.trim() : '';
  if (!runId) return error('get_run requires a non-empty "run_id".');
  try {
    const run = await awaitWithSignal(fetchRun(api, runId, signal), signal);
    throwIfAborted(signal);
    if (!run) return error(`run '${runId}' not found on this host.`);
    const artifacts = await awaitWithSignal(fetchRunArtifacts(api, runId, signal), signal);
    throwIfAborted(signal);
    return json({ run: {
      run_id: run.runId, ...(run.name ? { name: run.name } : {}), status: run.status, active: run.active,
      ...(run.createdAt ? { created_at: run.createdAt } : {}), ...(run.startedAt ? { started_at: run.startedAt } : {}), ...(run.finishedAt ? { finished_at: run.finishedAt } : {}),
      ...(run.durationS !== null ? { duration_s: run.durationS } : {}), ...(run.error ? { error: run.error } : {}), final_metrics: run.finalMetrics,
    }, artifacts: artifacts.map((artifact) => ({ kind: artifact.kind, path: artifact.path, ...(artifact.createdAt ? { created_at: artifact.createdAt } : {}) })) });
  } catch (err) { throwIfAborted(signal); if (isAbortError(err)) throw err; return error(`Could not fetch run '${runId}': ${String(err)}`); }
}
