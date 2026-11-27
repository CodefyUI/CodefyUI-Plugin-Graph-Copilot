/** Recovery observer for a host run after its browser owner has settled. */
import React, { useEffect, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import {
  cancelRunById,
  fetchRunStrict,
  followRun,
  isTerminalRunStatus,
  probeRunHistoryStrict,
} from '../agent/runHistory';
import type { RunRow } from '../agent/runHistory';
import {
  clearActiveRun,
  clearUnidentifiedRun,
  readActiveRun,
  readUnidentifiedRun,
  type UnidentifiedRunPointer,
} from '../agent/runPointer';
import { RunSparkline, SPARKLINE_MAX_POINTS } from './RunSparkline';
import { notifyRunFinished } from './notify';
import { currentLocale, translate, useT } from '../i18n';
import { runStatusWord } from './runStatus';

export interface RunReattachBannerProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  /** Prefill the composer with a message (never auto-sends). */
  onAskAgent: (text: string) => void;
}

type BannerState =
  | { kind: 'hidden' }
  | { kind: 'unidentified'; pointer: UnidentifiedRunPointer; confirmingRelease: boolean }
  | { kind: 'unavailable'; runId: string; reason: string }
  | {
      kind: 'live';
      runId: string;
      reason: string;
      statusText: string;
      lossSeries: number[];
      connectionLost: boolean;
    }
  | { kind: 'finished'; runId: string; reason: string; row: RunRow };

type StopState = 'idle' | 'pending' | 'requested' | 'uncertain';

/** Up to three final metrics and a short duration. */
export function metricsSummary(row: RunRow): string {
  const parts: string[] = [];
  for (const [name, value] of Object.entries(row.finalMetrics).slice(0, 3)) {
    parts.push(`${name} ${Number.isInteger(value) ? value : value.toFixed(4)}`);
  }
  if (row.durationS !== null) {
    parts.push(translate(currentLocale(), row.durationS < 90 ? 'reattach.seconds' : 'reattach.minutes',
      { count: row.durationS < 90 ? row.durationS : Math.round(row.durationS / 60) }));
  }
  return parts.join(' · ');
}

