---
title: "Apple iCloud at Scale"
date: 2025-01-30
description: "Listening to AAPL earning, I heard that their services revenue is running at 105b/year with a 14% growth rate. Double clicking on that, they have over..."
---

Listening to AAPL earning, I heard that their services revenue is running at 105b/year with a 14% growth rate. Double clicking on that, they have over 1b service customers and over 1.5 active iPhones. And going deeper they need to keep that 100% secure and 99.9% up.

I ran this through some of my chat friends and here is what that means:

Storage: 1B users x 5GB = ~5 exabytes raw. With 3x replication: ~15 EB total.

Network Traffic: 1.5B devices x 50MB = ~75 PB daily sync. Photo/video uploads: ~10 PB daily. Total: ~85-100 PB daily.

Compute: 1B users / 10,000 = ~100,000 CPU cores. Memory: ~400TB RAM.

Data Centers: 6-8 major regions globally. Each 50-100 megawatts. Total: ~500 megawatts.
