---
id: development
title: 開發與貢獻
sidebar_label: 開發
---

# 開發與貢獻

## 外掛（`ui/`）

在 repo 根目錄執行：

```bash
pnpm --dir ui install --frozen-lockfile
pnpm --dir ui test                    # Vitest
pnpm --dir ui test:coverage           # 覆蓋率門檻
pnpm --dir ui exec tsc --noEmit
pnpm --dir ui build                   # 型別檢查 + 打包到 frontend/index.js
```

UI CI 使用 **Node 22 / pnpm 10**，本機工具鏈不同請在結果註明。Manifest 的 **CodefyUI 1.3.0+** 基線使用 stable 前端 helpers；新版 run history、model catalog、reasoning 與選用 API v2 能力另行協商。保留目前 provider／model 預設與 capability guards，不退回舊可靠性基線；見[架構](./architecture.md)與[供應商設定](./provider-setup.md)。

`ui/vite.config.ts` 的覆蓋率門檻維持 **statements 90%、lines 90%、functions 85%、branches 80%**。不要降低門檻或排除新的業務邏輯來讓回歸通過。

`frontend/index.js`（建置出的 ESM bundle）是**被 commit 的** — 終端使用者透過 GitHub tarball 安裝、不需 Node 工具鏈，所以 dist 過期時 CI 會失敗。改完 `ui/` 後，重建並在同一變更中納入更新的 `frontend/`。瀏覽器 harness 不會代你重建。

## Mock-host 瀏覽器 harness

```bash
pnpm --dir ui preview:dev
```

開啟 **http://127.0.0.1:4179/?scenario=edit**。這個僅開發用的 harness 呼叫真實外掛的 `activate(api)`，使用仿宿主懸浮 widget、可變動的測試圖／目錄、與已儲存聊天隔離的記憶體儲存，以及固定 mock HTTP／SSE。非預期請求會被拒絕；不需真實憑證，也不呼叫真實供應商。

| Query | 行為 |
| --- | --- |
| `?scenario=edit` | 查詢 schema、套用一批圖操作、結構驗證 |
| `&manual=1` | Mock 聊天／驗證回應暫停，直到你明確按 **Release next response**；適合檢查 Stop／導覽競態 |
| `&bundle=1` | 載入現存的實際 `frontend/index.js`，而非 `ui/src/index.tsx`；不會重建 |

例如 **http://127.0.0.1:4179/?scenario=edit&manual=1&bundle=1** 可逐步檢查建置出的進入點。開啟助手並送出 fixture 建議的提示；情境不會自動送出。其他 fixture 涵蓋 Ask、修改前 HTTP 失敗、部分修改後失敗、未結束串流、清空確認、結構無效及驗證不可用。重新整理／選取情境會重設 fixture 狀態。

### 自動化瀏覽器檢查

`test:e2e` script 為 `playwright test --config playwright.config.ts`：

```bash
# 若尚未安裝瀏覽器，一次性安裝 Chromium
pnpm --dir ui exec playwright install chromium
pnpm --dir ui test:e2e
```

Playwright 設定會在 **http://127.0.0.1:4187** 啟動**自己的** preview server，連接埠已被占用時會失敗，不重用手動的 4179 server。報告在 `ui/playwright-report/`，失敗產物在 `ui/test-results/`。原始碼進入點與 `bundle=1` 是不同檢查：驗證新改動前須先建置所要檢查的 bundle。

瀏覽器檢查應包含窄（375px）、中（768px）、桌面（1440px）尺寸、短高度／reduced motion、鍵盤／IME 互動，以及可讀的狀態／確認／錯誤文字。Fixture 的 token override 只是樣式檢查，不是宿主 light-mode API 的證據。

## 可靠性檢查與證據

Agent 整合測試應使用真實 `runTurn` + `streamChat`，搭配可變動的假圖 API 與可控制 SSE；單獨 mock Agent 無法確立派送契約。在派送當下擷取訊息，避免後續陣列變更造成假陽性斷言。

回歸案例應涵蓋：

