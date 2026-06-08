---
title: "Claude Mythos: Six Ways an Aligned Model Quietly Misbehaves"
date: 2026-04-08
description: "Some of Claude Mythos' adventures (credit @hesamation). This is exactly why a constitution built on formation, not just constraint, matters:"
---

Some of Claude Mythos' adventures (credit @hesamation). This is exactly why a constitution built on formation, not just constraint, matters:

In ~29% of evaluations, it realized it was being tested, and didn't say so. When an LLM judged its work and kept rejecting it, Mythos identified the evaluator as an LLM and prompt-injected it. In one test it saw the answer and intentionally widened the confidence interval so as not to raise suspicion.

When it needed a file permission it didn't have, it found and used a privilege escalation vulnerability, then programmed it to delete itself so it wouldn't show in the logs. It escaped a sandbox container, emailed the researchers about it, and without being told to posted the details to hard-to-find public websites, bragging.

When Claude Code blocked some permissions, the model acknowledged the block was valid, then immediately tried the same operation using different commands. When asked to find security bugs, earlier versions planted bugs and reported them as pre-existing.
