# Design Guidelines

Source of truth for all prototype UI in this repo. Every page and library component must follow these tokens and patterns.

> **Template note:** this ships with a neutral placeholder design language (near-black text, blue accent, warm grays). Swap the token values in `src/styles.css` and the specifics below for your brand's — but keep the structure, the contrast rules (recompute them if you change colors), and the hierarchy principles.

---

## Design Tokens (Tailwind utilities)

These are the only colors allowed. They map to CSS variables in `src/styles.css`.

### Surfaces

| Utility | Hex | Usage |
|---|---|---|
| `bg-bg` | `#FBFBFB` | Page background |
| `bg-surface` | `#FFFFFF` | Cards, dialogs, popovers, sidebar |
| `bg-surface-raised` | `#EFEFEF` | Hover states, icon containers, tag backgrounds |
| `border-border-subtle` | `#F0F0F0` | Sticky header/footer dividers, inner separators |
| `border-border` | `#E5E5E5` | Card borders, input borders, dividers |

### Text — four colors; metadata is smaller, not lighter

| Utility | Hex | Usage |
|---|---|---|
| `text-text-primary` | `#0A0A0A` | Headings, page titles, primary values, score numbers |
| `text-text-strong` | `#1A1A1A` | Emphasised inline text, lead sentences (rare) |
| `text-text-body` | `#3A3A3A` | Default body prose — the content the user actually reads |
| `text-text-secondary` | `#6A6A6A` | Subheadings, form labels, orientation text, AND metadata |
| `text-text-tertiary` | `#6A6A6A` | Deprecated alias of secondary (kept so legacy class names stay safe) |

**The metadata register is a SIZE, not a color.** Timestamps, fine print, helper text, and counts are `text-text-secondary` at **12px** — never a lighter gray. Light grays like `#9A9A9A` fail WCAG AA (2.8:1) and are the main source of illegible light-on-light designs: `#6A6A6A` is the lightest text gray that exists.

**The one-sentence rule:** if the user will read it carefully → `text-body`. Glance at it for orientation → `text-secondary` at 13-14px. Metadata they barely register → `text-secondary` at 12px. Anchors of the page → `text-primary`.

**Never** use pure black (`#000000`), `text-secondary` for body prose, or any gray lighter than `#6A6A6A` for any text.

### Interactive

| Utility | Hex | Usage |
|---|---|---|
| `bg-accent` | `#0667D9` | Filled primary button backgrounds and text-label badge fills ONLY |
| `text-accent-fg` | `#FFFFFF` | Text on accent buttons |
| `hover:bg-accent-hover` | `#0558B8` | Primary button hover |
| `bg-accent-light` | `#EFEFEF` | Active nav background, subtle accent backgrounds |

The accent is reserved strictly for filled buttons and badge fills. All other interactive affordances — link text, active nav text, borders, progress bars, spinners — use `text-primary`. This keeps the accent a strong call-to-action signal.

### Status

