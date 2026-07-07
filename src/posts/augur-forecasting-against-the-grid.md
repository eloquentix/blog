---
title: "An Energy Forecaster That Grades Itself Against the Grid Operator"
date: 2026-07-07
description: "Augur forecasts wind and solar for three European countries and scores every forecast against the grid operator's own — including where it loses. Why the baseline you beat is the whole story, and what honest energy forecasting actually looks like."
keywords: ["energy forecasting", "wind and solar forecasting", "probabilistic forecasting", "forecast benchmarking", "TSO forecast", "grid forecasting AI", "renewable energy forecasting software", "Predico Elia collaborative forecasting", "conformal prediction energy", "day-ahead wind forecast"]
---

<p>
      Europe's grid increasingly runs on weather. Every fifteen minutes the power market asks the
      same question: how much will wind and solar produce a few hours from now? Get it wrong and the
      error settles in cash: imbalance charges, redispatch, reserves called that didn't need to be.
      Forecasting is not a dashboard nicety here. It is the price signal.
    </p>
    <p>
      We built <a href="https://augur.eloquentix.com/" target="_blank" rel="noopener">Augur</a>, a system
      that forecasts wind and solar production for Germany, Belgium and Romania, to do the
      one thing most forecasting vendors quietly avoid: grade itself against the strongest available
      baseline, in public, including where it loses.
    </p>

    <h2>The baseline you beat is the whole story</h2>

    <p>
      When someone tells you their forecast is "accurate," the only useful follow-up is: accurate
      compared to what? Accuracy in a vacuum is a number with no meaning. A forecast is only as good
      as the baseline it improves on.
    </p>
    <p>
      The most common baseline in vendor decks is <em>persistence</em> — the assumption that the next
      hour looks like the last one. Beating persistence is trivial. Weather has structure; any model
      that learns a little of it clears that bar. So "we beat persistence" is not a result. It is a
      red flag. It tells you the vendor picked the weakest possible opponent and won.
    </p>
    <p>
      The honest baseline is the one the market actually uses: the grid operator's own forecast. Each
      transmission system operator (TSO) publishes its forecast for wind and solar, and updates it
      continuously as new weather data arrives. That is a strong, professionally maintained, moving
      target. If you want to claim you forecast the grid well, that is the thing you have to beat.
    </p>

    <h2>What Augur does</h2>

    <p>
      Augur is an unattended system. It pulls weather and production data, produces probabilistic
      forecasts, not just a single number but a distribution with calibrated uncertainty, and
      submits them hourly to <a href="https://predico-elia.inesctec.pt/" target="_blank" rel="noopener">Predico</a>,
      the collaborative forecasting platform run for Elia, Belgium's grid operator. Then it scores
      every submission it makes against the operator's own published forecast, and records the result
      whether it won or lost.
    </p>
    <p>
      That last part is the point. A system that only reports its wins is marketing. A system that
      reports where it loses, and defers there, is an instrument you can actually trust.
    </p>

    <h2>The results, honestly stated</h2>

    <p>
      Short-range is where the value concentrates, because that is where imbalance is priced. At
      fifteen minutes ahead, Augur beats the operator's continuously updated forecast by 40–78%,
      and reaches parity with it around three hours out. Past that horizon the operator's forecast is
      excellent and Augur does not claim to beat it — it says so and defers.
    </p>
    <p>
      Day-ahead, where planning happens: Augur's wind forecast beats every covered operator by 7–11%
      RMSE at the same cutoff, and its Romania solar day-ahead forecast runs 64% better than
      Transelectrica's. Its prediction intervals are calibrated: roughly 80% of actual outcomes land
      inside the 80% interval, which means the uncertainty it reports is the uncertainty you actually
      get, not decoration.
    </p>
    <p>
      It has run live since June 2026, hourly, with no missed submission gates. Numbers will move as
      the system evolves; the discipline of measuring them against the right baseline will not.
    </p>

    <h2>What this says about how we build now</h2>

    <p>
      Augur was built in days by a small senior team working with AI agents on top of 25 years of
      real-time energy-systems engineering. That combination is the whole thesis. The AI agents move
      fast; the energy experience keeps the speed pointed at the right problems, and the honesty
      discipline keeps the claims defensible.
    </p>
    <p>
      We spent a decade running energy infrastructure at grid scale, dispatching assets, balancing
      markets, holding TSO-grade reliability. Augur is what it looks like to put modern AI on top of
      that foundation instead of starting from a demo. It is unglamorous in exactly the right way: it
      forecasts, it scores itself, and it tells you where it is wrong.
    </p>
    <p>
      You can watch it run — including the losses — at
      <a href="https://augur.eloquentix.com/" target="_blank" rel="noopener">augur.eloquentix.com</a>,
      and read the longer story in our
      <a href="https://www.eloquentix.com/case-studies.html#augur" target="_blank" rel="noopener">case studies</a>.
    </p>
