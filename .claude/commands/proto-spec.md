---
description: "Start a prototype: create the working spec (problem, direction, page structure) for user approval"
---

Create a prototype spec for: $ARGUMENTS

**Project settings:** Read `.claude/project.md` for repo configuration, folder structure, spec format, and the status pipeline before executing.

**IMPORTANT: This workflow requires EXECUTION, not description. When a step says "do X", actually do it.**

**This command produces ONLY the spec.** No design research, no Mobbin searches, no JSX. The workflow is deliberately split so each stage ends at a user-approval gate. When the user is happy with the spec, they run `/proto-research {slug}` — that is the approval signal.

## Workflow

1. **Derive the slug** — short kebab-case name for the feature (e.g. `career-timeline`, `cv-upload`). If `prototypes/{slug}/spec.md` already exists, tell the user and ask whether to revise the existing spec or pick a different slug.

2. **Create the folder skeleton:**
   ```bash
   mkdir -p prototypes/{slug}/pages/variants prototypes/{slug}/pages/component-variants prototypes/{slug}/research/page prototypes/{slug}/research/components
   ```

3. **Read the design guidelines** — read `DESIGN.md` in full. The spec's "What good looks like" must be grounded in it.

4. **Read the component registry and the product mock** — read `src/components/COMPONENTS.md` and `src/nav.js` (if it exists) so the spec can anticipate which existing shared components apply and where this page sits in the growing product mock (nav section, entry points, which existing pages link to/from it). The mock is cumulative — every prototype extends it, so reusing what exists is the default and building new is the exception.

5. **Gather information from the real product** — check whether this feature (or a related one) already exists, using the repo paths from `.claude/project.md`'s "Related Repos" section:
   - Search the app repo's source for related pages, components, or logic
   - If a previous product version is configured, search it for the prior implementation
   - Note in the spec what exists, what works, and what this prototype should do differently
   - If nothing exists (or no app repo is configured), say so in the spec — that's useful context too

6. **Ask clarifying questions** — if the request leaves real design-shaping questions open (target user, key data shown, entry point, mobile vs desktop), ask the user 2-3 questions with AskUserQuestion before writing. Skip if the request is already specific.

7. **Write `prototypes/{slug}/spec.md`** following the spec format in `.claude/project.md`:
   - `Status: draft`
   - **Problem** — what we're solving, for whom, why now
   - **What good looks like** — observable qualities of a successful design; reference DESIGN.md principles where relevant
   - **Existing product** — findings from step 5
   - **Page structure** — proposed regions/sections in reading order, with one line on what each contains and why
   - **Place in the mock** — nav section and label, entry points, and links to/from existing built pages (or "first page of the mock" if nav.js doesn't exist yet)
   - Leave `## Page references`, `## Components`, `## Component research` as empty placeholders with a note that later commands fill them
   - `## Changelog` with one entry: today's date, "Spec drafted"

8. **Commit:**
   ```bash
   git add prototypes/{slug}/ && git commit -m "Add {slug} prototype spec (draft)" && git push
   ```

9. **Present the spec** — show the user the Problem, What good looks like, and Page structure sections and invite feedback. Iterate on the spec conversationally until the user is satisfied (commit after each revision).

## STOP — end of this command

Do NOT search Mobbin, download references, or write JSX. When the user approves the spec, they run `/proto-research {slug}`.

## CRITICAL CONSTRAINTS

**DO NOT:**
- Do any design research (that's `/proto-research`)
- Create files outside `prototypes/{slug}/`
- Write any JSX
- Prescribe visual design details in the spec — the spec defines the problem and structure; visuals come from research
