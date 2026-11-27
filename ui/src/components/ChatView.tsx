import React, { useRef, useEffect, useState, useCallback, useId } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { providerReady, readinessReason, withReasoningEffort } from '../state/settings';
import type { ReasoningEffort } from '../llm/models';
import { catalogEntryForModel } from '../llm/models';
import type { Conversation } from '../state/conversations';
import { listConversations } from '../state/conversations';
import type { Attachment, AttachmentKind } from '../state/attachments';
import { classify, readFileAsAttachment, formatBytes } from '../state/attachments';
import type { AgentMode } from '../agent/types';
import { useAgentRun } from './useAgentRun';
import { SlashMenu, optionId, slashItems, slashQuery, type SlashCommand, type SlashItem } from './SlashMenu';
import { getSkill, type AgentContext } from '../agent/hostContext';
import { skillNamesIn } from '../agent/skillSession';
import type { SkillInvocation } from '../state/conversations';
import { useT } from '../i18n';
import type { MessageKey } from '../i18n/en';
import { HISTORY_TURN_LIMIT, historyWindow } from '../agent/history';
import { ApprovalCard } from './ApprovalCard';
import type { AgentActivity } from './agentStatus';
import type { ApprovalTarget } from '../agent/types';
import { RunSparkline } from './RunSparkline';
import { MessageBubble } from './MessageBubble';
import { describeStage, groupTurns } from './turnStages';
import { RunReattachBanner } from './RunReattachBanner';
import { maybeRequestNotificationPermission } from './notify';
import type { GraphStats } from './ChatWindow';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileGlyph({ kind }: { kind: AttachmentKind }) {
  if (kind === 'pdf') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8.5 13.5h1a1.2 1.2 0 0 1 0 2.4h-1zm0 0v4M14 13.5v4m0-4h1.6m-1.6 2h1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 2v6h6M8 13h8M8 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Staged attachment (local, pre-send) state
// ---------------------------------------------------------------------------

interface Staged {
  id: string; // local id for keying + removal
  name: string;
  kind: AttachmentKind;
  size: number;
  status: 'loading' | 'ready' | 'error';
  att?: Attachment;
  error?: string;
}

// ---------------------------------------------------------------------------
// Welcome suggestions — one-click starters that also demo the staged display
// ---------------------------------------------------------------------------

interface Starter { label: string; description: string; prompt: string }

function starters(mode: AgentMode, graph: GraphStats | undefined, t: (key: MessageKey) => string): Starter[] {
  const starter = (key: string, desc: string, prompt: string): Starter => ({
    label: t(key as MessageKey), description: t(desc as MessageKey), prompt: t(prompt as MessageKey),
  });
  if (mode === 'ask') return [
    starter('starter.explain', 'starter.explain.ask.desc', 'starter.explain.ask.prompt'),
    starter('starter.check', 'starter.check.desc', 'starter.check.prompt'),
    starter('starter.explore', 'starter.explore.desc', 'starter.explore.prompt'),
  ];
  if (graph?.available && graph.nodes === 0) return [
    starter('starter.classifier', 'starter.classifier.desc', 'starter.classifier.prompt'),
    starter('starter.data', 'starter.data.desc', 'starter.data.prompt'),
  ];
  return [
    starter('starter.explain', 'starter.explain.desc', 'starter.explain.prompt'),
    starter('starter.improve', 'starter.improve.desc', 'starter.improve.prompt'),
    starter('starter.compare', 'starter.compare.desc', 'starter.compare.prompt'),
  ];
}

/** Which tab an approval applies to; a warning when Copilot opened it. */
function TargetLine({ target, t }: { target?: ApprovalTarget; t: (key: MessageKey, vars?: Record<string, string | number>) => string }) {
  if (!target) return null;
  return (
    <>
      <p className="gcp-approval-target">
        {target.tab ? t('approve.target', { tab: target.tab }) : t('approve.target.canvas')}
        {target.graph ? <span className="gcp-approval-target-graph"> · {target.graph}</span> : null}
      </p>
      {target.openedThisTurn && <p className="gcp-approval-opened" role="note">{t('approve.target.opened')}</p>}
    </>
  );
}

/** Unsent text per conversation, for this page's lifetime. */
const drafts = new Map<string, string>();

// ---------------------------------------------------------------------------
// ChatView props
// ---------------------------------------------------------------------------

export interface ChatViewProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  codexLoggedIn: boolean;
  conversation: Conversation;
  onConversationChange: (c: Conversation) => void;
  /** Enables the in-composer reasoning-effort quick control when provided. */
  onSettingsChange?: (s: Settings) => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  active?: boolean;
  onBusyChange?: (busy: boolean) => void;
  /** Passive view exits stop the browser agent without cancelling host work. */
  onDetachReady?: (detach: () => void) => void;
  graphContext?: GraphStats;
  prefill?: { id: number; text: string } | null;
  /** The host's agent context: null on a host without Agent Skills. */
  agentContext?: AgentContext | null;
  /** `/new`, `/skills`, `/settings` from the slash menu. */
  onSlashCommand?: (command: SlashCommand) => void;
  /** What the header's state chip and the side-panel badge show. */
  onActivity?: (activity: AgentActivity) => void;
}

