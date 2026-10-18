import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, fireEvent } from '@testing-library/react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { DEFAULT_SETTINGS } from '../state/settings';
import type { Conversation } from '../state/conversations';

// Stub child views so these tests focus on ChatWindow's workbench and lifecycle.
// Each child is covered by its own suite.
const chatViewCalls = vi.hoisted(() => vi.fn());
const detachRun = vi.hoisted(() => vi.fn());
vi.mock('./ChatView', () => ({
  ChatView: (props: {
    onOpenSettings: () => void;
    onOpenHistory: () => void;
    onSettingsChange: (s: Settings) => void;
    onDetachReady: (detach: () => void) => void;
    onBusyChange: (busy: boolean) => void;
    graphContext: { nodes: number; edges: number; available: boolean };
    active: boolean;
  }) => {
    chatViewCalls(props);
    React.useLayoutEffect(() => { props.onDetachReady(detachRun); }, [props.onDetachReady]);
    return (
      <div data-testid="chatview" data-active={props.active}>
        <button onClick={props.onOpenSettings}>chatview-open-settings</button>
        <button onClick={props.onOpenHistory}>chatview-open-history</button>
        <button onClick={() => props.onBusyChange(true)}>chatview-start-run</button>
        <button onClick={() => props.onBusyChange(false)}>chatview-settle-run</button>
      </div>
    );
  },
}));
vi.mock('./HistoryView', () => ({
  HistoryView: (props: { onResume: (c: { id: string }) => void; onNew: () => void; disabled: boolean }) => (
    <div data-testid="historyview">
      <button disabled={props.disabled} onClick={() => props.onResume({ id: 'resumed' })}>history-resume</button>
      <button disabled={props.disabled} onClick={props.onNew}>history-new</button>
    </div>
  ),
}));
vi.mock('./SettingsView', () => ({
  SettingsView: () => <div data-testid="settingsview" />,
}));
vi.mock('./ExperimentsView', () => ({
  ExperimentsView: () => <div data-testid="experimentsview" />,
}));

import { ChatWindow } from './ChatWindow';

function makeConv(): Conversation {
  return {
    id: 'c1', title: '', createdAt: 0, updatedAt: 0,
    provider: 'openai', model: 'm', messages: [],
  };
}

function renderWindowProps(
  over: Partial<React.ComponentProps<typeof ChatWindow>> = {},
): React.ComponentProps<typeof ChatWindow> {
  return {
    api: {} as CodefyUIPluginAPI,
    settings: DEFAULT_SETTINGS as Settings,
    codexLoggedIn: false,
    codexEmail: null,
    conversation: makeConv(),
    onConversationChange: vi.fn(),
    onSettingsChange: vi.fn(),
    onCodexStatusChange: vi.fn(),
    onNewConversation: vi.fn(),
    onResumeConversation: vi.fn(),
    onClose: vi.fn(),
    ...over,
  };
}

function renderWindow(over: Partial<React.ComponentProps<typeof ChatWindow>> = {}) {
  const props = renderWindowProps(over);
  render(<ChatWindow {...props} />);
  return props;
}

