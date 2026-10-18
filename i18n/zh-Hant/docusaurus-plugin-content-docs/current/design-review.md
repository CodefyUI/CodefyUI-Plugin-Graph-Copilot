# 證據優先的 Graph Copilot 工作台

## 背景

本次介面改版以另行交付的 #33 被動離開執行修復為基礎，保留宿主主題、瀏覽器 Agent、能力協商、明確執行核准及證據／重試邊界。目標是專注的圖形工作工具，不是宣傳頁，也不另建執行引擎。

## 設計取捨

- 以圖節點標誌與連線式工具回執取代通用 sparkle；連線只代表實際工具序列。
- 模型入口集中在 composer。Header 提供導覽與受 busy guard 保護的 New conversation；再次點擊已選分頁不跳頁。
- 明確保留 Ask／Edit。無法讀圖顯示文字而不虛構零節點；設定完成不宣稱已連線。
- 情境化起始任務與 Lab 比較動作只預填草稿，不自動送出。
- 原生 dialog 隔離真正核准／匯入決策，主工作台仍 non-modal。Escape 只拒絕目前決策，結束後還原 composer 焦點。
- 原生 reasoning 選單取代不完整的自訂 menu。Settings 依 Connection → Model → Behavior 分組，說明 key 保存方式與 Refresh 前提。
- Lab 使用單一語意表格，依窄面板寬度重排欄位並保留 accessible headers；操作／錯誤可完整展開，缺資料不變成零，平手不虛構名次。
- CSS 保持 `gcp-*` 範圍，繼承宿主字體／tokens，支援 reduced motion／forced colors，不載入外部字型或新 UI 框架。

## 驗證紀錄

採「渲染 → 檢視 → 修正 → 再測」，透過確定性的 mock host 載入真正插件入口。截圖是檢視證據，不是假稱的自動 visual-regression baseline。

改版中已處理的具體問題：重複模型列與過高 header、launcher 被面板覆蓋、重複輸入焦點框、空白態自動捲動隱藏第一個任務、自訂選單鍵盤契約不足、模態未隔離背景、淺色 focus fallback 未跟隨宿主 accent、候選錯誤／操作截斷與不正確的視覺名次。

既有安全測試維持必要門檻。瀏覽器案例涵蓋窄／寬及短視窗、synthetic light tokens、reduced motion、forced colors、鍵盤核准、setup／unavailable context、Lab 證據與 passive-run 恢復。CI 獨立執行 Chromium 回歸，保留失敗截圖與 traces。

```sh
pnpm --dir ui test:coverage
pnpm --dir ui build
pnpm --dir ui test:e2e --workers=2
```

## 邊界

Mock-browser 行為、真實 CodefyUI 整合與 live-provider 是不同證據。本次不宣稱新的真宿主或真模型驗證。獎項水準是品質目標，不是這次自我檢查能授予的認證。
