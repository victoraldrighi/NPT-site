---
phase: 04-portfolio-conversion-contact
plan: "01"
subsystem: ui
tags: [html, css, netlify-forms, schema-org, portfolio, contact-form, whatsapp]

# Dependency graph
requires:
  - phase: 03-service-pages-seo-nucleus
    provides: service-page.css with .service-cta, .breadcrumb, and OG/canonical meta patterns

provides:
  - portfolio/index.html — case study page at /portfolio/ with ItemList JSON-LD
  - contato/index.html — contact page at /contato/ with Netlify Forms (5 required fields)
  - src/css/components/portfolio.css — portfolio card styles (.portfolio-case)
  - src/css/components/contact-form.css — form and contact info sidebar styles
  - src/css/components/whatsapp-btn.css — fixed 56px WhatsApp FAB (ships hidden)

affects:
  - 04-02 — WhatsApp button and header phone addition build on the same HTML pages
  - 05-qa-and-launch — both new pages are test targets for conversion funnel validation

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Netlify Forms: form name + method=POST + data-netlify=true + action=/obrigado/ + hidden form-name input"
    - "WhatsApp FAB ships with HTML hidden attribute — remove + update href to activate, zero code change"
    - "ItemList JSON-LD for portfolio scalability (single ListItem today, N items future)"
    - "Always-visible tipo-outro field instead of CSS :has() conditional to avoid browser compatibility issues"

key-files:
  created:
    - portfolio/index.html
    - contato/index.html
    - src/css/components/portfolio.css
    - src/css/components/contact-form.css
    - src/css/components/whatsapp-btn.css
  modified:
    - vite.config.js
    - src/js/main.js

key-decisions:
  - "tipo-outro field always visible (not conditionally shown via CSS :has()) — eliminates browser compatibility concerns, label text makes purpose clear"
  - "WhatsApp button included in portfolio and contact HTML, ships hidden, zero code change to activate"
  - "service-cta class reused on portfolio CTA section — zero new CSS for navy CTA block"

patterns-established:
  - "portfolio-case: .portfolio-case card pattern for scalable case study list"
  - "contact-form: .form-group + .form-label + .form-control trio for all form fields"
  - "contact-page__grid: 3fr 2fr grid at ≥80rem, stacked on mobile"

requirements-completed: [PAGE-05, PAGE-07, CONV-02, CRED-03]

# Metrics
duration: 7min
completed: 2026-03-20
---

# Phase 4 Plan 01: Portfolio and Contact Pages Summary

**Portfolio page at /portfolio/ with ItemList JSON-LD case study card, contact page at /contato/ with 5-field Netlify Forms form and contact info sidebar, plus 3 CSS component files and updated Vite config (8 entry points)**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-20T12:42:41Z
- **Completed:** 2026-03-20T12:50:01Z
- **Tasks:** 3
- **Files modified:** 7 (5 created, 2 modified)

## Accomplishments

- Created portfolio/index.html with full SEO head (canonical, 9 OG tags), ItemList + BreadcrumbList JSON-LD, .portfolio-case card with bracket placeholders for client data, CTA linking to /contato/
- Created contato/index.html with Netlify Forms (name=contato, data-netlify=true, action=/obrigado/), 5 required fields, optional tipo-outro field, contact info aside with tel: and mailto: links
- Created 3 CSS component files (portfolio.css, contact-form.css, whatsapp-btn.css) all using var() tokens — only exception is #25D366 and #FFFFFF in whatsapp-btn.css per brand spec
- Updated vite.config.js to 8 entry points and main.js with 3 new CSS imports; Vite build passes clean

## Task Commits

1. **Task 1: Vite config + CSS components + main.js imports** — `f161b2f` (feat)
2. **Task 2: Portfolio page HTML with case study and JSON-LD** — `1b907b4` (feat)
3. **Task 3: Contact page HTML with Netlify Forms** — `5801e28` (feat)

## Files Created/Modified

- `vite.config.js` — Added portfolio and contato entry points (8 total)
- `src/js/main.js` — Appended 3 new CSS component imports
- `src/css/components/portfolio.css` — .portfolio-case card, meta, norms, scope, result, note
- `src/css/components/contact-form.css` — .contact-form, .form-group, .form-control, .contact-info sidebar
- `src/css/components/whatsapp-btn.css` — fixed 56px circle, #25D366 only hex exception
- `portfolio/index.html` — Case study page at /portfolio/ with full SEO and JSON-LD
- `contato/index.html` — Contact page at /contato/ with Netlify Forms

## Decisions Made

- **tipo-outro field always visible:** CSS `:has(select option:checked)` is unreliable across browsers for conditional field visibility. Made the "Especifique" text input always visible with a label qualifier "(se selecionou 'Outro')" — simpler, more accessible, no JS required.
- **WhatsApp button in both new pages:** Included hidden WhatsApp FAB in portfolio.html and contato.html so Plan 02 (header/footer updates) can activate it uniformly. Zero behavior impact while hidden.
- **service-cta class reused:** Portfolio CTA section uses existing `.service-cta` class from service-page.css — no new CSS written for the navy CTA block, consistent with service pages.

## Deviations from Plan

None — plan executed exactly as written. The tipo-outro decision was pre-defined in the plan's action section as an explicit discretion note.

## Issues Encountered

None. Vite build passed clean on first attempt with all 8 entry points.

## User Setup Required

None — no external service configuration required. Netlify Forms are registered automatically at deploy time when Netlify crawls the HTML.

**Client action needed (not blocking):** Portfolio bracket placeholders [TIPO DE EDIFICAÇÃO], [CIDADE], [ESTADO], [ANO], [NBR XXXX] etc. must be replaced with real project data before launch.

## Next Phase Readiness

- Plan 02 (header phone + footer email + WhatsApp activation) can proceed immediately — all HTML pages have the WhatsApp button structure in place
- Contact page is fully functional for Netlify Forms registration at next deploy
- Portfolio page is complete pending client data to fill bracket placeholders

---
*Phase: 04-portfolio-conversion-contact*
*Completed: 2026-03-20*

## Self-Check: PASSED

- FOUND: portfolio/index.html
- FOUND: contato/index.html
- FOUND: src/css/components/portfolio.css
- FOUND: src/css/components/contact-form.css
- FOUND: src/css/components/whatsapp-btn.css
- FOUND: f161b2f (Task 1 commit)
- FOUND: 1b907b4 (Task 2 commit)
- FOUND: 5801e28 (Task 3 commit)
