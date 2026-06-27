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

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Fab onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: /graph copilot/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
