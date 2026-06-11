import React, { useState, useEffect } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { loadSettings, saveSettings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import { Fab } from './Fab';
import { ChatWindow } from './ChatWindow';

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

  const handleSettingsChange = (s: Settings) => {
    setSettings(s);
  };

  const handleCodexStatusChange = (loggedIn: boolean, email: string | null) => {
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
      <Fab onClick={() => setOpen((o) => !o)} />

      {open && (
        <ChatWindow
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
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
