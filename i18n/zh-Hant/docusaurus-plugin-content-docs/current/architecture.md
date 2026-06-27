---
id: architecture
title: 架構
sidebar_label: 架構
---

# 架構

Graph Copilot 是 `ui/` 裡的一個 **Vite 函式庫模式 React app**，建置成單一、被 commit 的 ESM 檔 `frontend/index.js`。終端使用者透過 GitHub tarball 安裝、不需 Node 工具鏈，所以建置出的 bundle 是刻意被 git 追蹤的。

## 外掛進入點

bundle 預設匯出 `activate(api)`。一切都透過 `CodefyUIPluginAPI` 物件抵達 CodefyUI — 圖操作、已驗證的 fetch、命名空間化的儲存 — 不從 core 匯入任何東西：

```tsx
export default function activate(api) {
  const el = api.ui.addFloatingWidget({ id: 'copilot' });
  createRoot(el).render(<CopilotApp api={api} />);
}
```

## Agent 迴圈

每則使用者訊息跑一個全新的回合：

1. **建立系統提示** — 精簡的節點目錄加上即時圖的快照（超過字元上限就截斷）。
2. **串流模型回覆**，走 `/api/llm/chat` 的 SSE 代理，提供兩個工具。
3. **在本機執行工具呼叫** — `apply_graph_operations`（已驗證、一個復原步驟）與 `get_current_graph` — 把每個操作的結果回饋給模型。
4. **迴圈** 最多固定的工具回合數，沿途提交 assistant 與 tool 回合讓對話不會遺失，然後結束。

會帶入前幾回合的一段視窗作為脈絡。工具契約見 [它如何編輯圖](./graph-editing.md)。

## 模組

- `ui/src/llm/` — SSE 聊天串流用戶端與端點封裝（模型清單、Codex 登入）。
- `ui/src/agent/` — 系統提示建構器與工具迴圈。
- `ui/src/state/` — 設定、有上限的對話持久化、以及附件處理。
- `ui/src/components/` — FAB、聊天視窗、聊天檢視、訊息泡泡、歷史與設定檢視。

## 技術堆疊

React 19、TypeScript、Vite 6（函式庫模式 + CSS-injected-by-JS）、以及 vitest + jsdom 做測試。沒有狀態函式庫 — 元件狀態加上樸素的儲存輔助函式。
