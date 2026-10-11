import React, { useState, useEffect, useRef } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { readinessReason, reconcileModelCatalogSettings, withReasoningEffort } from '../state/settings';
import type { Provider } from '../llm/client';
import { fetchModelCatalog, codexLogin, codexStatus, codexLogout } from '../llm/client';
import type { ModelCatalogCapabilities, ModelCatalogEntry, ReasoningEffort } from '../llm/models';
import {
  catalogEntryForModel,
  clearModelCatalogCache,
  mergeModelCatalog,
  modelCatalogCacheKey,
  readCachedModelCatalog,
  writeCachedModelCatalog,
} from '../llm/models';
import {
  beginCodexLogout,
  codexStatusGeneration,
  coordinatedCodexStatus,
  finishCodexLogout,
  invalidateCodexStatusGeneration,
  isCurrentCodexStatusGeneration,
} from '../llm/codexStatusEpoch';

const PROVIDER_LABELS: Record<Provider, string> = {
  openai: 'OpenAI API',
  'openai-codex': 'OpenAI Codex (ChatGPT)',
  openrouter: 'OpenRouter',
  anthropic: 'Claude API',
  custom: 'Custom (OpenAI-compatible)',
};
const KEY_PROVIDERS: Array<'openai' | 'openrouter' | 'anthropic' | 'custom'> = [
  'openai', 'openrouter', 'anthropic', 'custom',
];
const CODEX_POLL_INTERVAL_MS = 2000;
const CODEX_POLL_MAX_MS = 5 * 60 * 1000;
const NO_MODEL_CAPABILITIES: ModelCatalogCapabilities = {
  reasoningEffort: false,
  richModelCatalog: false,
};

export interface SettingsViewProps {
  api: CodefyUIPluginAPI;
  settings: Settings;
  codexLoggedIn: boolean;
  codexEmail: string | null;
  onCodexStatusChange: (loggedIn: boolean, email: string | null) => void;
  onChange: (s: Settings) => void;
}

