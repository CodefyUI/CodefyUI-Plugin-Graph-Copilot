---
id: conversation-history
title: 對話紀錄
sidebar_label: 對話紀錄
---

# 對話紀錄

過往對話列在面板的**歷史**檢視。點一下就能接續先前的對話。

- 對話存在**你瀏覽器的 localStorage**，上限 **50** 筆（超過時丟棄最舊的）。
- 每一筆顯示標題、相對時間、以及使用的 供應商/模型。
- 對話的標題取自你的第一則訊息。
- Live graph snapshot 與 graph tool result 在 provider 使用及儲存前都會 scrub；`secret` 參數、credential-shaped nested field、未知 node schema／parameter，以及這些已知去敏值的 exact echo 都會替換成 `[REDACTED]`。
- Tool call 在顯示或儲存前會先複製，並套用同一套 schema-aware、fail-closed redaction。原始 argument 只存在於當次 active provider/tool execution path，讓指定工具能執行，不會寫進 conversation history。
- Assistant text 若包含已從 graph 或 tool call 去敏之值的已知 exact echo，也會在本機持久化或後續 provider round 重用前移除。這不會回頭隱藏 live reply 已串流出的文字；此機制是 exact-value protection，不是通用 secret classifier。
- 你輸入的訊息會原樣儲存；請勿把 API key 或其他 credential 貼進自由文字聊天。

對話歷史本身沒有匯出／匯入，只是存於瀏覽器的 continuity 功能。Experiment Lab 另有 portable study export 與 read-only import，會做 semantic-integrity 與 raw／derived consistency check，並包含去敏 graph spec 與 recorded scalar evidence；這些檢查不認證 evidence 或作者。
