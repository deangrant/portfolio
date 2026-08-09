# /fetch-data

Refresh build-time portfolio JSON under `apps/web/src/assets/data/`.

```bash
pnpm --filter web fetch:projects
pnpm --filter web fetch:articles
```

Notes:

- Optional `GITHUB_TOKEN` reduces GitHub rate limits; `GITHUB_USERNAME` / `SUBSTACK_USERNAME` override `usernames.json`.
- Scripts soft-fail when a prior usable generated file exists; missing/empty required output can exit non-zero.
- Do not hand-edit `*.generated.json` afterward — fix scripts or source data instead.
