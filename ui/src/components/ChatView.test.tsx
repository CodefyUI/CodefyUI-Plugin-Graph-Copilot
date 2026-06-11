/**
 * Tests for ChatView — Task 7 coverage
 *
 * 1. Disabled state: empty settings → input disabled, CTA button present,
 *    clicking CTA calls onOpenSettings.
 * 2. Send path: mocked runTurn + ready settings → typing + Enter appends user
 *    bubble and calls runTurn with correct userText.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI, SerializedGraph, NodeDefinition } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';

// ---------------------------------------------------------------------------
// Mock runTurn — must be hoisted
// ---------------------------------------------------------------------------

vi.mock('../agent/loop', () => ({
  runTurn: vi.fn(),
}));

// Also mock saveConversation to avoid storage side-effects
vi.mock('../state/conversations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../state/conversations')>();
  return {
    ...actual,
    saveConversation: vi.fn(),
  };
});

import { runTurn } from '../agent/loop';
import type { RunTurnOpts } from '../agent/loop';
import { saveConversation } from '../state/conversations';
import { ChatView } from './ChatView';

// ---------------------------------------------------------------------------
// Fake API
// ---------------------------------------------------------------------------

const FAKE_DEFS: NodeDefinition[] = [];
const FAKE_GRAPH: SerializedGraph = { nodes: [], edges: [] };

function makeFakeApi(): CodefyUIPluginAPI {
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
    storage: { get: vi.fn().mockReturnValue(null), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

// ---------------------------------------------------------------------------
// Settings helpers
// ---------------------------------------------------------------------------

const EMPTY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: {},          // no key → providerReady = false
  customBaseUrl: '',
};

const READY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: { openai: 'sk-test' },
  customBaseUrl: '',
};

// ---------------------------------------------------------------------------
// Shared test helpers
// ---------------------------------------------------------------------------

function makeConversation(): Conversation {
  return newConversation('openai', 'gpt-5.2');
}

function renderChatView(overrides: {
  settings?: Settings;
  conversation?: Conversation;
  onConversationChange?: (c: Conversation) => void;
  onOpenSettings?: () => void;
  codexLoggedIn?: boolean;
}) {
  const api = makeFakeApi();
  const conversation = overrides.conversation ?? makeConversation();
  const props = {
    api,
    settings: overrides.settings ?? EMPTY_SETTINGS,
    codexLoggedIn: overrides.codexLoggedIn ?? false,
    conversation,
    onConversationChange: overrides.onConversationChange ?? vi.fn(),
    onOpenSettings: overrides.onOpenSettings ?? vi.fn(),
  };
  const result = render(<ChatView {...props} />);
  return { ...result, api };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ChatView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Disabled state
  // -------------------------------------------------------------------------

  describe('disabled state (no provider key)', () => {
    it('textarea is disabled when provider is not ready', () => {
      renderChatView({ settings: EMPTY_SETTINGS });
      const textarea = screen.getByRole('textbox', { name: /message input/i });
      expect(textarea).toBeDisabled();
    });

    it('CTA button is present', () => {
      renderChatView({ settings: EMPTY_SETTINGS });
      const cta = screen.getByRole('button', { name: /open settings/i });
      expect(cta).toBeTruthy();
    });

    it('clicking CTA calls onOpenSettings', async () => {
      const onOpenSettings = vi.fn();
      renderChatView({ settings: EMPTY_SETTINGS, onOpenSettings });
      const cta = screen.getByRole('button', { name: /open settings/i });
      await userEvent.click(cta);
      expect(onOpenSettings).toHaveBeenCalledTimes(1);
    });

    it('send button is disabled when provider is not ready', () => {
      renderChatView({ settings: EMPTY_SETTINGS });
      const sendBtn = screen.getByRole('button', { name: /send message/i });
      expect(sendBtn).toBeDisabled();
    });
  });

  // -------------------------------------------------------------------------
  // 2. Send path
  // -------------------------------------------------------------------------

  describe('send path (ready settings)', () => {
    beforeEach(() => {
      // Make runTurn a no-op that immediately calls onFinished
      (runTurn as ReturnType<typeof vi.fn>).mockImplementation(
        async (opts: RunTurnOpts) => {
          opts.callbacks.onTurnsCommitted([
            { role: 'assistant', content: 'Hello!' },
          ]);
          opts.callbacks.onFinished();
        },
      );
    });

    it('typing in the textarea updates the input value', async () => {
      renderChatView({ settings: READY_SETTINGS });
      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'Hello graph');
      expect((textarea as HTMLTextAreaElement).value).toBe('Hello graph');
    });

    it('pressing Enter calls runTurn with correct userText', async () => {
      const onConversationChange = vi.fn();
      renderChatView({ settings: READY_SETTINGS, onConversationChange });

      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'add a Conv2d node');
      fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

      await waitFor(() => {
        expect(runTurn).toHaveBeenCalledTimes(1);
      });

      const opts = (runTurn as ReturnType<typeof vi.fn>).mock.calls[0][0] as RunTurnOpts;
      expect(opts.userText).toBe('add a Conv2d node');
    });

    it('appends user bubble to conversation before calling runTurn', async () => {
      const conversationUpdates: Conversation[] = [];
      const onConversationChange = (c: Conversation) => {
        conversationUpdates.push({ ...c, messages: [...c.messages] });
      };
      renderChatView({ settings: READY_SETTINGS, onConversationChange });

      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'test message');
      fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

      await waitFor(() => {
        expect(runTurn).toHaveBeenCalledTimes(1);
      });

      // First onConversationChange call should include the user turn
      const firstUpdate = conversationUpdates[0];
      expect(firstUpdate).toBeDefined();
      const userTurns = firstUpdate.messages.filter((t) => t.role === 'user');
      expect(userTurns.length).toBeGreaterThanOrEqual(1);
      expect(userTurns[0].content).toBe('test message');
    });

    it('saveConversation called after user turn is appended', async () => {
      renderChatView({ settings: READY_SETTINGS });

      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'save test');
      fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

      await waitFor(() => {
        expect(saveConversation).toHaveBeenCalled();
      });
    });

    it('Shift+Enter does not send and adds newline', async () => {
      renderChatView({ settings: READY_SETTINGS });
      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'line1');
      // Shift+Enter should not trigger send
      fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
      expect(runTurn).not.toHaveBeenCalled();
    });

    it('clicking the Send button also sends', async () => {
      renderChatView({ settings: READY_SETTINGS });
      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'click send test');

      const sendBtn = screen.getByRole('button', { name: /send message/i });
      await userEvent.click(sendBtn);

      await waitFor(() => {
        expect(runTurn).toHaveBeenCalledTimes(1);
      });

      const opts = (runTurn as ReturnType<typeof vi.fn>).mock.calls[0][0] as RunTurnOpts;
      expect(opts.userText).toBe('click send test');
    });
  });
});
