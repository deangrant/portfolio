---
name: portfolio-web
description: >-
  Portfolio web app conventions for apps/web. Use when changing Home page
  sections, theme wiring, generated GitHub/Substack data, usernames, fetch
  scripts, or portfolio constants.
---

# Portfolio web (`apps/web`)

**Announce at use:** "I'm following the portfolio-web skill for apps/web."

## Read first

1. This file.
2. [reference.md](reference.md) — paths, fetch behavior, theme DI sketch.
3. Root [`AGENTS.md`](../../../AGENTS.md) for scripts and agent map.

## Composition

- Entry [`index.tsx`](../../../apps/web/src/index.tsx) creates theme adapters and mounts `App`.
- [`App.tsx`](../../../apps/web/src/App.tsx) accepts `applicator` + `storage`, wraps `ThemeProvider` → `MainLayout` → `HomePage`.
- Home sections live under `pages/Home/components/` (Hero, SocialLinks, Projects, Articles, Footer).

## Content sources

| Kind | Source |
| --- | --- |
| Copy / social links | `constants/portfolio.constants.ts` + channel `*.constants.ts` |
| Usernames | `assets/usernames.json` |
| Projects / articles | `assets/data/*.generated.json` via fetch scripts |

Never hand-edit generated JSON. Keep asserts in `utils/assertGeneratedPortfolioData.mjs` aligned with `parseGeneratedPortfolioData.ts`.

## Sibling skills

- Structure / layers → `typescript-project-structure`
- SOLID for non-UI modules → `solid-typescript-design`
- JSDoc → `jsdoc-typescript-docs`
- React diagnostics → `react-doctor`
