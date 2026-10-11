/**
 * RunSparkline — a tiny inline loss curve for live graph runs.
 *
 * While run_graph streams training progress, the composer bar renders this
 * sparkline from the numeric `loss` values carried by progress frames. Pure
 * helpers (series accumulation, path building) are exported for tests.
 */

import React from 'react';
import type { RunProgressUpdate } from '../agent/runGraph';
import { lossFromProgress } from '../agent/wireOutputs';

/** Sliding cap keeps the polyline cheap to render on long runs. */
export const SPARKLINE_MAX_POINTS = 120;

/** Append the update's loss value (if any) to a capped series copy.
 * Returns the same array instance when the update carries no loss, so React
 * state consumers can cheaply skip re-renders. */
export function appendLossPoint(
  series: number[],
  update: RunProgressUpdate,
): number[] {
  const value = lossFromProgress(update.progress);
  if (value === undefined) return series;
  const next = [...series, value];
  return next.length > SPARKLINE_MAX_POINTS
    ? next.slice(next.length - SPARKLINE_MAX_POINTS)
    : next;
}

/** Build an SVG polyline points string for the series, normalized to the
 * viewbox. A flat series draws a midline rather than dividing by zero. */
export function sparklinePoints(
  series: number[],
  width: number,
  height: number,
): string {
  if (series.length < 2) return '';
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min;
  const stepX = width / (series.length - 1);
  const pad = 1.5; // keep the stroke inside the viewbox
  const usable = height - pad * 2;
  return series
    .map((value, index) => {
      const x = index * stepX;
      const y = span === 0
        ? height / 2
        : pad + (1 - (value - min) / span) * usable;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export interface RunSparklineProps {
  series: number[];
}

export function RunSparkline({ series }: RunSparklineProps) {
  const width = 96;
  const height = 20;
  const points = sparklinePoints(series, width, height);
  if (!points) return null;
  const latest = series[series.length - 1];
  return (
    <svg
      className="gcp-run-sparkline"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`Training loss trend, latest ${latest.toFixed(4)}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
