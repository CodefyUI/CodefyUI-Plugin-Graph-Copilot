import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { RunTurnOpts } from '../agent/loop';
import type { TurnResult } from '../agent/types';
import { PASSIVE_DETACH_REASON } from '../agent/abortReasons';
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
    expect(screen.queryByRole('dialog', { name: /Graph Copilot agent workbench/i })).toBeNull();
    expect(fab).toHaveFocus();
  });

  it('adds a Lab comparison to the existing draft without dispatching or losing it', async () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Keep my dataset constraints.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Experiments lab' }));
    fireEvent.click(screen.getByRole('button', { name: 'Plan a comparison' }));
    const composer = screen.getByRole('textbox', { name: 'Message input' });
    expect(composer).toHaveValue('Keep my dataset constraints.\n\nCompare three learning-rate variants, maximize validation accuracy, and run each three times.');
    expect(composer).toHaveFocus();
    expect(runTurn).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    expect((composer as HTMLTextAreaElement).value.match(/Compare three/g)).toHaveLength(1);
  });

  it('preserves the draft through Settings, History and close, returning keyboard focus', async () => {
    const { input, fab } = setup();
    expect(input).toHaveFocus();
    expect(fab).toHaveAttribute('aria-expanded', 'true');
    fireEvent.change(input, { target: { value: 'Keep this draft' } });
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Settings' })));
    expect(screen.getByRole('combobox', { name: 'Select LLM provider' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    expect(screen.getByRole('textbox', { name: 'Message input' })).toHaveValue('Keep this draft');
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /Graph Copilot agent workbench/i })).toBeNull();
    expect(fab).toHaveFocus();
    fireEvent.click(fab);
    expect(input).toHaveValue('Keep this draft');
    expect(input).toHaveFocus();
  });

  it('detaches before opening History and blocks conversation switching until the browser owner settles', async () => {
    const control = controlled();
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Request' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    expect(control.opts().signal?.reason).toBe(PASSIVE_DETACH_REASON);
    expect(control.opts().cancelSignal?.aborted).toBe(false);
    const newButton = screen.getByRole('button', { name: 'Start new conversation' });
    const shellNew = screen.getByRole('button', { name: 'New conversation' });
    expect(newButton).toBeDisabled();
    expect(shellNew).toBeDisabled();
    const resume = screen.getByRole('button', { name: 'Resume conversation: Earlier conversation' });
    expect(resume).toBeDisabled();
    await act(async () => { control.settle(); });
    await waitFor(() => expect(newButton).toBeEnabled());
    expect(shellNew).toBeEnabled();
    fireEvent.click(resume);
    expect(screen.getByRole('textbox', { name: 'Message input' })).toHaveValue('');
  });

  it.each(['Close panel', 'Settings', 'Experiments lab', 'Model settings', 'Graph Copilot'])('detaches immediately when using %s', async (name) => {
    const control = controlled();
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Request' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name }));
    expect(control.opts().signal?.reason).toBe(PASSIVE_DETACH_REASON);
    expect(control.opts().cancelSignal?.aborted).toBe(false);
    await act(async () => { control.settle(); });
  });

  it.each(['Close panel', 'Settings', 'Conversation history', 'Graph Copilot'])('rejects pending run approval on passive exit through %s', async (name) => {
    const control = controlled();
    const { input, unmount } = setup();
    fireEvent.change(input, { target: { value: 'Run the graph' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    let decision!: Promise<boolean>;
    act(() => {
      decision = control.opts().callbacks.onRunApproval!({ reason: 'Train', nodeCount: 1, edgeCount: 0,
        nodeTypes: ['Trainer'], timeoutMinutes: 10, device: 'cpu' });
    });
    expect(screen.getByRole('dialog', { name: 'Run the current graph?' })).toBeVisible();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name }));
      await expect(decision).resolves.toBe(false);
    });
    expect(control.opts().signal?.reason).toBe(PASSIVE_DETACH_REASON);
    expect(control.opts().cancelSignal?.aborted).toBe(false);
    unmount();
    expect(control.opts().signal?.reason).toBe(PASSIVE_DETACH_REASON);
    expect(control.opts().cancelSignal?.aborted).toBe(false);
    await act(async () => control.settle());
  });

  it('reopen during a detached pending submit still exposes an explicit Stop signal', async () => {
    const control = controlled();
    const { input, fab } = setup();
    fireEvent.change(input, { target: { value: 'Run the graph' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.click(fab);
    fireEvent.click(fab);
    expect(screen.getByRole('textbox', { name: 'Message input' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Stop generation' }));
    expect(control.opts().signal?.reason).toBe(PASSIVE_DETACH_REASON);
    expect(control.opts().cancelSignal?.aborted).toBe(true);
    await act(async () => control.settle());
  });
});
