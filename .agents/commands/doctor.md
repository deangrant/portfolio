# /doctor

Run the full React Doctor local triage workflow.

1. Follow [`.agents/skills/react-doctor/SKILL.md`](../skills/react-doctor/SKILL.md).
2. Fetch the playbook **only** from `https://www.react.doctor/prompts/` (see skill trusted-fetch rules). Abort on fetch failure.
3. Invoke scans via `pnpm run doctor*` (pinned dependency) — never `npx react-doctor@latest`.
4. Fix by severity; validate with `pnpm run doctor:full` when the playbook requires a rescan.
5. Do not commit, push, or open a PR unless the user explicitly chooses PR mode in the playbook.
