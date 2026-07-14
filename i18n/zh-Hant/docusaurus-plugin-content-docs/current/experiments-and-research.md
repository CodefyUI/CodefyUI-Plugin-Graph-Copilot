---
id: experiments-and-research
title: 實驗與研究
sidebar_label: 實驗與研究
---

# 實驗與研究

Graph Copilot 可以把 graph design 問題轉成有上限的比較研究：建立候選 variant、在不載入畫布的情況下執行、依 numeric metric 排名，並提出下一步分析。這適合快速 ablation 與 hypothesis generation；目前結果仍是 **pilot study**，不會自動變成論文等級證據。

## 已實作能力

`run_graph_experiments` 接受明確 variants；`optimize_graph_parameters` 則針對既有安全參數建立 deterministic search。兩者都需要 hypothesis、`maximize`／`minimize` objective，也可指定 repetitions、concurrency，並選擇是否套用最佳 variant。

Optimizer 接受 1–4 個既有 node 的 `int`、`float`、`bool` 或 `select` binding。`grid` 會完整列舉 Cartesian product，超過上限就拒絕而不截斷；`seeded_random` 使用 versioned `mulberry32-v1` planner、必填 uint32 seed 與不重複 assignments。此 seed 只重現 candidate planning，不會設定 graph node RNG。Secret、string、file、tensor、preset 與未知參數一律拒絕；產生的 `set_params` candidates 沿用同一核准、隔離、16-run budget、排名與 promotion guard。

| 限制 | 目前值 |
| --- | --- |
| 每次 variants | 最多 8 |
| 每個 variant repetitions | 1–5 |
| 總 executions | 最多 16 |
| concurrent executions | 預設 1，最多 2 |
| 每次 execution timeout | 10 分鐘 |
| browser-local studies | 最多 20 筆摘要 |
| portable study 保留數 | 10 個 content-addressed bundles |
| portable bundle import 大小 | 最多 5 MiB |

例如：

> 比較目前模型與 width 64、128、256；最大化 validation accuracy，每個跑三次，保留目前圖作 baseline，不要套用 winner。

任何候選開始前，Graph Copilot 都會在確認視窗列出所有會參與的 node type，以及經 schema-aware redaction 後的 candidate setting／parameter value。視窗也會顯示 candidate、repetition 與總 execution 數、concurrency、是否 promotion，以及節點可能寫檔、呼叫網路、使用 GPU 時間或產生 API 費用的提醒。Agent 不能替使用者核准。

## 隔離實驗迴圈

1. 取得 active graph 的 deep clone 與 fingerprint。
2. 在各自的 in-memory clone 套用每個 variant 的 GraphOps。
3. 先比照 CodefyUI frontend 檢查參數名稱、型別、select 選項與範圍，再用 `POST /api/graph/validate` 驗證；無效候選保留錯誤但不執行。
4. 經使用者明確核准後，把有效候選送到 `/ws/execution`。不儲存圖、移除 note node、設定 `record_outputs: false` 與獨立的 non-persistent execution identity；repetition 工作會交錯執行以降低單純的順序偏差。
5. 收集 `output_summary` 的 scalar number、numeric `progress` 與 client-observed runtime；不保留完整 tensor 或 output artifact。
6. 每次 attempted repetition 都保留 immutable scalar run record，包括 status、duration、objective identity/value/source、其他 numeric observations 與 error。只有所有預定 repetitions 都成功、都有 objective、且解析成同一 canonical metric identity，才計算 mean、sample standard deviation 與 descriptive 95% Student-t interval；若只有一個 explicit baseline，也會在 variance 允許時提供 direction-adjusted mean change 與 small-sample Hedges g。
7. 只有完整觀測且全研究使用同一 metric identity 的候選才會排名。最高 mean 完全相同時明確標示 tie，不使用容易受干擾的 browser runtime 決勝。Incomplete、missing-metric、inconsistent-key 或不可比較候選仍保留，但不能勝出。
8. 若要求 promotion，重新讀取 live graph。只有 winner 僅含已通過 preflight 的 `set_params`、期間未收到 graph-change event，且 fingerprint 一致，才透過 `api.graph.applyOperations` 套用。Structural winner 只保留可審查摘要；partial parameter failure 會明確回報。
9. 先產生 portable evidence，再儲存精簡摘要。Versioned bundle 會包含去敏 baseline、captured redacted variant GraphOps、repetitions／concurrency／promotion intent、逐次 scalar 與來源、derived result、producer／provenance facts 與明確 redaction report；系統對 canonicalized semantic content 計算 SHA-256 digest，採 blob-first、index-last 儲存。Capture 或 storage failure 只會成為 persisted warning，不會重跑已完成或已 promotion 的實驗。

