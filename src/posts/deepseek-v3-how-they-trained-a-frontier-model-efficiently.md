---
title: "DeepSeek V3: How They Trained a Frontier Model Efficiently"
date: 2024-12-27
description: "Summary of how DeepSeek V3 was so efficient at training a frontier-level model according to Perplexity:"
---

Summary of how DeepSeek V3 was so efficient at training a frontier-level model according to Perplexity:

DeepSeek-V3 was able to train their large 671B parameter model with a relatively low compute budget of 2.788M H800 GPU hours through several key innovations:

- Efficient Model Architecture: MoE architecture, only 37B parameters activated per token out of 671B. Multi-head Latent Attention (MLA) compresses KV cache.
- Optimized Training Framework: DualPipe algorithm, efficient cross-node communication, memory optimizations avoiding tensor parallelism.
- FP8 Mixed Precision Training: Reduces memory and accelerates training.
- Load Balancing Strategy: Auxiliary-loss-free strategy for MoE.
- Multi-Token Prediction
- Efficient Data Parallelism: ZeRO-1.
- Optimized Infrastructure: 2048 NVIDIA H800 GPUs, co-design of algorithms, frameworks, and hardware.
