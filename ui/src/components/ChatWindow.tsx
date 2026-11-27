import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { ChatView } from './ChatView';
import { ExperimentsView } from './ExperimentsView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';
import { SkillsView } from './SkillsView';
import type { SlashCommand } from './SlashMenu';
import { fetchAgentContext, invalidateAgentContext, type AgentContext } from '../agent/hostContext';
import { useT } from '../i18n';
import type { PluginPanelBadge } from '../types/codefyui';
import { providerReady } from '../state/settings';
import { agentState, badgeFor, type AgentActivity, type AgentState } from './agentStatus';

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

function SkillsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10l2 2.5h6.5A1.5 1.5 0 0 1 20 8v10.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

type View = 'chat' | 'experiments' | 'history' | 'skills' | 'settings';

/** The host's agent context: undefined while unknown, null without Agent Skills. */
function useAgentContext(api: CodefyUIPluginAPI) {
  const [context, setContext] = useState<AgentContext | null | undefined>(undefined);
  const refresh = useCallback((force = false) => {
    let live = true;
    if (force) invalidateAgentContext(api);
    void fetchAgentContext(api, { force }).then((value) => { if (live) setContext(value); });
    return () => { live = false; };
  }, [api]);
  useEffect(() => refresh(), [refresh]);
  return { context, refresh };
}
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
  /** The host's side dock, or the plugin's own floating window. */
  dock?: 'side' | 'floating';
  /** Whether the user can see the panel right now. */
  visible?: boolean;
  /** Side dock: the toolbar toggle's state dot. */
  onBadge?: (badge: PluginPanelBadge | null) => void;
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

function NewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const STATE_GLYPH: Record<AgentState, string> = { needs_you: '!', done: '✓', working: '⚙', idle: '○' };

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
  dock = 'floating',
  visible = open,
  onBadge,
}: ChatWindowProps) {
  const t = useT();
  const [view, setView] = useState<View>('chat');
  const { context: agentContext, refresh: refreshContext } = useAgentContext(api);
  const [panelMode, setPanelMode] = useState<PanelMode>('compact');
  const [graphStats, setGraphStats] = useState<GraphStats>(() => readGraphStats(api));
  const [busy, setBusy] = useState(false);
  const [activity, setActivity] = useState<AgentActivity>({ busy: false, needsApproval: false, atBottom: true, finishedRun: 0 });
  const [seenRun, setSeenRun] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefill, setPrefill] = useState<{ id: number; text: string } | null>(null);
  const busyRef = useRef(false);
  const detachRef = useRef<(() => void) | null>(null);
  const viewRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const registerDetach = useCallback((detach: () => void) => {
    detachRef.current = detach;
    onDetachReady?.(detach);
  }, [onDetachReady]);
  const handleBusy = useCallback((value: boolean) => {
    busyRef.current = value;
    setBusy(value);
  }, []);

  // Done = a turn ended that the user has not looked at yet.
  const looking = visible && view === 'chat' && activity.atBottom;
  useEffect(() => { if (looking && activity.finishedRun > seenRun) setSeenRun(activity.finishedRun); }, [looking, activity.finishedRun, seenRun]);
  const state = agentState({
    busy: activity.busy || busy,
    needsApproval: activity.needsApproval,
    providerMissing: !providerReady(settings, codexLoggedIn),
    unseenDone: activity.finishedRun > seenRun && !looking,
  });
  useEffect(() => { onBadge?.(badgeFor(state)); }, [onBadge, state]);

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
    setMenuOpen(false);
    if (next !== 'chat') detachRef.current?.();
    // Pressing the open view's button again goes back to the conversation.
    setView(next);
  };
  const startStudy = (text: string) => {
    if (busyRef.current) return;
    setPrefill((previous) => ({ id: (previous?.id ?? 0) + 1, text }));
    setView('chat');
  };
  const close = () => { detachRef.current?.(); onClose(); };
  const slashCommand = (command: SlashCommand) => {
    if (command === 'new') handleNew();
    else if (command === 'skills') navigate('skills');
    else if (command === 'settings') navigate('settings');
  };
  const skillsOn = agentContext != null;
  useEffect(() => { if (!skillsOn && view === 'skills') setView('chat'); }, [skillsOn, view]);

  const navItems: Array<{ id: View; label: string; ariaLabel: string; icon: React.ReactNode }> = [
    { id: 'chat', label: t('nav.chat'), ariaLabel: t('nav.chat.aria'), icon: <ChatIcon /> },
    { id: 'experiments', label: t('nav.lab'), ariaLabel: t('nav.lab.aria'), icon: <LabIcon /> },
    { id: 'history', label: t('nav.history'), ariaLabel: t('nav.history.aria'), icon: <HistoryIcon /> },
    // Only on a host with Agent Skills (CodefyUI with apiVersion 6).
    ...(skillsOn ? [{ id: 'skills' as View, label: t('skills.title'), ariaLabel: t('skills.title'), icon: <SkillsIcon /> }] : []),
    { id: 'settings', label: t('nav.settings'), ariaLabel: t('nav.settings'), icon: <GearIcon /> },
  ];
  const stateLabel = t(`state.${state}` as const);
  const title = conversation.title || t('chat.untitled');
  const floating = dock === 'floating';

  return (
    <div
      id={panelId}
      className={`gcp-window gcp-window--${floating ? panelMode : 'side'}`}
      role={floating ? 'dialog' : 'region'}
      aria-label={floating ? 'Graph Copilot agent workbench' : 'Copilot'}
      data-panel-mode={floating ? panelMode : 'side'}
      data-agent-state={state}
      hidden={!open}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
          if (menuOpen) { event.stopPropagation(); setMenuOpen(false); menuButtonRef.current?.focus(); return; }
          if (!floating) return;
          event.stopPropagation();
          close();
        }
      }}
    >
      <header className="gcp-header">
        <span className={`gcp-state gcp-state--${state}`} title={t(`state.${state}.hint` as const)}>
          <span className="gcp-state-glyph" aria-hidden="true">{STATE_GLYPH[state]}</span>
          <span className="gcp-state-label">{stateLabel}</span>
        </span>
        <h1 className="gcp-header-title" title={title}>{title}</h1>

        <div className="gcp-header-actions">
          <nav className="gcp-header-nav" aria-label={t('nav.label')}>
            <button className="gcp-icon-btn" onClick={handleNew} disabled={busy}
              aria-label={t('nav.new')} title={busy ? t('nav.new.busy') : t('nav.new')}>
              <NewIcon />
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`gcp-icon-btn gcp-nav-btn${view === item.id ? ' active' : ''}`}
                onClick={() => navigate(item.id)}
                aria-label={item.ariaLabel}
                title={item.label}
                aria-current={view === item.id ? 'page' : undefined}
              >
                {item.icon}
              </button>
            ))}
          </nav>
          <div className="gcp-header-more">
            <button ref={menuButtonRef} className="gcp-icon-btn" aria-label={t('nav.more')} title={t('nav.more')}
              aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
              <MoreIcon />
            </button>
            {menuOpen && (
              <ul className="gcp-menu" role="menu" aria-label={t('nav.more')}
                ref={(element) => { element?.querySelector<HTMLElement>('[role="menuitem"]')?.focus(); }}
                onKeyDown={(event) => {
                  const items = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')];
                  const index = items.indexOf(document.activeElement as HTMLElement);
                  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
                  }
                }}>
                <li role="none">
                  <button role="menuitem" className="gcp-menu-item" disabled={busy} onClick={() => { setMenuOpen(false); handleNew(); }}>
                    <NewIcon /><span>{t('nav.new')}</span>
                  </button>
                </li>
                {navItems.map((item) => (
                  <li role="none" key={item.id}>
                    <button role="menuitem" className="gcp-menu-item" aria-current={view === item.id ? 'page' : undefined}
                      onClick={() => navigate(item.id)}>
                      {item.icon}<span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {floating && (
            <>
              <button
                className="gcp-icon-btn gcp-header-expand"
                onClick={() => setPanelMode((mode) => mode === 'compact' ? 'expanded' : 'compact')}
                aria-label={panelMode === 'compact' ? t('window.expand') : t('window.compact')}
                title={panelMode === 'compact' ? t('window.expand') : t('window.compact')}
              >
                <ExpandIcon expanded={panelMode === 'expanded'} />
              </button>
              <button className="gcp-icon-btn" onClick={close} aria-label={t('window.close')} title={t('window.close')}>
                <CloseIcon />
              </button>
            </>
          )}
        </div>
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
            agentContext={agentContext ?? null}
            onSlashCommand={slashCommand}
            onActivity={setActivity}
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

        {open && view === 'skills' && skillsOn && (
          <SkillsView api={api} onChanged={() => refreshContext(true)} />
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
