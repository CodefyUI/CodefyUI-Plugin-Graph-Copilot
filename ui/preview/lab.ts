import type { ExperimentSession } from '../src/agent/experiments';

/** Saved scalar summaries only. These records never submit an experiment,
 * promote a candidate, or imply a portable study bundle exists. */
export function seededLabEvidence(): ExperimentSession[] {
  return [{
    id: 'mock-lab-evidence',
    createdAt: '2026-07-14T08:30:00.000Z',
    hypothesis: 'A smaller learning rate improves validation accuracy.',
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    repetitions: 3,
    status: 'partial',
    winnerId: 'slow',
    winnerLabel: 'LR 0.001',
    variants: [
      {
        id: 'slow', label: 'LR 0.001', status: 'completed', metricKey: 'Accuracy.accuracy',
        metricValues: [0.91, 0.92, 0.9], mean: 0.91, stddev: 0.008164965809277268,
        runtimeMs: 1800, observedMetrics: { 'Accuracy.accuracy': 0.91 },
        operationSummary: ['set trainer: learning_rate', 'connect trainer.predictions to accuracy.predictions'],
        runs: [0.91, 0.92, 0.9].map((value, index) => ({
          repetition: index + 1, status: 'completed', durationMs: 600,
          metricKey: 'Accuracy.accuracy', metricValue: value, metricSource: 'output_summary',
          observedMetrics: { 'Accuracy.accuracy': value },
        })),
        errors: [],
      },
      {
        id: 'fast', label: 'LR 0.01', status: 'failed', metricValues: [], runtimeMs: 1500,
        observedMetrics: { loss: 0.62 }, operationSummary: ['set trainer: learning_rate'],
        runs: [
          {
            repetition: 1, status: 'failed', durationMs: 750, observedMetrics: { loss: 0.62 },
            error: 'Validation accuracy was unavailable after execution.',
          },
          {
            repetition: 2, status: 'failed', durationMs: 750, observedMetrics: { loss: 0.62 },
            error: 'Expected Accuracy.accuracy but the output contained loss only.',
          },
        ],
        errors: [
          'Run 1 failed: validation accuracy was unavailable after execution.',
          'Run 2 failed: expected Accuracy.accuracy but the output contained loss only.',
        ],
      },
    ],
    insights: {
      summary: ['LR 0.001 has the highest observed mean among candidates with usable accuracy evidence.'],
      warnings: ['Pilot evidence only; repeat with independent seeds and held-out data.'],
      paperIdeas: [],
    },
  }];
}
