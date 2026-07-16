---
title: "Augur is live: our side project now forecasts on Europe's grid"
date: 2026-07-16
description: "A wind and solar forecaster we built on the side, mostly by pointing AI agents at the problem, is now live in production on Predico, the platform used by Belgium's grid operator, and gets scored against professional forecasters. Here is the honest scorecard, losses included."
keywords: ["energy forecasting", "wind and solar forecasting", "AI development", "agentic AI", "Predico", "Elia grid operator", "probabilistic forecasting", "production AI", "Eloquentix Augur", "renewable energy software"]
---

<p>
      We build software for clients for a living. On the side, a few of us have been building
      <a href="https://augur.eloquentix.com/" target="_blank" rel="noopener">Augur</a>, a wind and
      solar forecaster, mostly by pointing AI agents at the problem and staying honest about what came
      back. As of July 2026 it is live in production on Predico, the collaborative forecasting platform
      operated by INESC TEC and used by Elia, Belgium's grid operator. Every hour it submits a forecast,
      and every hour it gets scored against professional forecasters. No privileged access, no special
      data, same gate as everyone else.
    </p>

    <h2>What it actually does</h2>

    <p>
      Europe's grid runs on weather now. Every fifteen minutes the power market asks the same question:
      how much wind and solar will show up in a few hours. Guess wrong and the error settles in cash.
      Augur forecasts three countries (Germany, Belgium, Romania), submits hourly probabilistic
      forecasts, and scores every one against the grid operator's own forecast, including the times it
      loses. That last part matters more than the wins. A system that only reports its good days is a
      brochure. One that shows you where it is wrong is an instrument.
    </p>

    <h2>The honest scorecard</h2>

    <p>
      Short range is where the money is, because that is where imbalance gets priced. At fifteen minutes
      ahead, Augur beats the operator's continuously updated forecast by 40 to 78 percent. By about three
      hours out it is a tie. Past that, the operator's forecast is excellent and Augur does not pretend
      otherwise: it says so and steps back.
    </p>
    <p>
      Day ahead, it beats every covered operator's wind forecast by 10 to 16 percent, and beats Romania's
      solar forecast by 64 percent. Against an already excellent solar forecaster, it matches rather than
      beats. There is a simple rule under all of it: our edge is biggest exactly where the incumbent is
      weakest. A correction layer is worth the most where forecasting is currently done worst.
    </p>

    <h2>The part we find interesting</h2>

    <p>
      Augur was built in days, not months, by a small senior team working almost entirely through AI
      agents, on top of about 25 years of real energy-systems work. We ran E.ON's Virtual Power Plant for
      over a decade, so real-time energy is not a field trip for us. The interesting bit is not that AI
      wrote code. It is that a tiny team could ship a production forecasting system that holds up against
      professionals, fast, because the humans knew the domain cold and the agents did the legwork.
    </p>
    <p>
      That combination is the whole point, and it is roughly how we work with clients now: senior people
      who have done the hard version before, plus AI doing the parts that used to eat months. Augur is
      just the version where the client is us and the scoreboard is public.
    </p>

    <h2>Go watch it lose</h2>

    <p>
      It runs live at <a href="https://augur.eloquentix.com/" target="_blank" rel="noopener">augur.eloquentix.com</a>,
      losses and all. Some days the weather is hard and everyone forecasts badly, us included. We will show
      you those days too. If you have a hard software problem, especially one with real physics or real
      money moving through it, that is the shape of thing we like. The
      <a href="https://www.eloquentix.com/case-studies.html#augur" target="_blank" rel="noopener">longer write-up is here</a>.
    </p>
