import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { CodefyUIPluginAPI } from '../types/codefyui';

// Stub ChatWindow: expose the callbacks CopilotApp wires into it so we can
// exercise the parent's handlers, and surface codex props for assertions.
vi.mock('./ChatWindow', () => ({
  ChatWindow: (props: {
    codexLoggedIn: boolean;
    codexEmail: string | null;
    settings: unknown;
    conversation: { reasoningEffort?: string };
    onNewConversation: () => void;
    onResumeConversation: (c: unknown) => void;
    onSettingsChange: (s: unknown) => void;
    onCodexStatusChange: (l: boolean, e: string | null) => void;
    onClose: () => void;
  }) => (
    <div data-testid="chatwindow">
      <span data-testid="codex-logged-in">{String(props.codexLoggedIn)}</span>
      <span data-testid="codex-email">{String(props.codexEmail)}</span>
      <span data-testid="conversation-effort">{props.conversation.reasoningEffort ?? ''}</span>
      <span data-testid="openai-reasoning-model">
        {(props.settings as {
          providerCapabilities?: { openai?: { reasoningModel?: string } };
        }).providerCapabilities?.openai?.reasoningModel ?? ''}
      </span>
      <button onClick={() => props.onNewConversation()}>cw-new</button>
      <button onClick={() => props.onResumeConversation({ id: 'resumed', messages: [] })}>cw-resume</button>
      <button onClick={() => props.onSettingsChange({ ...(props.settings as object), provider: 'anthropic' })}>cw-setsettings</button>
      <button onClick={() => props.onSettingsChange({ ...(props.settings as object), provider: 'openai-codex' })}>cw-setcodex</button>
      <button
        onClick={() => props.onSettingsChange({
          ...(props.settings as object),
          provider: 'openai',
          reasoningEfforts: { openai: 'high' },
          providerCapabilities: {
            openai: { reasoningEffort: true, reasoningModel: 'gpt-5.6-sol' },
          },
        })}
      >
        cw-seteffort
      </button>
      <button onClick={() => props.onCodexStatusChange(true, 'e@x')}>cw-codexstatus</button>
      <button onClick={() => props.onClose()}>cw-close</button>
    </div>
  ),
}));

vi.mock('../llm/client', () => ({
  codexStatus: vi.fn().mockResolvedValue({ status: 'logged_out' }),
  fetchModelCatalog: vi.fn().mockResolvedValue({
    models: [],
    capabilities: { reasoningEffort: false, richModelCatalog: false },
  }),
}));

import { CopilotApp } from './CopilotApp';
import { codexStatus, fetchModelCatalog } from '../llm/client';
import { clearModelCatalogCache } from '../llm/models';

function makeFakeApi(initial: Record<string, string> = {}): CodefyUIPluginAPI {
  const store = new Map<string, string>(Object.entries(initial));
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
    storage: {
      get: (k: string) => store.get(k) ?? null,
      set: vi.fn((k: string, v: string) => { store.set(k, v); }),
      remove: (k: string) => { store.delete(k); },
    },
  } as unknown as CodefyUIPluginAPI;
}

const codexSettings = JSON.stringify({
  provider: 'openai-codex', models: {}, apiKeys: {}, customBaseUrl: '',
});