// ---------------------------------------------------------------------------
// ChatView
// ---------------------------------------------------------------------------

export function ChatView({
  api,
  settings,
  codexLoggedIn,
  conversation,
  onConversationChange,
  onSettingsChange,
  onOpenSettings,
  onOpenHistory,
  active = true,
  onBusyChange,
  onDetachReady,
  graphContext,
  prefill,
  agentContext,
  onSlashCommand,
  onActivity,
}: ChatViewProps) {
  const t = useT();
  const [input, setInput] = useState('');
  const [pendingSkills, setPendingSkills] = useState<SkillInvocation[]>([]);
  const [slashActive, setSlashActive] = useState(0);
  const [slashDismissed, setSlashDismissed] = useState<string | null>(null);
  const [slashNotice, setSlashNotice] = useState<string | null>(null);
  const menuId = useId();
  const hintId = useId();
  const [newCount, setNewCount] = useState(0);
  const seenItems = useRef(0);
  const finishedRun = useRef(0);
  const wasBusy = useRef(false);
  const [mode, setMode] = useState<AgentMode>(conversation.mode ?? 'edit');
  const [elapsed, setElapsed] = useState(0);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [dragging, setDragging] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const run = useAgentRun({ api, settings, conversation, onConversationChange, active, onBusyChange });
  const { busy, streamingText, liveTurns, error: lastError, experimentApproval, runApproval, commitApproval, runStatusLine, runLossSeries } = run;
  useEffect(() => { onDetachReady?.(run.detach); }, [onDetachReady, run.detach]);

  const listRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true); // stick to bottom unless the user scrolls up
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setupRef = useRef<HTMLButtonElement>(null);
  const composingRef = useRef(false);
  const dragDepth = useRef(0);

  const ready = providerReady(settings, codexLoggedIn);
  const anyLoading = staged.some((s) => s.status === 'loading');
  const anyFailed = staged.some((s) => s.status === 'error');
  const readyAtts = staged.filter((s) => s.status === 'ready' && s.att).map((s) => s.att!);
  const query = slashQuery(input);
  const menuOpen = query !== null && slashDismissed !== input && !busy && ready;
  const menuItems = menuOpen ? slashItems(query, agentContext?.skills ?? null) : [];
  const activeIndex = menuItems.length ? Math.min(slashActive, menuItems.length - 1) : -1;
  const loadedSkills = [...skillNamesIn(conversation.messages)].filter((name) => !pendingSkills.some((skill) => skill.name === name));
  const canSend = ready && active && !busy && !anyLoading && !anyFailed && !menuOpen &&
    (input.trim().length > 0 || readyAtts.length > 0 || pendingSkills.length > 0);

  useEffect(() => {
    setInput(drafts.get(conversation.id) ?? '');
    setStaged([]);
    setPendingSkills([]);
    setSlashNotice(null);
    setMode(conversation.mode ?? 'edit');
    pinnedRef.current = true;
    setShowLatest(false);
    setNewCount(0);
  }, [conversation.id]);

  // An unsent message survives switching conversations or views.
  useEffect(() => {
    if (input) drafts.set(conversation.id, input);
    else drafts.delete(conversation.id);
  }, [input, conversation.id]);

  useEffect(() => {
    if (active && !busy) {
      if (ready) textareaRef.current?.focus();
      else setupRef.current?.focus();
    }
  }, [active, conversation.id, ready, busy]);

  useEffect(() => {
    if (!prefill) return;
    setInput((draft) => draft.trim() ? `${draft}\n\n${prefill.text}` : prefill.text);
    textareaRef.current?.focus();
  }, [prefill]);

  // Elapsed-seconds ticker while a run is in flight
  useEffect(() => {
    if (!busy) {
      setElapsed(0);
      return;
    }
    const start = Date.now();
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [busy]);

  // Auto-scroll: follow the stream only while the user is pinned to the bottom
  // (instant, not smooth — smooth scrolling queues badly on token streams).
  const handleListScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setShowLatest(!pinnedRef.current);
    if (pinnedRef.current) setNewCount(0);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el || !pinnedRef.current) return;
    const empty = conversation.messages.length === 0 && liveTurns.length === 0 && !busy;
    el.scrollTop = empty ? 0 : el.scrollHeight;
  }, [conversation.messages, liveTurns, streamingText, staged.length, busy]);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    // Grow with the text up to about eight lines, then scroll.
    const line = parseFloat(getComputedStyle(ta).lineHeight) || 20;
    ta.style.height = Math.min(ta.scrollHeight, Math.round(line * 8) + 16) + 'px';
  }, []);

  useEffect(() => { autoResize(); }, [input, autoResize]);

  // ---------------------------------------------------------------------------
  // Attachment intake
  // ---------------------------------------------------------------------------

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      if (!ready || busy) return;
      for (const file of Array.from(files)) {
        const localId = crypto.randomUUID();
        const kind = classify(file);
        setStaged((prev) => [
          ...prev,
          { id: localId, name: file.name, kind, size: file.size, status: 'loading' },
        ]);
        readFileAsAttachment(file)
          .then((att) => {
            setStaged((prev) =>
              prev.map((s) => (s.id === localId ? { ...s, status: 'ready', att } : s)),
            );
          })
          .catch((err: unknown) => {
            const msg = (err as Error)?.message ?? String(err);
            setStaged((prev) =>
              prev.map((s) => (s.id === localId ? { ...s, status: 'error', error: msg } : s)),
            );
          });
      }
    },
    [ready, busy],
  );

  const removeStaged = (id: string) => {
    setStaged((prev) => prev.filter((s) => s.id !== id));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
    e.target.value = ''; // allow re-selecting the same file
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const files = e.clipboardData?.files;
    if (files && files.length > 0) {
      addFiles(files);
      e.preventDefault(); // don't also paste the blob's textual placeholder
    }
  };

  // Drag & drop over the whole chat surface
  const onDragEnter = (e: React.DragEvent) => {
    if (!ready || busy) return;
    if (!Array.from(e.dataTransfer.types).includes('Files')) return;
    e.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  };
  const onDragOver = (e: React.DragEvent) => {
    if (!ready || busy) return;
    if (Array.from(e.dataTransfer.types).includes('Files')) e.preventDefault();
  };
  const onDragLeave = () => {
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  };
  const onDrop = (e: React.DragEvent) => {
    dragDepth.current = 0;
    setDragging(false);
    if (!ready || busy) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      e.preventDefault();
      addFiles(e.dataTransfer.files);
    }
  };

  // ---------------------------------------------------------------------------
  // Send logic
  // ---------------------------------------------------------------------------

  const repin = () => {
    pinnedRef.current = true;
    setShowLatest(false);
    setNewCount(0);
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const handleSend = () => {
    if (!canSend) return;
    void run.start(input, readyAtts, mode, false, pendingSkills);
    setInput('');
    setStaged([]);
    setPendingSkills([]);
    setSlashNotice(null);
    repin();
  };

  const pickSlash = (item: SlashItem) => {
    setInput('');
    setSlashActive(0);
    setSlashNotice(null);
    if (item.kind === 'command') {
      if (item.command === 'clear') setPendingSkills([]);
      else onSlashCommand?.(item.command);
      return;
    }
    const { skill } = item;
    if (pendingSkills.some((pending) => pending.id === skill.id)) return;
    void getSkill(api, skill.id).then((result) => {
      if (!result.ok) { setSlashNotice(t('slash.loadFailed', { name: skill.name, message: result.error.message })); return; }
      setPendingSkills((current) => current.some((pending) => pending.id === skill.id)
        ? current : [...current, { id: skill.id, name: skill.name, body: result.value.body }]);
    }).catch(() => setSlashNotice(t('slash.loadFailed', { name: skill.name, message: '' })));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const composing = composingRef.current || e.nativeEvent.isComposing || e.keyCode === 229;
    if (menuOpen && !composing) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!menuItems.length) return;
        const step = e.key === 'ArrowDown' ? 1 : -1;
        setSlashActive((activeIndex + step + menuItems.length) % menuItems.length);
        return;
      }
      if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Tab') {
        if (activeIndex >= 0) { e.preventDefault(); pickSlash(menuItems[activeIndex]); }
        else if (e.key === 'Enter') e.preventDefault();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setSlashDismissed(input);
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey && !composingRef.current &&
        !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    if (!ready || !active) return;
    repin();
    void run.retry();
  };

  const handleContinue = () => {
    if (!ready || !active || busy) return;
    repin();
    void run.start('Continue the previous request from the current graph and recorded run results. Read the graph again first; do not replay operations or executions already dispatched.', [], mode);
  };

  const handleExperimentDecision = (approved: boolean) => run.decide(approved);
  const handleRunDecision = (approved: boolean) => {
    if (approved) maybeRequestNotificationPermission(settings);
    run.decide(approved);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // One unified list: committed history + turns finalized during this run.
  // groupTurns folds tool results into stages under their assistant turn, so
  // the live view and the final view share the exact same layout.
  const displayTurns = liveTurns.length > 0
    ? [...conversation.messages, ...liveTurns]
    : conversation.messages;
  const items = groupTurns(displayTurns);
  const isEmpty = items.length === 0 && !busy;

  // While a tool is executing, its stage row already shows a spinner — the
  // generic thinking indicator is only for gaps with no visible activity.
  const lastItem = items[items.length - 1];
  const runningStage = lastItem && liveTurns.includes(lastItem.turn)
    ? lastItem.stages.find((stage) => !stage.result)
    : undefined;
  const toolRunning = !!runningStage;
  const showThinking = busy && streamingText === '' && !toolRunning && !run.confirmation && !experimentApproval && !runApproval && !commitApproval;

  // Live run status for the composer bar: what the agent is doing right now.
  const liveStepCount = liveTurns.filter(
    (t) => t.role === 'assistant' && (t.tool_calls?.length ?? 0) > 0,
  ).length;
  const runPhase = run.confirmation || experimentApproval || runApproval || commitApproval
    ? t('phase.approval')
    : runStatusLine
    ? runStatusLine
    : streamingText !== ''
    ? t('phase.writing')
    : runningStage
    ? describeStage(runningStage, true).label
    : run.phase === 'validating' ? t('phase.validating') : t('phase.thinking');

  // Composer model/effort identity. Effort options surface only after the
  // host has confirmed reasoning-effort support for this provider+model.
  const provider = settings.provider;
  const modelId = settings.models[provider] ?? '';
  const catalogEntry = catalogEntryForModel(provider, modelId);
  const effortCapable = settings.providerCapabilities?.[provider]?.reasoningEffort === true;
  const effortOptions = onSettingsChange && effortCapable
    ? catalogEntry?.reasoningEfforts ?? []
    : [];
  const selectedEffort = settings.reasoningEfforts?.[provider] ?? '';
  const chooseEffort = (effort: ReasoningEffort | '') => {
    onSettingsChange?.(withReasoningEffort(settings, provider, effort));
  };

  // On the welcome screen, surface a shortcut to past chats (every panel open
  // starts a fresh conversation, so this is where users look for earlier ones).
  const prevCount = isEmpty
    ? listConversations(api).filter((c) => c.id !== conversation.id).length
    : 0;

  const approvalPending = !!(run.confirmation || experimentApproval || runApproval || commitApproval);

  // New items that arrive while the reader is scrolled up are counted, not followed.
  useEffect(() => {
    const added = items.length - seenItems.current;
    seenItems.current = items.length;
    if (added > 0 && !pinnedRef.current) setNewCount((count) => count + added);
  }, [items.length]);

  useEffect(() => {
    if (wasBusy.current && !busy) finishedRun.current += 1;
    wasBusy.current = busy;
    onActivity?.({ busy, needsApproval: approvalPending || (!ready && !busy), atBottom: !showLatest, finishedRun: finishedRun.current });
  }, [busy, approvalPending, ready, showLatest, onActivity]);

  const contextUsed = Math.min(historyWindow(displayTurns).length, HISTORY_TURN_LIMIT);
  const contextShare = contextUsed / HISTORY_TURN_LIMIT;
  const contextTone = contextShare > 0.8 ? 'danger' : contextShare >= 0.6 ? 'attention' : 'calm';
  const plural = (count: number, one: MessageKey, many: MessageKey) => t(count === 1 ? one : many, { count });

  return (
    <div
      className={`gcp-chat${dragging ? ' gcp-dragging' : ''}`}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <span className="gcp-sr-only" role="status" aria-live="polite">
        {busy ? run.phase === 'awaiting_confirmation' ? t('chat.sr.waiting') : t('chat.sr.working') :
          run.summary ? run.summary.reason === 'execution_detached' ? t('chat.sr.detached') : t('chat.sr.finished', { status: run.summary.status }) : ''}
      </span>
      {active && !busy && <RunReattachBanner
        api={api}
        settings={settings}
        onAskAgent={(text) => {
          setInput(text);
          textareaRef.current?.focus();
        }}
      />}

      {/* Live tokens are readable, but only run transitions are announced. */}
      <div
        className="gcp-messages"
        role="log"
        aria-live="off"
        aria-label={t('chat.log')}
        ref={listRef}
        onScroll={handleListScroll}
      >
        {isEmpty && (
          <div className="gcp-welcome">
            <h2 className="gcp-welcome-title">{t('chat.empty.title')}</h2>
            <p className="gcp-welcome-sub">{mode === 'ask' ? t('chat.empty.ask') : t('chat.empty.edit')}</p>
            {ready && (
              <div className="gcp-welcome-suggestions" aria-label={t('chat.starters')}>
                {starters(mode, graphContext, (key) => t(key)).map((starter) => (
                  <button key={starter.label} className="gcp-suggestion" aria-label={starter.label} onClick={() => {
                    setInput(starter.prompt);
                    textareaRef.current?.focus();
                  }}>
                    <strong>{starter.label}</strong><small>{starter.description}</small>
                  </button>
                ))}
              </div>
            )}
            {prevCount > 0 && (
              <button className="gcp-welcome-history" onClick={onOpenHistory} aria-label={t('chat.previous.aria')}>
                <ClockIcon />
                {t('chat.previous', { count: prevCount })}
              </button>
            )}
          </div>
        )}

        {items.map((item) => (
          <MessageBubble key={item.key} turn={item.turn} stages={item.stages}
            step={item.step} active={busy && liveTurns.includes(item.turn)} />
        ))}

        {/* Text currently streaming for this round */}
        {busy && streamingText !== '' && (
          <MessageBubble
            turn={{ role: 'assistant', content: '' }}
            streaming
            streamingText={streamingText}
          />
        )}

        {/* Approvals live in the conversation, where their context is. */}
        {run.confirmation && (
          <ApprovalCard key="clear" danger active={active} title={t('approve.clear.title')}
            confirmLabel={t('approve.clear.confirm')} cancelLabel={t('approve.clear.cancel')} onDecide={run.decide}>
            <TargetLine target={run.confirmation.target} t={t} />
            <p>{t('approve.clear.body', { nodes: run.confirmation.nodeCount, edges: run.confirmation.edgeCount })}</p>
          </ApprovalCard>
        )}
        {experimentApproval && (
          <ApprovalCard key="experiment" active={active} detailsLabel={t('approve.details')}
            title={plural(experimentApproval.executionCount, 'approve.study.title.one', 'approve.study.title.many')}
            confirmLabel={t('approve.study.confirm')} cancelLabel={t('common.cancel')} onDecide={handleExperimentDecision}>
            <TargetLine target={experimentApproval.target} t={t} />
            <p className="gcp-approval-lead">{experimentApproval.hypothesis}</p>
            <p className="gcp-approval-facts">
              {[t('approve.study.variants', { count: experimentApproval.variantCount }),
                t('approve.study.repetitions', { count: experimentApproval.repetitions }),
                t('approve.study.concurrency', { count: experimentApproval.concurrency }),
                t('approve.study.cap', { minutes: experimentApproval.runTimeoutMinutes }),
                ...(experimentApproval.applyBest ? [t('approve.study.applyBest')] : [])].join(' · ')}
            </p>
            <p className="gcp-approval-note">{t('approve.study.redacted')}</p>
            <ul className="gcp-approval-list" aria-label={t('approve.study.candidates')}>
              {experimentApproval.variants.map((variant, index) => (
                <li key={`${index}-${variant.label}`}>
                  <strong>{variant.label}</strong>
                  <span>{variant.operations.length > 0 ? variant.operations.join(' · ') : t('approve.study.baseline')}</span>
                </li>
              ))}
            </ul>
            <p className="gcp-approval-facts"><strong>{t('approve.study.nodes')}</strong> {experimentApproval.nodeTypes.length > 0 ? experimentApproval.nodeTypes.join(', ') : t('approve.noTypes')}</p>
            <p className="gcp-approval-warning">{t('approve.study.warning')}</p>
          </ApprovalCard>
        )}
        {runApproval && (
          <ApprovalCard key="run" active={active} detailsLabel={t('approve.details')} title={t('approve.run.title')}
            confirmLabel={t('approve.run.confirm')} cancelLabel={t('common.cancel')} onDecide={handleRunDecision}>
            <TargetLine target={runApproval.target} t={t} />
            <p className="gcp-approval-lead">{runApproval.reason}</p>
            <p className="gcp-approval-facts">
              {[plural(runApproval.nodeCount, 'approve.run.nodes.one', 'approve.run.nodes.many'),
                plural(runApproval.edgeCount, 'approve.run.edges.one', 'approve.run.edges.many'),
                t('approve.run.device', { device: runApproval.device }),
                t('approve.run.cap', { minutes: runApproval.timeoutMinutes })].join(' · ')}
            </p>
            <p className="gcp-approval-facts"><strong>{t('approve.run.nodeTypes')}</strong> {runApproval.nodeTypes.length > 0 ? runApproval.nodeTypes.join(', ') : t('approve.noTypes')}</p>
            <p className="gcp-approval-warning">{t('approve.run.warning')}</p>
          </ApprovalCard>
        )}
        {commitApproval && (
          <ApprovalCard key="commit" active={active} detailsLabel={t('approve.commit.details')}
            title={plural(commitApproval.files.length, 'approve.commit.title.one', 'approve.commit.title.many')}
            confirmLabel={plural(commitApproval.files.length, 'approve.commit.title.one', 'approve.commit.title.many').replace(/[?？]$/, '')}
            cancelLabel={t('common.cancel')} onDecide={run.decide}>
            <p className="gcp-approval-lead">{commitApproval.message}</p>
            <ul className="gcp-approval-list gcp-commit-files" aria-label={t('approve.commit.files')}>
              {commitApproval.files.map((file) => <li key={file.path}><code>{file.path}</code> <span>{file.status}</span></li>)}
            </ul>
            <p className="gcp-approval-warning">{t('approve.commit.warning')}</p>
          </ApprovalCard>
        )}

        {/* Waiting on the model (no visible activity yet) */}
        {showThinking && (
          <div className="gcp-thinking" aria-label={t('chat.thinking.aria')}>
            <span className="gcp-thinking-text">{run.phase === 'validating' ? t('phase.validating') : t('phase.thinking')}</span>
            {elapsed >= 3 && <span className="gcp-thinking-time" aria-hidden="true">{elapsed}s</span>}
          </div>
        )}

        {/* Failed run: standalone error row + retry */}
        {lastError && !busy && (
          <div className="gcp-error-row" role="alert">
            <span className="gcp-error-icon" aria-hidden="true"><ErrorIcon /></span>
            <div className="gcp-error-body">
              <div className="gcp-error-title">{t('chat.error.title')}</div>
              <div className="gcp-error-text">{lastError}</div>
            </div>
          </div>
        )}
        {!busy && (lastError || (run.summary && run.summary.status !== 'completed')) && (
          <div className="gcp-recovery">
            {run.canRetry ? (
              <button className="gcp-retry-btn" onClick={handleRetry} disabled={!ready} aria-label={t('chat.retry')}>{t('chat.retry')}</button>
            ) : run.summary && (run.summary.mutationAttempted || run.summary.sideEffectAttempted) ? (
              <>
                <span>{t('chat.noReplay')}</span>
                <button className="gcp-retry-btn" onClick={handleContinue} disabled={!ready}>
                  {t('chat.continue')}
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>

      {showLatest && !approvalPending && (
        <button className="gcp-jump-latest" onClick={repin} aria-label={t('chat.latest.aria')}>
          {newCount > 0 ? t('chat.latest.count', { count: newCount }) : t('chat.latest')}
        </button>
      )}

      {/* Drop hint overlay */}
      {dragging && (
        <div className="gcp-dropzone" aria-hidden="true">
          <div className="gcp-dropzone-inner">
            <PaperclipIcon />
            <span>{t('composer.drop')}</span>
          </div>
        </div>
      )}

      {busy && (
        // The one line in the panel allowed to pulse: what is happening now.
        <div className={`gcp-runbar${approvalPending ? ' waiting' : ''}`} role="status" aria-label={t('chat.activity')} aria-live="off">
          <span className="gcp-runbar-phase">{runPhase}</span>
          {runLossSeries.length >= 2 && <RunSparkline series={runLossSeries} />}
          {liveStepCount > 0 && <span className="gcp-runbar-step">{t('chat.step', { count: liveStepCount })}</span>}
          {elapsed >= 1 && <span className="gcp-runbar-time">{elapsed}s</span>}
        </div>
      )}

      {/* Input area */}
      <div className="gcp-input-area">
        {staged.length > 0 && (
          <div className="gcp-attachments" aria-label={t('composer.attachments')}>
            {staged.map((s) => (
              <div
                key={s.id}
                className={`gcp-chip ${s.kind === 'image' ? 'image' : 'file'} ${s.status}`}
                title={s.status === 'error' ? s.error : `${s.name} · ${formatBytes(s.size)}`}
              >
                {s.kind === 'image' && s.att?.dataUrl ? (
                  <img className="gcp-chip-thumb" src={s.att.dataUrl} alt={s.name} />
                ) : (
                  <span className="gcp-chip-icon"><FileGlyph kind={s.kind} /></span>
                )}
                <span className="gcp-chip-body">
                  <span className="gcp-chip-name">{s.name}</span>
                  <span className="gcp-chip-size">
                    {s.status === 'loading' ? t('composer.reading') : s.status === 'error' ? s.error || t('composer.unreadable') : formatBytes(s.size)}
                  </span>
                </span>
                <button
                  className="gcp-chip-remove"
                  onClick={() => removeStaged(s.id)}
                  aria-label={t('composer.remove', { name: s.name })}
                  title={t('composer.removeShort')}
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {(pendingSkills.length > 0 || loadedSkills.length > 0) && (
          <ul className="gcp-skill-tags" aria-label={t('tags.label')}>
            {loadedSkills.map((name) => (
              <li key={`loaded:${name}`} className="gcp-skill-tag loaded" title={t('tags.loaded', { name })}>
                <span className="gcp-skill-tag-name">{name}</span>
              </li>
            ))}
            {pendingSkills.map((skill) => (
              <li key={`pending:${skill.id}`} className="gcp-skill-tag pending" title={t('tags.pending', { name: skill.name })}>
                <span className="gcp-skill-tag-name">/{skill.name}</span>
                <button className="gcp-skill-tag-remove" aria-label={t('tags.remove', { name: skill.name })}
                  onClick={() => setPendingSkills((current) => current.filter((item) => item.id !== skill.id))}>
                  <RemoveIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
        {slashNotice && <div className="gcp-slash-notice" role="alert">{slashNotice}</div>}
        {menuOpen && (
          <SlashMenu id={menuId} items={menuItems} active={activeIndex} t={t}
            onPick={pickSlash} onHover={setSlashActive} />
        )}

        <div className="gcp-composer">
          <div className="gcp-input-row">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="gcp-file-input"
              onChange={handleFileInput}
              aria-hidden="true"
              tabIndex={-1}
            />

            <button
              className="gcp-attach-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={!ready || busy}
              aria-label={t('composer.attach')}
              title={t('composer.attach.hint')}
            >
              <PaperclipIcon />
            </button>

            <textarea
              ref={textareaRef}
              className="gcp-textarea"
              rows={1}
              placeholder={t('composer.placeholder')}
              value={input}
              onChange={(e) => { setInput(e.target.value); setSlashActive(0); }}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              aria-activedescendant={menuOpen && activeIndex >= 0 ? optionId(menuId, activeIndex) : undefined}
              aria-describedby={hintId}
              onCompositionStart={() => { composingRef.current = true; }}
              onCompositionEnd={() => { composingRef.current = false; }}
              onPaste={handlePaste}
              disabled={busy || !ready}
              aria-label={t('composer.aria')}
              aria-disabled={!ready ? 'true' : undefined}
            />

            {busy ? (
              <button className="gcp-stop-btn" onClick={run.stop} aria-label={t('composer.stop')} title={t('composer.stopShort')}>
                <StopIcon />
              </button>
            ) : (
              <button
                className="gcp-send-btn"
                onClick={handleSend}
                disabled={!canSend}
                aria-label={t('composer.send')}
                title={t('composer.sendShort')}
              >
                <SendIcon />
              </button>
            )}
          </div>

          <div className="gcp-composer-bar">
            <div className="gcp-mode-switch" role="radiogroup" aria-label={t('mode.label')}>
              {(['ask', 'edit'] as const).map((value) => (
                <button key={value} role="radio" aria-checked={mode === value} tabIndex={mode === value ? 0 : -1}
                  title={value === 'ask' ? t('mode.ask.hint') : t('mode.edit.hint')}
                  aria-label={value === 'ask' ? t('mode.ask') : t('mode.edit')}
                  disabled={busy} onClick={() => setMode(value)} onKeyDown={(event) => {
                    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                      event.preventDefault();
                      const next = mode === 'ask' ? 'edit' : 'ask';
                      setMode(next);
                      const sibling = next === 'ask' ? event.currentTarget.previousElementSibling : event.currentTarget.nextElementSibling;
                      (sibling as HTMLButtonElement | null)?.focus();
                    }
                  }}>
                  <span className="gcp-mode-glyph" aria-hidden="true">{value === 'ask' ? '?' : '✎'}</span>
                  <span className="gcp-mode-text">{value === 'ask' ? t('mode.ask') : t('mode.edit')}</span>
                </button>
              ))}
            </div>
            <span className="gcp-sr-only">{mode === 'ask' ? t('mode.ask.sr') : t('mode.edit.sr')}</span>
            <button className="gcp-context-chip" onClick={onOpenSettings} aria-label={t('composer.model.aria')}
              title={t('composer.model.title', { model: modelId || t('composer.model.none'), state: ready ? t('composer.configured') : t('composer.setup') })}>
              <span className="gcp-context-chip-model">{modelId || t('composer.model.choose')}</span>
              <span className={`gcp-configured${ready ? '' : ' gcp-configured--missing'}`}>{ready ? t('composer.configured') : t('composer.setup')}</span>
            </button>
            {effortOptions.length > 0 && (
              <label className="gcp-effort-control">
                <span className="gcp-effort-label">{t('composer.reasoning')}</span>
                <select aria-label={t('composer.reasoning.aria')} value={selectedEffort} disabled={busy}
                  onChange={(event) => chooseEffort(event.target.value as ReasoningEffort | '')}
                  onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}>
                  <option value="">{t('composer.reasoning.default')}{catalogEntry?.defaultReasoningEffort ? ` (${catalogEntry.defaultReasoningEffort})` : ''}</option>
                  {effortOptions.map((option) => <option key={option.effort} value={option.effort} title={option.description}>{option.effort}</option>)}
                </select>
              </label>
            )}
            <span className="gcp-graph-context" aria-label={t('composer.graph.aria')}>
              {graphContext?.available
                ? <>{plural(graphContext.nodes, 'approve.run.nodes.one', 'approve.run.nodes.many')}<span className="gcp-graph-context-edges"> · {plural(graphContext.edges, 'approve.run.edges.one', 'approve.run.edges.many')}</span></>
                : t('composer.graph.none')}
            </span>
            <span className={`gcp-context-ring gcp-context-ring--${contextTone}`} role="img"
              aria-label={t('composer.context', { used: contextUsed, limit: HISTORY_TURN_LIMIT })}
              title={t('composer.context.hint', { used: contextUsed, limit: HISTORY_TURN_LIMIT })}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="6" className="gcp-context-ring-track" />
                <circle cx="8" cy="8" r="6" className="gcp-context-ring-fill"
                  strokeDasharray={`${(contextShare * 37.7).toFixed(2)} 37.7`} transform="rotate(-90 8 8)" />
              </svg>
              <span className="gcp-context-ring-text">{contextUsed}/{HISTORY_TURN_LIMIT}</span>
            </span>
          </div>
          <div id={hintId} className="gcp-composer-hint">
            {anyLoading ? t('composer.hint.reading') : anyFailed ? t('composer.hint.failed') : t('composer.hint')}
          </div>
        </div>

        {/* Provider-not-ready overlay */}
        {!ready && !busy && (
          <div className="gcp-not-ready-overlay">
            <span className="gcp-not-ready-label">{readinessReason(settings, codexLoggedIn)}</span>
            <button
              ref={setupRef}
              className="gcp-cta-btn"
              onClick={onOpenSettings}
              aria-label={t('composer.setup.aria')}
            >
              {t('composer.setup.button')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
