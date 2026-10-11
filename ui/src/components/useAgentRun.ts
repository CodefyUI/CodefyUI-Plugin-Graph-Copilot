import { useCallback, useEffect, useRef, useState } from 'react';
import { runTurn } from '../agent/loop';
import type { AgentMode, ClearGraphRequest, RunPhase, RunSummary } from '../agent/types';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
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
  conversation: Conversation;
  committed: boolean;
  mutationPossible: boolean;
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

  const stop = useCallback(() => {
    runRef.current?.abort.abort();
    pendingDecision.current?.(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; stop(); };
  }, [stop]);

  useEffect(() => {
    if (!options.active) stop();
  }, [options.active, stop]);

  useEffect(() => {
    stop();
    generation.current = null;
    lastRequest.current = null;
    setError(null);
    setSummary(null);
    setStreamingText('');
    setLiveTurns([]);
  }, [options.conversation.id, stop]);

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
    const run: ActiveRun = {
      id, abort: new AbortController(), conversation, committed: false, mutationPossible: false, settled: false,
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
      if (result && isCurrent()) setSummary(result);
      if (run.settled) return;
      run.settled = true;
      pendingDecision.current?.(false);
      if (runRef.current === run) {
        runRef.current = null;
        if (mounted.current) {
          setBusy(false);
          setConfirmation(null);
          latest.current.onBusyChange?.(false);
        }
      }
    };

    try {
      publish(conversation);
      const result = await runTurn({
        api: current.api, settings: current.settings, history: request.history,
        userText: request.text, attachments: request.attachments.length ? request.attachments : undefined,
        runId: id, mode: request.mode, signal: run.abort.signal,
        confirmClearGraph: (value, signal) => new Promise<boolean>((resolve) => {
          if (!isCurrent() || run.settled || !latest.current.active || signal?.aborted) { resolve(false); return; }
          const settle = (approved: boolean) => {
            signal?.removeEventListener('abort', cancel);
            if (pendingDecision.current !== settle) return;
            pendingDecision.current = null;
            if (isCurrent()) setConfirmation(null);
            resolve(approved && isCurrent() && latest.current.active && !signal?.aborted);
          };
          const cancel = () => settle(false);
          pendingDecision.current = settle;
          signal?.addEventListener('abort', cancel, { once: true });
          setConfirmation(value);
        }),
        callbacks: {
          onTextDelta: (text) => {
            if (isCurrent() && !run.settled && !run.abort.signal.aborted) setStreamingText((value) => value + text);
          },
          onTurnAppended: (turn) => {
            if (turn.tool_calls?.some((call) => call.name === 'apply_graph_operations')) run.mutationPossible = true;
            if (!isCurrent() || run.settled) return;
            if (turn.role !== 'tool') setStreamingText('');
            setLiveTurns((turns) => [...turns, turn]);
          },
          onPhase: (value) => { if (isCurrent() && !run.settled) setPhase(value); },
          onOpsApplied: () => { run.mutationPossible = true; },
          onTurnsCommitted: (turns) => { if (!run.settled) commit(turns); },
          onError: (message) => { if (isCurrent() && !run.settled) setError(message); },
          onFinished: finish,
        },
      });
      // The returned journal also recovers from an observer that failed to commit.
      if (result && !run.committed) commit(result.turns);
      finish(result);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : String(cause);
      const fallback: RunSummary = {
        id, mode: request.mode, status: run.abort.signal.aborted ? 'cancelled' : 'failed', message,
        reason: 'unexpected_error', mutation: run.mutationPossible ? 'unknown' : 'none',
        mutationAttempted: run.mutationPossible, appliedOps: 0, failedOps: 0,
        validation: { status: 'not_run', errors: [] },
      };
      if (isCurrent()) setError(message);
      finish(fallback);
    } finally {
      finish();
    }
  }, []);

  const canRetry = !busy && !!lastRequest.current && !!(error || (summary && summary.status !== 'completed')) &&
    !summary?.mutationAttempted && summary?.reason !== 'confirmation_declined' && summary?.reason !== 'confirmation_denied';

  return {
    busy, streamingText, liveTurns, phase, summary, error, confirmation,
    start, stop, decide, canRetry,
    retry: () => {
      const request = lastRequest.current;
      if (request && canRetry) return start(request.text, request.attachments, request.mode, true);
    },
  };
}
