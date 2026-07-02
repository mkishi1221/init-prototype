---
description: "Derive the component inventory, research each new component, and build a 5-6 variant gallery per component"
---

Derive and research components for prototype: $ARGUMENTS

**Project settings:** Read `.claude/project.md` for repo configuration, folder structure, spec format, and the status pipeline before executing.

**IMPORTANT: This workflow requires EXECUTION, not description. When a step says "do X", actually do it.**

**Running this command marks the page references and chosen variant approved.** This command produces the component inventory, per-component research, and one variant-gallery file per new component. No final build. When the user approves and picks component variants, they run `/proto-issue {slug}` — that is the approval signal.

## Workflow

1. **Load context** — read `prototypes/{slug}/spec.md` (stop with a helpful message if missing, or if `## Page references` / `## Page variants` are empty — run `/proto-research` first). If no `**Chosen:**` page variant is recorded, ask the user to pick one now and record it. If `Status: spec-approved`, set it to `Status: refs-approved`. Read `src/components/COMPONENTS.md`, `DESIGN.md`, and the chosen variant's JSX file.

2. **Refine mode check** — if the spec already has a `## Components` table, ask the user what to change (reclassify, add refs or variants for one component, drop one) and do only that.

3. **Derive the component inventory** — from the spec's Page structure and the CHOSEN page variant, list every UI component the page needs. **Reuse-first:** the mock is cumulative, so for every component the first question is "does this already exist?" — check COMPONENTS.md before anything gets classified as new. Classify each:
   - **`library-reuse`** — already exists in `src/components/` (including AppShell once built). A near-match counts: prefer extending an existing component over creating a parallel one.
   - **`new-library`** — reusable across future prototypes (dialogs, buttons, app shell, cards, form fields, badges, empty states...) → gets its own research pass AND a variant gallery. If `AppShell` doesn't exist yet and the page needs the shell, it is a `new-library` component of THIS prototype.
   - **`one-off`** — genuinely page-specific (a bespoke visualization, a unique hero) → built inline in the final page, no dedicated research
   - Default bias: if in doubt whether something is reusable, classify it `new-library`. Inconsistency across prototypes comes from under-sharing. Duplication comes from skipping the reuse check.

4. **Write the `## Components` table** in the spec:

   | Component | Source | References | Reasoning |
   |---|---|---|---|
   | Dialog | new-library | [research](research/components/dialog/) | R2 and R5 both gate the flow behind a modal; no dialog exists in the library yet |

   - Reasoning MUST cite specific page references (R-numbers) or the chosen variant — why does this page need this component, per the evidence.

5. **Confirm the classification** — present the inventory and use AskUserQuestion to confirm before spending research effort (options: proceed as classified / adjust). Apply any adjustments.

6. **Research each `new-library` component:**
   - Create `prototypes/{slug}/research/components/{component}/`
   - Search Mobbin (`mcp__mobbin__search_screens`, `mode: "deep"`, `image_format: "jpg"`) with 1-2 queries focused on that component specifically
   - Download 3-6 references: `{nn}-{company}-{screen}.jpg` (numbered from `01-`), verify each by reading it
   - Add a `### {Component}` subsection under `## Component research` in the spec with the same table format, refs numbered `C1`, `C2`, ... and a specific what-to-learn per image

7. **Build a variant gallery per `new-library` component** — ONE file per component: `prototypes/{slug}/pages/component-variants/{component}.jsx`:
   - The file renders a **vertical gallery of 5-6 variants**, stacked top-to-bottom, each wrapped in a labeled section (variant name + one line on what makes it distinct) — no tabs or toggles
   - **Variants must be meaningfully different, not styling tweaks** — diverge on density, structure, information hierarchy, or interaction pattern. A color/radius swap is not a variant.
   - Name each variant after its distinguishing trait ("Compact with icon", "Sticky-footer form", "Minimal") — never numbered
   - Show each variant in **realistic context** (a card in a grid of cards, a field in a mini form), with realistic content
   - Ground variants in the component's C-references; no app shell; plain JSX; DESIGN.md tokens; everything self-contained in the one file
   - Route appears automatically at `localhost:4000/{slug}/component-variants/{component}`

8. **Sanity-check the galleries render** — run `npx vite build` to catch syntax and import errors. Fix any failures. Do not take screenshots.

9. **Record in the spec** — in each component's `### {Component}` subsection, add the gallery route and the list of variant names with their key ideas.

10. **Commit:**
    ```bash
    git add prototypes/{slug}/ && git commit -m "Add component inventory, research, and variant galleries for {slug}" && git push
    ```

11. **Present** — show the inventory, each component's references with annotations, and each gallery's route (`localhost:4000/{slug}/component-variants/{component}`) so the user can review the variants in the browser. Iterate conversationally (repeat steps 6-10 for changes). **When the user picks a winning variant for each component, record it** (`**Chosen:** {variant name} — {one line why}` in that component's subsection) and commit.

## STOP — end of this command

Do NOT create the GitHub issue or build anything in `src/components/`. When the user approves, they run `/proto-issue {slug}`.

## CRITICAL CONSTRAINTS

**DO NOT:**
- Touch `src/components/` — real library components are built in `/proto-build` from the chosen variants
- Build the final page or create the GitHub issue
- Make variants that are minor iterations of each other, or spread one component's variants across multiple files
- Touch files outside `prototypes/{slug}/`
- Skip the classification confirmation (step 5) — research and galleries are expensive, confirm direction first
- Add reasoning that doesn't cite specific reference images
