/**
 * Tests for SettingsView — Task 8 coverage
 *
 * 1. Switching provider calls onChange with updated provider.
 * 2. Model input is bound to settings.models[provider].
 * 3. API key input triggers onChange on blur.
 * 4. Custom base URL field visible only for custom provider.
 * 5. Codex section visible only for openai-codex provider.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { DEFAULT_SETTINGS } from '../state/settings';
import type { Provider } from '../llm/client';

// ---------------------------------------------------------------------------
// Mock LLM client to avoid real network calls
// ---------------------------------------------------------------------------

vi.mock('../llm/client', () => ({
  fetchModels: vi.fn().mockResolvedValue(['gpt-4', 'gpt-5']),
  codexLogin: vi.fn().mockResolvedValue('https://auth.example.com'),
  codexStatus: vi.fn().mockResolvedValue({ status: 'not_authenticated' }),
  codexLogout: vi.fn().mockResolvedValue(undefined),
}));

import { SettingsView } from './SettingsView';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFakeApi(): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(),
      getNodeDefinitions: vi.fn(),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: { get: vi.fn().mockReturnValue(null), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

function makeSettings(overrides: Partial<Settings> = {}): Settings {
  return {
    ...DEFAULT_SETTINGS,
    models: { ...DEFAULT_SETTINGS.models },
    apiKeys: { ...DEFAULT_SETTINGS.apiKeys },
    ...overrides,
  };
}

interface RenderOpts {
  settings?: Settings;
  codexLoggedIn?: boolean;
  codexEmail?: string | null;
  onChange?: (s: Settings) => void;
  onCodexStatusChange?: (loggedIn: boolean, email: string | null) => void;
}

function renderSettings(opts: RenderOpts = {}) {
  const api = makeFakeApi();
  const settings = opts.settings ?? makeSettings();
  const onChange = opts.onChange ?? vi.fn();
  const onCodexStatusChange = opts.onCodexStatusChange ?? vi.fn();

  const result = render(
    <SettingsView
      api={api}
      settings={settings}
      codexLoggedIn={opts.codexLoggedIn ?? false}
      codexEmail={opts.codexEmail ?? null}
      onCodexStatusChange={onCodexStatusChange}
      onChange={onChange}
    />,
  );
  return { ...result, api, onChange, onCodexStatusChange };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SettingsView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // Provider select
  // -------------------------------------------------------------------------

  it('renders all provider options', () => {
    renderSettings();
    const select = screen.getByRole('combobox', { name: /select llm provider/i });
    const options = Array.from((select as HTMLSelectElement).options).map((o) => o.value);
    expect(options).toContain('openai');
    expect(options).toContain('openai-codex');
    expect(options).toContain('openrouter');
    expect(options).toContain('anthropic');
    expect(options).toContain('custom');
  });

  it('switching provider calls onChange with updated provider', () => {
    const onChange = vi.fn();
    renderSettings({ settings: makeSettings({ provider: 'openai' }), onChange });

    const select = screen.getByRole('combobox', { name: /select llm provider/i });
    fireEvent.change(select, { target: { value: 'anthropic' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].provider).toBe('anthropic');
  });

  it('switching to openrouter provider calls onChange with openrouter', () => {
    const onChange = vi.fn();
    renderSettings({ settings: makeSettings({ provider: 'openai' }), onChange });

    const select = screen.getByRole('combobox', { name: /select llm provider/i });
    fireEvent.change(select, { target: { value: 'openrouter' } });

    expect(onChange.mock.calls[0][0].provider).toBe('openrouter');
  });

  // -------------------------------------------------------------------------
  // Model input
  // -------------------------------------------------------------------------

  it('model input shows the current model for the selected provider', () => {
    const settings = makeSettings({
      provider: 'openai',
      models: { openai: 'gpt-test-model' },
    });
    renderSettings({ settings });

    const modelInput = screen.getByRole('combobox', { name: /model id/i });
    expect((modelInput as HTMLInputElement).value).toBe('gpt-test-model');
  });

  it('changing model input calls onChange with updated model', () => {
    const onChange = vi.fn();
    const settings = makeSettings({ provider: 'openai' });
    renderSettings({ settings, onChange });

    const modelInput = screen.getByRole('combobox', { name: /model id/i });
    fireEvent.change(modelInput, { target: { value: 'gpt-new-model' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].models.openai).toBe('gpt-new-model');
  });

  // -------------------------------------------------------------------------
  // API key input
  // -------------------------------------------------------------------------

  it('shows OpenAI key field for openai provider', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai' }) });
    // PasswordInput has aria-label; getByLabelText matches on the input's aria-label
    expect(screen.getByLabelText(/openai api key/i)).toBeTruthy();
  });

  it('api key blur triggers onChange with updated key', async () => {
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({ provider: 'openai', apiKeys: { openai: '' } }),
      onChange,
    });

    // Click "Show" to switch to text mode so userEvent.type works reliably
    const showBtn = screen.getByRole('button', { name: /show key/i });
    await userEvent.click(showBtn);

    const keyInput = screen.getByLabelText(/openai api key/i);
    await userEvent.clear(keyInput);
    await userEvent.type(keyInput, 'sk-new-key');
    fireEvent.blur(keyInput);

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Settings;
    expect(lastCall.apiKeys.openai).toBe('sk-new-key');
  });

  // -------------------------------------------------------------------------
  // Custom base URL
  // -------------------------------------------------------------------------

  it('custom base URL field is hidden for non-custom providers', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai' }) });
    expect(screen.queryByLabelText(/custom api base url/i)).toBeNull();
  });

  it('custom base URL field appears for custom provider', () => {
    renderSettings({ settings: makeSettings({ provider: 'custom' }) });
    expect(screen.getByLabelText(/custom api base url/i)).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Codex section
  // -------------------------------------------------------------------------

  it('codex sign-in section only visible for openai-codex', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai' }) });
    expect(screen.queryByRole('button', { name: /sign in with chatgpt codex/i })).toBeNull();
  });

  it('codex section visible for openai-codex provider', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    expect(screen.getByRole('button', { name: /sign in with chatgpt codex/i })).toBeTruthy();
  });

  it('shows signed-in status when codexLoggedIn is true', () => {
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
      codexEmail: 'user@example.com',
    });
    expect(screen.getByText(/signed in as user@example\.com/i)).toBeTruthy();
  });

  it('shows sign-out button when logged in', () => {
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
    });
    expect(screen.getByRole('button', { name: /sign out/i })).toBeTruthy();
  });

  it('shows "not signed in" status when not logged in and not pending', () => {
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: false,
    });
    expect(screen.getByText(/not signed in/i)).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Footnote
  // -------------------------------------------------------------------------

  it('renders the privacy footnote', () => {
    renderSettings();
    expect(screen.getByText(/keys are stored/i)).toBeTruthy();
  });
});