這種隔離只保護畫布 graph state。節點的 file write、network call 等外部副作用仍可能發生。

## Portable studies 與候選圖

Portable study format v1 是 immutable evidence envelope，不是 executable code。選檔時會先嚴格檢查 keys、types、dates、size/depth/count/string limits、baseline graph references、variant `GraphOp` shapes、unique run slots 與 SecretRef locations。系統解析檔案後，會對 canonicalized semantic content 驗證 SHA-256；imported raw bytes 不必已採 canonical whitespace 或 key order。驗證刻意不要求每個 captured variant operation 都指向既有 baseline node，因為 invalid operation 也可能是已記錄的 failure evidence。此 preview **不寫入任何 storage**。只有另按 **Import read-only** 後，才會儲存 content-addressed blob 並把 evidence 投影到 Experiment Lab。Import 不會呼叫 validation、execution、`applyOperations` 或 network endpoint。

Bundle 保留每個 observed scalar key、canonical identity、collection source 與原始 derived summary。Import 時會由 raw run record 重新計算 derived statistics；不一致就拒絕，不會投影到 Experiment Lab，因此顯示與匯出不需模型重解 prose。這仍是 unauthenticated evidence：digest 不能證明作者是誰，也不能證明 observations 的確來自聲稱的 execution。Optimizer plan 與 planner seed 會作為 provenance fact；planner seed 仍不等於 graph node execution seed，browser runner 也不會自行配置 RNG seed。

Secret 不會被 hash、保留尾碼或局部揭露。Schema-declared secret、未知 schema／parameter、credential-shaped field，以及缺乏可信 schema 的 preset 會轉成有確切 JSON Pointer location 的 `SecretRef`。已知 secret 的 exact text echo 也會移除；但一般字串內藏的任意 credential 無法通用辨識，因此 provenance 會明載此限制，使用者仍不應把 secret 放進 label、hypothesis 或 chat text。

Experiment Lab 可以把 captured、redacted GraphOps 重新套到 verified redacted baseline，產生 host-shaped candidate JSON。未提供的 secret 會留空並顯示 warning。Portable v1 不保留實際送去 execution 的 exact prepared graph，因此 node-schema default 或其他 preparation 可能不同；captured invalid operation 也可能讓 derivation 明確失敗。這是 data-only convenience，不是 execution replay：它不開 tab、不改 live graph。現行 CodefyUI plugin contract 沒有 create-tab API，portable v1 也刻意不提供自動 replay 或不安全的 fork/re-sign shortcut。

## 選擇 metric

建議使用完整 key，例如 `metric-node.accuracy`。系統也接受 case-insensitive exact key、唯一的 node-type alias（例如 `Accuracy.accuracy`）、唯一 suffix（例如 `accuracy`），或 `auto`。

若 suffix 對應到多個不同數值，就不會被當成明確 objective。只有每個預定 repetition 都完成並輸出相同 resolved objective key 才能排名；成功執行但缺少 metric 的結果會保留，卻不能產生 winner。

## 可重現性 checklist

目前 runner 不會自動建立完整 reproducibility envelope。要把結果當成研究證據前，至少應：

