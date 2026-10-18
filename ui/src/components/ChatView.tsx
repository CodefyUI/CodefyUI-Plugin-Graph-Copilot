import React, { useRef, useEffect, useState, useCallback } from 'react';
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
import { RunSparkline } from './RunSparkline';
import { MessageBubble } from './MessageBubble';
import { describeStage, groupTurns } from './turnStages';
import { RunReattachBanner } from './RunReattachBanner';
import { maybeRequestNotificationPermission } from './notify';
import { ConfirmDialog } from './ConfirmDialog';
import { GraphMark } from './GraphMark';
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

function starters(mode: AgentMode, graph?: GraphStats): Starter[] {
  if (mode === 'ask') return [
    { label: 'Explain this graph', description: 'Trace the data and connections', prompt: 'Explain what my current graph does without changing it.' },
    { label: 'Check the structure', description: 'Find issues without making changes', prompt: 'Validate the current graph and explain any issues. Do not change or run it.' },
    { label: 'Explore an approach', description: 'Think through a pipeline together', prompt: 'Help me plan a machine learning pipeline. Ask what I want to build before suggesting nodes.' },
  ];
  if (graph?.available && graph.nodes === 0) return [
    { label: 'Build an image classifier', description: 'Draft a small CNN pipeline', prompt: 'Build a small CNN image classifier' },
    { label: 'Start with my data', description: 'Plan the inputs before building', prompt: 'Help me build a graph around my data. Ask about my data and goal before making changes.' },
  ];
  return [
    { label: 'Explain this graph', description: 'Understand what is on the canvas', prompt: 'Explain what my current graph does' },
    { label: 'Improve this graph', description: 'Review before making changes', prompt: 'Review my current graph and suggest a focused improvement. Explain the change before applying it.' },
    { label: 'Plan a comparison', description: 'Turn a question into an experiment', prompt: 'Help me plan a comparison of graph parameters. First inspect the graph and ask which metric matters; do not execute yet.' },
  ];
}

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
}: ChatViewProps) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AgentMode>(conversation.mode ?? 'edit');
  const [elapsed, setElapsed] = useState(0);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [dragging, setDragging] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const run = useAgentRun({ api, settings, conversation, onConversationChange, active, onBusyChange });
  const { busy, streamingText, liveTurns, error: lastError, experimentApproval, runApproval, runStatusLine, runLossSeries } = run;
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
  const canSend = ready && active && !busy && !anyLoading && !anyFailed &&
    (input.trim().length > 0 || readyAtts.length > 0);

  useEffect(() => {
    setInput('');
    setStaged([]);
    setMode(conversation.mode ?? 'edit');
    pinnedRef.current = true;
    setShowLatest(false);
  }, [conversation.id]);

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
    ta.style.height = Math.min(ta.scrollHeight, 110) + 'px';
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
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const handleSend = () => {
    if (!canSend) return;
    void run.start(input, readyAtts, mode);
    setInput('');
    setStaged([]);
    repin();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  const showThinking = busy && streamingText === '' && !toolRunning && !run.confirmation && !experimentApproval && !runApproval;

  // Live run status for the composer bar: what the agent is doing right now.
  const liveStepCount = liveTurns.filter(
    (t) => t.role === 'assistant' && (t.tool_calls?.length ?? 0) > 0,
  ).length;
  const runPhase = run.confirmation || experimentApproval || runApproval
    ? 'Waiting for approval'
    : runStatusLine
    ? runStatusLine
    : streamingText !== ''
    ? 'Writing reply'
    : runningStage
    ? describeStage(runningStage, true).label
    : run.phase === 'validating' ? 'Checking structure' : 'Thinking';

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

  return (
    <div
      className={`gcp-chat${dragging ? ' gcp-dragging' : ''}`}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="gcp-mode-bar">
        <div className="gcp-mode-switch" role="radiogroup" aria-label="Agent mode">
          {(['ask', 'edit'] as const).map((value) => (
            <button key={value} role="radio" aria-checked={mode === value} tabIndex={mode === value ? 0 : -1}
              title={value === 'ask' ? 'Read-only guidance; no graph changes or execution' : 'Can change the current graph; execution requires approval'}
              disabled={busy} onClick={() => setMode(value)} onKeyDown={(event) => {
                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                  event.preventDefault();
                  const next = mode === 'ask' ? 'edit' : 'ask';
                  setMode(next);
                  const sibling = next === 'ask' ? event.currentTarget.previousElementSibling : event.currentTarget.nextElementSibling;
                  (sibling as HTMLButtonElement | null)?.focus();
                }
              }}>
              {value === 'ask' ? 'Ask' : 'Edit'}
            </button>
          ))}
        </div>
        <div className="gcp-graph-context" aria-label="Current graph context">
          <GraphMark size={18} />
          {graphContext?.available ? (
            <span><strong>{graphContext.nodes}</strong> nodes <span className="gcp-context-secondary">/ {graphContext.edges} edges</span></span>
          ) : <span>Graph unavailable</span>}
        </div>
        <span className="gcp-sr-only">{mode === 'ask' ? 'Read-only guidance' : 'Can change the current graph'}</span>
      </div>
      <span className="gcp-sr-only" role="status" aria-live="polite">
        {busy ? run.phase === 'awaiting_confirmation' ? 'Waiting for your confirmation' : 'Assistant working' :
          run.summary ? run.summary.reason === 'execution_detached' ? 'Detached from host run' : `Run ${run.summary.status}` : ''}
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
        aria-label="Conversation"
        ref={listRef}
        onScroll={handleListScroll}
      >
        {isEmpty && (
          <div className="gcp-welcome">
            <div className="gcp-welcome-intro">
              <h2 className="gcp-welcome-title">{mode === 'ask' ? 'Understand this graph' : 'What should change?'}</h2>
              <p className="gcp-welcome-sub">
                {mode === 'ask' ? 'Read the graph, inspect results, and explore ideas. Your canvas stays unchanged.'
                  : 'Describe the next step. Review the changes, then run when you are ready.'}
              </p>
            </div>
            {ready && (
              <div className="gcp-welcome-suggestions" aria-label="Suggested prompts">
                {starters(mode, graphContext).map((starter) => (
                  <button key={starter.label} className="gcp-suggestion" aria-label={starter.label} onClick={() => {
                    setInput(starter.prompt);
                    textareaRef.current?.focus();
                  }}>
                    <span className="gcp-suggestion-socket" aria-hidden="true" />
                    <span><strong>{starter.label}</strong><small>{starter.description}</small></span>
                  </button>
                ))}
              </div>
            )}
            {prevCount > 0 && (
              <button
                className="gcp-welcome-history"
                onClick={onOpenHistory}
                aria-label="View previous conversations"
              >
                <ClockIcon />
                Previous conversations ({prevCount})
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

        {/* Waiting on the model (no visible activity yet) */}
        {showThinking && (
          <div className="gcp-thinking" aria-label="Waiting for the assistant">
            <span className="gcp-thinking-orb" aria-hidden="true"><GraphMark size={20} /></span>
            <span className="gcp-thinking-text">{run.phase === 'validating' ? 'Checking structure' : 'Thinking'}</span>
            {elapsed >= 3 && <span className="gcp-thinking-time" aria-hidden="true">{elapsed}s</span>}
          </div>
        )}

        {/* Failed run: standalone error row + retry */}
        {lastError && !busy && (
          <div className="gcp-error-row" role="alert">
            <span className="gcp-error-icon" aria-hidden="true"><ErrorIcon /></span>
            <div className="gcp-error-body">
              <div className="gcp-error-title">Request failed</div>
              <div className="gcp-error-text">{lastError}</div>
            </div>
          </div>
        )}
        {!busy && (lastError || (run.summary && run.summary.status !== 'completed')) && (
          <div className="gcp-recovery">
            {run.canRetry ? (
              <button className="gcp-retry-btn" onClick={handleRetry} disabled={!ready} aria-label="Retry">Retry</button>
            ) : run.summary && (run.summary.mutationAttempted || run.summary.sideEffectAttempted) ? (
              <>
                <span>Changes and dispatched executions are not replayed. Stop does not undo applied changes.</span>
                <button className="gcp-retry-btn" onClick={handleContinue} disabled={!ready}>
                  Continue from current graph
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>

      {showLatest && <button className="gcp-jump-latest" onClick={repin}>Jump to latest</button>}

      {run.confirmation && (
        <ConfirmDialog title="Clear the current graph?" active={active} onCancel={() => run.decide(false)}
          actions={<>
            <button className="gcp-secondary-btn" onClick={() => run.decide(false)} data-autofocus>Keep graph</button>
            <button className="gcp-danger-btn" onClick={() => run.decide(true)}>Clear graph</button>
          </>}>
          <p>This removes {run.confirmation.nodeCount} nodes and {run.confirmation.edgeCount} edges. Changes are not automatically undone.</p>
        </ConfirmDialog>
      )}

      {/* Drop hint overlay */}
      {dragging && (
        <div className="gcp-dropzone" aria-hidden="true">
          <div className="gcp-dropzone-inner">
            <PaperclipIcon />
            <span>Drop files to attach</span>
          </div>
        </div>
      )}

      {experimentApproval && (
        <ConfirmDialog
          title={`Run ${experimentApproval.executionCount} graph execution${experimentApproval.executionCount === 1 ? '' : 's'}?`}
          active={active} onCancel={() => handleExperimentDecision(false)} detailsLabel="Execution approval details"
          actions={<>
            <button className="gcp-stop-btn" onClick={run.stop} aria-label="Stop generation" title="Stop"><StopIcon /></button>
            <button className="gcp-approval-secondary" onClick={() => handleExperimentDecision(false)} data-autofocus>Cancel</button>
            <button className="gcp-approval-primary" onClick={() => handleExperimentDecision(true)}>Approve and run</button>
          </>}>
              <div className="gcp-experiment-approval-hypothesis">
                {experimentApproval.hypothesis}
              </div>
              <div className="gcp-experiment-approval-facts">
                <span>{experimentApproval.variantCount} variants</span>
                <span>{experimentApproval.repetitions} repetitions</span>
                <span>concurrency {experimentApproval.concurrency}</span>
                <span>per-run cap {experimentApproval.runTimeoutMinutes} min</span>
                {experimentApproval.applyBest && <span>parameter winner may be applied</span>}
              </div>
              <div className="gcp-experiment-approval-warning">
                Review the candidate settings below. Credential values are schema-redacted.
              </div>
              <div className="gcp-experiment-approval-candidates" aria-label="Candidate changes">
                {experimentApproval.variants.map((variant, index) => (
                  <div key={`${index}-${variant.label}`}>
                    <strong>{variant.label}</strong>
                    <span>{variant.operations.length > 0 ? variant.operations.join(' · ') : 'baseline — no changes'}</span>
                  </div>
                ))}
              </div>
              <div className="gcp-experiment-approval-nodes">
                <strong>Nodes that may execute</strong>
                <span>{experimentApproval.nodeTypes.length > 0 ? experimentApproval.nodeTypes.join(', ') : 'No typed nodes detected'}</span>
              </div>
              <div className="gcp-experiment-approval-warning">
                Candidate edits stay off-canvas, but nodes may write files, call networks, use GPU time, or incur API costs.
              </div>
        </ConfirmDialog>
      )}

      {runApproval && (
        <ConfirmDialog title="Run the current graph?" active={active}
          onCancel={() => handleRunDecision(false)} detailsLabel="Execution approval details"
          actions={<>
            <button className="gcp-stop-btn" onClick={run.stop} aria-label="Stop generation" title="Stop"><StopIcon /></button>
            <button className="gcp-approval-secondary" onClick={() => handleRunDecision(false)} data-autofocus>Cancel</button>
            <button className="gcp-approval-primary" onClick={() => handleRunDecision(true)}>Run graph</button>
          </>}>
              <div className="gcp-experiment-approval-hypothesis">
                {runApproval.reason}
              </div>
              <div className="gcp-experiment-approval-facts">
                <span>{runApproval.nodeCount} node{runApproval.nodeCount === 1 ? '' : 's'}</span>
                <span>{runApproval.edgeCount} edge{runApproval.edgeCount === 1 ? '' : 's'}</span>
                <span>device {runApproval.device}</span>
                <span>time cap {runApproval.timeoutMinutes} min</span>
              </div>
              <div className="gcp-experiment-approval-nodes">
                <strong>Nodes that will execute</strong>
                <span>{runApproval.nodeTypes.length > 0 ? runApproval.nodeTypes.join(', ') : 'No typed nodes detected'}</span>
              </div>
              <div className="gcp-experiment-approval-warning">
                This executes your live graph with real side effects — file writes, network
                calls, GPU time. Stop requests cancellation; completed side effects are not undone.
                Closing or navigating away leaves server-owned runs running and stops local timeout monitoring.
              </div>
        </ConfirmDialog>
      )}

      {busy && (
        <div className="gcp-runbar" role="status" aria-label="Agent activity" aria-live="off">
          <span className="gcp-runbar-pulse" aria-hidden="true" />
          <span className="gcp-runbar-phase">{runPhase}</span>
          {runLossSeries.length >= 2 && <RunSparkline series={runLossSeries} />}
          {liveStepCount > 0 && <span className="gcp-runbar-step">step {liveStepCount}</span>}
          {elapsed >= 1 && <span className="gcp-runbar-time">{elapsed}s</span>}
        </div>
      )}

      {/* Input area */}
      <div className="gcp-input-area">
        {/* Staged attachment chips */}
        {staged.length > 0 && (
          <div className="gcp-attachments" aria-label="Attachments">
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
                    {s.status === 'loading' ? 'reading…' : s.status === 'error' ? s.error || 'Could not read this file. Remove it to send.' : formatBytes(s.size)}
                  </span>
                </span>
                {s.status === 'loading' && <span className="gcp-chip-spinner" aria-hidden="true" />}
                <button
                  className="gcp-chip-remove"
                  onClick={() => removeStaged(s.id)}
                  aria-label={`Remove ${s.name}`}
                  title="Remove"
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        )}

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
            aria-label="Attach files"
            title="Attach image, PDF, or text/code"
          >
            <PaperclipIcon />
          </button>

          <textarea
            ref={textareaRef}
            className="gcp-textarea"
            rows={1}
            placeholder="Message Graph Copilot…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => { composingRef.current = true; }}
            onCompositionEnd={() => { composingRef.current = false; }}
            onPaste={handlePaste}
            disabled={busy || !ready}
            aria-label="Message input"
            aria-disabled={!ready ? 'true' : undefined}
          />

          {busy ? (
            !experimentApproval && !runApproval && (
              <button className="gcp-stop-btn" onClick={run.stop} aria-label="Stop generation" title="Stop">
                <StopIcon />
              </button>
            )
          ) : (
            <button
              className="gcp-send-btn"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
              title="Send"
            >
              <SendIcon />
            </button>
          )}
        </div>

        <div className="gcp-composer-bar">
          <div className="gcp-composer-context">
            <button className="gcp-context-chip" onClick={onOpenSettings} aria-label="Model settings"
              title={`${modelId || 'No model selected'} — ${ready ? 'Configured' : 'Setup required'}; open settings`}>
              <span className="gcp-context-chip-model">{modelId || 'Choose a model'}</span>
              <span className="gcp-configured">{ready ? 'Configured' : 'Setup required'}</span>
            </button>
            {effortOptions.length > 0 && (
              <label className="gcp-effort-control">
                <span>Reasoning</span>
                <select aria-label="Reasoning effort" value={selectedEffort} disabled={busy}
                  onChange={(event) => chooseEffort(event.target.value as ReasoningEffort | '')}
                  onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}>
                  <option value="">Model default{catalogEntry?.defaultReasoningEffort ? ` (${catalogEntry.defaultReasoningEffort})` : ''}</option>
                  {effortOptions.map((option) => <option key={option.effort} value={option.effort} title={option.description}>{option.effort}</option>)}
                </select>
              </label>
            )}
          </div>
          {!busy && <div className="gcp-composer-hint" aria-hidden="true">
            {anyLoading ? 'Reading attachments'
              : anyFailed ? 'Remove unreadable attachments'
              : 'Enter to send'}
          </div>}
        </div>

        {/* Provider-not-ready overlay */}
        {!ready && !busy && (
          <div className="gcp-not-ready-overlay">
            <span className="gcp-not-ready-label">{readinessReason(settings, codexLoggedIn)}</span>
            <button
              ref={setupRef}
              className="gcp-cta-btn"
              onClick={onOpenSettings}
              aria-label="Open settings to configure a provider"
            >
              Set up a provider            </button>
          </div>
        )}
      </div>
    </div>
  );
}
