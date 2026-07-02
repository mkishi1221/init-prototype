---
description: "Page-level design research: gather Mobbin references, then sketch 3-4 divergent page variants"
---

Run page-level design research for prototype: $ARGUMENTS

**Project settings:** Read `.claude/project.md` for repo configuration, folder structure, spec format, and the status pipeline before executing.

**IMPORTANT: This workflow requires EXECUTION, not description. When a step says "do X", actually do it.**

**Running this command marks the spec approved.** This command produces page-level references AND 3-4 quick page variants that explore genuinely different directions. No component research, no final build. When the user has approved the references and picked a variant, they run `/proto-components {slug}` — that is the approval signal.

## Workflow

1. **Load the spec** — read `prototypes/{slug}/spec.md`. If it doesn't exist, list available slugs under `prototypes/` and stop. If `Status: draft`, set it to `Status: spec-approved`.

2. **Refine mode check** — if `research/page/` already contains images or `pages/variants/` already has files, this is a refinement run:
   - Show the current references and variants, ask the user what to change (drop refs, research a new angle, replace a variant, explore a different axis)
   - Keep approved material and its numbering/names; only add or replace what was asked
   - Then continue with that narrower goal

3. **Search Mobbin** — use `mcp__mobbin__search_screens` with 2-3 queries covering different angles of the page design problem (derived from the spec's Problem and Page structure):
   - `platform: "web"` by default, `"ios"` if the spec targets mobile
   - `mode: "deep"`, `image_format: "jpg"`
   - If the user or spec mentions specific apps, include their names in queries
   - Aim for 6-10 relevant results total; prefer diverse approaches over near-duplicates

4. **Download references** — into `prototypes/{slug}/research/page/`:
   - Naming: `{nn}-{company}-{screen-slug}.jpg`, numbered `01-`, `02-`, ... continuing from the highest existing number
   - `curl -sL "{imageUrl}" -o "prototypes/{slug}/research/page/{nn}-{company}-{screen}.jpg"` — batch the curls in parallel
   - Read each downloaded image to verify it's relevant; delete and replace duds

5. **Annotate in the spec** — write/update the `## Page references` table:

   | Ref | Image | Source | What to learn |
   |---|---|---|---|
   | R1 | ![](research/page/01-linear-settings.jpg) | Linear | Single-column settings list; section labels create scannable groups without cards |

   - **"What to learn" must be specific** — one or two concrete observations per image about layout, hierarchy, or interaction. Not "nice clean design".
   - If a reference is a counter-example ("what to avoid"), say so explicitly.

6. **Sketch 3-4 page variants** — quick standalone explorations in `prototypes/{slug}/pages/variants/{name}.jsx`:
   - **Each variant is ONE file, and each file is ONE variant** — no tabs, toggles, or switchers between designs; the user compares them side by side in the browser
   - **Variants must be genuinely different directions, not small iterations on the same idea** — diverge on a real axis: layout (sidebar vs tabs vs single column), information architecture (timeline vs table vs cards), interaction model (inline vs dialog, wizard vs single page). If two variants would share most of their structure, replace one with a different direction.
   - Name each file after its distinguishing idea (`split.jsx`, `wizard.jsx`, `timeline.jsx`) — never `v1`/`v2`/`option-a`
   - Ground each variant in specific references — it should be traceable to R-numbers
   - Keep them SKETCH-fidelity: full page structure and hierarchy, realistic content (no "Lorem ipsum"), but don't polish micro-interactions — the goal is comparing directions cheaply
   - Plain JSX; DESIGN.md tokens; may import existing components from `src/components/` but must NOT create new library components (that happens in `/proto-build`)
   - If `AppShell` exists in the library, variants render inside it (layout decisions depend on shell context); before it exists, variants are standalone
   - Routes appear automatically at `localhost:4000/{slug}/variants/{name}`

7. **Sanity-check the variants render** — run `npx vite build` (output is gitignored) to catch syntax and import errors. Fix any failures. Do not take screenshots.

8. **Record variants in the spec** — add/update the `## Page variants` table:

   | Variant | Route | Key idea | Grounded in |
   |---|---|---|---|
   | split | /{slug}/variants/split | Master-detail: list left, editor right | R1, R4 |

9. **Commit:**
   ```bash
   git add prototypes/{slug}/ && git commit -m "Add page references and variants for {slug}" && git push
   ```

10. **Present** — show the user the reference annotations, then list each variant with its key idea and route (`localhost:4000/{slug}/variants/{name}`) so they can compare them in the browser (`npm run dev`). Iterate conversationally (drop refs, rework a variant, explore a new axis — repeat steps 3-9 for changes). **When the user picks a winning variant, record it in the spec** (`**Chosen:** {name} — {one line why}` under the Page variants table) and commit.

## STOP — end of this command

Do NOT derive the component inventory, research components, or build the final page. When the references are approved and a variant is chosen, the user runs `/proto-components {slug}`.

## CRITICAL CONSTRAINTS

**DO NOT:**
- Research individual components (that's `/proto-components`)
- Build the final page or create/modify anything in `src/components/`
- Put multiple variants in one file, or make variants that are minor iterations of each other
- Touch files outside `prototypes/{slug}/`
- Add references without a specific what-to-learn annotation
- Renumber existing approved references or rename existing variants
