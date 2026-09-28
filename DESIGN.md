---
name: wanrif.os Portfolio
description:
  A personal operating system whose UI is the product — terminal-native,
  bilingual, dual-theme.
colors:
  shark-950: '#fbf0cf'
  shark-900: '#f2e0ae'
  shark-800: '#e5c98a'
  shark-700: '#c8a661'
  shark-600: '#a27f3f'
  gallery-100: '#321f06'
  gallery-200: '#4e330d'
  gallery-300: '#6a4815'
  gallery-400: '#855f23'
  gallery-500: '#a07530'
  gallery-700: '#d6ba89'
  gallery-800: '#e7d4ac'
  gallery-900: '#f3e5c5'
  gallery-950: '#faf1d6'
  tuna-950: '#f8e7b3'
  tuna-900: '#efc05e'
  tuna-800: '#d8921f'
  tertiary-50: '#fff4cb'
  tertiary-100: '#ffe39f'
  tertiary-200: '#ffcf66'
  tertiary-300: '#f3b442'
  tertiary-400: '#dc9523'
  tertiary-500: '#b8720e'
  shark-dark-950: '#05040b'
  shark-dark-900: '#0d1022'
  shark-dark-800: '#151b36'
  shark-dark-700: '#222a4d'
  shark-dark-600: '#303d6a'
  gallery-dark-100: '#ecf4ff'
  gallery-dark-200: '#cfe4ff'
  gallery-dark-300: '#a9c8ea'
  gallery-dark-700: '#374b6f'
  gallery-dark-800: '#26375a'
  gallery-dark-900: '#172446'
  tuna-dark-950: '#2b0a40'
  tuna-dark-900: '#44156b'
  tuna-dark-800: '#61239a'
  tertiary-dark-50: '#d8ffff'
  tertiary-dark-100: '#abffff'
  tertiary-dark-200: '#75feff'
  tertiary-dark-300: '#42f6ff'
  tertiary-dark-400: '#16dff1'
  tertiary-dark-500: '#00bfd7'
  signal-cyan: 'rgb(22 231 255)'
  signal-glow: 'rgb(22 231 255 / 24%)'
  signal-mint: 'rgb(20 255 219)'
  amber-glow: 'rgb(255 182 64)'
typography:
  display:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: 'clamp(1.875rem, 5vw, 3rem)'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 'normal'
  headline:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)'
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: '0.01em'
  label:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.62rem'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '0.07em'
  label-mobile:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.8rem'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '0.05em'
  prompt:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: '0.08em'
  tooltip:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '11px'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: '0.04em'
  micro:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.55rem'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: '0.08em'
  display-alt:
    fontFamily: 'Franchise, Franchisefilled, monospace'
    fontSize: '1rem'
    fontWeight: 400
rounded:
  chip: '0.65rem'
  window: '1rem'
  shell: '1.25rem'
  button: '0.75rem'
  pill: '9999px'
spacing:
  xs: '0.25rem'
  sm: '0.5rem'
  md: '1rem'
  lg: '1.5rem'
  xl: '2rem'
  section: 'clamp(3rem, 8vw, 4.5rem)'
components:
  button-primary:
    backgroundColor: '{colors.tertiary-dark-950}'
    textColor: '{colors.tertiary-dark-200}'
    rounded: '{rounded.button}'
    padding: '0.5rem 1rem'
  button-primary-hover:
    backgroundColor: '{colors.tertiary-dark-500}'
  button-secondary:
    backgroundColor: '{colors.shark-dark-900}'
    textColor: '{colors.gallery-dark-200}'
    rounded: '{rounded.button}'
    padding: '0.5rem 1rem'
  button-secondary-hover:
    backgroundColor: '{colors.shark-dark-800}'
  chip-default:
    backgroundColor: '{colors.shark-dark-900}'
    textColor: '{colors.gallery-dark-200}'
    rounded: '{rounded.chip}'
    padding: '0.28rem 0.58rem'
  chip-accent:
    backgroundColor: '{colors.shark-dark-900}'
    textColor: '{colors.tertiary-dark-300}'
    rounded: '{rounded.chip}'
    padding: '0.28rem 0.58rem'
  terminal-window:
    backgroundColor: '{colors.shark-dark-900}'
    rounded: '{rounded.window}'
    padding: '0'
  terminal-shell:
    backgroundColor: '{colors.shark-dark-900}'
    rounded: '{rounded.shell}'
    padding: '0'
---

# Design System: wanrif.os Portfolio

## Overview

**Creative North Star: "wanrif.os"**

