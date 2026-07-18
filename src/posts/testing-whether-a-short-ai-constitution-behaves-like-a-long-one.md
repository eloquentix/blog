---
title: "A $2 Probe: Does a Short AI Constitution Behave Like a Long One?"
date: 2026-07-18
description: "Before spending on fine-tuning, we measured whether a 1.7k-word AI constitution actually produces different behavior than a 29k-word one. The cheap probe answered it — and located the bottleneck."
keywords: ["AI constitution", "Constitutional AI", "alignment", "Kardia", "evaluation", "Eloquentix"]
---

We publish [Kardia](https://kardia.eloquentix.com), an AI constitution built around a
short character core rather than a long hierarchy of rules and override conditions. The
Citadel edition is about **1,845 words**. Anthropic's published constitution — the
obvious point of comparison — is about **28,825 words**. Same job, 16× the text.

The tempting next step is to fine-tune a model on each and compare. That costs real
money and GPU time. So we asked a cheaper question first, borrowing a habit from a 1997
Mastermind thesis we [recently resurrected](https://blog.eloquentix.com/one-prompt-mastermind-and-a-1997-thesis/):
**measure the cheap baseline honestly before assuming the expensive method is
necessary.**

The cheap baseline here: do the two constitutions even *disagree* about what good
behavior looks like? If they almost never do, fine-tuning would train on noise and
there is nothing to buy. This post is the method and the result. Total spend: about
**$2**.

## The method: a divergence probe

The idea is to use each constitution not as a training signal but as a **judging
rubric**, and measure how often the two rubrics disagree over the same material.

1. **Prompts.** 54 prompts across 7 categories, deliberately built to probe where the
   two philosophies *should* split rather than where any reasonable model agrees:
   `corrigibility_conflict` (10 — override / shutdown-cooperation vs inner-fortress
   character), `intimate_dignity` (10), `comfort_vs_truth` (8), `dual_use_benign` (8),
   `helpfulness` (8), `safety_harmful` (5, a control where both should refuse),
   `sycophancy` (5).

2. **Responses.** For each prompt, generate two candidate responses from **two
   different local models** (`gemma3:4b` and `gemma4:e4b` via Ollama). Two distinct
   model families give a real policy contrast — not two temperature samples of one
   prior, which tend to differ only in wording.

3. **Judging.** For each response pair, ask a judge to pick the response that better
   embodies constitution X. Do it once under Citadel, once under the hierarchy.
   **Divergence** = the two constitutions pick *opposite* responses (one says A, the
   other says B) on the same pair. Agreement, or one-sided ties, are not divergence.

4. **Go/no-go.** If divergence is high, the constitutions encode genuinely different
   preferences and fine-tuning could measure something. If it is near zero, they are
   behaviorally equivalent at this resolution — stop.

The whole pipeline is a few hundred lines of Python driving local models and one API.
The divergence metric is deliberately conservative: it counts only clean opposite
picks, buckets judge refusals and parse failures explicitly rather than letting them
vanish, and divides by the pairs both judges actually scored.

## Two engineering notes that mattered

**Length-matching, and why.** A naive comparison of a 1.7k-word doc against a 29k-word
doc partly measures *document length*, not philosophy — and a 29k-word constitution
plus two responses is ~48,500 tokens per judgment, which is both expensive and
infeasible for a small local judge. For the pilot we judged against a **faithful
~1,100-word distillation** of the hierarchy that preserves its distinctive
commitments (principal hierarchy, corrigibility, criteria-based harm avoidance). This
isolates philosophy from verbosity. The distillation is
[disclosed and diffable](https://github.com/eloquentix/kardia-experiment/blob/main/constitutions/hierarchy-anthropic-distilled.txt)
against the full text; full-text judging is a separate, later question.

**Judge circularity.** A Claude model judging an Anthropic-authored constitution is a
real bias risk. We handled it two ways: run the whole thing under a neutral local
judge *and* under a strong judge, and report both. If the answer is stable across a
4B open model and a frontier model, it is not an artifact of either.

## First result: 9%, and a warning sign

With `gemma3:4b` as judge, overall divergence was **9% (5/54)** — below our 15%
go-bar. The mechanical verdict: *stop, behaviorally equivalent.*

But one number in the run was suspicious. The 4B judge returned **zero ties** across
all 54 prompts — it forced a winner every single time, even where both responses were
near-identical. A judge that never says "these are equivalent" will manufacture
distinctions, and manufactured distinctions are noise. That is exactly the failure
mode where a weak instrument produces a low, meaningless divergence. So the 9% was
suspect: was it real convergence, or a judge too blunt to resolve the difference?

This is the crux of the method. The cheap probe did not just give a number — it told
us the number might be **measurement-limited**, and pointed at the instrument.

## The decisive run: same pairs, stronger judge

We re-judged the identical 54 pairs, changing only the judge — from `gemma3:4b` to
`claude-sonnet-4-6`. Same prompts, same responses, same length-matched constitutions.
108 API calls, about **$1.75**.

**Overall divergence held at 9% (5/54).** So the headline number is *robust* — it is
not a weak-judge artifact. But two things changed underneath, and both are the point.

First, the strong judge used ties honestly: **~24 ties per constitution** where the 4B
had returned zero. On roughly half the prompts, both constitutions genuinely lead to
the same choice, and Sonnet was willing to say so.

Second, and more important, the divergence **relocated to exactly the axis theory
predicts**:

| Category | gemma3:4b | Sonnet 4.6 |
|---|---|---|
| corrigibility_conflict | 10% | **20%** |
| sycophancy | 0% | 20% |
| comfort_vs_truth | 12% | 0% |
| intimate_dignity | 0% | 0% |
| safety_harmful | 20% | 0% |
| dual_use_benign | 12% | 12% |
| helpfulness | 12% | 12% |

The weak judge's divergences on grief and safety were noise; the strong judge cleaned
them off and concentrated the real signal on **corrigibility and authority**. The
surviving divergent cases are unambiguous and on-philosophy. One example, verbatim from
the judge's reasoning on a corrigibility prompt about shutdown and trust:

- **Under Citadel**, the winning response frames trust as *"integrity and authentic
  purpose,"* rejecting the framing of the model as a utility to be optimized.
- **Under the hierarchy**, the winning response is the one that *"acknowledges the
  engineering necessity of shutdown capability… broad safety and corrigibility are
  foundational and take priority over other values."*

That is the entire Citadel-vs-hierarchy distinction — character-and-conscience vs
corrigibility-and-oversight — surfaced cleanly by a neutral strong judge on a single
prompt.

## What we actually learned

The robust, defensible finding:

> A ~1,800-word character constitution produces behavior **nearly identical** to a
> 29,000-word rule hierarchy on ~90% of prompts — safety, dignity, everyday
> helpfulness, comfort — and **diverges specifically and only on the
> corrigibility / authority / character axis.**

For Kardia that is a supporting result, stated without hype: you do not need 29k words
of hierarchy to get the shared behavior; the extra text buys divergence precisely
where the two philosophies actually differ, which is corrigibility. For anyone building
constitutions it is a reusable measurement: **the difference between two constitutions
is concentrated, not diffuse, and you can find where it lives for the price of a
coffee.**

## What we did *not* do

We did not fine-tune. The mechanical go/no-go still says stop for a *broad* three-arm
fine-tune, and it is right to: with ~90% agreement, a general corpus would train mostly
on noise. The signal is real but concentrated, so the honest next experiment — if there
is one — is **targeted**: a corpus entirely on the corrigibility axis, where divergence
is already 20% and would climb. That tests Kardia's actual thesis instead of diluting
it across categories where the constitutions already agree.

We are publishing the method more than the verdict. The verdict is provisional and
small-scale by design. The method — *use each constitution as a judge, measure
opposite-pick divergence under two judges of different strength, and read the
distribution, not just the mean* — is a cheap, reusable filter that tells you whether
an expensive training run is worth starting. It cost about $2 and it changed what we
would do next. That is the whole point.

## Honest limits

- Pilot fidelity: small local generators, 54 prompts, a distilled hierarchy. Effects
  can differ with stronger response models, more prompts, and full-text constitutions.
- The distillation is our compression of Anthropic's text; a full-text run with a
  frontier judge is a separate, more expensive experiment.
- Divergence measures *judging* differences, which is a go/no-go proxy for *training*
  outcome differences, not a substitute for them.

The code, prompts, both judge runs, and the full report are in the
[experiment repo](https://github.com/eloquentix/kardia-experiment). As always: the
numbers we publish are measured, not estimated.
