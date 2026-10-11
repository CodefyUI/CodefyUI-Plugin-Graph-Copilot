import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { providerReady, readinessReason } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { listConversations } from '../state/conversations';
import type { Attachment, AttachmentKind } from '../state/attachments';
import { classify, readFileAsAttachment, formatBytes } from '../state/attachments';
import type { AgentMode } from '../agent/types';
import { useAgentRun } from './useAgentRun';
import { MessageBubble } from './MessageBubble';
import { groupTurns } from './turnStages';

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

const SUGGESTIONS = [
  'Build a small CNN image classifier',
  'Explain what my current graph does',
  'Improve my current graph',
];

// ---------------------------------------------------------------------------
// ChatView props
// ---------------------------------------------------------------------------

export interface ChatViewProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  codexLoggedIn: boolean;
  conversation: Conversation;
  onConversationChange: (c: Conversation) => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  active?: boolean;
  onBusyChange?: (busy: boolean) => void;
  onStopReady?: (stop: () => void) => void;
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
  onOpenSettings,
  onOpenHistory,
  active = true,
  onBusyChange,
  onStopReady,
}: ChatViewProps) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AgentMode>(conversation.mode ?? 'edit');
  const [elapsed, setElapsed] = useState(0);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [dragging, setDragging] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const run = useAgentRun({ api, settings, conversation, onConversationChange, active, onBusyChange });
  const { busy, streamingText, liveTurns, error: lastError } = run;
  useEffect(() => { onStopReady?.(run.stop); }, [onStopReady, run.stop]);

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
    if (el && pinnedRef.current) el.scrollTop = el.scrollHeight;
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
    void run.start('Continue the previous request from the current graph. Read it again first; do not replay operations already applied.', [], mode);
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
  const toolRunning = !!lastItem && liveTurns.includes(lastItem.turn) && lastItem.stages.some((s) => !s.result);
  const showThinking = busy && streamingText === '' && !toolRunning && !run.confirmation;

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
        <span>{mode === 'ask' ? 'Read-only guidance' : 'Can change the current graph'}</span>
      </div>
      <span className="gcp-sr-only" role="status" aria-live="polite">
        {busy ? run.phase === 'awaiting_confirmation' ? 'Waiting for your confirmation' : 'Assistant working' :
          run.summary ? `Run ${run.summary.status}` : ''}
      </span>
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
            <div className="gcp-welcome-mark" aria-hidden="true">✦</div>
            <div className="gcp-welcome-title">Build graphs by conversation</div>
            <div className="gcp-welcome-sub">
              Describe the pipeline you want, ask for parameter changes, or attach an image,
              PDF, or code file for context.
            </div>
            {ready && (
              <div className="gcp-welcome-suggestions" aria-label="Suggested prompts">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="gcp-suggestion" onClick={() => {
                    setInput(s);
                    textareaRef.current?.focus();
                  }}>
                    {s}
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
            active={busy && liveTurns.includes(item.turn)} />
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
            <span className="gcp-thinking-orb" aria-hidden="true">✦</span>
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
            ) : run.summary?.mutationAttempted ? (
              <>
                <span>Changes already made are kept. Stop does not undo them.</span>
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
        <div className="gcp-confirmation" role="group" aria-label="Confirm clearing the graph">
          <strong>Clear the current graph?</strong>
          <p>This removes {run.confirmation.nodeCount} nodes and {run.confirmation.edgeCount} edges. Changes are not automatically undone.</p>
          <div className="gcp-confirmation-actions">
            <button className="gcp-secondary-btn" onClick={() => run.decide(false)} autoFocus>Keep graph</button>
            <button className="gcp-danger-btn" onClick={() => run.decide(true)}>Clear graph</button>
          </div>
        </div>
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
            <button className="gcp-stop-btn" onClick={run.stop} aria-label="Stop generation" title="Stop">
              <StopIcon />
            </button>
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

        {/* Keyboard hint */}
        <div className="gcp-input-hint" aria-hidden="true">
          {busy
            ? 'Stopping keeps changes already applied'
            : anyLoading ? 'Wait for attachments to finish reading'
            : anyFailed ? 'Remove unreadable attachments before sending'
            : 'Enter to send · Shift+Enter for a new line'}
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
              Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
