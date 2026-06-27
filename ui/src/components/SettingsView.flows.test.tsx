/**
 * SettingsView — async flows the base suite doesn't cover:
 * "Load list" model fetch (success + error) and the Codex sign-in / sign-out
 * handlers (success + error).
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { DEFAULT_SETTINGS } from '../state/settings';

vi.mock('../llm/client', () => ({
  fetchModels: vi.fn(),
  codexLogin: vi.fn(),
  codexStatus: vi.fn(),
  codexLogout: vi.fn(),
}));

import { SettingsView } from './SettingsView';
import { fetchModels, codexLogin, codexStatus, codexLogout } from '../llm/client';

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

function makeSettings(over: Partial<Settings> = {}): Settings {
  return {
    ...DEFAULT_SETTINGS,
    models: { ...DEFAULT_SETTINGS.models },
    apiKeys: { ...DEFAULT_SETTINGS.apiKeys },
    ...over,
  };
}

function renderSettings(over: {
  settings?: Settings;
  codexLoggedIn?: boolean;
  codexEmail?: string | null;
  onCodexStatusChange?: (l: boolean, e: string | null) => void;
} = {}) {
  const api = makeFakeApi();
  const onCodexStatusChange = over.onCodexStatusChange ?? vi.fn();
  render(
    <SettingsView
      api={api}
      settings={over.settings ?? makeSettings()}
      codexLoggedIn={over.codexLoggedIn ?? false}
      codexEmail={over.codexEmail ?? null}
      onCodexStatusChange={onCodexStatusChange}
      onChange={vi.fn()}
    />,
  );
  return { api, onCodexStatusChange };
}

describe('SettingsView flows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // The mount effect calls codexStatus() for the codex provider; give it a
    // benign default so it resolves instead of returning undefined.
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_out' });
  });

  it('loads the model list into the datalist on "Load list"', async () => {
    vi.mocked(fetchModels).mockResolvedValue(['gpt-4', 'gpt-5']);
    renderSettings({ settings: makeSettings({ provider: 'openai', apiKeys: { openai: 'sk' } }) });

    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(fetchModels).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const values = Array.from(
        document.querySelectorAll('#gcp-model-datalist option'),
      ).map((o) => (o as HTMLOptionElement).value);
      expect(values).toEqual(expect.arrayContaining(['gpt-4', 'gpt-5']));
    });
  });

  it('shows an error when loading models fails', async () => {
    vi.mocked(fetchModels).mockRejectedValue(new Error('boom'));
    renderSettings({ settings: makeSettings({ provider: 'openai', apiKeys: { openai: 'sk' } }) });

    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/boom/i);
  });

  it('starts the Codex sign-in flow (opens auth url, goes pending)', async () => {
    vi.mocked(codexLogin).mockResolvedValue('https://auth.example.com');
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });

    fireEvent.click(screen.getByRole('button', { name: /sign in with chatgpt codex/i }));
    await waitFor(() => expect(codexLogin).toHaveBeenCalledTimes(1));
    expect(openSpy).toHaveBeenCalledWith('https://auth.example.com', '_blank');
    expect(await screen.findByText(/sign-in pending/i)).toBeTruthy();
  });

  it('shows an error when Codex sign-in fails', async () => {
    vi.mocked(codexLogin).mockRejectedValue(new Error('nope'));
    renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });

    fireEvent.click(screen.getByRole('button', { name: /sign in with chatgpt codex/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/nope/i);
  });

  it('signs out of Codex', async () => {
    vi.mocked(codexLogout).mockResolvedValue(undefined);
    const onCodexStatusChange = vi.fn();
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
      codexEmail: 'me@x.com',
      onCodexStatusChange,
    });

    fireEvent.click(screen.getByRole('button', { name: /sign out from chatgpt codex/i }));
    await waitFor(() => expect(codexLogout).toHaveBeenCalledTimes(1));
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
  });
});
