# Agent guide

Dean Grant’s portfolio monorepo. Prefer this file, then [`.agents/`](.agents/), for how to work in the repo.

## Stack

- Node.js `>=22`, pnpm `11.8.0` (Corepack / `packageManager` pin)
- Biome for format + lint
- React Doctor for React diagnostics
- App: Vite + React 19 + TypeScript in [`apps/web`](apps/web)

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Fetch generated data, then Vite dev server |
| `pnpm build` | Fetch, typecheck (`tsc --noEmit`), Vite production build |
| `pnpm preview` | Preview production build |
| `pnpm check` / `pnpm exec biome ci` | Biome check / CI mode |
| `pnpm run typecheck` | `tsc --noEmit` for `web` |
| `pnpm run doctor:changed` | React Doctor regression vs base branch |
| `pnpm run doctor:full` | Full React Doctor scan |
| `pnpm --filter web fetch:projects` | Refresh GitHub projects JSON |
| `pnpm --filter web fetch:articles` | Refresh Substack articles JSON |
| `pnpm lint:lockfile` | Frozen lockfile install check |

Optional fetch env: `GITHUB_TOKEN`, `GITHUB_USERNAME`, `SUBSTACK_USERNAME`.

## Layout (`apps/web/src`)

In use: `assets/`, `components/core`, `components/layouts`, `constants/`, `contexts/`, `hooks/`, `pages/`, `styles/`, `types/`, `utils/`.

Do **not** create empty unused layers (`patterns/`, `containers/`, `routes/`, `services/`, `stores/`, `i18n/`) until the app needs them.

- Folder-per-component: `index.tsx`, `index.module.css`, `index.types.ts`
- No component-layer barrels; import with `@/`
- Theme concretes only in `index.tsx` (inject into `App`)
- Never hand-edit `src/assets/data/*.generated.json` — change fetch scripts, `usernames.json`, or asserts

## Agentic tooling (canonical under `.agents/`)

High-level system design: [`.agents/docs/ARCHITECTURE.md`](.agents/docs/ARCHITECTURE.md).
Visual design system: [`.agents/docs/DESIGN.md`](.agents/docs/DESIGN.md).

| Kind | Path |
| --- | --- |
| Docs | [`.agents/docs/`](.agents/docs/) |
| Rules | [`.agents/rules/`](.agents/rules/) |
| Commands | [`.agents/commands/`](.agents/commands/) |
| Hooks | [`.agents/hooks/`](.agents/hooks/) |
| Skills | [`.agents/skills/`](.agents/skills/) |

Cursor discovery shims:

- [`.cursor/hooks.json`](.cursor/hooks.json) → runs `.agents/hooks/*`
- `.cursor/rules` → symlink to `.agents/rules`
- `.cursor/commands` → symlink to `.agents/commands`

Edit rules/commands/skills/hooks only under `.agents/`.

### Skills

- `portfolio-web` — app-specific composition, fetch pipeline, theme DI
- `typescript-project-structure` — layers and folder layout
- `solid-typescript-design` — SOLID for TS modules
- `jsdoc-typescript-docs` — comment / JSDoc style
- `react-doctor` — diagnostics and `/doctor` triage

### Hooks

`afterFileEdit`: Biome `--write` on the edited file, then advisory React Doctor (background).

## CI

- **Lint:** fetch projects/articles → `biome ci` → lockfile check; React Doctor job (blocking)
- **Test:** `pnpm run typecheck` (no unit test suite yet)
- **Audit:** `pnpm audit`
