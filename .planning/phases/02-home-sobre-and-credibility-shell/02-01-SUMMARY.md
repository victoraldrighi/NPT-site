---
phase: 02-home-sobre-and-credibility-shell
plan: 01
subsystem: ui
tags: [html, css, vite, svg, hamburger-menu, multi-page]

# Dependency graph
requires:
  - phase: 01-foundation-and-design-system
    provides: tokens.css (color/typography/spacing vars), base.css reset, main.js entry point, Vite config

provides:
  - Complete homepage at / with hero, services, process, case teaser, footer
  - Sticky header with CSS-only hamburger menu (no JS)
  - Shared CSS components: buttons.css, header.css, footer.css
  - Section CSS: hero.css, services-grid.css, how-we-work.css, case-teaser.css
  - Multi-page Vite build with sobre/ and obrigado/ entry points
  - src/assets/images/ directory scaffolded for engineer photo

affects:
  - 02-02 (sobre and obrigado pages reuse header.css, footer.css, buttons.css)
  - Phase 3 service pages (inherit shared components)
  - Phase 4 portfolio page (inherit shared components)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CSS-only hamburger menu via checkbox :checked sibling combinator (visibility:hidden, not display:none)
    - Inline SVG icons with fill="currentColor" for token-driven color control
    - Mobile-first CSS with raw rem breakpoints (48rem tablet, 80rem desktop)
    - Body class (page-home, page-sobre) for active nav link highlighting
    - ol[role="list"] pattern for VoiceOver compatibility with list-style:none

key-files:
  created:
    - index.html (complete homepage — 5 sections)
    - sobre/index.html (stub for Plan 02)
    - obrigado/index.html (stub for Plan 02)
    - src/css/components/buttons.css (.btn, .btn--primary, .btn--secondary)
    - src/css/components/header.css (sticky + CSS hamburger)
    - src/css/components/footer.css (navy footer with CREA)
    - src/css/components/hero.css (navy hero, responsive headline)
    - src/css/components/services-grid.css (1→2→3 col responsive grid)
    - src/css/components/how-we-work.css (4-step amber numbered list)
    - src/css/components/case-teaser.css (centered card)
    - src/assets/images/.gitkeep (placeholder for engineer photo)
  modified:
    - vite.config.js (added sobre + obrigado entry points)
    - src/js/main.js (added all component CSS imports)
    - src/css/base.css (added .container class moved from stub)

key-decisions:
  - "hero.css hero__whatsapp svg: display:inline-block overrides base.css svg{display:block} so WhatsApp icon sits inline with button text"
  - "CSS hamburger uses visibility:hidden (not display:none) on nav-links to prevent keyboard focus trap when menu is closed"
  - "ol[role=list] on Como trabalhamos steps restores VoiceOver list semantics after list-style:none removes them"
  - "Service page links use href='#' placeholder — real URLs come in Phase 3 when service pages are built"
  - "Bootstrap Icons SVG path data used inline (MIT license) — zero HTTP request, fill=currentColor enables token-driven color"

patterns-established:
  - "Pattern: All new HTML pages import /src/js/main.js as type=module to inherit tokens + fonts automatically"
  - "Pattern: body class (page-home, page-sobre) enables active nav link CSS without JavaScript"
  - "Pattern: Service card icons wrapped in .service-card__icon div; color:var(--color-brand-accent) makes SVG amber via currentColor"
  - "Pattern: Footer id=contato serves as anchor target for CTA buttons linking to #contato"

requirements-completed: [PAGE-01, CRED-01, CRED-04]

# Metrics
duration: 8min
completed: 2026-03-19
---

# Phase 2 Plan 01: Home Shell Summary

**Complete NPT homepage with sticky hamburger header, 5-section content (hero+services+process+case+footer), shared CSS component library, and Vite multi-page build for 3 pages.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-19T22:16:38Z
- **Completed:** 2026-03-19T22:24:09Z
- **Tasks:** 2 of 2
- **Files modified:** 14

## Accomplishments

- Homepage at / with hero (navy bg, dual CTA), 3 service cards with Bootstrap Icons SVGs, 4-step "Como trabalhamos" process section, project case teaser, footer with CREA-SP number and CONFEA portal link
- Sticky header with CSS-only hamburger menu (checkbox hack, visibility:hidden for keyboard a11y) — zero JavaScript required
- Vite multi-page build updated to include sobre/ and obrigado/ entry points; all 3 pages verified in dist/

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold shared CSS components, vite config, and page directories** - `288f10d` (feat)
2. **Task 2: Build complete homepage HTML with all content sections and section CSS** - `b864358` (feat)

**Plan metadata:** (this commit)

## Files Created/Modified

- `index.html` — Full homepage replacing stub; 5 sections, no inline `<style>` tag
- `sobre/index.html` — Minimal stub for Plan 02 to replace
- `obrigado/index.html` — Minimal stub for Plan 02 to replace
- `src/css/components/buttons.css` — .btn, .btn--primary, .btn--secondary; full-width mobile, auto desktop
- `src/css/components/header.css` — Sticky header, CSS-only hamburger with X transform, active link via body class
- `src/css/components/footer.css` — Navy footer, flexbox layout, hover states for links
- `src/css/components/hero.css` — Navy hero with responsive headline (2xl→5xl), stacked→side-by-side CTAs
- `src/css/components/services-grid.css` — 1→2→3 column responsive grid, card hover shadow
- `src/css/components/how-we-work.css` — Vertical mobile, horizontal desktop with amber connector lines
- `src/css/components/case-teaser.css` — Centered card with type badge and project description
- `src/assets/images/.gitkeep` — Placeholder for client-supplied engineer photo
- `vite.config.js` — Added sobre and obrigado entry points
- `src/js/main.js` — Added imports for all 7 CSS component files
- `src/css/base.css` — Added .container class moved from inline stub styles

## Decisions Made

- Used `visibility:hidden` + `max-height:0` on `.nav-links` instead of `display:none` — prevents keyboard focus trap in hidden mobile menu
- Added `role="list"` to the "Como trabalhamos" `<ol>` — restores VoiceOver list semantics removed by `list-style:none`
- Set `id="contato"` on `<footer>` so `#contato` CTA links scroll to the footer contact info (Phase 4 will add a form)
- Service card links use `href="#"` — Phase 3 will replace with real service page URLs
- Portfolio link in case teaser uses `href="#"` — Phase 4 will replace with portfolio URL

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 02-02 (Sobre + Obrigado pages) can begin immediately — shared header.css, footer.css, buttons.css are ready
- sobre/index.html and obrigado/index.html stubs exist as Vite entry points; Plan 02-02 replaces them with full content
- Engineer photo (`src/assets/images/engenheiro.jpg`) is a client deliverable — blocked on client supplying the real photo

---
*Phase: 02-home-sobre-and-credibility-shell*
*Completed: 2026-03-19*

## Self-Check: PASSED

All files found on disk. Both task commits verified in git log.

- index.html: FOUND
- sobre/index.html: FOUND
- obrigado/index.html: FOUND
- src/css/components/buttons.css: FOUND
- src/css/components/header.css: FOUND
- src/css/components/footer.css: FOUND
- src/css/components/hero.css: FOUND
- src/css/components/services-grid.css: FOUND
- src/css/components/how-we-work.css: FOUND
- src/css/components/case-teaser.css: FOUND
- src/assets/images/.gitkeep: FOUND
- Commit 288f10d: FOUND
- Commit b864358: FOUND
