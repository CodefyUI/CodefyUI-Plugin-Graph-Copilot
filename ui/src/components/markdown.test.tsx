/**
 * Tests for the lightweight markdown renderer used in assistant bubbles.
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Markdown } from './markdown';

function html(text: string): string {
  const { container } = render(<Markdown text={text} />);
  return container.innerHTML;
}

describe('Markdown', () => {
  it('renders plain text with newlines preserved', () => {
    const { container } = render(<Markdown text={'line one\nline two'} />);
    expect(container.textContent).toContain('line one\nline two');
  });

  it('renders fenced code blocks as <pre><code>', () => {
    const { container } = render(<Markdown text={'before\n```py\nprint(1)\n```\nafter'} />);
    const pre = container.querySelector('pre code');
    expect(pre).toBeTruthy();
    expect(pre!.textContent).toBe('print(1)\n');
    expect(container.textContent).toContain('before');
    expect(container.textContent).toContain('after');
  });

  it('renders an UNCLOSED fence as a code block while streaming', () => {
    const { container } = render(<Markdown text={'start\n```\npartial code'} />);
    const pre = container.querySelector('pre code');
    expect(pre).toBeTruthy();
    expect(pre!.textContent).toContain('partial code');
  });

  it('renders inline code, bold, and italic', () => {
    const { container } = render(<Markdown text={'use `foo()` with **bold** and *ital*'} />);
    expect(container.querySelector('code')!.textContent).toBe('foo()');
    expect(container.querySelector('strong')!.textContent).toBe('bold');
    expect(container.querySelector('em')!.textContent).toBe('ital');
  });

  it('renders headings (h1–h3) as styled blocks', () => {
    const { container } = render(<Markdown text={'# Title\n## Sub\n### Deep\nbody'} />);
    expect(container.querySelector('.gcp-md-h1')!.textContent).toBe('Title');
    expect(container.querySelector('.gcp-md-h2')!.textContent).toBe('Sub');
    expect(container.querySelector('.gcp-md-h3')!.textContent).toBe('Deep');
  });

  it('renders unordered and ordered lists', () => {
    const { container } = render(<Markdown text={'- one\n- two\n\n1. first\n2. second'} />);
    const ul = container.querySelector('ul');
    expect(ul).toBeTruthy();
    expect(ul!.querySelectorAll('li')).toHaveLength(2);
    const ol = container.querySelector('ol');
    expect(ol).toBeTruthy();
    expect(ol!.querySelectorAll('li')[1].textContent).toBe('second');
  });

  it('renders bold inside list items', () => {
    const { container } = render(<Markdown text={'- **Conv2d** layer'} />);
    expect(container.querySelector('li strong')!.textContent).toBe('Conv2d');
  });

  it('renders http(s) links with safe attributes', () => {
    render(<Markdown text={'see [docs](https://example.com/a)'} />);
    const a = screen.getByRole('link', { name: 'docs' }) as HTMLAnchorElement;
    expect(a.getAttribute('href')).toBe('https://example.com/a');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toContain('noopener');
  });

  it('refuses javascript: links (renders as plain text)', () => {
    const { container } = render(<Markdown text={'x [evil](javascript:alert(1)) y'} />);
    expect(container.querySelector('a')).toBeNull();
    expect(container.textContent).toContain('evil');
  });

  it('never injects raw HTML', () => {
    expect(html('<img src=x onerror=alert(1)>')).not.toContain('<img');
  });

  it('renders horizontal rules', () => {
    const { container } = render(<Markdown text={'a\n\n---\n\nb'} />);
    expect(container.querySelector('hr')).toBeTruthy();
  });

  it('does not treat mid-word asterisks or lone stars as emphasis', () => {
    const { container } = render(<Markdown text={'a * b and 2*3*4'} />);
    expect(container.querySelector('em')).toBeNull();
  });
});