function PasswordInput({ value, onBlur, onEdit, placeholder, 'aria-label': ariaLabel }: {
  value: string;
  onBlur: (v: string) => void;
  onEdit: (v: string) => void;
  placeholder?: string;
  'aria-label': string;
}) {
  const [show, setShow] = useState(false);
  const [local, setLocal] = useState(value);
  useEffect(() => { setLocal(value); }, [value]);
  return (
    <div className="gcp-key-row">
      <input
        type={show ? 'text' : 'password'} className="gcp-input" value={local}
        onChange={(e) => { setLocal(e.target.value); onEdit(e.target.value); }}
        onBlur={() => onBlur(local)} placeholder={placeholder ?? 'API key'}
        aria-label={ariaLabel} autoComplete="off" spellCheck={false}
      />
      <button type="button" className="gcp-show-btn" onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide key' : 'Show key'} title={show ? 'Hide' : 'Show'}>
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export function SettingsView({
  api, settings, codexLoggedIn, codexEmail, onCodexStatusChange, onChange,
}: SettingsViewProps) {
  const provider = settings.provider;
  const savedKey = provider === 'openai-codex' ? undefined : settings.apiKeys[provider];
  const activeApiKey = typeof savedKey === 'string' ? savedKey : undefined;
  const activeBaseUrl = provider === 'custom' && typeof settings.customBaseUrl === 'string'
    ? settings.customBaseUrl : undefined;
  const activeCatalogIdentity = modelCatalogCacheKey(
    provider,
    provider === 'openai-codex'
      ? codexEmail ?? (codexLoggedIn ? 'active-codex-session' : '')
      : activeApiKey,
    activeBaseUrl,
  );
  const [discoveredCatalog, setDiscoveredCatalog] = useState<{
    provider: Provider; identity: string; models: ModelCatalogEntry[];
  }>({ provider, identity: activeCatalogIdentity, models: [] });
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const modelRequestRef = useRef<number | null>(null);
  const modelGenerationRef = useRef(0);
  const modelAbortRef = useRef<AbortController | null>(null);
  const draftKeyRef = useRef(activeApiKey);
  const settingsRef = useRef(settings);
  const onChangeRef = useRef(onChange);
  const statusCallbackRef = useRef(onCodexStatusChange);
  const codexLoggedInRef = useRef(codexLoggedIn);
  const codexEmailRef = useRef(codexEmail);
  const previousCodexLoggedInRef = useRef(codexLoggedIn);
  // Render-time identity rejects old replies even before passive cleanup runs.
  const contextRef = useRef({ api, provider, activeApiKey, activeBaseUrl, codexLoggedIn, codexEmail });
  contextRef.current = { api, provider, activeApiKey, activeBaseUrl, codexLoggedIn, codexEmail };
  settingsRef.current = settings;
  onChangeRef.current = onChange;
  statusCallbackRef.current = onCodexStatusChange;
  codexLoggedInRef.current = codexLoggedIn;
  codexEmailRef.current = codexEmail;

  const [codexError, setCodexError] = useState<string | null>(null);
  const [codexPending, setCodexPending] = useState(false);
  const [codexSigningOut, setCodexSigningOut] = useState(false);
  const codexGenerationRef = useRef(0);
  const codexActionRef = useRef<'idle' | 'login' | 'polling' | 'logout'>('idle');
  const codexActionEpochRef = useRef<number | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  const rawModel = settings.models[provider];
  const selectedModel = typeof rawModel === 'string' ? rawModel : '';
  const modelList = mergeModelCatalog(
    provider,
    discoveredCatalog.provider === provider && discoveredCatalog.identity === activeCatalogIdentity
      ? discoveredCatalog.models : [],
    selectedModel,
  );
  const selectedCatalogEntry = catalogEntryForModel(provider, selectedModel, modelList);
  const reasoningCapability = settings.providerCapabilities?.[provider]?.reasoningEffort === true;
  const reasoningOptions = reasoningCapability ? selectedCatalogEntry?.reasoningEfforts ?? [] : [];

  function clearCodexTimers() {
    if (pollTimerRef.current !== null) clearTimeout(pollTimerRef.current);
    if (expiryTimerRef.current !== null) clearTimeout(expiryTimerRef.current);
    pollTimerRef.current = null;
    expiryTimerRef.current = null;
  }

  function invalidateModelRequest() {
    modelGenerationRef.current++;
    modelRequestRef.current = null;
    modelAbortRef.current?.abort();
    modelAbortRef.current = null;
  }

  function resetModels() {
    invalidateModelRequest();
    const context = contextRef.current;
    setDiscoveredCatalog({ provider: context.provider, identity: activeCatalogIdentity, models: [] });
    setModelLoading(false);
    setModelError(null);
  }

  function currentCodexRequest(generation: number, epoch?: number): boolean {
    return mountedRef.current && generation === codexGenerationRef.current
      && contextRef.current.api === api && contextRef.current.provider === 'openai-codex'
      && (epoch === undefined || isCurrentCodexStatusGeneration(epoch));
  }

  function invalidateInteractiveSignIn() {
    if ((codexActionRef.current === 'login' || codexActionRef.current === 'polling')
      && codexActionEpochRef.current !== null
      && isCurrentCodexStatusGeneration(codexActionEpochRef.current)) {
      invalidateCodexStatusGeneration();
    }
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      invalidateModelRequest();
      invalidateInteractiveSignIn();
      codexGenerationRef.current++;
      clearCodexTimers();
    };
  }, []);

  // Share status reads with the application while keeping local navigation guards.
  useEffect(() => {
    const generation = ++codexGenerationRef.current;
    clearCodexTimers();
    codexActionRef.current = 'idle';
    codexActionEpochRef.current = null;
    setCodexPending(false);
    setCodexSigningOut(false);
    setCodexError(null);
    if (provider === 'openai-codex') {
      const authContext = contextRef.current;
      void coordinatedCodexStatus(() => codexStatus(api)).then((s) => {
        if (!currentCodexRequest(generation) || s === null
          || contextRef.current.codexLoggedIn !== authContext.codexLoggedIn
          || contextRef.current.codexEmail !== authContext.codexEmail
          || (s.status !== 'logged_in' && s.status !== 'logged_out')) return;
        const loggedIn = s.status === 'logged_in';
        const email = loggedIn ? s.email ?? null : null;
        if (loggedIn !== codexLoggedInRef.current || email !== codexEmailRef.current) {
          clearModelCatalogCache('openai-codex');
          resetModels();
          publishCatalogMetadata('openai-codex', [], NO_MODEL_CAPABILITIES);
        }
        statusCallbackRef.current(loggedIn, email);
      }).catch(() => { /* A manual sign-in remains available. */ });
    }
    return () => {
      invalidateInteractiveSignIn();
      codexGenerationRef.current++;
      clearCodexTimers();
      codexActionRef.current = 'idle';
    };
  }, [api, provider]);

  useEffect(() => {
    if (previousCodexLoggedInRef.current && !codexLoggedIn) clearModelCatalogCache('openai-codex');
    previousCodexLoggedInRef.current = codexLoggedIn;
  }, [codexLoggedIn]);

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
    const effortSupported = Boolean(nextEntry?.reasoningEfforts?.some((option) => option.effort === selectedEffort));
    if (selectedEffort && nextEntry?.reasoningEfforts && !effortSupported) delete reasoningEfforts[provider];
    const currentCapability = current.providerCapabilities?.[provider];
    const nextCapability = currentCapability ? {
      reasoningEffort: currentCapability.reasoningEffort,
      richModelCatalog: currentCapability.richModelCatalog,
      ...(selectedEffort && effortSupported ? { reasoningModel: value } : {}),
    } : undefined;
    updateSettings({
      models: { ...current.models, [provider]: value },
      reasoningEfforts,
      ...(nextCapability ? { providerCapabilities: { ...current.providerCapabilities, [provider]: nextCapability } } : {}),
    });
  }

  function updateReasoningEffort(value: string) {
    const next = withReasoningEffort(settingsRef.current, provider, value as ReasoningEffort | '');
    settingsRef.current = next;
    onChangeRef.current(next);
  }

  function updateKey(provKey: 'openai' | 'openrouter' | 'anthropic' | 'custom', value: string) {
    const current = settingsRef.current;
    if ((current.apiKeys[provKey] ?? '') === value) return;
    const providerCapabilities = { ...current.providerCapabilities };
    // Capability negotiation is credential-scoped, not a persistent guarantee.
    delete providerCapabilities[provKey];
    updateSettings({ apiKeys: { ...current.apiKeys, [provKey]: value }, providerCapabilities });
  }

  function publishCatalogMetadata(
    targetProvider: Provider,
    models: readonly ModelCatalogEntry[],
    capabilities: ModelCatalogCapabilities,
    source?: 'live' | 'cache' | 'stale' | 'fallback',
  ) {
    const current = settingsRef.current;
    const next = reconcileModelCatalogSettings(current, targetProvider, models, capabilities, source);
    if (next === current) return;
    settingsRef.current = next;
    onChangeRef.current(next);
  }

  async function loadModelCatalog(forceRefresh: boolean, targetProvider = provider) {
    // A ref latch prevents a double dispatch before disabled state is rendered.
    if (modelRequestRef.current !== null) return;
    const context = contextRef.current;
    const key = draftKeyRef.current;
    const baseUrl = context.activeBaseUrl;
    const authEpoch = targetProvider === 'openai-codex' ? codexStatusGeneration() : undefined;
    const identity = modelCatalogCacheKey(
      targetProvider,
      targetProvider === 'openai-codex'
        ? context.codexEmail ?? (context.codexLoggedIn ? 'active-codex-session' : '') : key,
      baseUrl,
    );
    const generation = ++modelGenerationRef.current;
    const isCurrent = () => mountedRef.current && modelGenerationRef.current === generation
      && contextRef.current.api === context.api && contextRef.current.provider === targetProvider
      && contextRef.current.activeApiKey === context.activeApiKey
      && contextRef.current.activeBaseUrl === context.activeBaseUrl
      && draftKeyRef.current === key
      && (targetProvider !== 'openai-codex' || (
        contextRef.current.codexLoggedIn === context.codexLoggedIn
        && contextRef.current.codexEmail === context.codexEmail
        && authEpoch !== undefined && isCurrentCodexStatusGeneration(authEpoch)
      ));
    const canQuery = targetProvider === 'openai-codex'
      ? context.codexLoggedIn && codexActionRef.current !== 'logout'
      : targetProvider === 'custom' ? Boolean(baseUrl?.trim()) : Boolean(key?.trim());
    if (!canQuery) {
      setModelLoading(false);
      setModelError(null);
      setDiscoveredCatalog({ provider: targetProvider, identity, models: [] });
      publishCatalogMetadata(targetProvider, [], NO_MODEL_CAPABILITIES);
      return;
    }
    if (!forceRefresh) {
      const cached = readCachedModelCatalog(identity);
      if (cached) {
        if (!isCurrent()) return;
        setDiscoveredCatalog({ provider: targetProvider, identity, models: cached.models });
        publishCatalogMetadata(targetProvider, cached.models, cached.capabilities, cached.source);
        setModelError(null);
        setModelLoading(false);
        return;
      }
    }

    const controller = new AbortController();
    modelAbortRef.current = controller;
    modelRequestRef.current = generation;
    setModelLoading(true);
    setModelError(null);
    try {
      const result = await fetchModelCatalog(api, targetProvider, key?.trim(), baseUrl?.trim(), controller.signal);
      if (!isCurrent()) return;
      writeCachedModelCatalog(identity, result);
      setDiscoveredCatalog({ provider: targetProvider, identity, models: result.models });
      publishCatalogMetadata(targetProvider, result.models, result.capabilities, result.source);
    } catch (err) {
      if (isCurrent() && !controller.signal.aborted) setModelError(String(err));
    } finally {
      // A shared auth epoch may change without a Settings render. Release only
      // this request's own latch; stale requests must not clear a newer load.
      if (mountedRef.current && modelRequestRef.current === generation) {
        modelRequestRef.current = null;
        modelAbortRef.current = null;
        setModelLoading(false);
      }
    }
  }

  useEffect(() => {
    draftKeyRef.current = activeApiKey;
    resetModels();
    if (provider === 'custom') publishCatalogMetadata(provider, [], NO_MODEL_CAPABILITIES);
    else void loadModelCatalog(false, provider);
    return () => { invalidateModelRequest(); };
    // Credential and account changes intentionally renegotiate the active provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, provider, activeApiKey, activeBaseUrl, codexLoggedIn, codexEmail]);

  function handleLoadModels() { void loadModelCatalog(true); }

  async function handleCodexSignIn() {
    if (codexActionRef.current !== 'idle') return;
    const generation = ++codexGenerationRef.current;
    const epoch = invalidateCodexStatusGeneration();
    codexActionEpochRef.current = epoch;
    codexActionRef.current = 'login';
    resetModels();
    setCodexPending(true);
    setCodexError(null);
    clearCodexTimers();
    // Independent deadline also fires if login/status transport never settles.
    expiryTimerRef.current = setTimeout(() => {
      if (!currentCodexRequest(generation, epoch)) return;
      invalidateCodexStatusGeneration();
      codexGenerationRef.current++;
      codexActionRef.current = 'idle';
      clearCodexTimers();
      setCodexPending(false);
      setCodexError('Sign-in timed out. Try again to open a new browser sign-in.');
    }, CODEX_POLL_MAX_MS);

    async function poll() {
      pollTimerRef.current = null;
      if (!currentCodexRequest(generation, epoch)) return;
      try {
        const s = await coordinatedCodexStatus(() => codexStatus(api));
        if (!currentCodexRequest(generation, epoch)) return;
        if (s !== null && s.status === 'logged_in') {
          invalidateCodexStatusGeneration();
          clearCodexTimers();
          codexActionRef.current = 'idle';
          clearModelCatalogCache('openai-codex');
          resetModels();
          publishCatalogMetadata('openai-codex', [], NO_MODEL_CAPABILITIES);
          setCodexPending(false);
          statusCallbackRef.current(true, s.email ?? null);
          return;
        }
      } catch { /* Retry sequentially until the independent deadline. */ }
      if (currentCodexRequest(generation, epoch)) pollTimerRef.current = setTimeout(poll, CODEX_POLL_INTERVAL_MS);
    }

    try {
      const authUrl = await codexLogin(api);
      if (!currentCodexRequest(generation, epoch)) return;
      window.open(authUrl, '_blank');
      codexActionRef.current = 'polling';
      pollTimerRef.current = setTimeout(poll, CODEX_POLL_INTERVAL_MS);
    } catch (err) {
      if (!currentCodexRequest(generation, epoch)) return;
      invalidateCodexStatusGeneration();
      clearCodexTimers();
      codexActionRef.current = 'idle';
      setCodexPending(false);
      setCodexError(String(err));
    }
  }

  async function handleCodexSignOut() {
    if (codexActionRef.current === 'logout') return;
    const generation = ++codexGenerationRef.current;
    const epoch = beginCodexLogout();
    codexActionEpochRef.current = epoch;
    codexActionRef.current = 'logout';
    clearCodexTimers();
    resetModels();
    clearModelCatalogCache('openai-codex');
    publishCatalogMetadata('openai-codex', [], NO_MODEL_CAPABILITIES);
    setCodexPending(false);
    setCodexSigningOut(true);
    setCodexError(null);
    try {
      // Revoke readiness before navigation can unmount this view during logout.
      statusCallbackRef.current(false, null);
      await codexLogout(api);
    } catch (err) {
      if (currentCodexRequest(generation, epoch)) setCodexError(String(err));
    } finally {
      const current = currentCodexRequest(generation, epoch);
      // Complete shared logout ownership even after navigation, without
      // superseding a newer explicit login/logout action.
      finishCodexLogout(epoch);
      if (current) {
        codexActionRef.current = 'idle';
        setCodexSigningOut(false);
      }
    }
  }

  const datalistId = 'gcp-model-datalist';
  const setupReason = readinessReason(settings, codexLoggedIn);
  const modelMissing = !selectedModel.trim();

  return (
    <div className="gcp-settings">
      <div className="gcp-field">
        <label className="gcp-label" htmlFor="gcp-provider-select">Provider</label>
        <select id="gcp-provider-select" className="gcp-select" value={provider}
          onChange={(e) => { resetModels(); updateSettings({ provider: e.target.value as Provider }); }}
          aria-label="Select LLM provider">
          {(Object.keys(PROVIDER_LABELS) as Provider[]).map((p) => <option key={p} value={p}>{PROVIDER_LABELS[p]}</option>)}
        </select>
      </div>
      <div className="gcp-field">
        <label className="gcp-label" htmlFor="gcp-model-input">Model</label>
        <div className="gcp-model-row">
          <input id="gcp-model-input" className="gcp-input" list={datalistId}
            value={selectedModel} onChange={(e) => updateModel(e.target.value)}
            placeholder="model id" aria-label="Model ID"
            aria-invalid={modelMissing ? 'true' : undefined}
            aria-describedby={modelMissing ? 'gcp-settings-readiness' : undefined}
            autoComplete="off" spellCheck={false}
          />
          <datalist id={datalistId}>
            {modelList.map((m) => <option key={m.id} value={m.id} label={m.label} />)}
          </datalist>
          <button type="button" className="gcp-load-btn" onClick={handleLoadModels}
            disabled={modelLoading || (provider === 'openai-codex' && codexSigningOut)}
            aria-label="Load available models from provider" title="Refresh model list">
            {modelLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {modelError && <span className="gcp-field-hint error" role="alert">{modelError}</span>}
      </div>
      {reasoningOptions.length > 0 && (
        <div className="gcp-field">
          <label className="gcp-label" htmlFor="gcp-reasoning-effort">Reasoning effort</label>
          <select id="gcp-reasoning-effort" className="gcp-select"
            value={settings.reasoningEfforts?.[provider] ?? ''}
            onChange={(event) => updateReasoningEffort(event.target.value)} aria-label="Reasoning effort">
            <option value="">Model default{selectedCatalogEntry?.defaultReasoningEffort
              ? ` (${selectedCatalogEntry.defaultReasoningEffort})` : ''}</option>
            {reasoningOptions.map((option) => (
              <option key={option.effort} value={option.effort} title={option.description}>{option.effort}</option>
            ))}
          </select>
        </div>
      )}
      <div className="gcp-field">
        <label>
          <input type="checkbox" checked={settings.notifyOnRunCompletion !== false}
            onChange={(e) => updateSettings({ notifyOnRunCompletion: e.target.checked })}
            aria-label="Notify when a graph run finishes while this tab is in the background" />
          Notify when a graph run finishes while this tab is in the background
        </label>
      </div>
      {provider !== 'openai-codex' && KEY_PROVIDERS.filter((p) => p === provider).map((p) => (
        <div className="gcp-field" key={p}>
          <label className="gcp-label">{p === 'openai' ? 'OpenAI API Key' : p === 'anthropic'
            ? 'Anthropic API Key' : p === 'openrouter' ? 'OpenRouter API Key' : 'Custom API Key'}</label>
          <PasswordInput value={typeof settings.apiKeys[p] === 'string' ? settings.apiKeys[p]! : ''}
            onEdit={(value) => { draftKeyRef.current = value; resetModels(); }}
            onBlur={(v) => updateKey(p, v)} placeholder={p === 'custom' ? 'API key (optional)' : 'sk-...'}
            aria-label={p === 'openai' ? 'OpenAI API key' : p === 'anthropic'
              ? 'Anthropic API key' : p === 'openrouter' ? 'OpenRouter API key' : 'Custom API key'}
          />
        </div>
      ))}
      {provider === 'custom' && (
        <div className="gcp-field">
          <label className="gcp-label" htmlFor="gcp-base-url">Base URL</label>
          <input id="gcp-base-url" className="gcp-input" type="url" value={activeBaseUrl ?? ''}
            onChange={(e) => { resetModels(); updateSettings({ customBaseUrl: e.target.value }); }}
            placeholder="http://127.0.0.1:11434/v1" aria-label="Custom API base URL" spellCheck={false} />
        </div>
      )}
      {provider === 'openai-codex' && (
        <div className="gcp-field">
          <label className="gcp-label">ChatGPT Codex Auth</label>
          <div className="gcp-codex-section">
            <div className={`gcp-codex-status${codexLoggedIn ? ' signed-in' : codexPending ? ' pending' : ''}`}
              role="status" aria-live="polite">
              {codexLoggedIn ? `Signed in${codexEmail ? ` as ${codexEmail}` : ''}` : codexPending
                ? 'Sign-in pending... (waiting for browser auth)' : 'Not signed in'}
            </div>
            <div className="gcp-codex-btns">
              {!codexLoggedIn && (
                <button type="button" className="gcp-codex-btn" onClick={handleCodexSignIn}
                  disabled={codexPending || codexSigningOut} aria-label="Sign in with ChatGPT Codex">
                  {codexPending ? 'Waiting...' : 'Sign in'}
                </button>
              )}
              {codexLoggedIn && (
                <button type="button" className="gcp-codex-btn danger" onClick={handleCodexSignOut}
                  disabled={codexSigningOut} aria-label="Sign out from ChatGPT Codex">
                  {codexSigningOut ? 'Signing out...' : 'Sign out'}
                </button>
              )}
            </div>
            {codexError && <span className="gcp-field-hint error" role="alert">{codexError}</span>}
          </div>
        </div>
      )}
      {setupReason && <p id="gcp-settings-readiness" className="gcp-field-hint">{setupReason}</p>}
      <p className="gcp-footnote">
        Keys are stored in this browser's localStorage and sent only to your
        local CodefyUI backend, which forwards them to the selected provider.
      </p>
    </div>
  );
}
