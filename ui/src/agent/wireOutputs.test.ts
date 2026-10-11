import { describe, it, expect } from 'vitest';
import { finiteNumber, normalizeNodeStatus, lossFromProgress } from './wireOutputs';

describe('finiteNumber', () => {
  it('accepts finite numbers and booleans, refuses the rest', () => {
    expect(finiteNumber(3.5)).toBe(3.5);
    expect(finiteNumber(0)).toBe(0);
    expect(finiteNumber(true)).toBe(1);
    expect(finiteNumber(false)).toBe(0);
    expect(finiteNumber(Number.NaN)).toBeUndefined();
    expect(finiteNumber(Number.POSITIVE_INFINITY)).toBeUndefined();
    expect(finiteNumber('3')).toBeUndefined();
    expect(finiteNumber(null)).toBeUndefined();
  });
});

describe('normalizeNodeStatus — legacy 1.3.0 shape', () => {
  it('collects per-port scalars and strings from output_summary', () => {
    const normalized = normalizeNodeStatus({
      type: 'node_status',
      node_id: 'n1',
      status: 'completed',
      output_summary: {
        accuracy: { type: 'scalar', value: 0.93 },
        label: { type: 'string', value: 'hello' },
        broken: { type: 'scalar', value: Number.NaN },
        junk: 'not-an-object',
      },
    });
    expect(normalized.scalars).toEqual({ accuracy: 0.93 });
    expect(normalized.strings).toEqual({ label: 'hello' });
    expect(normalized.progress).toBeNull();
  });

  it('passes the legacy progress payload through', () => {
    const normalized = normalizeNodeStatus({
      progress: { epoch: 2, loss: 1.5, note: 'x' },
    });
    expect(normalized.progress).toEqual({ epoch: 2, loss: 1.5, note: 'x' });
  });
});

describe('normalizeNodeStatus — current typed outputs shape', () => {
  it('collects tensor_summary scalars, strings and model params', () => {
    const normalized = normalizeNodeStatus({
      outputs: [
        {
          output_kind: 'tensor_summary',
          tensor_summary: {
            perplexity: { type: 'scalar', value: 12.7 },
            text: { type: 'string', value: 'Once upon a time' },
            model: { type: 'model', class: 'CausalLM', params: 202_000_000, trainable: 201_500_000 },
            weights: { type: 'tensor', shape: [4, 4], dtype: 'torch.float32' },
          },
        },
      ],
    });
    expect(normalized.scalars).toEqual({ perplexity: 12.7 });
    expect(normalized.strings).toEqual({ text: 'Once upon a time' });
    expect(normalized.modelParams).toEqual({ model: 201_500_000 });
  });

  it('takes the latest progress entry and collects text entries', () => {
    const normalized = normalizeNodeStatus({
      outputs: [
        { output_kind: 'progress', progress: { event: 'batch', loss: 3.1 } },
        { output_kind: 'text', text: 'step logged' },
        { output_kind: 'progress', progress: { event: 'epoch', loss: 2.4 } },
      ],
    });
    expect(normalized.progress).toEqual({ event: 'epoch', loss: 2.4 });
    expect(normalized.texts).toEqual(['step logged']);
  });

  it('collects inline image entries as media (#310)', () => {
    const normalized = normalizeNodeStatus({
      outputs: [
        { output_kind: 'image', port: 'plot', image: { data: 'AAAA', format: 'png' } },
        { output_kind: 'image', image: { data: '' } }, // empty: dropped
        { output_kind: 'image', image: { data: 'B'.repeat(200_000) } }, // oversize: dropped
      ],
    });
    expect(normalized.media).toEqual([
      { kind: 'image', data: 'AAAA', format: 'png', port: 'plot' },
    ]);
  });

  it('collects video references and refuses off-origin urls (#310)', () => {
    const normalized = normalizeNodeStatus({
      outputs: [
        {
          output_kind: 'video',
          port: 'video',
          video: {
            url: '/api/media/rollout.mp4', format: 'mp4',
            fps: 10, frames: 240, width: 96, height: 96, bytes: 81234,
          },
        },
        { output_kind: 'video', video: { url: 'https://evil.example/x.mp4', format: 'mp4' } },
        { output_kind: 'video', video: { url: '//evil.example/x.mp4' } },
        { output_kind: 'video', video: { url: '/\\evil.example/x.mp4' } },
        { output_kind: 'video', video: { url: '/api/media/../auth/bootstrap' } },
        { output_kind: 'video', video: { url: '/api/media/%2e%2e/auth/bootstrap' } },
        { output_kind: 'video', video: { url: '/api/media/%5cevil.mp4' } },
        { output_kind: 'video', video: { url: '/api/media/a\n.mp4' } },
        { output_kind: 'video', video: { format: 'mp4' } }, // no url: dropped
      ],
    });
    expect(normalized.media).toEqual([
      {
        kind: 'video', url: '/api/media/rollout.mp4', format: 'mp4',
        port: 'video', fps: 10, frames: 240, width: 96, height: 96, bytes: 81234,
      },
    ]);
  });

  it('caps collected strings at 200 characters', () => {
    const long = 'x'.repeat(500);
    const normalized = normalizeNodeStatus({
      outputs: [
        { output_kind: 'tensor_summary', tensor_summary: { text: { type: 'string', value: long } } },
      ],
    });
    expect(normalized.strings.text).toHaveLength(200);
  });

  it('never throws on malformed payloads', () => {
    expect(normalizeNodeStatus({})).toEqual({
      scalars: {}, strings: {}, modelParams: {}, progress: null, texts: [], media: [],
    });
    expect(() => normalizeNodeStatus({
      outputs: [null, 42, 'nope', { output_kind: 'progress', progress: 'bad' }],
      output_summary: 'bad',
      progress: ['bad'],
    })).not.toThrow();
  });
});

describe('lossFromProgress', () => {
  it('picks loss, then train_loss, then val_loss — first finite wins', () => {
    expect(lossFromProgress({ loss: 2.5, val_loss: 9 })).toBe(2.5);
    expect(lossFromProgress({ train_loss: 1.25 })).toBe(1.25);
    expect(lossFromProgress({ val_loss: 0.5 })).toBe(0.5);
  });
  it('ignores non-finite and missing values', () => {
    expect(lossFromProgress({ loss: NaN, val_loss: 3 })).toBe(3);
    expect(lossFromProgress({ epoch: 4 })).toBeUndefined();
    expect(lossFromProgress(null)).toBeUndefined();
    expect(lossFromProgress(undefined)).toBeUndefined();
  });
});
