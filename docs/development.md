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

UI CI uses **Node 22 / pnpm 10**. Record any local toolchain difference with your results. The manifest's **CodefyUI 1.3.0+** baseline uses stable frontend helpers; newer run-history, model-catalog, reasoning, and optional API v2 capabilities are negotiated separately. Preserve the current provider/model defaults and capability guards rather than reverting them to an older reliability baseline; see [Architecture](./architecture.md) and [Provider setup](./provider-setup.md).

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

- cancellation before a turn, during streaming/validation/research/approval, after `done` but before tools, and between tools; no new canvas **or execution** dispatch after Stop;
- missing/malformed terminal events, indexed receipt gaps/duplicates, partial changes, and a host mutation throwing after dispatch;
- executor-enforced Ask read-only for all four canvas/execution tools, singleton/snapshot-bound clear approval, refusal without bypass, and cancellation on Settings/History/Lab navigation or close;
- current-turn-only validation/repair (including applied promotion), successful-receipt allowlists (no unrelated node/input changes or colliding refs), unavailable versus invalid validation, stale snapshots, and incomplete results when limits are exhausted;
- retry with the original user request once only when `!mutationAttempted && !sideEffectAttempted`; no replay/resubmission after attempted or unknown writes/execution; complete assistant/tool history groups;
- native cancellation/cleanup for newly submitted live runs versus observation-only abort/unmount of an existing-run follower; unknown socket failures retaining run IDs/pointers for inspection, not proving cancellation;
- study approval/budgets, deterministic search plans, promotion revision/fingerprint conflicts, schema-redacted evidence, canonical bundle verification, explicit import with no execution/application, and storage failure without reruns;
- rich catalog/effort negotiation, saved-model preservation, cache/explicit Refresh behavior, and no automatic discovery calls to custom endpoints;
- draft/attachment preservation while views are hidden, conversation identity guards, readiness and duplicate-send guards, IME, keyboard history deletion, focus restoration, and pinned scrolling.

| Evidence layer | What it establishes / does not establish |
| --- | --- |
| Vitest/jsdom and real-stack fake-host tests | Component and executor behavior under controlled fixtures; not a browser or real host |
| Mock-browser harness / Playwright | Actual plugin entry, browser interactions, and fake graph/SSE side effects for implemented fixtures; not real CodefyUI integration or live execution |
| Real CodefyUI-host smoke | Actual host operations, validation, Undo, execution/cancellation, or reattachment only for the capabilities separately exercised and recorded |
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

- **`ci.yml`** uses Node 22 / pnpm 10. Its UI job runs Vitest coverage, typechecks/rebuilds the bundle, and rejects stale committed `frontend/`. A separate root docs job runs `pnpm typecheck` and builds English/Traditional Chinese. It does not currently run `test:e2e` or live-provider tests.
- **`deploy-docs.yml`** builds both locales on Node 22 / pnpm 10, checks documentation changes on pull requests, and deploys relevant pushes to `main` (or manual runs) to GitHub Pages.
