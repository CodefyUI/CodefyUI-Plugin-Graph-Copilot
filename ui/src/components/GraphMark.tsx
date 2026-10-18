import React from 'react';

/** The same sockets and elbow links used by the workbench's evidence rail. */
export function GraphMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M8 8h8a4 4 0 0 1 4 4v8M8 8v8a4 4 0 0 0 4 4h8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8" r="3" fill="var(--gcp-panel)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="20" r="3" fill="var(--gcp-panel)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="8" r="2.5" fill="currentColor" />
    </svg>
  );
}
