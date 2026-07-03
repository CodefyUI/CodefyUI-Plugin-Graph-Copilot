/**
 * ChatView — staged streaming display.
 *
 * The regression these tests pin down: during a multi-round agent run the
 * panel must show distinct stages (per-round bubbles + tool stage rows) that
 * appear as the run progresses, instead of one ever-growing text blob that
 * only splits after the run finishes.
 */
import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { newConversation } from '../state/conversations';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
vi.mock('../state/conversations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../state/conversations')>();
  return { ...actual, saveConversation: vi.fn() };
});

import { runTurn } from '../agent/loop';
import type { RunTurnOpts, TurnCallbacks } from '../agent/loop';
import { ChatView } from './ChatView';

const READY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: { openai: 'sk-test' },
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

/** Stateful wrapper mirroring CopilotApp: conversation changes flow back into
 *  the prop, exactly like the real parent. */
function Harness(props: Partial<React.ComponentProps<typeof ChatView>>) {
  const [conversation, setConversation] = React.useState(
    props.conversation ?? newConversation('openai', 'gpt-5.2'),
  );
  return (
    <ChatView
      api={props.api ?? makeFakeApi()}
      settings={props.settings ?? READY_SETTINGS}
      codexLoggedIn={false}
      conversation={conversation}
      onConversationChange={setConversation}
      onOpenSettings={props.onOpenSettings ?? vi.fn()}
      onOpenHistory={props.onOpenHistory ?? vi.fn()}
    />
  );
}

function renderChatView(over: Partial<React.ComponentProps<typeof ChatView>> = {}) {
  return render(<Harness {...over} />);
}

/** Send a message and capture the live callbacks; the run stays in flight. */
async function startRun(text = 'build it') {
  let cbs: TurnCallbacks | null = null;
  vi.mocked(runTurn).mockImplementation((opts: RunTurnOpts) => {
    cbs = opts.callbacks;
    return new Promise<void>(() => {}); // resolved manually via callbacks
  });

  const utils = renderChatView();
  const textarea = screen.getByRole('textbox', { name: /message input/i });
  await userEvent.type(textarea, text);
  fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
  await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(1));
  return { ...utils, cbs: cbs! };
}

const APPLY_CALL = {
  id: 'tc1',
  name: 'apply_graph_operations',
  arguments: { operations: [{ op: 'add_node', node_type: 'Conv2d' }] },
};

describe('ChatView staged streaming', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a thinking indicator before the first token, then the streaming bubble', async () => {
    const { container, cbs } = await startRun();

    expect(container.querySelector('.gcp-thinking')).toBeTruthy();

    act(() => cbs.onTextDelta('Hello'));
    expect(container.querySelector('.gcp-thinking')).toBeNull();
    expect(container.querySelector('.gcp-caret')).toBeTruthy();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('splits rounds into separate bubbles with live tool stage rows (not one growing blob)', async () => {
    const { container, cbs } = await startRun();

    // Round 1 streams text…
    act(() => cbs.onTextDelta('Adding the layers now.'));
    expect(container.querySelectorAll('.gcp-msg-row.assistant')).toHaveLength(1);

    // …and finalizes with a tool call: bubble commits, stage row runs.
    act(() => cbs.onTurnAppended!({ role: 'assistant', content: 'Adding the layers now.', tool_calls: [APPLY_CALL] }));
    expect(container.querySelector('.gcp-caret')).toBeNull(); // buffer reset
    expect(container.querySelector('.gcp-stage.running')).toBeTruthy();
    expect(screen.getByText('Adding the layers now.')).toBeInTheDocument();

    // Tool result lands: stage flips to ok while the run continues.
    act(() =>
      cbs.onTurnAppended!({
        role: 'tool',
        tool_call_id: 'tc1',
        content: JSON.stringify({ results: [{ index: 0, ok: true }], refs: {}, node_count: 1, edge_count: 0 }),
      }),
    );
    expect(container.querySelector('.gcp-stage.running')).toBeNull();
    expect(container.querySelector('.gcp-stage.ok')).toBeTruthy();

    // Round 2 streams into a NEW bubble; round 1's bubble is untouched.
    act(() => cbs.onTextDelta('All done!'));
    const bubbles = container.querySelectorAll('.gcp-msg-row.assistant');
    expect(bubbles).toHaveLength(2); // round-1 row (bubble + stages) + new streaming bubble
    expect(screen.getByText('Adding the layers now.')).toBeInTheDocument();
    expect(screen.getByText('All done!')).toBeInTheDocument();

    // Commit: same layout, nothing reflows or disappears.
    act(() => {
      cbs.onTurnAppended!({ role: 'assistant', content: 'All done!' });
      cbs.onTurnsCommitted([
        { role: 'assistant', content: 'Adding the layers now.', tool_calls: [APPLY_CALL], opsSummary: 'add_node x1 ok' },
        { role: 'tool', tool_call_id: 'tc1', content: JSON.stringify({ results: [{ index: 0, ok: true }], refs: {}, node_count: 1, edge_count: 0 }) },
        { role: 'assistant', content: 'All done!' },
      ]);
      cbs.onFinished();
    });
    expect(screen.getByText('Adding the layers now.')).toBeInTheDocument();
    expect(screen.getByText('All done!')).toBeInTheDocument();
    expect(container.querySelector('.gcp-stage.ok')).toBeTruthy();
    expect(container.querySelector('.gcp-caret')).toBeNull();
  });

  it('hides the thinking indicator while a tool stage is running', async () => {
    const { container, cbs } = await startRun();

    act(() => cbs.onTurnAppended!({ role: 'assistant', content: '', tool_calls: [APPLY_CALL] }));
    // No streaming text, but a stage spinner is visible — no duplicate indicator.
    expect(container.querySelector('.gcp-stage.running')).toBeTruthy();
    expect(container.querySelector('.gcp-thinking')).toBeNull();
  });

  it('shows a standalone error row whose Retry resends the same message', async () => {
    const { container, cbs } = await startRun('retry me');

    act(() => {
      cbs.onTurnsCommitted([]);
      cbs.onError('HTTP 500: upstream exploded');
      cbs.onFinished();
    });

    expect(container.querySelector('.gcp-error-row')).toBeTruthy();
    expect(screen.getByText(/upstream exploded/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(2));
    const opts = vi.mocked(runTurn).mock.calls[1][0];
    expect(opts.userText).toBe('retry me');
  });

  it('welcome suggestions send with one click', async () => {
    vi.mocked(runTurn).mockImplementation(async (opts: RunTurnOpts) => {
      opts.callbacks.onTurnsCommitted([{ role: 'assistant', content: 'ok' }]);
      opts.callbacks.onFinished();
    });
    renderChatView();

    const chip = screen.getByRole('button', { name: 'Improve my current graph' });
    await userEvent.click(chip);

    await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(1));
    expect(vi.mocked(runTurn).mock.calls[0][0].userText).toBe('Improve my current graph');
  });
});
