import React, { useId, useLayoutEffect, useRef } from 'react';

interface ConfirmDialogProps {
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onCancel: () => void;
  active?: boolean;
  busy?: boolean;
  className?: string;
  detailsLabel?: string;
}

/** A true document-modal decision. The workbench itself remains non-modal. */
export function ConfirmDialog({ title, children, actions, onCancel, active = true, busy = false, className = '', detailsLabel = 'Confirmation details' }: ConfirmDialogProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef(onCancel);
  const declined = useRef(false);
  cancelRef.current = onCancel;

  const decline = () => {
    if (declined.current || busy) return;
    declined.current = true;
    cancelRef.current();
  };

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!active) {
      if (dialog.open) dialog.close();
      if (!declined.current) { declined.current = true; cancelRef.current(); }
      return;
    }
    declined.current = false;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => {
      dialog.close();
      // Native dialogs restore focus. Do not focus a composer hidden by navigation.
      if (previous?.isConnected && !previous.closest('[hidden], [inert]') && previous.getClientRects().length) previous.focus();
    };
  }, [active]);

  return (
    <dialog ref={dialogRef} className={`gcp-dialog ${className}`} aria-labelledby={`${id}-title`}
      onCancel={(event) => { event.preventDefault(); event.stopPropagation(); decline(); }}
      onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}>
      <header className="gcp-dialog-header"><h2 id={`${id}-title`}>{title}</h2></header>
      <div className="gcp-dialog-body" role="region" aria-label={detailsLabel} tabIndex={0}>{children}</div>
      <footer className="gcp-dialog-actions">{actions}</footer>
    </dialog>
  );
}
