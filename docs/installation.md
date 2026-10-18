---
id: installation
title: Installation
sidebar_label: Installation
---

# Installation

## Requirements

**CodefyUI 1.3.0 or later.** That release provides frontend plugin extensions and the LLM provider proxy (`/api/llm/chat`). Run history/reattachment and reasoning controls require the corresponding newer-host capabilities; see the [compatibility boundary](./architecture.md#codefyui-contract-boundary).

If `cdui --version` reports an older version, run `cdui update` first.

## Install the latest merged version

```bash
cdui plugin install CodefyUI/CodefyUI-Plugin-Graph-Copilot
```

Use the canonical repository above **without an `@tag`, `@branch`, or `@commit` suffix** to follow its default branch, `main`. The installer resolves that branch to a commit SHA and downloads that commit's archive, including the committed `frontend/index.js`; users do not need to build the UI. It does not select the latest GitHub release or an unmerged PR.

The current published plugin version is **0.4.0**, including reliable passive-run detachment and the evidence-first workbench. The host's current catalog also points to this repository without a fixed ref; older hosts may not list Graph Copilot, so the explicit repository command works across the supported baseline.

Reload the CodefyUI browser tab. Open Graph Copilot from the graph-socket button at the bottom-right.

## Update an existing installation

```bash
cdui plugin update graph-copilot
```

Then reload the browser tab. Updates compare the installed commit with the saved source ref, not just the manifest's version number. **Existing installations do not update automatically when this repository changes.** An older saved `treeleaves30760` repository URL redirects to the canonical repository; uninstalling is unnecessary.

If you deliberately installed a tag, commit, or another branch, `update` continues to follow that saved ref. To switch the installed plugin back to the latest merged `main`:

```bash
cdui plugin install CodefyUI/CodefyUI-Plugin-Graph-Copilot --force
```

`--force` replaces installed plugin files; back up any local edits first. A development-linked checkout is a separate workflow and should be updated in that checkout rather than force-replaced.

After a CLI update, use a hard reload if an older host/browser still displays the previous interface. Newer hosts serve plugin assets with revalidation and can reactivate updated frontends, but a version bump alone does not refresh an already-running browser tab.

To check the installed version, source, and commit:

```bash
cdui plugin info graph-copilot
```

## Next

Connect a model provider in [Provider setup](./provider-setup.md). The [design review](./design-review.md) records the workbench changes and their validation boundaries.
