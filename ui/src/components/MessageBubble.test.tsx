/**
 * Tests for MessageBubble — attachment rendering + existing behavior.
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ChatTurn } from '../state/conversations';
import type { Attachment } from '../state/attachments';
import { MessageBubble } from './MessageBubble';

function imageAtt(name = 'pic.png'): Attachment {
  return { id: '1', kind: 'image', name, size: 10, mime: 'image/png', dataUrl: 'data:image/png;base64,AAA' };
}
function textAtt(name = 'main.py'): Attachment {
  return { id: '2', kind: 'text', name, size: 8, mime: 'text/plain', text: 'print(1)' };
}

describe('MessageBubble attachments', () => {
  it('renders an image attachment as a thumbnail with alt text', () => {
    const turn: ChatTurn = { role: 'user', content: 'what is this?', attachments: [imageAtt()] };
    const { container } = render(<MessageBubble turn={turn} />);
    const img = container.querySelector('img.gcp-att-image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('pic.png');
    expect(img.getAttribute('src')).toContain('data:image/png');
    expect(screen.getByText('what is this?')).toBeInTheDocument();
  });

  it('renders a text/code attachment as a named file chip', () => {
    const turn: ChatTurn = { role: 'user', content: 'explain', attachments: [textAtt()] };
    const { container } = render(<MessageBubble turn={turn} />);
    expect(container.querySelector('img.gcp-att-image')).toBeNull();
    expect(screen.getByText('main.py')).toBeInTheDocument();
  });

  it('skips the empty text bubble when a turn carries only attachments', () => {
    const turn: ChatTurn = { role: 'user', content: '', attachments: [imageAtt()] };
    const { container } = render(<MessageBubble turn={turn} />);
    expect(container.querySelector('.gcp-bubble')).toBeNull();
    expect(container.querySelector('img.gcp-att-image')).toBeTruthy();
  });

  it('renders nothing for a tool turn', () => {
    const turn: ChatTurn = { role: 'tool', content: '{"ok":true}', tool_call_id: 'x' };
    const { container } = render(<MessageBubble turn={turn} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows the applied-ops chip on assistant turns', () => {
    const turn: ChatTurn = { role: 'assistant', content: 'done', opsSummary: 'add_node x2 ok' };
    render(<MessageBubble turn={turn} />);
    expect(screen.getByText(/add_node x2 ok/)).toBeInTheDocument();
  });
});
