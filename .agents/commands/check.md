# /check

Verify the workspace is clean for CI-style gates.

Run from the repo root, in order:

```bash
pnpm exec biome ci
pnpm run typecheck
pnpm run doctor:changed
pnpm audit
```

Report failures with file paths and fix them before declaring the task done. Do not add Biome suppressions unless the user asks.
