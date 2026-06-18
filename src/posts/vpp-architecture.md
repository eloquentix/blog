---
title: "Real-Time at Scale: Architecture Lessons from E.ON's Virtual Power Plant"
date: 2026-05-29
description: "12 years building E.ON's Virtual Power Plant — dispatching 400 assets simultaneously across four countries. What the architecture looks like, what failed, and what it teaches about real-time systems at TSO grade."
keywords: ["virtual power plant software", "energy software architecture", "real-time energy dispatch", "Scala Akka microservices energy", "VPP architecture", "TSO ancillary services software", "aFRR software", "energy grid software engineering"]
---

<p>
      We have been building E.ON's Virtual Power Plant since 2012. That's 12 years of the same
      codebase, the same team, and the same fundamental problem: dispatch heterogeneous energy assets
      in real time, across four countries, under TSO-grade reliability requirements.
      400 assets dispatched simultaneously at peak. 99.99% uptime per annum.
      Individual failures must resolve in under 30 seconds.
    </p>
    <p>
      Here is what we learned. Some of it you could have found in a textbook. Most of it
      you couldn't — because it came from operating a system like this for twelve years,
      watching what actually breaks and why.
    </p>

    <h2>The problem is harder than it looks</h2>

    <p>
      A Virtual Power Plant aggregates distributed energy resources — solar farms, wind turbines,
      battery storage, CHPs, industrial loads — and dispatches them as a unified entity in the
      wholesale energy markets. The VPP operator participates in ancillary services (aFRR in Germany
      requires activation within seconds), intraday and day-ahead trading, and bilateral agreements
      with TSOs.
    </p>
    <p>
      Each asset is heterogeneous: different protocols, different response times, different
      degradation curves, different regulatory treatment per country. Coordinating them requires
      a dispatch layer that can issue commands, track confirmation, handle non-response, and
      re-dispatch — all within tight time windows. TSO ancillary service participation means the
      grid itself is waiting for your response.
    </p>

    <p class="pull">
      "99.99% uptime per annum" sounds like a marketing number. For a system participating in
      ancillary service markets, it's a contractual obligation. Failure to respond means financial
      penalties and potential exclusion from the market. We've maintained this for twelve years.
    </p>

    <h2>The architecture</h2>

    <p>
      The VPP platform is built on Scala and Akka, backed by Lightbend's production stack.
      The choice of Akka was deliberate: the actor model gives you the right primitives for
      a system where every asset is an independent entity with its own state, its own
      communication patterns, and its own failure modes. An asset actor knows its own state.
      The dispatch layer knows what it's asked assets to do. These don't need to agree
      in real time — the system is designed to be consistent eventually and correct immediately
      where it counts.
    </p>
    <p>
      The deployment runs in a high-availability cross-datacenter configuration using Docker
      and Consul. Cross-datacenter failover is not a disaster recovery scenario — it's part
      of normal operations. We designed for the assumption that any single datacenter could
      fail at any time. That assumption has been validated.
    </p>
    <p>
      The trading layer — simultaneous participation in Intraday, Day Ahead, Wholesale, and
      TSO ancillary markets — runs as a separate service cluster with its own state management.
      Market rules change per country, per market, per product. The architecture keeps market
      logic composable rather than baked in.
    </p>

    <h2>What failed</h2>

    <p>
      The failures worth talking about are the ones that were architecturally surprising —
      the ones where the system behaved correctly according to its specification but wrong
      according to the real world.
    </p>

    <p><strong>Asset state drift.</strong> In the early years, we had a category of failure
    where the system's belief about an asset's state diverged from the asset's actual state.
    The system would issue a dispatch command, receive confirmation, and later discover the
    asset hadn't actually responded as confirmed. The fix was not just better monitoring —
    it was redesigning the confirmation model to treat asset acknowledgment and physical
    execution as two separate events requiring separate verification. They are not the
    same thing. Many systems treat them as the same thing.</p>

    <p><strong>Cascading timeout storms.</strong> When many assets report failure or non-response
    simultaneously — during a grid event, for example — the retry logic competes with the
    dispatch logic for the same resources. We learned that timeout handling needs to be
    designed for correlated failures, not just independent ones. When one asset fails,
    others often fail at the same moment for the same reason. Your retry budget needs to
    account for this.</p>

    <p><strong>Protocol version mismatches at the edge.</strong> Asset firmware updates
    change communication protocols. The platform has to speak to assets running different
    firmware versions simultaneously. We built a protocol negotiation layer early — but
    not early enough. There were production incidents caused by protocol assumptions
    baked into dispatch logic before the negotiation layer existed. Protocol handling
    should be the first thing you build, not a refinement.</p>

    <h2>What we'd do differently</h2>

    <p>
      Build the observability layer before the first production asset. We knew we needed
      observability. We underestimated how specifically we needed it: per-asset telemetry,
      per-market telemetry, per-protocol telemetry, correlated across all three. The work
      of retroactively adding structured observability to a production system is harder
      than building it in from the start — especially when you can't take the system down
      to do it.
    </p>
    <p>
      Take the regulatory requirements more seriously at the data model level, earlier.
      Different countries treat the same energy product differently for regulatory purposes.
      We had a data model that was physically correct before it was regulatory-correct.
      Retrofitting regulatory treatment onto a production data model is expensive.
      Design the data model to be regulatory-aware from the start, even if the
      regulatory requirements evolve.
    </p>

    <h2>What it teaches</h2>

    <p>
      Real-time systems at scale are a discipline, not a trick. The right technology choices
      matter — Akka's actor model was the right choice for this problem, and choosing it
      before the industry consensus validated it meant we had 12 years of refinement
      before most of the field understood why it worked. But technology choices compound
      with architectural discipline. The actor model doesn't save you from bad state
      management; it gives you better tools for good state management.
    </p>
    <p>
      The team continuity matters as much as the architecture. The engineers who built
      the VPP in 2012 understand things about the system that can't be documented.
      They know which assumptions were convenient rather than correct. They know where
      the debt is. They know which parts of the system are load-bearing in ways
      the architecture diagram doesn't show. Twelve years of the same team on the
      same codebase is an asset that doesn't appear on any balance sheet.
    </p>
    <p>
      If you're building energy software, grid infrastructure, or real-time dispatch systems
      and want to talk architecture: <a href="mailto:start@eloquentix.com">start@eloquentix.com →</a>
    </p>