describe('CopilotApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearModelCatalogCache();
  });

  it('shows the FAB and hides the window until opened', () => {
    render(<CopilotApp api={makeFakeApi()} />);
    expect(screen.getByRole('button', { name: /graph copilot/i })).toBeTruthy();
    expect(screen.queryByTestId('chatwindow')).toBeNull();
  });

  it('toggles the window open and closed via the FAB', () => {
    render(<CopilotApp api={makeFakeApi()} />);
    const fab = screen.getByRole('button', { name: /graph copilot/i });
    fireEvent.click(fab);
    expect(screen.getByTestId('chatwindow')).toBeTruthy();
    fireEvent.click(fab);
    expect(screen.queryByTestId('chatwindow')).toBeNull();
  });

  it('persists settings on mount', () => {
    const api = makeFakeApi();
    render(<CopilotApp api={api} />);
    expect(api.storage.set).toHaveBeenCalled();
  });

  it('does not check codex status for non-codex providers', () => {
    render(<CopilotApp api={makeFakeApi()} />);
    expect(codexStatus).not.toHaveBeenCalled();
  });

  it('recognizes an existing codex session on mount', async () => {
    vi.mocked(codexStatus).mockResolvedValueOnce({ status: 'logged_in', email: 'me@example.com' });
    render(<CopilotApp api={makeFakeApi({ settings: codexSettings })} />);
    fireEvent.click(screen.getByRole('button', { name: /graph copilot/i }));
    await waitFor(() =>
      expect(screen.getByTestId('codex-logged-in').textContent).toBe('true'),
    );
    expect(screen.getByTestId('codex-email').textContent).toBe('me@example.com');
  });

  it('clears stale login state when switching to Codex reports logged out', async () => {
    vi.mocked(codexStatus).mockResolvedValue({ status: 'logged_out' });
    render(<CopilotApp api={makeFakeApi()} />);
    fireEvent.click(screen.getByRole('button', { name: /graph copilot/i }));
    fireEvent.click(screen.getByText('cw-codexstatus'));
    await waitFor(() => {
      expect(screen.getByTestId('codex-logged-in').textContent).toBe('true');
    });

    fireEvent.click(screen.getByText('cw-setcodex'));
    await waitFor(() => {
      expect(screen.getByTestId('codex-logged-in').textContent).toBe('false');
    });
    expect(screen.getByTestId('codex-email').textContent).toBe('null');
  });

  it('wires window callbacks (new, resume, settings, codex status, close)', async () => {
    render(<CopilotApp api={makeFakeApi()} />);
    fireEvent.click(screen.getByRole('button', { name: /graph copilot/i }));

    fireEvent.click(screen.getByText('cw-new'));
    fireEvent.click(screen.getByText('cw-resume'));
    fireEvent.click(screen.getByText('cw-setsettings'));
    fireEvent.click(screen.getByText('cw-codexstatus'));
    await waitFor(() =>
      expect(screen.getByTestId('codex-logged-in').textContent).toBe('true'),
    );

    fireEvent.click(screen.getByText('cw-close'));
    expect(screen.queryByTestId('chatwindow')).toBeNull();
  });

  it('stamps the active reasoning effort on a new conversation', () => {
    render(<CopilotApp api={makeFakeApi()} />);
    fireEvent.click(screen.getByRole('button', { name: /graph copilot/i }));

    fireEvent.click(screen.getByText('cw-seteffort'));
    fireEvent.click(screen.getByText('cw-new'));

    expect(screen.getByTestId('conversation-effort').textContent).toBe('high');
  });

  it('renegotiates a saved effort on startup without opening Settings', async () => {
    vi.mocked(fetchModelCatalog).mockResolvedValueOnce({
      models: [{
        id: 'gpt-5.6-sol',
        label: 'GPT-5.6 Sol',
        reasoningEfforts: [{ effort: 'high' }],
      }],
      capabilities: { reasoningEffort: true, richModelCatalog: true },
      source: 'live',
    });
    const saved = JSON.stringify({
      provider: 'openai',
      models: { openai: 'gpt-5.6-sol' },
      apiKeys: { openai: 'sk-saved' },
      reasoningEfforts: { openai: 'high' },
      customBaseUrl: '',
    });

    render(<CopilotApp api={makeFakeApi({ settings: saved })} />);
    fireEvent.click(screen.getByRole('button', { name: /graph copilot/i }));
    await waitFor(() => {
      expect(fetchModelCatalog).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('openai-reasoning-model').textContent).toBe('gpt-5.6-sol');
    });

    fireEvent.click(screen.getByText('cw-new'));
    expect(screen.getByTestId('conversation-effort').textContent).toBe('high');
  });
});
