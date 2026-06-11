import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { providerReady } from '../state/settings';
import type { Conversation, ChatTurn } from '../state/conversations';
import { newConversation, saveConversation, titleFrom } from '../state/conversations';
import { runTurn } from '../agent/loop';
import { MessageBubble } from './MessageBubble';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
}: ChatViewProps) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastUserText, setLastUserText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const ready = providerReady(settings, codexLoggedIn);

  // Cancel any in-flight stream when the panel unmounts
  useEffect(() => () => { abortRef.current?.abort(); }, []);

  // Auto-scroll to bottom whenever messages change or streaming text changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages, streamingText]);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const maxH = 110;
    ta.style.height = Math.min(ta.scrollHeight, maxH) + 'px';
  }, []);

  useEffect(() => {
    autoResize();
  }, [input, autoResize]);

  // ---------------------------------------------------------------------------
  // Send logic
  // ---------------------------------------------------------------------------

  const doSend = useCallback(
    async (userText: string) => {
      if (!userText.trim() || busy || !ready) return;

      setLastError(null);
      setLastUserText(userText);
      setInput('');
      setBusy(true);
      setStreamingText('');

      // Build the user turn
      const userTurn: ChatTurn = { role: 'user', content: userText.trim() };

      // Update conversation: set title if first message, append user turn
      let conv = { ...conversation };
      if (!conv.title) {
        conv.title = titleFrom(userText.trim());
      }
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
        userText: userText.trim(),
        callbacks: {
          onTextDelta(t) {
            streamBuf += t;
            setStreamingText(streamBuf);
          },
          onOpsApplied(_summary, _result) {
            // ops chip is attached via the turn's opsSummary
          },
          onTurnsCommitted(turns) {
            setStreamingText('');
            streamBuf = '';
            conv = {
              ...conv,
              messages: [...conv.messages, ...turns],
              updatedAt: Date.now(),
            };
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend(input);
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  const handleRetry = () => {
    doSend(lastUserText);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Visible messages: filter out tool turns but keep assistant turns (show opsSummary chips)
  const visibleMessages = conversation.messages.filter((t) => t.role !== 'tool');

  return (
    <div className="gcp-chat">
      {/* Message list */}
      <div className="gcp-messages" role="log" aria-live="polite" aria-label="Conversation">
        {visibleMessages.map((turn, i) => {
          const isLastAssistant =
            !busy &&
            i === visibleMessages.length - 1 &&
            turn.role === 'assistant';
          return (
            <MessageBubble
              key={i}
              turn={turn}
              error={isLastAssistant && lastError ? lastError : null}
              onRetry={handleRetry}
              retryDisabled={busy}
            />
          );
        })}

        {/* Streaming bubble */}
        {busy && (
          <MessageBubble
            turn={{ role: 'assistant', content: '' }}
            streaming
            streamingText={streamingText}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="gcp-input-area">
        <textarea
          ref={textareaRef}
          className="gcp-textarea"
          rows={1}
          placeholder="Message Graph Copilot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={busy || !ready}
          aria-label="Message input"
          aria-disabled={!ready ? 'true' : undefined}
        />

        {busy ? (
          <button
            className="gcp-stop-btn"
            onClick={handleStop}
            aria-label="Stop generation"
            title="Stop"
          >
            <StopIcon />
          </button>
        ) : (
          <button
            className="gcp-send-btn"
            onClick={() => doSend(input)}
            disabled={!input.trim() || !ready}
            aria-label="Send message"
            title="Send"
          >
            <SendIcon />
          </button>
        )}

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
