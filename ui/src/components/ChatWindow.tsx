import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { ChatView } from './ChatView';
import { ExperimentsView } from './ExperimentsView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';
import { GraphMark } from './GraphMark';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 15a3 3 0 0 1-3 3H8l-4 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 15h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return expanded ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types and graph context
// ---------------------------------------------------------------------------

type View = 'chat' | 'experiments' | 'history' | 'settings';
type PanelMode = 'compact' | 'expanded';

export interface GraphStats {
  nodes: number;
  edges: number;
  available: boolean;
}

function readGraphStats(api: CodefyUIPluginAPI): GraphStats {
  try {
    const graph = api.graph?.getGraph?.();
    if (!graph) return { nodes: 0, edges: 0, available: false };
    return {
      nodes: Array.isArray(graph.nodes) ? graph.nodes.length : 0,
      edges: Array.isArray(graph.edges) ? graph.edges.length : 0,
      available: true,
    };
  } catch {
    return { nodes: 0, edges: 0, available: false };
  }
}

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
  open?: boolean;
  panelId?: string;
  onDetachReady?: (detach: () => void) => void;
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
  open = true,
  panelId = 'graph-copilot-panel',
  onDetachReady,
}: ChatWindowProps) {
  const [view, setView] = useState<View>('chat');
  const [panelMode, setPanelMode] = useState<PanelMode>('compact');
  const [graphStats, setGraphStats] = useState<GraphStats>(() => readGraphStats(api));
  const [busy, setBusy] = useState(false);
  const [prefill, setPrefill] = useState<{ id: number; text: string } | null>(null);
  const busyRef = useRef(false);
  const detachRef = useRef<(() => void) | null>(null);
  const viewRef = useRef<HTMLElement>(null);
  const registerDetach = useCallback((detach: () => void) => {
    detachRef.current = detach;
    onDetachReady?.(detach);
  }, [onDetachReady]);
  const handleBusy = useCallback((value: boolean) => {
    busyRef.current = value;
    setBusy(value);
  }, []);

  useEffect(() => {
    if (open && view !== 'chat') viewRef.current?.focus();
  }, [open, view]);

  useEffect(() => {
    const refresh = () => setGraphStats(readGraphStats(api));
    refresh();
    try {
      return api.graph?.onGraphChanged?.(refresh);
    } catch {
      return undefined;
    }
  }, [api]);

  const handleResume = (conv: Conversation) => {
    if (busyRef.current) return;
    onResumeConversation(conv);
    setView('chat');
  };

  const handleNew = () => {
    if (busyRef.current) return;
    onNewConversation();
    setView('chat');
  };

  const navigate = (next: View) => {
    if (next !== 'chat') detachRef.current?.();
    setView(next);
  };
  const startStudy = (text: string) => {
    if (busyRef.current) return;
    setPrefill((previous) => ({ id: (previous?.id ?? 0) + 1, text }));
    setView('chat');
  };
  const close = () => { detachRef.current?.(); onClose(); };

  const navItems: Array<{ id: View; label: string; ariaLabel: string; icon: React.ReactNode }> = [
    { id: 'chat', label: 'Chat', ariaLabel: 'Agent chat', icon: <ChatIcon /> },
    { id: 'experiments', label: 'Lab', ariaLabel: 'Experiments lab', icon: <LabIcon /> },
    { id: 'history', label: 'History', ariaLabel: 'Conversation history', icon: <HistoryIcon /> },
    { id: 'settings', label: 'Settings', ariaLabel: 'Settings', icon: <GearIcon /> },
  ];

  return (
    <div
      id={panelId}
      className={`gcp-window gcp-window--${panelMode}`}
      role="dialog"
      aria-label="Graph Copilot agent workbench"
      data-panel-mode={panelMode}
      hidden={!open}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
          event.stopPropagation();
          close();
        }
      }}
    >
      <header className="gcp-workbench-header">
        <div className="gcp-header-main">
          <div className="gcp-brand">
            <span className="gcp-header-mark"><GraphMark /></span>
            <strong>Graph Copilot</strong>
          </div>

          <div className="gcp-header-actions">
            <button className="gcp-icon-btn" onClick={handleNew} disabled={busy}
              aria-label="New conversation" title={busy ? 'Wait for the current turn to settle' : 'New conversation'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <button
              className="gcp-icon-btn"
              onClick={() => setPanelMode((mode) => mode === 'compact' ? 'expanded' : 'compact')}
              aria-label={panelMode === 'compact' ? 'Expand panel' : 'Use compact panel'}
              title={panelMode === 'compact' ? 'Expand workspace' : 'Compact workspace'}
            >
              <ExpandIcon expanded={panelMode === 'expanded'} />
            </button>

            <button className="gcp-icon-btn" onClick={close} aria-label="Close panel" title="Close">
              <CloseIcon />
            </button>
          </div>
        </div>

        <nav className="gcp-workbench-nav" aria-label="Agent workbench views">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`gcp-nav-btn${view === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
              aria-label={item.ariaLabel}
              aria-current={view === item.id ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="gcp-view" ref={viewRef} tabIndex={-1}>
        {/* Keep the composer mounted so navigating or closing preserves drafts. */}
        <div className="gcp-chat-view" hidden={view !== 'chat'}>
          <ChatView
            api={api}
            settings={settings}
            codexLoggedIn={codexLoggedIn}
            conversation={conversation}
            onConversationChange={onConversationChange}
            onSettingsChange={onSettingsChange}
            onOpenSettings={() => navigate('settings')}
            onOpenHistory={() => navigate('history')}
            active={open && view === 'chat'}
            onBusyChange={handleBusy}
            onDetachReady={registerDetach}
            graphContext={graphStats}
            prefill={prefill}
          />
        </div>

        {open && view === 'experiments' && <ExperimentsView api={api} onStartStudy={busy ? undefined : startStudy} />}

        {open && view === 'history' && (
          <HistoryView
            api={api}
            activeId={conversation.id}
            onResume={handleResume}
            onNew={handleNew}
            disabled={busy}
          />
        )}

        {open && view === 'settings' && (
          <SettingsView
            api={api}
            settings={settings}
            codexLoggedIn={codexLoggedIn}
            codexEmail={codexEmail}
            onCodexStatusChange={onCodexStatusChange}
            onChange={onSettingsChange}
          />
        )}
      </main>
    </div>
  );
}
