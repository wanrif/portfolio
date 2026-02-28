# Copilot Instructions for `portfolio`

## Big Picture Architecture

- This is a Vite + React + TypeScript single-page portfolio with Redux Toolkit state and persisted user preferences.
- App bootstrapping in `src/main.tsx` wraps `App` with providers in this order: Redux `Provider` → `PersistGate` → `I18nextProvider`.
- Global app state lives in `src/containers/app/reducer.ts` (`theme`, `locale`), selected via `src/containers/app/selectors.ts` and persisted through `redux-persist`.
- i18n initialization is intentionally delayed until persisted state is rehydrated (`src/i18n/index.ts` subscribes to `persistor` and then calls `i18n.init`).
- Persistence is compressed via `src/utils/LZStringStorage.ts` and configured in `src/stores/persistence.ts` (`keyPrefix: portreez:`).

## UI Composition & Data Flow

- Top-level layout is composed in `src/containers/app/index.tsx`: `Navbar`, then content sections (`Banner`, `Experiences`, `MySkill`, `Contact`), plus `FloatingMenu`.
- Section navigation is ID-driven: `FloatingMenu` maps `MENU_ITEMS` (`src/components/FloatingMenu/config.ts`) to `scrollIntoView` targets. Keep `sectionId` values in sync with section `id` attributes.
- Theme changes must update both Redux state (`setTheme`) and the DOM class (`document.documentElement.classList`), as done in `App` and `FloatingMenu`.
- Locale changes are handled in `src/containers/language/index.tsx` by dispatching `setLocale` and calling `i18n.changeLanguage`.

## Project Conventions

- Prefer path aliases (`@components`, `@containers`, `@stores`, etc.) over deep relative imports; aliases are defined in both `vite.config.ts` and `tsconfig.app.json`.
- Use typed Redux hooks from `src/stores/hooks.ts` (`useAppDispatch`, `useAppSelector`) instead of raw `react-redux` hooks.
- Use `src/utils/cn.ts` for class composition (`clsx` + `tailwind-merge`) when combining conditional Tailwind classes.
- Keep translation keys mirrored between `src/i18n/en.ts` and `src/i18n/id.ts`; new UI copy should use `t('...')` rather than hardcoded strings.
- Animations mix Framer Motion and GSAP (example: `src/components/FloatingMenu/index.tsx` + `animations.ts`); follow existing local pattern in the component you are modifying.

## Build, Lint, and Debug Workflow

- Use Bun-based scripts from `package.json`:
  - `bun run dev` (Vite dev server on host, port 5173)
  - `bun run build` (type-check with `tsc -b`, then Vite build)
  - `bun run lint` (Oxlint, type-aware, denies warnings)
  - `bun run lint:fix` (auto-fix lint issues)
  - `bun run preview` (preview build on port 5174)
- There is currently no test script; rely on lint + build for verification unless tests are added.

## Integration Notes

- Key runtime libraries: Redux Toolkit, redux-persist, react-i18next, framer-motion, GSAP (`@gsap/react`), and `react-particles` (`tsparticles-slim`).
- Tailwind theme tokens are extended in `tailwind.config.ts` and consumed across components (`tuna`, `shark`, `tertiary`, `gallery`). Reuse these tokens instead of introducing ad-hoc palette names.
- Vite build is optimized with manual chunking and `terser` console/debugger drops in `vite.config.ts`; avoid changes that break this bundling strategy unless explicitly required.
