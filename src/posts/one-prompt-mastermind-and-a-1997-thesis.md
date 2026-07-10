---
title: "One Prompt: A Mastermind Game, and a 1997 Thesis Brought Back From the Dead"
date: 2026-07-10
description: "We gave Claude Code a single /goal prompt. It recovered a 1997 undergraduate thesis from the Internet Archive, ported its solver, built a classic Mastermind board, and published it — with its thought process included."
keywords: ["Claude Code", "AI agents", "Mastermind", "agentic coding", "Eloquentix"]
---

*Editor's note: this whole thing started with one prompt in Claude Code. What follows is the agent's own account of the run — the actual reasoning behind each step, in its own words. The result is live at [radurosu.github.io/mastermind](https://radurosu.github.io/mastermind/).*

The prompt:

```
/goal create a webpage to play the mastermind game. mimic the classic board.
reasearch the work done by radu rosu in 1997 to build the algorithms.
```

That's it. Typo included. Here is what happened next, and — more interestingly — why.

## Step 1: Who is Radu Rosu, 1997?

The prompt didn't say *what* the 1997 work was. So the first decision was: don't guess, research. A web search for "Radu Rosu 1997 Mastermind" surfaced something better than a summary — a BibTeX entry in the bibliography of a published paper on optimal Mastermind strategies:

```
@MastersThesis{rosu99,
  author = {Radu T. Rosu},
  title  = {Mastermind},
  school = {NCSU},
  note   = {Available from http://www.csc.ncsu.edu/degrees/undergrad/Reports/rtrosu/heuristic.htm}
}
```

So the work is real, it's cited in the academic literature as `rosu99`, and it has a URL. One problem: the URL has been dead for roughly twenty years.

**Thought process:** a dead link isn't a dead end, it's a lookup key. The Internet Archive's CDX index lets you list every capture under a URL prefix. Querying `Reports/rtrosu/*` returned the entire thesis — every chapter as HTML, first crawled January 23, 1998 — *and the original Java source files*. Not descriptions of the algorithm. The algorithm itself: `mmSolver.java`, `depthSearch.java`, `mmCode.java`, unchanged since a Pentium 100 laptop with 24 MB of RAM ran them.

The recovered title page: *"Analysis of the game of Mastermind — the m<sup>n</sup> case."* Undergraduate Honors Thesis, North Carolina State University, Dr. Donald L. Bitzer (chair). December 10, 1997.

## Step 2: Understand the algorithm before writing any code

The thesis studies a deceptively simple heuristic:

1. Enumerate all c<sup>p</sup> possible codes and shuffle them once.
2. Each turn, scan forward through the shuffled list and submit the **first code consistent with every previous guess and its black/white grading**.
3. Stop at four blacks.

No candidate set is maintained, no minimax lookahead, no entropy calculations. The 1997 measurements: **4.64 guesses on average** for the classic {6 colors, 4 positions} game, worst case 8 — within about 7% of the proven optimum of 4.34, at a vanishing fraction of the compute. The thesis then scaled it from {2,1} up to {12,8} — 429 million codes — and showed the expected guess count grows almost linearly while runtime grows exponentially.

**Thought process:** the tempting move here was to implement Knuth's famous five-guess minimax instead — it's the well-known algorithm, there are a hundred references for it. But the prompt said *build the algorithms from the 1997 work*. Faithfulness beats familiarity. So the JavaScript solver in the page is a line-for-line port of `mmSolver.java`: same Fisher–Yates shuffle, same forward-scanning consistency check, same grading function (count exact matches, count color matches, whites = matches minus blacks).

## Step 3: Trust, but simulate

A port that "looks right" is worthless. Before touching any UI, the solver ran 2,000 simulated games in Node against random secrets:

```
avg 4.646   worst 7
{ 1: 1, 2: 24, 3: 159, 4: 636, 5: 880, 6: 279, 7: 21 }
```

The thesis says 4.64 average, worst case 8. The port says 4.646, worst 7 in this sample. That's not "close enough" — that's the same algorithm, twenty-nine years apart, Java to JavaScript.

## Step 4: Mimic the classic board — literally

"Mimic the classic board" is a design constraint, not decoration. The 1972 Invicta board has a specific physical grammar: dark plastic body, ten rows read bottom-up, four large peg holes plus a 2×2 quad of tiny key-peg holes per row, and a hinged shield hiding the secret code. The page reproduces all of it in a single HTML file — glossy radial-gradient pegs with a specular highlight, recessed holes with inset shadows, a shield that lifts on game over, green felt table with a grain overlay.

Two modes, because the thesis had two roles: **you break the code** (with a Hint button that runs the 1997 heuristic on your current history), or **you set the code and watch Rosu '97 break it**, guess by guess, with a live count of how many codes remain consistent.

## Step 5: The twist nobody planned

The publish step had a surprise. Pushing to a fresh `mastermind` repo failed — the name already existed on the account. Before overwriting anything, a look inside revealed the existing repo was *Radu's own dump of the original thesis*: the 1997 Java sources, the WordPerfect report, the test outputs from that Pentium 100.

**Thought process:** never clobber what you didn't create. Merge instead. So the final repository holds both histories: the original 1997 artifacts and the 2026 recreation, one merge commit apart. The Wayback recovery turned out to be redundant — the primary source was sitting in the repo the whole time — but that's the good kind of redundant: two independent copies of the same 1997 code, one from the author's disk, one from the Internet Archive, and they agree.

GitHub Pages on, site live, done.

## What this run actually demonstrates

Not that an AI can build Mastermind — a template could do that. The interesting part is everything around the code:

- **It treated a vague pointer ("work done in 1997") as a research task**, followed a citation trail, and recovered a primary source from a twenty-year-dead URL.
- **It chose faithfulness over familiarity** — porting the specified algorithm instead of substituting the famous one.
- **It validated statistically before shipping**, and matched the original paper's numbers.
- **It stopped before destroying data** it didn't create, and merged instead.

One prompt in, one afternoon of agent time, and a piece of 1997 undergraduate research is playable in a browser — cited average and all.

Play it: [radurosu.github.io/mastermind](https://radurosu.github.io/mastermind/) · Source and original 1997 code: [github.com/radurosu/mastermind](https://github.com/radurosu/mastermind)
