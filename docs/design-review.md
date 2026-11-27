# Evidence-first Graph Copilot workbench

## Context

This UI refinement is built on the independently delivered passive-run lifecycle fix in #33. It keeps the host theme, browser-owned agent, capability negotiation, explicit execution approvals, and evidence/retry boundaries intact. The intent is a focused graph-work instrument, not a marketing surface or a new execution engine.

## Design decisions

- Graph socket mark and wired tool receipts replace generic sparkle branding. Connections represent actual tool sequences only.
- One model entry lives in the composer. The header contains navigation and guarded New conversation; selected navigation is idempotent.
- Ask/Edit stays explicit. Graph unavailability is text, not fabricated zero counts; provider configuration is not called a live connection.
- Contextual starters and the Lab comparison action draft a prompt for review, never submit it automatically.
- Approvals (clear, run, study, commit) are cards in the conversation from 0.5.0, not modals: focus starts on the safe action, Escape declines only that card, and the composer regains focus after settlement. Study import keeps its native dialog.
- Native reasoning selection replaces an incomplete custom menu. Settings follow Provider → Model → Behavior and explain key persistence and Refresh prerequisites.
- Lab uses one semantic evidence table. Compact panels reflow its cells with labels, retaining accessible headers and full operation/error disclosures. Missing results stay missing, and recorded ties are not given invented positional ranks.
- Styling stays under `gcp-*`, inherits host fonts/tokens, supports reduced motion and forced colors, and loads no external font or UI framework.

## 0.5.0 general-agent panel

- The panel docks at the side on hosts with the v6 side dock and keeps the floating window elsewhere. One header carries the agent state (needs you > done > working > idle, as a word and a glyph), icon navigation and a More actions menu that takes over below 320 px.
- Colour means a role: accent, live, ok, attention, danger, neutral, each bound once to a host token in the `tokens:begin`/`tokens:end` region; `styles.test.ts` rejects colour literals elsewhere. Only the working line pulses.
- Tool calls are one-line rows with an outcome glyph, the tool name in mono and `k=v` arguments; three or more ordinary calls fold into one row; each edit gets a "+3 nodes · 4 edges" line.
- Layout follows the panel width through container queries (300–720 px), not the viewport. `e2e/panel.spec.ts` checks 300, 400, 640 and 720 px in English and Traditional Chinese, the floating fallback, light tokens and the toolbar badge.

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
