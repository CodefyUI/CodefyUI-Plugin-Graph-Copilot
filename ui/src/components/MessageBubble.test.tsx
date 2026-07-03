/**
 * Tests for MessageBubble — attachment rendering, tool stage rows, markdown.
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChatTurn } from '../state/conversations';
import type { Attachment } from '../state/attachments';
import type { ToolStage } from './turnStages';
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

// ---------------------------------------------------------------------------
// Tool stage rows
// ---------------------------------------------------------------------------

function applyStage(overrides: Partial<ToolStage> = {}): ToolStage {
  return {
    call: {
      id: 'tc1',
      name: 'apply_graph_operations',
      arguments: { operations: [{ op: 'add_node', node_type: 'Conv2d' }] },
    },
    ...overrides,
  };
}

describe('MessageBubble tool stages', () => {
  it('renders a running stage with a spinner while the result is pending', () => {
    const turn: ChatTurn = { role: 'assistant', content: 'Building…', tool_calls: [applyStage().call] };
    const { container } = render(<MessageBubble turn={turn} stages={[applyStage()]} />);
    const stage = container.querySelector('.gcp-stage');
    expect(stage).toBeTruthy();
    expect(stage!.className).toContain('running');
    expect(container.querySelector('.gcp-stage-spinner')).toBeTruthy();
    expect(screen.getByText('Edit graph')).toBeInTheDocument();
  });

  it('renders a completed stage with ok status and summary', () => {
    const stage = applyStage({
      result: {
        role: 'tool',
        tool_call_id: 'tc1',
        content: JSON.stringify({ results: [{ index: 0, ok: true }], refs: {}, node_count: 1, edge_count: 0 }),
      },
    });
    const { container } = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [stage.call] }} stages={[stage]} />,
    );
    expect(container.querySelector('.gcp-stage')!.className).toContain('ok');
    expect(screen.getByText(/add_node ×1/)).toBeInTheDocument();
  });

  it('renders a failed stage with error status', () => {
    const stage = applyStage({
      result: {
        role: 'tool',
        tool_call_id: 'tc1',
        content: JSON.stringify({ results: [{ index: 0, ok: false, error: 'bad type' }], refs: {}, node_count: 0, edge_count: 0 }),
      },
    });
    const { container } = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [stage.call] }} stages={[stage]} />,
    );
    expect(container.querySelector('.gcp-stage')!.className).toContain('error');
  });

  it('expands and collapses stage details on click', async () => {
    const stage = applyStage({
      result: {
        role: 'tool',
        tool_call_id: 'tc1',
        content: JSON.stringify({ results: [{ index: 0, ok: false, error: 'unique-detail-text' }], refs: {}, node_count: 0, edge_count: 0 }),
      },
    });
    const { container } = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [stage.call] }} stages={[stage]} />,
    );
    expect(container.querySelector('.gcp-stage-detail')).toBeNull();
    await userEvent.click(container.querySelector('.gcp-stage-head')!);
    expect(container.querySelector('.gcp-stage-detail')!.textContent).toContain('unique-detail-text');
    await userEvent.click(container.querySelector('.gcp-stage-head')!);
    expect(container.querySelector('.gcp-stage-detail')).toBeNull();
  });

  it('suppresses the legacy ops chip when stage rows are shown', () => {
    const stage = applyStage();
    render(
      <MessageBubble
        turn={{ role: 'assistant', content: '', tool_calls: [stage.call], opsSummary: 'legacy-chip-text' }}
        stages={[stage]}
      />,
    );
    expect(screen.queryByText(/legacy-chip-text/)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Markdown in assistant bubbles
// ---------------------------------------------------------------------------

describe('MessageBubble markdown', () => {
  it('renders assistant markdown (bold, lists)', () => {
    const turn: ChatTurn = { role: 'assistant', content: 'Use **Conv2d**:\n- fast\n- simple' };
    const { container } = render(<MessageBubble turn={turn} />);
    expect(container.querySelector('strong')!.textContent).toBe('Conv2d');
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('keeps user content plain (no markdown emphasis)', () => {
    const turn: ChatTurn = { role: 'user', content: 'is **this** bold?' };
    const { container } = render(<MessageBubble turn={turn} />);
    expect(container.querySelector('strong')).toBeNull();
    expect(container.textContent).toContain('**this**');
  });
});