describe('ChatWindow', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows the chat view by default', () => {
    renderWindow();
    expect(screen.getByTestId('chatview')).toBeTruthy();
    expect(screen.queryByTestId('historyview')).toBeNull();
    expect(screen.queryByTestId('settingsview')).toBeNull();
  });

  it('navigates to History and returns to chat through Agent chat', () => {
    renderWindow();
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    expect(screen.getByTestId('historyview')).toBeVisible();
    expect(screen.getByTestId('chatview')).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    expect(screen.getByTestId('chatview')).toBeVisible();
    expect(screen.queryByTestId('historyview')).toBeNull();
  });

  it('navigates to Settings and returns to chat through Agent chat', () => {
    renderWindow();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByTestId('settingsview')).toBeVisible();
    expect(screen.getByTestId('chatview')).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    expect(screen.getByTestId('chatview')).toBeVisible();
    expect(screen.queryByTestId('settingsview')).toBeNull();
  });

  it.each([
    ['Settings', 'settingsview'],
    ['Conversation history', 'historyview'],
    ['Experiments lab', 'experimentsview'],
  ])('keeps selected navigation %s idempotent without remounting its content', (name, testId) => {
    renderWindow();
    const nav = screen.getByRole('button', { name });
    fireEvent.click(nav);
    const content = screen.getByTestId(testId);
    expect(content).toBeVisible();
    expect(nav).toHaveAttribute('aria-current', 'page');
    fireEvent.click(nav);
    expect(screen.getByTestId(testId)).toBe(content);
    expect(content).toBeVisible();
    expect(nav).toHaveAttribute('aria-current', 'page');
    expect(screen.getByTestId('chatview')).not.toBeVisible();
  });

  it('opens the experiment lab from the primary navigation', () => {
    renderWindow();
    fireEvent.click(screen.getByRole('button', { name: /experiments lab/i }));
    expect(screen.getByTestId('experimentsview')).toBeTruthy();
    expect(screen.getByTestId('chatview')).not.toBeVisible();
    expect(screen.getByTestId('chatview')).toHaveAttribute('data-active', 'false');
  });

  it('switches between compact and expanded panel modes', () => {
    renderWindow();
    const dialog = screen.getByRole('dialog', { name: /agent workbench/i });
    expect(dialog.getAttribute('data-panel-mode')).toBe('compact');

    fireEvent.click(screen.getByRole('button', { name: /expand panel/i }));
    expect(dialog.getAttribute('data-panel-mode')).toBe('expanded');

    fireEvent.click(screen.getByRole('button', { name: /use compact panel/i }));
    expect(dialog.getAttribute('data-panel-mode')).toBe('compact');
  });

  it('passes the current graph context into ChatView and subscribes to host changes', () => {
    const unsubscribe = vi.fn();
    const onGraphChanged = vi.fn().mockReturnValue(unsubscribe);
    const api = {
      apiVersion: 2,
      graph: {
        getGraph: vi.fn().mockReturnValue({
          nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
          edges: [{ id: 'e1' }, { id: 'e2' }],
        }),
        onGraphChanged,
      },
    } as unknown as CodefyUIPluginAPI;

    const { unmount } = render(<ChatWindow {...renderWindowProps({ api })} />);
    expect(chatViewCalls.mock.calls.at(-1)![0].graphContext).toEqual({ nodes: 3, edges: 2, available: true });
    expect(onGraphChanged).toHaveBeenCalledTimes(1);

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('refreshes current graph counts from host changes and clears unavailable data', () => {
    const getGraph = vi.fn().mockReturnValue({ nodes: [{ id: '1' }], edges: [] });
    const onGraphChanged = vi.fn().mockReturnValue(vi.fn());
    const api = { apiVersion: 1, graph: { getGraph, onGraphChanged } } as unknown as CodefyUIPluginAPI;
    renderWindow({ api });
    const context = () => chatViewCalls.mock.calls.at(-1)![0].graphContext;
    const refresh = onGraphChanged.mock.calls[0][0] as () => void;
    expect(context()).toEqual({ nodes: 1, edges: 0, available: true });

    getGraph.mockReturnValue({ nodes: [{ id: '1' }, { id: '2' }], edges: [{ id: 'edge' }] });
    act(() => refresh());
    expect(context()).toEqual({ nodes: 2, edges: 1, available: true });

    getGraph.mockImplementation(() => { throw new Error('graph unavailable'); });
    act(() => refresh());
    expect(context()).toEqual({ nodes: 0, edges: 0, available: false });
  });

  it('keeps navigation usable without optional graph APIs or a readable version', () => {
    const api = {
      graph: { getGraph: () => ({ nodes: null, edges: null }), onGraphChanged: () => { throw new Error('listener unavailable'); } },
    } as unknown as CodefyUIPluginAPI;
    renderWindow({ api });
    expect(chatViewCalls.mock.calls.at(-1)![0].graphContext).toEqual({ nodes: 0, edges: 0, available: true });
    fireEvent.click(screen.getByRole('button', { name: 'Experiments lab' }));
    expect(screen.getByTestId('experimentsview')).toBeVisible();
  });

  it('opens settings and history from ChatView callbacks', () => {
    renderWindow();
    fireEvent.click(screen.getByText('chatview-open-settings'));
    expect(screen.getByTestId('settingsview')).toBeTruthy();
    // Return through Chat before invoking the composer's History callback.
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    fireEvent.click(screen.getByText('chatview-open-history'));
    expect(screen.getByTestId('historyview')).toBeTruthy();
  });

  it('resume from history calls onResumeConversation and returns to chat', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByRole('button', { name: /conversation history/i }));
    fireEvent.click(screen.getByText('history-resume'));
    expect(props.onResumeConversation).toHaveBeenCalledWith({ id: 'resumed' });
    expect(screen.getByTestId('chatview')).toBeTruthy();
  });

  it('new from history calls onNewConversation and returns to chat', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByRole('button', { name: /conversation history/i }));
    fireEvent.click(screen.getByText('history-new'));
    expect(props.onNewConversation).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('chatview')).toBeTruthy();
  });

  it('starts a conversation from the shell action and returns to chat', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    fireEvent.click(screen.getByRole('button', { name: 'New conversation' }));
    expect(props.onNewConversation).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('chatview')).toBeVisible();
    expect(screen.queryByTestId('settingsview')).toBeNull();
  });

  it('blocks the shell New conversation action until the browser owner settles', () => {
    const props = renderWindow();
    const newButton = screen.getByRole('button', { name: 'New conversation' }) as HTMLButtonElement;
    fireEvent.click(screen.getByText('chatview-start-run'));
    expect(newButton).toBeDisabled();
    fireEvent.click(newButton);
    expect(props.onNewConversation).not.toHaveBeenCalled();
    // Retain a callback-level guard, not only the native disabled attribute.
    newButton.disabled = false;
    fireEvent.click(newButton);
    expect(props.onNewConversation).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    fireEvent.click(screen.getByText('chatview-settle-run'));
    expect(newButton).toBeEnabled();
    fireEvent.click(newButton);
    expect(props.onNewConversation).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('chatview')).toBeVisible();
    expect(screen.queryByTestId('historyview')).toBeNull();
  });

  it('forwards effort settings changes and passive detach registration', () => {
    const props = renderWindow({ onDetachReady: vi.fn() });
    const chatProps = chatViewCalls.mock.calls.at(-1)![0];
    expect(chatProps.onSettingsChange).toBe(props.onSettingsChange);
    expect(chatProps.active).toBe(true);
    expect(props.onDetachReady).toHaveBeenCalledWith(detachRun);
  });

  it.each(['Settings', 'Conversation history', 'Experiments lab', 'chatview-open-settings', 'Close panel'])
    ('synchronously detaches work when leaving chat using %s', (name) => {
      renderWindow();
      fireEvent.click(screen.getByRole('button', { name }));
      expect(detachRun).toHaveBeenCalledTimes(1);
    });

  it('blocks History mutations until the detached browser owner settles', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByText('chatview-start-run'));
    fireEvent.click(screen.getByRole('button', { name: 'Conversation history' }));
    expect(screen.getByText('history-resume')).toBeDisabled();
    expect(screen.getByText('history-new')).toBeDisabled();
    fireEvent.click(screen.getByText('history-new'));
    expect(props.onNewConversation).not.toHaveBeenCalled();

    // Guard callbacks themselves, not just native disabled controls.
    const newButton = screen.getByText('history-new') as HTMLButtonElement;
    const resumeButton = screen.getByText('history-resume') as HTMLButtonElement;
    newButton.disabled = false;
    resumeButton.disabled = false;
    fireEvent.click(newButton);
    fireEvent.click(resumeButton);
    expect(props.onNewConversation).not.toHaveBeenCalled();
    expect(props.onResumeConversation).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('chatview-settle-run'));
    expect(screen.getByText('history-new')).toBeEnabled();
    fireEvent.click(screen.getByText('history-new'));
    expect(props.onNewConversation).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('chatview')).toBeVisible();
  });

  it('keeps ChatView mounted while hidden and unmounts inactive secondary views', () => {
    const props = renderWindowProps({ panelId: 'workbench-panel' });
    const { rerender } = render(<ChatWindow {...props} />);
    const chat = screen.getByTestId('chatview');
    expect(screen.getByRole('dialog')).toHaveAttribute('id', 'workbench-panel');
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    expect(chat).not.toBeVisible();
    expect(screen.getByTestId('settingsview')).toBeVisible();

    rerender(<ChatWindow {...props} open={false} />);
    expect(chat).toBeInTheDocument();
    expect(screen.queryByTestId('settingsview')).toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(<ChatWindow {...props} open />);
    fireEvent.click(screen.getByRole('button', { name: 'Agent chat' }));
    expect(screen.getByTestId('chatview')).toBe(chat);
    expect(chat).toBeVisible();
  });

  it('focuses secondary content, handles Escape, and ignores composing Escape', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByRole('button', { name: 'Experiments lab' }));
    const content = screen.getByRole('main');
    expect(content).toHaveFocus();
    detachRun.mockClear();
    fireEvent.keyDown(content, { key: 'Escape', isComposing: true });
    expect(props.onClose).not.toHaveBeenCalled();
    fireEvent.keyDown(content, { key: 'Escape' });
    expect(detachRun).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is clicked', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByRole('button', { name: /close panel/i }));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
