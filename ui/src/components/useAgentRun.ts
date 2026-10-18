import { useCallback, useEffect, useRef, useState } from 'react';
import { runTurn, type ExperimentApprovalRequest, type RunApprovalRequest } from '../agent/loop';
import { isPassiveDetach, PASSIVE_DETACH_REASON } from '../agent/abortReasons';
import { formatRunStatusLine } from '../agent/runGraph';
import { appendLossPoint } from './RunSparkline';
import { notifyRunFinished } from './notify';
import type { AgentMode, ClearGraphRequest, RunPhase, RunSummary } from '../agent/types';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { activeReasoningEffort, type Settings } from '../state/settings';
import type { Attachment } from '../state/attachments';
import type { ChatTurn, Conversation } from '../state/conversations';
import { saveConversation, titleFrom } from '../state/conversations';

interface Request {
  text: string;
  attachments: Attachment[];
  history: ChatTurn[];
  mode: AgentMode;
  conversationId: string;
}

interface ActiveRun {
  id: string;
  abort: AbortController;
  /** Explicit Stop can still cancel a host submit after passive browser detach. */
  cancel: AbortController;
  conversation: Conversation;
  committed: boolean;
  mutationPossible: boolean;
  sideEffectPossible: boolean;
  hostRunId?: string;
  settled: boolean;
}

interface Options {
  api: CodefyUIPluginAPI;
  settings: Settings;
  conversation: Conversation;
  onConversationChange: (conversation: Conversation) => void;
  active: boolean;
  onBusyChange?: (busy: boolean) => void;
}

