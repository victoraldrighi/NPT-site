# Phase 1: Foundation & Design System - Research

**Researched:** 2026-03-19
**Domain:** Vite 6.x multi-page build, CSS design tokens, @fontsource/inter, Netlify continuous deployment
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Stack**: Vite 6.x, HTML/CSS/JS puro, Netlify free tier
- **Fonts**: `@fontsource/inter` (self-hosted, MIT) — weights 400, 500, 600, 700 only
- **Colors**: navy `#1B3A6B` + amber `#F5A623` + off-white `#F8F9FA` + surface `#FFFFFF` + text-dark `#1A1A2E` + text-muted `#6B7280` + success `#10B981`
- **Token file location**: `src/css/tokens.css`
- **File structure**: exactly as defined in CONTEXT.md (src/css/, src/js/, src/assets/, blog/, public/)
- **Logo**: SVG inline in header, client's existing logo
- **Phase 1 output**: stub/proof-of-deploy page, not a real landing page
- **Mobile-first breakpoints**: 375px base, 768px tablet, 1280px desktop
- **Free only**: no paid services permitted

### Claude's Discretion

- Minimal CSS reset (prefer minimal reset over normalize.css)
- Exact Vite plugin selection and resolver configuration
- Internal structure of `vite.config.js`
- CSS variables for border-radius, box-shadow, transition defaults
- `.gitignore` and `.netlifyignore` content

### Deferred Ideas (OUT OF SCOPE)

- Analytics (GA4/Plausible) — v2, ANLT-01
- Google Search Console — v2, ANLT-02
- Dark mode toggle — out of scope v1
- Animations (AOS, Framer Motion) — out of scope, harmful to CWV and B2B aesthetic
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| IDEN-01 | Professional color palette and typography for engineering B2B sector | Token system patterns, Inter font setup |
| IDEN-02 | NPT logo integrated with vector version | SVG inline patterns, CSS color-scheme control |
| IDEN-03 | Design system with color, typography, spacing tokens as CSS custom properties | CSS custom property naming conventions, token file structure |
| IDEN-04 | Responsive layout working on mobile, tablet, desktop | Breakpoint token patterns, mobile-first approach |
| INFRA-01 | Vite 6.x build pipeline configured for multi-page HTML | Vite 6.x rollupOptions.input pattern, verified config |
| INFRA-02 | Netlify deploy with automatic HTTPS | netlify.toml config, git-linked continuous deployment |
| INFRA-03 | Folder structure prepared for future /blog/ without refactoring | Static directory scaffold, Vite ignore patterns |
</phase_requirements>

---

## Summary

Phase 1 delivers infrastructure and visual identity only — no content pages. The technical surface is narrow: Vite 6.x configured for multi-page builds, @fontsource/inter self-hosted, CSS custom properties in tokens.css, and a Netlify site linked to the git repo for continuous deployment.

The Vite 6.x version pinning is a deliberate constraint. As of March 2026, npm's `latest` tag points to Vite 8.0.1 (which switches to Rolldown and Oxc). Vite 6.4.1 is the latest stable 6.x release and still uses standard Rollup under the hood. The multi-page configuration uses `build.rollupOptions.input` with `resolve()` paths — identical between Vite 5 and 6.

Netlify continuous deployment is straightforward: link the GitHub repository in the Netlify UI, set build command (`npm run build`) and publish directory (`dist`). The `netlify.toml` file adds reliability by locking these settings in-repo. This is a multi-page static site, not an SPA — no redirect rules needed.

