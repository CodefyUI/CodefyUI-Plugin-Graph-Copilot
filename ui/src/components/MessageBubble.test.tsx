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
  it('does not animate an old pending stage or mark it busy', () => {
    const stage = applyStage();
    const { container } = render(<MessageBubble turn={{ role: 'assistant', content: '' }} stages={[stage]} />);
    expect(container.querySelector('.gcp-stage-spinner')).toBeNull();
    expect(container.querySelector('.gcp-stage')).toHaveClass('interrupted');
    expect(screen.getByText(/interrupted/i)).toBeInTheDocument();
    expect(container.querySelector('.gcp-stage')).not.toHaveAttribute('aria-busy', 'true');
  });

  it('removes the live spinner when the same stage is no longer active', () => {
    const stage = applyStage();
    const turn: ChatTurn = { role: 'assistant', content: '', runId: 'run' };
    const { container, rerender } = render(<MessageBubble turn={turn} stages={[stage]} active />);
    expect(container.querySelector('.gcp-stage')).toHaveAttribute('aria-busy', 'true');
    rerender(<MessageBubble turn={turn} stages={[stage]} active={false} />);
    expect(container.querySelector('.gcp-stage-spinner')).toBeNull();
    expect(screen.getByText(/interrupted/i)).toBeInTheDocument();
  });

  it.each(['cancelled', 'not_executed', 'unknown'] as const)('does not animate a %s tool in an active run', (toolOutcome) => {
    const stage = applyStage({ result: { role: 'tool', content: '{}', toolOutcome } });
    const { container } = render(<MessageBubble turn={{ role: 'assistant', content: '' }} stages={[stage]} active />);
    expect(container.querySelector('.gcp-stage-spinner')).toBeNull();
    expect(container.querySelector('.gcp-stage')).toHaveClass(toolOutcome);
  });

  it('renders run summary without a text bubble or retry action', () => {
    const { container } = render(<MessageBubble turn={{
      role: 'assistant', content: '', runSummary: {
        id: 'run', mode: 'edit', status: 'cancelled', mutation: 'applied', mutationAttempted: true,
        appliedOps: 2, failedOps: 1, validation: { status: 'not_run', errors: [] },
      },
    }} />);
    expect(screen.getByRole('status')).toHaveTextContent('Stopped');
    expect(screen.getByText(/2 operations applied/i)).toBeInTheDocument();
    expect(screen.getByText(/not undone/i)).toBeInTheDocument();
    expect(container.querySelector('.gcp-bubble')).toBeNull();
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull();
  });

  it('does not animate pending stages after a terminal summary is stored', () => {
    const stage = applyStage();
    const { container } = render(<MessageBubble active stages={[stage]} turn={{
      role: 'assistant', content: '', runSummary: {
        id: 'run', mode: 'edit', status: 'cancelled', mutation: 'none', mutationAttempted: false,
        appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] },
      },
    }} />);
    expect(container.querySelector('.gcp-stage-spinner')).toBeNull();
  });

  it('does not show a legacy applied chip that contradicts a run result', () => {
    render(<MessageBubble turn={{
      role: 'assistant', content: '', opsSummary: 'old inferred summary', runSummary: {
        id: 'run', mode: 'edit', status: 'failed', mutation: 'unknown', mutationAttempted: true,
        appliedOps: 0, failedOps: 0, validation: { status: 'unavailable', errors: [] },
      },
    }} />);
    expect(screen.queryByText(/Applied: old inferred summary/i)).toBeNull();
    expect(screen.getByText(/changes may have been applied/i)).toBeInTheDocument();
  });

  it('renders a running stage with a spinner while the result is pending', () => {
    const turn: ChatTurn = { role: 'assistant', content: 'Building…', tool_calls: [applyStage().call] };
    const { container } = render(<MessageBubble turn={turn} stages={[applyStage()]} active />);
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

  it('rejects protocol-relative media and honors local execution outcomes before rendering clips', () => {
    const call = { id: 'run', name: 'run_graph', arguments: {} };
    const content = JSON.stringify({ status: 'complete', media: [
      { kind: 'video', url: '//evil.example/clip.mp4' },
      { kind: 'video', url: '/api/media/valid.mp4' },
    ] });
    const { container, rerender } = render(<MessageBubble turn={{ role: 'assistant', content: '' }}
      stages={[{ call, result: { role: 'tool', content, toolOutcome: 'unknown' } }]} active step={1} />);
    expect(container.querySelector('.gcp-stage-clip')).toBeNull();
    expect(container.querySelector('.gcp-stage-spinner')).toBeNull();
    rerender(<MessageBubble turn={{ role: 'assistant', content: '' }}
      stages={[{ call, result: { role: 'tool', content, toolOutcome: 'completed' } }]} step={1} />);
    expect(container.querySelectorAll('.gcp-stage-clip')).toHaveLength(1);
    expect(container.querySelector('.gcp-stage-clip')).toHaveAttribute('src', '/api/media/valid.mp4');
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('plays run-produced clips inline without expanding (#310)', () => {
    const call = { id: 'tc-run', name: 'run_graph', arguments: { reason: 'r' } };
    const stage = {
      call,
      result: {
        role: 'tool' as const,
        tool_call_id: 'tc-run',
        content: JSON.stringify({
          status: 'complete', completedNodes: 3, totalNodes: 3, duration_s: 40,
          media: [
            { node: 'VideoWrite', kind: 'video', format: 'mp4', url: '/api/media/rollout.mp4' },
            { node: 'Evil', kind: 'video', format: 'mp4', url: 'https://evil.example/x.mp4' },
          ],
        }),
      },
    };
    const { container } = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [call] }} stages={[stage]} />,
    );
    const clips = container.querySelectorAll('.gcp-stage-clip');
    expect(clips).toHaveLength(1);
    expect(clips[0].tagName).toBe('VIDEO');
    expect(clips[0].getAttribute('src')).toBe('/api/media/rollout.mp4');
    // a gif reference renders as an animated <img>, not a <video>
    const gifStage = {
      call: { id: 'tc-g', name: 'run_graph', arguments: {} },
      result: {
        role: 'tool' as const,
        tool_call_id: 'tc-g',
        content: JSON.stringify({
          status: 'complete',
          media: [{ kind: 'video', format: 'gif', url: '/api/media/demo.gif' }],
        }),
      },
    };
    const second = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [gifStage.call] }} stages={[gifStage]} />,
    );
    const gif = second.container.querySelector('.gcp-stage-clip');
    expect(gif!.tagName).toBe('IMG');
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

  it('labels a tool-calling round with its step number', () => {
    const stage = applyStage();
    const { container } = render(
      <MessageBubble
        turn={{ role: 'assistant', content: 'wiring', tool_calls: [stage.call] }}
        stages={[stage]}
        step={2}
      />,
    );
    expect(container.querySelector('.gcp-step-tag')!.textContent).toContain('Step 2');
  });

  it('never shows a step tag on plain replies or user turns', () => {
    const plain = render(<MessageBubble turn={{ role: 'assistant', content: 'done' }} step={3} />);
    expect(plain.container.querySelector('.gcp-step-tag')).toBeNull();
    const user = render(<MessageBubble turn={{ role: 'user', content: 'hi' }} step={1} />);
    expect(user.container.querySelector('.gcp-step-tag')).toBeNull();
  });

  it('shows the tool execution duration on completed stages', () => {
    const stage = applyStage({
      result: {
        role: 'tool',
        tool_call_id: 'tc1',
        content: JSON.stringify({ results: [{ index: 0, ok: true }], refs: {}, node_count: 1, edge_count: 0 }),
        durationMs: 1_400,
      },
    });
    const { container } = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [stage.call] }} stages={[stage]} />,
    );
    expect(container.querySelector('.gcp-stage-time')!.textContent).toBe('1.4s');
  });

  it('omits the duration for legacy results without one', () => {
    const stage = applyStage({
      result: { role: 'tool', tool_call_id: 'tc1', content: '{"results":[]}' },
    });
    const { container } = render(
      <MessageBubble turn={{ role: 'assistant', content: '', tool_calls: [stage.call] }} stages={[stage]} />,
    );
    expect(container.querySelector('.gcp-stage-time')).toBeNull();
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
