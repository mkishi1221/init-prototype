---
description: "Build the final prototype from an approved issue: library components from chosen variants, then the full page"
---

Build the prototype from GitHub issue: $ARGUMENTS

**Project settings:** Read `.claude/project.md` for repo configuration, folder structure, and conventions before executing.

**IMPORTANT: This workflow requires EXECUTION, not description. Execute all steps without stopping — the plan was already approved when the issue was created. Do NOT enter plan mode or ask for approval to begin.**

## Workflow (execute all steps without stopping)

1. **Load the issue** — `gh issue view {issue_number}`. Follow the **Spec:** pointer to `prototypes/{slug}/spec.md` and read it in full. Set the issue label: `gh issue edit {issue_number} --remove-label "planned" --add-label "in-progress"`.

2. **Load all design context:**
   - Read `DESIGN.md` in full
   - Read `src/components/COMPONENTS.md` and `src/nav.js` (if it exists) — the current state of the product mock this build extends
   - Read the **chosen page variant** file (`pages/variants/{chosen}.jsx`) — it is the PRIMARY structural spec for the final page
   - Read each component's **chosen variant** section in its gallery file (`pages/component-variants/{component}.jsx`)
   - Read the reference images in `research/page/` and each `research/components/{component}/` folder alongside their what-to-learn annotations — the annotations tell you which aspect of each image matters
   - If the spec is missing a `**Chosen:**` page variant or a chosen variant for any new-library component, STOP and ask the user to pick before building.

3. **Build library components FIRST** — for each `new-library` component in the spec's inventory:
   - Create `src/components/{Name}.jsx` (PascalCase): default export = the component, named `Demo` export = a realistic showcase of its key states
   - **Port the chosen variant from the gallery file — do not redesign it.** Flesh it out to full fidelity: real props API, hover/focus/disabled states, DESIGN.md component rules (dialogs especially: sticky header/footer, destructive-left footer, overlay blur, dismiss behaviors)
   - Props should be minimal and general — this component will be reused by future prototypes, not just this page
   - Register it in `COMPONENTS.md` (purpose, key props, Used by: {slug})
   - For `library-reuse` components: import as-is. If one genuinely needs a change, extend it compatibly and check its **Used by** list — tell the user which other prototypes are affected.

4. **Build the final page INTO the product mock** — `prototypes/{slug}/pages/{page}.jsx` (page name from the spec's Page structure; multiple pages only if the spec defines multiple):
   - **The chosen page variant is the structural spec — build the full version of it, not a new direction.** Full fidelity: complete sections, realistic states, polished hierarchy.
   - **The page renders inside `AppShell`** (with the correct active nav item), so it is part of the whole-product mock — not a standalone page. If AppShell legitimately doesn't apply (e.g. an unauthenticated onboarding step), the spec must say so.
   - **Import shared components from `src/components/`** — never re-implement a dialog, button, shell, or anything in the registry
   - **Wire cross-page links** — where the spec's "Place in the mock" names flows to/from existing built pages, use their real routes from `src/nav.js`. If a link's target page isn't built yet, point it at the route it WILL have and note it in the issue comment.
   - Plain JSX (no TypeScript); allowed deps: `react`, `lucide-react`, `clsx`
   - Realistic placeholder content (never "Lorem ipsum"), drawn from the spec's Problem context
   - Apply the reference annotations and DESIGN.md's Visual Hierarchy Principles; verify in the code that the reading order is describable in one sentence and there are no nested bordered containers
   - Do NOT edit `src/App.tsx` or `src/pages/components.jsx` — routes appear automatically
   - Keep the variant and gallery files — they are the design history; do not delete them

5. **Register the page in the mock** — append the page to `src/nav.js` (create the file with the shape from `.claude/project.md` if this is the first build): section, label, route, icon. This is what makes the page reachable from every other page's sidebar.

6. **Sanity-check the build** — run `npx vite build` to catch syntax and import errors. Fix any failures. Do not take screenshots.

7. **Update the spec** — set `Status: built`, append a Changelog entry (date, "Built — components: {list}, page: {list}").

8. **Commit and push:**
   ```bash
   git add src/components/ src/nav.js prototypes/{slug}/ && git commit -m "Build {slug} prototype" && git push
   ```

9. **Update the issue** — comment with what was built (components created/reused, pages, route URLs, nav placement, any links pointing at not-yet-built pages) and check off satisfied acceptance criteria. Then: `gh issue edit {issue_number} --remove-label "in-progress" --add-label "built"`. Leave the issue open — the user closes it when satisfied.

10. **Present** — give the user the routes to review in the browser (`npm run dev`):
    - Final page: `localhost:4000/{slug}/{page}` — reachable from every other built page via the sidebar
    - Component gallery: `localhost:4000/components`
    - Iterate conversationally on feedback: apply changes, re-run the vite build check, commit, and push after each meaningful change.

## CRITICAL CONSTRAINTS

**DO NOT:**
- Redesign what was chosen — the chosen variants are the approved direction; build them out
- Re-implement anything that exists in `src/components/` — import it. The mock is cumulative; duplicating an existing component from scratch is the failure mode this workflow exists to prevent
- Build the page outside AppShell (unless the spec explicitly says the page has no shell)
- Delete variant or gallery files
- Edit `src/App.tsx` or `src/pages/components.jsx` (`src/nav.js` is the one registry you DO edit)
- Remove or reorder existing entries in `src/nav.js` — append only
- Take screenshots or leave a dev server running
- Change a shared component's existing API without checking its Used by list and flagging affected prototypes
- Include the word "claude" in commits or issue comments
- Write tests
