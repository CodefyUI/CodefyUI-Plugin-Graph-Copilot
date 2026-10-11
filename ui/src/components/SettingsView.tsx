import React, { useState, useEffect, useRef } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { readinessReason } from '../state/settings';
import type { Provider } from '../llm/client';
import { fetchModels, codexLogin, codexStatus, codexLogout } from '../llm/client';

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
  onEdit,
  placeholder,
  'aria-label': ariaLabel,
}: {
  value: string;
  onBlur: (v: string) => void;
  onEdit: (v: string) => void;
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
        onChange={(e) => { setLocal(e.target.value); onEdit(e.target.value); }}
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

  const apiKey = provider === 'openai-codex' ? undefined : settings.apiKeys[provider];
  const baseUrl = provider === 'custom' ? settings.customBaseUrl : undefined;
  const modelAuthContext = provider === 'openai-codex' ? codexLoggedIn : null;
  const [modelList, setModelList] = useState<string[]>([]);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const modelRequestRef = useRef<number | null>(null);
  const modelGenerationRef = useRef(0);
  const modelAbortRef = useRef<AbortController | null>(null);
  const draftKeyRef = useRef(apiKey);
  // Render-time identity also rejects replies before a passive cleanup has run.
  const contextRef = useRef({ api, provider, apiKey, baseUrl, modelAuthContext });
  contextRef.current = { api, provider, apiKey, baseUrl, modelAuthContext };

  const [codexError, setCodexError] = useState<string | null>(null);
  const [codexPending, setCodexPending] = useState(false);
  const [codexSigningOut, setCodexSigningOut] = useState(false);
  const codexGenerationRef = useRef(0);
  const codexActionRef = useRef<'idle' | 'login' | 'polling' | 'logout'>('idle');
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);
  const statusCallbackRef = useRef(onCodexStatusChange);
  statusCallbackRef.current = onCodexStatusChange;

  function clearCodexTimers() {
    if (pollTimerRef.current !== null) clearTimeout(pollTimerRef.current);
    if (expiryTimerRef.current !== null) clearTimeout(expiryTimerRef.current);
    pollTimerRef.current = null;
    expiryTimerRef.current = null;
  }

  function resetModels() {
    modelAbortRef.current?.abort();
    modelAbortRef.current = null;
    modelGenerationRef.current++;
    modelRequestRef.current = null;
    setModelList([]);
    setModelLoading(false);
    setModelError(null);
  }

  function currentCodexRequest(generation: number): boolean {
    return mountedRef.current && generation === codexGenerationRef.current
      && contextRef.current.api === api && contextRef.current.provider === 'openai-codex';
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      modelGenerationRef.current++;
      modelRequestRef.current = null;
      modelAbortRef.current?.abort();
      modelAbortRef.current = null;
      codexGenerationRef.current++;
      clearCodexTimers();
    };
  }, []);

  useEffect(() => {
    draftKeyRef.current = apiKey;
    resetModels();
    return () => {
      modelGenerationRef.current++;
      modelRequestRef.current = null;
      modelAbortRef.current?.abort();
      modelAbortRef.current = null;
    };
  }, [api, provider, apiKey, baseUrl, modelAuthContext]);

  useEffect(() => {
    const generation = ++codexGenerationRef.current;
    clearCodexTimers();
    codexActionRef.current = 'idle';
    setCodexPending(false);
    setCodexSigningOut(false);
    setCodexError(null);
    if (provider === 'openai-codex') {
      void codexStatus(api).then((s) => {
        if (!currentCodexRequest(generation)) return;
        if (s.status === 'logged_in') statusCallbackRef.current(true, s.email ?? null);
        else if (s.status === 'logged_out') statusCallbackRef.current(false, null);
      }).catch(() => { /* A manual sign-in remains available. */ });
    }
    return () => {
      codexGenerationRef.current++;
      clearCodexTimers();
      codexActionRef.current = 'idle';
    };
  }, [api, provider]);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function updateSettings(patch: Partial<Settings>) {
    onChange({ ...settings, ...patch });
  }

  function updateModel(value: string) {
    updateSettings({ models: { ...settings.models, [provider]: value } });
  }

  function updateKey(provKey: 'openai' | 'openrouter' | 'anthropic' | 'custom', value: string) {
    updateSettings({ apiKeys: { ...settings.apiKeys, [provKey]: value } });
  }

  // ---------------------------------------------------------------------------
  // Load model list
  // ---------------------------------------------------------------------------

  async function handleLoadModels() {
    if (modelRequestRef.current !== null) return;
    const generation = ++modelGenerationRef.current;
    modelRequestRef.current = generation;
    const key = draftKeyRef.current;
    const controller = new AbortController();
    modelAbortRef.current = controller;
    const isCurrent = () => mountedRef.current && modelGenerationRef.current === generation
      && contextRef.current.api === api && contextRef.current.provider === provider
      && contextRef.current.apiKey === apiKey && contextRef.current.baseUrl === baseUrl
      && contextRef.current.modelAuthContext === modelAuthContext && draftKeyRef.current === key;
    setModelLoading(true);
    setModelError(null);
    try {
      const list = await fetchModels(api, provider, key?.trim(), baseUrl?.trim(), controller.signal);
      if (isCurrent()) setModelList(list);
    } catch (err) {
      if (isCurrent() && !controller.signal.aborted) setModelError(String(err));
    } finally {
      if (isCurrent()) {
        modelRequestRef.current = null;
        modelAbortRef.current = null;
        setModelLoading(false);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Codex sign-in flow
  // ---------------------------------------------------------------------------

  async function handleCodexSignIn() {
    if (codexActionRef.current !== 'idle') return;
    const generation = ++codexGenerationRef.current;
    codexActionRef.current = 'login';
    setCodexPending(true);
    setCodexError(null);
    clearCodexTimers();
    // Independent deadline still fires when login/status transport never settles.
    expiryTimerRef.current = setTimeout(() => {
      if (!currentCodexRequest(generation)) return;
      codexGenerationRef.current++;
      codexActionRef.current = 'idle';
      clearCodexTimers();
      setCodexPending(false);
      setCodexError('Sign-in timed out. Try again to open a new browser sign-in.');
    }, CODEX_POLL_MAX_MS);

    async function poll() {
      pollTimerRef.current = null;
      if (!currentCodexRequest(generation)) return;
      try {
        const s = await codexStatus(api);
        if (!currentCodexRequest(generation)) return;
        if (s.status === 'logged_in') {
          clearCodexTimers();
          codexActionRef.current = 'idle';
          setCodexPending(false);
          statusCallbackRef.current(true, s.email ?? null);
          return;
        }
      } catch { /* Retry status sequentially until the independent deadline. */ }
      if (currentCodexRequest(generation)) pollTimerRef.current = setTimeout(poll, CODEX_POLL_INTERVAL_MS);
    }

    try {
      const authUrl = await codexLogin(api);
      if (!currentCodexRequest(generation)) return;
      window.open(authUrl, '_blank');
      codexActionRef.current = 'polling';
      pollTimerRef.current = setTimeout(poll, CODEX_POLL_INTERVAL_MS);
    } catch (err) {
      if (!currentCodexRequest(generation)) return;
      clearCodexTimers();
      codexActionRef.current = 'idle';
      setCodexPending(false);
      setCodexError(String(err));
    }
  }

  async function handleCodexSignOut() {
    if (codexActionRef.current === 'logout') return;
    // Invalidate pending mount/login/poll callbacks before the logout await.
    const generation = ++codexGenerationRef.current;
    resetModels();
    codexActionRef.current = 'logout';
    clearCodexTimers();
    setCodexPending(false);
    setCodexSigningOut(true);
    setCodexError(null);
    try {
      // Revoke UI readiness now, even if navigation unmounts this view during logout.
      statusCallbackRef.current(false, null);
      await codexLogout(api);
    } catch (err) {
      if (currentCodexRequest(generation)) setCodexError(String(err));
    } finally {
      if (currentCodexRequest(generation)) {
        codexActionRef.current = 'idle';
        setCodexSigningOut(false);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const datalistId = 'gcp-model-datalist';
  const setupReason = readinessReason(settings, codexLoggedIn);
  const model = settings.models[provider];
  const modelMissing = typeof model !== 'string' || !model.trim();

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
          onChange={(e) => { resetModels(); updateSettings({ provider: e.target.value as Provider }); }}
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
            value={typeof model === 'string' ? model : ''}
            onChange={(e) => updateModel(e.target.value)}
            placeholder="model id"
            aria-label="Model ID"
            aria-invalid={modelMissing ? 'true' : undefined}
            aria-describedby={modelMissing ? 'gcp-settings-readiness' : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <datalist id={datalistId}>
            {modelList.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
          <button
            type="button"
            className="gcp-load-btn"
            onClick={handleLoadModels}
            disabled={modelLoading}
            aria-label="Load available models from provider"
            title="Load model list"
          >
            {modelLoading ? 'Loading...' : 'Load list'}
          </button>
        </div>
        {modelError && (
          <span className="gcp-field-hint error" role="alert">
            {modelError}
          </span>
        )}
      </div>

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
                  onEdit={(value) => { draftKeyRef.current = value; resetModels(); }}
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
            onChange={(e) => { resetModels(); updateSettings({ customBaseUrl: e.target.value }); }}
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
                  type="button"
                  className="gcp-codex-btn"
                  onClick={handleCodexSignIn}
                  disabled={codexPending || codexSigningOut}
                  aria-label="Sign in with ChatGPT Codex"
                >
                  {codexPending ? 'Waiting...' : 'Sign in'}
                </button>
              )}
              {codexLoggedIn && (
                <button
                  type="button"
                  className="gcp-codex-btn danger"
                  onClick={handleCodexSignOut}
                  disabled={codexSigningOut}
                  aria-label="Sign out from ChatGPT Codex"
                >
                  {codexSigningOut ? 'Signing out...' : 'Sign out'}
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

      {setupReason && <p id="gcp-settings-readiness" className="gcp-field-hint">{setupReason}</p>}

      {/* Footnote */}
      <p className="gcp-footnote">
        Keys are stored in this browser's localStorage and sent only to your
        local CodefyUI backend, which forwards them to the selected provider.
      </p>
    </div>
  );
}
