# Component Library Registry

Shared components reused across prototypes. Import them — never re-implement a dialog, button, or shell per page. This registry is the source of truth for what exists; `/proto-components` reads it to classify components as **library-reuse** vs **new-library**, and `/proto-build` updates it when adding components.

## Rules

- One component per file, PascalCase: `src/components/{Name}.jsx`
- Default export = the component. Named `Demo` export = a self-contained showcase rendered on the `/components` gallery page (realistic props, all key variants)
- Plain JSX, no TypeScript. Allowed deps: `react`, `lucide-react`, `clsx`
- Follow `DESIGN.md` exactly — these components are what makes prototypes consistent
- Changing a component changes every prototype that uses it — check **Used by** before editing, and flag affected prototypes to the user

## Registry

| Component | Purpose | Key props | Used by |
|---|---|---|---|
| ExampleCard | Stub stat card demonstrating the library + Demo convention — replace with real components | title, value | _(example only)_ |

<!-- Row format:
| Dialog | Modal dialog with sticky header/footer, overlay, Escape/overlay dismiss | title, onClose, footer, width ("standard" \| "wide"), children | checkout-flow, settings |
-->
