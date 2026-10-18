import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConfirmDialog } from './ConfirmDialog';

function decision(onCancel = vi.fn(), active = true, busy = false) {
  return <ConfirmDialog title="Confirm this action?" onCancel={onCancel} active={active} busy={busy}
    actions={<><button data-autofocus>Keep current graph</button><button>Apply</button></>}>
    <p>Review the effect before proceeding.</p>
  </ConfirmDialog>;
}

describe('ConfirmDialog', () => {
  it('opens a native dialog with a labelled title and safe initial focus', () => {
    render(decision());
    const dialog = screen.getByRole('dialog', { name: 'Confirm this action?' });
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByRole('button', { name: 'Keep current graph' })).toHaveFocus();
    expect(screen.getByRole('region', { name: 'Confirmation details' })).toBeInTheDocument();
  });

  it('rejects native cancel exactly once without bubbling Escape to the workbench', () => {
    const onCancel = vi.fn();
    const outerKey = vi.fn();
    render(<div onKeyDown={outerKey}>{decision(onCancel)}</div>);
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(outerKey).not.toHaveBeenCalled();
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('closes and rejects when hidden, even if an asynchronous action is pending', () => {
    const onCancel = vi.fn();
    const { rerender } = render(decision(onCancel));
    const dialog = screen.getByRole('dialog');
    rerender(decision(onCancel, false, true));
    expect(dialog).not.toHaveAttribute('open');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not interpret a native close or busy Escape as approval', () => {
    const onCancel = vi.fn();
    render(decision(onCancel, true, true));
    const dialog = screen.getByRole('dialog');
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    fireEvent(dialog, new Event('close'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('closes the top-layer element during unmount without invoking an action', () => {
    const onCancel = vi.fn();
    const { unmount } = render(decision(onCancel));
    const dialog = screen.getByRole('dialog');
    unmount();
    expect(dialog).not.toHaveAttribute('open');
    expect(onCancel).not.toHaveBeenCalled();
  });
});
