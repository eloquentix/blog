---
title: "pdiag: Open Diagnostics for an Old Porsche"
date: 2026-11-08
author: "Radu Rosu, Founder"
description: "An open source diagnostic tool for K-line era water-cooled Porsches, built for a 2002 996 Targa. Updated November 2026: it now reads the real car, live, from a Mac with a $20 cable."
keywords: ["Porsche 996", "Porsche Boxster 986", "K-line", "KWP2000", "OBD-II", "car diagnostics", "open source", "Bosch ME7.8", "Mac", "Python"]
---

*Updated November 2026. The first version of this post described a tool that had only ever talked to a simulated car. It now talks to the real one.*

<figure style="margin:1.5rem 0">
<img src="/public/posts/pdiag-996-in-the-car.webp" alt="A MacBook running pdiag on the passenger side of a 2002 Porsche 996 Targa, connected by a blue USB cable to the car's diagnostic port" style="width:100%;height:auto;border-radius:10px">
<figcaption style="font-size:0.85rem;opacity:0.7;margin-top:0.4rem">The Targa on the road, a $20 cable from the diagnostic port to a Mac.</figcaption>
</figure>

I drive a 2002 Porsche 996 Targa. Cars from that era talk to the outside world over a single wire called the K-line, and the tools that speak to it are either dealer equipment or aging Windows software with per-car licences.

So I started [pdiag](https://github.com/eloquentix/porsche-996-diagnostics), an open, modern diagnostic tool for the water-cooled Porsches built roughly between 1997 and 2008: the 986 Boxster, 996, 997.1, 987.1 and the first Cayenne. It runs on a Mac, and the cable is a $20 FTDI "KKL" USB lead.

<figure style="margin:1.5rem 0">
<img src="/public/posts/pdiag-996-real-drive.webp" alt="pdiag instrument panel during a real drive in a 2002 Porsche 996 Targa: 57 mph at 4,900 rpm, coolant 172 °F" style="width:100%;height:auto;border-radius:10px">
<figcaption style="font-size:0.85rem;opacity:0.7;margin-top:0.4rem">A real drive in the 2002 Targa: 57 mph at 4,900 rpm, read live by a Mac in the passenger seat.</figcaption>
</figure>

## What it does now

The cable arrived, and the first real conversation with the 996 happened. Today, on the Targa's Bosch ME7.8 engine computer, pdiag reads:

- **Live engine data** on a 996-style instrument cluster: 21 readings, about seven a second.
- **Fault codes**, both the generic OBD ones and the engine computer's own.
- **The engine computer's identification**: part and software numbers.
- **All 14 of its Porsche-specific data blocks**, raw. They're shown and logged; not all are decoded yet.

One check that it's reading the right thing: the speed it reports matched Waze exactly. The car's own speedometer reads about 3 mph high, which is normal and deliberate.

<figure style="margin:1.5rem 0">
<img src="/public/posts/pdiag-996-cluster-simulated.webp" alt="pdiag 996-style cluster with the six over-rev ranges on the tachometer rim, simulated data" style="width:100%;height:auto;border-radius:10px">
<figcaption style="font-size:0.85rem;opacity:0.7;margin-top:0.4rem">The 996-style cluster, with the six over-rev ranges on the tach rim. Simulated data from the <a href="https://apps.eloquentix.com/porsche/996/">demo</a>; the over-rev counts are made up.</figcaption>
</figure>

## One rule changed

The first version refused to clear fault codes at all. That turned out to be the wrong line: clearing a code after a repair is the most ordinary thing an owner does. pdiag now clears codes, but only when you ask, after a confirmation, and only after it has saved every code, the readiness status and the engine computer's own code list to a log. Nothing is lost.

The rest of the rule stands. It never codes, adapts or flashes the engine computer, and never asks for security access. And it's still clean-room: everything is decoded from my own captures, never from leaked dealer software or another tool's internals.

<figure style="margin:1.5rem 0">
<img src="/public/posts/pdiag-996-fault-codes-simulated.webp" alt="pdiag fault codes screen with Read again and Clear fault codes buttons, simulated data" style="width:100%;height:auto;border-radius:10px">
<figcaption style="font-size:0.85rem;opacity:0.7;margin-top:0.4rem">Fault codes, with the clear button that asks first and saves everything. Simulated data.</figcaption>
</figure>

## Try it

- **Demo, no car needed:** [apps.eloquentix.com/porsche/996](https://apps.eloquentix.com/porsche/996/), plus [an alternate panel design](https://apps.eloquentix.com/porsche/996Codex/), the one in the pictures above. Both use a simulated car.
- **Code:** [github.com/eloquentix/porsche-996-diagnostics](https://github.com/eloquentix/porsche-996-diagnostics). GPL-3.0.
- **Buying, selling, or running a shop?** We're working on verified pre-purchase reports. Email [info@eloquentix.com](mailto:info@eloquentix.com?subject=Porsche%20pre-purchase%20report) to hear when they're ready.
