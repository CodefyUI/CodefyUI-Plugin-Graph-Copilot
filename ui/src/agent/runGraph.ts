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
 * cancels). Cancellation therefore sends an explicit cancel action first and
 * then closes the socket — both generations stop either way.
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

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default wall-clock cap for one live run (minutes). Training runs are long;
 * this is a safety net, not a budget. */
export const DEFAULT_RUN_TIMEOUT_MINUTES = 360;
export const MAX_RUN_TIMEOUT_MINUTES = 720;

/** Grace period after a cancel request before the socket is force-closed. */
const CANCEL_GRACE_MS = 5_000;

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
  signal?: AbortSignal;
  timeoutMs: number;
  /** Current hosts own runs after submission; legacy 1.3.0 sockets own them. */
  serverOwnedRuns: boolean;
  /** Run-level compute device (what nodes with device='auto' follow). When
   * omitted the host default from /api/system/devices is used; without that
   * endpoint the field is left off the wire and the host's own fallback
   * applies. */
  device?: string;
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
  try {
    const response = await api.http.fetch('/api/system/devices', { signal });
    if (!response.ok) return undefined;
    const body = await response.json() as { default?: unknown };
    return typeof body.default === 'string' && body.default ? body.default : undefined;
  } catch {
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
  const { signal, timeoutMs, onProgress } = opts;
  const graph = executableGraph(api.graph.getGraph());
  const keyFor = nodeKeyResolver(graph);
  const totalNodes = graph.nodes.length;
  const startedAt = Date.now();
  const emptyCancelledOutcome = (): RunGraphOutcome => ({
    status: 'cancelled',
    durationMs: Date.now() - startedAt,
    nodeErrors: {},
    completedNodes: 0,
    totalNodes,
    outputs: {},
    finalProgress: {},
    metrics: {},
    textTail: '',
    media: [],
  });

  if (signal?.aborted) return emptyCancelledOutcome();

  let device: string | undefined;
  let token: string;
  try {
    device = opts.device ?? await fetchDefaultDevice(api, signal);
    token = await executionToken(api, signal);
  } catch (error) {
    if (signal?.aborted) return emptyCancelledOutcome();
    throw error;
  }
  if (signal?.aborted) return emptyCancelledOutcome();

  return new Promise<RunGraphOutcome>((resolve) => {
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
    let cancelTimer: number | undefined;
    let executeSent = false;

    const finish = (
      status: RunGraphOutcome['status'],
      error?: string,
    ): void => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (cancelTimer !== undefined) window.clearTimeout(cancelTimer);
      signal?.removeEventListener('abort', onAbort);
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
      const textTail = texts.join('\n').slice(-MAX_TEXT_TAIL_CHARS);
      resolve({
        status,
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
      // Nothing was submitted yet (still fetching the token / connecting):
      // there is no server-side run to stop, so finish immediately instead
      // of waiting out the cancel grace for an acknowledgement that cannot
      // come.
      if (!executeSent) {
        pendingCancelStatus = finalStatus;
        finish(finalStatus);
        return;
      }
      onProgress?.({
        phase: 'cancelling',
        elapsedMs: Date.now() - startedAt,
        completedNodes: terminalNodes.size,
        totalNodes,
      });
      try {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(
            runId ? { action: 'cancel', run_id: runId } : { action: 'cancel' },
          ));
        }
      } catch {
        // Socket already going away — the close below still stops 1.3.0 runs.
      }
      cancelTimer = window.setTimeout(
        () => finish(finalStatus, finalStatus === 'timeout'
          ? `Run timed out after ${Math.round(timeoutMs / 60_000)} minutes and was cancelled.`
          : undefined),
        CANCEL_GRACE_MS,
      );
      // Remember why we are cancelling so the terminal frame maps correctly.
      pendingCancelStatus = finalStatus;
    };

    let pendingCancelStatus: 'cancelled' | 'timeout' = 'cancelled';
    const requestPassiveDetach = (): void => {
      if (settled) return;
      if (!opts.serverOwnedRuns || !executeSent) {
        requestCancel('cancelled');
        return;
      }
      passiveDetachRequested = true;
      if (runId !== undefined) finish('detached');
    };
    const onAbort = () => {
      if (isPassiveDetach(signal)) requestPassiveDetach();
      else requestCancel('cancelled');
    };
    const timer = window.setTimeout(() => requestCancel('timeout'), timeoutMs);

    signal?.addEventListener('abort', onAbort, { once: true });
    if (signal?.aborted) {
      finish('cancelled');
      return;
    }

    onProgress?.({
      phase: 'connecting',
      elapsedMs: 0,
      completedNodes: 0,
      totalNodes,
    });

    socket.onopen = () => {
      if (settled || cancelRequested) return;
      socket.send(JSON.stringify({
        action: 'execute',
        nodes: graph.nodes,
        edges: graph.edges,
        presets: graph.presets ?? [],
        record_outputs: false,
        weights_persistent: true,
        ...(device ? { device } : {}),
      }));
      executeSent = true;
    };

    socket.onmessage = (event) => {
      if (settled) return;
      let message: Record<string, unknown>;
      try {
        message = JSON.parse(String(event.data)) as Record<string, unknown>;
      } catch {
        return;
      }
      const type = String(message.type ?? '');
      if (typeof message.run_id === 'string' && message.run_id) {
        if (runId === undefined) opts.onRunId?.(message.run_id);
        runId = message.run_id;
        if (passiveDetachRequested) {
          finish('detached');
          return;
        }
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
        onProgress?.({
          phase: 'running',
          nodeType: key,
          nodeStatus: status,
          ...(normalized.progress ? { progress: normalized.progress } : {}),
          elapsedMs: Date.now() - startedAt,
          completedNodes: terminalNodes.size,
          totalNodes,
        });
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
        finish(pendingCancelStatus, cancelRequested
          ? undefined
          : `Run stopped by the host (${String(message.reason ?? 'stopped')}).`);
      } else if (type === 'execution_error' || type === 'error') {
        finish('error', String(message.error ?? type));
      }
    };

    socket.onerror = () => finish('error', 'Execution WebSocket failed.');
    socket.onclose = () => {
      if (!settled) {
        finish(
          cancelRequested ? pendingCancelStatus : 'error',
          cancelRequested
            ? undefined
            : 'Execution WebSocket closed before the run completed.',
        );
      }
    };
  });
}
