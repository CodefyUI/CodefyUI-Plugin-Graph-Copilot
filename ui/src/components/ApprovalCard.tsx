/** An approval inside the conversation, not a modal: what will happen and its
 * consequence, a verb on the main button and Cancel beside it. It scrolls
 * itself into view and puts keyboard focus on Cancel when it appears; Escape
 * cancels.
 * The decision itself is enforced by the agent loop, never by this card. */
import React, { useEffect, useId, useRef } from 'react';

export interface ApprovalCardProps {
  title: string;
  /** The main button's verb ("Run graph", "Commit 3 files"). */
  confirmLabel: string;
  cancelLabel: string;
  onDecide(approved: boolean): void;
  /** Destructive actions get the danger button. */
  danger?: boolean;
  /** False while the conversation view is hidden: then it does not take focus. */
  active?: boolean;
  /** Accessible name of the details region. */
  detailsLabel?: string;
  children: React.ReactNode;
}

export function ApprovalCard({ title, confirmLabel, cancelLabel, onDecide, danger = false, active = true, detailsLabel, children }: ApprovalCardProps) {
  const id = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const decided = useRef(false);
  const decide = (approved: boolean) => {
    if (decided.current) return;
    decided.current = true;
    onDecide(approved);
  };
  useEffect(() => {
    if (!active) return;
    const card = cardRef.current;
    if (!card) return;
    card.scrollIntoView?.({ block: 'nearest' });
    // Focus starts on the safe choice, so a stray Enter declines.
    (cancelRef.current ?? card).focus({ preventScroll: true });
  }, [active]);

  return (
    <div
      ref={cardRef}
      className={`gcp-approval${danger ? ' gcp-approval--danger' : ''}`}
      role="group"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-body`}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
          event.preventDefault();
          event.stopPropagation();
          decide(false);
        }
      }}
    >
      <div className="gcp-approval-head">
        <span className="gcp-approval-glyph" aria-hidden="true">!</span>
        <h2 id={`${id}-title`} className="gcp-approval-title">{title}</h2>
      </div>
      {/* Long details scroll inside the card, so its title and buttons stay in view. */}
      <div id={`${id}-body`} className="gcp-approval-body" role="region" aria-label={detailsLabel ?? title} tabIndex={0}>{children}</div>
      <div className="gcp-approval-actions">
        <button ref={cancelRef} type="button" className="gcp-secondary-btn" onClick={() => decide(false)}>{cancelLabel}</button>
        <button type="button" className={danger ? 'gcp-danger-btn' : 'gcp-primary-btn'} onClick={() => decide(true)}>{confirmLabel}</button>
      </div>
    </div>
  );
}