This is a personal operating system, not a personal website. Every visual
decision is made from the perspective of someone who _lives_ in a terminal: the
interface does not present a developer — it runs like one. Sections boot, panels
render session headers and status bars, navigation responds to commands, and the
colour of a glyph carries system-state meaning. The OS metaphor is literal, not
decorative.

The system operates in two simultaneous registers: machine-side and human-side.
The machine-side is amber scan lines, teal packet signals, cyan glyph prompts,
and the cold hum of a satellite feed. The human-side is the name, the work, and
the reasoning behind each product decision. Neither register is a theme applied
over the other — they are the same voice.

Duality is the defining structural principle of the system. Two themes (warm
amber light / cold indigo dark) are built at the token level, not as an
afterthought. Two languages (English / Indonesian) travel together in every copy
decision. All animated micro-effects have `prefers-reduced-motion: reduce`
fallbacks wired in by default.

**Key Characteristics:**

- Every surface is a terminal panel: windows, shells, subcard drawers, topbars,
  statusbars, titlebar strips
- Monospace type everywhere — JetBrains Mono is the only text face;
  franchise/franchiseFilled are reserved display flourishes
- Colour encodes system state: tertiary (cyan/amber) = live signal / active /
  accent; gallery = structural text / UI chrome; tuna = alert / secondary
  accent; shark = background depth scale
- Motion is purposeful and tied to system metaphors: scan sweeps, orbit
  rotations, packet transmissions, probe traversals, boot sequences
- Two complete semantic token sets — warm amber (light) and cold indigo (dark) —
  share the same slot names

## Colors

The palette speaks in two dialects separated by `.dark`. Light mode is warm
amber terminal (amber backgrounds, gold-brown text, golden teal signals). Dark
mode is cold deep-space indigo (near-black indigo backgrounds, icy blue-white
text, electric cyan signals).

### Primary — Tertiary Scale (Signal / Accent)

- **Warm Teal Signal** (`--color-tertiary-300`, light: `#f3b442`): The active
  accent in light mode — used for prompt glyphs (`$`), chip borders with signal
  meaning, active states, progress bars. Its warm amber hue reads as "alive"
  against the parchment background.
- **Cold Cyan Signal** (`--color-tertiary-dark-300`, dark: `#42f6ff`): The
  mirror in dark mode — electric cyan against near-black indigo. Scan sweeps,
  packet glows, live dots, and focus rings all emit this colour.
- **Signal Mid** (`--color-tertiary-500` light `#b8720e` / dark `#00bfd7`): Used
  for scrollbar thumbs, gradient tails, and the signal packet fill. The
  mid-point that bridges the accent from full saturation toward the background.

**The One Signal Rule.** Tertiary accent appears only on elements that represent
live system activity (prompt glyphs, scan effects, active chips, focus rings,
progress). It does not colour decorative text or static structural chrome.

### Secondary — Tuna Scale (Alert / Purple)

- **Amber Alert** (`--color-tuna-900`, light: `#efc05e`): Warm amber highlight
  in light mode — used for the window control dot that simulates a caution
  indicator and as a subtle secondary accent in gradients.
- **Deep Violet** (`--color-tuna-dark-800`, dark: `#61239a`): Rich
  indigo-purple, visible in the dark body gradient at 14% opacity. It is an
  ambient mood tone, not a foreground accent.

### Neutral — Shark Scale (Background / Depth)

- **Parchment Deep** (`--color-shark-950`, light: `#fbf0cf`): The deepest
  background surface in light mode — warm cream that simulates amber
  phosphor-lit paper.
- **Void Near-Black** (`--color-shark-dark-950`, dark: `#05040b`): The deepest
  background in dark mode — cold near-black with a faint indigo cast, simulating
  a powered-off CRT field.
- **Panel Fill** (`--color-shark-dark-900`, dark: `#0d1022`): The dominant
  interior surface of all terminal windows, shells, and topbars — a dark navy
  that reads as "slightly lit screen" against the deeper void.

### Neutral — Gallery Scale (Text / Chrome)

- **Warm Body Text** (`--color-gallery-100`, light: `#321f06`): Deep warm brown
  — the default body copy colour in light mode.
- **Ice Body Text** (`--color-gallery-dark-100`, dark: `#ecf4ff`): Cool
  near-white — the default body copy colour in dark mode.
- **Chrome Dim** (`--color-gallery-300` / `--color-gallery-dark-300`): Used for
  topbar labels, statusbar text, and non-primary structural chrome — one step
  dimmer than the body text.
