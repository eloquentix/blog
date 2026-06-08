---
title: "Testing Without Test Code: AI-Driven QA on Mobile Apps"
date: 2026-06-03
description: "What happens when an AI agent reads a scenario document and executes it on a real iOS simulator — adapting to layout shifts, verifying with screenshots, and writing the report itself."
keywords: ["AI-driven QA", "AI test automation", "mobile app testing", "agentic testing", "iOS simulator AI", "LLM testing", "scenario-based testing", "AI QA engineer"]
---

<p>
      Test automation has a dirty secret: the tests become a second codebase.
      XCUITest, Appium, Detox — they're all variations on the same idea.
      You write code that mimics a user. When the UI changes, you update the test code.
      When a third-party screen (a payment WebView, a deeplink landing) breaks an
      element ID, you find out in CI, three hours after the engineer went home.
    </p>
    <p>
      The problem isn't that test automation is wrong. It's that it optimizes for the
      wrong thing. It automates <em>mechanical execution</em>, not <em>judgment</em>.
      A senior QA engineer isn't valuable because they tap buttons faster.
      They're valuable because they notice that the keyboard shifted the layout and
      the coordinate they're tapping is now someone else's button. That's not codeable.
    </p>
    <p>
      We've been exploring a different approach with one of our clients — a consumer
      mobile app with a multi-path checkout flow. What we found is worth writing down.
    </p>

    <h3>What we did</h3>

    <p>
      Instead of writing test code, we wrote scenario documents. Plain Markdown.
      Each scenario describes a user journey as a sequence of actions and expected states —
      the kind of thing a QA engineer would write in a test plan, except structured
      enough that an AI agent can read it and know what to do.
    </p>
    <p>
      The agent runs on the real iOS simulator. It uses the OS-level accessibility tree
      to find elements, fires real keystrokes via <code>osascript</code>, launches deeplinks
      with <code>xcrun simctl openurl</code>, and takes screenshots at each step.
      It reads the scenario, executes it, and writes a report — in the same Markdown
      format, with the screenshots it took inline.
    </p>

    <p class="pull">
      The test run produces the documentation. The scenario document and the run report
      are the same artifact, in the same format, readable by anyone on the team.
    </p>

    <p>
      In a recent session we ran three order paths through a live Shopify checkout
      in the same test run — a shared-design deeplink, a merch-order deeplink, and a
      blank garment with artwork applied — all on a real simulator, all against the
      Bogus Gateway, all within about three minutes. Three successful orders, one
      network error recovered with a retry, and a post-checkout artist-name popup
      that was required on one path and correctly absent on the other two.
    </p>

    <h3>What makes this different</h3>

    <div class="compare">
      <div class="compare-col">
        <h4>Traditional automation</h4>
        <ul>
          <li>Tests are code — maintained separately from specs</li>
          <li>Brittle to element ID changes and layout shifts</li>
          <li>Binary output: pass or fail</li>
          <li>Blind to visual state — asserts on properties, not pixels</li>
          <li>Fails silently on third-party screens it can't inspect</li>
          <li>Writing new test coverage requires an engineer</li>
        </ul>
      </div>
      <div class="compare-col">
        <h4>AI-driven scenario execution</h4>
        <ul>
          <li>Tests are prose — the same document QA would write anyway</li>
          <li>Adapts to layout shifts; retries with revised coordinates</li>
          <li>Output is a narrative run report, not a boolean</li>
          <li>Takes screenshots and uses them as ground truth</li>
          <li>Operates on any screen the OS can see, including WebViews</li>
          <li>New scenario = new Markdown section, not new code</li>
        </ul>
      </div>
    </div>

    <h3>The adaptation problem</h3>

    <p>
      The most interesting thing we observed wasn't what went right — it was how
      the agent handled what went wrong.
    </p>
    <p>
      In a Shopify checkout WebView, when the keyboard appears, the entire layout
      shifts. The element coordinates from before the keyboard appeared are now wrong.
      In our session, the agent noticed that keystrokes were landing in the previously
      focused field rather than the intended one — because the element it tapped had
      moved after the keyboard pushed the layout up. It adapted: dismissed the keyboard
      between fields, re-queried element positions, and re-typed from a clean state.
    </p>
    <p>
      Traditional test code fails here. It has the old coordinates hardcoded, or it
      has a brittle query for an element ID that may or may not be in the right position.
      The agent doesn't have coordinates hardcoded — it has intent. It knows it's trying
      to fill the Card number field. When that fails, it figures out why and tries again.
    </p>
    <p>
      Similarly, after an artwork generation step that takes ~25 seconds, the accessibility
      tree returned the pre-generation UI even though the screenshot showed the
      generation was complete. The agent treated the screenshot as authoritative, ignored
      the stale accessibility dump, and continued correctly. That's a judgment call a
      static test runner can't make.
    </p>

    <h3>The report is the output</h3>

    <p>
      After each run, what you have is a Markdown document with:
    </p>
    <p>
      Screenshots at every significant step. A precise narrative of what happened.
      An INVESTIGATE section — written by the agent — that reads like a senior QA
      engineer's testing notes. Not vague failures. Specific observations: the coordinate
      trap created by the Pay Now button when the keyboard is up; the hypothesis that the
      network error on the third consecutive order may correlate with rapid back-to-back
      runs; the A11y buffering lag that appears specifically during state transitions.
    </p>
    <p>
      A product manager can read this document. A developer can act on the INVESTIGATE
      items directly. There's no translation step between "the test failed" and "here's
      what actually happened."
    </p>
    <p>
      This is the part that surprised us most. We expected the agent to execute steps.
      We didn't expect it to produce better QA notes than most human testers do.
    </p>

    <h3>What it doesn't replace</h3>

    <p>
      Unit tests, component tests, contract tests, snapshot tests — these are fine as
      code and should stay as code. They run fast, they're deterministic, they catch
      regressions at the right layer. Nothing here changes that.
    </p>
    <p>
      What this replaces is the expensive, brittle, high-maintenance end-to-end UI test
      suite that everyone has and no one trusts. The one that's 40% flaky, passes locally,
      fails in CI, and takes a dedicated engineer to maintain. That suite exists because
      there was no better option for exercising real user flows on real device surfaces.
      Now there is.
    </p>

    <h3>Where this is going</h3>

    <p>
      The scenario documents are the asset. Once you have them, you can run them
      against any build, on any simulator, triggered by CI or by a human. The agent
      adapts to UI changes without requiring the scenario to change — unless the
      actual user flow changes, in which case updating a Markdown document is the
      right level of effort anyway.
    </p>
    <p>
      We're running this on a production mobile app with a real payment integration,
      multiple checkout paths, deeplinks, artwork generation, and multi-screen flows.
      It works. The runs produce reports we actually read, flag issues we act on,
      and require no test code to maintain.
    </p>
    <p>
      If you're carrying a failing E2E suite, or if your mobile QA process is a
      human doing the same taps before every release, it's worth a conversation.
    </p>

    <p><a href="mailto:start@eloquentix.com">start@eloquentix.com →</a></p>
