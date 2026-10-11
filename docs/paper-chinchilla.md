---
id: paper-chinchilla
title: "Training Compute-Optimal LLMs - Chinchilla (NeurIPS 2022)"
sidebar_label: Chinchilla IsoFLOP
---

# Training Compute-Optimal Large Language Models (Chinchilla)

**Paper:** Hoffmann et al. (DeepMind), NeurIPS 2022,
[arXiv:2203.15556](https://arxiv.org/abs/2203.15556).
**Canvas instantiation:** a mini IsoFLOP profile on TinyStories — three
(model size, token budget) pairs at a strictly equal compute budget
C = 6·N·D, ranked on a fixed 131,072-token held-out `val_loss`.
**Verdict: the headline claim reproduced emphatically at two budgets; the
interior IsoFLOP valley did not appear in the swept range, and the agent
diagnosed why.**

## What the agent did

Reading the PDF, the agent recovered the paper's machinery precisely — the
C ≈ 6ND accounting, the IsoFLOP protocol (fix C, sweep model size, set
each model's tokens from the constraint, match the cosine schedule to the
training length), and the fitted exponents N_opt ∝ C^0.49, D_opt ∝ C^0.51.
It then built the full 14-node TinyStories chain on an empty canvas and
derived its own configurations: bodies (d128,L2), (d256,L4), (d384,L6)
with head dim 32 and d_ff = 4d, N approximated as the non-embedding
12·L·d² (a declared, deliberate simplification), and integer step counts
2592 / 324 / 96 at batch 8 x seq 128 so all three arms satisfy the same
C ≈ 6.26x10^12 FLOPs exactly. Seed, tokenizer, data order, and the
held-out set were pinned across arms.

## Round 1 — C ≈ 6.26x10^12

| body | steps | tokens | val_loss | perplexity |
| --- | ---: | ---: | ---: | ---: |
| **d128 L2** | **2592** | **2.65M** | **3.726** | **41.5** |
| d256 L4 | 324 | 332k | 4.661 | 105.6 |
| d384 L6 | 96 | 98k | 5.482 | 240.2 |

Monotonic, not a valley: the smallest model, fed the most tokens, wins
outright. The agent's read: the optimum lies at or beyond the small end —
the budget is too small for every swept size. Rather than stopping, it
proposed a second profile at 10x compute, scaled the token budgets and the
data cap to match, and kept the same held-out set.

## Round 2 — C ≈ 6.26x10^13 (agent-initiated)

| body | steps | tokens | val_loss | perplexity |
| --- | ---: | ---: | ---: | ---: |
| **d128 L2** | **25,920** | **26.5M** | **2.476** | **11.9** |
| d256 L4 | 3,240 | 3.32M | 3.083 | 21.8 |
| d384 L6 | 960 | 983k | 3.715 | 41.0 |

Still monotonic — and one cross-budget comparison carries the whole paper:
**d384 with 10x the compute (3.715) landed where d128 was at 1x (3.726).**
Misallocating the budget into parameters instead of data burned an order
of magnitude of compute for nothing. That is the Gopher-vs-Chinchilla
argument, measured locally in 36 seconds of GPU time.

## The honest scorecard

- **Reproduced:** the claim that made the paper famous — at fixed compute,
  an undertrained large model loses to a smaller model trained on more
  tokens, at both budgets, monotonically.
- **Not reproduced (yet):** the interior valley. The agent's diagnosis:
  with GPT-2's 50,257-entry tied embedding, a d128 model is
  embedding-dominated, so the body-only 12Ld² accounting misallocates D;
  the true optimum sits below the smallest swept size. Its prescribed next
  steps — extend to d64-96, redo the accounting embedding-inclusive,
  repeat over 3-5 seeds — are exactly what a reviewer would ask for.
- Single seed per point, one run each: a pilot by the tool's own labeling.

## Why this one matters for the pitch

The agent read a 40-page paper, derived a compute-accounting scheme,
built a 14-node pipeline from nothing, ran a controlled profile, judged
its own result insufficient, and self-proposed the follow-up sweep that a
human scaling-law researcher would run next — all inside two approvals.
