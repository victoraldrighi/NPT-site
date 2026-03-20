---
phase: 04-portfolio-conversion-contact
plan: "02"
subsystem: ui
tags: [html, whatsapp, conversion, navigation, cta, phone, email]

# Dependency graph
requires:
  - phase: 04-portfolio-conversion-contact
    plan: "01"
    provides: portfolio/index.html and contato/index.html (WhatsApp button already included)

provides:
  - index.html — nav phone, nav /contato/ link, hero CTA /contato/, case-teaser /portfolio/, WhatsApp FAB
  - sobre/index.html — nav phone, nav /contato/ link, WhatsApp FAB
  - obrigado/index.html — WhatsApp FAB
  - servicos/pressurizacao-escadas-emergencia/index.html — nav phone, nav /contato/, service-cta /contato/, WhatsApp FAB
  - servicos/projetos-hidraulicos/index.html — nav phone, nav /contato/, service-cta /contato/, WhatsApp FAB
  - servicos/projetos-eletricos/index.html — nav phone, nav /contato/, service-cta /contato/, WhatsApp FAB
  - portfolio/index.html — nav phone, nav /contato/ link (WhatsApp already present from 04-01)
  - contato/index.html — nav phone, nav /contato/ link (WhatsApp already present from 04-01)

affects:
  - 05-qa-and-launch — all conversion elements in place, full conversion funnel testable

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "WhatsApp FAB ships hidden — client removes hidden attribute and replaces number to activate"
    - "nav-phone class on tel: link enables CSS targeting for phone-specific header styling"
    - "obrigado page has minimal header (no nav) — WhatsApp FAB only conversion element added"

key-files:
  created: []
  modified:
    - index.html
    - sobre/index.html
    - obrigado/index.html
    - servicos/pressurizacao-escadas-emergencia/index.html
    - servicos/projetos-hidraulicos/index.html
    - servicos/projetos-eletricos/index.html
    - portfolio/index.html
    - contato/index.html

key-decisions:
  - "obrigado page minimal header has no nav — phone nav li skipped, WhatsApp FAB added; visitor still has conversion path"
  - "portfolio and contato already had WhatsApp FAB from 04-01 — only nav phone and Contato link needed"
  - "All /#contato and #contato stale links eliminated — zero anchor-based contact navigation remains"

requirements-completed: [CONV-01, CONV-03, CONV-04]

# Metrics
duration: 5min
completed: 2026-03-20
---

# Phase 4 Plan 02: Global Conversion Elements Summary

**WhatsApp FAB (hidden, activation-ready), phone tel: link in header nav, and updated CTAs across all 8 site pages — zero stale #contato anchor links remain**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-20T12:54:58Z
- **Completed:** 2026-03-20T13:00:11Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Added hidden WhatsApp FAB to 6 pages (portfolio and contato already had it from 04-01); all 8 pages now contain `class="whatsapp-btn" hidden`
- Added `<li><a href="tel:+55119XXXXXXXX" class="nav-phone">` to all 7 pages with nav (obrigado has minimal header only)
- Updated nav Contato link from `href="#contato"` / `href="/#contato"` to `href="/contato/"` on all pages with nav
- Updated hero CTA on index.html from `href="#contato"` to `href="/contato/"`
- Updated case-teaser "Ver portfólio" link on index.html from `href="#"` to `href="/portfolio/"`
- Updated service-cta "Solicitar Orçamento" on 3 service pages from `href="/#contato"` to `href="/contato/"`
- Vite build passes clean with all 8 entry points; link audit confirms zero stale anchors, exactly 8 WhatsApp buttons, Netlify Forms intact

## Task Commits

1. **Task 1: WhatsApp button + phone nav + CTA link updates across 8 pages** — `7e07386` (feat)
2. **Task 2: Build verification and link audit** — no file changes; all checks passed (build + audit)

## Files Modified

- `index.html` — nav phone, nav /contato/, hero CTA /contato/, case-teaser /portfolio/, WhatsApp FAB
- `sobre/index.html` — nav phone, nav /contato/, WhatsApp FAB
- `obrigado/index.html` — WhatsApp FAB only (minimal header, no nav)
- `servicos/pressurizacao-escadas-emergencia/index.html` — nav phone, nav /contato/, service-cta /contato/, WhatsApp FAB
- `servicos/projetos-hidraulicos/index.html` — nav phone, nav /contato/, service-cta /contato/, WhatsApp FAB
- `servicos/projetos-eletricos/index.html` — nav phone, nav /contato/, service-cta /contato/, WhatsApp FAB
- `portfolio/index.html` — nav phone, nav /contato/ (WhatsApp already present)
- `contato/index.html` — nav phone, nav /contato/ (WhatsApp already present)

## Decisions Made

- **obrigado page skips nav phone:** The obrigado page uses a minimal header with no nav — no `<ul class="nav-links">` exists. The WhatsApp FAB was added as the conversion element. The obrigado page is a post-conversion thank-you screen; a floating WhatsApp button is sufficient.
- **portfolio and contato already had WhatsApp:** Both pages had the FAB from 04-01. This plan added the nav phone `<li>` and updated the nav Contato link without duplicating the button.

## Deviations from Plan

None — plan executed exactly as written. The obrigado page nav omission was an observation during execution: the page has `site-header--minimal` with no nav, so there was no nav list to add the phone `<li>` to. This is not a deviation — it is correct behavior.

## Issues Encountered

None. Vite build passed clean on first attempt. All link audits passed immediately.

## User Setup Required

**Client actions needed (not blocking):**
- Replace `+55119XXXXXXXX` placeholder in all 8 `href="tel:+55119XXXXXXXX"` attributes with the real phone number
- Replace `+55119XXXXXXXX` in all 8 WhatsApp button hrefs with the real number
- Remove the `hidden` attribute from all 8 WhatsApp buttons once number is confirmed
- Replace `(11) 9 0000-0000` display text in all 8 nav phone links

## Next Phase Readiness

- Phase 5 (QA and launch) can proceed — full conversion funnel is in place on all pages
- No stale anchor-based contact links remain on any page
- WhatsApp FAB is deployment-ready on all 8 pages, pending number confirmation from client

---
*Phase: 04-portfolio-conversion-contact*
*Completed: 2026-03-20*

## Self-Check: PASSED

- FOUND: index.html has whatsapp-btn (1 match)
- FOUND: sobre/index.html has whatsapp-btn (1 match)
- FOUND: obrigado/index.html has whatsapp-btn (1 match)
- FOUND: servicos/pressurizacao-escadas-emergencia/index.html has whatsapp-btn (1 match)
- FOUND: servicos/projetos-hidraulicos/index.html has whatsapp-btn (1 match)
- FOUND: servicos/projetos-eletricos/index.html has whatsapp-btn (1 match)
- FOUND: portfolio/index.html has whatsapp-btn (1 match)
- FOUND: contato/index.html has whatsapp-btn (1 match)
- FOUND: 7e07386 (Task 1 commit)
- CONFIRMED: Vite build exits 0, 8 entry points compiled
- CONFIRMED: Zero stale href="#contato" links
- CONFIRMED: Zero stale href="#" links
- CONFIRMED: Netlify Forms attributes intact on contato/index.html
