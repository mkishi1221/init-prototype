# init-prototype

Starter template for a UI prototyping sandbox driven by a spec-first, research-first Claude Code workflow. Vite + React 19 + Tailwind 4. Prototypes accumulate into **one coherent mock of the whole product** — every page renders inside a shared app shell with working navigation.

## Setup

```bash
git clone git@github.com:mkishi1221/init-prototype.git my-prototypes
cd my-prototypes
rm -rf .git && git init          # start fresh history
npm install --legacy-peer-deps
```

Then fill in the `{{...}}` placeholders in [.claude/project.md](.claude/project.md) (GitHub repo, assignee, app repo path) — every workflow command reads that file.

## The workflow

Six Claude Code commands, one per approval stage. Each command ends by presenting its output; **running the next command is the approval signal.**

| Command | What it does |
|---|---|
| `/proto-spec {description}` | Working spec: problem, what good looks like, page structure, place in the mock |
| `/proto-research {slug}` | Mobbin references + 3-4 genuinely divergent page variants (one file each) |
| `/proto-components {slug}` | Component inventory (reuse-first) + per-component research + one 5-6-variant gallery per new component |
| `/proto-issue {slug}` | GitHub issue from the fully-approved spec |
| `/proto-build {issue#}` | Final build: library components from chosen variants, then the full page into the mock |
| `/proto-iterate {issue#\|slug}` | Reopen a built prototype and keep iterating, reusing its spec and research |

Requires the [Mobbin MCP server](https://mobbin.com) for design research (`mcp__mobbin__search_screens`).

## Key ideas

- **Research is committed.** Each prototype is self-contained under `prototypes/{slug}/`: spec, reference images, variants, and the final page.
- **Variants explore, the build converges.** Research produces genuinely different directions (layout / IA / interaction), you pick one, and `/proto-build` ports the chosen variant to full fidelity — it never redesigns.
- **Shared components enforce consistency.** Dialogs, buttons, the app shell live in `src/components/` with a registry ([COMPONENTS.md](src/components/COMPONENTS.md)). Pages import them. Browse them at `/components`.
- **The mock is cumulative.** `src/nav.js` registers every built page; the sidebar grows with each build and cross-page links use real routes.
- **Accessibility is enforced at the token level.** [DESIGN.md](DESIGN.md) ships computed WCAG contrast rules; the palette has no text gray that fails AA — metadata is smaller, never lighter.
- **No screenshots.** Render checks use `npm run check` (vite build); visual review happens in your browser.

## Structure

```
├── .claude/
│   ├── project.md              # workflow configuration — FILL IN THE PLACEHOLDERS
│   └── commands/               # the six /proto-* commands
├── DESIGN.md                   # design guidelines: tokens, contrast rules, components, hierarchy
├── prototypes/                 # one self-contained folder per prototype
└── src/
    ├── components/             # shared component library + COMPONENTS.md registry
    ├── pages/components.jsx    # auto-gallery of library components
    └── App.tsx                 # auto-router (never edit)
```

## Running

```bash
npm run dev      # localhost:4000 — index lists all pages, grouped by prototype
npm run check    # vite build; catches syntax/import errors
```