**Primary recommendation:** Pin `vite@6.4.1` explicitly in package.json. Use `@fontsource/inter` (static, not variable) with per-weight CSS imports. Define CSS tokens in a single `tokens.css` with a two-layer structure (primitives → semantic). Connect the Netlify site to GitHub before writing any code to validate the pipeline early.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | 6.4.1 | Build tool, dev server, asset bundling | User decision; latest stable 6.x; standard Rollup internals |
| @fontsource/inter | 5.2.8 | Self-hosted Inter font, per-weight CSS | MIT, eliminates Google Fonts CDN, LGPD-compliant |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none) | — | No JS frameworks, no CSS preprocessor | Plain HTML/CSS/JS per project constraint |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@fontsource/inter` (static) | `@fontsource-variable/inter` | Variable font = one file for all weights (better perf), but `font-family` becomes `'Inter Variable'` not `'Inter'` — breaking name change. Static is fine for 4 weights. |
| Vite 6.4.1 | Vite 8.0.1 | Vite 8 switches bundler to Rolldown/Oxc, `rollupOptions` deprecated, `esbuild` config deprecated — migration risk. User locked to 6.x. |
| Minimal reset (hand-written) | normalize.css / modern-normalize | Normalize adds ~400 lines for cross-browser edge cases not relevant to this project. Minimal reset (~15 lines) preferred per user discretion. |

**Installation:**
```bash
npm create vite@6.4.1 npt-site -- --template vanilla
npm install @fontsource/inter
```

Or from scratch:
```bash
npm init -y
npm install --save-dev vite@6.4.1
npm install @fontsource/inter
```

**Version verification (confirmed 2026-03-19):**
```
vite@6.4.1           — npm view vite@6 version (latest 6.x)
@fontsource/inter@5.2.8 — npm view @fontsource/inter version
```

---

## Architecture Patterns

### Recommended Project Structure

```
/
├── index.html                    # Stub page — proof-of-deploy, tokens visually applied
├── vite.config.js                # Multi-page entry points
├── package.json
├── netlify.toml                  # Build config locked in-repo
├── .gitignore
├── src/
│   ├── css/
│   │   ├── tokens.css            # ALL CSS custom properties (colors, type, spacing)
│   │   ├── base.css              # Reset + typography base + global utilities
│   │   └── components/           # Per-component CSS (header.css, footer.css, etc.)
│   ├── js/
│   │   └── main.js               # JS entry point (minimal in Phase 1)
│   └── assets/
│       ├── logo/                 # logo.svg + logo.png (og:image fallback)
│       └── fonts/                # @fontsource files live in node_modules, not here
├── blog/                         # Empty directory — INFRA-03 scaffold for v2
│   └── .gitkeep                  # Keeps directory in git without content
└── public/
    └── favicon.ico               # Static assets served as-is
```

### Pattern 1: Vite Multi-Page Configuration

**What:** Declare multiple HTML files as Rollup entry points. Vite builds each into the `dist/` folder preserving directory structure.
**When to use:** Any project with more than one `.html` file that needs independent CSS/JS bundles.

```javascript
// vite.config.js
// Source: https://v6.vite.dev/guide/build#multi-page-app
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Add future pages here — e.g.:
        // sobre: resolve(__dirname, 'sobre/index.html'),
        // contato: resolve(__dirname, 'contato/index.html'),
      },
    },
  },
})
```

**Key behavior:** Vite ignores the key name (e.g. `main`) and uses the resolved file path to determine the output path in `dist/`. A file at `sobre/index.html` becomes `dist/sobre/index.html`.

### Pattern 2: CSS Custom Properties Token System (Two Layers)

**What:** Primitive tokens (raw values) + semantic tokens (named by usage). Semantic tokens reference primitives via `var()`.
**When to use:** Always. Semantic layer is what the rest of the codebase uses directly.

```css
/* src/css/tokens.css */
/* Source: Design token naming conventions — smashingmagazine.com/2024/05/naming-best-practices/ */

:root {
  /* ─── PRIMITIVE TOKENS (raw values, rarely used directly) ─── */
  --primitive-navy: #1B3A6B;
  --primitive-amber: #F5A623;
  --primitive-off-white: #F8F9FA;
  --primitive-white: #FFFFFF;
  --primitive-dark: #1A1A2E;
  --primitive-muted: #6B7280;
  --primitive-green: #10B981;

  /* ─── SEMANTIC COLOR TOKENS ─── */
  --color-brand-primary: var(--primitive-navy);
  --color-brand-accent: var(--primitive-amber);
  --color-bg-page: var(--primitive-off-white);
  --color-bg-surface: var(--primitive-white);
  --color-text-body: var(--primitive-dark);
  --color-text-muted: var(--primitive-muted);
  --color-feedback-success: var(--primitive-green);

  /* ─── TYPOGRAPHY TOKENS ─── */
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Modular scale — base 16px */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */

  --line-height-body: 1.5;
  --line-height-heading: 1.2;

  /* ─── SPACING TOKENS (4px base scale) ─── */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* ─── LAYOUT TOKENS ─── */
  --max-width-content: 75rem;  /* 1200px */
  --bp-tablet: 48rem;          /* 768px */
  --bp-desktop: 80rem;         /* 1280px */

  /* ─── COMPONENT TOKENS (Claude's discretion) ─── */
  --radius-sm: 0.25rem;        /* 4px */
  --radius-md: 0.5rem;         /* 8px */
  --radius-lg: 0.75rem;        /* 12px */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --transition-base: 150ms ease-in-out;
}
```

### Pattern 3: @fontsource/inter Import (Weight-Specific)

**What:** Import one CSS file per required weight. No separate subset import needed — the default CSS uses `unicode-range` to auto-select characters, which is the recommended approach.
**When to use:** In `src/js/main.js` (Vite processes the import) or in the CSS entry file.

```javascript
// src/js/main.js
// Source: https://fontsource.org/fonts/inter/install
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import '../css/tokens.css'
import '../css/base.css'
```

**Note:** The default `[weight].css` files include all subsets but use `unicode-range` descriptors — browsers only download the subset file for characters actually used on the page. This is more efficient than manually importing `latin-400.css` because it still only fetches latin characters for a Portuguese page, without breaking the fallback mechanism.

### Pattern 4: Netlify Configuration

**What:** `netlify.toml` at repo root locks build settings in version control. No UI-only configuration that can silently drift.

```toml
# netlify.toml
# Source: https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

