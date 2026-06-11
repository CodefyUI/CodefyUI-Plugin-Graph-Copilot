import React from 'react';
import type { ChatTurn } from '../state/conversations';

interface MessageBubbleProps {
  turn: ChatTurn;
  streaming?: boolean;
  streamingText?: string;
  error?: string | null;
  onRetry?: () => void;
  retryDisabled?: boolean;
}

/**
 * Render turn content, splitting on fenced code blocks (```...```) into
 * prose <span> and <pre> blocks. Newlines in prose are preserved via
 * white-space: pre-wrap on the bubble.
 */
function renderContent(text: string): React.ReactNode[] {
  const parts = text.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g);
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part.startsWith('```')) {
      // Strip the opening fence (with optional lang) and closing fence
      const inner = part.replace(/^```[^\n]*\n?/, '').replace(/```$/, '');
      nodes.push(<pre key={i}><code>{inner}</code></pre>);
    } else if (part) {
      nodes.push(<span key={i}>{part}</span>);
    }
  });

  return nodes;
}

export function MessageBubble({
  turn,
  streaming = false,
  streamingText,
  error = null,
  onRetry,
  retryDisabled = false,
}: MessageBubbleProps) {
  // Tool turns are not rendered as visible bubbles
  if (turn.role === 'tool') return null;

  const isUser = turn.role === 'user';
  const displayText = streaming && streamingText !== undefined ? streamingText : turn.content;

  return (
    <div className={`gcp-msg-row ${isUser ? 'user' : 'assistant'}`}>
      <div className={`gcp-bubble${error ? ' error' : ''}`}>
        {renderContent(displayText)}
        {streaming && <span className="gcp-caret" aria-hidden="true" />}
      </div>

      {/* Ops summary chip (assistant turns only) */}
      {!isUser && turn.opsSummary && (
        <div className="gcp-ops-chip">
          <span>Applied: {turn.opsSummary}</span>
        </div>
      )}

      {/* Error + retry */}
      {error && (
        <button className="gcp-retry-btn" onClick={onRetry} disabled={retryDisabled} aria-label="Retry">
          Retry
        </button>
      )}
    </div>
  );
}
