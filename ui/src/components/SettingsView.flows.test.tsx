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
import type { ModelCatalogResult } from '../llm/models';

vi.mock('../llm/client', () => ({
  fetchModelCatalog: vi.fn(),
  codexLogin: vi.fn(),
  codexStatus: vi.fn(),
  codexLogout: vi.fn(),
}));

import { SettingsView } from './SettingsView';
import { fetchModelCatalog, codexLogin, codexStatus, codexLogout } from '../llm/client';
import {
  clearModelCatalogCache,
  modelCatalogCacheKey,
  readCachedModelCatalog,
} from '../llm/models';
import { coordinatedCodexStatus, invalidateCodexStatusGeneration } from '../llm/codexStatusEpoch';

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
    reasoningEfforts: { ...DEFAULT_SETTINGS.reasoningEfforts },
    providerCapabilities: { ...DEFAULT_SETTINGS.providerCapabilities },
    ...over,
  };
}

function renderSettings(over: {
  settings?: Settings;
  codexLoggedIn?: boolean;
  codexEmail?: string | null;
  onCodexStatusChange?: (l: boolean, e: string | null) => void;
  onChange?: (settings: Settings) => void;
} = {}) {
  const api = makeFakeApi();
  const onCodexStatusChange = over.onCodexStatusChange ?? vi.fn();
  const onChange = over.onChange ?? vi.fn();
  const props = {
    settings: over.settings ?? makeSettings(),
    codexLoggedIn: over.codexLoggedIn ?? false,
    codexEmail: over.codexEmail ?? null,
  };
  const result = render(
    <SettingsView
      api={api}
      settings={props.settings}
      codexLoggedIn={props.codexLoggedIn}
      codexEmail={props.codexEmail}
      onCodexStatusChange={onCodexStatusChange}
      onChange={onChange}
    />,
  );
  function rerenderSettings(next: Partial<typeof props> | Settings, loggedIn?: boolean) {
    if ('provider' in next) props.settings = next;
    else Object.assign(props, next);
    if (loggedIn !== undefined) props.codexLoggedIn = loggedIn;
    result.rerender(
      <SettingsView
        api={api}
        settings={props.settings}
        codexLoggedIn={props.codexLoggedIn}
        codexEmail={props.codexEmail}
        onCodexStatusChange={onCodexStatusChange}
        onChange={onChange}
      />,
    );
  }
  return { ...result, api, onCodexStatusChange, onChange, rerenderSettings };
}

