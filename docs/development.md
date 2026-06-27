---
id: development
title: Development & contributing
sidebar_label: Development
---

# Development & contributing

## Plugin (`ui/`)

```bash
cd ui
pnpm install
pnpm test          # vitest
pnpm build         # type-check + bundle to ../frontend/index.js
```

`frontend/index.js` (the built ESM bundle) is **committed** — end users install via a GitHub tarball with no Node toolchain, so CI fails if the dist is stale. After changing `ui/`, run `pnpm build` and commit the refreshed `frontend/`.

## This documentation site

The docs site (Docusaurus) lives at the **repo root**, with content in `docs/`:

```bash
pnpm install       # at the repo root
pnpm start         # local dev server with hot reload
pnpm build         # production build into build/
```

It is bilingual (English + 繁體中文). To preview the Chinese locale:

```bash
pnpm start -- --locale zh-Hant
```

## Continuous integration

- **`ci.yml`** runs the `ui/` vitest suite and rebuilds the bundle, failing if the committed `frontend/` dist is stale.
- **`deploy-docs.yml`** builds this site and deploys it to GitHub Pages on every push to `main`.
