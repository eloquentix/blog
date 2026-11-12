---
title: "94,000 Faces, No Cloud: Face Recognition for 25 Years of Family Photos"
date: 2026-11-11
author: "Radu Rosu, Founder"
description: "How we built face recognition for 25 years of family photos on a laptop: SCRFD, ArcFace, Chinese Whispers, SQLite, and a human in the loop. Nothing left the house."
keywords: ["face recognition", "family photos", "on-device AI", "ArcFace", "SCRFD", "InsightFace", "Chinese Whispers", "SQLite", "numpy", "privacy", "photo deduplication"]
---

Every family has a version of this problem. Twenty-five years of pictures spread across a backup box in the closet, three old laptops, two phones and an iCloud account. There are folders called `poze dell` and `pics from the old mac`, copies of copies, and cameras whose clocks were never set. You know the pictures are in there somewhere. You just can't find any of them.

We decided to fix ours properly: index everything, remove the duplicates without losing a single original, and make it possible to ask "show me every picture of grandma at the seaside". That last question is a face-recognition problem. Family photos are about as private as data gets, so we set one rule before writing any code: **nothing leaves the house.**

The whole thing runs on a MacBook Air. Open models, numpy, one SQLite file. No GPU, no vector database, no cloud API.

**81,000 photos and videos. 94,000 faces found. 35,000 named. Zero bytes uploaded.**

## The ground rules

The guardrails mattered more than any model choice, so here they are first.

- **The original archive is read-only.** All work happens on a copy. A script that can move a file can also lose one.
- **Nothing is deleted outright.** A delete moves the file to a `deleted/` folder that keeps the original folder structure and gets a README saying what happened and when. Duplicates go to `deletedDuplicates/` the same way. At any moment, *library + deleted + duplicates* must add up to the original, and we check that file by file.
- **The human decides.** The machine suggests, and a person confirms. Every click is logged next to what the app had suggested.

## The pipeline

1. **Pick** one copy per picture.
2. **Detect** faces with SCRFD, plus 5 landmarks each.
3. **Align** each face to the 112×112 template.
4. **Embed** it with ArcFace into 512 dimensions.
5. **Group** faces with a k-NN graph and Chinese Whispers.
6. **Name** a person, with suggestions. This step is a human.

### Detection and embedding

We use InsightFace's `buffalo_l` pack, run through onnxruntime on the CPU. Faces are found by the **SCRFD** detector (`det_10g`) and turned into vectors by an **ArcFace** ResNet-50 trained on WebFace600K (`w600k_r50`). We tried Apple's CoreML backend expecting a speed-up. It was about five times *slower* for these models, so it's off.

- Duplicates are grouped first, by perceptual hash and exact match. Only the largest copy of each picture is analysed.
- Each picture is decoded at 1600&nbsp;px on its long side, with the EXIF orientation applied. The detector runs at 640×640 with confidence 0.5 and NMS 0.4. Faces smaller than 20&nbsp;px are dropped, and at most 40 are kept per picture.
- Five landmarks per face drive a similarity transform (Umeyama) onto the standard ArcFace template. The aligned 112×112 crop goes through the recogniser.
- Out comes a 512-dimensional vector, L2-normalised and stored as a float16 blob in SQLite next to the face box, plus a 128&nbsp;px crop for the UI.

### Grouping without a vector database

Because the vectors have unit length, cosine similarity is a plain dot product. A k-nearest-neighbour graph over 40,000 faces (k&nbsp;=&nbsp;15), brute force in numpy and in chunks, takes about **19 seconds**. At this scale a vector database would only add moving parts.

The graph is clustered with **Chinese Whispers**, a weighted label propagation. Every face starts with its own label, then repeatedly takes the label carrying the most edge weight among its neighbours, until nothing changes or 20 rounds pass. It needs no number of clusters up front, which matters when you don't know how many people are in your own photos. Only edges with similarity ≥&nbsp;0.5 count. Only clear faces are grouped: at least 40&nbsp;px wide with a detection score of 0.65 or more. Small, blurry faces caused more wrong merges than any threshold we tuned.

### The human in the loop

Grouping turned 40,000 unnamed faces into about 3,700 groups, which a person names one group at a time. After that, the suggestions do most of the work:

- **"Is this X?" for a group.** The group's mean vector is compared with each named person. The trick is how a person is represented: by the mean of *their five faces closest to the group*, not their overall centroid. The centroid of someone from age 2 to 20 looks like nobody. The five nearest faces of the right age look like them.
- **"Maybe" for single faces,** only when a face is at least 0.5 similar to a person *and* 0.05 ahead of the runner-up. Without that margin, the suggestions just alternate between siblings.
- **Strangers are people too.** When you dismiss a stranger, they become an "ignored" person who absorbs their own lookalikes. Those lookalikes are no longer offered as a family member.

| Setting | Value | Why |
|---|---|---|
| **Detector input** | 640 px | Finds small faces in group shots without crawling |
| **Grouped faces** | ≥ 40 px, score ≥ 0.65 | Below this, false merges dominate |
| **Graph edge** | cosine ≥ 0.50 | "May be the same person" |
| **Group suggestion** | ≥ 0.45 | Against the person's 5 closest faces |
| **Single-face suggestion** | ≥ 0.50, margin 0.05 | Only when clearly one person |

## What the models got wrong, and what caught it

### Babies

Siblings at the same age sit very close together in ArcFace's embedding space. Babies are close to the worst case for a model trained mostly on adults. At one point we had about 340 baby pictures of the older child named as the younger one. The tell was simple: the "younger" child showed up in photos taken years before the younger one was born. A birth date per person turns that into an automatic check.

### Cameras that lie about time

Then the birth-date rule flagged a few dozen pictures that were named correctly. A Samsung compact and a Pentax DSLR had never had their clocks set, so their pictures said 1 January 2006, even though one of the cameras came out in 2007. EXIF is evidence, not truth. Sometimes the folder name someone typed in 2009 is the better source.

### Logging the human's decisions

Every action in the app is stored with its context: which page, which filters, what the app suggested, and what the person did instead. That log is now the most valuable dataset in the project. When a threshold changes, it changes because of how a real person judged real faces, not because of how it felt.

## The rest of the clean-up

Faces were only one part of the job. Along the way, the same quiet approach removed **59&nbsp;GB of duplicates** (about 19,600 files, every one kept in `deletedDuplicates/` with its folder path), read the text on 9,500 screenshots, and turned the song screenshots into a playlist. It also pulled in pictures from forgotten iPhoto backups that existed nowhere else. The entire archive, plus the app's database, now sits on the home backup box with READMEs explaining what everything is, for whoever opens it in twenty years.

## What we'd tell a client

- **Keep the data where it lives.** Current open models are good enough that "send it to the cloud" is a choice, not a requirement.
- **Pick boring infrastructure.** SQLite and numpy handled 100k faces. Add complexity when the numbers demand it, not before.
- **Make every operation reversible.** Moves, not deletes, with an audit trail and a check that everything still adds up.
- **Design for the human.** The model gets you 90% of the way. The last 10% is a person, so the tools should make their judgement fast and keep it on record.

## Have a pile of data nobody can find anything in?

Photos, scans, documents, recordings. We build tools that organise sensitive data where it lives, with open models, reversible operations and people in control. Email [info@eloquentix.com](mailto:info@eloquentix.com?subject=Organising%20our%20data) and tell us what you're sitting on.
