import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { RunTurnOpts } from '../agent/loop';
import type { TurnResult } from '../agent/types';
import { CopilotApp } from './CopilotApp';
import { newConversation } from '../state/conversations';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
import { runTurn } from '../agent/loop';

function setup() {
  const earlier = { ...newConversation('openai', 'test-model'), title: 'Earlier conversation' };
  const store = new Map([
    ['settings', JSON.stringify({ provider: 'openai', models: { openai: 'test-model' }, apiKeys: { openai: 'test-only' }, customBaseUrl: '' })],
    ['conversations', JSON.stringify([earlier])],
  ]);
  const api = {
    graph: { getGraph: () => ({ nodes: [], edges: [] }), getNodeDefinitions: () => [] },
    storage: { get: (k: string) => store.get(k) ?? null, set: (k: string, v: string) => store.set(k, v) },
  } as unknown as CodefyUIPluginAPI;
  const utils = render(<CopilotApp api={api} />);
  const fab = screen.getByRole('button', { name: 'Graph Copilot' });
  fireEvent.click(fab);
  return { ...utils, fab, input: screen.getByRole('textbox', { name: 'Message input' }) };
}

function controlled() {
  let opts!: RunTurnOpts;
  let resolve!: (result: TurnResult) => void;
  vi.mocked(runTurn).mockImplementation((value) => {
    opts = value;
    return new Promise<TurnResult>((done) => { resolve = done; });
  });
  return {
    opts: () => opts,
    settle: () => resolve({ id: opts.runId!, mode: 'edit', status: 'cancelled', mutation: 'none', mutationAttempted: false,
      appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] }, turns: [] }),
  };
}

describe('panel navigation owns running work', () => {
  beforeEach(() => vi.resetAllMocks());

  it('focuses setup on a first open without a ready provider and handles Escape', () => {
    const api = { storage: { get: () => null, set: vi.fn() } } as unknown as CodefyUIPluginAPI;
    render(<CopilotApp api={api} />);
    const fab = screen.getByRole('button', { name: 'Graph Copilot' });
    fab.focus();
    fireEvent.click(fab);
    const setupButton = screen.getByRole('button', { name: 'Open settings to configure a provider' });
    expect(setupButton).toHaveFocus();
    fireEvent.keyDown(setupButton, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Graph Copilot' })).toBeNull();
    expect(fab).toHaveFocus();
  });

  it('preserves the draft through Settings, History and close, returning keyboard focus', () => {
    const { input, fab } = setup();
    expect(input).toHaveFocus();
    expect(fab).toHaveAttribute('aria-expanded', 'true');
    fireEvent.change(input, { target: { value: 'Keep this draft' } });
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByRole('combobox', { name: 'Select LLM provider' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByRole('textbox', { name: 'Message input' })).toHaveValue('Keep this draft');
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Graph Copilot' })).toBeNull();
    expect(fab).toHaveFocus();
    fireEvent.click(fab);
    expect(input).toHaveValue('Keep this draft');
    expect(input).toHaveFocus();
  });

  it('stops before opening History and blocks conversation switching until the run settles', async () => {
    const control = controlled();
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Request' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    expect(control.opts().signal?.aborted).toBe(true);
    const newButton = screen.getByRole('button', { name: /New conversation/i });
    expect(newButton).toBeDisabled();
    const resume = screen.getByRole('button', { name: 'Resume conversation: Earlier conversation' });
    expect(resume).toBeDisabled();
    await act(async () => { control.settle(); });
    await waitFor(() => expect(newButton).toBeEnabled());
    fireEvent.click(resume);
    expect(screen.getByRole('textbox', { name: 'Message input' })).toHaveValue('');
  });

  it.each(['Close panel', 'Settings', 'Active model — open settings', 'Graph Copilot'])('stops immediately when using %s', async (name) => {
    const control = controlled();
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Request' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name }));
    expect(control.opts().signal?.aborted).toBe(true);
    await act(async () => { control.settle(); });
  });
});
