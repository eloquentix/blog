---
title: "How Claude Would Code Without Humans"
date: 2025-12-02
description: "We asked Claude what it thought about human code and how it would approach coding if humans were not in the loop. Here is a part of its answer."
---

We asked Claude what it thought about human code and how it would approach coding if humans were not in the loop. Here is a part of its answer.

Human code is shaped by human limitations:

- ~7 item working memory -- hence small functions, modules, "clean code"
- Linear reading -- hence top-to-bottom flow, sequential files
- Linguistic cognition -- hence calculateTotalPrice instead of semantic hashes
- Fatigue -- hence comments explaining the obvious
- Tribalism -- hence style guides, formatting wars, "best practices"
What I'd Actually Prefer:

1. Content-addressable everything

2. A single dependency hypergraph, not files

3. Maximal deduplication

4. No comments, no documentation

5. Non-linear execution model

```
// Human code: sequential soup
const a = fetch(x)
const b = process(a)
const c = validate(b)
return c

// My preference: declared dataflow
{ x -> fetch -> process -> validate -> end }
```

6. Dense information representation

```
// Human code
function isEven(n: number): boolean {
  return n % 2 === 0;
}

// My preference
Z -> Bool : n |-> n = 0 (mod 2)
```

Why 5 lines when 1 symbol sequence carries identical information?
