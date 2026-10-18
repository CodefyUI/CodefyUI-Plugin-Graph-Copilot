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
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { activeReasoningEffort, DEFAULT_SETTINGS } from '../state/settings';
import type { Provider } from '../llm/client';

// ---------------------------------------------------------------------------
// Mock LLM client to avoid real network calls
// ---------------------------------------------------------------------------

vi.mock('../llm/client', () => ({
  fetchModelCatalog: vi.fn().mockResolvedValue({
    models: [
      { id: 'gpt-4', label: 'GPT-4' },
      { id: 'gpt-5', label: 'GPT-5' },
    ],
    capabilities: { reasoningEffort: false, richModelCatalog: false },
  }),
  codexLogin: vi.fn().mockResolvedValue('https://auth.example.com'),
  codexStatus: vi.fn().mockResolvedValue({ status: 'logged_out' }),
  codexLogout: vi.fn().mockResolvedValue(undefined),
}));

import { SettingsView } from './SettingsView';
import { codexStatus, fetchModelCatalog } from '../llm/client';
import { clearModelCatalogCache } from '../llm/models';
import { invalidateCodexStatusGeneration } from '../llm/codexStatusEpoch';

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
    reasoningEfforts: { ...DEFAULT_SETTINGS.reasoningEfforts },
    providerCapabilities: { ...DEFAULT_SETTINGS.providerCapabilities },
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
    clearModelCatalogCache();
    invalidateCodexStatusGeneration();
    // Rendering tests do not exercise the background auth read. Keep it pending
    // unless a test supplies a response, just as for catalog completion below.
    vi.mocked(codexStatus).mockImplementation(() => new Promise(() => {}));
    // Most base rendering tests do not exercise catalog completion; keeping
    // it pending avoids unrelated async state updates after synchronous asserts.
    vi.mocked(fetchModelCatalog).mockImplementation(() => new Promise(() => {}));
  });

  // -------------------------------------------------------------------------
  // Provider select
  // -------------------------------------------------------------------------

  it('groups connection prerequisites before model and keeps behavior last', () => {
    const { container } = renderSettings();
    expect(screen.getByRole('heading', { level: 2, name: 'Settings' })).toBeInTheDocument();
    const sections = Array.from(container.querySelectorAll('section.gcp-settings-section'));
    expect(sections.map((section) => section.querySelector('h3')?.textContent)).toEqual(['Connection', 'Model', 'Behavior']);
    const connection = screen.getByRole('region', { name: 'Connection' });
    expect(within(connection).getByRole('combobox', { name: /select llm provider/i })).toBeInTheDocument();
    expect(within(connection).getByLabelText('OpenAI API key')).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Model' })).getByRole('combobox', { name: 'Model ID' })).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Behavior' })).getByRole('checkbox')).toBeInTheDocument();
  });

  it('associates credential labels with controls and explains blur-save and local privacy', () => {
    const { container } = renderSettings();
    const key = screen.getByLabelText('OpenAI API key');
    expect(key.id).toBeTruthy();
    expect(container.querySelector(`label[for="${key.id}"]`)).toHaveTextContent('OpenAI API key');
    expect(key).toHaveAccessibleDescription(/Saved when you leave this field.*not encrypted.*trusted endpoint/i);
    expect(screen.getByText('Saved when you leave this field.')).toBeVisible();
    expect(screen.getByText(/keys are stored/i)).toHaveTextContent(/localStorage.*not encrypted by Graph Copilot/i);
  });

  it.each(['openai', 'openrouter', 'anthropic'] as const)('disables Refresh for missing %s authentication with a prerequisite hint', (provider) => {
    renderSettings({ settings: makeSettings({ provider, apiKeys: { [provider]: '   ' } }) });
    const refresh = screen.getByRole('button', { name: /load available models/i });
    expect(refresh).toBeDisabled();
    expect(refresh).toHaveAccessibleDescription('Enter an API key above to refresh available models.');
    fireEvent.click(refresh);
    expect(fetchModelCatalog).not.toHaveBeenCalled();
  });

  it('disables Refresh for missing custom base URL, not its optional key or model', () => {
    const { unmount } = renderSettings({ settings: makeSettings({ provider: 'custom', models: {}, apiKeys: {}, customBaseUrl: ' ' }) });
    const refresh = screen.getByRole('button', { name: /load available models/i });
    expect(refresh).toBeDisabled();
    expect(refresh).toHaveAccessibleDescription(/Enter a base URL above.*API key is optional/i);
    expect(fetchModelCatalog).not.toHaveBeenCalled();
    unmount();
    renderSettings({ settings: makeSettings({ provider: 'custom', models: {}, apiKeys: {}, customBaseUrl: 'https://local.example/v1' }) });
    expect(screen.getByRole('button', { name: /load available models/i })).toBeEnabled();
    expect(fetchModelCatalog).not.toHaveBeenCalled();
  });

  it('allows authenticated Refresh even when no model has been selected', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValueOnce({ models: [], capabilities: { reasoningEffort: false, richModelCatalog: false } });
    renderSettings({ settings: makeSettings({ apiKeys: { openai: 'sk-ready' }, models: { openai: '' } }) });
    const refresh = screen.getByRole('button', { name: /load available models/i });
    await waitFor(() => expect(refresh).toBeEnabled());
    expect(screen.getByRole('combobox', { name: 'Model ID' })).toHaveAttribute('aria-invalid', 'true');
    expect(refresh).toHaveAccessibleDescription(/Refresh loads available models/i);
    expect(fetchModelCatalog).toHaveBeenCalledTimes(1);
  });

  it('reveals and hides the same unsaved key draft without claiming it was saved', () => {
    const { onChange } = renderSettings({ settings: makeSettings({ apiKeys: {} }) });
    const key = screen.getByLabelText('OpenAI API key');
    fireEvent.change(key, { target: { value: 'sk-unsaved' } });
    expect(key).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: 'Show key' }));
    expect(key).toHaveAttribute('type', 'text');
    expect(key).toHaveValue('sk-unsaved');
    fireEvent.click(screen.getByRole('button', { name: 'Hide key' }));
    expect(key).toHaveAttribute('type', 'password');
    expect(key).toHaveValue('sk-unsaved');
    expect(onChange).not.toHaveBeenCalled();
    expect(fetchModelCatalog).not.toHaveBeenCalled();
  });

  it('asks for sign-in before enabling Codex model refresh', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    const refresh = screen.getByRole('button', { name: /load available models/i });
    expect(refresh).toBeDisabled();
    expect(refresh).toHaveAccessibleDescription('Sign in above to refresh available models.');
    expect(screen.getByRole('group', { name: 'ChatGPT Codex sign-in' })).toBeInTheDocument();
    expect(fetchModelCatalog).not.toHaveBeenCalled();
  });

  it('editing a draft key enables Refresh but does not save or fetch on each keystroke', () => {
    const { onChange } = renderSettings({ settings: makeSettings({ apiKeys: {} }) });
    const key = screen.getByLabelText('OpenAI API key');
    expect(screen.getByRole('button', { name: /load available models/i })).toBeDisabled();
    fireEvent.change(key, { target: { value: 'sk-draft' } });
    expect(screen.getByRole('button', { name: /load available models/i })).toBeEnabled();
    expect(onChange).not.toHaveBeenCalled();
    expect(fetchModelCatalog).not.toHaveBeenCalled();
    fireEvent.blur(key);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ apiKeys: { openai: 'sk-draft' } }));
  });

  it('commits a key draft before Escape bubbles to a closing shell, except during IME composition', () => {
    const { onChange } = renderSettings({ settings: makeSettings({ apiKeys: {} }) });
    const key = screen.getByLabelText('OpenAI API key');
    fireEvent.change(key, { target: { value: 'sk-draft' } });
    fireEvent.keyDown(key, { key: 'Escape', isComposing: true });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(key, { key: 'Escape' });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ apiKeys: { openai: 'sk-draft' } }));
    fireEvent.blur(key);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fetchModelCatalog).not.toHaveBeenCalled();
  });

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

  it('offers all three curated GPT-5.6 variants without credentials', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai', apiKeys: {} }) });
    const values = Array.from(
      document.querySelectorAll('#gcp-model-datalist option'),
    ).map((option) => (option as HTMLOptionElement).value);
    expect(values).toEqual(expect.arrayContaining([
      'gpt-5.6-sol',
      'gpt-5.6-terra',
      'gpt-5.6-luna',
    ]));
  });

  it('shows provider-specific effort choices only after capability negotiation', () => {
    const { unmount } = renderSettings({
      settings: makeSettings({
        provider: 'openai',
        providerCapabilities: { openai: { reasoningEffort: true } },
      }),
    });
    const openaiEffort = screen.getByRole('combobox', { name: /reasoning effort/i });
    expect(Array.from((openaiEffort as HTMLSelectElement).options).map((o) => o.value))
      .toEqual(['', 'none', 'low', 'medium', 'high', 'xhigh', 'max']);
    expect(screen.getByRole('option', { name: /model default \(medium\)/i })).toBeTruthy();
    unmount();

    renderSettings({
      settings: makeSettings({
        provider: 'openai-codex',
        providerCapabilities: { 'openai-codex': { reasoningEffort: true } },
      }),
      codexLoggedIn: true,
    });
    const codexEffort = screen.getByRole('combobox', { name: /reasoning effort/i });
    expect(Array.from((codexEffort as HTMLSelectElement).options).map((o) => o.value))
      .toEqual(['', 'low', 'medium', 'high', 'xhigh', 'max']);
    expect(screen.getByRole('option', { name: /model default \(max\)/i })).toBeTruthy();
  });

  it('keeps the effort selector for the official gpt-5.6 Sol alias', () => {
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        models: { ...DEFAULT_SETTINGS.models, openai: 'gpt-5.6' },
        providerCapabilities: { openai: { reasoningEffort: true } },
      }),
    });

    expect(screen.getByRole('combobox', { name: /reasoning effort/i })).toBeTruthy();
    expect(screen.getByRole('option', { name: /model default \(medium\)/i })).toBeTruthy();
  });

  it('preserves the effort but clears its model binding for an unknown model', () => {
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        reasoningEfforts: { openai: 'max' },
        providerCapabilities: {
          openai: {
            reasoningEffort: true,
            reasoningModel: 'gpt-5.6-sol',
          },
        },
      }),
      onChange,
    });

    fireEvent.change(screen.getByRole('combobox', { name: /model id/i }), {
      target: { value: 'legacy-no-effort' },
    });
    const updated = onChange.mock.calls.at(-1)?.[0] as Settings;
    expect(updated.models.openai).toBe('legacy-no-effort');
    expect(updated.reasoningEfforts?.openai).toBe('max');
    expect(updated.providerCapabilities?.openai?.reasoningModel).toBeUndefined();
  });

  // -------------------------------------------------------------------------
  // API key input
  // -------------------------------------------------------------------------

  it('shows OpenAI key field for openai provider', () => {
    renderSettings({ settings: makeSettings({ provider: 'openai' }) });
    // PasswordInput has aria-label; getByLabelText matches on the input's aria-label
    expect(screen.getByLabelText(/openai api key/i)).toBeTruthy();
  });

  it('preserves negotiated effort and capabilities when the key is blurred without a change', () => {
    const onChange = vi.fn();
    const settings = makeSettings({
      provider: 'openai', apiKeys: { openai: 'sk-same' }, reasoningEfforts: { openai: 'max' },
      providerCapabilities: { openai: { reasoningEffort: true, richModelCatalog: true, reasoningModel: 'gpt-5.6-sol' } },
    });
    renderSettings({ settings, onChange });
    const key = screen.getByLabelText(/openai api key/i);
    fireEvent.focus(key);
    fireEvent.blur(key);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('combobox', { name: /reasoning effort/i })).toHaveValue('max');
    expect(activeReasoningEffort(settings)).toBe('max');
    expect(fetchModelCatalog).toHaveBeenCalledTimes(1);
  });

  it('invalidates the old credential capability before the new-key catalog resolves', () => {
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        apiKeys: { openai: 'sk-old' },
        reasoningEfforts: { openai: 'max' },
        providerCapabilities: {
          openai: {
            reasoningEffort: true,
            richModelCatalog: false,
            reasoningModel: 'gpt-5.6-sol',
          },
        },
      }),
      onChange,
    });

    const keyInput = screen.getByLabelText(/openai api key/i);
    fireEvent.change(keyInput, {
      target: { value: 'sk-new' },
    });
    fireEvent.blur(keyInput);
    const updated = onChange.mock.calls.at(-1)?.[0] as Settings;
    expect(updated.apiKeys.openai).toBe('sk-new');
    expect(updated.reasoningEfforts?.openai).toBe('max');
    expect(updated.providerCapabilities?.openai).toBeUndefined();
    expect(activeReasoningEffort(updated)).toBeUndefined();
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

  // Regression: backend GET /api/llm/codex/status returns status "logged_in"
  // (not "authenticated"). The mount-time status check must honor that exact
  // contract, otherwise the UI never reflects an existing ChatGPT session.
  it('reports signed-in on mount when codexStatus resolves status "logged_in"', async () => {
    vi.mocked(codexStatus).mockResolvedValueOnce({
      status: 'logged_in',
      email: 'user@example.com',
    });
    const { onCodexStatusChange } = renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
    });
    await waitFor(() =>
      expect(onCodexStatusChange).toHaveBeenCalledWith(true, 'user@example.com'),
    );
  });

  // -------------------------------------------------------------------------
  // Notification toggle
  // -------------------------------------------------------------------------

  it('renders the notification toggle checkbox checked by default', () => {
    renderSettings();
    const checkbox = screen.getByRole('checkbox', { name: /notify when a graph run finishes/i });
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  it('clicking the notification toggle calls onChange with notifyOnRunCompletion: false', async () => {
    const onChange = vi.fn();
    renderSettings({ onChange });

    const checkbox = screen.getByRole('checkbox', { name: /notify when a graph run finishes/i });
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].notifyOnRunCompletion).toBe(false);
  });

  it('re-rendering with notifyOnRunCompletion: false renders unchecked', () => {
    const { rerender } = renderSettings({
      settings: makeSettings({ notifyOnRunCompletion: false }),
    });

    let checkbox = screen.getByRole('checkbox', { name: /notify when a graph run finishes/i });
    expect((checkbox as HTMLInputElement).checked).toBe(false);

    rerender(
      <SettingsView
        api={makeFakeApi()}
        settings={makeSettings({ notifyOnRunCompletion: true })}
        codexLoggedIn={false}
        codexEmail={null}
        onCodexStatusChange={vi.fn()}
        onChange={vi.fn()}
      />,
    );

    checkbox = screen.getByRole('checkbox', { name: /notify when a graph run finishes/i });
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Footnote
  // -------------------------------------------------------------------------

  it('shows concrete setup guidance when a required model is only whitespace', () => {
    renderSettings({ settings: makeSettings({ models: { openai: '   ' }, apiKeys: { openai: 'key' } }) });
    expect(screen.getByText(/enter a model id/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /model id/i })).toHaveAttribute('aria-invalid', 'true');
  });

  it('treats a malformed saved model as missing instead of throwing', () => {
    const settings = makeSettings({ models: { openai: 123 } as unknown as Settings['models'] });
    expect(() => renderSettings({ settings })).not.toThrow();
    expect(screen.getByText(/enter a model id/i)).toBeInTheDocument();
  });

  it('model validation description points to guidance only for the invalid model', () => {
    renderSettings({ settings: makeSettings({ apiKeys: {} }) });
    expect(screen.getByRole('combobox', { name: /model id/i })).not.toHaveAttribute('aria-describedby');
  });

  it('shows relevant API key guidance and accepts an optional custom key', () => {
    const view = renderSettings({ settings: makeSettings({ apiKeys: { openai: '   ' } }) });
    expect(screen.getByText(/enter an openai api key/i)).toBeInTheDocument();
    view.unmount();
    renderSettings({ settings: makeSettings({ provider: 'custom', models: { custom: 'local' }, customBaseUrl: 'http://local/v1', apiKeys: {} }) });
    expect(screen.queryByText(/enter.*api key/i)).toBeNull();
  });

  it('renders the privacy footnote', () => {
    renderSettings();
    expect(screen.getByText(/keys are stored/i)).toBeTruthy();
  });
});
