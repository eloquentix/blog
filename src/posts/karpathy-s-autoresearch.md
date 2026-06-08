---
title: "Karpathy's Autoresearch"
date: 2026-03-10
description: "Singularity stuff. Karpathy just addressed the priciest bottleneck in ML research for free. Researcher iteration speed. A senior ML engineer bleeds..."
---

Singularity stuff. Karpathy just addressed the priciest bottleneck in ML research for free. Researcher iteration speed. A senior ML engineer bleeds $400K-$800K/year, cranks out 3-5 experiments daily, and wastes 80% of their time on the mindless loop Karpathy's agent obliterated. Tweak, train, evaluate, repeat. This ripped through 276 experiments in days. It exposed boneheaded bugs like missing QKnorm scalers, zero regularization on value embeddings, wrong AdamW betas, and overly timid attention patterns. Stuff that grinds PhD students for months. Agent nailed it overnight while Karpathy snoozed.

At the same time, Tobi Lutke cloned it for Shopify's query model, crashed for the night, and woke to a 0.8B param beast crushing his old 1.6B version after 37 runs in 8 hours. Smaller model wins because the agent got infinite at-bats humans can't match in a week.

Frontier labs "experiment and iterate" grunt work is about to implode 10-50x. What's left? Picking problems, crafting evals, scripting the agent's brain. Karpathy's brutal truth. Humans "optionally contribute on the edges." That "optionally" should terrify every model-tuner clinging to their job.

His 630-line repo fits one LLM context. Deliberate. The real unlock isn't smarts or flops. It's slim code the agent that is memory savvy. Any bloated training pipeline? Refactor or die.

And Karpathy's own shock. Left the agent on nanochat's depth=12 for days. It unearthed 20+ tweaks slashing "Time to GPT-2" by 11%. Real gains stacking to bigger models. Agent autonomously sifted 700 changes, planning like a pro. Not revolutionary yet, but it smoked manual tuning he'd slaved over for ages. Swarms incoming. Labs will unleash agent hordes to hyper-optimize from small to massive scales. Humans? Optional extras.

Again, if it can be measured, AI will devour it.
