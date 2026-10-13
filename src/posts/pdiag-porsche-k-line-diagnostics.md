---
title: "pdiag: Open Diagnostics for an Old Porsche"
date: 2026-10-13
author: "Radu Rosu, Founder"
description: "An open source, read-only diagnostic tool for K-line era water-cooled Porsches, started for a 2002 996 Targa. Phase 0: protocol stack, CLI and a web UI, running against a simulated car."
keywords: ["Porsche 996", "K-line", "KWP2000", "OBD-II", "car diagnostics", "open source", "Bosch ME7.8", "Python"]
---

I drive a 2002 Porsche 996 Targa. Cars from that era talk to the outside world over a single wire called the K-line, and the tools that speak to it are either dealer equipment or aging Windows software with per-car licences.

So I started [pdiag](https://github.com/radurosu/porsche-kline-diag), an open, modern diagnostic tool for the water-cooled Porsches built roughly between 1997 and 2008: the 986 Boxster, 996, 997.1, 987.1 and the first Cayenne.

It reads the engine computer: live data, fault codes, identification, and the over-rev history that tells you whether a previous owner missed a shift. The web UI is built around a 996-style tach with those over-rev ranges painted on its rim, so live rpm and stored history sit on the same dial.

Two rules shape it. It is read-only: no coding, no flashing, and on purpose no clearing of fault codes, because erasing evidence is the last thing a tool used before buying a car should make easy. And it is clean-room: every identifier is decoded from my own captures, never from leaked dealer software.

Honest status: phase 0. The protocol stack, command line and web UI all run against a simulated car, with placeholder values. The cable is on its way, and the first real conversation with the 996 comes next.

GPL-3.0. The most useful contribution right now is data: a capture of another tool reading your car, with notes on what it showed.
