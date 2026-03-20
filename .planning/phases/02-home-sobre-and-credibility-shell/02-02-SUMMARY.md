---
phase: 02-home-sobre-and-credibility-shell
plan: 02
subsystem: pages
tags: [sobre, obrigado, about-page, credibility, CREA, CONFEA, thank-you-page]
dependency_graph:
  requires: ["02-01"]
  provides: ["sobre/index.html", "obrigado/index.html", "src/css/components/about.css"]
  affects: ["src/css/components/header.css", "src/js/main.js"]
tech_stack:
  added: []
  patterns:
    - "Bootstrap Icons SVG inline (MIT) — decorative aria-hidden, focusable=false"
    - "site-header--minimal modifier for nav-free pages"
    - "body class (page-sobre) drives active nav link via CSS selector"
    - "about-photo with explicit width/height for CLS prevention"
key_files:
  created:
    - sobre/index.html
    - src/css/components/about.css
  modified:
    - obrigado/index.html
    - src/js/main.js
    - src/css/components/header.css
decisions:
  - "CONFEA link uses consultaprofissional.confea.org.br (not www.confea.org.br) per plan critical note"
  - "Obrigado page CSS added to about.css (not a separate file) to avoid extra HTTP request"
  - "site-header--minimal added to header.css (not inline) to maintain single source of truth"
metrics:
  duration: 5 min
  completed: "2026-03-20"
  tasks_completed: 2
  files_created: 2
  files_modified: 3
---

# Phase 02 Plan 02: Sobre Page and /obrigado/ Thank-You Page Summary

**One-liner:** Sobre page with engineer bio, CREA-SP linked to CONFEA consultation portal, 4 SVG differentials, mission statement, and minimal-header /obrigado/ confirmation page.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build complete Sobre page with engineer bio, CREA, photo, mission, differentials | 579538f | sobre/index.html, src/css/components/about.css, src/js/main.js |
| 2 | Build /obrigado/ thank-you page with confirmation message | cc10984 | obrigado/index.html, src/css/components/header.css |

## What Was Built

### Task 1: Sobre Page

**sobre/index.html** — complete credibility page with:
- Header copied from index.html (same logo, same CSS-only hamburger nav). `body.page-sobre` activates the "Sobre" nav link via existing CSS selector in header.css.
- Section A (about-hero): two-column layout on desktop (photo left, text right), stacked on mobile. Engineer photo `<img>` with explicit `width="400" height="400"` attributes per CRED-02 (CLS prevention). Navy square fallback via `.about-photo { background-color: var(--color-brand-primary) }` when image is absent.
- CREA-SP link in the role line points to `https://consultaprofissional.confea.org.br/` (not confea.org.br) with aria-label including CREA number.
- Section B (about-mission): centered paragraph citing ABNT norms and national reach.
- Section C (about-differentials): 2-column grid on tablet+, 4 list items each with Bootstrap Icons SVG bullet (bi-check-circle-fill, bi-globe, bi-file-earmark-text, bi-shield-check). All SVGs: `aria-hidden="true" focusable="false"`.
- Footer identical to index.html: CREA-SP link, email, phone placeholder, copyright.

**src/css/components/about.css** — created with:
- `.about-hero`, `.about-hero__inner`, `.about-photo`, `.about-photo__img`, `.about-hero__text`, `.about-hero__role`, `.about-hero__specialization`
- `.about-mission`, `.about-differentials`, `.differentials__list`, `.differential`, `.differential__icon`, `.differential__title`, `.differential__desc`
- `.obrigado-main`, `.obrigado-icon` (added to avoid extra HTTP request for a small ruleset)
- Zero hardcoded hex values — 100% var() tokens from tokens.css
- Mobile-first: column layout → row at 48rem (raw rem, not CSS var)

**src/js/main.js** — added `import '../css/components/about.css'` after footer.css import.

### Task 2: /obrigado/ Page

**obrigado/index.html** — minimal confirmation page:
- `<header class="site-header site-header--minimal">` — logo SVG only, no `<nav>` element, no hamburger, no nav-toggle. Zero `<nav` tags confirmed.
- Bootstrap Icons bi-check-circle SVG checkmark at 64×64, `fill="currentColor"`, `class="obrigado-icon"` colored via `var(--color-feedback-success)` (green).
- `<h1>Mensagem recebida!</h1>` + `<p>Entraremos em contato em breve.</p>`
- `.btn.btn--primary` back-link to `/`
- Full footer with CREA-SP per CRED-01 (required on all pages).
- Portuguese accents correct: "início", "Entraremos", "recebida".

**src/css/components/header.css** — added `.site-header--minimal` modifier (deviation Rule 2 — missing critical functionality for the task to render correctly):
```css
.site-header--minimal .site-header__inner,
.site-header--minimal .container {
  display: flex;
  justify-content: center;
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
}
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] Added site-header--minimal to header.css**
- **Found during:** Task 2
- **Issue:** Plan specified `class="site-header site-header--minimal"` on the obrigado header, but the `--minimal` modifier had no CSS definition in header.css. Without it, the minimal header would render identically to the full nav header layout.
- **Fix:** Added `.site-header--minimal` CSS block to header.css centering the logo and applying consistent vertical padding via var() tokens.
- **Files modified:** src/css/components/header.css
- **Commit:** cc10984

## Verification Results

All acceptance criteria passed:

```
CONFEA LINK OK       grep "consultaprofissional.confea.org.br" sobre/index.html
CREA OK              grep "CREA" sobre/index.html (body + footer)
PHOTO DIMENSIONS OK  grep 'width="400"' sobre/index.html
PHOTO OK             grep "engenheiro" sobre/index.html
BODY CLASS OK        grep "page-sobre" sobre/index.html
SECTIONS OK          grep "Nossos Diferenciais" sobre/index.html
ABOUT CSS OK         grep "about-photo" src/css/components/about.css
TOKENS OK            grep "var(--color-brand-primary)" src/css/components/about.css
IMPORT OK            grep "about" src/js/main.js
BUILD OK             npm run build exits 0, dist/obrigado/index.html exists
MESSAGE OK           grep "Mensagem recebida" obrigado/index.html
BACK LINK OK         grep "Voltar" obrigado/index.html
CREA FOOTER OK       grep "CREA" obrigado/index.html
BODY CLASS OK        grep "page-obrigado" obrigado/index.html
MINIMAL HEADER OK    grep "site-header--minimal" obrigado/index.html
NO NAV - CORRECT     grep -c "<nav" obrigado/index.html → 0
NO NAV TOGGLE        grep "nav-toggle" obrigado/index.html → empty
NO HARDCODED HEX     grep "#[0-9A-Fa-f]{3,6}" src/css/components/about.css → empty
```

## Self-Check: PASSED