export function RunReattachBanner({ api, settings, onAskAgent }: RunReattachBannerProps): React.JSX.Element | null {
  const [state, setState] = useState<BannerState>({ kind: 'hidden' });
  const t = useT();
  const [stopping, setStopping] = useState<StopState>('idle');
  const [observationGeneration, setObservationGeneration] = useState(0);
  const [checking, setChecking] = useState(false);
  const stopScopeRef = useRef<{ api: CodefyUIPluginAPI; runId: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    const isCurrent = () => abortRef.current === controller && !controller.signal.aborted;
    const pointer = readActiveRun(api);
    if (!pointer) {
      stopScopeRef.current = null;
      setStopping('idle');
      setChecking(false);
      const unidentified = readUnidentifiedRun(api);
      setState(unidentified
        ? { kind: 'unidentified', pointer: unidentified, confirmingRelease: false }
        : { kind: 'hidden' });
      return () => controller.abort();
    }
    const sameStopScope = stopScopeRef.current?.api === api && stopScopeRef.current.runId === pointer.runId;
    stopScopeRef.current = { api, runId: pointer.runId };
    if (!sameStopScope) setStopping('idle');
    setChecking(true);
    setState((previous) => sameStopScope && previous.kind === 'unavailable' && previous.runId === pointer.runId
      ? previous : { kind: 'hidden' });
    const unavailable = () => {
      if (!isCurrent()) return;
      setChecking(false);
      setState({ kind: 'unavailable', runId: pointer.runId, reason: pointer.reason });
    };
    const finish = (row: RunRow, notify: boolean) => {
      if (!isCurrent()) return;
      clearActiveRun(api, pointer.runId);
      setState({ kind: 'finished', runId: pointer.runId, reason: pointer.reason, row });
      setStopping('idle');
      setChecking(false);
      // Invalidate progress and pending cancellation callbacks for this observer.
      controller.abort();
      if (notify) notifyRunFinished(settingsRef.current, {
        runId: pointer.runId, status: row.status, detail: metricsSummary(row),
      });
    };

    void (async () => {
      try {
        const available = await probeRunHistoryStrict(api, controller.signal);
        if (!isCurrent()) return;
        // An unsupported/unreadable history surface is not evidence this run ended.
        if (!available) { unavailable(); return; }

        const row = await fetchRunStrict(api, pointer.runId, controller.signal);
        if (!isCurrent()) return;
        if (!row) {
          clearActiveRun(api, pointer.runId);
          setState({ kind: 'hidden' });
          setChecking(false);
          controller.abort();
          return;
        }
        if (isTerminalRunStatus(row.status)) { finish(row, false); return; }

        setChecking(false);
        setState({
          kind: 'live', runId: pointer.runId, reason: pointer.reason,
          statusText: row.status, lossSeries: [], connectionLost: false,
        });
        const outcome = await followRun(api, {
          runId: pointer.runId,
          fromCursor: row.lastCursor ?? 0,
          signal: controller.signal,
          onUpdate: (update) => {
            if (!isCurrent()) return;
            setState((prev) => {
              if (prev.kind !== 'live' || prev.runId !== pointer.runId) return prev;
              const lossSeries = update.lossPoint !== undefined
                ? [...prev.lossSeries, update.lossPoint].slice(-SPARKLINE_MAX_POINTS)
                : prev.lossSeries;
              const tr = translate.bind(null, currentLocale());
              const parts = [runStatusWord(update.runStatus || 'running')];
              if (update.nodeId && update.nodeStatus) parts.push(`${update.nodeId} ${runStatusWord(update.nodeStatus)}`);
              if (update.lossPoint !== undefined) parts.push(tr('reattach.loss', { value: update.lossPoint.toFixed(4) }));
              if (update.completedNodes > 0) parts.push(tr('reattach.nodesDone', { count: update.completedNodes }));
              return { ...prev, lossSeries, statusText: parts.join(' · '), connectionLost: update.connectionLost };
            });
          },
        });
        if (!isCurrent() || outcome.aborted) return;
        // followRun's compatibility API can return null for an unreadable final
        // row, or a loosely parsed row. Require authoritative evidence here.
        const finalRow = await fetchRunStrict(api, pointer.runId, controller.signal);
        if (!isCurrent()) return;
        if (!finalRow) {
          clearActiveRun(api, pointer.runId);
          setState({ kind: 'hidden' });
          setChecking(false);
          controller.abort();
        } else if (isTerminalRunStatus(finalRow.status)) {
          finish(finalRow, true);
        } else {
          unavailable();
        }
      } catch {
        unavailable();
      }
    })();

    return () => controller.abort();
  }, [api, observationGeneration]);

  const retryStatus = () => {
    if (state.kind !== 'unavailable' || checking) return;
    // Invalidate old reads/cancel callbacks immediately, before the next effect.
    abortRef.current?.abort();
    setStopping((previous) => previous === 'pending' ? 'uncertain' : previous);
    setChecking(true);
    setObservationGeneration((previous) => previous + 1);
  };

  const handleStop = () => {
    if ((state.kind !== 'live' && state.kind !== 'unavailable') || checking || stopping === 'pending' || stopping === 'requested') return;
    const controller = abortRef.current;
    if (!controller || controller.signal.aborted) return;
    setStopping('pending');
    void cancelRunById(api, state.runId).then((ok) => {
      if (abortRef.current !== controller || controller.signal.aborted) return;
      // A successful cancel request is not a terminal execution receipt.
      setStopping(ok ? 'requested' : 'uncertain');
      if (ok && state.kind === 'unavailable') {
        controller.abort();
        setChecking(true);
        setObservationGeneration((previous) => previous + 1);
      }
    });
  };

  const handleDismiss = () => {
    abortRef.current?.abort();
    // Hiding this observer must not release a live/unknown dispatch reservation.
    setState({ kind: 'hidden' });
    setStopping('idle');
    setChecking(false);
  };

  const handleAskAgent = () => {
    if (state.kind !== 'finished') return;
    onAskAgent(translate(currentLocale(), 'reattach.askPrompt', { runId: state.runId }));
    handleDismiss();
  };

  const handleRelease = () => {
    if (state.kind !== 'unidentified') return;
    if (!state.confirmingRelease) {
      setState({ ...state, confirmingRelease: true });
      return;
    }
    if (clearUnidentifiedRun(api, state.pointer.submissionId)) {
      handleDismiss();
    } else {
      // The user's attestation never applies to a newer submission.
      const pointer = readUnidentifiedRun(api);
      setState(pointer ? { kind: 'unidentified', pointer, confirmingRelease: false } : { kind: 'hidden' });
    }
  };

  if (state.kind === 'hidden') return null;
  const observing = state.kind === 'live' || state.kind === 'unavailable';
  const reason = state.kind === 'unidentified' ? state.pointer.reason : state.reason;

  return (
    <div className="gcp-reattach" role="status" aria-label={t('reattach.aria')}>
      <div className="gcp-reattach-body">
        <div className="gcp-reattach-title">
          {state.kind === 'live' ? t('reattach.live')
            : state.kind === 'unavailable' ? t('reattach.unavailable')
            : state.kind === 'unidentified' ? t('reattach.unidentified')
            : t('reattach.finished', { status: runStatusWord(state.row.status) })}
        </div>
        <div className="gcp-reattach-detail">
          {state.kind === 'live'
            ? `${state.connectionLost ? `${t('reattach.connectionLost')} · ` : ''}${state.statusText}`
            : state.kind === 'unavailable'
              ? t('reattach.unavailable.detail')
              : state.kind === 'unidentified'
                ? t('reattach.unidentified.detail')
                : (metricsSummary(state.row) || state.row.error || t('reattach.noMetrics'))}
          {reason ? <span className="gcp-reattach-reason"> — {reason}</span> : null}
        </div>
        {(observing || state.kind === 'unidentified') && (
          <div className="gcp-reattach-detail">{t('reattach.noTimeout')}</div>
        )}
        {observing && stopping === 'uncertain' && (
          <div className="gcp-reattach-detail">{t('reattach.cancelUncertain')}</div>
        )}
        {state.kind === 'live' && state.lossSeries.length >= 2 && <RunSparkline series={state.lossSeries} />}
        {state.kind === 'unidentified' && state.confirmingRelease && (
          <div className="gcp-reattach-detail">
            {t('reattach.release.note')}
          </div>
        )}
      </div>
      <div className="gcp-reattach-actions">
        {observing && (
          <button className="gcp-reattach-btn gcp-reattach-stop"
            disabled={checking || stopping === 'pending' || stopping === 'requested'} onClick={handleStop}>
            {stopping === 'pending' ? t('reattach.stopping') : stopping === 'requested' ? t('reattach.cancelRequested') : t('reattach.stop')}
          </button>
        )}
        {state.kind === 'unavailable' && (
          <button className="gcp-reattach-btn" onClick={retryStatus} disabled={checking}>
            {checking ? t('reattach.checking') : t('reattach.retryStatus')}
          </button>
        )}
        {state.kind === 'finished' && (
          <button className="gcp-reattach-btn" onClick={handleAskAgent}>{t('reattach.ask')}</button>
        )}
        {state.kind === 'unidentified' && (
          <>
            <button className="gcp-reattach-btn" onClick={handleRelease}>
              {state.confirmingRelease ? t('reattach.release') : t('reattach.release.check')}
            </button>
            {state.confirmingRelease && (
              <button className="gcp-reattach-btn" onClick={() => setState({ ...state, confirmingRelease: false })}>
                {t('reattach.keep')}
              </button>
            )}
          </>
        )}
        <button className="gcp-reattach-btn gcp-reattach-dismiss" onClick={handleDismiss}
          {...(observing || state.kind === 'unidentified'
            ? { title: t('reattach.dismiss.title') } : {})}>
          {t('reattach.dismiss')}
        </button>
      </div>
    </div>
  );
}