**Note:** This is a multi-page static site — NOT an SPA. Do NOT add `[[redirects]] /* -> /index.html` rules. Each page has its own physical HTML file in `dist/`.

### Pattern 5: package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Anti-Patterns to Avoid

- **Using Vite 8 rolldownOptions syntax with Vite 6:** Vite 8 (latest as of March 2026) replaces `rollupOptions` with `rolldownOptions`. Vite 6 still uses `rollupOptions`. Pinning `vite@6.4.1` in `package.json` prevents accidental upgrades.
- **Adding SPA redirect rules to netlify.toml:** This is a multi-page app. The redirect rule `/* -> /index.html` breaks sub-page routing for static sites.
- **Importing @fontsource/inter without weight specifiers:** `import '@fontsource/inter'` only loads weight 400. Silently omits 500/600/700.
- **Using CSS custom property values directly in media queries:** `@media (min-width: var(--bp-tablet))` does not work in CSS. Custom properties cannot be used inside `@media` queries — use the raw value (e.g. `48rem`) or define a PostCSS plugin. This is a documented CSS limitation.
- **Committing `node_modules/` to git:** @fontsource serves fonts from `node_modules/@fontsource/inter/files/`. These are npm packages, not checked-in assets.
- **Expecting the `blog/` directory to affect the Vite build:** An empty directory with `.gitkeep` has no build effect. Vite only processes HTML entry points explicitly declared in `rollupOptions.input`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font self-hosting | Manual @font-face declarations + woff2 downloads | `@fontsource/inter` | Handles woff2 files, unicode-range subsetting, font-display:swap, all weights |
| Asset hashing for cache-busting | Custom filename transform | Vite built-in (`[name]-[hash].js`) | Rollup handles content-hash filenames automatically |
| CSS minification | Manual minifier step | Vite built-in (esbuild for CSS in v6) | Already included in `vite build` |
| HTML injection of hashed asset paths | Template literals or manual href updates | Vite's HTML transform | Vite rewrites `<script src>` and `<link href>` to hashed paths automatically |

**Key insight:** Vite 6's build pipeline handles the full asset pipeline (hashing, bundling, CSS extraction, HTML rewriting) with zero extra configuration for a plain HTML/CSS/JS site.

---

## Common Pitfalls

### Pitfall 1: CSS Custom Properties in Media Queries

**What goes wrong:** Developer tries `@media (min-width: var(--bp-tablet))` — the media query silently fails (evaluates to false or 0px depending on browser), breaking responsive behavior.
**Why it happens:** CSS custom properties are resolved at element-level cascade, not at the media feature evaluation stage.
**How to avoid:** Use rem values directly in `@media` rules. Define tokens as documentation reference in a CSS comment, not as the actual query value.
**Warning signs:** All styles apply at all breakpoints, or tablet/desktop layout never activates.

```css
/* CORRECT */
@media (min-width: 48rem) { /* --bp-tablet: 48rem */
  .container { padding: var(--space-6); }
}

/* WRONG — silently fails */
@media (min-width: var(--bp-tablet)) {
  .container { padding: var(--space-6); }
}
```

### Pitfall 2: Vite Dev Server vs Build Output for Multi-Page

**What goes wrong:** Navigation to `/sobre/` works in dev server but `dist/sobre/index.html` is missing after build because the entry was not added to `vite.config.js`.
**Why it happens:** In dev mode, Vite serves any HTML file found on disk. In build mode, only files explicitly listed in `rollupOptions.input` are processed and copied.
**How to avoid:** Every HTML page MUST be listed in `rollupOptions.input`. Phase 1 only has `index.html`, so this is low risk now — but document the pattern for future phases.
**Warning signs:** `vite preview` shows 404 for pages that worked in `vite dev`.

