---
phase: 03-service-pages-seo-nucleus
plan: "01"
subsystem: seo-infrastructure
tags: [seo, og-image, schema-org, canonical, vite-config, css-components]
dependency_graph:
  requires: []
  provides:
    - vite 6-entry build configuration
    - public/og-image.png (1200x630 navy PNG)
    - src/css/components/service-page.css (breadcrumb, article, FAQ accordion, CTA)
    - canonical + og meta on index.html, sobre/index.html, obrigado/index.html
    - ProfessionalService JSON-LD on home
    - nav links to 3 service pages
  affects:
    - plan 03-02 (service pages depend on CSS scaffold and vite entries)
tech_stack:
  added:
    - scripts/generate-og-image.js (pure-Node PNG generation, no new deps)
  patterns:
    - CSS-only FAQ accordion via HTML <details>/<summary> elements
    - PNG generation using Node.js built-in zlib.deflateSync + manual CRC32
    - Two-layer CSS token architecture (var() tokens throughout)
key_files:
  created:
    - vite.config.js (modified: +3 rollupOptions.input entries)
    - servicos/pressurizacao-escadas-emergencia/.gitkeep
    - servicos/projetos-hidraulicos/.gitkeep
    - servicos/projetos-eletricos/.gitkeep
    - src/css/components/service-page.css
    - scripts/generate-og-image.js
    - public/og-image.png
  modified:
    - src/js/main.js (+1 import line)
    - index.html (canonical, og, JSON-LD, nav, service card hrefs)
    - sobre/index.html (canonical, og, nav)
    - obrigado/index.html (canonical, og)
decisions:
  - "og-image generation: pure-Node approach chosen (canvas not installed); zlib.deflateSync + manual CRC32 produces valid PNG without any new npm packages"
  - "service-page.css: CSS-only FAQ accordion via details/summary — no JavaScript required, progressively enhances with native browser behavior"
  - "JSON-LD scope: ProfessionalService schema placed only on home page (index.html), not on sobre/obrigado, to avoid schema dilution"
metrics:
  duration: "8 min"
  completed_date: "2026-03-20"
  tasks_completed: 3
  files_created: 7
  files_modified: 5
---

# Phase 03 Plan 01: SEO Infrastructure (Wave 1) Summary

**One-liner:** Vite 6-entry config, 1200x630 navy OG image via pure-Node PNG generation, service-page CSS scaffold, and canonical/og/JSON-LD meta on all three existing pages.

## What Was Implemented

### Task 1: Vite entry points + CSS scaffolding

- Extended `vite.config.js` with 3 new `rollupOptions.input` entries: `servicosPressurizacao`, `servicosHidraulica`, `servicosEletrica` — pointing at service page HTML files that Wave 2 (plan 03-02) will create
- Created the 3 `servicos/` subdirectories with `.gitkeep` placeholders so git tracks them before the HTML files exist
- Added `import '../css/components/service-page.css'` to `src/js/main.js`
- Created `src/css/components/service-page.css` with five sections, all using `var()` tokens (zero hex values):
  - `.breadcrumb` — horizontal flex row with muted text, aria-current support
  - `.service-article` — 70ch max-width prose column, responsive h1 (3xl → 4xl at 48rem)
  - `dl.service-specs` — stacked mobile, 2-column grid at 48rem
  - `.service-faq` with `.faq-item` — CSS-only accordion using `<details>/<summary>`, custom `+`/`−` indicator via `::after`, no JavaScript
  - `.service-cta` — navy background section with flex button row at 48rem

### Task 2: og-image.png generation

- Wrote `scripts/generate-og-image.js` using only Node.js built-in modules (`node:fs`, `node:zlib`)
- PNG structure: signature → IHDR (1200×630, RGB color type 2, bit depth 8) → IDAT (deflated raw pixels) → IEND
- Manual CRC32 lookup table (256-entry Uint32Array) for PNG chunk integrity without any external library
- Raw image data: 630 rows × (1 filter byte + 1200×3 RGB bytes), filled with navy `#1B3A6B` (0x1B, 0x3A, 0x6B)
- Output: `public/og-image.png` at 3,633 bytes — valid PNG verified by reading width/height bytes (offsets 16/20)

### Task 3: SEO meta block on existing pages + home schema + nav updates

**index.html:**
- Inserted `<link rel="canonical" href="https://npt-site.netlify.app/" />` (1 canonical confirmed by grep -c)
- Inserted 9 og meta tags (og:title, og:description, og:type, og:url, og:image, og:image:width, og:image:height, og:locale, og:site_name)
- Inserted `ProfessionalService` JSON-LD script with 3-item OfferCatalog
- Added 3 service nav links before Sobre in `<ul class="nav-links">`
- Updated 3 `.service-card__link` hrefs from `#` to real service URLs

**sobre/index.html:**
- Inserted canonical (`/sobre/`) and 9 og meta tags
- Added 3 service nav links before Sobre

**obrigado/index.html:**
- Inserted canonical (`/obrigado/`) and 9 og meta tags (after `<title>`, page has no description meta)

## Verification Results

All structural checks passed (no build run — service page HTML files don't exist yet, Wave 2 creates them):

| Check | Result |
|-------|--------|
| vite.config.js has 6 entries | PASS |
| servicos/ subdirectories exist | PASS |
| og-image.png exists, > 1000 bytes | PASS (3633 bytes) |
| og-image.png is 1200x630 | PASS (confirmed by reading PNG header) |
| service-page.css exists with .faq-item | PASS |
| No hex colors in service-page.css | PASS |
| main.js imports service-page.css | PASS |
| index.html: exactly 1 canonical | PASS (grep -c = 1) |
| index.html: ProfessionalService JSON-LD | PASS |
| index.html: og:image absolute URL | PASS |
| index.html: service card hrefs updated | PASS (no href=# on .service-card__link) |
| sobre/index.html: canonical + og:title | PASS |
| obrigado/index.html: canonical + og:title | PASS |

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `731328c` | feat(03-01): Vite entry points, service-page CSS, and directory scaffolding |
| Task 2 | `fe4e7d9` | feat(03-01): generate og-image.png (1200x630, navy) via pure-Node script |
| Task 3 | `849620d` | feat(03-01): SEO meta blocks, JSON-LD schema, and nav links on existing pages |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed ESM import-in-middle-of-file issue in generate-og-image.js**
- **Found during:** Task 2
- **Issue:** The plan's reference implementation placed `import { writeFileSync, mkdirSync } from 'node:fs'` in the middle of the file (after code), which is invalid in ESM — all imports must be at the top
- **Fix:** Rewrote script with all imports at the top of the file; moved `writeFileSync` and `mkdirSync` to the initial import declaration alongside `deflateSync`
- **Files modified:** `scripts/generate-og-image.js`
- **Commit:** `fe4e7d9`

## Self-Check: PASSED

All created files confirmed on disk. All three task commits confirmed in git log.

| Item | Status |
|------|--------|
| src/css/components/service-page.css | FOUND |
| public/og-image.png | FOUND |
| scripts/generate-og-image.js | FOUND |
| commit 731328c (Task 1) | FOUND |
| commit fe4e7d9 (Task 2) | FOUND |
| commit 849620d (Task 3) | FOUND |