1. 保留明確的 empty-operations baseline。
2. 目前 runner 每次 repetition 都重用同一候選圖，不會自動配置 seed。請在圖內建立明確 seed schedule，或分成 seed-specific studies；只有圖真的改變或自行隨機化時，才能稱為 independent seeds。
3. 固定並記錄 dataset、preprocessing、split 與 sampling order；不要用 final test set 調參。
4. 記錄 CodefyUI/plugin/node-pack revision、Python packages、device、driver 與 hardware。
5. runtime 比較使用 concurrency 1，避免 GPU contention。
6. 使用完整 metric key，確認所有候選比較的是同一語意量。
7. 以 portable study bundle 作為主要 evidence envelope，CSV 與 research brief 作為分析視圖。Bundle 會保留去敏 baseline、captured redacted GraphOps、recorded scalar／source 與經 cross-check 的 derived result；conversation history 只適合 continuity。這支援 evidence inspection，不是 execution replay 或 authentication。Bundle 仍不含 exact prepared execution graph、full tensor、checkpoint、artifact、dataset hash，若上游未提供，也不會憑空產生完整 environment fingerprint。
8. 以足夠且受控的獨立 seeds 驗證；普通 repetitions 只能顯示執行間變化，3–5 次通常仍只適合 pilot。
9. 外掛會回報 mean、sample spread、small-sample 95% Student-t interval，以及相對一個 explicit baseline 的 Hedges g。這些是 descriptive screening statistics；hypothesis test、multiple-comparison correction、power 與 practical-equivalence bound 仍需另做。
10. 在 held-out dataset、另一 benchmark 或另一環境 replicate。

`system.runtime_ms` 是方便的 screening 指標，不是校正過的 benchmark；browser scheduling、warm-up、cache、concurrent work 與 device utilization 都可能影響它。

## 從觀察到論文問題

只有能確認一個空白 baseline 與單因子 `set_params` variants 時，Agent 才會提出 ablation 類研究方向；其他 winner 會標成 replication lead。變異偏高時仍可提出 stability/sensitivity idea。這些是**下一個 hypothesis**，不是 novelty 或 significance 判定。

| 層級 | 問題 | 下一步需要的證據 |
| --- | --- | --- |
| Observation | 受控 pilot 中某個 variant 是否較高？ | 完整 metric、baseline、所有 values 與 failures |
| Mechanism | 哪個 component 造成差異？ | 單因子 ablation 與 confounder checks |
| Robustness | 效果能否重現？ | 更多 seeds、datasets、architectures、environments |
| Contribution | 結果是否新穎且重要？ | 文獻回顧、強 baselines、統計分析、可重現資料 |

不要只憑摘要宣稱「已證明更好」、「統計顯著」或「具新穎性」。外掛目前不做文獻搜尋，也不做 inferential statistics。

## 目前限制

- 協調器在瀏覽器，關閉或 reload 頁面後不能繼續。
- 沒有 durable queue、resumable job、worker lease、resource scheduler 或 distributed executor。
- 精簡摘要不含 raw graph spec；另外保留的 portable bundle 則包含去敏 baseline 與 captured redacted variant GraphOps。它仍不含 exact prepared execution graph，也不會自動發現 dataset/environment、node-pack revision、graph-node seed、checkpoint 或完整 artifact。
- Portable bundle 只存在 browser storage，最多 10 個、每個 5 MiB。其 mutation 與精簡 Lab session 清單都需要 exclusive Web Locks；若 browser 不支援，既有 evidence 仍可讀取，但新的 browser-local mutation 會 fail closed。SHA-256 是針對 parsed、canonicalized semantic content 驗證，因此 raw JSON formatting 改變不一定使檔案失效。Digest 與 raw／derived cross-check 只能提供 internal consistency，不能證明 authorship、provenance authentication 或聲稱的 runs 確實發生。
- Import 與 candidate materialization 都是 read-only／data-only；目前沒有 automatic replay、re-sign/fork、environment dependency resolver 或 CodefyUI candidate-tab API。
- 內建 search 僅限既有安全參數的 bounded complete grid 與 versioned seeded-random plan；尚無 Bayesian、evolutionary、early-stopping、successive-halving 或 multi-objective optimizer。
- automatic promotion 只支援 parameter-only winner，並同時檢查 graph-change event 與 fingerprint；structural winner 只保留摘要，而且 parameter promotion 也不是 server-side transactional compare-and-swap。
- Preset node 不會出現在 `getNodeDefinitions()`，因此目前會保守拒絕 preset parameter sweep，而不是猜測合成 schema。
- CodefyUI execution WebSocket 目前不會讀取 embedded preset definition；若 portable preset 不在 server registry，可能通過 validation 後仍在 execution 失敗，系統會把這個 host inconsistency 保留為 run evidence。
- Host API 不提供 active-tab identity 或 read-only-tab flag；revision 追蹤可捕捉一般 tab 切換，但真正綁定 tab 的 compare-and-swap 仍需新的 core contract。
- 自動 insight 只是後續研究提示。

詳見[架構](./architecture.md)與 [Agent roadmap](./roadmap.md)。
