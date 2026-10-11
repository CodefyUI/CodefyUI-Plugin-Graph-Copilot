---
id: paper-early-convs
title: "Early Convolutions Help Transformers See Better (NeurIPS 2021)"
sidebar_label: Early conv stems
---

# Early Convolutions Help Transformers See Better

**Paper:** Xiao, Singh, Mintun, Darrell, Dollar, Girshick (FAIR), NeurIPS 2021,
[arXiv:2106.14881](https://arxiv.org/abs/2106.14881).
**Canvas instantiation:** `VLAModel.vision_stem` — `conv` (stacked stride-2
3x3 convolutions) vs `patchify` (the original ViT stem) on the PushWorld VLA
pipeline, everything else held fixed.
**Verdict: did NOT reproduce at this scale — the effect measured in the
opposite direction.** And that negative is exactly why this page exists.

## What the agent did

The PDF went into the chat as an attachment. Graph Copilot (Codex
gpt-5.6-sol, max effort) summarized the claim correctly — ViT's
optimization difficulties trace to the large-kernel, large-stride patchify
stem; replacing it with a few overlapping 3x3 stride-2 convolutions speeds
convergence, stabilizes AdamW/lr/wd sensitivity, and adds ~1-2 ImageNet
top-1 points — then stated a falsifiable hypothesis, restored the canvas VLA
pipeline to a 45-epoch research configuration, and ran a two-arm
`run_graph_experiments` study: same data (both arms generated the identical
30,803 samples), same budget, same seed, `vision_stem` the only manipulated
variable.

## Measured results (single seed, 20 rollout episodes per arm)

| vision_stem | success_rate (max) | final train_loss | final val_loss |
| --- | ---: | ---: | ---: |
| conv | 0.45 | 0.288 | 0.526 |
| **patchify** | **0.85** | **0.197** | **0.513** |

The patchify arm won on every measure — the paper's direction did not
survive transplantation to a 3M-parameter action policy on 96px synthetic
frames with 8px patches.

The agent's own caveats, verbatim in spirit: one seed per arm, a pilot by
the tool's own standards; the paper's "optimizability" claim also spans
optimizer/schedule/lr/wd sweeps this study did not run; and the two stems
were not FLOP-matched (3.34M vs 3.17M parameters) the way the paper matches
compute by trimming transformer blocks. Enough to say the mini-version did
not reproduce; not enough to say anything about the paper's regime.

## Why this is plausible, not embarrassing

The paper's effect lives at ImageNet scale: 224px images, 16px patches (a
196-token bottleneck over rich natural images), tens of millions of
parameters, and the instability of large-batch AdamW. This transplant is
96px synthetic renders, 8px patches (already a fine 12x12 grid), 3M
parameters, and a warmup-cosine schedule that itself repairs much of the
optimization pathology the conv stem was fixing. Mechanisms have regimes;
this one's did not extend down.

## What the exercise proved about the SYSTEM

Before this study, our own prototype notes attributed a large quality gap
to the conv stem — but the prototype had changed the stem and the dataset
size in the same iteration. The controlled A/B exposed that confound: at
this budget the stem attribution was wrong, and the honest history is now
recorded in the node's parameter description. A tool that can catch its own
authors' confounded claims within one approval is the tool you want running
your ablations.
