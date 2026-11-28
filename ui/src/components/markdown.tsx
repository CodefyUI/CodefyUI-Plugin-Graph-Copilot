/**
 * Markdown — a tiny, dependency-free renderer for assistant replies.
 *
 * Supports the subset models actually emit in chat: fenced code (including a
 * still-open fence mid-stream), inline code, bold, italic, #/##/### headings,
 * bullet & numbered lists, horizontal rules, and http(s) links. Everything is
 * built as React nodes — no dangerouslySetInnerHTML — so raw HTML in the text
 * stays inert. Images are never loaded: `![alt](url)` becomes link text,
 * because a remote image URL is a way to carry data out in its query string.
 * Links open in a new tab without an opener and show their full URL on hover. Emphasis parsing is deliberately conservative (delimiters must
 * sit on word boundaries) to avoid mangling identifiers like 2*3*4.
 */

import React from 'react';

// ---------------------------------------------------------------------------
// Inline parsing (code > link > bold > italic, recursive for nesting)
// ---------------------------------------------------------------------------

// Every capture is length-capped and every rule is searched with a moving
// start position, so a hostile text costs a linear number of regex steps:
// re-running all rules over the remaining text after each token made
// `x`![a]( repeated a few thousand times take seconds.
const CODE_RE = /`([^`\n]{1,2048})`/g;
const IMAGE_RE = /!\[([^\]\n]{0,512})\]\(([^)\s]{1,2048})\)/g;
const LINK_RE = /\[([^\]\n]{1,512})\]\(([^)\s]{1,2048})\)/g;
const SAFE_URL = /^https?:\/\//i;

function SafeLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" title={href}>{children}</a>;
}
const BOLD_RE = /\*\*([^\n]{1,2048}?)\*\*/g;
// Opening * must follow start/whitespace/'('; content must not start or end
// with whitespace or '*' (so '**bold**' is left for the bold rule).
const ITALIC_BODY = String.raw`\*([^\s*](?:[^*\n]{0,2046}?[^\s*])?)\*(?=[\s).,!?:;]|$)`;
const ITALIC_RE = new RegExp(String.raw`([\s(])` + ITALIC_BODY, 'g');
// Where the previous token ended counts as a boundary too (`code`*it*).
const ITALIC_AT = new RegExp(ITALIC_BODY, 'y');

type InlineMatch = {
  index: number;
  length: number;
  node: (key: number) => React.ReactNode;
  prefix?: string; // consumed boundary char to re-emit as text (italic)
};

type Rule = (m: RegExpExecArray) => InlineMatch;

const RULES: Array<[RegExp, Rule]> = [
  [CODE_RE, (m) => ({ index: m.index, length: m[0].length, node: (key) => <code key={key}>{m[1]}</code> })],
  [IMAGE_RE, (m) => {
    const href = m[2];
    const label = m[1].trim() || href;
    // Never an <img>: a link the user may choose to open.
    return { index: m.index, length: m[0].length, node: (key) => SAFE_URL.test(href)
      ? <SafeLink key={key} href={href}>{`[image: ${label}]`}</SafeLink> : m[0] };
  }],
  [LINK_RE, (m) => {
    const href = m[2];
    return { index: m.index, length: m[0].length, node: (key) => SAFE_URL.test(href)
      ? <SafeLink key={key} href={href}>{m[1]}</SafeLink>
      : m[0] }; // unsafe protocol -> keep the raw text inert
  }],
  [BOLD_RE, (m) => ({ index: m.index, length: m[0].length, node: (key) => <strong key={key}>{parseInline(m[1])}</strong> })],
  [ITALIC_RE, (m) => ({ index: m.index, length: m[0].length, prefix: m[1], node: (key) => <em key={key}>{parseInline(m[2])}</em> })],
];

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Per rule: its next match at or after `searchedFrom`, or null for none.
  const next: Array<{ searchedFrom: number; match: RegExpExecArray | null }> = RULES.map(() => ({ searchedFrom: -1, match: null }));
  let pos = 0;
  let key = 0;
  const italicAt = (at: number): InlineMatch | null => {
    if (text[at] !== '*') return null;
    ITALIC_AT.lastIndex = at;
    const m = ITALIC_AT.exec(text);
    return m ? { index: at, length: m[0].length, node: (k) => <em key={k}>{parseInline(m[1])}</em> } : null;
  };

  while (pos < text.length) {
    let best: InlineMatch | null = null;
    RULES.forEach(([re, build], index) => {
      const slot = next[index];
      if (slot.searchedFrom < 0 || (slot.match && slot.match.index < pos)) {
        re.lastIndex = pos;
        slot.match = re.exec(text);
        slot.searchedFrom = pos;
      }
      if (slot.match && (best === null || slot.match.index < best.index)) best = build(slot.match);
    });
    // The token boundary rule: an italic right where the last token ended.
    const at = italicAt(pos);
    if (at && (best === null || at.index <= (best as InlineMatch).index)) best = at;
    if (!best) { nodes.push(text.slice(pos)); break; }
    const found = best as InlineMatch;
    const before = text.slice(pos, found.index) + (found.prefix ?? '');
    if (before) nodes.push(before);
    nodes.push(found.node(key++));
    pos = found.index + found.length;
  }

  return nodes;
}

// ---------------------------------------------------------------------------
// Block parsing
// ---------------------------------------------------------------------------

const HEADING_RE = /^(#{1,3})\s+(.*)$/;
const HR_RE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const UL_RE = /^\s*[-*]\s+(.*)$/;
// The number is kept: a list split by a code block or a blank line must not
// restart at 1 on screen (R3).
const OL_RE = /^\s*(\d{1,9})[.)]\s+(.*)$/;

function parseBlocks(text: string, keyBase: string): React.ReactNode[] {
  const lines = text.split('\n');
  const out: React.ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[]; numbers: number[] } | null = null;
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
    const { numbers } = list;
    const start = list.ordered ? numbers[0] : 1;
    // An item gets its own value only where the source breaks the sequence.
    const items = list.items.map((item, i) => (
      <li key={i} value={list!.ordered && numbers[i] !== start + i ? numbers[i] : undefined}>{parseInline(item)}</li>
    ));
    out.push(
      list.ordered ? (
        <ol key={`${keyBase}-l${key++}`} className="gcp-md-list" start={start !== 1 ? start : undefined}>{items}</ol>
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
        list = { ordered, items: [], numbers: [] };
      }
      list.items.push(ul ? ul[1] : ol![2]);
      list.numbers.push(ol ? Number(ol[1]) : 0);
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

/** Past this size the text is shown as written, without markdown. */
export const MARKDOWN_LIMIT = 32 * 1024;

export function Markdown({ text }: { text: string }): React.ReactElement {
  if (text.length > MARKDOWN_LIMIT) return <pre className="gcp-md-plain">{text}</pre>;
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
