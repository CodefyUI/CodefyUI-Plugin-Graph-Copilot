/** The `/` menu (acceptance 5): keyboard up/down, Enter, Esc, and the
 * combobox ARIA on the message box. A picked skill is a tag, and goes to the
 * model with the next message; the transcript shows a tag, not the body. */
import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { RunTurnOpts } from '../agent/loop';
import type { TurnResult } from '../agent/types';
import type { AgentContext } from '../agent/hostContext';
import { newConversation, type Conversation } from '../state/conversations';
import { ChatView } from './ChatView';
import { slashItems, slashQuery } from './SlashMenu';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
import { runTurn } from '../agent/loop';

const settings = { provider: 'openai' as const, models: { openai: 'test-model' }, apiKeys: { openai: 'test-only' }, customBaseUrl: '' };
const CONTEXT: AgentContext = {
  project: null, instructions: null,
  skills: [
    { id: 'builtin/build-graph', name: 'build-graph', description: 'Build or edit a graph.', source: 'builtin' },
    { id: 'builtin/run-experiments', name: 'run-experiments', description: 'Compare variants.', source: 'builtin' },
  ],
};

function setup(agentContext: AgentContext | null = CONTEXT) {
  const storage = new Map<string, string>();
  const fetch = vi.fn(async (url: string) => ({
    ok: true, status: 200,
    json: async () => ({ ...CONTEXT.skills.find((skill) => url.endsWith(skill.id)), body: `BODY OF ${url}`, files: [] }),
  }));
  const api = {
    graph: { getGraph: () => ({ nodes: [], edges: [] }), getNodeDefinitions: () => [] },
    http: { fetch },
    storage: { get: (key: string) => storage.get(key) ?? null, set: (key: string, value: string) => storage.set(key, value) },
  } as unknown as CodefyUIPluginAPI;
  const onSlashCommand = vi.fn();
  let latest: Conversation;
  function Harness() {
    const [conversation, update] = React.useState(() => newConversation('openai', 'test-model'));
    latest = conversation;
    return <ChatView api={api} settings={settings} codexLoggedIn={false} conversation={conversation}
      onConversationChange={update} onOpenSettings={vi.fn()} onOpenHistory={vi.fn()}
      agentContext={agentContext} onSlashCommand={onSlashCommand} />;
  }
  render(<Harness />);
  return { input: screen.getByRole('combobox', { name: 'Message input' }), onSlashCommand, fetch, latest: () => latest! };
}

beforeEach(() => vi.clearAllMocks());

describe('slashQuery and slashItems', () => {
  it('opens only while the whole draft is one slash word', () => {
    expect(slashQuery('/')).toBe('');
    expect(slashQuery('/Bui')).toBe('bui');
    expect(slashQuery('/build graph')).toBeNull();
    expect(slashQuery('/path/to')).toBeNull();
    expect(slashQuery('hello /x')).toBeNull();
  });

  it('lists skills before commands, prefix matches first, and hides /skills without skills', () => {
    expect(slashItems('', CONTEXT.skills).map((item) => item.label)).toEqual([
      '/build-graph', '/run-experiments', '/new', '/clear', '/skills', '/settings',
    ]);
    expect(slashItems('exp', CONTEXT.skills).map((item) => item.label)).toEqual(['/run-experiments']);
    expect(slashItems('', null).map((item) => item.label)).toEqual(['/new', '/clear', '/settings']);
  });
});

describe('the slash menu in the message box', () => {
  it('has combobox ARIA, moves with the arrow keys and closes on Escape', () => {
    const { input } = setup();
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    fireEvent.change(input, { target: { value: '/' } });
    const listbox = screen.getByRole('listbox', { name: 'Commands and skills' });
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveAttribute('aria-activedescendant', options[5].id);
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
    expect(input).toHaveValue('/');
  });

  it('Enter on a command runs it and does not send a message', () => {
    const { input, onSlashCommand } = setup();
    fireEvent.change(input, { target: { value: '/sett' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSlashCommand).toHaveBeenCalledWith('settings');
    expect(runTurn).not.toHaveBeenCalled();
    expect(input).toHaveValue('');
  });

  it('a picked skill becomes a tag and is sent with the next message, not as its text', async () => {
    let opts: RunTurnOpts | undefined;
    vi.mocked(runTurn).mockImplementation((value) => { opts = value; return new Promise<TurnResult>(() => {}); });
    const { input, latest } = setup();
    fireEvent.change(input, { target: { value: '/build' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    const tags = await screen.findByRole('list', { name: 'Skills in this conversation' });
    expect(tags).toHaveTextContent('/build-graph');
    fireEvent.change(input, { target: { value: 'Make a classifier' } });
    await act(async () => { fireEvent.keyDown(input, { key: 'Enter' }); });
    expect(opts!.skills).toEqual([{ id: 'builtin/build-graph', name: 'build-graph', body: 'BODY OF /api/skills/builtin/build-graph' }]);
    expect(opts!.userText).toBe('Make a classifier');
    const userTurn = latest().messages.find((turn) => turn.role === 'user')!;
    expect(userTurn.content).toBe('Make a classifier');
    expect(userTurn.skills?.[0].name).toBe('build-graph');
    expect(screen.getByText('Skill: build-graph')).toBeInTheDocument();
    expect(screen.queryByText(/BODY OF/)).toBeNull();
  });

  it('a skill tag can be removed before sending', async () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '/run' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.click(await screen.findByRole('button', { name: 'Remove run-experiments' }));
    await waitFor(() => expect(screen.queryByRole('list', { name: 'Skills in this conversation' })).toBeNull());
  });

  it('on a host without skills only the commands are offered', () => {
    const { input } = setup(null);
    fireEvent.change(input, { target: { value: '/' } });
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
      expect.stringContaining('/new'), expect.stringContaining('/clear'), expect.stringContaining('/settings'),
    ]);
  });

  it('Enter during IME composition does not pick', () => {
    const { input, onSlashCommand } = setup();
    fireEvent.change(input, { target: { value: '/new' } });
    fireEvent.compositionStart(input);
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 229 });
    expect(onSlashCommand).not.toHaveBeenCalled();
  });
});
