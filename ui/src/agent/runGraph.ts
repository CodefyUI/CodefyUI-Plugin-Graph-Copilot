/**
 * runGraph — execute the LIVE canvas graph through CodefyUI's execution
 * socket and stream its progress back to the workbench.
 *
 * Unlike the experiment runner (bounded studies over isolated clones), this
 * runs the user's own graph exactly like the editor's Run action: a real
 * server-side run with real side effects, streamed `node_status` /
 * `metric` events, and no artificial repetition budget. Long runs (model
 * training) are the expected case.
 *
 * Host generations differ in run ownership: current hosts own the run in a
 * run service (closing the socket does NOT stop it; `{action:"cancel"}` is
 * the only stop), while CodefyUI 1.3.0 owned the run by the socket (closing
 * cancels). Cancellation sends an explicit cancel action first; without a
 * terminal acknowledgement, closing alone does not prove a server-owned stop.
 */

import type { CodefyUIPluginAPI, SerializedGraph } from '../types/codefyui';
import {
  executableGraph,
  executionToken,
  executionUrl,
  scrubExecutionCredential,
} from './experiments';
import { finiteNumber, normalizeNodeStatus, type MediaOutput } from './wireOutputs';
import { isPassiveDetach } from './abortReasons';
import { awaitWithSignal, isAbortError, throwIfAborted } from './toolGuards';

