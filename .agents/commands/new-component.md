# /new-component

Create a component using the project structure skill.

1. Read [`.agents/skills/typescript-project-structure/SKILL.md`](../skills/typescript-project-structure/SKILL.md).
2. Choose layer:
   - Shared leaf → `apps/web/src/components/core/<Name>/`
   - Page shell → `apps/web/src/components/layouts/<Name>/`
   - Single-page UI → `apps/web/src/pages/<Page>/components/<Name>/`
3. Add folder files as needed: `index.tsx`, `index.module.css`, `index.types.ts`.
4. Import by direct `@/` path — **no** layer barrels.
5. Do not create empty `patterns/`, `containers/`, `routes/`, `services/`, `stores/`, or `i18n/` folders.
6. Use CSS variables from `styles/global.css` for theme colors.
