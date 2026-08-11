---
version: alpha
name: Portfolio
description: >-
  Neutral dark-first personal portfolio with light theme support, system sans,
  flat bordered surfaces, and calm fade-up section entrances.
colors:
  bg: "#0a0a0a"
  fg: "#f5f5f5"
  muted: "#a3a3a3"
  border: "#262626"
  surface: "#111111"
  hover: "#1a1a1a"
  focus: "#e5e5e5"
  bg-light: "#fafafa"
  fg-light: "#0a0a0a"
  muted-light: "#525252"
  border-light: "#e5e5e5"
  surface-light: "#ffffff"
  hover-light: "#f0f0f0"
  focus-light: "#171717"
typography:
  body:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  name:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: clamp(2.25rem, 6vw, 3rem)
    fontWeight: 560
    lineHeight: 1.1
    letterSpacing: -0.04em
  tagline:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  section-label:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
  card-title:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 1.0625rem
    fontWeight: 560
    lineHeight: 1.3
    letterSpacing: -0.02em
  card-body:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
  control-label:
    fontFamily: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  md: 0.5rem
  full: 9999px
spacing:
  "1": 0.25rem
  "2": 0.5rem
  "3": 0.75rem
  "4": 1rem
  "5": 1.5rem
  "6": 2rem
  "7": 3rem
  "8": 4.5rem
  max-width: 72rem
motion:
  fade-up-duration: 420ms
  fade-up-easing: ease
  theme-transition: 180ms
  control-transition: 160ms
  delay-social: 60ms
  delay-projects: 120ms
  delay-articles: 180ms
  delay-footer: 240ms
components:
  theme-toggle:
    backgroundColor: transparent
    textColor: "{colors.fg}"
    borderColor: "{colors.border}"
    rounded: "{rounded.full}"
    size: 2.25rem
  theme-toggle-hover:
    backgroundColor: "{colors.hover}"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: "{spacing.5}"
  project-card-hover:
    borderColor: "{colors.muted}"
  sort-group:
    borderColor: "{colors.border}"
    rounded: "{rounded.full}"
  sort-button:
    textColor: "{colors.muted}"
    typography: "{typography.control-label}"
    padding: 0.4rem 0.75rem
  sort-button-active:
    textColor: "{colors.fg}"
    backgroundColor: "{colors.hover}"
  language-filter:
    textColor: "{colors.muted}"
    borderColor: "{colors.border}"
    typography: "{typography.control-label}"
    rounded: "{rounded.full}"
    padding: 0.35rem 0.75rem
  language-filter-active:
    textColor: "{colors.fg}"
    backgroundColor: "{colors.hover}"
    borderColor: "{colors.muted}"
  section-count-badge:
    textColor: "{colors.muted}"
    borderColor: "{colors.border}"
    typography: "{typography.control-label}"
    rounded: "{rounded.full}"
    padding: 0.2rem 0.5rem
  nav-button:
    backgroundColor: transparent
    textColor: "{colors.fg}"
    borderColor: "{colors.border}"
    rounded: "{rounded.full}"
    size: 2.25rem
  topic-chip:
    backgroundColor: "{colors.hover}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
  social-link:
    textColor: "{colors.fg}"
    typography: "{typography.body}"
---

# Portfolio

## Overview

Portfolio is a calm, editorial personal site for Dean Grant.
Default presentation is **dark**; visitors can switch to light via `data-theme`.
The personality is neutral near-black / near-white surfaces, quiet borders, and
system UI sans — focused on readable copy and a scannable project carousel,
not a colorful marketing dashboard.

Canonical CSS tokens live in
[`apps/web/src/styles/global.css`](../../apps/web/src/styles/global.css)
(`:root` / `[data-theme="dark"]` and `[data-theme="light"]`).
Component styles use CSS Modules and `var(--…)` references.

## Colors

One neutral scale, remapped per theme. There is no saturated brand accent today.

| Role | CSS variable | Dark | Light |
| ---- | ------------ | ---- | ----- |
| Page background | `--color-bg` | `#0a0a0a` | `#fafafa` |
| Body text | `--color-fg` | `#f5f5f5` | `#0a0a0a` |
| Secondary text | `--color-muted` | `#a3a3a3` | `#525252` |
| Borders | `--color-border` | `#262626` | `#e5e5e5` |
| Elevated surface | `--color-surface` | `#111111` | `#ffffff` |
| Hover wash | `--color-hover` | `#1a1a1a` | `#f0f0f0` |
| Focus ring | `--color-focus` | `#e5e5e5` | `#171717` |

