/**
 * Tests for ChatView's RunReattachBanner integration (#22 — Task 11).
 *
 * 1. An 'active_run' pointer resolving to a succeeded row renders the
 *    finished-banner text inside ChatView.
 * 2. Clicking "Ask the agent to summarize" prefills the composer with the
 *    run id and never sends (prefill only).
 * 3. Without a pointer, no banner text renders.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { CodefyUIPluginAPI, SerializedGraph, NodeDefinition } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import { resetRunHistoryProbeForTests } from '../agent/runHistory';
import { writeActiveRun } from '../agent/runPointer';

vi.mock('../agent/loop', () => ({
  runTurn: vi.fn(),
}));

import { runTurn } from '../agent/loop';
import { ChatView } from './ChatView';

// ---------------------------------------------------------------------------
// Fake API — Map-backed storage (runPointer.test.ts) + URL-routed http.fetch
// (runHistory.test.ts), combined with the graph/ui surface ChatView needs
// (ChatView.test.tsx).
// ---------------------------------------------------------------------------

const FAKE_DEFS: NodeDefinition[] = [];
const FAKE_GRAPH: SerializedGraph = { nodes: [], edges: [] };

function makeApi(fetchImpl: (url: string, init?: RequestInit) => Promise<Response>): CodefyUIPluginAPI {
  const store = new Map<string, string>();
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn().mockReturnValue(FAKE_GRAPH),
      getNodeDefinitions: vi.fn().mockReturnValue(FAKE_DEFS),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn(fetchImpl) },
    storage: {
      get: (k: string) => store.get(k) ?? null,
      set: (k: string, v: string) => { store.set(k, v); },
      remove: (k: string) => { store.delete(k); },
    },
  } as unknown as CodefyUIPluginAPI;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const READY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: { openai: 'sk-test' },
  customBaseUrl: '',
};

const POINTER = { runId: 'run-1', reason: 'train it', submittedAt: 100, timeoutMinutes: 360 };

/** Raw (snake_case) run payload as the host's REST endpoints return it. */
function runPayload(overrides: Partial<{
  status: string; active: boolean; final_metrics: Record<string, number>;
}> = {}) {
  return {
    id: 'run-1', name: 'training', status: 'running', active: true,
    queue_position: null, error: null, final_metrics: {},
    created_at: '2026-08-12T00:00:00Z', started_at: '2026-08-12T00:00:00Z', finished_at: null,
    ...overrides,
  };
}

function makeConversation(): Conversation {
  return newConversation('openai', 'gpt-5.2');
}

function renderChatView(api: CodefyUIPluginAPI) {
  return render(
    <ChatView
      api={api}
      settings={READY_SETTINGS}
      codexLoggedIn={false}
      conversation={makeConversation()}
      onConversationChange={vi.fn()}
      onOpenSettings={vi.fn()}
      onOpenHistory={vi.fn()}
    />,
  );
}

/** Fetch routing for a pointer that resolves to a terminal (succeeded) row
 * on the very first fetch — no live-follow needed. */
function makeFinishedRunApi(): CodefyUIPluginAPI {
  return makeApi(async (url) => {
    if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
    if (url === '/api/runs/run-1') {
      return json(runPayload({ status: 'succeeded', active: false, final_metrics: { val_loss: 2.9536 } }));
    }
    throw new Error(`unexpected url ${url}`);
  });
}

beforeEach(() => {
  resetRunHistoryProbeForTests();
  vi.clearAllMocks();
});

describe('ChatView reattach banner integration', () => {
  it('renders the finished-run banner text when a pointer resolves to a succeeded row', async () => {
    const api = makeFinishedRunApi();
    writeActiveRun(api, POINTER);

    renderChatView(api);

    expect(await screen.findByText('Run succeeded while you were away')).toBeInTheDocument();
  });

  it('clicking "Ask the agent to summarize" prefills the composer with the run id and never sends', async () => {
    const api = makeFinishedRunApi();
    writeActiveRun(api, POINTER);

    renderChatView(api);
    await screen.findByText('Run succeeded while you were away');

    fireEvent.click(screen.getByText('Ask the agent to summarize'));

    const textarea = screen.getByRole('textbox', { name: /message input/i }) as HTMLTextAreaElement;
    expect(textarea.value).toContain('run-1');
    expect(runTurn).not.toHaveBeenCalled();
  });

  it('renders no banner text when there is no active-run pointer', () => {
    const api = makeApi(async (url) => {
      throw new Error(`unexpected url ${url}`);
    });

    renderChatView(api);

    expect(screen.queryByText(/while you were away/)).not.toBeInTheDocument();
    expect(screen.queryByText('Run in progress (reattached)')).not.toBeInTheDocument();
  });
});