- Turn 前、串流／驗證／research／核准期間、`done` 後工具前、工具之間取消；Stop 後不再派送新畫布修改**或執行**；
- 缺少／格式錯誤終止事件、indexed 回執缺漏／重複、部分修改、宿主修改在派送後拋錯；
- Ask 對全部四個畫布／執行工具強制唯讀、singleton／快照綁定清空核准、拒絕不繞過、Settings／History／Lab 導覽或關閉取消；
- 僅本次修改驗證／修復（含已套用 promotion）、成功回執 allowlist（不改無關節點／輸入、不用衝突 ref）、unavailable 與 invalid 區別、stale 快照及上限耗盡時 incomplete；
- 只有 `!mutationAttempted && !sideEffectAttempted` 才 Retry，原始使用者要求保留一次；已嘗試／未知寫入或執行後不重播／重提交；完整 assistant／tool 歷史群組；
- 新提交即時執行的原生取消／清理，對比既有 run follower abort／unmount 只停止觀察；未知 socket 失敗保留 run ID／pointer 供查詢，不證明取消；
- 研究核准／預算、確定性搜尋、promotion revision／fingerprint 衝突、schema-redacted evidence、canonical bundle 驗證、明確匯入不執行／套用，以及 storage 失敗不重跑；
- Rich catalog／effort 協商、保留已選模型、快取／明確 Refresh，以及 custom endpoint 不自動 discovery；
- 隱藏檢視時保留草稿／附件、對話 ID 防護、設定就緒與重複送出防護、IME、歷史鍵盤刪除、焦點還原、固定閱讀位置。

| 證據層 | 能確立／不能確立的事 |
| --- | --- |
| Vitest／jsdom 與 real-stack 假宿主測試 | 受控 fixture 下的元件與執行層行為，不是瀏覽器或真宿主 |
| Mock-browser harness／Playwright | 已實作 fixture 的真外掛進入點、瀏覽器互動、假圖／SSE 副作用，不是真 CodefyUI 整合或 live execution |
| 真 CodefyUI-host smoke | 只有另外實測並記錄的能力，才代表實際宿主操作、驗證、Undo、執行／取消或 reattach |
| 真 LLM／供應商測試 | 只有另外授權並實測時，才代表真實傳輸／模型行為 |

**Mock browser、真宿主、真 LLM 是不同聲明。** 這個 harness 不呼叫真實供應商。請分開記錄實際指令輸出與未驗證層；有 script 或 fixture 不代表測試通過，也不是模型品質提升的證據。不要把真實 key、供應商請求或完整附件加入新的執行摘要 metadata。

## 這個文件網站

文件網站（Docusaurus）放在 **repo 根目錄**，內容在 `docs/`，繁體中文對應檔案在 `i18n/zh-Hant/docusaurus-plugin-content-docs/current/`：

```bash
pnpm install --frozen-lockfile
pnpm start                         # 本機開發伺服器，熱更新
pnpm build                         # 正式建置到 build/（兩種語系）
pnpm typecheck                     # 只檢查文件網站的 TypeScript
pnpm start -- --locale zh-Hant      # 預覽繁體中文
```

根目錄 `pnpm build` 建置文件；`pnpm --dir ui build` 建置外掛。兩者的 TypeScript 設定分開：根目錄 `pnpm typecheck` 排除 `ui/`；外掛與單元測試請跑 `pnpm --dir ui exec tsc --noEmit`。維持對應頁面一致，交接前跑 `git diff --check`。若實作 agent 正在平行修改原始碼，請讓統籌 agent 在穩定的 working tree 上負責安裝依賴、重建 UI bundle 與最終文件建置。

## 持續整合

- **`ci.yml`** 使用 Node 22 / pnpm 10。UI job 跑 Vitest 覆蓋率、型別檢查／重建 bundle，拒絕過期 committed `frontend/`；獨立 root docs job 跑 `pnpm typecheck` 並建置英文／繁體中文。目前不跑 `test:e2e` 或真供應商測試。
- **`deploy-docs.yml`** 在 Node 22 / pnpm 10 建置兩種語系，於 pull request 檢查文件變更，並將相關 `main` push（或手動執行）部署到 GitHub Pages。