### Pitfall 3: `npm create vite@latest` Installs Vite 8

**What goes wrong:** Running `npm create vite@latest` or `npm install vite` (without version pin) installs Vite 8.0.1, which has different config API than Vite 6.
**Why it happens:** `latest` dist-tag points to 8.0.1 as of March 2026.
**How to avoid:** Always pin: `npm create vite@6.4.1` or `npm install --save-dev vite@6.4.1`.
**Warning signs:** `vite.config.js` deprecation warnings about `rollupOptions`, `esbuild`, `optimizeDeps.esbuildOptions`.

### Pitfall 4: @fontsource/inter Weight 400 Only

**What goes wrong:** `import '@fontsource/inter'` only imports `400.css`. Headings that rely on `font-weight: 700` silently fall back to system font or render at 400.
**Why it happens:** The bare package import is an alias for the 400-weight CSS only.
**How to avoid:** Import individual weight files explicitly: `'@fontsource/inter/400.css'`, `'@fontsource/inter/700.css'`, etc.
**Warning signs:** Headings look "thin" even with `font-weight: bold` applied in CSS.

### Pitfall 5: Netlify Deploy Detects Wrong Publish Directory

**What goes wrong:** Netlify auto-detects `public/` as the publish directory instead of `dist/`.
**Why it happens:** Netlify's framework detection heuristics may pick the wrong directory for unfamiliar setups.
**How to avoid:** Commit `netlify.toml` with `publish = "dist"` before connecting the repository. File-based config overrides UI and auto-detection.
**Warning signs:** Deploy succeeds but site shows "Page Not Found" — raw `src/` files visible instead of built `dist/`.

### Pitfall 6: Empty `blog/` Directory Not Committed

**What goes wrong:** Git doesn't track empty directories. The `blog/` folder exists locally but vanishes after `git push` and `git clone`.
**Why it happens:** Git tracks files, not directories.
**How to avoid:** Add a `.gitkeep` file inside `blog/`.
**Warning signs:** Clone of the repo is missing `blog/` directory.

---

## Code Examples

### index.html (Stub Page)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NPT Engenharia</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
  <!-- Logo SVG inline -->
  <header class="site-header">
    <svg aria-label="NPT Engenharia" role="img" width="120" height="40">
      <!-- client logo SVG paths here -->
    </svg>
  </header>
  <main>
    <p>Site em desenvolvimento — em breve.</p>
  </main>
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

### base.css (Minimal Reset + Global Styles)

```css
/* src/css/base.css */
/* Source: Claude's discretion — minimal reset per CONTEXT.md */
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%; /* 16px base */
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-body);
  color: var(--color-text-body);
  background-color: var(--color-bg-page);
}

img, video, svg {
  display: block;
  max-width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  line-height: var(--line-height-heading);
  font-weight: var(--font-weight-bold);
}
```

### SVG Logo — Dark/Light Color Control via CSS

```css
/* Control SVG colors via CSS custom properties */
/* The SVG must use currentColor or CSS-addressable fill values */
.site-header svg {
  color: var(--color-brand-primary); /* navy — logo on light background */
}

.hero-dark svg {
  color: var(--color-bg-surface); /* white — logo on navy background */
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN | Self-hosted via @fontsource | ~2022 adoption | Eliminates 3rd-party CDN request; LGPD-compliant |
| Global CSS with class-based values | CSS custom properties (tokens) | ~2020 mainstream | Enables runtime theming, single source of truth |
| Single-page build with one HTML entry | Multi-page `rollupOptions.input` | Vite 2+ | Each HTML page gets own hashed JS/CSS chunk |
| `__dirname` in CommonJS `vite.config.js` | `import.meta.dirname` in ESM | Node 20.11+ | Cleaner ESM config; Node 20 LTS supports it natively |

**Deprecated/outdated:**
- `require('path')` in vite.config.js: Works but requires `"type": "module"` awareness. Prefer `import { resolve } from 'node:path'` with ESM.
- `normalize.css`: Still functional but overkill for this project; minimal reset covers the actual need.
- `rolldownOptions` in vite.config.js: This is Vite 8 syntax. Do NOT use with Vite 6.4.1.

---

## Open Questions

1. **Client logo SVG file availability**
   - What we know: CONTEXT.md says "existing client logo as reference"
   - What's unclear: Whether the SVG file has been delivered and whether its internal colors use hardcoded hex values (which can't be controlled via CSS `color` property) or `currentColor`
   - Recommendation: During implementation, if SVG uses hardcoded fills, replace them with `currentColor` to enable CSS theming. If logo is bitmap only, trace to SVG.

2. **Node.js version on Netlify builder**
   - What we know: Netlify defaults to an older Node version unless specified; `netlify.toml` can set `NODE_VERSION`
   - What's unclear: Which Node version Netlify will use by default for a new site in 2026
   - Recommendation: Lock `NODE_VERSION = "20"` in `netlify.toml` (LTS, supports `import.meta.dirname`).

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` — section included.

