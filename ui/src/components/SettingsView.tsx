import React, { useState, useEffect, useRef } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { reconcileModelCatalogSettings } from '../state/settings';
import type { Provider } from '../llm/client';
import { fetchModelCatalog, codexLogin, codexStatus, codexLogout } from '../llm/client';
import type {
  ModelCatalogCapabilities,
  ModelCatalogEntry,
  ReasoningEffort,
} from '../llm/models';
import {
  catalogEntryForModel,
  clearModelCatalogCache,
  mergeModelCatalog,
  modelCatalogCacheKey,
  readCachedModelCatalog,
  writeCachedModelCatalog,
} from '../llm/models';
import {
  coordinatedCodexStatus,
  invalidateCodexStatusGeneration,
  isCurrentCodexStatusGeneration,
} from '../llm/codexStatusEpoch';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROVIDER_LABELS: Record<Provider, string> = {
  openai: 'OpenAI API',
  'openai-codex': 'OpenAI Codex (ChatGPT)',
  openrouter: 'OpenRouter',
  anthropic: 'Claude API',
  custom: 'Custom (OpenAI-compatible)',
};

const KEY_PROVIDERS: Array<'openai' | 'openrouter' | 'anthropic' | 'custom'> = [
  'openai',
  'openrouter',
  'anthropic',
  'custom',
];

// ---------------------------------------------------------------------------
// Codex sign-in poll constants
// ---------------------------------------------------------------------------

const CODEX_POLL_INTERVAL_MS = 2000;
const CODEX_POLL_MAX_MS = 5 * 60 * 1000; // 5 minutes
const NO_MODEL_CAPABILITIES: ModelCatalogCapabilities = {
  reasoningEffort: false,
  richModelCatalog: false,
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SettingsViewProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  codexLoggedIn: boolean;
  codexEmail: string | null;
  onCodexStatusChange: (loggedIn: boolean, email: string | null) => void;
  onChange: (s: Settings) => void;
}

// ---------------------------------------------------------------------------
// PasswordInput — single-field with show/hide toggle
// ---------------------------------------------------------------------------

