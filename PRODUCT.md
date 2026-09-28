# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — dual audience, equal weight.**

1. **Recruiters and hiring managers** evaluating Redwan Sarif for a frontend or
   fullstack engineering role. They are scanning quickly, forming a judgment
   about seniority, breadth, and reliability within the first viewport. They may
   forward the URL to a technical lead or panel.
2. **Clients and product teams** assessing whether to hire for freelance or
   contract product work. They are looking for evidence of delivery quality,
   end-to-end ownership, and the ability to collaborate on real product
   problems.

Both audiences arrive with high intent; neither tolerates friction or ambiguity
about capability.

## Product Purpose

A personal engineering portfolio for **Redwan Sarif** (handle: `wanrif`), a
fullstack developer based in Indonesia. The portfolio exists to make a single,
non-negotiable claim credible on contact: he can own the full stack end-to-end
and deliver real products.

Success means a visitor closes the page believing he is senior-level,
understands the whole system (frontend through backend through infrastructure),
and is worth reaching out to.

## Positioning

Redwan is not a specialist in one layer. The portfolio's differentiating claim
is full-stack ownership with a systems mindset: _"I build systems end-to-end,
from frontend interfaces to backend logic"_ — reinforced by actual shipped case
studies (Kasir One POS, Oharatools, Vuetreez, Telkomsel Starter Pack) that each
expose an architecture decision and explicit tradeoffs, not just screenshots.

## Operating Context

- Visitors arrive via job applications, LinkedIn referrals, GitHub profile
  links, or direct sharing.
- The site is a single-page app with a terminal/OS visual identity — navigation
  mirrors a boot sequence and command palette rather than a conventional nav
  bar.
- Content is available in **English and Indonesian**; the active locale can be
  toggled without a page reload.
- Light and dark themes are both fully supported; the toggle is accessible from
  the floating menu and command palette.
- Case studies live as MDX files; projects section auto-discovers them by
  locale.

## Capabilities and Constraints

**What the portfolio covers:**

- Hero / identity panel with current role and focus areas
- Work experience timeline
- Skills matrix organized by engineering layer (Runtime, Frontend, Backend,
  Infrastructure, Tools)
- Projects section with case studies (architecture, stack, tradeoffs, links)
- "Now" section for current focus and changelog
- Engineering philosophy
- Contact section (email, LinkedIn, GitHub, CV)
- Command palette (Cmd/Ctrl + K) for keyboard navigation

**Technical constraints:**

- React 19 + Vite + TypeScript (Bun toolchain)
- Tailwind CSS v4 with CSS-first theme tokens in src/assets/css/main.css; no
  tailwind.config
- Zustand for global state (theme, locale)
- i18next for localization; strings in src/i18n/en.ts and src/i18n/id.ts
- Case studies as paired slug.en.mdx / slug.id.mdx; missing a locale file can
  hide a project entirely

## Brand Commitments

- **Name / handle:** Redwan Sarif / wanrif
- **Visual identity:** Terminal / OS aesthetic — boot screen, monospace
  elements, command palette, log-line language. This is intentional and
  non-negotiable, not an experiment.
- **Voice:** Direct, systems-oriented, pragmatic. Logs not prose. ("clear logs,
  stable systems, pragmatic delivery over hype.")
- **No fabricated claims:** no invented testimonials, benchmarks, or client
  names may be added.

## Evidence on Hand

- Four shipped or in-progress case studies with real architecture notes and
  tradeoffs:
  - kasir-one — Web POS for MSMEs (in progress)
  - oharatools — Browser-based developer utilities hub (completed, live at
    oharatools.redwans.com)
  - vuetreez — (paired MDX files present)
  - telkomsel-starterpack — (paired MDX files present)
- Profile photo referenced (hero_photo_alt: 'Redwan Sarif profile photo')
- CV link present in contact section
- Real GitHub, LinkedIn, and email contact details (not yet inspected; assumed
  live)

## Product Principles

1. **Ownership over scope.** The portfolio must model the same full-stack
   ownership it claims: every section should feel considered, not delegated.
2. **Evidence before assertion.** Every capability claim must be grounded in a
   case study, timeline entry, or skill demonstrated in the site itself.
3. **Terminal clarity.** Interface copy reads like a well-structured log, not
   marketing copy. Precision signals competence.
4. **Locale completeness is a hard invariant.** Both EN and ID must always be in
   sync; a missing string or case study translation is a broken product.
5. **Dual-theme integrity.** Light and dark modes are equal citizens; neither is
   an afterthought.

## Accessibility & Inclusion

- Keyboard navigation is a first-class affordance (command palette, floating
  menu)
- Reduced-motion preferences must be respected for any animation work
- No specific WCAG target confirmed, but contrast and focus management should
  meet WCAG 2.1 AA as a baseline
