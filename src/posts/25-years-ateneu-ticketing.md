---
title: "25 Years, One Concert, and a Box Office Built in a Day"
date: 2026-09-29
description: "For our 25th anniversary we booked the Romanian Athenaeum for Beethoven, Dvořák and Piazzolla. Then we built the ticketing ourselves, in a day: seat map, payments, invitations, door scanner."
keywords: ["Eloquentix 25 years", "Ateneul Român", "Romanian Athenaeum concert", "event ticketing", "seat selection", "Stripe Checkout", "SQLite", "AI-assisted development", "Claude Code"]
---

We registered eloquentix.com on the 30th of November, 2001. The bubble had burst and the good companies were dying with the bad ones. We started anyway. That was twenty-five years ago this November.

We wanted to mark it. We did not want a party. We wanted music.

So there will be a concert. It is on the 6th of December, 2026, at seven in the evening, at the Ateneul Român in Bucharest. Alina Berçu plays the piano. Alexandru Marian plays the violin. Bogdan Postolache plays the cello. They will play Beethoven and Dvořák and Piazzolla. Every seat is twenty-five dollars and you choose the seat.

**[25.eloquentix.com](https://25.eloquentix.com)**

## The story

The hall has an agency that sells its tickets. The agency sells most of the seats. We had seats of our own. Some were gifts for clients and for the people who work with us. Some were for friends. Some we would sell. There were two sellers and one room and nothing between them to keep the count straight.

We could have bought something. But we build software, and it seemed wrong to buy it. We built it with Claude Code. We began in the morning with an empty repository. By night there was a seat map and a way to pay and a ticket in your inbox and a scanner for the door. It worked. Later the buyers came and we made it better. But it was built in a day.

## The tech

We kept it plain. Plain things hold.

- **Node and Express.** One small server.
- **SQLite.** A seat is held inside a transaction. Two people cannot take the same seat. One of them wins and the other is told.
- **Stripe Checkout.** It takes the money.
- **HTML, CSS and an SVG of the hall.** No framework. Nothing to build.
- **Nodemailer.** It sends the ticket with its QR code.

We drew the hall from the venue's chart. Then we checked it against the agency's plan. There were 794 seats and all 794 matched, even the extra chairs the venue marks "6S". Each seat has the same name in both systems. That is the only thing that makes it safe.

## The features

- **You choose your seat.** The hall is the page. You can zoom and move and touch a seat and it is yours. The open seats are brass. Yours are brighter.
- **Two sellers, one hall.** Every seat is ours or the agency's or it is not for sale. The database enforces this. The browser does not get a vote.
- **Invitations.** A guest gets a code of their own. The code does not take a seat. It waits. When the guest says yes, the seat is theirs. A code shared among many is counted in seats and not in uses.
- **Honest money.** The tickets cannot be refunded. So we hold the seat longer than Stripe keeps the payment open. No one pays for a seat that is already gone.
- **The door.** The staff open a page on their phones. There is nothing to install. Each code is signed. Each seat gets in once.
- **The box office.** The team signs in with Google. They can find a ticket, move it, send it again, or give one away.
- **The backups.** Every night there is a copy. There is a ledger that is only ever written to. Each ticket goes to an inbox of ours too. If one fails there are two more.

## What it means

It is not hard. It is a map and a payment and a code on a phone. What is new is how fast it comes. You have an idea in the morning and a working box office at night.

The hard part is the same as it was. You must know where it will break. A seat two systems both think they own. A payment that outlives its hold. We have been learning where things break for twenty-five years. It is what we know.

Come to the Athenaeum. The music will be good.

**[Choose your seat](https://25.eloquentix.com)**
