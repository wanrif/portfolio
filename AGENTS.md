# Project Guidance

## Commands

- Use Bun 1.4.2, as declared in `package.json`.
- Use [Vite Plus](https://viteplus.dev/llms.txt) as the development server and
  build tool.
- `vp install` installs project dependencies.
- `vp dev` starts Vite Plus on port 5173.
- `vp check` runs format, lint, and type checks.
- `vp build` Build for production.
- There is no test script in `package.json`; do not assume a test suite exists.

## Project Structure

- `src/main.tsx` is the entry point; `src/containers/app/index.tsx` composes the
  page sections.
- Put section UI in its owning directory under `src/components/`. Shared state
  lives in `src/stores/`, reusable behavior in `src/utils/`, and translated
  interface copy in `src/i18n/en.ts` and `src/i18n/id.ts`.
- Tailwind CSS v4 theme tokens and the dark variant are defined in
  `src/assets/css/main.css`; do not introduce a `tailwind.config` unless the
  setup changes.
- Keep import aliases aligned between `vite.config.ts` and `tsconfig.app.json`.

## Localization And Case Studies

- Keep English and Indonesian interface strings in sync. When changing the
  active locale, update both the Zustand app store and i18next, following
  `src/containers/language/index.tsx`.
- Case studies live in `src/content/case-studies/` as paired `<slug>.en.mdx` and
  `<slug>.id.mdx` files. Each exports a `meta` object and an MDX body;
  `src/components/Projects/index.tsx` discovers them automatically.
- Provide both localized files for each case study. When any localized files
  exist, the locale loader selects only files for the active locale rather than
  falling back per case study; a missing translation can hide that project.

## UI Changes

- For design-specific guidance, follow `.agents/skills/impeccable/SKILL.md`.
- Preserve the portfolio's terminal-OS visual language. For animation or
  visual-effect changes, keep content readable and unobstructed, verify both
  light and dark themes, and respect reduced-motion preferences.
