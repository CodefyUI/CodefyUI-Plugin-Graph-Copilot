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
import { coordinatedCodexStatus } from '../llm/codexStatusEpoch';

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
  function rerenderSettings(next: Partial<typeof props>) {
    Object.assign(props, next);
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
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('SettingsView flows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearModelCatalogCache();
    // The mount effect calls codexStatus() for the codex provider; give it a
    // benign default so it resolves instead of returning undefined.
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_out' });
    vi.mocked(fetchModelCatalog).mockResolvedValue(catalog([]));
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
    await waitFor(() => expect(codexStatus).toHaveBeenCalledTimes(2));

    logout.resolve(undefined);
    await waitFor(() => expect(onCodexStatusChange).toHaveBeenCalledWith(false, null));
    lateStatus.resolve({ status: 'logged_in', email: 'old@example.com' });

    await expect(inFlightStatus).resolves.toBeNull();
    expect(onCodexStatusChange).not.toHaveBeenCalledWith(true, 'old@example.com');
  });
});
