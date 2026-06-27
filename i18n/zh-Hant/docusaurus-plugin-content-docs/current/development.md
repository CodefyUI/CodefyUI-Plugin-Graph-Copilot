---
id: development
title: 開發與貢獻
sidebar_label: 開發
---

# 開發與貢獻

## 外掛（`ui/`）

```bash
cd ui
pnpm install
pnpm test          # vitest
pnpm build         # 型別檢查 + 打包到 ../frontend/index.js
```

`frontend/index.js`（建置出的 ESM bundle）是**被 commit 的** — 終端使用者透過 GitHub tarball 安裝、不需 Node 工具鏈，所以 dist 過期時 CI 會失敗。改完 `ui/` 後，跑 `pnpm build` 並 commit 更新後的 `frontend/`。

## 這個文件網站

文件網站（Docusaurus）放在 **repo 根目錄**，內容在 `docs/`：

```bash
pnpm install       # 在 repo 根目錄
pnpm start         # 本機開發伺服器，熱更新
pnpm build         # 正式建置到 build/
```

它是雙語（English + 繁體中文）。要預覽中文語系：

```bash
pnpm start -- --locale zh-Hant
```

## 持續整合

- **`ci.yml`** 跑 `ui/` 的 vitest 測試並重建 bundle，若 committed 的 `frontend/` dist 過期就失敗。
- **`deploy-docs.yml`** 建置本網站，並在每次 push 到 `main` 時部署到 GitHub Pages。
