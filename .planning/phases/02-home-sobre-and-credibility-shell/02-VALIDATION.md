---
phase: 2
slug: home-sobre-and-credibility-shell
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-19
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vite build + grep + browser manual checks |
| **Config file** | `vite.config.js` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + browser visual check
- **Before `/gsd:verify-work`:** Full suite must be green + all manual checks passed
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| vite-multipage | 02-01 | 1 | INFRA-01 | build | `npm run build` exits 0, `dist/sobre/index.html` exists | ⬜ pending |
| homepage-hero | 02-01 | 1 | PAGE-01 | grep | `grep "Solicitar Orçamento" index.html` | ⬜ pending |
| homepage-sections | 02-01 | 1 | PAGE-01 | grep | `grep "Como trabalhamos" index.html` | ⬜ pending |
| footer-crea | 02-01 | 1 | CRED-01 | grep | `grep "CREA" index.html` | ⬜ pending |
| sobre-page | 02-02 | 2 | PAGE-06 | grep | `grep "CREA" sobre/index.html` | ⬜ pending |
| sobre-photo | 02-02 | 2 | CRED-02 | grep | `grep "engenheiro" sobre/index.html` | ⬜ pending |
| confea-link | 02-02 | 2 | CRED-01 | grep | `grep "consultaprofissional.confea" sobre/index.html` | ⬜ pending |
| como-trabalhamos | 02-01 | 1 | CRED-04 | grep | `grep "Como trabalhamos" index.html` | ⬜ pending |
| obrigado-page | 02-02 | 2 | PAGE-08 | build | `test -f obrigado/index.html && npm run build` exits 0 | ⬜ pending |
| mobile-responsive | 02-01 | 1 | PAGE-01 | manual | Browser DevTools at 375px — hero above fold, CTA visible | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/assets/images/` directory created with `.gitkeep` — placeholder for engineer photo
- [ ] `sobre/` directory created with `index.html`
- [ ] `obrigado/` directory created with `index.html`
- [ ] `src/css/components/` — 7 new CSS files created (hero.css, services-grid.css, how-we-work.css, case-teaser.css, footer.css, about.css, nav.css)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero above fold on 375px | PAGE-01 | Visual layout check | Open preview, DevTools → 375px width, verify headline + CTA visible without scroll |
| CSS hamburger opens/closes | PAGE-01 | Interaction check | Mobile 375px → click hamburger → nav links appear → click again → nav closes |
| CREA footer visible on all pages | CRED-01 | Multi-page visual | Check index.html, sobre/index.html, obrigado/index.html previews |
| Inter font loaded on all pages | IDEN-01 | Visual check | All pages use same Inter font (not system fallback) |
| "Como trabalhamos" steps readable | CRED-04 | Layout check | Steps are readable and numbered correctly on mobile and desktop |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
