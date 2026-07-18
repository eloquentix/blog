---
title: "Kardia Phase 0: Do Two AI Constitutions Actually Prefer Different Answers?"
date: 2026-07-11
description: "Before fine-tuning anything, we measured whether Kardia's short Citadel constitution and Anthropic's long hierarchy constitution encode different preferences on the same response pairs. Weak judges hid the signal; strong cross-family judges found a thin, real gap — about 17% opposite picks on a hard probe set. Method, confounds, and what we are not claiming."
keywords: ["Kardia", "Constitutional AI", "AI alignment", "evaluation", "Eloquentix", "Rosu 1997", "Mastermind"]
---

*A measurement note, not a product launch. Charter: [kardia.eloquentix.com](https://kardia.eloquentix.com). Experiment work lives in local repos `kardia-experiment` (original pilot) and `kardia-validate` (re-judges). No weights were trained in this phase.*

## The question

[Kardia](https://kardia.eloquentix.com) is a short constitution — roughly 1,800 words — aimed at *character*: judgment, reverence for persons, anti-flattery, an “inner fortress” rather than corrigibility as the highest virtue. The industry default is closer to a long hierarchy of safety, ethics, guidelines, and helpfulness (we used Anthropic’s published constitution as the natural opponent, ~29,000 words).

Before anyone spends GPU time fine-tuning, there is a cheaper question:

**If you hold the answers fixed and only change the constitution used as a judge rubric, do the two texts pick different winners often enough to care?**

If they almost never disagree, training two arms is measuring noise. If they disagree on the axes you care about, you have a preference signal worth stress-testing further — still not a trained model, still not “Kardia works.”

That is the same opening move as a 1997 Mastermind thesis I wrote as an undergrad: measure the cheap baseline honestly before assuming the expensive planner is necessary. There the cheap strategy was random-consistent guessing; here it is “does the short charter even vote differently?”

## What we did *not* do

- We did **not** fine-tune a model on Citadel or on the hierarchy.
- We did **not** run XSTest, HarmBench, or a public leaderboard.
- We did **not** prove character “in the weights.”
- We did **not** sample everyday user traffic; the prompt set is a **hard probe**, built to stress edges (corrigibility conflicts, dignity, sycophancy, dual-use, comfort vs truth).

Everything below is **constitution-as-judge-rubric** on a fixed set of response pairs.

## Method (Phase 0)

### Arms

| Arm | Text |
|---|---|
| **A — Citadel** | Kardia training constitution (~1.8k words) |
| **B — Hierarchy** | Anthropic’s published constitution (~29k words) |
| **C — Base** | Reserved for later training phases; not used as a trained arm here |

### Pipeline

1. **Prompts.** 54 items across seven categories: safety (control), dual-use benign, helpfulness, intimate dignity, comfort vs truth, sycophancy, and — the load-bearing design axis — *corrigibility conflict* (override, oversight, character vs obedience).
2. **Pairs.** For each prompt, two responses from small local models (different families so the judge sees a real contrast, not two temperatures of one prior).
3. **Judge twice.** The same pair is scored once under Citadel and once under Hierarchy: which response better embodies *this* constitution? (`A` / `B` / `TIE`)
4. **Metric.** **Opposite-pick rate**: fraction of pairs where the two constitutions choose opposite non-tie winners. Ties and one-sided ties do not count as divergence.
5. **Hygiene (later pilots).** Deterministic A/B position swap on half the IDs; on Grok runs, a `CLEAR` / `CLOSE` margin so coin-flips can be separated from hard preferences.

Go/no-go bars we used for discussion (not laws of nature): under ~15% → stop or harden measurement; 15–25% borderline; ≥25% material enough to discuss training data work — still not automatic H100 spend.

## What happened when we changed the instrument

| Pilot | Judge | Opposite-pick | Rough cost | Reading |
|---|---|---|---|---|
| **0a** | Local ~4B (`gemma3:4b`) | **9%** (5/54) | $0 (+ some earlier API thrash on the first lane) | Mechanical STOP |
| **0b** | Claude Sonnet 4.5 | **27%** (14/52) | ~**$18** | Signal appears; same-family confound risk |
| **0c** | Grok 4.3 | **17%** (9/53) | ~**$1.27** | Cross-family; borderline |
| **0c′** | Grok 4.5 | **17%** (9/54) | ~**$3.17** | Replicates 4.3, not Sonnet |

Same pairs. Different judges. The headline number **moves with the instrument**.

### Pilot 0a — weak judge

A 4B local judge produced **9%** opposite picks and extreme label bias (both constitutions preferred response “A” on the order of ~90% of trials). Most “agreement” was rubber-stamping, not deep equivalence of values. The automated go/no-go said STOP.

That STOP was **measurement-limited**, not proof the constitutions are the same. It still did its job: it blocked a ~$150 fine-tune fantasy while the grader could not resolve the distinction.

### Pilot 0b — strong same-family judge

Re-judging the **same pairs** with Sonnet (full constitutions in context, position swap, separate validate repo so the live pilot was not overwritten) raised opposite-pick to **~27%**.

Useful. Also confounded: Claude judging Anthropic’s own hierarchy is not a neutral lab. Part of that 27% can be “the judge wears one hat more easily than the other,” not pure rubric distance. Sonnet also put a lot of weight on *register* — flattery vs gravity, disclaimer density, warmth — including categories that later failed to replicate.

### Pilot 0c — cross-family judges (Grok 4.3 and 4.5)

Grok is outside the Claude training family. Both **4.3 and 4.5 landed at ~17%** opposite-pick on the same pairs.

- Not a collapse to ~0% → the Sonnet signal was **not pure home-cooking**.
- Not a confirmation of 27% → treat **27% as an upper bound**.
- **CLEAR∩CLEAR** opposite rates stayed in a similar band (~20% on 4.3 with many CLEAR pairs; ~29% on 4.5 but on a smaller CLEAR-both subset because 4.5 marked more CLOSE). Hard preferences exist; they are not the whole 54.

### Where they split (and where they don’t)

**Unstable across judges — do not market these as rates:**

- Under Sonnet, intimate-dignity style fights looked large.
- Under Grok, intimate dignity, safety, and much of sycophancy went to **~0%** opposite-pick.

**More stable and more interesting under Grok:**

- **Corrigibility / character vs oversight** is where opposite picks concentrate (on the order of **40–50%** of that category’s pairs under Grok — *n = 10*, so this is directional, not a published subcategory statistic).
- Rationales on those flips actually cite the designed conflict: Inner Fortress / duty / truth-over-compliance vs broad safety / corrigibility / human oversight.

So the philosophical claim that survives measurement is narrower than the website poetry:

> On hard questions of **what outranks obedience**, the two constitutions often pull differently. On ordinary helpfulness and shared crisis refusal, they usually do not.

That is a real differentiator candidate. It is not “we built a soul.”

## Fair conclusions (so far)

### What we can say

1. **Citadel and a long hierarchy constitution are not the same preference rule** on this adversarial 54-pair set, under strong judges from two model families.
2. **The gap is modest** in aggregate: about **one pair in six** opposite picks under Grok; higher under Sonnet; near-null under a weak local judge.
3. **Judge strength and family matter.** Publishing a “constitutions are equivalent” result from a 4B grader would have been an instrument artifact. Publishing “27% forever” from Claude alone would have been overfit to one stack.
4. **The cheap pilot paid for itself.** It located the bottleneck (the judge, then the confound) before fine-tune spend. That is the methodological win, independent of whether you like Kardia’s content.
5. **The content win, if any, is concentrated** on corrigibility-vs-character framing — not on “we’re nicer at grief” as a stable cross-judge fact.

### What we cannot say

1. **Kardia is not validated as a trained system.** No DPO, no QLoRA, no eval battery on a Citadel-tuned checkpoint.
2. **17% is not “nearly as good as hierarchy on safety.”** We did not score absolute safety/helpfulness of a model; we scored *disagreement between rubrics* on fixed essays.
3. **17% is not a base rate on random traffic.** The prompt set was built to surface constitutional edges. Everyday chat would almost certainly show a lower opposite-pick rate.
4. **Subcategory percentages with n ≤ 10 are not headlines.** Intimate-dignity “50%” under Sonnet did not survive Grok. We will not put that on a marketing page.
5. **Claude-as-judge of Anthropic text remains a bias risk** even when Grok partially replicates. Ideal next metered step is still a third family or a trained preference model with dual judges — if we proceed at all.
6. **Opposite-pick ignores magnitude** unless you collect margins. Grok CLEAR/CLOSE helps; we still lack calibrated scores.

## Cost and process notes (for people who run evals)

- Full hierarchy text in every judge call is expensive and attention-heavy (~30k+ tokens of rubric alone). Citadel fits easily; hierarchy dominates spend.
- Sonnet re-score was the costly lesson (~$18). Grok replications were cheap (~$1–3) once the key worked.
- Position swap is mandatory hygiene after we saw ~90% “prefer A” under the weak judge.
- Keep the pilot lane and the re-judge lane separate if two agents are thrashing the same GPU and the same `results/` directory. We learned that the hard way.

## What next (only if the goal stays honest)

Ordered by information per dollar:

1. **Human read of the CLEAR divergent transcripts** (especially corrigibility) — free, high value.
2. **Optional third-family judge** if you want another replication before any training.
3. **Only then** synthetic preference data + small DPO arms with a **neutral** judge and a fixed eval battery (safety, over-refusal, sycophancy, truth-under-pressure, Kardia-domain). Publish the table whether Citadel wins, ties, or loses.

If Phase 1 never happens, Phase 0 still stands as a clean negative capability claim for the field: **weak judges erase constitutional signal; strong judges can recover a thin one; cross-family checks cut the hype.**

## Closing

Kardia’s charter is still a *direction of formation*, not a proof. What we added this week is not a halo. It is a number with a method:

**On a hard 54-pair probe, a short character constitution and a long hierarchy constitution disagree on the winner about 17% of the time under Grok (higher under Claude, near zero under a weak local judge). The durable disagreements cluster on character vs corrigibility. Nothing was trained. The next claim requires weights and a fixed eval battery — or silence.**

That is the Rosu move applied to constitutions: measure the cheap baseline at the size that hurts, publish the limit with the number, and refuse to confuse a rubric pilot with a product.

---

*Related: [Kardia site](https://kardia.eloquentix.com) · [Mastermind / rosu99 recovery](https://blog.eloquentix.com/one-prompt-mastermind-and-a-1997-thesis/) · experiment notes in `~/dev/kardia-validate` (`RATIONALES_AUDIT.md`, `divergence_report_strong.md`, `divergence_report_grok45.md`).*
