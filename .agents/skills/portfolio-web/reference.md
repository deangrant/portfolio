# Portfolio web reference

## Important paths

| Path | Role |
| --- | --- |
| `apps/web/src/index.tsx` | DOM mount; theme factory injection |
| `apps/web/src/App.tsx` | Composition root props → providers |
| `apps/web/src/pages/Home/index.tsx` | Parses generated JSON; gates empty sections |
| `apps/web/src/assets/usernames.json` | GitHub / LinkedIn / Substack / X handles |
| `apps/web/src/assets/data/*.generated.json` | Build-time project/article lists |
| `apps/web/scripts/fetch-github-projects.mjs` | GitHub API → projects JSON |
| `apps/web/scripts/fetch-substack-articles.mjs` | Substack RSS via curl → articles JSON |
| `apps/web/src/utils/assertGeneratedPortfolioData.mjs` | Shared shape validation |
| `apps/web/src/styles/global.css` | Theme tokens + reduced-motion `fade-up` |

## Fetch behavior

- `predev` / `prebuild` run both fetch scripts.
- Timeouts ~15s; optional `GITHUB_TOKEN`.
- Substack: public RSS via `curl` (avoids Cloudflare 403 on GitHub Actions).
- Soft-fail: on network/API failure, keep existing generated file when present (Substack requires prior **non-empty** file).
- Missing required output → non-zero exit.

## Theme DI

```text
index.tsx
  createDocumentThemeApplicator()
  createLocalThemeStorage()
    → App({ applicator, storage })
      → ThemeProvider
        → MainLayout → useTheme → ThemeToggle (presentational)
```

FOUC prevention: blocking script in `apps/web/index.html` reads `portfolio-theme` and sets `data-theme` before paint (key must match `THEME_STORAGE_KEY`).