function observe(fn: () => unknown): void {
  try { void Promise.resolve(fn()).catch(() => {}); } catch { /* progress is not execution */ }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default wall-clock cap for one live run (minutes). Training runs are long;
 * this is a safety net, not a budget. */
export const DEFAULT_RUN_TIMEOUT_MINUTES = 360;
export const MAX_RUN_TIMEOUT_MINUTES = 720;

/** Grace period after a cancel request before the socket is force-closed. */
const CANCEL_GRACE_MS = 5_000;
/** Passive cleanup may await the host's first identity frame, but never keep
 * the browser turn latched indefinitely when the host cannot name the run. */
const DETACH_ID_GRACE_MS = 5_000;

/** Caps that keep the tool result token-lean. */
const MAX_RESULT_ENTRIES = 60;
const MAX_TEXT_TAIL_CHARS = 1_500;
/** Media outputs kept per run (#310) — a run's clips and previews, not a
 * gallery. Later entries are dropped, so the first nodes to finish win. */
const MAX_MEDIA_ITEMS = 8;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RunProgressUpdate {
  phase: 'connecting' | 'running' | 'cancelling';
  /** Node currently reporting, when known. */
  nodeType?: string;
  nodeStatus?: string;
  /** Latest live progress payload from that node (training frames). */
  progress?: Record<string, unknown>;
  elapsedMs: number;
  completedNodes: number;
  totalNodes: number;
}

export interface RunGraphOutcome {
  status: 'complete' | 'error' | 'cancelled' | 'timeout' | 'detached';
  durationMs: number;
  runId?: string;
  /** True once an execute frame was dispatched. A pre-submit socket/bootstrap
   * failure must not invent an unidentified host-run reservation. */
  submitted?: boolean;
  /** An explicit host terminal frame, as distinct from transport cleanup. */
  terminalConfirmed?: boolean;
  /** For cancelled/timeout outcomes, true only when nothing was submitted or
   * the host acknowledged a terminal stop. False means local cleanup finished
   * without evidence that a server-owned run stopped. */
  cancelConfirmed?: boolean;
  error?: string;
  /** Terminal error message per failed node id. */
  nodeErrors: Record<string, string>;
  /** Nodes that reached a terminal status. */
  completedNodes: number;
  totalNodes: number;
  /** Scalar/string port values keyed `NodeType.port` (unique types) or
   * `nodeId.port`. Model entries surface as `<key>.params`. */
  outputs: Record<string, number | string>;
  /** Flattened last progress payload per node, keyed `<node key>.<field>`. */
  finalProgress: Record<string, number | string>;
  /** Metric-event series tails: name -> last value. */
  metrics: Record<string, number>;
  /** Tail of log/text output (Print nodes etc.), oldest lines dropped. */
  textTail: string;
  /** Renderable media the run produced (#310): video references (played by
   * the panel via their same-origin /api/media URL) and small inline image
   * previews. The tool result forwards references only, never bytes. */
  media: RunMediaItem[];
}

export interface RunMediaItem extends MediaOutput {
  /** Node key (`NodeType` when unique, else node id) that produced it. */
  node: string;
}

export interface RunLiveGraphOptions {
  /** Browser observation/agent turn signal. Passive teardown stops following
   * submitted server-owned runs; other aborts explicitly cancel execution. */
  signal?: AbortSignal;
  /** Independent explicit Stop, allowing cancellation during passive late-ID
   * cleanup after the observation signal's immutable reason was already set. */
  cancelSignal?: AbortSignal;
  timeoutMs: number;
  /** Current hosts own runs after submission; legacy 1.3.0 sockets own them. */
  serverOwnedRuns: boolean;
  /** Run-level compute device (what nodes with device='auto' follow). When
   * omitted the host default from /api/system/devices is used; without that
   * endpoint the field is left off the wire and the host's own fallback
   * applies. */
  device?: string;
  /** Approval-bound payload copied before bootstrap awaits; never replaced by
   * a fresh canvas read after the user approved it. */
  approvedGraph?: SerializedGraph;
  /** Synchronous approval/abort guard after bootstrap and at socket open,
   * immediately before sending execute. A failure refuses submission. */
  beforeExecute?: () => void;
  onProgress?: (update: RunProgressUpdate) => void;
  /** Called once, the first time the host names the run id — early enough to
   * persist a reattach pointer before any long training epoch begins. */
  onRunId?: (runId: string) => void;
}

/** The host's preferred compute device, or undefined when the endpoint is
 * unavailable (older hosts). The editor's own Run submits its global device
 * selector; the plugin mirrors the same source of truth. Without this, an
 * execute submission defaults to CPU on current hosts — which silently
 * turned a 200M-parameter GPU training run into a CPU crawl. */
export async function fetchDefaultDevice(
  api: CodefyUIPluginAPI,
  signal?: AbortSignal,
): Promise<string | undefined> {
  throwIfAborted(signal);
  try {
    const response = await awaitWithSignal(api.http.fetch('/api/system/devices', { signal }), signal);
    throwIfAborted(signal);
    if (!response.ok) return undefined;
    const body = await awaitWithSignal(response.json(), signal) as { default?: unknown };
    throwIfAborted(signal);
    return typeof body.default === 'string' && body.default ? body.default : undefined;
  } catch (error) {
    throwIfAborted(signal);
    if (isAbortError(error)) throw error;
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Status-line formatting (composer bar)
// ---------------------------------------------------------------------------

/** One-line human status for the composer bar while a run streams. */
export function formatRunStatusLine(update: RunProgressUpdate): string {
  if (update.phase === 'connecting') return 'Starting graph run…';
  if (update.phase === 'cancelling') return 'Cancelling run…';
  const parts: string[] = [
    `Running graph ${update.completedNodes}/${update.totalNodes}`,
  ];
  if (update.nodeType) parts.push(update.nodeType);
  const progress = update.progress ?? {};
  const shown: string[] = [];
  const formatNumber = (value: number): string =>
    Number.isInteger(value) ? String(value) : value.toFixed(4);
  for (const field of ['epoch', 'step', 'loss', 'val_loss']) {
    const value = progress[field];
    if (typeof value === 'number' && Number.isFinite(value)) {
      shown.push(`${field} ${formatNumber(value)}`);
    }
  }
  if (shown.length === 0) {
    for (const [field, raw] of Object.entries(progress)) {
      if (shown.length >= 2) break;
      if (field === 'event') continue;
      if (typeof raw === 'number' && Number.isFinite(raw)) {
        shown.push(`${field} ${formatNumber(raw)}`);
      }
    }
  }
  parts.push(...shown);
  return parts.join(' · ');
}

// ---------------------------------------------------------------------------
// Node-key resolution (same convention as experiment metrics: the bare node
// type when it is unique in the graph, otherwise the node id)
// ---------------------------------------------------------------------------

function nodeKeyResolver(graph: SerializedGraph): (nodeId: string) => string {
  const typeById = new Map<string, string>();
  const typeCounts = new Map<string, number>();
  for (const node of graph.nodes) {
    const type = typeof node.type === 'string' ? node.type : '';
    if (!type) continue;
    typeById.set(node.id, type);
    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
  }
  return (nodeId: string) => {
    const type = typeById.get(nodeId);
    return type && typeCounts.get(type) === 1 ? type : nodeId;
  };
}

function capEntries<T extends number | string>(
  record: Record<string, T>,
): Record<string, T> {
  const keys = Object.keys(record);
  if (keys.length <= MAX_RESULT_ENTRIES) return record;
  const capped: Record<string, T> = {};
  for (const key of keys.slice(0, MAX_RESULT_ENTRIES)) capped[key] = record[key];
  return capped;
}

// ---------------------------------------------------------------------------
// runLiveGraph
// ---------------------------------------------------------------------------

/** Terminal node statuses (current hosts also emit "cached"/"interrupted"). */
export const TERMINAL_NODE_STATUSES = new Set([
  'completed', 'cached', 'error', 'interrupted',
]);

export async function runLiveGraph(
  api: CodefyUIPluginAPI,
  opts: RunLiveGraphOptions,
): Promise<RunGraphOutcome> {
  const { signal, cancelSignal, timeoutMs, onProgress } = opts;
  // Snapshot before the first await: host getGraph may return mutable state.
  const approvedGraph = opts.approvedGraph === undefined ? undefined : structuredClone(opts.approvedGraph);
  const startedAt = Date.now();
  const emptyCancelledOutcome = (): RunGraphOutcome => ({
    status: 'cancelled', submitted: false, cancelConfirmed: true, durationMs: Date.now() - startedAt,
    nodeErrors: {}, completedNodes: 0, totalNodes: 0,
    outputs: {}, finalProgress: {}, metrics: {}, textTail: '', media: [],
  });
  const assertObserving = (): void => {
    throwIfAborted(signal);
    throwIfAborted(cancelSignal);
  };
  let device: string | undefined;
  let token: string;
  try {
    assertObserving();
    device = opts.device ?? await awaitWithSignal(fetchDefaultDevice(api, signal), cancelSignal);
    assertObserving();
    token = await awaitWithSignal(executionToken(api, signal), cancelSignal);
    assertObserving();
    opts.beforeExecute?.();
    assertObserving();
  } catch (error) {
    if (!signal?.aborted && !cancelSignal?.aborted && !isAbortError(error)) throw error;
    // Pre-submit Stop is authoritative: there is no host job to detach/cancel.
    return emptyCancelledOutcome();
  }
  const graph = executableGraph(approvedGraph ?? api.graph.getGraph());
  const keyFor = nodeKeyResolver(graph);
  const totalNodes = graph.nodes.length;

  return new Promise<RunGraphOutcome>((resolve, reject) => {
    const socket = new WebSocket(executionUrl(token));

    const outputs: Record<string, number | string> = {};
    const finalProgress: Record<string, number | string> = {};
    const metrics: Record<string, number> = {};
    const nodeErrors: Record<string, string> = {};
    const terminalNodes = new Set<string>();
    const texts: string[] = [];
    const media: RunMediaItem[] = [];
    let runId: string | undefined;
    let settled = false;
    let cancelRequested = false;
    let passiveDetachRequested = false;
    let detachTimer: number | undefined;
    let cancelTimer: number | undefined;
    let executeSent = false;
    let cancelConfirmed = false;
    let terminalConfirmed = false;

    const finish = (
      status: RunGraphOutcome['status'],
      error?: string,
    ): void => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (cancelTimer !== undefined) window.clearTimeout(cancelTimer);
      if (detachTimer !== undefined) window.clearTimeout(detachTimer);
      signal?.removeEventListener('abort', onAbort);
      cancelSignal?.removeEventListener('abort', onExplicitCancel);
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
      const stopping = status === 'cancelled' || status === 'timeout';
      const confirmed = !executeSent || cancelConfirmed;
      if (stopping && !confirmed) error = `${error ? `${error} ` : ''}Host termination is unconfirmed; the run may still be running. Reattach to inspect it.`;
      const textTail = texts.join('\n').slice(-MAX_TEXT_TAIL_CHARS);
      resolve({
        status,
        submitted: executeSent,
        ...(terminalConfirmed ? { terminalConfirmed: true } : {}),
        ...(stopping ? { cancelConfirmed: confirmed } : {}),
        durationMs: Date.now() - startedAt,
        runId,
        ...(error ? { error: scrubExecutionCredential(error, token) } : {}),
        nodeErrors,
        completedNodes: terminalNodes.size,
        totalNodes,
        outputs: capEntries(outputs),
        finalProgress: capEntries(finalProgress),
        metrics: capEntries(metrics),
        textTail,
        media,
      });
    };

    /** Ask the host to stop, then force-close after a grace period. On
     * current hosts the cancel action is the only true stop; on 1.3.0 the
     * close is. `finalStatus` names why we are stopping. */
    const requestCancel = (finalStatus: 'cancelled' | 'timeout'): void => {
      if (settled) return;
      if (cancelRequested) return;
      cancelRequested = true;
      // An explicit Stop/timeout supersedes passive identity waiting. A late ID
      // must now be followed by the normal terminal acknowledgement handshake.
      passiveDetachRequested = false;
      if (detachTimer !== undefined) window.clearTimeout(detachTimer);
      // Nothing was submitted yet (still fetching the token / connecting):
      // there is no server-side run to stop, so finish immediately instead
      // of waiting out the cancel grace for an acknowledgement that cannot
      // come.
      if (!executeSent) {
        pendingCancelStatus = finalStatus;
        finish(finalStatus);
        return;
      }
      observe(() => onProgress?.({
        phase: 'cancelling',
        elapsedMs: Date.now() - startedAt,
        completedNodes: terminalNodes.size,
        totalNodes,
      }));
      // Arm grace BEFORE send: a synchronous terminal acknowledgement must
      // clear it, not leave a late cleanup timer behind.
      pendingCancelStatus = finalStatus;
      cancelTimer = window.setTimeout(
        () => finish(finalStatus, finalStatus === 'timeout'
          ? `Run timed out after ${Math.round(timeoutMs / 60_000)} minutes; cancellation was requested.`
          : undefined),
        CANCEL_GRACE_MS,
      );
      try {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(
            runId ? { action: 'cancel', run_id: runId } : { action: 'cancel' },
          ));
        }
      } catch {
        // Socket already going away — the close below still stops 1.3.0 runs.
      }
    };

    let pendingCancelStatus: 'cancelled' | 'timeout' = 'cancelled';
    const requestPassiveDetach = (): void => {
      if (settled || cancelRequested || passiveDetachRequested) return;
      if (!opts.serverOwnedRuns || !executeSent) {
        requestCancel('cancelled');
        return;
      }
      passiveDetachRequested = true;
      if (runId !== undefined) { finish('detached'); return; }
      // Keep the connection only long enough to recover a reattach identity.
      // Expiry is unknown host state, never an invented cancellation/finish.
      detachTimer = window.setTimeout(() => finish('detached',
        'The host submission may still be running, but its run ID was not received. Inspect host runs before releasing the reservation.'), DETACH_ID_GRACE_MS);
    };
    const onAbort = () => {
      if (isPassiveDetach(signal) && !cancelSignal?.aborted) requestPassiveDetach();
      else requestCancel('cancelled');
    };
    const onExplicitCancel = () => requestCancel('cancelled');
    const timer = window.setTimeout(() => requestCancel('timeout'), timeoutMs);

    signal?.addEventListener('abort', onAbort, { once: true });
    cancelSignal?.addEventListener('abort', onExplicitCancel, { once: true });
    if (signal?.aborted || cancelSignal?.aborted) {
      requestCancel('cancelled');
      return;
    }

    observe(() => onProgress?.({
      phase: 'connecting',
      elapsedMs: 0,
      completedNodes: 0,
      totalNodes,
    }));

    socket.onopen = () => {
      if (settled || cancelRequested || signal?.aborted || cancelSignal?.aborted) return;
      try {
        opts.beforeExecute?.();
        assertObserving();
      } catch (error) {
        if (signal?.aborted || cancelSignal?.aborted || isAbortError(error)) { finish('cancelled'); return; }
        // Approval became stale while connecting: no execute frame was sent.
        settled = true;
        window.clearTimeout(timer);
        if (cancelTimer !== undefined) window.clearTimeout(cancelTimer);
        if (detachTimer !== undefined) window.clearTimeout(detachTimer);
        signal?.removeEventListener('abort', onAbort);
        cancelSignal?.removeEventListener('abort', onExplicitCancel);
        socket.close();
        reject(error);
        return;
      }
      if (settled || cancelRequested) return;
      executeSent = true;
      try { socket.send(JSON.stringify({
        action: 'execute',
        nodes: graph.nodes,
        edges: graph.edges,
        presets: graph.presets ?? [],
        record_outputs: false,
        weights_persistent: true,
        ...(device ? { device } : {}),
      })); } catch (error) { finish('error', String(error)); }
    };

    socket.onmessage = (event) => {
      if (settled) return;
      let message: Record<string, unknown>;
      try {
        message = JSON.parse(String(event.data)) as Record<string, unknown>;
      } catch {
        return;
      }
      if (!message || typeof message !== 'object') return;
      const type = String(message.type ?? '');
      if (runId === undefined && typeof message.run_id === 'string' && message.run_id) {
        runId = message.run_id;
        // Persist identity BEFORE passive completion; the browser signal may
        // already be aborted, but this is ownership evidence, not new work.
        observe(() => opts.onRunId?.(runId!));
      }
      if (settled) return;
      const terminalFrame = type === 'execution_complete' || type === 'execution_stopped' ||
        type === 'execution_error' || type === 'error' || message.rejected === true;
      if (terminalFrame) terminalConfirmed = true;
      // A terminal frame carrying the first ID is real evidence, not a live
      // detached run. Otherwise hand off only after ownership was persisted.
      if (passiveDetachRequested && runId !== undefined && !terminalFrame) {
        finish('detached');
        return;
      }

      if (message.rejected === true) {
        finish('error', String(message.error ?? 'The host rejected the run request.'));
        return;
      }

      if (type === 'node_status') {
        const nodeId = String(message.node_id ?? '');
        const status = String(message.status ?? '');
        const key = keyFor(nodeId);
        const normalized = normalizeNodeStatus(message);

        if (TERMINAL_NODE_STATUSES.has(status)) terminalNodes.add(nodeId);
        if (status === 'error') {
          nodeErrors[key] = scrubExecutionCredential(
            String(message.error ?? 'node failed'), token,
          );
        }
        for (const [port, value] of Object.entries(normalized.scalars)) {
          outputs[`${key}.${port}`] = value;
        }
        for (const [port, value] of Object.entries(normalized.strings)) {
          outputs[`${key}.${port}`] = value;
        }
        for (const [port, value] of Object.entries(normalized.modelParams)) {
          outputs[`${key}.${port}.params`] = value;
        }
        for (const text of normalized.texts) texts.push(text);
        for (const item of normalized.media) {
          if (media.length >= MAX_MEDIA_ITEMS) break;
          media.push({ node: key, ...item });
        }
        if (normalized.progress) {
          for (const [field, raw] of Object.entries(normalized.progress)) {
            const num = finiteNumber(raw);
            if (num !== undefined) {
              finalProgress[`${key}.${field}`] = num;
            } else if (typeof raw === 'string' && raw.length <= 80) {
              finalProgress[`${key}.${field}`] = raw;
            }
          }
        }
        observe(() => onProgress?.({
          phase: 'running',
          nodeType: key,
          nodeStatus: status,
          ...(normalized.progress ? { progress: normalized.progress } : {}),
          elapsedMs: Date.now() - startedAt,
          completedNodes: terminalNodes.size,
          totalNodes,
        }));
      } else if (type === 'metric') {
        const points = Array.isArray(message.points) ? message.points : [];
        for (const rawPoint of points) {
          if (!rawPoint || typeof rawPoint !== 'object') continue;
          const point = rawPoint as Record<string, unknown>;
          const name = typeof point.name === 'string' ? point.name : '';
          const value = finiteNumber(point.value);
          if (name && value !== undefined) metrics[name] = value;
        }
      } else if (type === 'execution_complete') {
        finish('complete');
      } else if (type === 'execution_stopped') {
        cancelConfirmed = true;
        finish(pendingCancelStatus, cancelRequested
          ? undefined
          : `Run stopped by the host (${String(message.reason ?? 'stopped')}).`);
      } else if (type === 'execution_error' || type === 'error') {
        finish('error', String(message.error ?? type));
      }
    };

    socket.onerror = () => finish(passiveDetachRequested ? 'detached' : cancelRequested ? pendingCancelStatus : 'error', 'Execution WebSocket failed.');
    socket.onclose = () => {
      if (!settled) {
        finish(
          passiveDetachRequested ? 'detached' : cancelRequested ? pendingCancelStatus : 'error',
          cancelRequested
            ? undefined
            : 'Execution WebSocket closed before the run completed.',
        );
      }
    };
  });
}
