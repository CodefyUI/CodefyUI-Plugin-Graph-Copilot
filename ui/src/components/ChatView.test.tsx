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
import type { ExperimentApprovalRequest, RunTurnOpts } from '../agent/loop';
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

const APPROVAL_REQUEST: ExperimentApprovalRequest = {
  hypothesis: 'Learning rate changes validation loss',
  variantCount: 3,
  repetitions: 2,
  executionCount: 6,
  concurrency: 1,
  applyBest: true,
  variants: [
    { label: 'Baseline', operations: [] },
    { label: 'Fast LR', operations: ['set trainer: learning_rate'] },
  ],
  nodeTypes: ['Trainer', 'Accuracy'],
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
  onOpenHistory?: () => void;
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
    onOpenHistory: overrides.onOpenHistory ?? vi.fn(),
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

    it('stamps the capability-gated reasoning effort on the conversation', async () => {
      const conversationUpdates: Conversation[] = [];
      const settings: Settings = {
        ...READY_SETTINGS,
        models: { openai: 'gpt-5.6-sol' },
        reasoningEfforts: { openai: 'high' },
        providerCapabilities: {
          openai: { reasoningEffort: true, reasoningModel: 'gpt-5.6-sol' },
        },
      };
      renderChatView({
        settings,
        onConversationChange: (conversation) => conversationUpdates.push(conversation),
      });

      await userEvent.type(screen.getByRole('textbox', { name: /message input/i }), 'reason');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(1));
      expect(conversationUpdates[0].reasoningEffort).toBe('high');
      expect(conversationUpdates[0].model).toBe('gpt-5.6-sol');
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

    it('shows explicit run details and waits for approval before graph execution', async () => {
      let decision: boolean | undefined;
      (runTurn as ReturnType<typeof vi.fn>).mockImplementation(async (opts: RunTurnOpts) => {
        decision = await opts.callbacks.onExperimentApproval!(APPROVAL_REQUEST);
        opts.callbacks.onTurnsCommitted([]);
        opts.callbacks.onFinished();
      });
      renderChatView({ settings: READY_SETTINGS });
      const textarea = screen.getByRole('textbox', { name: /message input/i });
      await userEvent.type(textarea, 'run the comparison');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));

      const dialog = await screen.findByRole('dialog', { name: /run 6 graph executions/i });
      expect(dialog).toHaveTextContent('3 variants');
      expect(dialog).toHaveTextContent('2 repetitions');
      expect(dialog).toHaveTextContent('write files');
      expect(dialog).toHaveTextContent('Fast LR');
      expect(dialog).toHaveTextContent('set trainer: learning_rate');
      expect(dialog).toHaveTextContent('Trainer, Accuracy');
      expect(decision).toBeUndefined();

      await userEvent.click(screen.getByRole('button', { name: /approve and run/i }));
      await waitFor(() => expect(decision).toBe(true));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('defaults focus to Cancel and records an explicit rejection', async () => {
      let decision: boolean | undefined;
      (runTurn as ReturnType<typeof vi.fn>).mockImplementation(async (opts: RunTurnOpts) => {
        decision = await opts.callbacks.onExperimentApproval!(APPROVAL_REQUEST);
        opts.callbacks.onTurnsCommitted([]);
        opts.callbacks.onFinished();
      });
      renderChatView({ settings: READY_SETTINGS });
      await userEvent.type(screen.getByRole('textbox', { name: /message input/i }), 'compare');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));

      await screen.findByRole('dialog');
      const cancel = screen.getByRole('button', { name: /^cancel$/i });
      expect(cancel).toHaveFocus();
      await userEvent.click(cancel);

      await waitFor(() => expect(decision).toBe(false));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('resolves a pending approval as rejected when Stop aborts the run', async () => {
      let decision: boolean | undefined;
      let aborted = false;
      (runTurn as ReturnType<typeof vi.fn>).mockImplementation(async (opts: RunTurnOpts) => {
        decision = await opts.callbacks.onExperimentApproval!(APPROVAL_REQUEST);
        aborted = opts.signal?.aborted ?? false;
        opts.callbacks.onTurnsCommitted([]);
        opts.callbacks.onFinished();
      });
      renderChatView({ settings: READY_SETTINGS });
      await userEvent.type(screen.getByRole('textbox', { name: /message input/i }), 'compare');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));

      await screen.findByRole('dialog');
      await userEvent.click(screen.getByRole('button', { name: /stop generation/i }));

      await waitFor(() => expect(decision).toBe(false));
      expect(aborted).toBe(true);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
