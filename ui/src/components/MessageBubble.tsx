import React from 'react';
import type { ChatTurn } from '../state/conversations';
import type { AttachmentKind } from '../state/attachments';

interface MessageBubbleProps {
  turn: ChatTurn;
  streaming?: boolean;
  streamingText?: string;
  error?: string | null;
  onRetry?: () => void;
  retryDisabled?: boolean;
}

/** Small file glyph for attachment chips (pdf vs generic text/code). */
function FileGlyph({ kind }: { kind: AttachmentKind }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      {kind === 'pdf' ? (
        <path d="M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M8 13h8M8 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
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
  const hasText = displayText.trim().length > 0;
  const attachments = turn.attachments ?? [];

  return (
    <div className={`gcp-msg-row ${isUser ? 'user' : 'assistant'}`}>
      {/* Attachments (above the text, for user turns) */}
      {attachments.length > 0 && (
        <div className="gcp-bubble-attachments">
          {attachments.map((a, idx) =>
            a.kind === 'image' && a.dataUrl ? (
              <img key={idx} className="gcp-att-image" src={a.dataUrl} alt={a.name} title={a.name} />
            ) : (
              <span key={idx} className="gcp-att-file" title={a.name}>
                <FileGlyph kind={a.kind} />
                <span className="gcp-att-file-name">{a.name}</span>
              </span>
            ),
          )}
        </div>
      )}

      {/* Text bubble — skipped when a user turn carries only attachments */}
      {(hasText || streaming) && (
        <div className={`gcp-bubble${error ? ' error' : ''}`}>
          {renderContent(displayText)}
          {streaming && <span className="gcp-caret" aria-hidden="true" />}
        </div>
      )}

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
