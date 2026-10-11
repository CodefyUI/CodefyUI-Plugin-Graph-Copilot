---
id: vla-research
title: VLA 訓練、rollout 影片與媒體輸出
sidebar_label: VLA 與媒體
---

# VLA 訓練、rollout 影片與媒體輸出

搭配 CodefyUI 的 VLA 節點組與影片 I/O（CodefyUI main，2026-08），Graph Copilot 可以端到端建立、訓練並評估一個小型視覺-語言-動作策略——而且這次的執行會產出你看得到的東西：rollout 影片直接在聊天面板內播放。

## 標準鏈

要求一條 VLA 管線，代理會用 PushWorld 家族組裝：

- `PushWorldEnv` — 語言條件式 2D 推物基準（PushT 的精神、純 torch）：一個 agent 圓盤、彩色 puck、彩色圓環目標，以及像 `push the red puck to the blue target` 的指令。有干擾物時單靠畫面無法判斷目標——策略必須讀懂文字。
- `PushWorldDemos` — 腳本專家示範轉成行為複製樣本。`demo_noise` 是 DART 式擾動：執行的動作被加噪、標註保留專家動作，這正是閉環控制需要的回復資料（實測：關掉 4%、開著 24% 的閉環成功率，架構完全相同）。
- `VLAModel` — 依當代文獻塑形的迷你 VLA：視覺 stem + 位元組級指令嵌入 → transformer 主幹 → 動作區塊 expert。`head_type` 一鍵切換範式——`flow_matching`（pi0/SmolVLA 家族：對區塊加噪、學習速度場、推論時 Euler 積分）或 `regression`（直接 MSE）——其餘全部固定。節點自己輸出配對好的 `loss_fn`，接錯泛用損失而靜默訓練錯目標的情況在結構上不可能發生。
- 原生 `DataLoader` + `TrainingLoop` — VLA 批次是巢狀 tuple `((image, tokens, actions), target)`，訓練堆疊零修改直接承載。
- `VLARollout` — 全新回合上的閉環成功率、後退視野執行（`execute_k`）、依結果鑲邊的 rollout 幀。`instruction_mode: swapped` 是語言接地消融：真的在讀指令的策略，在指令說謊時會崩潰（原型中 46% → 2%）。
- `VLAActionEval` — 保留切分上的開環區塊 MSE；MSE 低而成功率低正是誤差累積的特徵。
- `VideoWrite` — 把 `PushWorldDemos.demo_video` 或 `VLARollout.frames` 編碼成 mp4（PATH 上有 ffmpeg 時）或 gif（Pillow、零相依），寫進 host 的媒體目錄，由 `/api/media` 內嵌播放。

## 面板中的媒體

執行結果現在帶有 `media` 清單。模型只收到**參照**——`{node, port, kind, format, url, frames, bytes}`——從不含位元組，影片不佔上下文。面板會把每個同源 `/api/media/...` 片段直接播放在 run stage 下方（mp4/webm 用 `<video>`、gif 用動畫影像），參照隨對話保存，重開對話仍會從 host 重播。

工具結果中的跨網域 URL 在兩個解析點（線路正規化器與 stage 渲染器）都會被拒絕——偽造的結果無法讓面板指向其他主機。

## 研究旋鈕

- `head_type`（flow matching vs regression），資料完全相同；
- `execute_k` — 後退視野：同一策略實測 2 → 46%、4 → 34%、整塊 8 → 20%，open-loop 誤差累積曲線變成單參數研究；
- `instruction_mode: swapped` — 語言接地的量測；
- `vision_stem`（`conv` vs `patchify`）——以及一個關於混淆變因的警示：在 1,200 回合／45 epochs 預算下的控制變因雙臂研究量到 patchify 領先（成功率 0.85 vs 0.45）——完整故事（包含這次 A/B 如何糾正我們自己先前的歸因）見[論文重現：Early conv stems](paper-early-convs)；
- `demo_noise`、`chunk`、`flow_steps`、`flow_time_dist`（uniform vs pi0 式 beta），加上 LLM 波已開放的所有優化器/排程旋鈕。

`chunk` 要在 `PushWorldDemos` 與 `VLAModel` 之間一致，`image_size` 要在 `PushWorldEnv` 與 `VLAModel` 之間一致；`validate_graph` 加上第一個訓練批次會大聲抓出不一致。

研究走與 LLM 波相同的機制：`run_graph_experiments` 做 A/B（head 範式、stem）、`optimize_graph_parameters` 做掃描（`execute_k`、`demo_noise`）、`timeout_minutes` 設定單跑上限，頭條指標是 `success_rate`（最大化）。
