/**
 * Markdown — a tiny, dependency-free renderer for assistant replies.
 *
 * Supports the subset models actually emit in chat: fenced code (including a
 * still-open fence mid-stream), inline code, bold, italic, #/##/### headings,
 * bullet & numbered lists, horizontal rules, and http(s) links. Everything is
 * built as React nodes — no dangerouslySetInnerHTML — so raw HTML in the text
 * stays inert. Emphasis parsing is deliberately conservative (delimiters must
 * sit on word boundaries) to avoid mangling identifiers like 2*3*4.
 */

import React from 'react';

// ---------------------------------------------------------------------------
// Inline parsing (code > link > bold > italic, recursive for nesting)
// ---------------------------------------------------------------------------

const CODE_RE = /`([^`\n]+)`/;
const LINK_RE = /\[([^\]\n]+)\]\(([^)\s]+)\)/;
const BOLD_RE = /\*\*([^\n]+?)\*\*/;
// Opening * must follow start/whitespace/'('; content must not start or end
// with whitespace or '*' (so '**bold**' is left for the bold rule).
const ITALIC_RE = /(^|[\s(])\*([^\s*](?:[^*\n]*?[^\s*])?)\*(?=[\s).,!?:;]|$)/;

type InlineMatch = {
  index: number;
  length: number;
  node: (key: number) => React.ReactNode;
  prefix?: string; // consumed boundary char to re-emit as text (italic)
};

function findInline(text: string): InlineMatch | null {
  let best: InlineMatch | null = null;

  const consider = (m: InlineMatch | null) => {
    if (m && (best === null || m.index < best.index)) best = m;
  };

  const code = CODE_RE.exec(text);
  if (code) {
    consider({
      index: code.index,
      length: code[0].length,
      node: (key) => <code key={key}>{code[1]}</code>,
    });
  }

  const link = LINK_RE.exec(text);
  if (link) {
    const href = link[2];
    consider({
      index: link.index,
      length: link[0].length,
      node: (key) =>
        /^https?:\/\//i.test(href) ? (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {link[1]}
          </a>
        ) : (
          link[0] // unsafe protocol -> keep the raw text inert
        ),
    });
  }

  const bold = BOLD_RE.exec(text);
  if (bold) {
    consider({
      index: bold.index,
      length: bold[0].length,
      node: (key) => <strong key={key}>{parseInline(bold[1])}</strong>,
    });
  }

  const italic = ITALIC_RE.exec(text);
  if (italic) {
    consider({
      index: italic.index,
      length: italic[0].length,
      prefix: italic[1],
      node: (key) => <em key={key}>{parseInline(italic[2])}</em>,
    });
  }

  return best;
}

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const m = findInline(rest);
    if (!m) {
      nodes.push(rest);
      break;
    }
    const before = rest.slice(0, m.index) + (m.prefix ?? '');
    if (before) nodes.push(before);
    nodes.push(m.node(key++));
    rest = rest.slice(m.index + m.length);
  }

  return nodes;
}

// ---------------------------------------------------------------------------
// Block parsing
// ---------------------------------------------------------------------------

const HEADING_RE = /^(#{1,3})\s+(.*)$/;
const HR_RE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const UL_RE = /^\s*[-*]\s+(.*)$/;
const OL_RE = /^\s*\d+[.)]\s+(.*)$/;

function parseBlocks(text: string, keyBase: string): React.ReactNode[] {
  const lines = text.split('\n');
  const out: React.ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    out.push(
      <p key={`${keyBase}-p${key++}`} className="gcp-md-p">
        {parseInline(para.join('\n'))}
      </p>,
    );
    para = [];
  };

  const flushList = () => {
    if (!list) return;
    const items = list.items.map((item, i) => <li key={i}>{parseInline(item)}</li>);
    out.push(
      list.ordered ? (
        <ol key={`${keyBase}-l${key++}`} className="gcp-md-list">{items}</ol>
      ) : (
        <ul key={`${keyBase}-l${key++}`} className="gcp-md-list">{items}</ul>
      ),
    );
    list = null;
  };

  for (const line of lines) {
    const heading = HEADING_RE.exec(line);
    if (heading) {
      flushPara();
      flushList();
      out.push(
        <div key={`${keyBase}-h${key++}`} className={`gcp-md-h${heading[1].length}`}>
          {parseInline(heading[2])}
        </div>,
      );
      continue;
    }

    if (HR_RE.test(line)) {
      flushPara();
      flushList();
      out.push(<hr key={`${keyBase}-r${key++}`} className="gcp-md-hr" />);
      continue;
    }

    const ul = UL_RE.exec(line);
    const ol = ul ? null : OL_RE.exec(line);
    if (ul || ol) {
      flushPara();
      const ordered = !!ol;
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((ul ?? ol)![1]);
      continue;
    }

    if (line.trim() === '') {
      flushPara();
      flushList();
      continue;
    }

    flushList();
    para.push(line);
  }

  flushPara();
  flushList();
  return out;
}

// ---------------------------------------------------------------------------
// Fenced code splitting (tolerates an unclosed fence while streaming)
// ---------------------------------------------------------------------------

const FENCE_RE = /```[^\n]*\n?([\s\S]*?)(?:```|$)/g;

export function Markdown({ text }: { text: string }): React.ReactElement {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;

  FENCE_RE.lastIndex = 0;
  for (let m = FENCE_RE.exec(text); m !== null; m = FENCE_RE.exec(text)) {
    if (m.index > last) {
      nodes.push(...parseBlocks(text.slice(last, m.index), `s${key++}`));
    }
    nodes.push(
      <pre key={`c${key++}`}>
        <code>{m[1]}</code>
      </pre>,
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) break; // safety: never loop on a zero-length match
  }
  if (last < text.length) {
    nodes.push(...parseBlocks(text.slice(last), `s${key++}`));
  }

  return <>{nodes}</>;
}