function PasswordInput({
  value,
  onBlur,
  placeholder,
  'aria-label': ariaLabel,
}: {
  value: string;
  onBlur: (v: string) => void;
  placeholder?: string;
  'aria-label': string;
}) {
  const [show, setShow] = useState(false);
  const [local, setLocal] = useState(value);

  // Sync when parent value changes (e.g. provider switch)
  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <div className="gcp-key-row">
      <input
        type={show ? 'text' : 'password'}
        className="gcp-input"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={() => onBlur(local)}
        placeholder={placeholder ?? 'API key'}
        aria-label={ariaLabel}
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="button"
        className="gcp-show-btn"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide key' : 'Show key'}
        title={show ? 'Hide' : 'Show'}
      >
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SettingsView
// ---------------------------------------------------------------------------

export function SettingsView({
  api,
  settings,
  codexLoggedIn,
  codexEmail,
  onCodexStatusChange,
  onChange,
}: SettingsViewProps) {
  const provider = settings.provider;

  const activeApiKey = provider === 'openai'
    ? settings.apiKeys.openai
    : provider === 'openrouter'
    ? settings.apiKeys.openrouter
    : provider === 'anthropic'
    ? settings.apiKeys.anthropic
    : provider === 'custom'
    ? settings.apiKeys.custom
    : undefined;
  const activeBaseUrl = provider === 'custom' ? settings.customBaseUrl : undefined;
  const activeCatalogIdentity = modelCatalogCacheKey(
    provider,
    provider === 'openai-codex'
      ? codexEmail ?? (codexLoggedIn ? 'active-codex-session' : '')
      : activeApiKey,
    activeBaseUrl,
  );

  const [discoveredCatalog, setDiscoveredCatalog] = useState<{
    provider: Provider;
    identity: string;
    models: ModelCatalogEntry[];
  }>({ provider, identity: activeCatalogIdentity, models: [] });
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const catalogRequestRef = useRef(0);
  const settingsRef = useRef(settings);
  const onChangeRef = useRef(onChange);
  const onCodexStatusChangeRef = useRef(onCodexStatusChange);
  const codexLoggedInRef = useRef(codexLoggedIn);
  const codexEmailRef = useRef(codexEmail);
  const previousCodexLoggedInRef = useRef(codexLoggedIn);

  const [codexError, setCodexError] = useState<string | null>(null);
  const [codexPending, setCodexPending] = useState(false);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);

  settingsRef.current = settings;
  onChangeRef.current = onChange;
  onCodexStatusChangeRef.current = onCodexStatusChange;
  codexLoggedInRef.current = codexLoggedIn;
  codexEmailRef.current = codexEmail;

  const selectedModel = settings.models[provider] ?? '';
  const modelList = mergeModelCatalog(
    provider,
    discoveredCatalog.provider === provider
      && discoveredCatalog.identity === activeCatalogIdentity
      ? discoveredCatalog.models
      : [],
    selectedModel,
  );
  const selectedCatalogEntry = catalogEntryForModel(provider, selectedModel, modelList);
  const reasoningCapability =
    settings.providerCapabilities?.[provider]?.reasoningEffort === true;
  const reasoningOptions = reasoningCapability
    ? selectedCatalogEntry?.reasoningEfforts ?? []
    : [];

  // Clear codex poll on unmount or view change
  useEffect(() => {
    return () => {
      if (pollTimerRef.current !== null) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, []);

  // Check Codex status when Settings opens or the provider changes to Codex.
  useEffect(() => {
    let active = true;
    if (provider === 'openai-codex') {
      coordinatedCodexStatus(() => codexStatus(api))
        .then((s) => {
          if (active && s !== null) {
            const loggedIn = s.status === 'logged_in';
            const email = loggedIn ? s.email ?? null : null;
            if (
              loggedIn !== codexLoggedInRef.current
              || email !== codexEmailRef.current
            ) {
              clearModelCatalogCache('openai-codex');
              publishCatalogMetadata('openai-codex', [], NO_MODEL_CAPABILITIES);
            }
            onCodexStatusChangeRef.current(loggedIn, email);
          }
        })
        .catch(() => { /* ignore */ });
    }
    return () => {
      active = false;
    };
  }, [api, provider]);

  // A logged-out Codex session must not leave an account-scoped catalog for a
  // later account. Successful interactive login also clears before refetching.
  useEffect(() => {
    if (previousCodexLoggedInRef.current && !codexLoggedIn) {
      clearModelCatalogCache('openai-codex');
    }
    previousCodexLoggedInRef.current = codexLoggedIn;
  }, [codexLoggedIn]);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function updateSettings(patch: Partial<Settings>) {
    const next = { ...settingsRef.current, ...patch };
    settingsRef.current = next;
    onChangeRef.current(next);
  }

  function updateModel(value: string) {
    const current = settingsRef.current;
    const reasoningEfforts = { ...current.reasoningEfforts };
    const selectedEffort = reasoningEfforts[provider];
    const nextEntry = catalogEntryForModel(provider, value, modelList);
    const effortSupported = Boolean(nextEntry?.reasoningEfforts?.some(
      (option) => option.effort === selectedEffort,
    ));
    if (
      selectedEffort
      && nextEntry?.reasoningEfforts
      && !effortSupported
    ) {
      delete reasoningEfforts[provider];
    }
    const currentCapability = current.providerCapabilities?.[provider];
    const nextCapability = currentCapability ? {
      reasoningEffort: currentCapability.reasoningEffort,
      richModelCatalog: currentCapability.richModelCatalog,
      ...(selectedEffort && effortSupported ? { reasoningModel: value } : {}),
    } : undefined;
    updateSettings({
      models: { ...current.models, [provider]: value },
      reasoningEfforts,
      ...(nextCapability ? {
        providerCapabilities: {
          ...current.providerCapabilities,
          [provider]: nextCapability,
        },
      } : {}),
    });
  }

  function updateReasoningEffort(value: string) {
    const current = settingsRef.current;
    const reasoningEfforts = { ...current.reasoningEfforts };
    if (value === '') {
      delete reasoningEfforts[provider];
    } else {
      reasoningEfforts[provider] = value as ReasoningEffort;
    }
    const currentCapability = current.providerCapabilities?.[provider];
    const nextCapability = currentCapability ? {
      reasoningEffort: currentCapability.reasoningEffort,
      richModelCatalog: currentCapability.richModelCatalog,
      ...(value ? { reasoningModel: current.models[provider] ?? '' } : {}),
    } : undefined;
    updateSettings({
      reasoningEfforts,
      ...(nextCapability ? {
        providerCapabilities: {
          ...current.providerCapabilities,
          [provider]: nextCapability,
        },
      } : {}),
    });
  }

  function updateKey(provKey: 'openai' | 'openrouter' | 'anthropic' | 'custom', value: string) {
    const current = settingsRef.current;
    const providerCapabilities = { ...current.providerCapabilities };
    // Capability negotiation is credential-scoped. Never let a request made
    // with a newly entered key reuse the previous key's reasoning contract.
    delete providerCapabilities[provKey];
    updateSettings({
      apiKeys: { ...current.apiKeys, [provKey]: value },
      providerCapabilities,
    });
  }

  // ---------------------------------------------------------------------------
  // Model catalog synchronization
  // ---------------------------------------------------------------------------

  function apiKeyFor(targetProvider: Provider): string | undefined {
    return targetProvider === 'openai'
      ? settingsRef.current.apiKeys.openai
      : targetProvider === 'openrouter'
      ? settingsRef.current.apiKeys.openrouter
      : targetProvider === 'anthropic'
      ? settingsRef.current.apiKeys.anthropic
      : targetProvider === 'custom'
      ? settingsRef.current.apiKeys.custom
      : undefined;
  }

  function catalogIdentityFor(targetProvider: Provider): string {
    return modelCatalogCacheKey(
      targetProvider,
      targetProvider === 'openai-codex'
        ? codexEmailRef.current ?? (codexLoggedInRef.current ? 'active-codex-session' : '')
        : apiKeyFor(targetProvider),
      targetProvider === 'custom' ? settingsRef.current.customBaseUrl : undefined,
    );
  }

  function publishCatalogMetadata(
    targetProvider: Provider,
    models: readonly ModelCatalogEntry[],
    capabilities: ModelCatalogCapabilities,
    source?: 'live' | 'cache' | 'stale' | 'fallback',
  ) {
    const current = settingsRef.current;
    const next = reconcileModelCatalogSettings(
      current,
      targetProvider,
      models,
      capabilities,
      source,
    );
    if (next === current) return;
    settingsRef.current = next;
    onChangeRef.current(next);
  }

  async function loadModelCatalog(forceRefresh: boolean, targetProvider = provider) {
    const apiKey = apiKeyFor(targetProvider);
    const baseUrl = targetProvider === 'custom' ? settingsRef.current.customBaseUrl : undefined;
    const canQuery = targetProvider === 'openai-codex'
      ? codexLoggedInRef.current
      : targetProvider === 'custom'
      ? Boolean(baseUrl)
      : Boolean(apiKey);
    const identity = catalogIdentityFor(targetProvider);

    const requestId = ++catalogRequestRef.current;
    if (!canQuery) {
      setModelLoading(false);
      setModelError(null);
      setDiscoveredCatalog({ provider: targetProvider, identity, models: [] });
      publishCatalogMetadata(targetProvider, [], NO_MODEL_CAPABILITIES);
      return;
    }

    const cacheKey = identity;
    if (!forceRefresh) {
      const cached = readCachedModelCatalog(cacheKey);
      if (cached) {
        if (catalogRequestRef.current !== requestId) return;
        setDiscoveredCatalog({ provider: targetProvider, identity, models: cached.models });
        publishCatalogMetadata(
          targetProvider,
          cached.models,
          cached.capabilities,
          cached.source,
        );
        setModelError(null);
        setModelLoading(false);
        return;
      }
    }

    setModelLoading(true);
    setModelError(null);
    try {
      const result = await fetchModelCatalog(
        api,
        targetProvider,
        apiKey,
        baseUrl,
      );
      if (catalogRequestRef.current !== requestId) return;
      writeCachedModelCatalog(cacheKey, result);
      setDiscoveredCatalog({ provider: targetProvider, identity, models: result.models });
      publishCatalogMetadata(
        targetProvider,
        result.models,
        result.capabilities,
        result.source,
      );
    } catch (err) {
      if (catalogRequestRef.current !== requestId) return;
      setModelError(String(err));
    } finally {
      if (catalogRequestRef.current === requestId) setModelLoading(false);
    }
  }

  useEffect(() => {
    ++catalogRequestRef.current;
    setModelLoading(false);
    setModelError(null);
    setDiscoveredCatalog((current) =>
      current.provider === provider && current.identity === activeCatalogIdentity
        ? current
        : { provider, identity: activeCatalogIdentity, models: [] },
    );
    if (provider === 'custom') {
      publishCatalogMetadata(provider, [], NO_MODEL_CAPABILITIES);
      return;
    }
    void loadModelCatalog(false, provider);
    return () => {
      ++catalogRequestRef.current;
    };
    // Credential and login changes intentionally re-negotiate the active provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, provider, activeApiKey, activeBaseUrl, codexLoggedIn, codexEmail]);

  function handleLoadModels() {
    void loadModelCatalog(true);
  }

  // ---------------------------------------------------------------------------
  // Codex sign-in flow
  // ---------------------------------------------------------------------------

  async function handleCodexSignIn() {
    const signInGeneration = invalidateCodexStatusGeneration();
    try {
      const authUrl = await codexLogin(api);
      if (!isCurrentCodexStatusGeneration(signInGeneration)) return;
      window.open(authUrl, '_blank');
      setCodexPending(true);
      pollStartRef.current = Date.now();

      pollTimerRef.current = setInterval(async () => {
        try {
          const s = await coordinatedCodexStatus(() => codexStatus(api));
          if (
            s !== null
            && isCurrentCodexStatusGeneration(signInGeneration)
            && s.status === 'logged_in'
          ) {
            invalidateCodexStatusGeneration();
            clearModelCatalogCache('openai-codex');
            publishCatalogMetadata('openai-codex', [], NO_MODEL_CAPABILITIES);
            onCodexStatusChangeRef.current(true, s.email ?? null);
            setCodexPending(false);
            if (pollTimerRef.current !== null) {
              clearInterval(pollTimerRef.current);
              pollTimerRef.current = null;
            }
          }
        } catch { /* ignore */ }

        if (Date.now() - pollStartRef.current > CODEX_POLL_MAX_MS) {
          if (!isCurrentCodexStatusGeneration(signInGeneration)) return;
          invalidateCodexStatusGeneration();
          setCodexPending(false);
          if (pollTimerRef.current !== null) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
        }
      }, CODEX_POLL_INTERVAL_MS);
    } catch (err) {
      setCodexError(String(err));
    }
  }

  async function handleCodexSignOut() {
    const signOutGeneration = invalidateCodexStatusGeneration();
    setCodexPending(false);
    if (pollTimerRef.current !== null) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    try {
      await codexLogout(api);
      if (!isCurrentCodexStatusGeneration(signOutGeneration)) return;
      // Also invalidate a status read that may have started after logout was
      // requested but before the server finished clearing the session.
      invalidateCodexStatusGeneration();
      clearModelCatalogCache('openai-codex');
      ++catalogRequestRef.current;
      setDiscoveredCatalog({
        provider: 'openai-codex',
        identity: modelCatalogCacheKey('openai-codex'),
        models: [],
      });
      setModelError(null);
      publishCatalogMetadata('openai-codex', [], NO_MODEL_CAPABILITIES);
      onCodexStatusChangeRef.current(false, null);
    } catch (err) {
      setCodexError(String(err));
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const datalistId = 'gcp-model-datalist';

  return (
    <div className="gcp-settings">
      {/* Provider select */}
      <div className="gcp-field">
        <label className="gcp-label" htmlFor="gcp-provider-select">
          Provider
        </label>
        <select
          id="gcp-provider-select"
          className="gcp-select"
          value={provider}
          onChange={(e) => updateSettings({ provider: e.target.value as Provider })}
          aria-label="Select LLM provider"
        >
          {(Object.keys(PROVIDER_LABELS) as Provider[]).map((p) => (
            <option key={p} value={p}>
              {PROVIDER_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      {/* Model row */}
      <div className="gcp-field">
        <label className="gcp-label" htmlFor="gcp-model-input">
          Model
        </label>
        <div className="gcp-model-row">
          <input
            id="gcp-model-input"
            className="gcp-input"
            list={datalistId}
            value={settings.models[provider] ?? ''}
            onChange={(e) => updateModel(e.target.value)}
            placeholder="model id"
            aria-label="Model ID"
            autoComplete="off"
            spellCheck={false}
          />
          <datalist id={datalistId}>
            {modelList.map((m) => (
              <option key={m.id} value={m.id} label={m.label} />
            ))}
          </datalist>
          <button
            className="gcp-load-btn"
            onClick={handleLoadModels}
            disabled={modelLoading}
            aria-label="Load available models from provider"
            title="Refresh model list"
          >
            {modelLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {modelError && (
          <span className="gcp-field-hint error" role="alert">
            {modelError}
          </span>
        )}
      </div>

      {reasoningOptions.length > 0 && (
        <div className="gcp-field">
          <label className="gcp-label" htmlFor="gcp-reasoning-effort">
            Reasoning effort
          </label>
          <select
            id="gcp-reasoning-effort"
            className="gcp-select"
            value={settings.reasoningEfforts?.[provider] ?? ''}
            onChange={(event) => updateReasoningEffort(event.target.value)}
            aria-label="Reasoning effort"
          >
            <option value="">
              Model default{selectedCatalogEntry?.defaultReasoningEffort
                ? ` (${selectedCatalogEntry.defaultReasoningEffort})`
                : ''}
            </option>
            {reasoningOptions.map((option) => (
              <option
                key={option.effort}
                value={option.effort}
                title={option.description}
              >
                {option.effort}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* API key fields — shown for non-codex providers */}
      {provider !== 'openai-codex' &&
        KEY_PROVIDERS.filter((p) => p === provider || (provider === 'custom' && p === 'custom')).map(
          (p) =>
            p === provider ? (
              <div className="gcp-field" key={p}>
                <label className="gcp-label">
                  {p === 'openai'
                    ? 'OpenAI API Key'
                    : p === 'anthropic'
                    ? 'Anthropic API Key'
                    : p === 'openrouter'
                    ? 'OpenRouter API Key'
                    : 'Custom API Key'}
                </label>
                <PasswordInput
                  value={settings.apiKeys[p] ?? ''}
                  onBlur={(v) => updateKey(p, v)}
                  placeholder={p === 'custom' ? 'API key (optional)' : 'sk-...'}
                  aria-label={
                    p === 'openai'
                      ? 'OpenAI API key'
                      : p === 'anthropic'
                      ? 'Anthropic API key'
                      : p === 'openrouter'
                      ? 'OpenRouter API key'
                      : 'Custom API key'
                  }
                />
              </div>
            ) : null,
        )}

      {/* Custom base URL — shown only for custom provider */}
      {provider === 'custom' && (
        <div className="gcp-field">
          <label className="gcp-label" htmlFor="gcp-base-url">
            Base URL
          </label>
          <input
            id="gcp-base-url"
            className="gcp-input"
            type="url"
            value={settings.customBaseUrl}
            onChange={(e) => updateSettings({ customBaseUrl: e.target.value })}
            placeholder="http://127.0.0.1:11434/v1"
            aria-label="Custom API base URL"
            spellCheck={false}
          />
        </div>
      )}

      {/* Codex sign-in — shown only for openai-codex */}
      {provider === 'openai-codex' && (
        <div className="gcp-field">
          <label className="gcp-label">ChatGPT Codex Auth</label>
          <div className="gcp-codex-section">
            <div
              className={`gcp-codex-status${
                codexLoggedIn ? ' signed-in' : codexPending ? ' pending' : ''
              }`}
              role="status"
              aria-live="polite"
            >
              {codexLoggedIn
                ? `Signed in${codexEmail ? ` as ${codexEmail}` : ''}`
                : codexPending
                ? 'Sign-in pending... (waiting for browser auth)'
                : 'Not signed in'}
            </div>
            <div className="gcp-codex-btns">
              {!codexLoggedIn && (
                <button
                  className="gcp-codex-btn"
                  onClick={handleCodexSignIn}
                  disabled={codexPending}
                  aria-label="Sign in with ChatGPT Codex"
                >
                  {codexPending ? 'Waiting...' : 'Sign in'}
                </button>
              )}
              {codexLoggedIn && (
                <button
                  className="gcp-codex-btn danger"
                  onClick={handleCodexSignOut}
                  aria-label="Sign out from ChatGPT Codex"
                >
                  Sign out
                </button>
              )}
            </div>
            {codexError && (
              <span className="gcp-field-hint error" role="alert">
                {codexError}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footnote */}
      <p className="gcp-footnote">
        Keys are stored in this browser's localStorage and sent only to your
        local CodefyUI backend, which forwards them to the selected provider.
      </p>
    </div>
  );
}
