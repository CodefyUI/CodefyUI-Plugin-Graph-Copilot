import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { providerReady } from '../state/settings';
import type { Conversation, ChatTurn } from '../state/conversations';
import { saveConversation, titleFrom, listConversations } from '../state/conversations';
import type { Attachment, AttachmentKind } from '../state/attachments';
import { classify, readFileAsAttachment, formatBytes } from '../state/attachments';
import { runTurn } from '../agent/loop';
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
}: ChatViewProps) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  /** Turns finalized during the in-flight run (staged display). */
  const [liveTurns, setLiveTurns] = useState<ChatTurn[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastUserText, setLastUserText] = useState('');
  const [lastAttachments, setLastAttachments] = useState<Attachment[]>([]);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [dragging, setDragging] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true); // stick to bottom unless the user scrolls up
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const dragDepth = useRef(0);

  const ready = providerReady(settings, codexLoggedIn);
  const anyLoading = staged.some((s) => s.status === 'loading');
  const readyAtts = staged.filter((s) => s.status === 'ready' && s.att).map((s) => s.att!);
  const canSend = ready && !busy && !anyLoading && (input.trim().length > 0 || readyAtts.length > 0);

  // Cancel any in-flight stream when the panel unmounts
  useEffect(() => () => { abortRef.current?.abort(); }, []);

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

  const doSend = useCallback(
    async (userText: string, atts: Attachment[]) => {
      const text = userText.trim();
      if ((!text && atts.length === 0) || busy || !ready) return;

      setLastError(null);
      setLastUserText(text);
      setLastAttachments(atts);
      setInput('');
      setStaged([]);
      setBusy(true);
      setStreamingText('');
      setLiveTurns([]);
      pinnedRef.current = true; // a fresh send re-pins the view to the bottom

      const userTurn: ChatTurn = { role: 'user', content: text };
      if (atts.length > 0) userTurn.attachments = atts;

      // Provider/model are stamped per send so history rows reflect what the
      // conversation actually ran on.
      let conv = { ...conversation };
      if (!conv.title) conv.title = titleFrom(text || atts[0]?.name || 'Attachment');
      conv.provider = settings.provider;
      conv.model = settings.models[settings.provider] ?? '';
      conv.messages = [...conv.messages, userTurn];
      conv.updatedAt = Date.now();
      onConversationChange(conv);
      saveConversation(api, conv);

      const abortCtrl = new AbortController();
      abortRef.current = abortCtrl;

      let streamBuf = '';

      await runTurn({
        api,
        settings,
        history: conv.messages.slice(0, -1), // exclude the user turn we just added
        userText: text,
        attachments: atts.length > 0 ? atts : undefined,
        callbacks: {
          onTextDelta(t) {
            streamBuf += t;
            setStreamingText(streamBuf);
          },
          onTurnAppended(turn) {
            // An assistant turn absorbs the text streamed so far — reset the
            // buffer so the next round streams into a fresh bubble.
            if (turn.role !== 'tool') {
              streamBuf = '';
              setStreamingText('');
            }
            setLiveTurns((prev) => [...prev, turn]);
          },
          onOpsApplied() { /* stage rows render live from the appended turns */ },
          onTurnsCommitted(turns) {
            setStreamingText('');
            streamBuf = '';
            setLiveTurns([]);
            conv = { ...conv, messages: [...conv.messages, ...turns], updatedAt: Date.now() };
            onConversationChange(conv);
            saveConversation(api, conv);
          },
          onError(msg) {
            setLastError(msg);
            setStreamingText('');
            streamBuf = '';
          },
          onFinished() {
            setBusy(false);
            abortRef.current = null;
          },
        },
        signal: abortCtrl.signal,
      });
    },
    [api, busy, conversation, onConversationChange, ready, settings],
  );

  const handleSend = () => doSend(input, readyAtts);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend(input, readyAtts);
    }
  };

  const handleStop = () => abortRef.current?.abort();
  const handleRetry = () => doSend(lastUserText, lastAttachments);

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
  const toolRunning = !!lastItem && lastItem.stages.some((s) => !s.result);
  const showThinking = busy && streamingText === '' && !toolRunning;

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
      {/* Message list */}
      <div
        className="gcp-messages"
        role="log"
        aria-live="polite"
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
                  <button key={s} className="gcp-suggestion" onClick={() => doSend(s, [])}>
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
          <MessageBubble key={item.key} turn={item.turn} stages={item.stages} />
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
          <div className="gcp-thinking" role="status" aria-label="Waiting for the assistant">
            <span className="gcp-thinking-orb" aria-hidden="true">✦</span>
            <span className="gcp-thinking-text">Thinking</span>
            {elapsed >= 3 && <span className="gcp-thinking-time">{elapsed}s</span>}
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
            <button className="gcp-retry-btn" onClick={handleRetry} aria-label="Retry">
              Retry
            </button>
          </div>
        )}
      </div>

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
                    {s.status === 'loading' ? 'reading…' : s.status === 'error' ? 'failed' : formatBytes(s.size)}
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
            onPaste={handlePaste}
            disabled={busy || !ready}
            aria-label="Message input"
            aria-disabled={!ready ? 'true' : undefined}
          />

          {busy ? (
            <button className="gcp-stop-btn" onClick={handleStop} aria-label="Stop generation" title="Stop">
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
            ? 'Generating — use the stop button to interrupt'
            : 'Enter to send · Shift+Enter for a new line'}
        </div>

        {/* Provider-not-ready overlay */}
        {!ready && !busy && (
          <div className="gcp-not-ready-overlay">
            <span className="gcp-not-ready-label">Configure a provider in Settings</span>
            <button
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
