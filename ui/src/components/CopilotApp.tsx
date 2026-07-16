import React, { useState, useEffect } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import {
  activeReasoningEffort,
  loadSettings,
  reconcileModelCatalogSettings,
  saveSettings,
} from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import { Fab } from './Fab';
import { ChatWindow } from './ChatWindow';
import { codexStatus, fetchModelCatalog } from '../llm/client';
import {
  clearModelCatalogCache,
  modelCatalogCacheKey,
  readCachedModelCatalog,
  writeCachedModelCatalog,
} from '../llm/models';
import {
  coordinatedCodexStatus,
} from '../llm/codexStatusEpoch';

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
    newConversation(
      settings.provider,
      settings.models[settings.provider] ?? '',
      activeReasoningEffort(settings),
    ),
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
    coordinatedCodexStatus(() => codexStatus(api))
      .then((s) => {
        if (cancelled || s === null) return;
        const loggedIn = s.status === 'logged_in';
        const email = loggedIn ? s.email ?? null : null;
        if (loggedIn !== codexLoggedIn || email !== codexEmail) {
          setSettings((current) => reconcileModelCatalogSettings(
            current,
            'openai-codex',
            [],
            { reasoningEffort: false, richModelCatalog: false },
          ));
        }
        if (!loggedIn) clearModelCatalogCache('openai-codex');
        setCodexLoggedIn(loggedIn);
        setCodexEmail(email);
      })
      .catch(() => { /* ignore */ });
    return () => {
      cancelled = true;
    };
    // codexLoggedIn/email are intentionally snapshots for identity-change
    // detection; adding them would turn this one-shot status read into a loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, settings.provider]);

  // Prime the active built-in provider catalog on startup/provider changes.
  // Besides making future models available immediately when Settings opens,
  // this renegotiates non-persisted host capabilities so a saved effort can
  // safely resume after a page reload without trusting stale host metadata.
  useEffect(() => {
    const provider = settings.provider;
    if (provider === 'custom') return;

    const apiKey = provider === 'openai'
      ? settings.apiKeys.openai
      : provider === 'openrouter'
      ? settings.apiKeys.openrouter
      : provider === 'anthropic'
      ? settings.apiKeys.anthropic
      : undefined;
    const canQuery = provider === 'openai-codex' ? codexLoggedIn : Boolean(apiKey);
    if (!canQuery) return;

    const identity = modelCatalogCacheKey(
      provider,
      provider === 'openai-codex'
        ? codexEmail ?? 'active-codex-session'
        : apiKey,
    );
    let cancelled = false;
    const applyCatalog = (result: Awaited<ReturnType<typeof fetchModelCatalog>>) => {
      if (cancelled) return;
      setSettings((current) => {
        if (current.provider !== provider) return current;
        const currentApiKey = provider === 'openai'
          ? current.apiKeys.openai
          : provider === 'openrouter'
          ? current.apiKeys.openrouter
          : provider === 'anthropic'
          ? current.apiKeys.anthropic
          : undefined;
        if (provider !== 'openai-codex' && currentApiKey !== apiKey) return current;
        return reconcileModelCatalogSettings(
          current,
          provider,
          result.models,
          result.capabilities,
          result.source,
        );
      });
    };

    const cached = readCachedModelCatalog(identity);
    if (cached) {
      applyCatalog(cached);
      return () => {
        cancelled = true;
      };
    }

    fetchModelCatalog(api, provider, apiKey)
      .then((result) => {
        if (cancelled) return;
        writeCachedModelCatalog(identity, result);
        applyCatalog(result);
      })
      .catch(() => { /* Settings exposes refresh errors; startup stays quiet. */ });
    return () => {
      cancelled = true;
    };
  }, [
    api,
    settings.provider,
    settings.apiKeys.openai,
    settings.apiKeys.openrouter,
    settings.apiKeys.anthropic,
    codexLoggedIn,
    codexEmail,
  ]);

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
        activeReasoningEffort(settings),
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
