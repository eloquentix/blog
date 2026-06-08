# Eloquentix Blog

Source for **[blog.eloquentix.com](https://blog.eloquentix.com)** — the Eloquentix engineering blog.

Static site built with [Eleventy (11ty)](https://www.11ty.dev/). Posts are Markdown; the design mirrors the main Eloquentix site.

## Add a post

Drop a Markdown file in `src/posts/`:

```markdown
---
title: "Your Post Title"
date: 2026-06-08
description: "One-sentence summary for SEO, social cards, and the index."
keywords: ["AI engineering", "Eloquentix"]   # optional
---

Body in Markdown. Raw HTML is allowed.
```

The filename becomes the URL slug (`my-post.md` → `/my-post/`). Push to `main` and CI builds and deploys automatically.

## Develop locally

```bash
npm install
npm run serve     # live preview at http://localhost:8080
npm run build     # output to _site/
```

## Deploy

GitHub Action (`.github/workflows/deploy.yml`) on push to `main`: builds and rsyncs `_site/` to `/var/www/blog` on the production droplet as the unprivileged `blogdeploy` user.

Required repo secrets: `DEPLOY_SSH_KEY` (private key), `DEPLOY_HOST`, `DEPLOY_USER`.
