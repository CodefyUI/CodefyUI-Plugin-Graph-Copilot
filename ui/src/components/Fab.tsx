import React from 'react';
import { GraphMark } from './GraphMark';

interface FabProps {
  onClick: () => void;
  expanded?: boolean;
  controls?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
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
      <GraphMark size={28} />
    </button>
  );
}
