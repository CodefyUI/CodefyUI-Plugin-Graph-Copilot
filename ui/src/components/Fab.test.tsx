import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Fab } from './Fab';

describe('Fab', () => {
  it('renders a labelled button with an icon', () => {
    render(<Fab onClick={vi.fn()} />);
    const btn = screen.getByRole('button', { name: /graph copilot/i });
    expect(btn).toBeTruthy();
    expect(btn.classList.contains('gcp-fab')).toBe(true);
    expect(btn.querySelector('svg')).toBeTruthy();
  });

  it('exposes panel expansion, controlled id, and focus ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { rerender } = render(<Fab onClick={vi.fn()} expanded controls="panel-id" buttonRef={ref} />);
    const btn = screen.getByRole('button', { name: 'Graph Copilot' });
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    expect(btn).toHaveAttribute('aria-controls', 'panel-id');
    expect(ref.current).toBe(btn);
    rerender(<Fab onClick={vi.fn()} expanded={false} controls="panel-id" buttonRef={ref} />);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Fab onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: /graph copilot/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