- **Structural Border** (`--color-gallery-700` / `--color-gallery-dark-700`):
  The border tone for terminal windows, dividers, subcard edges, and grid lines.
  Always mixed with `color-mix` transparency to read as "etched" rather than
  solid.

**The Tonal Mix Rule.** No colour value is used at full opacity for a border or
panel surface. Every structural application uses `color-mix(in oklab, ...)` or a
slash-opacity modifier to ensure layered translucency. Solid opaque borders
signal errors.

## Typography

**Primary Font:** JetBrains Mono (weights 300–700, loaded via fonts.bunny.net)
**Display / Wordmark Accent:** franchise / franchiseFilled (local TTF, reserved
for identity moments only)

**Character:** A single monospace face carries the entire typographic system —
there is no contrast between a heading font and a body font. All hierarchy is
built from weight, size, letter-spacing, text-transform, and colour. The mono
face signals precision, authenticity, and machine proximity.

### Hierarchy

- **Display** (700 weight, `clamp(1.875rem, 5vw, 3rem)`, 1.1 line-height):
  Headings at the section level — specifically the hero name `Redwan Sarif`
  (rendered at `text-3xl sm:text-5xl`). Bold, tight leading.
- **Headline** (600 weight, `clamp(1.125rem, 2.5vw, 1.5rem)`, 1.25 line-height):
  Sub-section titles and panel headings. Uses `terminal-heading` color — a mixed
  teal-gallery tone that reads as "section active".
- **Title** (500–600 weight, `0.875rem`–`1rem`, 1.4 line-height): Card titles,
  project names, subsection labels. Standard weight step below headline.
- **Body** (400 weight, `0.875rem`, 1.55 line-height, 0.01em letter-spacing):
  All paragraph and descriptive copy. The default rendered style for `<body>`.
- **Label** (500 weight, `0.62rem`–`0.75rem`, 0.07em–0.08em tracking,
  `uppercase`): Topbar text, statusbar text, chip labels, section prefix lines.
  Always uppercase; always uppercase-tracked. This is the "system chrome" tier.
- **Label Mobile** (500 weight, `0.8rem`, 0.05em tracking): Mobile-adapted
  command row and compact status indicators.
- **Prompt** (500–700 weight, `0.75rem`, 0.08em tracking, `uppercase`): The `$`
  glyph, command-line identifiers, `[OK]` status strings in the boot sequence,
  `proc` labels. The lowest-level system output tier.
- **Tooltip** (500 weight, `11px` / `0.6875rem`, 0.04em tracking): Precision
  floating tooltips, dock menu labels, and compact control descriptions.

**The Mono-Only Rule.** No serif, sans-serif, or display face other than
JetBrains Mono (and the identity-only franchise) may be used. All hierarchy
comes from weight and spacing, not typeface substitution.

## Layout

The layout is a single-column max-width container (`max-w-6xl`, effectively
72rem) centered with horizontal padding (`px-4 sm:px-6`). Sections stack
vertically in reading order: **Hero (`top`) → Experiences (`now`) → Projects
(`projects`) → Skills (`skills`) → Contact (`contacts`)**, each separated by a
hairline bottom border (`border-gallery-800/70`) and consistent vertical rhythm
(`padding-block: clamp(3rem, 8vw, 4.5rem)`).

Within sections, two-column grids appear at specific breakpoints — the hero uses
`xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]` (a clear visual hierarchy
favouring hero content and primary CTAs over the auxiliary runtime telemetry
card). The navbar uses `md:grid-cols-[1fr_auto]`. Card grids within sections use
`md:grid-cols-2` or `md:grid-cols-3` patterns.

Gap scale: `gap-4` (1rem) at mobile, `gap-5 lg:gap-6` inside terminal windows.
Internal card padding follows `p-4 sm:p-5 lg:p-6`.

The global grid background (`terminal-grid-bg`) is 36px × 36px, shown at reduced
opacity (0.32 light / 0.46 dark) as a structural ambient layer — it implies
"graph paper" or "schematic", reinforcing the OS metaphor without cluttering
content.

**Breakpoints:** `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`. At
`max-width: 420px`, orbit decorations are hidden.

## Elevation & Depth

This system uses a **hybrid elevation model**: structural containers are flat
(tonal layering only), while specific interactive elements carry explicit
shadows and glows to signal interactivity and importance.

**Flat surfaces:** `terminal-window`, `terminal-subcard`, `terminal-section` —
these rely entirely on border lines mixed at partial transparency and background
fills stepped from the shark scale. No external box-shadow.

