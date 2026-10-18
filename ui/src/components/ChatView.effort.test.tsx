/**
 * ChatView — composer model/effort quick control and the live run bar.
 *
 * The effort chip lets the user adjust reasoning strength without opening
 * Settings; the run bar narrates what the agent is doing while a multi-round
 * run is in flight.
 */
import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { activeReasoningEffort } from '../state/settings';
import { newConversation } from '../state/conversations';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
vi.mock('../state/conversations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../state/conversations')>();
  return { ...actual, saveConversation: vi.fn() };
});

import { runTurn } from '../agent/loop';
import type { RunTurnOpts, TurnCallbacks } from '../agent/loop';
import type { TurnResult } from '../agent/types';
import { ChatView } from './ChatView';

const CAPABLE_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.6-sol' },
  apiKeys: { openai: 'sk-test' },
  reasoningEfforts: { openai: 'high' },
  providerCapabilities: {
    openai: { reasoningEffort: true, richModelCatalog: true, reasoningModel: 'gpt-5.6-sol' },
  },
  customBaseUrl: '',
};

function makeFakeApi(): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn().mockReturnValue({ nodes: [], edges: [] }),
      getNodeDefinitions: vi.fn().mockReturnValue([]),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: { get: vi.fn().mockReturnValue(null), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

/** Stateful wrapper mirroring CopilotApp: settings changes flow back in. */
function Harness({
  initialSettings = CAPABLE_SETTINGS,
  onSettings,
  onOpenSettings = vi.fn(),
  withSettingsChange = true,
}: {
  initialSettings?: Settings;
  onSettings?: (s: Settings) => void;
  onOpenSettings?: () => void;
  withSettingsChange?: boolean;
}) {
  const [settings, setSettings] = React.useState(initialSettings);
  const [conversation, setConversation] = React.useState(
    () => newConversation(initialSettings.provider, 'gpt-5.6-sol'),
  );
  const handleSettingsChange = (s: Settings) => {
    setSettings(s);
    onSettings?.(s);
  };
  return (
    <ChatView
      api={makeFakeApi()}
      settings={settings}
      codexLoggedIn={false}
      conversation={conversation}
      onConversationChange={setConversation}
      onSettingsChange={withSettingsChange ? handleSettingsChange : undefined}
      onOpenSettings={onOpenSettings}
      onOpenHistory={vi.fn()}
    />
  );
}

describe('ChatView effort quick control', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows the model and the selected effort in the composer chip', () => {
    render(<Harness />);
    const chip = screen.getByRole('button', { name: /model and reasoning effort/i });
    expect(chip.textContent).toContain('gpt-5.6-sol');
    expect(chip.textContent).toContain('high');
  });

  it('changes the effort from the quick menu and stamps the confirmed model', async () => {
    const captured: Settings[] = [];
    render(<Harness onSettings={(s) => captured.push(s)} />);

    await userEvent.click(screen.getByRole('button', { name: /model and reasoning effort/i }));
    await userEvent.click(screen.getByRole('menuitemradio', { name: 'max' }));

    expect(captured).toHaveLength(1);
    expect(captured[0].reasoningEfforts?.openai).toBe('max');
    expect(activeReasoningEffort(captured[0])).toBe('max');
    // Menu closed; chip reflects the new choice.
    expect(screen.queryByRole('menu')).toBeNull();
    expect(screen.getByRole('button', { name: /model and reasoning effort/i }).textContent)
      .toContain('max');
  });

  it('offers the model default and clears the explicit effort', async () => {
    const captured: Settings[] = [];
    render(<Harness onSettings={(s) => captured.push(s)} />);

    await userEvent.click(screen.getByRole('button', { name: /model and reasoning effort/i }));
    await userEvent.click(screen.getByRole('menuitemradio', { name: /model default \(medium\)/i }));

    expect(captured[0].reasoningEfforts?.openai).toBeUndefined();
    expect(activeReasoningEffort(captured[0])).toBeUndefined();
  });

  it('links to full settings for changing the model', async () => {
    const onOpenSettings = vi.fn();
    render(<Harness onOpenSettings={onOpenSettings} />);

    await userEvent.click(screen.getByRole('button', { name: /model and reasoning effort/i }));
    await userEvent.click(screen.getByRole('menuitem', { name: /change model/i }));

    expect(onOpenSettings).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('closes the menu from the backdrop and with Escape', async () => {
    render(<Harness />);
    const chip = screen.getByRole('button', { name: /model and reasoning effort/i });

    await userEvent.click(chip);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('menu')).toBeNull();

    await userEvent.click(chip);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('falls back to a plain settings chip before capability negotiation', async () => {
    const onOpenSettings = vi.fn();
    render(
      <Harness
        initialSettings={{
          provider: 'openai',
          models: { openai: 'gpt-5.6-sol' },
          apiKeys: { openai: 'sk-test' },
          customBaseUrl: '',
        }}
        onOpenSettings={onOpenSettings}
      />,
    );

    const chip = screen.getByRole('button', { name: /model settings/i });
    expect(chip.textContent).toContain('gpt-5.6-sol');
    await userEvent.click(chip);
    expect(onOpenSettings).toHaveBeenCalledTimes(1);
  });
});

describe('ChatView live run bar', () => {
  beforeEach(() => vi.clearAllMocks());

  async function startRun() {
    let cbs: TurnCallbacks | null = null;
    let resolve!: (result: TurnResult) => void;
    vi.mocked(runTurn).mockImplementation((opts: RunTurnOpts) => {
      cbs = opts.callbacks;
      return new Promise<TurnResult>((done) => { resolve = done; });
    });
    render(<Harness />);
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await userEvent.type(textarea, 'build it');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(1));
    return Object.assign(cbs!, { settle: (result: TurnResult) => resolve(result) });
  }

  it('narrates thinking, writing, and tool phases with a step counter', async () => {
    const cbs = await startRun();
    const runbar = () => screen.getByRole('status', { name: /agent activity/i });

    expect(runbar().textContent).toContain('Thinking');

    act(() => cbs.onTextDelta('Planning the build.'));
    expect(runbar().textContent).toContain('Writing reply');

    act(() =>
      cbs.onTurnAppended!({
        role: 'assistant',
        content: 'Planning the build.',
        tool_calls: [{
          id: 'tc1',
          name: 'apply_graph_operations',
          arguments: { operations: [{ op: 'add_node', node_type: 'Conv2d' }] },
        }],
      }),
    );
    expect(runbar().textContent).toContain('Edit graph');
    expect(runbar().textContent).toContain('step 1');
  });

  it('disappears when the run finishes and the hint returns', async () => {
    const cbs = await startRun();
    await act(async () => {
      cbs.onTurnsCommitted([{ role: 'assistant', content: 'done' }]);
      cbs.onFinished();
      cbs.settle({ id: 'finished', mode: 'edit', status: 'completed', mutation: 'none', mutationAttempted: false,
        appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] },
        turns: [{ role: 'assistant', content: 'done' }] });
    });
    expect(screen.queryByRole('status', { name: /agent activity/i })).toBeNull();
  });
});
