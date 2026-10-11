/**
 * SettingsView — async flows the base suite doesn't cover:
 * "Load list" model fetch (success + error) and the Codex sign-in / sign-out
 * handlers (success + error).
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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
  const settings = over.settings ?? makeSettings();
  const view = render(
    <SettingsView
      api={api}
      settings={settings}
      codexLoggedIn={over.codexLoggedIn ?? false}
      codexEmail={over.codexEmail ?? null}
      onCodexStatusChange={onCodexStatusChange}
      onChange={vi.fn()}
    />,
  );
  return {
    ...view, api, onCodexStatusChange,
    rerenderSettings(nextSettings: Settings, loggedIn = over.codexLoggedIn ?? false) {
      view.rerender(<SettingsView
        api={api} settings={nextSettings} codexLoggedIn={loggedIn} codexEmail={over.codexEmail ?? null}
        onCodexStatusChange={onCodexStatusChange} onChange={vi.fn()}
      />);
    },
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function modelValues() {
  return Array.from(document.querySelectorAll('#gcp-model-datalist option')).map((option) => (option as HTMLOptionElement).value);
}

describe('SettingsView flows', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // The mount effect calls codexStatus() for the codex provider; give it a
    // benign default so it resolves instead of returning undefined.
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_out' });
  });

  it.each(['provider', 'key', 'baseUrl'] as const)('ignores stale model responses after changing %s, including a switch back', async (changed) => {
    const first = deferred<string[]>();
    const second = deferred<string[]>();
    vi.mocked(fetchModels).mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    const initial = makeSettings({ provider: 'custom', models: { custom: 'local' }, apiKeys: { custom: 'first' }, customBaseUrl: 'http://first/v1' });
    const { rerenderSettings } = renderSettings({ settings: initial });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    const next = changed === 'provider' ? { ...initial, provider: 'anthropic' as const }
      : changed === 'key' ? { ...initial, apiKeys: { custom: 'second' } }
      : { ...initial, customBaseUrl: 'http://second/v1' };
    rerenderSettings(next);
    expect(screen.getByRole('button', { name: /load available models/i })).not.toBeDisabled();
    expect(modelValues()).toEqual([]);
    rerenderSettings(initial);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await act(async () => { second.resolve(['current-model']); });
    expect(modelValues()).toEqual(['current-model']);
    await act(async () => { first.resolve(['stale-model']); });
    expect(modelValues()).toEqual(['current-model']);
  });

  it('clears previous list/error and ignores an old failure while the new model request is pending', async () => {
    const old = deferred<string[]>();
    const current = deferred<string[]>();
    const firstSettings = makeSettings({ apiKeys: { openai: 'first' } });
    const { rerenderSettings } = renderSettings({ settings: firstSettings });
    vi.mocked(fetchModels).mockResolvedValueOnce(['first-model']);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(modelValues()).toEqual(['first-model']));
    vi.mocked(fetchModels).mockReturnValueOnce(old.promise).mockReturnValueOnce(current.promise);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    rerenderSettings({ ...firstSettings, apiKeys: { openai: 'new-key' } });
    expect(modelValues()).toEqual([]);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await act(async () => { old.reject(new Error('old credential failure')); });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('button', { name: /load available models/i })).toBeDisabled();
    await act(async () => { current.resolve(['new-model']); });
    expect(modelValues()).toEqual(['new-model']);
    vi.mocked(fetchModels).mockRejectedValueOnce(new Error('new credential failure'));
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('new credential failure');
    rerenderSettings({ ...firstSettings, provider: 'anthropic' });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(modelValues()).toEqual([]);
  });

  it('invalidates a request as soon as a key is edited, before blur saves the key', async () => {
    const request = deferred<string[]>();
    vi.mocked(fetchModels).mockReturnValueOnce(request.promise);
    renderSettings({ settings: makeSettings({ apiKeys: { openai: 'saved-key' } }) });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    fireEvent.change(screen.getByLabelText(/openai api key/i), { target: { value: 'unsaved-new-key' } });
    await act(async () => { request.resolve(['old-key-model']); });
    expect(modelValues()).toEqual([]);
  });

  it('does not dispatch duplicate model requests before the loading state renders', () => {
    const request = deferred<string[]>();
    vi.mocked(fetchModels).mockReturnValue(request.promise);
    renderSettings();
    const button = screen.getByRole('button', { name: /load available models/i });
    act(() => { button.click(); button.click(); });
    expect(fetchModels).toHaveBeenCalledTimes(1);
  });

  it('does not publish a late mount status after logout begins', async () => {
    const status = deferred<{ status: string; email?: string }>();
    const logout = deferred<void>();
    vi.mocked(codexStatus).mockReturnValueOnce(status.promise);
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    const { onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true });
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    await act(async () => { status.resolve({ status: 'logged_in', email: 'stale@x.com' }); });
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'stale@x.com');
    await act(async () => { logout.resolve(); });
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
  });

  it('ignores status callbacks after unmount or a provider change', async () => {
    const status = deferred<{ status: string; email?: string }>();
    vi.mocked(codexStatus).mockReturnValueOnce(status.promise);
    const { unmount, onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    unmount();
    await act(async () => { status.resolve({ status: 'logged_in', email: 'late@x.com' }); });
    expect(onCodexStatusChange).not.toHaveBeenCalled();
  });

  it('ignores a late sign-in URL after switching provider and rechecks status when entering Codex', async () => {
    const login = deferred<string>();
    vi.mocked(codexLogin).mockReturnValueOnce(login.promise);
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    const { rerenderSettings, onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    rerenderSettings(makeSettings({ provider: 'openai' }));
    await act(async () => { login.resolve('https://late-auth.example.com'); });
    expect(open).not.toHaveBeenCalled();
    expect(onCodexStatusChange).not.toHaveBeenCalled();
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_in', email: 'current@x.com' });
    rerenderSettings(makeSettings({ provider: 'openai-codex' }));
    await waitFor(() => expect(onCodexStatusChange).toHaveBeenCalledWith(true, 'current@x.com'));
  });

  it('prevents repeated sign-in and sign-out dispatches before awaiting their responses', async () => {
    const login = deferred<string>();
    const logout = deferred<void>();
    vi.mocked(codexLogin).mockReturnValueOnce(login.promise);
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    vi.spyOn(window, 'open').mockReturnValue(null);
    const { rerenderSettings } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    const signIn = screen.getByRole('button', { name: /sign in with/i });
    act(() => { signIn.click(); signIn.click(); });
    expect(codexLogin).toHaveBeenCalledTimes(1);
    await act(async () => { login.resolve('https://auth.example.com'); });
    rerenderSettings(makeSettings({ provider: 'openai-codex' }), true);
    const signOut = screen.getByRole('button', { name: /sign out from/i });
    act(() => { signOut.click(); signOut.click(); });
    expect(codexLogout).toHaveBeenCalledTimes(1);
    await act(async () => { logout.resolve(); });
  });

  it('polls sequentially and gives a clear timeout even if a status request is still pending', async () => {
    vi.useFakeTimers();
    const poll = deferred<{ status: string; email?: string }>();
    vi.mocked(codexLogin).mockResolvedValueOnce('https://auth.example.com');
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_out' }).mockReturnValue(poll.promise);
    vi.spyOn(window, 'open').mockReturnValue(null);
    const { onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    await act(async () => {});
    await act(async () => { await vi.advanceTimersByTimeAsync(6000); });
    expect(codexStatus).toHaveBeenCalledTimes(2); // mount and one pending poll, not overlapping intervals
    await act(async () => { await vi.advanceTimersByTimeAsync(5 * 60 * 1000); });
    expect(screen.getByRole('alert')).toHaveTextContent(/timed out.*try again/i);
    expect(screen.getByRole('button', { name: /sign in with/i })).not.toBeDisabled();
    await act(async () => { poll.resolve({ status: 'logged_in', email: 'expired@x.com' }); });
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'expired@x.com');
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
  });

  it('finishes polling on a current signed-in response and stops further status requests', async () => {
    vi.useFakeTimers();
    vi.mocked(codexLogin).mockResolvedValueOnce('https://auth.example.com');
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_out' }).mockResolvedValue({ status: 'logged_in', email: 'me@x.com' });
    vi.spyOn(window, 'open').mockReturnValue(null);
    const { onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    await act(async () => {});
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(onCodexStatusChange).toHaveBeenCalledWith(true, 'me@x.com');
    expect(screen.queryByText(/sign-in pending/i)).toBeNull();
    await act(async () => { await vi.advanceTimersByTimeAsync(6000); });
    expect(codexStatus).toHaveBeenCalledTimes(2);
  });

  it('continues sequential polling after a status error and clears a previous sign-in error on retry', async () => {
    vi.useFakeTimers();
    vi.mocked(codexLogin).mockRejectedValueOnce(new Error('login failed')).mockResolvedValueOnce('https://auth.example.com');
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_out' }).mockRejectedValueOnce(new Error('status failed')).mockResolvedValue({ status: 'logged_in' });
    vi.spyOn(window, 'open').mockReturnValue(null);
    const { onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    await act(async () => {});
    expect(screen.getByRole('alert')).toHaveTextContent('login failed');
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    await act(async () => {});
    expect(screen.queryByRole('alert')).toBeNull();
    await act(async () => { await vi.advanceTimersByTimeAsync(4000); });
    expect(onCodexStatusChange).toHaveBeenCalledWith(true, null);
  });

  it('reports a sign-out error without admitting a late logged-in status', async () => {
    const status = deferred<{ status: string; email?: string }>();
    vi.mocked(codexStatus).mockReturnValueOnce(status.promise);
    vi.mocked(codexLogout).mockRejectedValueOnce(new Error('logout failed'));
    const { onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true });
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('logout failed');
    await act(async () => { status.resolve({ status: 'logged_in' }); });
    expect(onCodexStatusChange).toHaveBeenCalledTimes(1);
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
  });

  it('aborts model transport on key edits and unmount while retaining the stale-response guard', async () => {
    const first = deferred<string[]>();
    const second = deferred<string[]>();
    vi.mocked(fetchModels).mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    const { unmount } = renderSettings({ settings: makeSettings({ apiKeys: { openai: 'key' } }) });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    const firstSignal = vi.mocked(fetchModels).mock.calls[0][4]!;
    expect(firstSignal.aborted).toBe(false);
    fireEvent.change(screen.getByLabelText(/openai api key/i), { target: { value: 'new key' } });
    expect(firstSignal.aborted).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    const secondSignal = vi.mocked(fetchModels).mock.calls[1][4]!;
    unmount();
    expect(secondSignal.aborted).toBe(true);
    await act(async () => { first.reject(new Error('late abort')); second.resolve(['late model']); });
  });

  it('ignores a pending poll status after signing out and clears all timers on unmount', async () => {
    vi.useFakeTimers();
    const poll = deferred<{ status: string; email?: string }>();
    vi.mocked(codexLogin).mockResolvedValueOnce('https://auth.example.com');
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_out' }).mockReturnValue(poll.promise);
    vi.mocked(codexLogout).mockResolvedValueOnce(undefined);
    vi.spyOn(window, 'open').mockReturnValue(null);
    const { rerenderSettings, unmount, onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    await act(async () => {});
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    rerenderSettings(makeSettings({ provider: 'openai-codex' }), true);
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    await act(async () => {});
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
    await act(async () => { poll.resolve({ status: 'logged_in' }); });
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, null);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not show a model list from an expired Codex authentication context', async () => {
    const models = deferred<string[]>();
    vi.mocked(fetchModels).mockReturnValueOnce(models.promise);
    vi.mocked(codexLogout).mockResolvedValueOnce(undefined);
    const settings = makeSettings({ provider: 'openai-codex' });
    const { rerenderSettings } = renderSettings({ settings, codexLoggedIn: true });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    await act(async () => {});
    rerenderSettings(settings, false);
    await act(async () => { models.resolve(['old-session-model']); });
    expect(modelValues()).toEqual([]);
  });

  it('marks Codex signed out synchronously before a delayed logout and keeps that boundary after unmount', async () => {
    const logout = deferred<void>();
    const status = deferred<{ status: string; email?: string }>();
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    vi.mocked(codexStatus).mockReturnValueOnce(status.promise);
    const { unmount, onCodexStatusChange } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true });
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    expect(onCodexStatusChange).toHaveBeenCalledTimes(1);
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
    unmount();
    await act(async () => { status.resolve({ status: 'logged_in', email: 'old@x.com' }); logout.resolve(); });
    expect(onCodexStatusChange).toHaveBeenCalledTimes(1);
  });

  it('reconciles an explicit logged-out mount response without treating unknown status as logged out', async () => {
    const onCodexStatusChange = vi.fn();
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_out' });
    const { unmount } = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true, onCodexStatusChange });
    await waitFor(() => expect(onCodexStatusChange).toHaveBeenCalledWith(false, null));
    unmount();
    onCodexStatusChange.mockClear();
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'service_unknown' });
    renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true, onCodexStatusChange });
    await act(async () => {});
    expect(onCodexStatusChange).not.toHaveBeenCalled();
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
