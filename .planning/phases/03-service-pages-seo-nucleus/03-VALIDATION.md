---
phase: 3
slug: service-pages-seo-nucleus
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-19
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vite build + grep + browser manual checks |
| **Config file** | `vite.config.js` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + browser visual check
- **Before `/gsd:verify-work`:** Full suite green + all manual checks passed
- **Max feedback latency:** 25 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| vite-3-entries | 03-01 | 1 | SEO-01 | build | `npm run build && test -f dist/servicos/pressurizacao-escadas-emergencia/index.html` | ⬜ pending |
| og-image | 03-01 | 1 | SEO-02 | file | `test -f public/og-image.png` | ⬜ pending |
| seo-home-update | 03-01 | 1 | SEO-02, SEO-06 | grep | `grep "og:title" index.html && grep "canonical" index.html` | ⬜ pending |
| seo-sobre-update | 03-01 | 1 | SEO-02, SEO-06 | grep | `grep "og:title" sobre/index.html && grep "canonical" sobre/index.html` | ⬜ pending |
| pressurizacao-content | 03-02 | 2 | PAGE-02, SEO-02, SEO-05, SEO-06 | grep | `grep "NBR 9077" servicos/pressurizacao-escadas-emergencia/index.html && grep "application/ld+json" servicos/pressurizacao-escadas-emergencia/index.html` | ⬜ pending |
| hidraulica-content | 03-02 | 2 | PAGE-03, SEO-02, SEO-05, SEO-06 | grep | `grep "NBR 5626" servicos/projetos-hidraulicos/index.html && grep "application/ld+json" servicos/projetos-hidraulicos/index.html` | ⬜ pending |
| eletrica-content | 03-02 | 2 | PAGE-04, SEO-02, SEO-05, SEO-06 | grep | `grep "NBR 5410" servicos/projetos-eletricos/index.html && grep "application/ld+json" servicos/projetos-eletricos/index.html` | ⬜ pending |
| home-schema | 03-01 | 1 | SEO-05 | grep | `grep "ProfessionalService" index.html` | ⬜ pending |
| nav-service-links | 03-01 | 1 | SEO-01 | grep | `grep "pressurizacao-escadas-emergencia" index.html` | ⬜ pending |
| breadcrumb-match | 03-02 | 2 | SEO-05 | grep | `grep "BreadcrumbList" servicos/pressurizacao-escadas-emergencia/index.html` | ⬜ pending |
| build-all-pages | 03-02 | 2 | SEO-01 | build | `npm run build && test -f dist/servicos/projetos-hidraulicos/index.html && test -f dist/servicos/projetos-eletricos/index.html` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `public/og-image.png` created (1200×630px, navy background, NPT Engenharia text)
- [ ] `servicos/pressurizacao-escadas-emergencia/` directory created
- [ ] `servicos/projetos-hidraulicos/` directory created
- [ ] `servicos/projetos-eletricos/` directory created
- [ ] `src/css/components/service-page.css` created

**Note on FAQPage schema:** FAQPage JSON-LD does NOT generate rich results on commercial sites (Google policy since Aug 2023). Verification should NOT fail if Rich Results Test shows FAQPage as "not eligible for rich result". FAQPage is implemented for AI Overview visibility (Perplexity, ChatGPT, Gemini), not traditional Google rich results.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Service page 200 status at semantic URL | SEO-01 | Netlify deployment check | Visit each URL in browser, verify 200 (no 404) |
| Meta title ≤60 chars | SEO-02 | Count check | Browser tab title truncated? Use character counter |
| Meta description 144-160 chars | SEO-02 | Count check | View source, count description length |
| BreadcrumbList visible HTML matches JSON-LD | SEO-05 | Cross-reference check | Compare breadcrumb nav text to JSON-LD BreadcrumbList items |
| Google Rich Results Test — Service schema valid | SEO-05 | External tool | Test each URL at search.google.com/test/rich-results (after deploy) |
| Word count ≥800 per service page | PAGE-02/03/04 | Word count | Copy page text to word counter, verify ≥800 |
| Nav links updated to real URLs | SEO-01 | Browser check | Click "Saiba mais" on homepage service cards — navigate correctly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 25s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