### Test Framework

This is a static site with no JavaScript test framework (no React, no Node server, no unit-testable functions in Phase 1). Validation is browser/tool-based, not unit test-based.

| Property | Value |
|----------|-------|
| Framework | None (static site — validation via browser + CLI tools) |
| Config file | `netlify.toml` (build verification) |
| Quick run command | `npm run build && npm run preview` |
| Full suite command | Manual browser checks at 375px / 768px / 1280px |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| IDEN-01 | Color tokens defined in tokens.css | manual | `npm run build` — inspect `dist/` for tokens.css content | Verify vars exist in output |
| IDEN-02 | Logo renders at all breakpoints | manual | Open `npm run preview` at 375/768/1280 in DevTools | Visual check |
| IDEN-03 | CSS custom properties applied to live page | smoke | `npm run build && npm run preview` — open in browser | Inspect element: check `--color-brand-primary` is resolved |
| IDEN-04 | Responsive layout at 3 breakpoints | manual | DevTools device emulation at 375px, 768px, 1280px | Confirm no layout overflow |
| INFRA-01 | Vite produces hashed assets | automated | `npm run build` — verify `dist/assets/*.js` filenames contain hash | Check with `ls dist/assets/` |
| INFRA-02 | Netlify URL returns valid HTML | smoke | `curl -I https://[site].netlify.app` — expect `HTTP/2 200` | Run after git push |
| INFRA-03 | `/blog/` directory exists in project | automated | `test -d blog && test -f blog/.gitkeep && echo PASS` | Run locally before commit |

### Sampling Rate

- **Per task commit:** `npm run build` — confirms no build errors
- **Per wave merge:** `npm run build && npm run preview` — manual browser smoke test at 3 breakpoints
- **Phase gate:** Netlify URL live + `curl` 200 response + visual token verification on live URL

### Wave 0 Gaps

- [ ] No test framework to install — validation is manual + build-time
- [ ] `blog/.gitkeep` — must be created explicitly; git ignores empty directories

*(No unit test infrastructure needed for Phase 1 — all success criteria are verifiable by build output and browser inspection.)*

---

## Sources

### Primary (HIGH confidence)
- [https://v6.vite.dev/guide/build](https://v6.vite.dev/guide/build) — Multi-page app `rollupOptions.input` configuration verified
- [https://v6.vite.dev/guide/migration](https://v6.vite.dev/guide/migration) — Vite 6 breaking changes from v5
- [https://fontsource.org/docs/getting-started/subsets](https://fontsource.org/docs/getting-started/subsets) — @fontsource subset import syntax
- [https://fontsource.org/fonts/inter/install](https://fontsource.org/fonts/inter/install) — @fontsource/inter install docs
- `npm view vite dist-tags` — verified latest Vite 6.x is 6.4.1; latest overall is 8.0.1
- `npm view @fontsource/inter version` — verified current version 5.2.8
- [https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/) — Netlify Vite setup guide

### Secondary (MEDIUM confidence)
- [https://www.smashingmagazine.com/2024/05/naming-best-practices/](https://www.smashingmagazine.com/2024/05/naming-best-practices/) — CSS token naming conventions (widely referenced, 2024)
- [https://docs.netlify.com/build/configure-builds/file-based-configuration/](https://docs.netlify.com/build/configure-builds/file-based-configuration/) — netlify.toml file-based config

### Tertiary (LOW confidence — for awareness only)
- [https://vite.dev/blog/announcing-vite8-beta](https://vite.dev/blog/announcing-vite8-beta) — Vite 8 announcement; confirms rolldown migration (relevant for future upgrade planning)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — npm version verified live, official docs checked
- Architecture: HIGH — Vite official docs + Netlify official docs
- Pitfalls: HIGH for Vite (official migration docs), MEDIUM for Netlify (verified with support forum patterns)
- CSS token patterns: MEDIUM — widely adopted community practice, no single official spec

**Research date:** 2026-03-19
**Valid until:** 2026-06-19 (stable stack; reassess if Vite 8 reaches stable and project considers upgrade)
