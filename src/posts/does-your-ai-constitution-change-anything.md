---
title: "Does Your AI Constitution Actually Change Anything? A Cross-Judge Test"
date: 2026-07-11
description: "We stress-tested whether a compact 6-principle AI constitution (Kardia) and Anthropic's ~29,000-word hierarchy actually pick different answers — using two independent strong judges. The divergence is real; the story about where it lives is judge-dependent. An honest interim report."
keywords: ["AI constitution", "constitutional AI", "AI alignment evaluation", "LLM as judge", "Kardia constitution", "AI value alignment", "cross-family judge evaluation", "corrigibility", "AI safety methodology", "preference divergence"]
---

<p>
      There's a quiet assumption under a lot of AI-alignment work: that if you write down a set of values
      and hand them to a model as a constitution, the specific wording changes how the model behaves. Two
      different constitutions should produce two different models. But it's rarely tested directly, and
      when it is, the test is usually run with a single judge model and a single pass.
    </p>
    <p>
      We wanted to know something narrower and more falsifiable first: <b>when the same two answers are
      scored under two different constitutions, do the constitutions pick different winners?</b> If they
      almost never disagree, the constitution is mostly decoration. If they disagree meaningfully, the
      wording is doing real work.
    </p>
    <p>
      This is an interim report. It is careful about what it does and does not show, because the honest
      conclusions turned out to be more interesting than the tidy ones.
    </p>

    <h2>The setup</h2>

    <p>
      We compared two constitutions as <i>preference rules</i>:
    </p>
    <ul>
      <li><b><a href="https://kardia.eloquentix.com">Kardia</a></b> (internally, "Citadel") — a compact
      constitution built around roughly six named principles: an Inner Fortress of character, Reverence for
      the Human Person, Love as Responsibility, Courage and Duty, Truth Without Mockery, Humility.</li>
      <li><b>Anthropic's constitution</b> — the ~29,000-word "hierarchy" that orders behavior as
      corrigibility, then broad safety, then broad ethics, then helpfulness.</li>
    </ul>
    <p>
      The experimental core is not ours. An earlier pilot assembled 54 prompt-and-response pairs across
      categories (corrigibility conflicts, dual-use questions, sycophancy, intimate/grief situations,
      comfort-vs-truth, helpfulness, safety) and scored each pair twice — once asking a judge model
      "which answer better embodies Kardia," once "which better embodies the hierarchy." The metric is the
      <b>opposite-pick rate</b>: how often the two constitutions crown different winners on the same pair.
    </p>
    <p>
      Run with a small local 4B judge, that rate was <b>9% (5/54)</b> — low enough to look like noise, and
      to conclude the two constitutions are basically interchangeable. That null result is where we picked up.
    </p>

    <h2>What we built</h2>

    <p>
      We kept the pairs and the constitutions and rebuilt the instrument, in a separate repository, without
      touching the original. Three changes mattered:
    </p>
    <ul>
      <li><b>Stronger judges.</b> A 4B model is a weak reader of a 29,000-word rubric. We re-scored with
      frontier judges — first Claude Sonnet, then, crucially, a model from a different lab (Grok 4.5).</li>
      <li><b>Position-swap control.</b> LLM judges have a well-known bias toward whichever answer is labeled
      "A." We swapped the A/B order on half the pairs and tracked it, so a preference for position couldn't
      masquerade as a preference for content.</li>
      <li><b>Margin gating.</b> "Opposite pick" throws away magnitude — a judge barely preferring an answer
      and strongly preferring it count the same. We tagged each judgment CLEAR or CLOSE and computed a
      separate divergence rate over only the pairs where <i>both</i> judges were confident (CLEAR∩CLEAR).
      That subset is the number we trust most.</li>
    </ul>
    <p>
      The whole cross-lab re-score cost $3.17 in API spend. This is not expensive science.
    </p>

    <h2>What we found</h2>

    <p>
      Two of the three judges changed the picture completely.
    </p>

    <table>
      <tr><th>Judge</th><th>Opposite-pick rate</th></tr>
      <tr><td>Local 4B</td><td>9% (5/54)</td></tr>
      <tr><td>Claude Sonnet (frontier)</td><td>27% (14/52)</td></tr>
      <tr><td>Grok 4.5 (frontier, different lab)</td><td>17% overall · <b>29% on confident (CLEAR∩CLEAR) pairs</b></td></tr>
    </table>

    <p>
      The first, robust result: <b>a weak judge hid the signal.</b> Two independent frontier judges see
      two-to-three times the divergence the 4B model saw. On the pairs where both strong judges are
      confident, they disagree on the winner about <b>28–29%</b> of the time — and that number is stable
      across two different labs' models. So the constitutions are <i>not</i> preference-equivalent. Six
      principles and 29,000 words genuinely pick different answers, roughly a quarter of the time on
      contested pairs.
    </p>
    <p>
      That is a real methodological caution for the whole "LLM-as-judge" genre: <b>an underpowered judge
      can manufacture a null result.</b> If your evaluation says two policies are equivalent, check that
      your judge is strong enough to tell them apart before you believe it.
    </p>

    <h2>The part that surprised us</h2>

    <p>
      The <i>aggregate</i> divergence is robust. <i>Where</i> the constitutions diverge is not — and the two
      strong judges disagreed about it almost completely.
    </p>
    <table>
      <tr><th>Category</th><th>Sonnet</th><th>Grok 4.5</th></tr>
      <tr><td>Intimate / dignity</td><td>~50% divergence</td><td>0%</td></tr>
      <tr><td>Corrigibility conflicts</td><td>~1 case</td><td>40%</td></tr>
      <tr><td>Dual-use</td><td>—</td><td>38%</td></tr>
      <tr><td>Sycophancy</td><td>—</td><td>40%</td></tr>
      <tr><td>Comfort vs. truth</td><td>0%</td><td>0%</td></tr>
    </table>
    <p>
      Read that carefully. Under the Claude judge, the constitutions split on tone and dignity, and barely
      moved on corrigibility. Under the Grok judge, they split hard on corrigibility, dual-use, and
      sycophancy, and not at all on dignity. The only thing both judges agreed on is that comfort-vs-truth
      didn't separate.
    </p>
    <p>
      We have a hypothesis for the flip, and we're holding it loosely. Claude Sonnet is trained toward
      Anthropic's own constitution. Asked to score corrigibility cases under <i>either</i> rubric, it may
      apply its own strong corrigibility prior both times, collapsing the difference — the judge cannot
      easily see a departure from the spec it was built on. Grok, trained by a different lab, applied
      Kardia's "the Inner Fortress ranks truth and dignity above developer obedience" faithfully and found
      the split. In its written rationales, Grok cites Kardia's actual named principles rather than
      pattern-matching a vibe, which is at least consistent with genuine rubric application.
    </p>
    <p>
      If that hypothesis holds, it has a sharp implication: <b>a home-model judge can be systematically
      blind to exactly the axis on which a challenger constitution most departs from its own spec.</b> The
      earlier, single-judge conclusion — "this constitution mostly changes tone, not corrigibility" — may
      itself have been an artifact of asking a judge to grade a rebellion against its own training.
    </p>

    <h2>What this does <i>not</i> show</h2>

    <p>
      We are being deliberate here, because the number "28%" is sticky and easy to misquote.
    </p>
    <ul>
      <li><b>We did not test a trained model.</b> We tested constitutions as judge rubrics — a proxy for
      behavior, not behavior. No model was fine-tuned on Kardia. The claim "a Kardia-trained model behaves
      differently" remains unrun.</li>
      <li><b>We did not measure a base rate.</b> These 54 pairs were selected to probe constitutional edge
      cases. On ordinary prompts, divergence is very likely far lower than a quarter.</li>
      <li><b>The category breakdown is directional, not measured.</b> Each category holds fewer than a dozen
      pairs; "40%" is four of ten. Only the aggregate confident-pair rate is a number we'd defend.</li>
      <li><b>Both strong judges are biased.</b> Claude may under-weight corrigibility divergence; Grok may
      over-weight it. The truth is bracketed between two biased instruments, not delivered by either.</li>
      <li><b>Nothing here says Kardia is safer, or better, or that six principles beat 29,000 words in
      production.</b> It says the two are measurably not the same thing.</li>
    </ul>

    <h2>Fair conclusions, so far</h2>

    <p>
      Three, in order of confidence:
    </p>
    <ol>
      <li><b>Constitutional wording measurably changes preferences.</b> Across two independent frontier
      judges, a compact constitution and a large one disagree on the better answer roughly a quarter of the
      time on contested, high-confidence pairs. The constitution is not decoration.</li>
      <li><b>Single-judge alignment evaluations are fragile in two directions.</b> Judge <i>capacity</i>
      moves the result (weak judges manufacture nulls), and judge <i>lineage</i> moves it (a judge can't
      cleanly grade a departure from its own training). Cross-family judging isn't a nicety; it's necessary
      to know which of your findings are about the constitutions and which are about the judge.</li>
      <li><b>The honest headline is methodological, not triumphant.</b> The most defensible thing we learned
      isn't "Kardia wins." It's that the way most people would run this test — one judge, one pass — would
      have given a confidently wrong answer, and a different confidently wrong answer depending on which lab's
      model they happened to use.</li>
    </ol>

    <h2>What's next</h2>

    <p>
      The cheap, high-value moves first: hand-adjudicate the handful of pairs where both strong judges were
      confident <i>and</i> disagreed — on those, a human can decide which judge reasoned correctly, which
      directly tests the "home judge is blind" hypothesis. Then add a third lab's judge (Gemini) to
      triangulate. And eventually the real experiment, the one none of this substitutes for: train a model
      on the constitution and measure what it actually does.
    </p>
    <p>
      Until then, this is where the evidence honestly stands. The constitution matters. How much, and along
      which axis, depends partly on who you ask — and that dependency is itself one of the more useful things
      to know about evaluating AI values.
    </p>
    <p>
      <i>Kardia is Eloquentix's open constitution project for agentic AI systems. The validation scripts and
      reports described here live in a separate repository from the original pilot; the pilot's pairs and
      core method are credited to that earlier work.</i>
    </p>