- **Ink hierarchy:** `fg` for primary content; `muted` for taglines, section
  labels, descriptions, and idle controls.
- **Surfaces:** page `bg` under bordered `surface` cards and chrome.
- **Focus:** `:focus-visible` uses a 2px `focus` outline with 3px offset.

Do not introduce a second saturated brand color, purple gradients, or glow
accents unless the token set is deliberately redesigned.

## Typography

One family stack via `--font-sans`:

`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Roles in use:

- **Body** — `1rem` / `1.6` line-height on `body`.
- **Name (hero)** — `clamp(2.25rem, 6vw, 3rem)`, weight `560`, tight tracking.
- **Tagline** — `1rem`, muted, slightly looser line-height (`1.65`); full
  content width (same column as the name, no max-width); multi-paragraph copy
  via preserved line breaks (`white-space: pre-line`).
- **Section label** — small uppercase (`0.8125rem`), muted, wide tracking.
- **Card title / body** — slightly tight titles; muted clamped descriptions.

Avoid decorative display fonts or a second mono stack unless content needs it.

## Layout

Content sits in a centered column capped by `--max-width` (`72rem`).
Spacing uses `--space-1` … `--space-8` (`0.25rem` … `4.5rem`).

Home is a vertical stack of sections (hero → social → projects → footer).
Writing (`ArticlesSection`) remains in the codebase but is intentionally not
mounted until that content is ready to release.

Projects use a horizontal carousel:

- 1 visible card by default
- 2 from `640px`
- 3 from `1024px`
- Navigation advances one card at a time and clamps to a **full last page** of
  visible cards (so the final view still fills the track); Next disables at
  that end.

Prefer existing space tokens over one-off margins.

## Elevation & Depth

Depth is tonal and bordered, not shadowed:

- Cards and controls: `1px` `border` on `surface` or transparent fills.
- Hover: border shifts toward `muted` or fill toward `hover`.
- Theme changes animate color / background / border over `180ms`.

Avoid multi-layer drop shadows, glassmorphism, and neon glows.

## Shapes

- **`0.5rem` (`--radius`)** — project cards and most rectangular chrome.
- **Pill (`9999px`)** — theme toggle, carousel nav buttons, sort group,
  language filter pills, section count badges, and topic chips.

Keep radii consistent; do not mix large marketing-card radii into the page.

## Components

Map new UI to existing patterns:

- **ThemeToggle** — pill icon button; border + hover wash; presentational.
- **ProjectCard** — bordered surface, title/description/topics; topic chips are
  muted pills; overflow count when topics wrap.
- **ProjectsSection** — section label with a small count badge (filtered list
  length); pill sort group (Created / Updated); single-select language filter
  pills derived from GitHub languages present on the loaded projects (plus All);
  circular prev/next nav with full-last-page clamp.
- **SocialLinks** — inline icon + label row; inherit link color; muted on hover.
- **Articles** — list-row pattern with muted metadata remains for a future
  Writing release; not currently shown on the home page.

App code should use CSS variables from `global.css` rather than hard-coded hex
in new modules when a token already covers the role.

## Motion

Sections enter with global `fade-up` (`420ms ease both`), staggered by delay
(social `60ms`, projects `120ms`, articles `180ms` when mounted, footer
`240ms`). Under `prefers-reduced-motion: reduce`, `fade-up` keyframes become a
no-op (identity opacity/transform) in `global.css`.

Control hovers use short `160ms` transitions alongside the theme transition
token. Carousel smooth scrolling disables to `auto` when reduced motion is on.

## Do's and Don'ts

### Do

- Keep the experience neutral, readable, and dark-first with a real light theme.
- Use `--color-*`, `--space-*`, `--radius`, and `--font-sans` from `global.css`.
- Prefer borders + tonal hover washes over shadows and glow.
- Colocate styles in CSS Modules next to components.
- Preserve reduced-motion behavior when adding animation.

### Don't

- Hard-code one-off palette hex when a token already exists.
- Add purple/indigo gradients, neon accents, or multi-layer shadows.
- Invent a second brand accent without updating the global token set.
- Scaffold dense dashboard chrome (stat strips, card grids in the hero).
- Reintroduce `!important` animation overrides for reduced motion.
