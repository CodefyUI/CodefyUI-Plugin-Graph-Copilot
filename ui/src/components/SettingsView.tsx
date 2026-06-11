import React, { useState, useEffect, useRef } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
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

  const [modelList, setModelList] = useState<string[]>([]);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);

  const [codexError, setCodexError] = useState<string | null>(null);
  const [codexPending, setCodexPending] = useState(false);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);

  // Clear codex poll on unmount or view change
  useEffect(() => {
    return () => {
      if (pollTimerRef.current !== null) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, []);

  // Check codex status once when this view opens with codex provider
  useEffect(() => {
    if (provider === 'openai-codex') {
      codexStatus(api)
        .then((s) => {
          if (s.status === 'authenticated') {
            onCodexStatusChange(true, s.email ?? null);
          }
        })
        .catch(() => { /* ignore */ });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

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
    setModelLoading(true);
    setModelError(null);
    try {
      const apiKey =
        provider === 'openai'
          ? settings.apiKeys.openai
          : provider === 'openrouter'
          ? settings.apiKeys.openrouter
          : provider === 'anthropic'
          ? settings.apiKeys.anthropic
          : provider === 'custom'
          ? settings.apiKeys.custom
          : undefined;
      const list = await fetchModels(
        api,
        provider,
        apiKey,
        provider === 'custom' ? settings.customBaseUrl : undefined,
      );
      setModelList(list);
    } catch (err) {
      setModelError(String(err));
    } finally {
      setModelLoading(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Codex sign-in flow
  // ---------------------------------------------------------------------------

  async function handleCodexSignIn() {
    try {
      const authUrl = await codexLogin(api);
      window.open(authUrl, '_blank');
      setCodexPending(true);
      pollStartRef.current = Date.now();

      pollTimerRef.current = setInterval(async () => {
        try {
          const s = await codexStatus(api);
          if (s.status === 'authenticated') {
            onCodexStatusChange(true, s.email ?? null);
            setCodexPending(false);
            if (pollTimerRef.current !== null) {
              clearInterval(pollTimerRef.current);
              pollTimerRef.current = null;
            }
          }
        } catch { /* ignore */ }

        if (Date.now() - pollStartRef.current > CODEX_POLL_MAX_MS) {
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
    try {
      await codexLogout(api);
      onCodexStatusChange(false, null);
      setCodexPending(false);
      if (pollTimerRef.current !== null) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
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
              <option key={m} value={m} />
            ))}
          </datalist>
          <button
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
