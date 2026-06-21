# Graph Copilot — Attachments + UI polish (design)

Date: 2026-06-21
Status: approved (design questions answered)

## Goal

Three enhancements to the Graph Copilot chat panel:

1. **更美觀** — a more polished UI (keep the dark + teal identity, elevate it).
2. **Attachments** — let the user add **images, PDF, text files, and code** to a message.
3. **Conversation history** — polish the existing in-panel history (no file export; the
   resumable, capped-50 localStorage list stays the storage mechanism).

## Decisions (from user)

- **Images → send to capable providers.** Images are attached, shown as thumbnails, and
  sent to the model as base64 multimodal parts on image-capable providers
  (OpenAI / OpenAI-Codex / OpenRouter / Claude / custom). Text, PDF and code are always
  extracted to text and inlined. Image sending degrades gracefully (a normal stream error
  + retry if a backend/model can't accept multimodal content).
- **History → polish only.** No export/import. Improve the look and information of the
  existing list.

## Architecture

### Attachment model (`ui/src/state/attachments.ts`, new)

```ts
type AttachmentKind = 'image' | 'pdf' | 'text';

interface Attachment {
  id: string;
  kind: AttachmentKind;
  name: string;
  size: number;        // bytes
  mime: string;
  text?: string;       // extracted text (kind: 'text' | 'pdf')
  dataUrl?: string;    // base64 data URL (kind: 'image')
}
```

- `classify(file)` → kind, by MIME then extension (code/json/csv/md/etc. → `text`).
- `readFileAsAttachment(file, deps?)` → reads:
  - image/* → `dataUrl` via FileReader.
  - application/pdf → lazy-load pdf.js **from CDN at runtime** (kept out of the committed
    bundle via `import(/* @vite-ignore */ url)`), extract text → `text`. Loader is injectable
    for tests; graceful error if offline.
  - text-like → `text` via `file.text()`.
- Size guards (per-file cap) + friendly errors.

### Wire composition (`ui/src/llm/client.ts`, `ui/src/agent/loop.ts`)

- Extend `WireMessage.content` to `string | ContentPart[]` where
  `ContentPart = { type:'text'; text:string } | { type:'image_url'; image_url:{ url:string } }`
  (OpenAI multimodal shape; the unified proxy normalizes per provider).
- `composeUserContent(text, attachments, provider)`:
  - Inline text/pdf attachments as labeled fenced blocks appended to the user text.
  - If images present → return a parts array: `[{text}, ...image_url parts]`.
  - Else → return a plain string (unchanged behavior; backward compatible).
- `ChatTurn` gains `attachments?: Attachment[]` (persisted, for display + history).
- `turnToWire(turn, provider)` composes uniformly for current and historical user turns.
- `runTurn` accepts the user turn (with attachments) instead of a bare string.

### UI

- **Input area**: paperclip attach button + hidden `<input type=file multiple>`,
  drag-and-drop onto the panel, and paste-image. Chips row above the textarea
  (image thumbnail / file icon + name + size + remove; spinner while a PDF reads).
  Send disabled while any attachment is still loading.
- **MessageBubble**: render a user turn's attachments (image thumbnails, file chips).
- **CSS polish**: refined tokens (layered surfaces, spacing/type scale), gradient+glow FAB,
  cleaner header with a mark, nicer bubbles + copy-on-code, welcome/empty state, polished
  input + history rows, smoother transitions. Pure CSS, `gcp-` prefix, no heavy deps.

## Testing

Follow the existing vitest + Testing Library patterns. New/extended tests:
- `attachments.test.ts` — classify, text/pdf/image reads (mocked FileReader + pdf.js loader),
  size guards.
- wire composition — string vs parts, text inlining, provider gating.
- component tests — attach/remove chips, send-disabled-while-loading, attachment rendering.

## Build

Rebuild and commit `frontend/index.js` (CI dist-freshness gate). pdf.js stays a runtime CDN
load, so the committed bundle size is roughly unchanged.

## Out of scope

Backend/proxy changes (multimodal forwarding is assumed); conversation export/import;
new providers.
