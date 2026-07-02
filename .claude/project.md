# Project Configuration — {{PROTOTYPES_REPO_NAME}}

Configuration for the `/proto-*` prototyping workflow commands. All commands read this file before executing.

> **Template setup:** replace every `{{...}}` placeholder, then delete this note.

## Repository

- **GitHub Repo:** {{GITHUB_ORG}}/{{PROTOTYPES_REPO_NAME}}
- **Default Assignee:** {{GITHUB_USERNAME}}
- **Base Branch:** main (prototypes commit directly to main — no PRs)

## Related Repos

- **App repo (the real product):** {{RELATIVE_PATH_TO_APP_REPO, e.g. ../my-app}} — search its source for existing implementations when writing specs. Remove this line if there is no app yet.
- **Previous product version:** {{RELATIVE_PATH_OR_REMOVE}} — useful reference when a feature existed before. Remove if not applicable.

## Key Files

- **Design Guidelines:** `DESIGN.md` — source of truth for all UI (tokens, typography, spacing, components, visual hierarchy, contrast rules). Read before writing any spec or JSX.
- **Component Registry:** `src/components/COMPONENTS.md` — what shared components exist, their APIs, and which prototypes use them
- **Component Gallery:** `localhost:4000/components` — renders every library component's `Demo` export

## The Product Mock

Prototypes are not isolated pages — **each build extends one coherent mock of the whole product.** Final pages render inside the shared app shell with working navigation between all built prototypes, so the mock grows page by page into the full product.

- **App shell:** `src/components/AppShell.jsx` — sidebar + header wrapper, a library component like any other. It doesn't exist until the first prototype that needs it researches and builds it through the normal workflow (`/proto-components` classifies it `new-library`).
- **Nav registry:** `src/nav.js` — the source of truth for what's in the mock. Created by the first `/proto-build`, appended to by every subsequent one:
  ```js
  export const nav = [
    // { section: 'Main', label: 'Dashboard', route: '/dashboard-slug/dashboard', icon: 'LayoutDashboard' },
  ];
  ```
  AppShell imports it and renders the sidebar from it, highlighting the active route.
- **Every final page** renders inside `AppShell` and registers itself in `src/nav.js`. Where the spec implies flows between pages, wire real links to already-built pages (and note in the issue when a link's target page doesn't exist yet).
- **Variants** import AppShell too once it exists (cheap via the library, and layout decisions depend on shell context). Before AppShell exists, variants are standalone.

## Folder Structure (per prototype)

```
prototypes/{slug}/
├── spec.md                    # the working spec (see format below)
├── pages/
│   ├── {page}.jsx             # FINAL version built by /proto-build — route: localhost:4000/{slug}/{page}
│   ├── variants/
│   │   └── {name}.jsx         # 3-4 divergent page sketches from /proto-research — one variant per file,
│   │                          #   named by distinguishing idea (split, wizard, timeline — never v1/v2)
│   └── component-variants/
│       └── {component}.jsx    # one file per new-library component from /proto-components —
│                              #   5-6 meaningfully different variants stacked vertically
└── research/
    ├── page/                  # pass-1 page-level references: {nn}-{company}-{screen}.jpg
    └── components/
        └── {component}/       # pass-2 references, one folder per researched component
```

Variant and gallery files are kept permanently — they are the design history that /proto-build and /proto-iterate build from. Everything is committed to git (including reference images) so research survives and can be reused when iterating.

## spec.md Format

```markdown
# {Feature Name} — Prototype Spec

Status: {stage}
Issue: #{N}            ← added by /proto-issue

## Problem             ← what we're solving, for whom, why now
## What good looks like ← observable qualities of a successful design
## Existing product    ← what the app repo already has, if anything
## Page structure      ← regions/sections in reading order
## Place in the mock   ← nav section/label, entry points, links to/from existing built pages
## Page references     ← table: Ref | Image | Source | What to learn
## Page variants       ← table: Variant | Route | Key idea | Grounded in — plus **Chosen:** {name} — {why}
## Components          ← table: Component | Source | References | Reasoning
## Component research  ← one ### subsection per researched component: reference table +
##                        gallery route + variant list + **Chosen:** {variant} — {why}
## Changelog           ← dated entries appended by /proto-iterate
```

- Reference images are numbered `01-`, `02-`, ... and cited as **R1**, **R2** (page-level) or **{Component} C1, C2** (component-level) so every design claim links to a specific image
- Image cells use relative markdown links (`![](research/page/01-linear-settings.jpg)`) so they render on GitHub
- **Component Source values:** `library-reuse` (exists in COMPONENTS.md) | `new-library` (reusable — build into src/components/, needs research) | `one-off` (page-specific, built inline)
- **Chosen variants are the contract:** /proto-build ports the chosen page variant and chosen component variants to full fidelity — it does not redesign them

## Status Pipeline & Approval Mechanism

```
draft → spec-approved → refs-approved → components-approved → issued (#N) → built → iterating
```

**Running the next command IS the approval signal.** Each command's first step advances the Status of the previous stage. Commands never run past their own stage — each ends by presenting its output for review. To refine a stage, re-run the same command (they detect existing work and refine instead of restarting).

| Command | Requires Status | Sets Status | Produces |
|---|---|---|---|
| /proto-spec | (new) | draft | spec.md |
| /proto-research | draft+ | spec-approved | page references + 3-4 page variants (one file each) |
| /proto-components | spec-approved+ | refs-approved | component inventory + refs + one 5-6-variant gallery file per new component |
| /proto-issue | refs-approved+ | components-approved, then issued (#N) | GitHub issue |
| /proto-build | issued | built | library components + final page, built from the chosen variants |
| /proto-iterate | built | iterating | changes + changelog |

Variant choices happen conversationally at the end of /proto-research and /proto-components and are recorded in the spec as `**Chosen:**` lines — the next command verifies they exist before proceeding.

## Issue Labels

Created on demand with `gh label create`:

- `prototype` — all issues from this workflow
- `planned` — spec approved, issue created, not yet built
- `in-progress` — /proto-build running
- `built` — prototype built, awaiting user review

## Conventions

- Commit directly to `main` and push after each meaningful step (research saved, spec updated, prototype built) — research must never exist only locally
- No Claude attribution in commit messages, issues, or comments
- Prototype pages are plain JSX (no TypeScript); allowed deps: `react`, `lucide-react`, `clsx`, plus imports from `src/components/`
- Never edit `src/App.tsx` (the auto-router) or `src/pages/components.jsx` (the auto-gallery); `src/nav.js` is the one registry file commands DO edit (append-only per build)
- **No screenshots in the workflow.** Sanity-check renders with `npx vite build` (catches syntax/import errors); visual review happens in the user's browser via `npm run dev` at `localhost:4000` — always give the user the routes to look at
- **Variants must genuinely diverge** — different layout, information architecture, or interaction model; never small iterations on one idea, and never multiple page variants in one file