**Elevated interactive surfaces:**

- `terminal-shell` (the outermost hero panel): carries an inset top highlight +
  ambient outer shadow (`0 8px 24px rgb(22 40 35 / 26%)` in light;
  `0 20px 50px rgb(0 0 0 / 55%)` + a 1px electric ring in dark).
- Boot panel: `0 20px 65px rgb(0 0 0 / 52%)` — heaviest shadow in the system,
  used only for the modal boot overlay.
- Project cards on hover/focus: inner ring `inset 0 0 0 1px` tertiary accent +
  diffuse outer glow (`0 0 14px`).

**Signal glows:** Certain micro-elements (live dot, scan packet, chip-accent,
orbit chips, rogue probe) emit `box-shadow` halos in the tertiary colour. These
are motion-state signals, not permanent depth indicators.

### Shadow Vocabulary

- **Ambient Shell** (`0 8px 24px rgb(22 40 35 / 26%)` / dark:
  `0 20px 50px rgb(0 0 0 / 55%)`): The hero terminal shell — the heaviest
  permanent shadow.
- **Card Hover Ring** (`inset 0 0 0 1px + 0 0 14px`, tertiary accent): Project
  cards on hover/focus — signals "interactive surface".
- **Boot Modal** (`0 20px 65px rgb(0 0 0 / 52%)`): The boot sequence overlay
  panel — maximum drama, used once.
- **Signal Glow** (`0 0 8px–18px`, tertiary): Live dots, scan packets,
  chip-accent, orbit rings — ephemeral system-state halos.

**The State-Gated Shadow Rule.** Permanent ambient shadows apply only to the two
or three highest-priority interactive containers. All other depth is tonal
(background step-down) or state-gated (hover/focus glow only).

## Shapes

The form language is rounded but disciplined — no hard corners, but no excessive
softness either. Every radius value encodes a semantic tier.

- **`9999px` (pill):** Reserved for micro-elements — live dots, signal packets,
  feed tracks, caret elements. These are system indicators; pill shape signals
  "operational".
- **`0.65rem` (chip):** The `terminal-chip` radius. Used on all label chips,
  badges, status indicators — the smallest "container" shape in the system.
- **`0.75rem` (button / command-row):** The interactive element radius. Applied
  to buttons, command rows, navbar inline blocks, and most interactive
  components.
- **`1rem` (terminal-window):** The standard inner panel radius —
  sections-within-sections.
- **`1.25rem` (terminal-shell):** The outermost container radius — the main hero
  panel shell. The largest structural radius in the system.
- **`xl` / `rounded-xl` (~0.75rem):** The Tailwind shorthand used for navbar
  pill blocks and secondary containers.

**The Radius Ladder Rule.** Radius scales with container priority:
micro-elements use pill, chips use chip, interactive surfaces use button, inner
panels use window, outer panels use shell. Do not apply shell radius to inner
elements or chip radius to panels.

Border style is consistently `1px solid color-mix(in oklab, ...)` — the
color-mix with transparency is load-bearing; it creates the "etched-in" look
without the harsh contrast of a full-opacity border.

## Components

### Terminal Window

The primary content container. A rounded panel (`1rem` radius) with a gradient
fill from `shark-900 → shark-950`, a 1px translucent border, and an inset top
highlight simulating a CRT bezel reflection. In dark mode, adds a diffuse blue
outer glow.

Anatomy: `terminal-titlebar` (session header strip) → body content → optional
`terminal-statusbar` (bottom strip). Always monospace type at label scale in
chrome strips.

### Terminal Shell

The outermost hero panel — a `1.25rem` radius elevated shell that wraps
`terminal-window` in the hero section only. Carries the heaviest ambient shadow.
The shell is the only container where the outer shadow is permanent (not
state-gated).

### Buttons

- **Shape:** `0.75rem` radius (12px). Compact padding `0.5rem 1rem` for
  secondary, slightly wider for primary.
- **Primary:** Translucent tertiary-tinted fill (`tertiary-900` at 60%) +
  tertiary-400 border + tertiary-200 text. On hover: fill brightens to
  `tertiary-500` at 20–28%.
- **Secondary:** Dark shark-900 fill + gallery-500 border + gallery-200 text. On
  hover: fill shifts to `shark-800` at 74%.
- **Transitions:** `background` only; no transform. Border and text colour are
  static.

### Chips / Badges

- **Default chip** (`terminal-chip`): `0.65rem` radius, `0.62rem` uppercase
  tracked text, `shark-900` background, `gallery-200` text, `gallery-600` border
  at 62%.