/** One owner for a run; navigation may hide the view but cannot orphan its work. */
export function useAgentRun(options: Options) {
  const latest = useRef(options);
  latest.current = options;
  const mounted = useRef(true);
  const runRef = useRef<ActiveRun | null>(null);
  const generation = useRef<string | null>(null);
  const lastRequest = useRef<Request | null>(null);
  const pendingDecision = useRef<((approve: boolean) => void) | null>(null);
  const [busy, setBusy] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [liveTurns, setLiveTurns] = useState<ChatTurn[]>([]);
  const [phase, setPhase] = useState<RunPhase>('thinking');
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ClearGraphRequest | null>(null);
  const [experimentApproval, setExperimentApproval] = useState<ExperimentApprovalRequest | null>(null);
  const [runApproval, setRunApproval] = useState<RunApprovalRequest | null>(null);
  const [runStatusLine, setRunStatusLine] = useState<string | null>(null);
  const [runLossSeries, setRunLossSeries] = useState<number[]>([]);

  const stop = useCallback(() => {
    const run = runRef.current;
    run?.cancel.abort();
    run?.abort.abort();
    pendingDecision.current?.(false);
  }, []);

  const detach = useCallback(() => {
    runRef.current?.abort.abort(PASSIVE_DETACH_REASON);
    pendingDecision.current?.(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; detach(); };
  }, [detach]);

  useEffect(() => {
    if (!options.active) detach();
  }, [options.active, detach]);

  useEffect(() => {
    detach();
    generation.current = null;
    lastRequest.current = null;
    setError(null);
    setSummary(null);
    setStreamingText('');
    setLiveTurns([]);
    setConfirmation(null);
    setExperimentApproval(null);
    setRunApproval(null);
    setRunStatusLine(null);
    setRunLossSeries([]);
  }, [options.conversation.id, detach]);

  const decide = useCallback((approve: boolean) => pendingDecision.current?.(approve), []);

  const start = useCallback(async (text: string, attachments: Attachment[], mode: AgentMode, retry = false) => {
    const current = latest.current;
    if (runRef.current || !current.active) return;
    const previous = lastRequest.current;
    if (retry && (!previous || previous.conversationId !== current.conversation.id)) return;
    const request: Request = retry && previous ? previous : {
      text: text.trim(), attachments: [...attachments], history: [...current.conversation.messages],
      mode, conversationId: current.conversation.id,
    };
    if (!request.text && request.attachments.length === 0) return;

    const id = crypto.randomUUID();
    const userTurn: ChatTurn = { role: 'user', content: request.text, runId: id };
    if (request.attachments.length) userTurn.attachments = request.attachments;
    const conversation: Conversation = {
      ...current.conversation,
      title: current.conversation.title || titleFrom(request.text || request.attachments[0]?.name || 'Attachment'),
      provider: current.settings.provider, model: current.settings.models[current.settings.provider] ?? '',
      mode: request.mode,
      messages: retry ? current.conversation.messages : [...current.conversation.messages, userTurn],
      updatedAt: Date.now(),
    };
    const reasoningEffort = activeReasoningEffort(current.settings);
    if (reasoningEffort) conversation.reasoningEffort = reasoningEffort;
    else delete conversation.reasoningEffort;
    const run: ActiveRun = {
      id, abort: new AbortController(), cancel: new AbortController(), conversation,
      committed: false, mutationPossible: false, sideEffectPossible: false, settled: false,
    };
    // Synchronous latch: two submissions in one event cannot create two runs.
    runRef.current = run;
    generation.current = id;
    lastRequest.current = request;
    setBusy(true);
    current.onBusyChange?.(true);
    setError(null);
    setSummary(null);
    setPhase('thinking');
    setStreamingText('');
    setLiveTurns([]);
    setRunStatusLine(null);
    setRunLossSeries([]);

    const isCurrent = () => mounted.current && latest.current.conversation.id === request.conversationId && generation.current === id;
    const publish = (value: Conversation) => {
      saveConversation(current.api, value);
      if (isCurrent()) latest.current.onConversationChange(value);
    };
    const commit = (turns: ChatTurn[]) => {
      if (run.committed) return;
      run.conversation = { ...run.conversation, messages: [...conversation.messages, ...turns], updatedAt: Date.now() };
      publish(run.conversation);
      run.committed = true;
      if (isCurrent()) { setLiveTurns([]); setStreamingText(''); }
    };
    const finish = (result?: RunSummary) => {
      if (run.settled) return;
      run.settled = true;
      if (result && isCurrent()) setSummary(result);
      pendingDecision.current?.(false);
    };
    // Keep the synchronous owner latch until the executor has actually returned.
    // A late host ID/pointer must be persisted before a reattach follower mounts.
    const release = () => {
      if (runRef.current !== run) return;
      runRef.current = null;
      if (mounted.current) {
        setBusy(false);
        setConfirmation(null);
        setExperimentApproval(null);
        setRunApproval(null);
        setRunStatusLine(null);
        setRunLossSeries([]);
        latest.current.onBusyChange?.(false);
      }
    };

    const requestDecision = (show: () => void, signal?: AbortSignal) => new Promise<boolean>((resolve) => {
      const signals = [...new Set([run.abort.signal, ...(signal ? [signal] : [])])];
      if (!isCurrent() || run.settled || !latest.current.active || signals.some((value) => value.aborted)) {
        resolve(false);
        return;
      }
      pendingDecision.current?.(false);
      const settle = (approved: boolean) => {
        signals.forEach((value) => value.removeEventListener('abort', cancel));
        if (pendingDecision.current !== settle) return;
        pendingDecision.current = null;
        if (isCurrent()) {
          setConfirmation(null);
          setExperimentApproval(null);
          setRunApproval(null);
        }
        resolve(approved && isCurrent() && latest.current.active && !signals.some((value) => value.aborted));
      };
      const cancel = () => settle(false);
      pendingDecision.current = settle;
      signals.forEach((value) => value.addEventListener('abort', cancel, { once: true }));
      setPhase('awaiting_confirmation');
      show();
    });
    const notifiedRuns = new Set<string>();

    try {
      publish(conversation);
      const result = await runTurn({
        api: current.api, settings: current.settings, history: request.history,
        userText: request.text, attachments: request.attachments.length ? request.attachments : undefined,
        runId: id, mode: request.mode, signal: run.abort.signal, cancelSignal: run.cancel.signal,
        confirmClearGraph: (value, signal) => requestDecision(() => setConfirmation(value), signal),
        callbacks: {
          onTextDelta: (text) => {
            if (isCurrent() && !run.settled && !run.abort.signal.aborted) setStreamingText((value) => value + text);
          },
          onTurnAppended: (turn) => {
            if (run.settled) return;
            if (turn.tool_calls?.some((call) => call.name === 'apply_graph_operations')) run.mutationPossible = true;
            if (turn.tool_calls?.some((call) => ['run_graph', 'run_graph_experiments', 'optimize_graph_parameters'].includes(call.name))) {
              run.sideEffectPossible = true;
            }
            if (!isCurrent()) return;
            if (turn.role !== 'tool') setStreamingText('');
            else { setRunStatusLine(null); setRunLossSeries([]); }
            setLiveTurns((turns) => [...turns, turn]);
          },
          onPhase: (value) => { if (isCurrent() && !run.settled) setPhase(value); },
          onOpsApplied: () => { run.mutationPossible = true; },
          onExperimentApproval: (request, signal) => requestDecision(() => setExperimentApproval(request), signal),
          onRunApproval: (request, signal) => requestDecision(() => setRunApproval(request), signal),
          onRunStarted: (hostRunId) => {
            if (run.settled) return;
            run.hostRunId = hostRunId;
            run.sideEffectPossible = true;
          },
          onRunProgress: (update) => {
            if (!isCurrent() || run.settled || run.abort.signal.aborted) return;
            setRunStatusLine(formatRunStatusLine(update));
            setRunLossSeries((previous) => update.phase === 'connecting' ? [] : appendLossPoint(previous, update));
          },
          onRunFinished: (outcome) => {
            if (!isCurrent() || run.settled || run.abort.signal.aborted || (outcome.runId && notifiedRuns.has(outcome.runId))) return;
            if (outcome.runId) notifiedRuns.add(outcome.runId);
            const detail = [
              ...Object.entries(outcome.metrics).slice(0, 2)
                .map(([name, value]) => `${name} ${Number.isInteger(value) ? value : value.toFixed(4)}`),
              `${Math.max(1, Math.round(outcome.durationMs / 60_000))} min`,
            ].join(' · ');
            notifyRunFinished(current.settings, { runId: outcome.runId, status: outcome.status, detail });
          },
          onTurnsCommitted: (turns) => { if (!run.settled) commit(turns); },
          onError: (message) => { if (isCurrent() && !run.settled) setError(message); },
          onFinished: (value) => { if (!run.settled) finish(value); },
        },
      });
      // The returned journal also recovers from an observer that failed to commit.
      if (result && !run.committed) commit(result.turns);
      finish(result);
    } catch (cause) {
      const detached = isPassiveDetach(run.abort.signal) && !run.cancel.signal.aborted;
      const message = detached
        ? run.sideEffectPossible
          ? 'Stopped observing. A host action may still be running; inspect host runs before repeating it.'
          : 'The browser agent stopped when the view became inactive.'
        : cause instanceof Error ? cause.message : String(cause);
      const fallback: RunSummary = {
        id, mode: request.mode, status: detached ? 'incomplete' : run.abort.signal.aborted ? 'cancelled' : 'failed', message,
        reason: detached ? run.sideEffectPossible ? 'execution_detached' : 'passive_detach' : 'unexpected_error',
        mutation: run.mutationPossible ? 'unknown' : 'none',
        mutationAttempted: run.mutationPossible, sideEffectAttempted: run.sideEffectPossible, hostRunId: run.hostRunId,
        appliedOps: 0, failedOps: 0,
        validation: { status: 'not_run', errors: [] },
      };
      if (isCurrent() && !run.settled && !detached) setError(message);
      finish(fallback);
    } finally {
      finish();
      release();
    }
  }, []);

  const canRetry = !busy && !!lastRequest.current && !!(error || (summary && summary.status !== 'completed')) &&
    !summary?.mutationAttempted && !summary?.sideEffectAttempted &&
    summary?.reason !== 'confirmation_declined' && summary?.reason !== 'confirmation_denied';

  return {
    busy, streamingText, liveTurns, phase, summary, error, confirmation,
    experimentApproval, runApproval, runStatusLine, runLossSeries,
    start, stop, detach, decide, canRetry,
    retry: () => {
      const request = lastRequest.current;
      if (request && canRetry) return start(request.text, request.attachments, request.mode, true);
    },
  };
}
