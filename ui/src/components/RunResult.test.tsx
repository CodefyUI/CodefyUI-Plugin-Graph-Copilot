import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RunSummary } from '../agent/types';
import { RunResult } from './RunResult';

function summary(overrides: Partial<RunSummary> = {}): RunSummary {
  return {
    id: 'run', mode: 'edit', status: 'completed', mutation: 'none', mutationAttempted: false,
    appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] }, ...overrides,
  };
}

describe('RunResult', () => {
  it.each([
    ['completed', 'Completed'], ['cancelled', 'Stopped'], ['failed', 'Failed'], ['incomplete', 'Incomplete'],
  ] as const)('announces %s once without repeating transcript content', (status, label) => {
    const { container } = render(<RunResult summary={summary({ status })} />);
    const result = screen.getByRole('status');
    expect(result).toHaveAttribute('aria-live', 'polite');
    expect(result).toHaveAttribute('aria-atomic', 'true');
    expect(result).toHaveTextContent(label);
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('shows actual operation counts and structural validation, not execution success', () => {
    const { container } = render(<RunResult summary={summary({
      mutation: 'applied', mutationAttempted: true, appliedOps: 3, failedOps: 1,
      validation: { status: 'valid', errors: [] },
    })} />);
    expect(screen.getByText(/3 operations applied/i)).toBeInTheDocument();
    expect(screen.getByText(/1 operation failed/i)).toBeInTheDocument();
    expect(screen.getByText('Structure validated')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/runnable|executed successfully|100%/i);
  });

  it.each([
    ['invalid', 'Structure has issues'], ['unavailable', 'Validation unavailable'],
    ['not_run', 'Validation not run'], ['stale', 'Validation out of date'],
  ] as const)('keeps %s validation visible and distinct', (status, label) => {
    render(<RunResult summary={summary({ status: 'incomplete', validation: { status, errors: ['bad input'] } })} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.queryByText('Structure validated')).toBeNull();
    expect(screen.getByText('bad input')).toBeInTheDocument();
  });

  it('states no graph changes when no mutation was attempted', () => {
    render(<RunResult summary={summary({ mode: 'ask' })} />);
    expect(screen.getByText('No graph changes')).toBeInTheDocument();
  });

  it('does not promise no side effects when a mutation receipt is unknown', () => {
    render(<RunResult summary={summary({ status: 'failed', mutation: 'unknown', mutationAttempted: true })} />);
    expect(screen.getByText(/changes may have been applied/i)).toBeInTheDocument();
    expect(screen.queryByText('No graph changes')).toBeNull();
  });

  it('makes stop semantics explicit when changes were already applied', () => {
    render(<RunResult summary={summary({ status: 'cancelled', mutation: 'applied', mutationAttempted: true, appliedOps: 1 })} />);
    expect(screen.getByText(/1 operation applied/i)).toBeInTheDocument();
    expect(screen.getByText(/not undone/i)).toBeInTheDocument();
    expect(screen.getByText(/host.*undo/i)).toBeInTheDocument();
  });

  it('shows counts of confirmed edits while making an unknown mutation outcome explicit', () => {
    const { container } = render(<RunResult summary={summary({ mutation: 'unknown', mutationAttempted: true, appliedOps: 2 })} />);
    expect(screen.getByText(/2 operations applied/i)).toBeInTheDocument();
    expect(screen.getByText(/changes may have been applied/i)).toBeInTheDocument();
    expect(container.textContent).not.toContain('No graph changes');
  });

  it('keeps validation diagnostics outside the terminal live announcement', () => {
    const { container } = render(<RunResult summary={summary({ validation: { status: 'invalid', errors: ['diagnostic text'] } })} />);
    expect(screen.getByRole('status')).not.toHaveTextContent('diagnostic text');
    expect(container.querySelector('details')).not.toBeNull();
    expect(screen.getByText('diagnostic text')).toBeInTheDocument();
  });

  it('separates attempted host actions from verified graph edits or execution success', () => {
    const { container } = render(<RunResult summary={summary({ sideEffectAttempted: true, hostRunId: 'run-42' })} />);
    expect(screen.getByText('Host run: run-42')).toBeInTheDocument();
    expect(screen.getByText(/host action was attempted.*before repeating/i)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/executed successfully|run succeeded|100%/i);
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull();
  });

  it('does not imply chat Stop rolls back execution or study side effects', () => {
    render(<RunResult summary={summary({ status: 'cancelled', sideEffectAttempted: true })} />);
    expect(screen.getByText(/stopping chat does not undo host execution or study changes/i)).toBeInTheDocument();
    expect(screen.queryByText(/host.*undo/i)).toBeNull();
  });

  it('bounds and escapes a host run identity', () => {
    const { container } = render(<RunResult summary={summary({ hostRunId: `<img src=x>${'x'.repeat(1000)}` })} />);
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText(/^Host run:/).textContent!.length).toBeLessThanOrEqual(170);
  });

  it('shows a plain, bounded reason/message and escapes error details', () => {
    const { container } = render(<RunResult summary={summary({
      status: 'failed', reason: 'http_error', message: '<img src=x onerror=alert(1)>',
      validation: { status: 'invalid', errors: ['<script>bad</script>', ...Array.from({ length: 25 }, (_, i) => `error ${i}`)] },
    })} />);
    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeInTheDocument();
    expect(container.querySelector('img, script')).toBeNull();
    expect(container.querySelectorAll('li').length).toBeLessThanOrEqual(10);
  });
});
