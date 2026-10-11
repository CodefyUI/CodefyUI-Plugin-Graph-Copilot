/**
 * runHistory — read-only REST adapter over the host's server-owned run
 * surface (/api/runs, current CodefyUI main; absent on 1.3.0, where runs
 * die with their socket). Feature-detect with probeRunHistory before use.
 * Deliberately REST-only: contract v3 api.runs/api.events add a second
 * path for the same reads and no replay cursor (decision on issue #22).
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';
import { lossFromProgress, normalizeNodeStatus } from './wireOutputs';
import { TERMINAL_NODE_STATUSES } from './runGraph';

type HttpApi = Pick<CodefyUIPluginAPI, 'http'>;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const ACTIVE_RUN_STATUSES: ReadonlySet<string> = new Set(['queued', 'running']);

export interface RunRow {
  runId: string;
  name: string | null;
  status: string;
  active: boolean;
  queuePosition: number | null;
  createdAt: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  error: string | null;
  finalMetrics: Record<string, number>;
  lastCursor: number | null;
  durationS: number | null;
}

export interface RunArtifact {
  kind: string;
  path: string;
  createdAt: string | null;
}

export function isTerminalRunStatus(status: string): boolean {
  return status !== '' && !ACTIVE_RUN_STATUSES.has(status);
}

// ---------------------------------------------------------------------------
// Probe caching
// ---------------------------------------------------------------------------

let probedAvailable = false;

export function resetRunHistoryProbeForTests(): void {
  probedAvailable = false;
}

/** True when the host exposes /api/runs. Success is cached for the session;
 * failure is NOT cached (a mid-session backend restart must be recoverable). */
export async function probeRunHistory(api: HttpApi, signal?: AbortSignal): Promise<boolean> {
  if (probedAvailable) return true;
  try {
    const response = await api.http.fetch('/api/runs?limit=1', { signal });
    if (response.ok) {
      probedAvailable = true;
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Cast value to a record if it looks like an object. */
function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Extract optional string value, null if absent or not a string. */
function optionalString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

/** Finite number value or null. */
function finiteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

// ---------------------------------------------------------------------------
// Parse run row from raw payload
// ---------------------------------------------------------------------------

export function parseRunRow(raw: unknown): RunRow | null {
  const row = asRecord(raw);
  if (!row) return null;

  const id = optionalString(row.id);
  const status = optionalString(row.status);
  if (!id || !status) return null;

  const startedAtStr = optionalString(row.started_at);
  const finishedAtStr = optionalString(row.finished_at);

  let durationS: number | null = null;
  if (startedAtStr && finishedAtStr) {
    const startMs = Date.parse(startedAtStr);
    const finishMs = Date.parse(finishedAtStr);
    if (Number.isFinite(startMs) && Number.isFinite(finishMs)) {
      const diff = Math.round((finishMs - startMs) / 1000);
      if (diff >= 0) durationS = diff;
    }
  }

  const finalMetricsRaw = asRecord(row.final_metrics);
  const finalMetrics: Record<string, number> = {};
  if (finalMetricsRaw) {
    for (const [key, value] of Object.entries(finalMetricsRaw)) {
      const num = finiteNumber(value);
      if (num !== null) finalMetrics[key] = num;
    }
  }

  return {
    runId: id,
    name: optionalString(row.name),
    status,
    active: row.active === true,
    queuePosition: finiteNumber(row.queue_position),
    createdAt: optionalString(row.created_at),
    startedAt: startedAtStr,
    finishedAt: finishedAtStr,
    error: optionalString(row.error),
    finalMetrics,
    lastCursor: finiteNumber(row.last_cursor),
    durationS,
  };
}

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

export async function fetchRunList(
  api: HttpApi,
  opts?: { limit?: number; signal?: AbortSignal },
): Promise<{ runs: RunRow[]; total: number }> {
  let limit = opts?.limit ?? 10;
  if (limit < 1) limit = 1;
  if (limit > 50) limit = 50;

  const url = `/api/runs?limit=${limit}`;
  const response = await api.http.fetch(url, { signal: opts?.signal });

  if (!response.ok) {
    throw new Error(`run list failed: HTTP ${response.status}`);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error(`run list failed: HTTP ${response.status}`);
  }

  const payload = asRecord(json);
  if (!payload) throw new Error(`run list failed: HTTP ${response.status}`);

  const runsList = Array.isArray(payload.runs) ? payload.runs : [];
  const runs: RunRow[] = [];
  for (const rawRun of runsList) {
    const parsed = parseRunRow(rawRun);
    if (parsed) runs.push(parsed);
  }

  const total = finiteNumber(payload.total);
  return {
    runs,
    total: total !== null ? total : runs.length,
  };
}

export async function fetchRun(
  api: HttpApi,
  runId: string,
  signal?: AbortSignal,
): Promise<RunRow | null> {
  const url = `/api/runs/${encodeURIComponent(runId)}`;
  const response = await api.http.fetch(url, { signal });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`fetch run failed: HTTP ${response.status}`);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error(`fetch run failed: HTTP ${response.status}`);
  }

  return parseRunRow(json);
}

export async function fetchRunArtifacts(
  api: HttpApi,
  runId: string,
  signal?: AbortSignal,
): Promise<RunArtifact[]> {
  try {
    const url = `/api/runs/${encodeURIComponent(runId)}/artifacts`;
    const response = await api.http.fetch(url, { signal });

    if (!response.ok) return [];

    let json: unknown;
    try {
      json = await response.json();
    } catch {
      return [];
    }

    const payload = asRecord(json);
    if (!payload) return [];

    const artifactsList = Array.isArray(payload.artifacts) ? payload.artifacts : [];
    const artifacts: RunArtifact[] = [];
    for (const rawArtifact of artifactsList) {
      const artifact = asRecord(rawArtifact);
      if (!artifact) continue;

      const kind = optionalString(artifact.kind);
      const path = optionalString(artifact.path);
      if (!kind || !path) continue;

      artifacts.push({
        kind,
        path,
        createdAt: optionalString(artifact.created_at),
      });
    }

    return artifacts;
  } catch {
    return [];
  }
}

export async function cancelRunById(api: HttpApi, runId: string): Promise<boolean> {
  try {
    const url = `/api/runs/${encodeURIComponent(runId)}/cancel`;
    const response = await api.http.fetch(url, { method: 'POST' });
    return response.ok;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// followRun — cursor replay + long-poll follower
// ---------------------------------------------------------------------------

export interface FollowUpdate {
  runStatus: string;
  nodeId?: string;
  nodeStatus?: string;
  progress?: Record<string, unknown> | null;
  lossPoint?: number;
  completedNodes: number;
  connectionLost: boolean;
}

export interface FollowOutcome {
  status: string;
  row: RunRow | null;
  aborted: boolean;
}

/** setTimeout wrapped as a Promise that also resolves (early) on abort. */
function abortableDelay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(done, ms);
    function done(): void {
      signal?.removeEventListener('abort', done);
      clearTimeout(timer);
      resolve();
    }
    signal?.addEventListener('abort', done, { once: true });
  });
}

