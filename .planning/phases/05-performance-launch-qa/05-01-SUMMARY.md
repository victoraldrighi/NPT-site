---
phase: 05-performance-launch-qa
plan: 01
subsystem: infra
tags: [seo, analytics, performance, netlify, ga4, sitemap, robots, cache-headers]

# Dependency graph
requires:
  - phase: 04-portfolio-conversion-contact
    provides: all 8 HTML pages built with production-ready content and conversion elements

provides:
  - Production canonical URLs at nptengenharia.com.br across all 8 HTML pages
  - public/sitemap.xml with 7 indexed URLs (excludes /obrigado/)
  - public/robots.txt with crawler directives and sitemap reference
  - netlify.toml with immutable cache on /assets/* and security headers on /*
  - GA4 measurement ID G-N6NX09NWHS installed in all 8 HTML pages
  - Clean Vite build with PERF-01 through PERF-04 verified
  - End-to-end conversion loop verified post-deploy (form, WhatsApp, GA4, PageSpeed)

affects: [post-launch monitoring, PageSpeed Insights verification, GA4 realtime dashboard]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - GA4 gtag.js snippet inserted before </head> in all HTML pages
    - Netlify headers: security on /*, immutable cache on /assets/*
    - sitemap.xml in public/ directory (Vite copies to dist/ verbatim)
    - robots.txt in public/ directory (Vite copies to dist/ verbatim)

key-files:
  created:
    - public/sitemap.xml
    - public/robots.txt
  modified:
    - index.html
    - sobre/index.html
    - obrigado/index.html
    - contato/index.html
    - portfolio/index.html
    - servicos/pressurizacao-escadas-emergencia/index.html
    - servicos/projetos-hidraulicos/index.html
    - servicos/projetos-eletricos/index.html
    - netlify.toml

key-decisions:
  - "GA4 inline init script (window.dataLayer) is non-blocking in practice — async on the gtag.js load script prevents render blocking; PERF-03 accepts this pattern"
  - "Font preload skipped: @fontsource/inter bakes font-display:swap into compiled CSS, preventing FOIT without stale preload risk"
  - "PERF-01 satisfied by design: text-only hero = fastest possible LCP, no above-fold image to optimize"
  - "sitemap.xml excludes /obrigado/ per locked decision — thank-you page should not be indexed"
  - "Netlify header for /* (not /*.html) ensures security headers on all subdirectory pages"

patterns-established:
  - "Public directory pattern: place SEO files in public/ — Vite copies verbatim to dist/ on build"
  - "Netlify headers: /* for security, /assets/* for immutable cache — additive rules"

requirements-completed: [PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, SEO-03, SEO-04]

# Metrics
duration: 15min
completed: 2026-03-20
---

# Phase 5 Plan 01: Performance, SEO Infrastructure, and Launch QA Summary

**SEO infrastructure (sitemap, robots.txt, canonical URLs) + GA4 analytics + Netlify immutable cache headers + Core Web Vitals verification across all 8 HTML pages — all 6 tasks complete including post-deploy E2E verification**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-20T17:28:40Z
- **Completed:** 2026-03-20
- **Tasks:** 6/6 complete
- **Files modified:** 10

## Accomplishments

- All 8 HTML pages updated: `npt-site.netlify.app` replaced with `nptengenharia.com.br` in canonical, og:url, og:image, and JSON-LD fields
- Engineer photo in `sobre/index.html` has `loading="lazy"` and `fetchpriority="low"` to prevent competing with LCP
- `public/sitemap.xml` created with exactly 7 URLs (/ /sobre/ 3 service pages /portfolio/ /contato/) — /obrigado/ excluded per spec
- `public/robots.txt` created: Allow /, Disallow /obrigado/, Sitemap directive pointing to nptengenharia.com.br
- `netlify.toml` updated with X-Frame-Options + X-Content-Type-Options on /*, immutable cache on /assets/*
- GA4 snippet (G-N6NX09NWHS) installed in all 8 HTML pages before </head>
- `npm run build` exits 0, dist/ contains sitemap.xml and robots.txt, all PERF checks pass
- End-to-end conversion loop verified post-deploy: form, WhatsApp, /obrigado/ redirect, GA4 Realtime, and PageSpeed Insights all confirmed passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Update canonical/og URLs and add lazy loading** - `af8bc9f` (feat)
2. **Task 2: Create sitemap.xml and robots.txt** - `767b466` (feat)
3. **Task 3: Add cache and security headers to netlify.toml** - `663b30b` (feat)
4. **Task 4: Add GA4 snippet to all 8 HTML pages** - `b5c4b9c` (feat)
5. **Task 5: Final build verification** - (no file changes, verification only)
6. **Task 6: End-to-end conversion loop verification** - human-verify checkpoint approved

## Files Created/Modified

- `public/sitemap.xml` - 7-URL XML sitemap at nptengenharia.com.br domain
- `public/robots.txt` - Crawler directives: Allow /, Disallow /obrigado/, Sitemap reference
- `netlify.toml` - Security headers on /*, immutable cache on /assets/*
- `index.html` - Canonical/og updated, GA4 snippet added
- `sobre/index.html` - Canonical/og updated, GA4 snippet added, engineer photo lazy loading
- `obrigado/index.html` - Canonical/og updated, GA4 snippet added
- `contato/index.html` - Canonical/og updated, GA4 snippet added
- `portfolio/index.html` - Canonical/og updated, GA4 snippet added
- `servicos/pressurizacao-escadas-emergencia/index.html` - Canonical/og updated, GA4 snippet added
- `servicos/projetos-hidraulicos/index.html` - Canonical/og updated, GA4 snippet added
- `servicos/projetos-eletricos/index.html` - Canonical/og updated, GA4 snippet added

## Decisions Made

- PERF-01 satisfied by design: text-only hero delivers fastest possible LCP — no above-fold image to optimize
- Font preload skipped: `@fontsource/inter` already includes `font-display:swap` in all @font-face declarations in compiled CSS — preload omitted to avoid stale-hash double fetch
- GA4 inline init script (`window.dataLayer`) appears without `async` or `type="module"` but is a non-blocking 5-line initializer — PERF-03 accepts this pattern per plan spec
- sitemap.xml excludes /obrigado/ per locked decision (thank-you page must not be indexed by search engines)

## Deviations from Plan

None - plan executed exactly as written. All tasks 1-4 were already applied in a prior session; Task 4 (GA4) was uncommitted and was committed in this session. Task 5 build verification passed all criteria. Task 6 human-verify checkpoint was approved by the user.

## PERF Requirements Verification

- **PERF-01 (LCP text-only hero):** PASS — no `<img>` in hero section of index.html; text LCP is fastest possible
- **PERF-02 (CLS — all imgs have width+height):** PASS — `grep -rn "<img" --include="*.html" . | grep -v 'width='` returns zero lines
- **PERF-03 (no blocking JS):** PASS — all `<script>` tags are `type="module"` (Vite), `async` (GA4 loader), `type="application/ld+json"` (schema), or the 5-line dataLayer initializer
- **PERF-04 (font-display:swap):** PASS — `grep "font-display" dist/assets/main-*.css` confirms `swap` in all @font-face declarations

## Post-Deploy E2E Verification (Task 6 — Approved)

All post-deploy checks passed and were confirmed by the user:

- Form submission at /contato/ — redirects to /obrigado/ and email delivered
- WhatsApp wa.me link confirmed with correct number and pre-filled message
- /sitemap.xml and /robots.txt load correctly with nptengenharia.com.br URLs
- GA4 Realtime dashboard shows active user when browsing site
- PageSpeed Insights mobile score >= 90, Core Web Vitals green (LCP < 2.5s, CLS < 0.1, INP < 200ms)

## Issues Encountered

None.

## Self-Check: PASSED

- `public/sitemap.xml` created — confirmed in prior session commits (767b466)
- `public/robots.txt` created — confirmed in prior session commits (767b466)
- `netlify.toml` headers — confirmed in prior session commits (663b30b)
- GA4 snippet in all 8 HTML files — confirmed in prior session commits (b5c4b9c)
- Task 6 human-verify checkpoint — approved by user (no commit required for verification-only checkpoint)

---
*Phase: 05-performance-launch-qa*
*Completed: 2026-03-20*
