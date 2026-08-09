# Portfolio

Dean Grant’s personal portfolio — a Vite + React SPA in a pnpm monorepo.

## What it is

A single-page site with:

- Hero name and tagline
- Social and contact links
- Horizontal carousel of selected GitHub projects
- List of Substack articles
- Dark / light theme (dark by default)

Projects and articles are fetched at build time from GitHub and Substack into
`apps/web/src/assets/data/*.generated.json`. The browser does not call those APIs
at runtime.

## Requirements

- Node.js `>=22`
- [pnpm](https://pnpm.io/) `11.8.0` (pinned via `packageManager` in `package.json`)

```bash
corepack enable
pnpm install
```

## Quick start

```bash
pnpm dev
```

`predev` refreshes generated portfolio data, then starts the Vite dev server.

Optional environment variables for the fetch scripts:

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Higher GitHub API rate limits |
| `GITHUB_USERNAME` | Override GitHub username from `usernames.json` |
| `SUBSTACK_USERNAME` | Override Substack username from `usernames.json` |

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Fetch data + Vite dev server |
| `pnpm build` | Fetch data + typecheck + production build |
| `pnpm preview` | Preview the production build |
| `pnpm run typecheck` | TypeScript check for `web` |
| `pnpm check` | Biome format + lint check |
| `pnpm exec biome ci` | Biome in CI mode |
| `pnpm --filter web fetch:projects` | Refresh GitHub projects JSON |
| `pnpm --filter web fetch:articles` | Refresh Substack articles JSON |

## Repository layout

| Path | Role |
| --- | --- |
| [`apps/web`](apps/web) | Portfolio UI |
| [`AGENTS.md`](AGENTS.md) | Entrypoint for coding agents |
| [`.agents/docs/ARCHITECTURE.md`](.agents/docs/ARCHITECTURE.md) | System architecture |
| [`.agents/docs/DESIGN.md`](.agents/docs/DESIGN.md) | Visual design system |
| [`.agents/`](.agents/) | Rules, commands, hooks, and skills |

Agents should start at [`AGENTS.md`](AGENTS.md).

## CI

- **Lint** — fetch portfolio data, Biome CI, lockfile check, React Doctor
- **Test** — typecheck
- **Audit** — `pnpm audit`
- **Dependabot** — weekly npm and GitHub Actions updates

## License

MIT — see [LICENSE](./LICENSE).