/**
 * Replay a run's event log from `fromCursor` (default 0) via the host's
 * long-poll events endpoint, then keep polling until the run reaches a
 * terminal status AND a page comes back empty (the drained tail — a
 * terminal status alone is not enough, in-flight events may still be on
 * their way). `waitS` rides the long poll for free during replay: the host
 * returns immediately whenever events exist, so a constant wait costs
 * nothing until the caller is actually caught up.
 *
 * Transient fetch failures (network blips) are retried with capped
 * exponential backoff rather than surfaced as an error — `onUpdate` fires
 * once per failure with `connectionLost: true` so the UI can show a
 * reconnecting state. A 404 (run deleted mid-follow) and an aborted signal
 * both end the loop immediately rather than retrying.
 */
export async function followRun(
  api: HttpApi,
  opts: {
    runId: string;
    fromCursor?: number;
    onUpdate?: (update: FollowUpdate) => void;
    signal?: AbortSignal;
    waitS?: number;
    retryDelayMs?: number;
  },
): Promise<FollowOutcome> {
  const { runId, onUpdate, signal } = opts;
  const waitS = opts.waitS ?? 25;
  const retryDelayMs = opts.retryDelayMs ?? 1000;
  let cursor = opts.fromCursor ?? 0;
  let lastStatus = '';
  let failures = 0;
  const terminalNodes = new Set<string>();

  while (true) {
    if (signal?.aborted) return { status: lastStatus, row: null, aborted: true };
    let page: Record<string, unknown>;
    try {
      const response = await api.http.fetch(
        `/api/runs/${encodeURIComponent(runId)}/events?cursor=${cursor}&wait=${waitS}&limit=500`,
        { signal },
      );
      if (response.status === 404) return { status: lastStatus, row: null, aborted: false };
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      page = asRecord(await response.json()) ?? {};
      failures = 0;
    } catch {
      if (signal?.aborted) return { status: lastStatus, row: null, aborted: true };
      failures += 1;
      onUpdate?.({ runStatus: lastStatus, completedNodes: terminalNodes.size, connectionLost: true });
      await abortableDelay(Math.min(retryDelayMs * 2 ** Math.min(failures - 1, 3), 8 * retryDelayMs), signal);
      continue;
    }

    if (typeof page.status === 'string' && page.status) lastStatus = page.status;
    const events = Array.isArray(page.events) ? page.events : [];
    for (const rawEvent of events) {
      const event = asRecord(rawEvent);
      if (!event || event.type !== 'node_status') continue;
      const payload = asRecord(event.payload) ?? {};
      const nodeId = typeof payload.node_id === 'string' ? payload.node_id : '';
      const nodeStatus = typeof payload.status === 'string' ? payload.status : '';
      if (nodeId && TERMINAL_NODE_STATUSES.has(nodeStatus)) terminalNodes.add(nodeId);
      const normalized = normalizeNodeStatus(payload);
      const lossPoint = lossFromProgress(normalized.progress);
      onUpdate?.({
        runStatus: lastStatus,
        ...(nodeId ? { nodeId } : {}),
        ...(nodeStatus ? { nodeStatus } : {}),
        progress: normalized.progress,
        ...(lossPoint !== undefined ? { lossPoint } : {}),
        completedNodes: terminalNodes.size,
        connectionLost: false,
      });
    }
    if (typeof page.cursor === 'number') cursor = page.cursor;
    if (isTerminalRunStatus(lastStatus) && events.length === 0) break;
  }

  let row: RunRow | null = null;
  try {
    row = await fetchRun(api, runId, signal);
  } catch {
    row = null;
  }
  if (signal?.aborted) return { status: lastStatus, row: null, aborted: true };
  return { status: row?.status ?? lastStatus, row, aborted: false };
}
