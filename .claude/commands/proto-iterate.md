---
description: "Reopen a built prototype and iterate on it, reusing its spec and research"
---

Iterate on prototype: $ARGUMENTS

**Project settings:** Read `.claude/project.md` for repo configuration, folder structure, and conventions before executing.

This command is **conversational** — it reloads all prior context, then discusses direction with the user before touching anything.

## Workflow

1. **Resolve the prototype** — `$ARGUMENTS` is an issue number or a slug:
   - Issue number: `gh issue view {N}`, follow the **Spec:** pointer to get the slug
   - Slug: read `prototypes/{slug}/spec.md` and get the issue number from its `Issue:` line
   - If the issue is closed, reopen it: `gh issue reopen {N}`

2. **Reload all context:**
   - The spec in full — especially the Changelog (what's been done before), the chosen variants, and the reference annotations
   - The final page files in `prototypes/{slug}/pages/` and the variant/gallery files (the design history)
   - `src/components/COMPONENTS.md` for the shared components this prototype uses, and `src/nav.js` for where the page sits in the product mock

3. **Discuss the changes** — summarize the current state to the user (one paragraph + the route `localhost:4000/{slug}/{page}` so they can look at it in the browser), then discuss what they want to change. **Do not edit anything until the direction is agreed in conversation.** Surface trade-offs, and check the change against DESIGN.md and the original What-good-looks-like criteria.

4. **Targeted research (only if needed)** — if the change introduces a pattern not covered by existing references, run a focused Mobbin pass (`mcp__mobbin__search_screens`) into the existing folders (`research/page/` or `research/components/{component}/`, numbering continues from the highest), annotate in the spec, and confirm the reference direction with the user before building. If the change is a genuinely new direction for the page or a component, offer to sketch 2-3 quick variants first (into `pages/variants/` or `pages/component-variants/`, same rules as /proto-research and /proto-components) rather than jumping straight to the final change.

5. **Apply the changes:**
   - Page-level: edit `prototypes/{slug}/pages/{page}.jsx`
   - Shared-component-level: edit `src/components/{Name}.jsx` — first check its **Used by** list in COMPONENTS.md and tell the user which other prototypes are affected
   - Follow all DESIGN.md rules and the CRITICAL CONSTRAINTS from `/proto-build`
   - Run `npx vite build` to catch syntax and import errors. Do not take screenshots.

6. **Present** — give the user the route(s) to review in the browser. Keep iterating steps 3-6 until they're satisfied.

7. **Record and sync** — once the user approves the iteration:
   - Set `Status: iterating` and append a dated Changelog entry to the spec describing what changed and why
   - Update COMPONENTS.md if any shared component's API or Used-by changed
   - Commit and push: `git add src/components/ prototypes/{slug}/ && git commit -m "Iterate on {slug}: {summary}" && git push`
   - Comment on the issue with what changed
   - Ask the user whether the issue should stay open for more iteration or be closed

## CRITICAL CONSTRAINTS

**DO NOT:**
- Make edits before the direction is agreed in conversation (step 3 is a hard gate)
- Change a shared component without flagging affected prototypes first
- Erase or renumber existing research, variants, or galleries — iteration is additive
- Take screenshots or leave a dev server running
- Skip the Changelog entry — it's how future iterations know the history
- Include the word "claude" in commits or issue comments
