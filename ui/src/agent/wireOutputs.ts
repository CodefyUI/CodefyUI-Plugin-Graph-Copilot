/**
 * wireOutputs — normalize `/ws/execution` node_status payloads across host
 * generations.
 *
 * CodefyUI 1.3.0 put per-port scalar summaries on `message.output_summary`
 * (`{port: {value}}`) and live training frames on `message.progress`
 * (`{name: number}`). Current hosts ship a typed `outputs` entry list
 * instead: `{output_kind, <kind>: payload, port?}` with kinds `progress`,
 * `tensor_summary`, `text`, `image`, `chart`, `video`. The plugin supports
 * both generations, so every consumer parses through this module instead of
 * reading raw message fields.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * One renderable media output. Two shapes arrive on the wire (#310):
 * an `image` entry inlines base64 PNG bytes (`data`), a `video` entry is a
 * REFERENCE (`url` served by the host's /api/media with a real
 * Content-Type — the bytes never ride the event stream, whose per-event
 * cap is far under a clip).
 */
export interface MediaOutput {
  kind: 'image' | 'video';
  /** Output port the payload came from, when the host named one. */
  port?: string;
  /** image: base64 (no data: prefix), capped — oversize payloads dropped. */
  data?: string;
  /** image subtype for a data URL, e.g. "png". */
  format?: string;
  /** video: same-origin URL (/api/media/...), playable directly. */
  url?: string;
  /** video metadata, forwarded verbatim when present. */
  fps?: number;
  frames?: number;
  width?: number;
  height?: number;
  bytes?: number;
}

/** Inline images above this stay out of the parse — they would bloat both
 * chat storage and (via the run outcome) the model's context. The host's
 * previews are sized far under it. */
const MAX_INLINE_IMAGE_CHARS = 96_000;

export interface NormalizedNodeStatus {
  /** Per-port numeric values (finite numbers only), keyed by port name. */
  scalars: Record<string, number>;
  /** Per-port short strings (hosts truncate to ~200 chars), keyed by port. */
  strings: Record<string, string>;
  /** Trainable-parameter counts from model summaries, keyed by port. */
  modelParams: Record<string, number>;
  /** Latest live progress payload (training frames etc.), or null. */
  progress: Record<string, unknown> | null;
  /** Log/text lines (Print node output etc.). */
  texts: string[];
  /** Renderable media outputs (#310): inline images, video references. */
  media: MediaOutput[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function finiteNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  return undefined;
}

/** Progress fields treated as a loss curve, first match wins. */
export const LOSS_FIELDS = ['loss', 'train_loss', 'val_loss'] as const;

/** The progress payload's loss value, when it carries one. */
export function lossFromProgress(
  progress: Record<string, unknown> | null | undefined,
): number | undefined {
  if (!progress) return undefined;
  for (const field of LOSS_FIELDS) {
    const value = progress[field];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }
  return undefined;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function isHostMediaUrl(url: string): boolean {
  if (!url.startsWith('/api/media/') || /[\\\u0000- \u007f]/.test(url)) return false;
  try {
    const decoded = decodeURIComponent(url.split(/[?#]/, 1)[0]);
    if (decoded.includes('\\') || decoded.split('/').some((part) => part === '.' || part === '..')) return false;
    const base = 'https://codefyui.invalid';
    const parsed = new URL(url, base);
    return parsed.origin === base && parsed.pathname.startsWith('/api/media/') && parsed.pathname.length > '/api/media/'.length;
  } catch { return false; }
}

/** Fold one per-port summary object ({type, value, ...}) into the result. */
function collectPortSummary(
  out: NormalizedNodeStatus,
  port: string,
  raw: unknown,
): void {
  const summary = asRecord(raw);
  if (!summary) return;
  const kind = typeof summary.type === 'string' ? summary.type : '';
  if (kind === 'model') {
    const params = finiteNumber(summary.trainable ?? summary.params);
    if (params !== undefined) out.modelParams[port] = params;
    return;
  }
  const value = summary.value;
  const num = finiteNumber(value);
  if (num !== undefined) {
    out.scalars[port] = num;
    return;
  }
  if (typeof value === 'string' && value.length > 0) {
    out.strings[port] = value.slice(0, 200);
  }
}

// ---------------------------------------------------------------------------
// normalizeNodeStatus
// ---------------------------------------------------------------------------

/**
 * Parse one `node_status` message (either host generation) into a normalized
 * shape. Never throws on malformed data — unknown pieces are skipped.
 */
export function normalizeNodeStatus(
  message: Record<string, unknown>,
): NormalizedNodeStatus {
  const out: NormalizedNodeStatus = {
    scalars: {},
    strings: {},
    modelParams: {},
    progress: null,
    texts: [],
    media: [],
  };

  // Legacy 1.3.0 shape: per-port summaries + live progress on the message.
  const legacySummary = asRecord(message.output_summary);
  if (legacySummary) {
    for (const [port, raw] of Object.entries(legacySummary)) {
      collectPortSummary(out, port, raw);
    }
  }
  const legacyProgress = asRecord(message.progress);
  if (legacyProgress) out.progress = legacyProgress;

  // Current shape: a typed outputs entry list.
  const entries = Array.isArray(message.outputs) ? message.outputs : [];
  for (const rawEntry of entries) {
    const entry = asRecord(rawEntry);
    if (!entry) continue;
    const kind = typeof entry.output_kind === 'string' ? entry.output_kind : '';
    if (kind === 'progress') {
      const payload = asRecord(entry.progress);
      if (payload) out.progress = payload;
    } else if (kind === 'tensor_summary') {
      const summary = asRecord(entry.tensor_summary);
      if (summary) {
        for (const [port, raw] of Object.entries(summary)) {
          collectPortSummary(out, port, raw);
        }
      }
    } else if (kind === 'text') {
      if (typeof entry.text === 'string' && entry.text.length > 0) {
        out.texts.push(entry.text);
      }
    } else if (kind === 'image') {
      const payload = asRecord(entry.image);
      const data = payload && typeof payload.data === 'string' ? payload.data : '';
      if (data && data.length <= MAX_INLINE_IMAGE_CHARS) {
        out.media.push({
          kind: 'image',
          data,
          format: payload && typeof payload.format === 'string' ? payload.format : 'png',
          ...(typeof entry.port === 'string' && entry.port ? { port: entry.port } : {}),
        });
      }
    } else if (kind === 'video') {
      // #310: a reference dict — never bytes. Only same-origin relative
      // URLs are kept: an absolute URL in a wire payload is not the host
      // contract and will not be fetched.
      const payload = asRecord(entry.video);
      const url = payload && typeof payload.url === 'string' ? payload.url : '';
      if (isHostMediaUrl(url)) {
        const media: MediaOutput = {
          kind: 'video',
          url,
          format: payload && typeof payload.format === 'string' ? payload.format : 'mp4',
          ...(typeof entry.port === 'string' && entry.port ? { port: entry.port } : {}),
        };
        for (const key of ['fps', 'frames', 'width', 'height', 'bytes'] as const) {
          const num = finiteNumber(payload?.[key]);
          if (num !== undefined) media[key] = num;
        }
        out.media.push(media);
      }
    }
    // chart / unknown kinds carry payloads the agent cannot use.
  }

  return out;
}
