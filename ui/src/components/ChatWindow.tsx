import React, { useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { ChatView } from './ChatView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function HistoryIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type View = 'chat' | 'history' | 'settings';

export interface ChatWindowProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  codexLoggedIn: boolean;
  codexEmail: string | null;
  conversation: Conversation;
  onConversationChange: (c: Conversation) => void;
  onSettingsChange: (s: Settings) => void;
  onCodexStatusChange: (loggedIn: boolean, email: string | null) => void;
  onNewConversation: () => void;
  onResumeConversation: (c: Conversation) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// ChatWindow
// ---------------------------------------------------------------------------

export function ChatWindow({
  api,
  settings,
  codexLoggedIn,
  codexEmail,
  conversation,
  onConversationChange,
  onSettingsChange,
  onCodexStatusChange,
  onNewConversation,
  onResumeConversation,
  onClose,
}: ChatWindowProps) {
  const [view, setView] = useState<View>('chat');

  const handleResume = (conv: Conversation) => {
    onResumeConversation(conv);
    setView('chat');
  };

  const handleNew = () => {
    onNewConversation();
    setView('chat');
  };

  const switchTo = (v: View) => {
    setView((prev) => (prev === v ? 'chat' : v));
  };

  return (
    <div className="gcp-window" role="dialog" aria-label="Graph Copilot">
      {/* Header */}
      <div className="gcp-header">
        <span className="gcp-header-title">
          <span className="gcp-header-mark" aria-hidden="true">✦</span>
          Graph Copilot
        </span>

        <button
          className={`gcp-label-btn${view === 'history' ? ' active' : ''}`}
          onClick={() => switchTo('history')}
          aria-label="Conversation history"
          title="Previous conversations"
        >
          <HistoryIcon />
          <span>History</span>
        </button>

        <button
          className={`gcp-icon-btn${view === 'settings' ? ' active' : ''}`}
          onClick={() => switchTo('settings')}
          aria-label="Settings"
          title="Settings"
        >
          <GearIcon />
        </button>

        <button
          className="gcp-icon-btn"
          onClick={onClose}
          aria-label="Close panel"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* View content */}
      <div className="gcp-view">
        {view === 'chat' && (
          <ChatView
            api={api}
            settings={settings}
            codexLoggedIn={codexLoggedIn}
            conversation={conversation}
            onConversationChange={onConversationChange}
            onOpenSettings={() => setView('settings')}
            onOpenHistory={() => setView('history')}
          />
        )}

        {view === 'history' && (
          <HistoryView
            api={api}
            activeId={conversation.id}
            onResume={handleResume}
            onNew={handleNew}
          />
        )}

        {view === 'settings' && (
          <SettingsView
            api={api}
            settings={settings}
            codexLoggedIn={codexLoggedIn}
            codexEmail={codexEmail}
            onCodexStatusChange={onCodexStatusChange}
            onChange={onSettingsChange}
          />
        )}
      </div>
    </div>
  );
}