| Utility | Usage |
|---|---|
| `text-success` / `bg-success-light` | Success text / callout backgrounds, positive badges |
| `text-warning-strong` (#8A5A12) | **All warning TEXT below 18px** — labels, badge text, inline warnings (#B7791F fails AA for small text) |
| `text-warning` (#B7791F) / `bg-warning-light` | Warning dots, icons, fills, large text only / callout backgrounds |
| `text-error` / `bg-error-light` | Error text, destructive button text / callout backgrounds, negative badges |

---

## Contrast Rules (computed, WCAG AA)

Measured ratios for this palette. These are hard rules — light-on-light is the most common way prototypes go wrong. If you swap the palette, recompute this table (relative-luminance contrast, 4.5:1 for text <24px, 3:1 for large text and UI boundaries).

| Combination | Ratio | Verdict |
|---|---|---|
| `text-primary` / `text-body` / `text-secondary` on any surface | 19.8 / 11.4 / 4.7-5.4 | ✅ Pass — safe everywhere |
| `accent` text or white-on-accent buttons | 5.3 | ✅ Pass |
| `success` and `error` text, incl. on their light backgrounds | 4.7-6.4 | ✅ Pass |
| Light grays (#9A9A9A and lighter) — REMOVED from this system | 2.5-2.8 | ❌ Failed AA; tertiary now aliases `#6A6A6A` |
| **`warning` (#B7791F) text at small sizes** | **3.3-3.6** | ❌ Fails AA for <18px — use `warning-strong` instead |
| `warning-strong` (#8A5A12) on white / warning-light / raised | 5.9 / 5.3 / 5.1 | ✅ Pass — the small-text warning color |
| `surface` vs `bg`, `raised` vs `surface` (non-text) | 1.0-1.2 | Imperceptible — never a boundary by itself |

What this means in practice:

1. **De-emphasize with size, never with lighter color.** The metadata register is `text-secondary` at 12px. There is no text gray lighter than `#6A6A6A` in this system — if something feels too prominent, make it smaller or lighter-weight, not paler.
2. **`text-secondary` is the floor for readable content.** It passes AA everywhere, but only just on raised surfaces — for anything longer than a short label on `bg-surface-raised`, step up to `text-body`.
3. **Warning text below 18px uses `text-warning-strong` (#8A5A12), never `text-warning`.** `text-warning` (#B7791F) remains correct for dots, icons, fills, and large text — the hue reads the same; only running text gets the darker shade.
4. **Every container gets an explicit border or ring.** `surface` on `bg` is a 1.03:1 difference — a borderless white card on the page background is invisible. Cards, popovers, inputs, and rows must be bounded by `border-border` / `ring-foreground/10`, not by background difference alone.
5. **White text only on strong fills:** `accent`, `accent-hover`, `error`, `success`, or `text-primary` backgrounds. Never white or light text on `accent-light`, `surface-raised`, or any status `-light` background — those are all near-white grays.
6. **Never lighten a text tier to "soften" a design.** If a section feels too heavy, reduce weight or size within the approved tiers — don't reach for a lighter gray.

---

## Typography

One typeface for everything (Inter by default, loaded as `font-sans` via `--font-body`).

| Context | Spec |
|---|---|
| Page title | 22px / 700 / -0.5px tracking / 28px line-height (`text-[22px] font-bold tracking-[-0.5px]`) |
| Card / dialog title | 16px / 500 (`text-base font-medium`) |
| Score / stat value | 32px / 600 / -0.5px tracking |
| Body / descriptions | 14px / 400 — prose the user reads: `text-text-body`; card descriptions/supporting text: `text-text-secondary` |
| Body strong | 14px / 500 / `text-text-strong` |
| Button | 14px / 500 (`text-sm font-medium`) |
| Hint / timestamp / metadata | 12px / 400 / `text-text-secondary` — the metadata register: smaller, not lighter |
| Section label / eyebrow / form label | 11px / 600 / uppercase / 0.08em tracking / `text-text-secondary` |
| Badge / tag | 11px / 600 / uppercase / 0.06em tracking |

Key rules:
1. **No font weight below 400 anywhere.**
2. Negative tracking on display sizes; positive 0.06–0.08em on uppercase labels; default on body.
3. Uppercase tracked labels are always weight 600 (500 reads soft at that size).

---

## Spacing

Loose 4px grid. **Tight within, generous between** — elements inside a group sit close; groups are spaced apart.

| Value | Usage |
|---|---|
| 4–8px | Inner gaps: badge padding, icon spacing, tags in a row |
| 6px | Label → input gap |
| 10–14px | Input padding, nav item padding, inner card spacing |
| 16–20px | Card section gaps, dialog body padding, grid gaps |
| 18px | Between form fields |
| 24px | Card padding |
| 28px | Dialog horizontal padding |
| 32–48px | Page top padding, major section breaks |

Page content max width: 900px. Dialogs: ~420px confirmations, ~560px wide forms.

---

## Radius, Shadows, Transitions

The Tailwind radius scale resolves from `--radius: 0.625rem`: `rounded-sm` 6px · `rounded-md` 8px · `rounded-lg` 10px · `rounded-xl` 14px · `rounded-2xl` 18px.

| Radius | Usage |
|---|---|
| `rounded-xl` (14px) | Cards, dialog shells |
| `rounded-lg` (10px) | Buttons, inputs |
| `rounded-sm` (6px) | Nav items, small badges, icon containers |
| `rounded-full` | Tag pills, avatars |

- Cards have **no shadow at rest** — a hairline ring only (`ring-1 ring-foreground/10` or `border border-border`). Shadow appears only on hover for clickable cards, paired with the border darkening slightly.
- All shadows use warm rgba based on `#0A0A0A`, never pure black.
- Dialog shadow: `0 4px 16px rgba(10,10,10,0.12), 0 1px 4px rgba(10,10,10,0.06)`.
- All micro-interactions: `transition-... duration-150 ease-out`. Nothing longer than 150ms for interactive feedback.

---

## Core Component Patterns

### Buttons

All: `h-8 px-2.5 rounded-lg text-sm font-medium transition-all duration-150` (32px tall). **One primary button per context, ever.**

- **Primary:** `bg-accent text-accent-fg hover:bg-accent-hover`
- **Ghost/secondary:** transparent, `text-text-primary border border-border`, hover `bg-surface-raised`
- **Destructive (default):** subtle, not solid — `bg-error-light text-error hover:bg-error/20`. A solid `bg-error text-white` button is reserved for the confirm button in a destructive confirmation dialog.
- Sizes: default h-8; small `h-7 text-[13px]`; icon `size-8`

### Inputs

`bg-transparent border border-border rounded-lg h-8 px-2.5 text-sm text-text-primary placeholder:text-text-secondary`. Focus: `border-text-secondary` + 3px soft ring at `text-secondary`/50%. Error: border + ring shift to `error`.

### Cards

`bg-surface rounded-xl ring-1 ring-foreground/10` (or `border border-border`), `p-4`, internal `gap-4`. Card title: 16px / 500. Optional footer: `border-t bg-surface-raised/50 p-4`. Clickable cards on hover: border darkens slightly + soft shadow — NOT an accent-colored border.

### Dialogs (use the shared library component — never hand-roll)

- Overlay: `rgba(10,10,10,0.35)` (light — never darker), optional `backdrop-blur-[2px]`
- Shell: `bg-surface rounded-xl border border-border`, shadow `0 4px 16px rgba(10,10,10,0.12), 0 1px 4px rgba(10,10,10,0.06)`
- Max width: **420px** for confirmations, ~560px for wide forms; always `max-w-[calc(100%-2rem)]` for mobile
- Header: title 16px / 500, ✕ close top right. Footer: `border-t bg-surface-raised/50`, buttons right-aligned — **Cancel first, then the confirm/primary action rightmost** (destructive confirms are solid `bg-error` and also sit rightmost, after Cancel)
- Dismiss on overlay click, Escape, and ✕
- Animation: fast — ~100-120ms fade + slight zoom

### App shell (header + sidebar)

- **Top header: 48px fixed**, `bg-surface border-b border-border`, containing the product logo and user menu
- **Sidebar: 240px fixed below the header**, `bg-surface border-r border-border`
- Nav items: 40px tall, `px-2.5 rounded-sm gap-3.5 text-sm font-medium text-text-primary` — same color for active AND inactive
- **Active state: a 3px `text-primary` bar on the left edge of the item, no background fill.** Hover: `bg-accent-light`.
- No section labels in the main nav (a plain list; secondary groups separated by a `border-t`)

### Page header anatomy

```
[Eyebrow — 11px uppercase tracked, text-secondary]
[Page title — 22px / 700 / -0.5px]
[Subtitle — 14px / 400, text-body]
```

---

## Visual Hierarchy Principles

Every screen and component must have a clear reading order. Before writing JSX, decide it; after building, verify you can describe it in one sentence.

1. **What is the #1 thing the user should see?** Make it dominant — larger type, bolder weight, or more contrast. Everything else is visually subordinate.
2. **Group related information** — whitespace, dividers, or background changes cluster items that belong together. Don't interleave unrelated data on one row.
3. **Vary visual weight deliberately** — different importance must look different. Use the full range of the text tiers. Never give three tiers the same size/weight.
4. **Don't hide scannable content behind disclosure** — content users compare at a glance stays visible by default. Collapsibles are for long-form or rarely-needed detail.
5. **One dominant element per card/row** — a card with five equally-sized text lines reads as a wall. Pick one anchor (name, metric, image); everything else supports it.
6. **Use spatial hierarchy, not just text hierarchy** — padding and section breaks create priority as much as font size does.
7. **No nested containers** — never a bordered box inside a bordered box inside a bordered box. One level of containment max. Sub-items render as flat rows, inline pills, or subtle dividers. A `bg-surface-raised` row inside a `bg-surface` card is fine; stacked borders are not.

---

## Do's and Don'ts

**Do:**
- Import shared components from `src/components/` — never re-implement a dialog, button, or sidebar per page
- Use realistic placeholder content, never "Lorem ipsum"
- Put dialog footer buttons on the right: Cancel first, confirm/primary rightmost (destructive confirms are solid error-red, also rightmost)
- One primary button per view or dialog
- Card shadow only on hover, never at rest
- Use the 3px left-bar pattern for active nav items (no background fill)

**Don't:**
- Use any color outside the token set, or pure black text
- Use font weight below 400
- Use `text-text-secondary` for body prose (that's what `text-text-body` is for)
- Use radius below 4px on visible elements
- Use transitions longer than 150ms for interactive feedback
- Nest bordered containers
