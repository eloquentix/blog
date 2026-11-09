---
title: "After the Porsche, the Fiat: What's Left in a 2013 500e Battery"
date: 2026-11-09
author: "Radu Rosu, Founder"
description: "After building an open diagnostic tool for a Porsche 996, we wondered whether a 2013 Fiat 500e would give up its battery data too. It did: about 60 % of new, all 97 cells even, and a replacement pack with a story."
keywords: ["Fiat 500e", "used EV", "EV battery health", "battery capacity", "OBD", "OBDLink EX", "open source", "Mac", "Python"]
---

After we got the [Porsche 996 talking to a Mac](/pdiag-porsche-k-line-diagnostics/), we looked at the other car in the driveway, a 2013 Fiat 500e, and wondered whether it would give up its battery data too.

It matters more on the Fiat. The first-generation 500e is one of the cheapest used EVs you can buy, and almost all of its value is the battery. Two cars that look identical can differ by half their range. The dash won't tell you which one you have: it shows a charge percentage and a range guess that adapts to the last few drives, and no battery health figure anywhere.

The battery controller knows, though. So we asked it.

## What we built

**[e500](https://github.com/eloquentix/fiat-500e-battery-health)** reads the 500e's battery controller through the OBD port, with an OBDLink EX adapter (about $80) and a Mac. The Porsche speaks over a single K-line wire; the Fiat speaks CAN with long multi-part replies, so it needed a different adapter and a different tool, built on the same rules: it only reads, every request goes through an allowlist in code before it reaches the car, and it never clears fault codes.

## What the car said

Our 2013 500e, US spec, about 61,700 miles:

- **Capacity: 37.9 Ah, about 60 % of new.** We give a range of 57 to 63 %, because Fiat's rating for a new pack isn't published consistently; sources put it at 60 to 63 Ah.
- **Three independent checks agree:** the controller's own capacity figure, the current we measured while charging, and the current we measured while driving.
- **Real range: about 55 to 60 miles**, at the car's measured 4.5 miles per kWh at the battery. That matched what we already knew from driving it: the car really does about 60 % of what the dash's range estimate promises.
- **All 97 cells within 8 mV of each other.** The pack has worn evenly. No single weak cell.

<figure style="margin:1.5rem 0">
<img src="/public/posts/e500-cells-simulated.webp" alt="e500 cell-by-cell view of a Fiat 500e battery, simulated data" style="width:100%;height:auto;border-radius:10px">
<figcaption style="font-size:0.85rem;opacity:0.7;margin-top:0.4rem">Every cell, one tile each. Simulated data from the <a href="https://apps.eloquentix.com/fiat500/">demo</a>, not our car.</figcaption>
</figure>

## The "new" battery

The battery controller sits inside the pack, and it's a service part that gets programmed when it's fitted. Ours was programmed around the end of 2019, so that's when the pack was replaced. We'd been told it was a new pack. At about 60 % after roughly six years and 28,000 miles, a remanufactured or used pack is more likely. The data can't prove which, and we're not claiming it does. But if you're buying a 500e with a "new battery", this is the ten-minute check that tells you what that sentence is worth.

## A fault code we caused ourselves

Eleven modules answered, with six stored fault codes between them. One of the six was ours: early on we probed the car at the wrong bus speed, and a module logged it. We worked that out by dating the code against the module's internal clock. It's why the tool logs every byte it sends.

## What it doesn't do

It isn't the first tool to read a 500e; AlfaOBD, a paid Android app, already does. It doesn't show a manufacturer "state of health" percentage, because we couldn't find one on this car; it measures capacity directly instead. And it's tested on one 2013 car. The 2014 to 2019 cars should match, but nobody has checked yet.

## Try it

- **Demo, no car needed:** [apps.eloquentix.com/fiat500](https://apps.eloquentix.com/fiat500/). It's a simulated car, and says so.
- **Code and setup:** [github.com/eloquentix/fiat-500e-battery-health](https://github.com/eloquentix/fiat-500e-battery-health)
- **Own a 500e?** Run `e500 survey` (about two minutes) and send us the file, privately, since it contains your VIN. A car with a recently replaced pack is the most useful of all: it tells everyone what "new" actually reads.
- **Buying or selling one?** We're building verified battery reports: ten minutes plugged in, a shareable report a buyer can trust. Email [info@eloquentix.com](mailto:info@eloquentix.com?subject=Fiat%20500e%20battery%20report) to hear when it's ready.
