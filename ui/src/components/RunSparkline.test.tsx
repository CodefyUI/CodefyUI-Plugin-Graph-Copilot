import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import type { RunProgressUpdate } from '../agent/runGraph';
import {
  RunSparkline,
  SPARKLINE_MAX_POINTS,
  appendLossPoint,
  sparklinePoints,
} from './RunSparkline';

function update(progress: Record<string, unknown> | undefined): RunProgressUpdate {
  return {
    phase: 'running',
    ...(progress ? { progress } : {}),
    elapsedMs: 1000,
    completedNodes: 0,
    totalNodes: 3,
  };
}

describe('appendLossPoint', () => {
  it('appends the loss field from a progress frame', () => {
    expect(appendLossPoint([], update({ event: 'batch', loss: 2.5 }))).toEqual([2.5]);
  });

  it('falls back to train_loss and val_loss when loss is absent', () => {
    expect(appendLossPoint([], update({ train_loss: 1.5 }))).toEqual([1.5]);
    expect(appendLossPoint([], update({ val_loss: 3.25 }))).toEqual([3.25]);
  });

  it('returns the same array instance when the update carries no loss', () => {
    const series = [1, 2];
    expect(appendLossPoint(series, update({ epoch: 3 }))).toBe(series);
    expect(appendLossPoint(series, update(undefined))).toBe(series);
    expect(appendLossPoint(series, update({ loss: Number.NaN }))).toBe(series);
  });

  it('caps the series with a sliding window', () => {
    const full = Array.from({ length: SPARKLINE_MAX_POINTS }, (_, index) => index);
    const next = appendLossPoint(full, update({ loss: 999 }));
    expect(next).toHaveLength(SPARKLINE_MAX_POINTS);
    expect(next[0]).toBe(1);
    expect(next[next.length - 1]).toBe(999);
  });
});

describe('sparklinePoints', () => {
  it('needs at least two points', () => {
    expect(sparklinePoints([], 96, 20)).toBe('');
    expect(sparklinePoints([1], 96, 20)).toBe('');
  });

  it('normalizes descending loss into a rising line toward the top pad', () => {
    const points = sparklinePoints([4, 3, 2], 100, 20).split(' ');
    expect(points).toHaveLength(3);
    const [first, , last] = points.map((pair) => pair.split(',').map(Number));
    expect(first[0]).toBe(0);
    expect(last[0]).toBe(100);
    // first value is the max -> near the top pad; last is the min -> bottom pad
    expect(first[1]).toBeCloseTo(1.5, 1);
    expect(last[1]).toBeCloseTo(18.5, 1);
  });

  it('draws a midline for a flat series instead of dividing by zero', () => {
    const points = sparklinePoints([2, 2, 2], 90, 20).split(' ');
    for (const pair of points) {
      expect(Number(pair.split(',')[1])).toBe(10);
    }
  });
});

describe('RunSparkline', () => {
  it('renders nothing under two points', () => {
    const { container } = render(<RunSparkline series={[1]} />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders an accessible polyline for a series', () => {
    const { container, getByRole } = render(<RunSparkline series={[3, 2.5, 2]} />);
    expect(container.querySelector('polyline')).not.toBeNull();
    expect(getByRole('img').getAttribute('aria-label')).toContain('2.0000');
  });
});
