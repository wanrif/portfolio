# Copilot Instructions for `portfolio`

## Big Picture Architecture

- Vite + React + TypeScript SPA with a terminal-style UI.
- `src/main.tsx` wraps `App` with `I18nextProvider` + `Suspense` (no
  Redux/PersistGate).
- Global state is persisted Zustand in `src/stores/app/store.ts` (`theme`,
  `locale`, storage key `portreez:app`).
- Theme is both state and DOM-class driven in `src/containers/app/index.tsx`
  (`dark` + `amber-crt` on `document.documentElement`).

## UI Composition and Data Flow

- `src/containers/app/index.tsx` composes: `Navbar`, `Banner` (`top`),
  `Projects` (`projects`), `Experiences` (`now`), `MySkill` (`skills`),
  `Contact` (`contacts`), `FloatingMenu`.
- `FloatingMenu` navigation depends on `MENU_ITEMS`
  (`src/components/FloatingMenu/config.ts`) and `scrollToSection`
  (`src/utils/scrollToSection.ts`); keep `sectionId` and section `id` values
  aligned.
- Command palette behavior lives in `src/components/FloatingMenu/index.tsx`
  (`Cmd/Ctrl+K` open/close, `Esc` close).
- Language command triggers `[data-testid="locale-toggle"]`; preserve this
  attribute if refactoring locale logic.

## Content and Localization Patterns

- `Projects` and `Experiences` load content via eager `import.meta.glob` from
  `src/content/case-studies` and `src/content/now`.
- Locale-aware MDX selection is centralized in `src/utils/mdxLocale.ts`.
- Localized MDX files follow `*.en.mdx` / `*.id.mdx`; case studies export
  `meta`, changelog files export `entries`.
- Keep translation keys mirrored between `src/i18n/en.ts` and `src/i18n/id.ts`;
  locale toggle updates store + `i18n.changeLanguage`
  (`src/containers/language/index.tsx`).

## Project Conventions

- Prefer path aliases (`@components`, `@containers`, `@stores`, `@utils`)
  defined in `vite.config.ts` and `tsconfig.app.json`.
- Tailwind is CSS-first v4 in `src/assets/css/main.css` (`@theme`,
  `@custom-variant dark`); there is no `tailwind.config.ts`.
- Reuse existing color tokens (`shark`, `tuna`, `tertiary`, `gallery`) and use
  `src/utils/cn.ts` for class merging.
- Animation split: shared Framer Motion helpers in `src/utils/motion.ts`, GSAP
  tooltip animation in `src/components/FloatingMenu/animations.ts`.

## Build and Validation Workflow

- Use Bun scripts in `package.json`: `bun run dev`, `bun run build`,
  `bun run lint`, `bun run lint:fix`, `bun run fmt`, `bun run fmt:check`,
  `bun run preview`.
- `lint` is Oxlint type-aware with deny-warnings; `build` runs `tsc -b` then
  Vite build.
- No test script exists; standard verification is lint + build.

## Integration Notes

- `vite.config.ts` integrates MDX (`@mdx-js/rollup`), React SWC, Tailwind Vite
  plugin, and Rollup visualizer.
- Build output intentionally uses manual vendor chunking + Terser `drop_console`
  / `drop_debugger`; avoid changing unless required.

## Agent Workflow Preferences

- Use Context7 MCP for up-to-date library/API docs and setup guidance.
- Use SOLID frontend review mindset for code changes and refactors.
- Prefer minimal diffs and preserve existing public APIs unless a task explicitly requires changes.
