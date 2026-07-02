---
description: "Create the GitHub issue for a fully-approved prototype spec"
---

Create the GitHub issue for prototype: $ARGUMENTS

**Project settings:** Read `.claude/project.md` for repo configuration, labels, spec format, and the status pipeline before executing.

**IMPORTANT: This workflow requires EXECUTION, not description. When a step says "do X", actually do it.**

**Running this command marks the whole spec (including component research) approved.** This command ONLY creates the issue. Building happens in `/proto-build {issue#}`.

## Workflow

1. **Load the spec** — read `prototypes/{slug}/spec.md`. Sanity-check it has non-empty Page references, Page variants, and Components sections, a `**Chosen:**` page variant, and a `**Chosen:**` variant for every new-library component; if anything is missing, stop and name the missing stage (or ask the user to pick the missing choice and record it). If `Status: refs-approved`, set it to `Status: components-approved`. If an `Issue: #N` already exists, stop and suggest `/proto-iterate {N}` instead.

2. **Ensure labels exist** in the GitHub repo (from project.md):
   ```bash
   gh label list
   # for each missing one of: prototype, planned, in-progress, built
   gh label create {name} --description "..." --color {hex}
   ```
   Colors: `prototype` `#5319E7`, `planned` `#FBCA04`, `in-progress` `#0E8A16`, `built` `#1D76DB`.

3. **Create the issue** — `gh issue create` in the prototypes repo, labels `prototype,planned`, assigned to the default assignee. Plain text body (no backticks). Structure:
   - Title: `Prototype: {Feature Name}`
   - **Spec:** `prototypes/{slug}/spec.md` — the durable pointer every later command follows
   - Summary — 2-3 sentences from the Problem section
   - Page structure — the section list from the spec
   - Chosen direction — the chosen page variant and each component's chosen variant, with the one-line why
   - Components — the inventory table (component, source, one-line reasoning)
   - Key references — the 3-4 most load-bearing reference images by path
   - Acceptance criteria — checklist derived from "What good looks like" (each item observable in the browser)

4. **Update the spec** — set `Status: issued (#N)` and add `Issue: #N` under the title. Append a Changelog entry ("Issue #N created").

5. **Commit:**
   ```bash
   git add prototypes/{slug}/spec.md && git commit -m "Create issue #{N} for {slug} prototype" && git push
   ```

6. **Report** — give the user the issue URL.

## STOP — end of this command

Do NOT start building. The user reviews the issue and runs `/proto-build {N}`.

## CRITICAL CONSTRAINTS

**DO NOT:**
- Write any JSX or start implementation
- Include the word "claude" anywhere in the issue
- Use backticks or complex markdown in the `--body` parameter (plain text, quotes instead of backticks)
