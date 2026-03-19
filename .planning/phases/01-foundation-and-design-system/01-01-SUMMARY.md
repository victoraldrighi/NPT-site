---
phase: 01-foundation-and-design-system
plan: 01
subsystem: infra
tags: [vite, css-tokens, fontsource, inter, netlify, design-system]

# Dependency graph
requires: []
provides:
  - Vite 6.4.1 build pipeline with multi-page rollupOptions
  - CSS design token system (tokens.css) with two-layer architecture
  - Self-hosted Inter font at weights 400/500/600/700 via @fontsource/inter
  - Stub index.html proof-of-deploy page with NPT branding applied
  - blog/.gitkeep scaffold for v2 blog directory
  - netlify.toml with build config locked in-repo
affects:
  - 01-02 (netlify-deploy)
  - 02-landing-page
  - 03-service-pages
  - 04-contact
  - 05-seo-and-launch

# Tech tracking
tech-stack:
  added:
    - vite@6.4.1 (build tool, pinned to 6.x to avoid Rolldown migration)
    - "@fontsource/inter@5.2.8 (self-hosted Inter font, MIT, LGPD-compliant)"
  patterns:
    - Two-layer CSS token architecture (primitives + semantic) in tokens.css
    - @fontsource weight-specific imports (400.css, 500.css, 600.css, 700.css in main.js)
    - Raw rem values in @media queries (never CSS var() references)
    - Vite multi-page build via rollupOptions.input

key-files:
  created:
    - src/css/tokens.css
    - src/css/base.css
    - src/js/main.js
    - index.html
    - vite.config.js
    - netlify.toml
    - package.json
    - .gitignore
    - blog/.gitkeep
    - public/favicon.svg
  modified: []

key-decisions:
  - "Pinned vite@6.4.1 explicitly — npm latest installs Vite 8 which uses Rolldown, breaking rollupOptions API"
  - "Two-layer token system: primitive tokens (raw hex) + semantic tokens (var() references) — semantic layer is what all CSS uses directly"
  - "@fontsource/inter imported as 4 separate weight files (not bare import) — bare import only loads 400, silently omitting 500/600/700"
  - "Media queries use raw rem (48rem, 80rem) not CSS custom properties — CSS vars cannot be used inside @media features"
  - "SVG logo uses currentColor fill for CSS color control — enables dark/light theme switching without duplication"
  - "netlify.toml committed to repo — overrides Netlify UI auto-detection, ensures publish=dist and NODE_VERSION=20"

patterns-established:
  - "Token naming: --primitive-{name} for raw values, --color-{semantic} for usage-named tokens"
  - "Breakpoints: always raw rem in @media, tokens are documentation references only"
  - "Font imports: one import per weight in main.js JS entry point"
  - "Multi-page: add new HTML pages to vite.config.js rollupOptions.input"

requirements-completed: [IDEN-01, IDEN-02, IDEN-03, IDEN-04, INFRA-01, INFRA-03]

# Metrics
duration: 8min
completed: 2026-03-19
---

# Phase 01 Plan 01: Foundation and Design System Summary

**Vite 6.4.1 build pipeline with two-layer CSS token system (navy #1B3A6B + amber #F5A623), self-hosted Inter font at 4 weights, and stub pt-BR deploy-validation page with responsive layout**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-19T22:17:29Z
- **Completed:** 2026-03-19T22:25:45Z
- **Tasks:** 3
- **Files modified:** 10 created

## Accomplishments
- Vite 6.4.1 project initialized from scratch (no npm create — avoids Vite 8 install)
- Complete two-layer CSS design token system locked: 7 colors, 9 font sizes, 10 spacing values, 3 radii, 2 shadows
- Inter font self-hosted at 4 weights via @fontsource (no Google Fonts CDN dependency)
- Stub index.html with inline SVG logo, navy header, off-white background, Inter typography
- Responsive layout verified at 375px/768px/1280px with raw rem breakpoints
- `npm run build` produces hashed assets in dist/ in 416ms

## Task Commits

Each task was committed atomically:

1. **Task 1: Initialize Vite 6.x project with full file structure** - `38eb81e` (feat)
2. **Task 2: Create CSS design token system and base styles** - `cd2da06` (feat)
3. **Task 3: Create stub index.html with logo and responsive layout** - `d815034` (feat)

## Files Created/Modified
- `package.json` - Project manifest with npt-site name, ESM module type, dev/build/preview scripts
- `package-lock.json` - Lock file with vite@6.4.1 and @fontsource/inter@5.2.8
- `vite.config.js` - Multi-page Vite config with rollupOptions.input pointing to index.html
- `netlify.toml` - Build config locked in-repo: command=npm run build, publish=dist, NODE_VERSION=20
- `.gitignore` - Ignores node_modules/, dist/, .DS_Store, *.local
- `src/css/tokens.css` - Complete CSS token system: primitives + semantic colors, typography, spacing, layout, components
- `src/css/base.css` - Minimal CSS reset with box-sizing border-box, global typography via tokens
- `src/js/main.js` - JS entry point: 4 @fontsource/inter weight imports + tokens.css + base.css
- `index.html` - Stub pt-BR page with inline SVG logo, navy header, responsive layout, Inter font
- `blog/.gitkeep` - Empty file to scaffold blog/ directory in git (INFRA-03)
- `public/favicon.svg` - NPT navy (#1B3A6B) branded 32x32 favicon with "N" letter

## Decisions Made
- Pinned vite@6.4.1 explicitly because npm latest now installs Vite 8 (Rolldown/Oxc), which has breaking config API changes
- Used two-layer token architecture so consuming CSS always uses semantic names (--color-brand-primary) not raw primitives
- Imported @fontsource/inter with 4 separate weight files in main.js — bare import only loads 400 weight
- Media queries use raw rem values (48rem, 80rem) not CSS custom properties, which cannot be resolved inside @media feature evaluation

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Netlify connection required.** The build pipeline is complete and verified locally. To enable continuous deployment:
1. Push this repository to GitHub
2. In Netlify UI: New Site > Import from Git > select the repository
3. Build settings are pre-configured via `netlify.toml` — no manual UI config needed
4. Verify the Netlify deploy URL returns HTTP 200 (INFRA-02 completion)

## Next Phase Readiness
- Foundation complete — tokens.css is the source of truth for all subsequent phases
- Vite build pipeline verified working with hashed assets
- blog/ directory scaffold ready for v2 population
- Netlify connection (INFRA-02) is the remaining item from this phase, handled in plan 01-02
- Phase 2 can inherit tokens.css without modification — all color, typography, spacing decisions are locked

---
*Phase: 01-foundation-and-design-system*
*Completed: 2026-03-19*
