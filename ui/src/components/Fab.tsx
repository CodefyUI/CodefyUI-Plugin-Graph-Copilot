import React from 'react';

interface FabProps {
  onClick: () => void;
  expanded?: boolean;
  controls?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

/** Chat-bubble SVG icon 22px */
function ChatBubbleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Fab({ onClick, expanded = false, controls, buttonRef }: FabProps) {
  return (
    <button
      ref={buttonRef}
      className="gcp-fab"
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-label="Graph Copilot"
      title="Graph Copilot"
    >
      <ChatBubbleIcon />
    </button>
  );
}
