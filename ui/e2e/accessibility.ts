import type { Locator, Page } from '@playwright/test';
import { expect } from './fixtures';

type Color = [number, number, number, number];

/** Read actual visible control colors, compositing translucent surfaces through
 * their ancestors. These focused probes are not a claim of a whole-page audit. */
async function colors(locator: Locator) {
  await expect(locator).toBeVisible();
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeInViewport({ ratio: 1 });
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    // Canvas normalizes Chromium's computed color(srgb ...)/color-mix output
    // into the same rgba representation without changing the rendered control.
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d')!;
    const normalize = (value: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
      return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    };
    const backgrounds: string[] = [];
    for (let node: Element | null = element; node; node = node.parentElement) backgrounds.push(normalize(getComputedStyle(node).backgroundColor));
    return {
      foreground: normalize(style.color), backgrounds: backgrounds.reverse(),
      outlineColor: normalize(style.outlineColor), outlineStyle: style.outlineStyle, outlineWidth: parseFloat(style.outlineWidth), outlineOffset: parseFloat(style.outlineOffset),
      focusVisible: element.matches(':focus-visible'),
    };
  });
}

function parseColor(value: string): Color {
  if (value === 'transparent') return [0, 0, 0, 0];
  const match = /^rgba?\(([^)]+)\)$/.exec(value);
  if (!match) throw new Error(`Unsupported computed color: ${value}`);
  const parts = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

function composite(front: Color, back: Color): Color {
  const alpha = front[3] + back[3] * (1 - front[3]);
  return [
    (front[0] * front[3] + back[0] * back[3] * (1 - front[3])) / alpha,
    (front[1] * front[3] + back[1] * back[3] * (1 - front[3])) / alpha,
    (front[2] * front[3] + back[2] * back[3] * (1 - front[3])) / alpha,
    alpha,
  ];
}

function background(values: string[]): Color {
  return values.reduce((back, value) => composite(parseColor(value), back), [255, 255, 255, 1] as Color);
}

function luminance(color: Color): number {
  const channel = (value: number) => value / 255 <= 0.04045 ? value / 255 / 12.92 : ((value / 255 + 0.055) / 1.055) ** 2.4;
  return channel(color[0]) * 0.2126 + channel(color[1]) * 0.7152 + channel(color[2]) * 0.0722;
}

function ratio(front: Color, back: Color): number {
  const values = [luminance(front), luminance(back)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

export async function expectControlContrast(locator: Locator, label: string): Promise<void> {
  const sample = await colors(locator);
  const back = background(sample.backgrounds);
  const front = composite(parseColor(sample.foreground), back);
  expect(ratio(front, back), `${label} visible text contrast`).toBeGreaterThanOrEqual(4.5);
}

export async function expectKeyboardFocus(page: Page, locator: Locator, label: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();
  await locator.focus();
  // Finish with actual keyboard navigation rather than auditing an unfocused,
  // hidden or pointer-only control. Selected nav/select controls stay tab stops.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(locator).toBeFocused();
  const sample = await colors(locator);
  expect(sample.focusVisible, `${label} keyboard focus-visible`).toBe(true);
  expect(sample.outlineStyle, `${label} computed focus outline style`).not.toBe('none');
  expect(sample.outlineWidth, `${label} computed focus outline width`).toBeGreaterThanOrEqual(2);
  const back = background(sample.outlineOffset < 0 ? sample.backgrounds : sample.backgrounds.slice(0, -1));
  const indicator = parseColor(sample.outlineColor);
  expect(ratio(composite(indicator, back), back), `${label} focus indicator contrast`).toBeGreaterThanOrEqual(3);
}
