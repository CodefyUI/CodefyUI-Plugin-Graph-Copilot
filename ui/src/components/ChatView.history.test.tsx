/**
 * Tests for the welcome-state "Previous conversations" shortcut in ChatView.
 *
 * Render-only (no send), so no module mocks are needed — storage is seeded so
 * listConversations() reports prior chats.
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI, SerializedGraph, NodeDefinition } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import { ChatView } from './ChatView';

const FAKE_DEFS: NodeDefinition[] = [];
const FAKE_GRAPH: SerializedGraph = { nodes: [], edges: [] };

const READY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: { openai: 'sk-test' },
  customBaseUrl: '',
};

function seededApi(stored: Conversation[]): CodefyUIPluginAPI {
  const map: Record<string, string> = { conversations: JSON.stringify(stored) };
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
    http: { fetch: vi.fn() },
    storage: {
      get: vi.fn((k: string) => map[k] ?? null),
      set: vi.fn(),
      remove: vi.fn(),
    },
  } as unknown as CodefyUIPluginAPI;
}

function priorConvs(n: number): Conversation[] {
  return Array.from({ length: n }, (_, i) => ({
    ...newConversation('openai', 'gpt-5.2'),
    title: `Prior chat ${i}`,
    updatedAt: 1000 + i,
    messages: [{ role: 'user' as const, content: 'hi' }],
  }));
}

function renderWith(stored: Conversation[], onOpenHistory = vi.fn()) {
  const api = seededApi(stored);
  render(
    <ChatView
      api={api}
      settings={READY_SETTINGS}
      codexLoggedIn={false}
      conversation={newConversation('openai', 'gpt-5.2')}
      onConversationChange={vi.fn()}
      onOpenSettings={vi.fn()}
      onOpenHistory={onOpenHistory}
    />,
  );
  return { onOpenHistory };
}

describe('ChatView welcome history shortcut', () => {
  it('shows a "previous conversations" button with the count when prior chats exist', () => {
    renderWith(priorConvs(2));
    const btn = screen.getByRole('button', { name: /previous conversations/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('(2)');
  });

  it('clicking the shortcut calls onOpenHistory', async () => {
    const { onOpenHistory } = renderWith(priorConvs(1));
    await userEvent.click(screen.getByRole('button', { name: /previous conversations/i }));
    expect(onOpenHistory).toHaveBeenCalledTimes(1);
  });

  it('hides the shortcut when there are no prior conversations', () => {
    renderWith([]);
    expect(screen.queryByRole('button', { name: /previous conversations/i })).toBeNull();
  });
});
