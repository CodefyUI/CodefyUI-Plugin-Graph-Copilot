import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { DEFAULT_SETTINGS } from '../state/settings';
import type { Conversation } from '../state/conversations';

// Stub the three child views so these tests focus on ChatWindow's own
// header + view-switching logic (each child is covered by its own suite).
vi.mock('./ChatView', () => ({
  ChatView: (props: { onOpenSettings: () => void; onOpenHistory: () => void }) => (
    <div data-testid="chatview">
      <button onClick={props.onOpenSettings}>chatview-open-settings</button>
      <button onClick={props.onOpenHistory}>chatview-open-history</button>
    </div>
  ),
}));
vi.mock('./HistoryView', () => ({
  HistoryView: (props: { onResume: (c: { id: string }) => void; onNew: () => void }) => (
    <div data-testid="historyview">
      <button onClick={() => props.onResume({ id: 'resumed' })}>history-resume</button>
      <button onClick={props.onNew}>history-new</button>
    </div>
  ),
}));
vi.mock('./SettingsView', () => ({
  SettingsView: () => <div data-testid="settingsview" />,
}));

import { ChatWindow } from './ChatWindow';

function makeConv(): Conversation {
  return {
    id: 'c1', title: '', createdAt: 0, updatedAt: 0,
    provider: 'openai', model: 'm', messages: [],
  };
}

function renderWindow(over: Partial<React.ComponentProps<typeof ChatWindow>> = {}) {
  const props: React.ComponentProps<typeof ChatWindow> = {
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

  it('toggles the history view via the History button', () => {
    renderWindow();
    const historyBtn = screen.getByRole('button', { name: /conversation history/i });
    fireEvent.click(historyBtn);
    expect(screen.getByTestId('historyview')).toBeTruthy();
    fireEvent.click(historyBtn);
    expect(screen.getByTestId('chatview')).toBeTruthy();
  });

  it('toggles the settings view via the Settings button', () => {
    renderWindow();
    const settingsBtn = screen.getByRole('button', { name: /^settings$/i });
    fireEvent.click(settingsBtn);
    expect(screen.getByTestId('settingsview')).toBeTruthy();
    fireEvent.click(settingsBtn);
    expect(screen.getByTestId('chatview')).toBeTruthy();
  });

  it('opens settings and history from ChatView callbacks', () => {
    renderWindow();
    fireEvent.click(screen.getByText('chatview-open-settings'));
    expect(screen.getByTestId('settingsview')).toBeTruthy();
    // toggle settings off (back to chat), then open history from ChatView
    fireEvent.click(screen.getByRole('button', { name: /^settings$/i }));
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

  it('calls onClose when the close button is clicked', () => {
    const props = renderWindow();
    fireEvent.click(screen.getByRole('button', { name: /close panel/i }));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
