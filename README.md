# init-prototype

Starter template for a UI prototype sandbox. Vite + React 19 + Tailwind 4 with auto-routing and Playwright screenshots.

## Setup

```bash
git clone git@github.com:mkishi1221/init-prototype.git my-prototype
cd my-prototype
npm install --legacy-peer-deps
```

## Usage

### Dev server

```bash
npm run dev    # http://localhost:4000
```

### Add a prototype

Drop a `.jsx` file in `src/pages/` — it auto-appears in the index.

```
src/pages/
├── dashboard.jsx              → /dashboard
├── onboarding/step-1.jsx      → /onboarding/step-1
└── settings/profile.jsx       → /settings/profile
```

### Screenshots

```bash
npm run screenshot [page-name]          # Desktop (1280×900)
npm run screenshot:mobile [page-name]   # Mobile (390×844)
```

Output: `/tmp/prototype-screenshot.png`

Requires Playwright browsers — run `npx playwright install chromium` on first use.

## What's included

| File | Purpose |
|------|---------|
| `src/App.tsx` | Auto-routing index — reads `src/pages/**/*.jsx` |
| `src/styles.css` | Design tokens (colors, typography, radii) + Tailwind 4 theme |
| `src/pages/example.jsx` | Dummy page to verify setup works |
| `scripts/screenshot.mjs` | Headless Playwright screenshotter |

## Design tokens

`src/styles.css` defines CSS custom properties for surfaces, text, interactive states, status colors, and shadcn mappings. Use Tailwind classes like `bg-bg`, `text-text-secondary`, `bg-accent`, `border-border`, etc.
