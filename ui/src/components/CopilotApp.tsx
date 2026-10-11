import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { loadSettings, saveSettings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import { Fab } from './Fab';
import { ChatWindow } from './ChatWindow';
import { codexStatus } from '../llm/client';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CopilotAppProps {
  api: CodefyUIPluginAPI;
}

// ---------------------------------------------------------------------------
// CopilotApp
// ---------------------------------------------------------------------------

export function CopilotApp({ api }: CopilotAppProps) {
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const panelId = useId();
  const fabRef = useRef<HTMLButtonElement>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const authRevision = useRef(0);
  const registerStop = useCallback((stop: () => void) => { stopRef.current = stop; }, []);
  const close = () => {
    stopRef.current?.();
    setOpen(false);
    fabRef.current?.focus();
  };
  const toggle = () => {
    if (open) close();
    else { setOpened(true); setOpen(true); }
  };
  const [settings, setSettings] = useState<Settings>(() => loadSettings(api));
  const [codexLoggedIn, setCodexLoggedIn] = useState(false);
  const [codexEmail, setCodexEmail] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation>(() =>
    newConversation(settings.provider, settings.models[settings.provider] ?? ''),
  );

  // Persist settings whenever they change
  useEffect(() => {
    saveSettings(api, settings);
  }, [api, settings]);

  // Recognize an existing ChatGPT/codex session as soon as the panel mounts
  // (and whenever the provider switches to codex), so the chat is usable right
  // away without first opening Settings. The post-sign-in poll lives in
  // SettingsView; this covers the already-logged-in-on-load case.
  useEffect(() => {
    if (settings.provider !== 'openai-codex') return;
    let cancelled = false;
    const revision = ++authRevision.current;
    codexStatus(api)
      .then((s) => {
        if (!cancelled && authRevision.current === revision) {
          setCodexLoggedIn(s.status === 'logged_in');
          setCodexEmail(s.status === 'logged_in' ? s.email ?? null : null);
        }
      })
      .catch(() => { /* ignore */ });
    return () => {
      cancelled = true;
    };
  }, [api, settings.provider]);

  const handleSettingsChange = (s: Settings) => {
    setSettings(s);
  };

  const handleCodexStatusChange = (loggedIn: boolean, email: string | null) => {
    authRevision.current += 1;
    setCodexLoggedIn(loggedIn);
    setCodexEmail(email);
  };

  const handleNewConversation = () => {
    setConversation(
      newConversation(
        settings.provider,
        settings.models[settings.provider] ?? '',
      ),
    );
  };

  const handleResumeConversation = (conv: Conversation) => {
    setConversation(conv);
  };

  return (
    <div className="gcp-root">
      <Fab onClick={toggle} expanded={open} controls={panelId} buttonRef={fabRef} />

      {opened && (
        <ChatWindow
          open={open}
          panelId={panelId}
          onStopReady={registerStop}
          api={api}
          settings={settings}
          codexLoggedIn={codexLoggedIn}
          codexEmail={codexEmail}
          conversation={conversation}
          onConversationChange={setConversation}
          onSettingsChange={handleSettingsChange}
          onCodexStatusChange={handleCodexStatusChange}
          onNewConversation={handleNewConversation}
          onResumeConversation={handleResumeConversation}
          onClose={close}
        />
      )}
    </div>
  );
}