- **Accent chip** (`terminal-chip-accent`): same shape + background, but
  `tertiary-500` border at 55% and `tertiary-300` text. In dark mode adds a
  `0 0 10px` cyan glow.
- **Orbit chips:** Smaller variants (`0.55rem` text) positioned absolutely
  around the profile card with a signal glow.

### Terminal Command Row

An interactive command-entry container. `0.75rem` radius, `shark-950` fill,
`gallery-700` border. Contains a `$` prompt glyph in `tertiary-300`, command
text in `gallery-200`, and a scan sweep overlay (`terminal-command-scan`) — a
translucent gradient that crosses the element on a GSAP tween, reading as
"scanning".

### Navigation (Navbar)

Sticky top bar: `shark-950/94` background + `backdrop-blur-xl` +
`gallery-800/80` bottom border. Left cluster: a window-control pill (three dots
— tuna/tertiary/tertiary), a typing-effect breadcrumb
(`/sys/users/kernel@wanrif` with `terminal-caret`), and a `tty0` accent chip.
Right cluster (desktop only): two inline chip-style labels showing
`proc portfolio-ui` and the run command.

### Floating Menu (Command Dock)

A fixed side-rail dock (right edge on desktop, bottom on mobile) that renders
section navigation icons + theme toggle + locale switcher. Each item is a
`rounded-xl` bordered icon button. On scroll, the dock compacts. Long-press or
`Cmd/Ctrl+K` opens the command palette overlay.

### Command Palette

A modal overlay with `boot-overlay` glass background (`backdrop-blur-7px`), a
centred input field with `terminal-focus` ring, and a filtered list of commands.
Each command row shows a `$` prompt + command name + description. Arrow-key
navigation with active state highlighting.

### Project Cards

Section cards with `terminal-window` base + `js-project-card` interaction class.
On hover/focus: inner tertiary ring + outer glow (`inset 0 0 0 1px + 0 0 14px`).
A scan-sweep overlay (`js-project-scan`) plays once on hover then fades. Cards
expand in-place to reveal the MDX case study via an `AnimatePresence` panel.

### Boot Overlay

Full-screen modal shown on first load. `boot-overlay` glass + `boot-panel`
elevated container. Lines appear sequentially via `boot-line` `animation-delay`
stagger. Progress bar fills via `boot-progress-fill` keyframe. Scanline overlay
applied over the panel via `::after` pseudo-element (CRT effect).

## Do's and Don'ts

### Do:

- **Do** use `color-mix(in oklab, ..., transparent)` for all border and surface
  applications — the transparency is part of the visual language.
- **Do** place `terminal-topbar` / `terminal-titlebar` / `terminal-statusbar`
  chrome strips inside every major terminal panel. A panel without a session
  header does not read as a terminal window.
- **Do** use the `$` prompt glyph in `tertiary-300` as the prefix for any
  interactive command-style element.
- **Do** uppercase and track all label-tier text
  (`letter-spacing: 0.06em–0.08em`, `text-transform: uppercase`).
- **Do** wire `prefers-reduced-motion: reduce` on every GSAP animation — the
  scan sweeps, orbits, scan drifts, and boot lines all have CSS fallbacks in the
  media query block.
- **Do** emit signal glows only on elements that represent live system activity
  (live dots, scan packets, chip-accent borders, focus rings).
- **Do** keep the tertiary accent colour rare on any given screen — its scarcity
  is its signal value.
- **Do** preserve both light and dark token sets in every component; never write
  a component that only specifies one theme.

### Don't:

- **Don't** use solid opaque borders (`border-gallery-700` without a
  transparency modifier). All structural borders are mixed with `color-mix` or
  slash-opacity.
- **Don't** apply the `terminal-shell` outer shadow to inner panels — it belongs
  only on the top-level hero shell.
- **Don't** mix non-monospace typefaces into the system. JetBrains Mono is the
  only text face.
- **Don't** add new top-level sections without a `terminal-grid-bg` ambient
  layer and a `terminal-topbar` or `terminal-titlebar` chrome header — omitting
  these breaks the OS metaphor.
- **Don't** use the tertiary accent as a text colour for paragraph body copy or
  neutral structural chrome.
- **Don't** use full-opacity pill/shell borders in animation states — glows and
  rings are the state signal, not border weight change.
- **Don't** fabricate status indicators (uptime percentages, request counts,
  signal strength) with invented data. Every data point visible in the UI must
  be real or clearly fictional within the OS metaphor.
