# Evidence-first Graph Copilot workbench

## Context

This UI refinement is built on the independently delivered passive-run lifecycle fix in #33. It keeps the host theme, browser-owned agent, capability negotiation, explicit execution approvals, and evidence/retry boundaries intact. The intent is a focused graph-work instrument, not a marketing surface or a new execution engine.

## Design decisions

- Graph socket mark and wired tool receipts replace generic sparkle branding. Connections represent actual tool sequences only.
- One model entry lives in the composer. The header contains navigation and guarded New conversation; selected navigation is idempotent.
- Ask/Edit stays explicit. Graph unavailability is text, not fabricated zero counts; provider configuration is not called a live connection.
- Contextual starters and the Lab comparison action draft a prompt for review, never submit it automatically.
- Native dialogs isolate actual approval/import decisions. The main workbench remains non-modal; Escape declines only the current decision, and the composer regains focus after settlement.
- Native reasoning selection replaces an incomplete custom menu. Settings follow Connection → Model → Behavior and explain key persistence and Refresh prerequisites.
- Lab uses one semantic evidence table. Compact panels reflow its cells with labels, retaining accessible headers and full operation/error disclosures. Missing results stay missing, and recorded ties are not given invented positional ranks.
- Styling stays under `gcp-*`, inherits host fonts/tokens, supports reduced motion and forced colors, and loads no external font or UI framework.

## Validation record

The review loop is render → inspect → fix → repeat, using the real plugin entry against a deterministic mock host. Screenshots are evidence, not automatic visual-regression baselines.

Concrete findings addressed during refinement:
- duplicated model chrome and excessive header height;
- covered launcher hit area;
- doubled composer focus indicators;
- empty-state auto-scroll hiding the first task on short viewports;
- inaccessible custom menu keyboard behavior and incomplete modal isolation;
- light-token focus fallback that ignored the host accent;
- clipped candidate operation/error evidence and arbitrary visual rank labels.

Existing safety tests remain mandatory. Browser coverage includes narrow/wide and short viewports, synthetic light tokens, reduced motion, forced colors, keyboard decisions, setup/unavailable context, Lab evidence, and passive-run recovery. CI runs Chromium regressions separately and retains failed screenshots/traces.

Run:

```sh
pnpm --dir ui test:coverage
pnpm --dir ui build
pnpm --dir ui test:e2e --workers=2
```

## Limits

Mock-browser behavior, real CodefyUI integration, and live-provider behavior are separate evidence layers. This refinement does not make a new real-host or live-model claim. Award programs are a quality aspiration, not certification supplied by this review.