function catalog(
  ids: string[],
  reasoningEffort = false,
  richModelCatalog = reasoningEffort,
): ModelCatalogResult {
  return {
    models: ids.map((id) => ({ id, label: id })),
    capabilities: { reasoningEffort, richModelCatalog },
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
    vi.resetAllMocks();
    clearModelCatalogCache();
    invalidateCodexStatusGeneration();
    // The mount effect calls codexStatus() for the codex provider; give it a
    // benign default so it resolves instead of returning undefined.
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_out' });
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog([]));
  });

  it.each(['provider', 'key', 'baseUrl'] as const)('ignores stale model responses after changing %s, including a switch back', async (changed) => {
    const first = deferred<ModelCatalogResult>();
    const second = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog).mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    const initial = makeSettings({ provider: 'custom', models: { custom: 'local' }, apiKeys: { custom: 'first' }, customBaseUrl: 'http://first/v1' });
    const { rerenderSettings } = renderSettings({ settings: initial });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    const next = changed === 'provider' ? { ...initial, provider: 'anthropic' as const }
      : changed === 'key' ? { ...initial, apiKeys: { custom: 'second' } }
      : { ...initial, customBaseUrl: 'http://second/v1' };
    rerenderSettings(next);
    if (changed === 'provider') {
      // Switching to Anthropic released the old request, but no key exists for
      // this provider. Its Refresh prerequisite is independently enforced.
      expect(screen.getByRole('button', { name: /load available models/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /load available models/i })).toHaveAccessibleDescription(/enter an api key above/i);
    } else {
      expect(screen.getByRole('button', { name: /load available models/i })).not.toBeDisabled();
    }
    expect(modelValues()).not.toContain('stale-model');
    rerenderSettings(initial);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await act(async () => { second.resolve(catalog(['current-model'])); });
    expect(modelValues()).toEqual(['current-model', 'local']);
    await act(async () => { first.resolve(catalog(['stale-model'])); });
    expect(modelValues()).toEqual(['current-model', 'local']);
    expect(readCachedModelCatalog(modelCatalogCacheKey('custom', 'first', 'http://first/v1'))?.models.map((m) => m.id))
      .toEqual(['current-model']);
  });

  it('clears previous list/error and ignores an old failure while the new model request is pending', async () => {
    const old = deferred<ModelCatalogResult>();
    const current = deferred<ModelCatalogResult>();
    const firstSettings = makeSettings({ apiKeys: { openai: 'first' } });
    vi.mocked(fetchModelCatalog).mockResolvedValueOnce(catalog(['first-model']));
    const { rerenderSettings } = renderSettings({ settings: firstSettings });
    await waitFor(() => expect(modelValues()).toContain('first-model'));
    vi.mocked(fetchModelCatalog).mockReturnValueOnce(old.promise).mockReturnValueOnce(current.promise);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    rerenderSettings({ ...firstSettings, apiKeys: { openai: 'new-key' } });
    expect(modelValues()).not.toContain('first-model');
    await act(async () => { old.reject(new Error('old credential failure')); });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('button', { name: /load available models/i })).toBeDisabled();
    await act(async () => { current.resolve(catalog(['new-model'])); });
    expect(modelValues()).toContain('new-model');
    vi.mocked(fetchModelCatalog).mockRejectedValueOnce(new Error('new credential failure'));
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('new credential failure');
    rerenderSettings({ ...firstSettings, provider: 'anthropic' });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(modelValues()).not.toContain('new-model');
  });

  it('invalidates a request as soon as a key is edited, before blur saves the key', async () => {
    const request = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog).mockReturnValueOnce(request.promise);
    renderSettings({ settings: makeSettings({ apiKeys: { openai: 'saved-key' } }) });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    fireEvent.change(screen.getByLabelText(/openai api key/i), { target: { value: 'unsaved-new-key' } });
    await act(async () => { request.resolve(catalog(['old-key-model'])); });
    expect(modelValues()).not.toContain('old-key-model');
    expect(readCachedModelCatalog(modelCatalogCacheKey('openai', 'saved-key'))).toBeNull();
  });

  it('does not dispatch duplicate model requests before the loading state renders', () => {
    const request = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog).mockReturnValue(request.promise);
    renderSettings({ settings: makeSettings({ provider: 'custom', customBaseUrl: 'http://local/v1' }) });
    const button = screen.getByRole('button', { name: /load available models/i });
    act(() => { button.click(); button.click(); });
    expect(fetchModelCatalog).toHaveBeenCalledTimes(1);
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
    const first = deferred<ModelCatalogResult>();
    const second = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog).mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    const { unmount } = renderSettings({ settings: makeSettings({ apiKeys: { openai: 'key' } }) });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    const firstSignal = vi.mocked(fetchModelCatalog).mock.calls[0][4]!;
    expect(firstSignal.aborted).toBe(false);
    fireEvent.change(screen.getByLabelText(/openai api key/i), { target: { value: 'new key' } });
    expect(firstSignal.aborted).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    const secondSignal = vi.mocked(fetchModelCatalog).mock.calls[1][4]!;
    unmount();
    expect(secondSignal.aborted).toBe(true);
    await act(async () => { first.reject(new Error('late abort')); second.resolve(catalog(['late model'])); });
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
    const models = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog).mockReturnValueOnce(models.promise);
    vi.mocked(codexLogout).mockResolvedValueOnce(undefined);
    const settings = makeSettings({ provider: 'openai-codex' });
    const { rerenderSettings } = renderSettings({ settings, codexLoggedIn: true });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    await act(async () => {});
    rerenderSettings(settings, false);
    await act(async () => { models.resolve(catalog(['old-session-model'])); });
    expect(modelValues()).not.toContain('old-session-model');
    expect(readCachedModelCatalog(modelCatalogCacheKey('openai-codex', 'active-codex-session'))).toBeNull();
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

  it('does not let a late initial status erase a newer signed-in catalog context', async () => {
    const status = deferred<{ status: string }>();
    vi.mocked(codexStatus).mockReturnValueOnce(status.promise);
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['current-account-model'], true));
    const view = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }) });
    await act(async () => {});
    view.rerenderSettings({ codexLoggedIn: true, codexEmail: 'current@example.com' });
    await waitFor(() => expect(modelValues()).toContain('current-account-model'));
    await act(async () => { status.resolve({ status: 'logged_out' }); });
    expect(view.onCodexStatusChange).not.toHaveBeenCalledWith(false, null);
    expect(modelValues()).toContain('current-account-model');
    expect(readCachedModelCatalog(modelCatalogCacheKey('openai-codex', 'current@example.com'))).not.toBeNull();
  });

  it('does not restore stale signed-in readiness when Settings reopens during delayed logout', async () => {
    const logout = deferred<void>();
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_in', email: 'old@example.com' });
    const onCodexStatusChange = vi.fn();
    const settings = makeSettings({ provider: 'openai-codex' });
    const old = renderSettings({ settings, codexLoggedIn: true, codexEmail: 'old@example.com', onCodexStatusChange });
    await act(async () => {});
    onCodexStatusChange.mockClear();
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
    old.unmount();
    const reopened = renderSettings({ settings, onCodexStatusChange });
    await act(async () => {});
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'old@example.com');
    await act(async () => { logout.resolve(); });
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'old@example.com');
    expect(screen.getByText('Not signed in')).toBeInTheDocument();
    reopened.unmount();
  });

  it('preserves a new explicit sign-in when an older unmounted logout finishes', async () => {
    vi.useFakeTimers();
    const logout = deferred<void>();
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_in', email: 'old@example.com' });
    const old = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true, codexEmail: 'old@example.com' });
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    old.unmount();
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_in', email: 'new@example.com' });
    vi.mocked(codexLogin).mockResolvedValueOnce('https://auth.example.com');
    vi.spyOn(window, 'open').mockReturnValue(null);
    const onCodexStatusChange = vi.fn();
    const reopened = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), onCodexStatusChange });
    fireEvent.click(screen.getByRole('button', { name: /sign in with/i }));
    await act(async () => {});
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(onCodexStatusChange).toHaveBeenCalledWith(true, 'new@example.com');
    onCodexStatusChange.mockClear();
    await act(async () => { logout.resolve(); });
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(false, null);
    await expect(coordinatedCodexStatus(() => Promise.resolve({ status: 'logged_in', email: 'new@example.com' })))
      .resolves.toEqual({ status: 'logged_in', email: 'new@example.com' });
    reopened.unmount();
  });

  it('invalidates shared status reads at logout completion even after navigation unmounts Settings', async () => {
    const logout = deferred<void>();
    const lateStatus = deferred<{ status: string }>();
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    const onCodexStatusChange = vi.fn();
    const view = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true, onCodexStatusChange });
    await act(async () => {});
    onCodexStatusChange.mockClear();
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    const sharedStatus = coordinatedCodexStatus(() => lateStatus.promise);
    view.unmount();
    await act(async () => { logout.resolve(); });
    lateStatus.resolve({ status: 'logged_in' });
    await expect(sharedStatus).resolves.toBeNull();
    expect(view.onCodexStatusChange).toHaveBeenCalledTimes(1);
    expect(view.onCodexStatusChange).toHaveBeenCalledWith(false, null);
  });

  it('does not invalidate a newer shared auth action when an old logout settles', async () => {
    const logout = deferred<void>();
    const currentStatus = deferred<{ status: string }>();
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    const view = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true });
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: /sign out from/i }));
    view.unmount();
    invalidateCodexStatusGeneration();
    const sharedStatus = coordinatedCodexStatus(() => currentStatus.promise);
    await act(async () => { logout.resolve(); });
    currentStatus.resolve({ status: 'logged_in' });
    await expect(sharedStatus).resolves.toEqual({ status: 'logged_in' });
  });

  it('does not cache or publish capability metadata from an expired Codex auth epoch', async () => {
    const models = deferred<ModelCatalogResult>();
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_in', email: 'old@example.com' });
    vi.mocked(fetchModelCatalog).mockReturnValueOnce(models.promise);
    const onChange = vi.fn();
    const view = renderSettings({ settings: makeSettings({ provider: 'openai-codex' }), codexLoggedIn: true, codexEmail: 'old@example.com', onChange });
    await act(async () => {});
    onChange.mockClear();
    invalidateCodexStatusGeneration();
    await act(async () => { models.resolve(catalog(['expired-model'], true)); });
    expect(modelValues()).not.toContain('expired-model');
    expect(view.onChange).not.toHaveBeenCalled();
    expect(readCachedModelCatalog(modelCatalogCacheKey('openai-codex', 'old@example.com'))).toBeNull();
    expect(screen.getByRole('button', { name: /load available models/i })).not.toBeDisabled();
    vi.mocked(fetchModelCatalog).mockResolvedValueOnce(catalog(['current-epoch-model'], true));
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(modelValues()).toContain('current-epoch-model'));
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

  it('automatically syncs a queryable provider and refresh bypasses the cache', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['gpt-4', 'gpt-5']));
    renderSettings({ settings: makeSettings({ provider: 'openai', apiKeys: { openai: 'sk' } }) });

    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const values = Array.from(
        document.querySelectorAll('#gcp-model-datalist option'),
      ).map((o) => (o as HTMLOptionElement).value);
      expect(values).toEqual(expect.arrayContaining(['gpt-4', 'gpt-5']));
    });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(2));
  });

  it('shows an error when loading models fails', async () => {
    vi.mocked(fetchModelCatalog).mockRejectedValue(new Error('boom'));
    renderSettings({ settings: makeSettings({ provider: 'openai', apiKeys: { openai: 'sk' } }) });

    expect(await screen.findByRole('alert')).toHaveTextContent(/boom/i);
  });

  it('reuses the five-minute cache when Settings is reopened', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['cached-model']));
    const settings = makeSettings({ provider: 'openai', apiKeys: { openai: 'sk-cache' } });
    const first = renderSettings({ settings });
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    await screen.findByDisplayValue('gpt-5.6-sol');
    first.unmount();

    renderSettings({ settings });
    await waitFor(() => {
      const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
        .map((option) => (option as HTMLOptionElement).value);
      expect(values).toContain('cached-model');
    });
    expect(fetchModelCatalog).toHaveBeenCalledTimes(1);
  });

  it('never auto-syncs custom, but explicit refresh queries its current endpoint', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['custom-live']));
    renderSettings({
      settings: makeSettings({
        provider: 'custom',
        customBaseUrl: 'https://custom.example/v1',
      }),
    });

    await Promise.resolve();
    expect(fetchModelCatalog).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    expect(fetchModelCatalog).toHaveBeenCalledWith(
      expect.anything(),
      'custom',
      undefined,
      'https://custom.example/v1',
      expect.any(AbortSignal),
    );
    await waitFor(() => {
      const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
        .map((option) => (option as HTMLOptionElement).value);
      expect(values).toContain('custom-live');
    });
  });

  it('ignores a stale provider response after the active provider changes', async () => {
    const openai = deferred<ModelCatalogResult>();
    const openrouter = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog)
      .mockReturnValueOnce(openai.promise)
      .mockReturnValueOnce(openrouter.promise);
    const view = renderSettings({
      settings: makeSettings({ provider: 'openai', apiKeys: { openai: 'sk-openai' } }),
    });
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));

    view.rerenderSettings({
      settings: makeSettings({
        provider: 'openrouter',
        apiKeys: { openai: 'sk-openai', openrouter: 'sk-router' },
      }),
    });
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(2));
    openrouter.resolve(catalog(['router-current']));
    await waitFor(() => {
      const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
        .map((option) => (option as HTMLOptionElement).value);
      expect(values).toContain('router-current');
    });

    openai.resolve(catalog(['openai-stale']));
    await Promise.resolve();
    const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
      .map((option) => (option as HTMLOptionElement).value);
    expect(values).not.toContain('openai-stale');
  });

  it('invalidates an in-flight custom refresh when the base URL changes', async () => {
    const oldEndpoint = deferred<ModelCatalogResult>();
    const newEndpoint = deferred<ModelCatalogResult>();
    vi.mocked(fetchModelCatalog)
      .mockReturnValueOnce(oldEndpoint.promise)
      .mockReturnValueOnce(newEndpoint.promise);
    const view = renderSettings({
      settings: makeSettings({ provider: 'custom', customBaseUrl: 'https://old.example/v1' }),
    });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));

    view.rerenderSettings({
      settings: makeSettings({ provider: 'custom', customBaseUrl: 'https://new.example/v1' }),
    });
    fireEvent.click(screen.getByRole('button', { name: /load available models/i }));
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(2));
    newEndpoint.resolve(catalog(['new-endpoint-model']));
    await waitFor(() => {
      const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
        .map((option) => (option as HTMLOptionElement).value);
      expect(values).toContain('new-endpoint-model');
    });
    oldEndpoint.resolve(catalog(['old-endpoint-model']));
    await Promise.resolve();
    const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
      .map((option) => (option as HTMLOptionElement).value);
    expect(values).not.toContain('old-endpoint-model');
  });

  it('clears a stale error and same-provider catalog when credentials stop being queryable', async () => {
    vi.mocked(fetchModelCatalog).mockRejectedValueOnce(new Error('old credential failed'));
    const view = renderSettings({
      settings: makeSettings({ provider: 'openai', apiKeys: { openai: 'sk-old' } }),
    });
    expect(await screen.findByRole('alert')).toHaveTextContent(/old credential/i);

    view.rerenderSettings({
      settings: makeSettings({ provider: 'openai', apiKeys: {} }),
    });
    await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  });

  it('retains a pinned selection omitted by discovery', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['provider-only-model']));
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        models: { ...DEFAULT_SETTINGS.models, openai: 'pinned-private-model' },
        apiKeys: { openai: 'sk' },
      }),
    });
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
        .map((option) => (option as HTMLOptionElement).value);
      expect(values).toContain('pinned-private-model');
    });
    expect(screen.getByRole('combobox', { name: /model id/i })).toHaveValue('pinned-private-model');
  });

  it('clears a stale effort only when a rich capable catalog proves it unsupported', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue({
      models: [{
        id: 'rich-model',
        label: 'Rich model',
        reasoningEfforts: [{ effort: 'low' }],
      }],
      capabilities: { reasoningEffort: true, richModelCatalog: true },
    });
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        models: { ...DEFAULT_SETTINGS.models, openai: 'rich-model' },
        apiKeys: { openai: 'sk' },
        reasoningEfforts: { openai: 'max' },
        providerCapabilities: { openai: { reasoningEffort: true } },
      }),
      onChange,
    });

    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const updated = onChange.mock.calls.at(-1)?.[0] as Settings | undefined;
      expect(updated?.reasoningEfforts?.openai).toBeUndefined();
      expect(updated?.providerCapabilities?.openai?.reasoningEffort).toBe(true);
    });
  });

  it('preserves effort when OpenAI advertises forwarding but only returns model ids', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue({
      models: [{ id: 'gpt-id-only', label: 'gpt-id-only' }],
      capabilities: { reasoningEffort: true, richModelCatalog: false },
    });
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        models: { ...DEFAULT_SETTINGS.models, openai: 'gpt-id-only' },
        apiKeys: { openai: 'sk' },
        reasoningEfforts: { openai: 'max' },
        providerCapabilities: {},
      }),
      onChange,
    });

    await waitFor(() => {
      const updated = onChange.mock.calls.at(-1)?.[0] as Settings | undefined;
      expect(updated?.providerCapabilities?.openai).toEqual({
        reasoningEffort: true,
        richModelCatalog: false,
      });
      expect(updated?.reasoningEfforts?.openai).toBe('max');
    });
  });

  it("preserves a future Codex effort when source: 'fallback' lacks that effort", async () => {
    vi.mocked(codexStatus).mockResolvedValueOnce({
      status: 'logged_in',
      email: 'future@example.com',
    });
    vi.mocked(fetchModelCatalog).mockResolvedValue({
      models: [{
        id: 'gpt-5.6-sol',
        label: 'GPT-5.6 Sol fallback',
        reasoningEfforts: [{ effort: 'low' }],
      }],
      capabilities: { reasoningEffort: true, richModelCatalog: true },
      source: 'fallback',
    });
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai-codex',
        models: { ...DEFAULT_SETTINGS.models, 'openai-codex': 'gpt-5.6-sol' },
        reasoningEfforts: { 'openai-codex': 'future_effort' },
        providerCapabilities: {},
      }),
      codexLoggedIn: true,
      codexEmail: 'future@example.com',
      onChange,
    });

    await waitFor(() => {
      const updated = onChange.mock.calls.at(-1)?.[0] as Settings | undefined;
      expect(updated?.providerCapabilities?.['openai-codex']?.richModelCatalog).toBe(true);
      expect(updated?.reasoningEfforts?.['openai-codex']).toBe('future_effort');
      expect(updated?.providerCapabilities?.['openai-codex']?.reasoningModel).toBeUndefined();
    });
  });

  it('preserves effort preferences when a legacy host reports no capability', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['legacy-model'], false));
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai',
        models: { ...DEFAULT_SETTINGS.models, openai: 'legacy-model' },
        apiKeys: { openai: 'sk' },
        reasoningEfforts: { openai: 'max' },
        providerCapabilities: { openai: { reasoningEffort: true } },
      }),
      onChange,
    });

    await waitFor(() => {
      const updated = onChange.mock.calls.at(-1)?.[0] as Settings | undefined;
      expect(updated?.providerCapabilities?.openai?.reasoningEffort).toBe(false);
      expect(updated?.reasoningEfforts?.openai).toBe('max');
    });
  });

  it('preserves a Codex effort while login status is still false', async () => {
    const onChange = vi.fn();
    renderSettings({
      settings: makeSettings({
        provider: 'openai-codex',
        reasoningEfforts: { 'openai-codex': 'max' },
        providerCapabilities: { 'openai-codex': { reasoningEffort: true } },
      }),
      codexLoggedIn: false,
      onChange,
    });

    await waitFor(() => {
      const updated = onChange.mock.calls.at(-1)?.[0] as Settings | undefined;
      expect(updated?.providerCapabilities?.['openai-codex']?.reasoningEffort).toBe(false);
      expect(updated?.reasoningEfforts?.['openai-codex']).toBe('max');
    });
    expect(fetchModelCatalog).not.toHaveBeenCalled();
  });

  it('clears stale Codex login state when the status endpoint reports logged out', async () => {
    const onCodexStatusChange = vi.fn();
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
      codexEmail: 'stale@example.com',
      onCodexStatusChange,
    });

    await waitFor(() => {
      expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
    });
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

  it('syncs Codex after login becomes available', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['codex-live'], true));
    const view = renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: false,
    });
    expect(fetchModelCatalog).not.toHaveBeenCalled();

    view.rerenderSettings({ codexLoggedIn: true, codexEmail: 'account@example.com' });
    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const values = Array.from(document.querySelectorAll('#gcp-model-datalist option'))
        .map((option) => (option as HTMLOptionElement).value);
      expect(values).toContain('codex-live');
    });
  });

  it('signs out of Codex and clears its account-scoped model cache', async () => {
    vi.mocked(codexStatus).mockResolvedValueOnce({
      status: 'logged_in',
      email: 'account-a@example.com',
    });
    vi.mocked(codexLogout).mockResolvedValue(undefined);
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog(['account-a-model'], true));
    const onCodexStatusChange = vi.fn();
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
      codexEmail: 'account-a@example.com',
      onCodexStatusChange,
    });

    await waitFor(() => expect(fetchModelCatalog).toHaveBeenCalledTimes(1));
    const cacheKey = modelCatalogCacheKey('openai-codex', 'account-a@example.com');
    await waitFor(() => expect(readCachedModelCatalog(cacheKey)).not.toBeNull());

    fireEvent.click(screen.getByRole('button', { name: /sign out from chatgpt codex/i }));
    await waitFor(() => expect(codexLogout).toHaveBeenCalledTimes(1));
    expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
    expect(readCachedModelCatalog(cacheKey)).toBeNull();
  });

  it('ignores a stale logged-in status response that finishes after sign-out', async () => {
    const staleStatus = deferred<{ status: 'logged_in'; email: string }>();
    vi.mocked(codexStatus).mockReturnValueOnce(staleStatus.promise);
    vi.mocked(codexLogout).mockResolvedValue(undefined);
    const onCodexStatusChange = vi.fn();
    renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
      codexEmail: 'old@example.com',
      onCodexStatusChange,
    });

    fireEvent.click(screen.getByRole('button', { name: /sign out from chatgpt codex/i }));
    await waitFor(() => {
      expect(codexLogout).toHaveBeenCalledTimes(1);
      expect(onCodexStatusChange).toHaveBeenCalledWith(false, null);
    });

    staleStatus.resolve({ status: 'logged_in', email: 'old@example.com' });
    await Promise.resolve();
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'old@example.com');
  });

  it('invalidates a status read started while logout is awaiting the server', async () => {
    vi.mocked(codexStatus).mockResolvedValueOnce({
      status: 'logged_in',
      email: 'old@example.com',
    });
    const logout = deferred<void>();
    const lateStatus = deferred<{ status: 'logged_in'; email: string }>();
    vi.mocked(codexLogout).mockReturnValueOnce(logout.promise);
    vi.mocked(codexStatus).mockReturnValueOnce(lateStatus.promise);
    const onCodexStatusChange = vi.fn();
    const view = renderSettings({
      settings: makeSettings({ provider: 'openai-codex' }),
      codexLoggedIn: true,
      codexEmail: 'old@example.com',
      onCodexStatusChange,
    });
    await waitFor(() => expect(codexStatus).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(onCodexStatusChange).toHaveBeenCalledWith(true, 'old@example.com');
    });
    onCodexStatusChange.mockClear();

    fireEvent.click(screen.getByRole('button', { name: /sign out from chatgpt codex/i }));
    await waitFor(() => expect(codexLogout).toHaveBeenCalledTimes(1));
    const inFlightStatus = coordinatedCodexStatus(() => codexStatus(view.api));
    await expect(inFlightStatus).resolves.toBeNull();
    expect(codexStatus).toHaveBeenCalledTimes(1);

    logout.resolve(undefined);
    await waitFor(() => expect(onCodexStatusChange).toHaveBeenCalledWith(false, null));
    lateStatus.resolve({ status: 'logged_in', email: 'old@example.com' });

    await expect(inFlightStatus).resolves.toBeNull();
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'old@example.com');
  });
});
