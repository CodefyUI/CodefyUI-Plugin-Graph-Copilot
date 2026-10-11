---
id: development
title: Development & contributing
sidebar_label: Development
---

# Development & contributing

## Plugin (`ui/`)

From the repo root:

```bash
pnpm --dir ui install --frozen-lockfile
pnpm --dir ui test                    # Vitest
pnpm --dir ui test:coverage           # coverage gate
pnpm --dir ui exec tsc --noEmit
pnpm --dir ui build                   # type-check + bundle to frontend/index.js
```

UI CI uses **Node 22 / pnpm 9**. If you use a different local toolchain, record that difference with the results; do not change model defaults or host compatibility as part of a reliability fix. The baseline remains **CodefyUI 1.3.0+ / plugin API v1**.

Coverage thresholds in `ui/vite.config.ts` remain **statements 90%, lines 90%, functions 85%, branches 80%**. Do not lower thresholds or exclude new business logic to make a regression pass.

`frontend/index.js` (the built ESM bundle) is **committed** — end users install via a GitHub tarball with no Node toolchain, so CI fails if the dist is stale. After changing `ui/`, rebuild and include the refreshed `frontend/` in the same change. The browser harness does not rebuild it for you.

## Mock-host browser harness

```bash
pnpm --dir ui preview:dev
```

Open **http://127.0.0.1:4179/?scenario=edit**. This development-only harness calls the real plugin's `activate(api)` using a host-like floating widget, a mutable fixture graph/catalog, in-memory storage isolated from your saved chats, and deterministic mock HTTP/SSE. Unexpected requests are rejected; it does not need live credentials or call a real provider.

| Query | Behavior |
| --- | --- |
| `?scenario=edit` | Schema lookup, a graph-operation batch, and structural validation |
| `&manual=1` | Hold mock chat/validation responses until you explicitly use **Release next response**; useful for Stop/navigation races |
| `&bundle=1` | Load the actual existing `frontend/index.js` instead of `ui/src/index.tsx`; no rebuild is performed |

For example, use **http://127.0.0.1:4179/?scenario=edit&manual=1&bundle=1** to step through the built entry. Open the assistant and send the fixture's suggested prompt; the scenario does not send automatically. Other fixtures cover Ask, pre-edit HTTP failure, partial-edit failure, a pending stream, clear confirmation, invalid structure, and unavailable validation. Reloading/selecting a scenario resets the fixture state.

### Automated browser checks

The `test:e2e` script is `playwright test --config playwright.config.ts`:

```bash
# One-time Chromium setup if the browser is not already installed
pnpm --dir ui exec playwright install chromium
pnpm --dir ui test:e2e
```

The Playwright configuration starts its **own** preview server at **http://127.0.0.1:4187** and fails if that port is occupied; it does not reuse a manual 4179 server. Reports go to `ui/playwright-report/`, and failure artifacts go to `ui/test-results/`. Source-entry checks and `bundle=1` checks are different: build the intended bundle first when validating newly changed code.

Include narrow (375px), medium (768px), and desktop (1440px) views, short-height/reduced-motion checks, keyboard/IME interactions, and readable status/confirmation/error text in a browser review. A fixture token override is only a styling check, not evidence of a host light-mode API.

## Reliability checks and evidence

Use real `runTurn` + `streamChat` with mutable fake graph APIs and controllable SSE for agent integration tests; a mocked agent alone cannot establish the dispatch contract. Capture request messages at dispatch time so later array changes do not create false-positive assertions.

Regression cases should cover:

- cancellation before a run, during streaming/validation/research, after `done` but before tools, and between tools; no new mutation dispatch after Stop;
- missing/malformed terminal events, indexed receipt gaps/duplicates, partial changes, and a host mutation throwing after dispatch;
- executor-enforced Ask read-only, singleton/snapshot-bound clear approval, refusal without bypass, and cancellation on navigation/close;
- current-run-only validation/repair, successful-receipt repair allowlists (no unrelated node/input mutations or colliding refs), unavailable versus invalid validation, stale snapshots, and incomplete results when limits are exhausted;
- retry with the original user request once only before mutation dispatch; continuation without replay after attempted/unknown writes; complete assistant/tool history groups;
- draft/attachment preservation while views are hidden, conversation identity guards, readiness and duplicate-send guards, IME, keyboard history deletion, focus restoration, and pinned scrolling.

| Evidence layer | What it establishes / does not establish |
| --- | --- |
| Vitest/jsdom and real-stack fake-host tests | Component and executor behavior under controlled fixtures; not a browser or real host |
| Mock-browser harness / Playwright | Actual plugin entry, browser interactions, and fake graph/SSE side effects; not real CodefyUI integration |
| Real CodefyUI-host smoke | Actual host operation, validation, and Undo integration, only when separately exercised and recorded |
| Real-LLM/provider test | Live transport/model behavior, only when separately authorized and exercised |

**Mock browser, real host, and real LLM are separate claims.** This harness makes no live provider calls. Document actual command outputs and unverified layers separately; the existence of a script or fixture is not a passing test result or a model-quality improvement claim. Do not put real keys, provider requests, or full attachments into new run-summary metadata.

## This documentation site

The docs site (Docusaurus) lives at the **repo root**, with content in `docs/` and Traditional Chinese counterparts in `i18n/zh-Hant/docusaurus-plugin-content-docs/current/`:

```bash
pnpm install --frozen-lockfile
pnpm start                         # local dev server with hot reload
pnpm build                         # production build into build/ (both locales)
pnpm typecheck                     # documentation TypeScript only
pnpm start -- --locale zh-Hant      # preview Traditional Chinese
```

Root `pnpm build` builds documentation; `pnpm --dir ui build` builds the plugin. Their TypeScript configurations are separate: root `pnpm typecheck` excludes `ui/`; run `pnpm --dir ui exec tsc --noEmit` for the plugin and its unit tests. Keep paired pages aligned and run `git diff --check` before handing off. If implementation agents are changing source in parallel, let the coordinating agent perform installs, UI bundle regeneration, and the final documentation build against a settled tree.

## Continuous integration

- **`ci.yml`** runs the `ui/` Vitest coverage gate on Node 22 / pnpm 9, rebuilds the bundle, and fails if committed `frontend/` is stale. It does not currently run `test:e2e` or live-provider tests.
- **`deploy-docs.yml`** builds both locales on Node 22 / pnpm 10, checks documentation changes on pull requests, and deploys relevant pushes to `main` (or manual runs) to GitHub Pages.
