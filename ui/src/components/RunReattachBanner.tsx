/**
 * RunReattachBanner — offers to reattach to a graph run left behind by a
 * reload (#22). runPointer's pointer survives the reload; this banner
 * probes whether the host still knows about that run, follows it to
 * completion if it is still live, and reports the outcome either way.
 *
 * Purely a reload-recovery path: the in-tab live experience during an
 * active chat turn (composer sparkline, loop.ts's own pointer lifecycle) is
 * a separate concern. This banner only acts on a pointer left by a *past*
 * session — never one the current turn just wrote.
 */

import React, { useEffect, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import {
  cancelRunById,
  fetchRun,
  followRun,
  isTerminalRunStatus,
  probeRunHistory,
} from '../agent/runHistory';
import type { RunRow } from '../agent/runHistory';
import { clearActiveRun, readActiveRun } from '../agent/runPointer';
import { RunSparkline, SPARKLINE_MAX_POINTS } from './RunSparkline';
import { notifyRunFinished } from './notify';

export interface RunReattachBannerProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  /** Prefill the composer with a message (never auto-sends). */
  onAskAgent: (text: string) => void;
}

type BannerState =
  | { kind: 'hidden' }
  | {
      kind: 'live';
      runId: string;
      reason: string;
      statusText: string;
      lossSeries: number[];
      connectionLost: boolean;
    }
  | { kind: 'finished'; runId: string; reason: string; row: RunRow };

// ---------------------------------------------------------------------------
// metricsSummary — up to 3 final metrics + a short duration, one line
// ---------------------------------------------------------------------------

export function metricsSummary(row: RunRow): string {
  const parts: string[] = [];
  for (const [name, value] of Object.entries(row.finalMetrics).slice(0, 3)) {
    parts.push(`${name} ${Number.isInteger(value) ? value : value.toFixed(4)}`);
  }
  if (row.durationS !== null) {
    parts.push(row.durationS < 90 ? `${row.durationS}s` : `${Math.round(row.durationS / 60)} min`);
  }
  return parts.join(' · ');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RunReattachBanner({ api, settings, onAskAgent }: RunReattachBannerProps): React.JSX.Element | null {
  const [state, setState] = useState<BannerState>({ kind: 'hidden' });
  const [stopping, setStopping] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const pointer = readActiveRun(api);
    if (!pointer) {
      setState({ kind: 'hidden' });
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const available = await probeRunHistory(api, controller.signal);
        if (controller.signal.aborted) return;
        if (!available) {
          clearActiveRun(api, pointer.runId);
          setState({ kind: 'hidden' });
          return;
        }

        const row = await fetchRun(api, pointer.runId, controller.signal);
        if (controller.signal.aborted) return;
        if (!row) {
          clearActiveRun(api, pointer.runId);
          setState({ kind: 'hidden' });
          return;
        }

        if (isTerminalRunStatus(row.status)) {
          setState({ kind: 'finished', runId: pointer.runId, reason: pointer.reason, row });
          return;
        }

        setState({
          kind: 'live',
          runId: pointer.runId,
          reason: pointer.reason,
          statusText: row.status || 'running',
          lossSeries: [],
          connectionLost: false,
        });

        const outcome = await followRun(api, {
          runId: pointer.runId,
          // Resume at the row's last cursor: replaying a long run's whole
          // event log would hammer the host for state the row already
          // summarizes.
          fromCursor: row.lastCursor ?? 0,
          signal: controller.signal,
          onUpdate: (update) => {
            setState((prev) => {
              if (prev.kind !== 'live') return prev;
              const lossSeries = update.lossPoint !== undefined
                ? [...prev.lossSeries, update.lossPoint].slice(-SPARKLINE_MAX_POINTS)
                : prev.lossSeries;
              const parts = [update.runStatus || 'running'];
              if (update.nodeId && update.nodeStatus) parts.push(`${update.nodeId} ${update.nodeStatus}`);
              if (update.lossPoint !== undefined) parts.push(`loss ${update.lossPoint.toFixed(4)}`);
              if (update.completedNodes > 0) parts.push(`${update.completedNodes} nodes done`);
              return {
                ...prev,
                lossSeries,
                statusText: parts.join(' · '),
                connectionLost: update.connectionLost,
              };
            });
          },
        });

        if (outcome.aborted) return;
        if (!outcome.row) {
          clearActiveRun(api, pointer.runId);
          setState({ kind: 'hidden' });
          return;
        }

        setState({ kind: 'finished', runId: pointer.runId, reason: pointer.reason, row: outcome.row });
        notifyRunFinished(settingsRef.current, {
          runId: pointer.runId,
          status: outcome.row.status,
          detail: metricsSummary(outcome.row),
        });
      } catch {
        // Network hiccup on the initial probe/fetch: give up quietly rather
        // than crash the host panel. The pointer is left in place so the
        // next mount tries again.
        if (!controller.signal.aborted) setState({ kind: 'hidden' });
      }
    })();

    return () => {
      controller.abort();
    };
  }, [api]);

  const handleStop = () => {
    if (state.kind !== 'live') return;
    setStopping(true);
    void cancelRunById(api, state.runId).then((ok) => {
      if (!ok) setStopping(false);
    });
  };

  const handleDismiss = () => {
    if (state.kind === 'hidden') return;
    if (state.kind === 'live') abortRef.current?.abort();
    clearActiveRun(api, state.runId);
    setState({ kind: 'hidden' });
  };

  const handleAskAgent = () => {
    if (state.kind !== 'finished') return;
    onAskAgent(`Summarize run ${state.runId} with get_run and report its metrics exactly.`);
    clearActiveRun(api, state.runId);
    setState({ kind: 'hidden' });
  };

  if (state.kind === 'hidden') return null;

  return (
    <div className="gcp-reattach" role="status" aria-label="Background graph run">
      <div className="gcp-reattach-body">
        <div className="gcp-reattach-title">
          {state.kind === 'live'
            ? 'Run in progress (reattached)'
            : `Run ${state.row.status} while you were away`}
        </div>
        <div className="gcp-reattach-detail">
          {state.kind === 'live'
            ? `${state.connectionLost ? 'Connection lost — retrying… · ' : ''}${state.statusText}`
            : (metricsSummary(state.row) || state.row.error || 'No recorded metrics.')}
          {state.reason ? <span className="gcp-reattach-reason"> — {state.reason}</span> : null}
        </div>
        {state.kind === 'live' && state.lossSeries.length >= 2 && (
          <RunSparkline series={state.lossSeries} />
        )}
      </div>
      <div className="gcp-reattach-actions">
        {state.kind === 'live' && (
          <button
            className="gcp-reattach-btn gcp-reattach-stop"
            disabled={stopping}
            onClick={handleStop}
          >
            {stopping ? 'Stopping…' : 'Stop run'}
          </button>
        )}
        {state.kind === 'finished' && (
          <button className="gcp-reattach-btn" onClick={handleAskAgent}>
            Ask the agent to summarize
          </button>
        )}
        <button
          className="gcp-reattach-btn gcp-reattach-dismiss"
          onClick={handleDismiss}
          {...(state.kind === 'live'
            ? { title: 'Stop watching. The run keeps running on the host.' }
            : {})}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
