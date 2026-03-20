# Phase 5: Performance & Launch QA - Research

**Researched:** 2026-03-20
**Domain:** Core Web Vitals, Netlify configuration, GA4, sitemap/robots, font optimization
**Confidence:** HIGH

## Summary

Phase 5 is a hard gate before go-live. All implementation work is already complete in prior phases; this phase adds the infrastructure layer (netlify.toml, sitemap.xml, robots.txt, GA4 snippet, font preload) and corrects canonical URLs from `npt-site.netlify.app` to `nptengenharia.com.br` across all 8 HTML files.

The project baseline is excellent for Core Web Vitals: hero is text-only (no LCP image to optimize), Inter is already self-hosted with `font-display: swap` baked into `@fontsource/inter` (verified from built CSS), no JS in the critical path, and the engineer photo has explicit width/height. The Lighthouse score should land well above 90 with the cache headers and font preload added.

One critical correction to the CONTEXT.md: Vite with no custom `build.assetsDir` outputs ALL hashed assets — fonts, CSS, and JS — into a single `/assets/` directory. The CONTEXT.md noted `/_assets/` for CSS/JS and `/assets/` for fonts separately; in reality both go into `/assets/`. The netlify.toml cache rule is one pattern: `for = "/assets/*"`.

**Primary recommendation:** Implement in this order: (1) netlify.toml cache + security headers, (2) sitemap.xml + robots.txt in /public/, (3) GA4 snippet in all 8 HTML heads, (4) canonical URL bulk replace, (5) font preload link tags, (6) PageSpeed Insights validation.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Dominio & Sitemap:**
- Dominio final: `https://nptengenharia.com.br` — usar este dominio em TODAS as URLs absolutas do sitemap e canonical (nao `npt-site.netlify.app`)
- Sitemap.xml: `/public/sitemap.xml` — gerado estaticamente, listando todas as 8 paginas indexaveis
- Paginas incluidas no sitemap: `/`, `/sobre/`, `/servicos/pressurizacao-escadas-emergencia/`, `/servicos/projetos-hidraulicos/`, `/servicos/projetos-eletricos/`, `/portfolio/`, `/contato/`
- Paginas excluidas do sitemap: `/obrigado/` (pagina de thank-you nao deve ser indexada)
- Prioridades sugeridas: homepage `1.0`, servicos `0.9`, portfolio/contato/sobre `0.8`
- Changefreq: `monthly` para todas as paginas (conteudo tecnico estavel)
- robots.txt: permitir Googlebot em tudo (`User-agent: * / Allow: /`), `Disallow: /obrigado/`, `Sitemap: https://nptengenharia.com.br/sitemap.xml`

**Canonicos — Atualizacao de Dominio:**
- Todos os `<link rel="canonical">` e `og:url` nas 8 paginas estao apontando para `npt-site.netlify.app`
- Decisao: atualizar para `https://nptengenharia.com.br` em todas as paginas nesta fase
- Afeta: canonical link, og:url, og:image (URL absoluta), JSON-LD `url` e `logo` fields

**Performance (Core Web Vitals):**
- LCP: Hero da homepage eh texto puro — LCP element sera o `<h1>`, nenhuma imagem a otimizar
- Foto do engenheiro em `/sobre/`: adicionar `loading="lazy"` e `fetchpriority="low"` para nao competir com above-fold
- CLS: `<img>` ja tem `width="400" height="400"` explícitos
- INP: nenhum JS bloqueante no critical path

**netlify.toml — Cache Headers:**
- Assets hashed (CSS/JS/fonts em `/assets/`): `Cache-Control: public, max-age=31536000, immutable`
- HTML: `Cache-Control: no-cache`
- Fonts (`/assets/`): `Cache-Control: public, max-age=31536000, immutable`
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`

**Preconnect/Preload:**
- Fontes sao self-hosted — nenhum preconnect para Google Fonts necessario
- `<link rel="preload">` para fonte Inter 400 no `<head>` de todas as paginas

**Google Analytics 4:**
- Measurement ID: `G-N6NX09NWHS`
- Implementacao: snippet `gtag.js` inline no `<head>` de todas as 8 paginas
- Banner de cookies: NAO implementar nesta fase — MVP sem LGPD compliance completo
- Eventos rastreados: apenas pageview automatico (via gtag default)

**Checklist de Launch (Hard Gate):**
1. `npm run build` exits 0 sem warnings
2. `/sitemap.xml` acessivel e valido (7 URLs, excluindo /obrigado/)
3. `/robots.txt` acessivel e correto
4. GA4 snippet presente em todas as 8 paginas (grep por `G-N6NX09NWHS`)
5. Canonical/og:url atualizado para `nptengenharia.com.br` em todas as paginas
6. PageSpeed Insights mobile >= 90 na homepage (manual, pos-deploy)
7. LCP < 2.5s, CLS < 0.1, INP < 200ms (manual, PageSpeed Insights)

### Claude's Discretion
- Estrutura exata do `netlify.toml` (path patterns, header syntax)
- Ordem dos elementos `<link rel="preload">` no `<head>`
- Formato exato das datas `<lastmod>` no sitemap (ISO 8601: `2026-03-20`)
- Posicao do snippet GA4 no `<head>` (apos title/meta, antes de scripts)

### Deferred Ideas (OUT OF SCOPE)
- Banner de cookies LGPD compliant — v2
- Eventos GA4 customizados (clique WhatsApp, envio formulario) — v2, ANLT-01/03
- Google Search Console configuracao e sitemap submission — acao manual pos-deploy pelo cliente (ANLT-02)
- WebP conversion pipeline para foto do engenheiro
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PERF-01 | LCP < 2.5s — imagem hero otimizada com fetchpriority="high" e formato WebP | Hero is text-only: LCP element is `<h1>`, no image. Add `loading="lazy"` + `fetchpriority="low"` to /sobre/ engineer photo. font preload reduces LCP time-to-text. |
| PERF-02 | CLS < 0.1 — todos os `<img>` com width e height explícitos | Engineer photo already has `width="400" height="400"`. @fontsource has font-display:swap so no FOIT layout shift. Verified: no other images in site. |
| PERF-03 | INP < 200ms — sem JavaScript bloqueante no critical path | No JS event handlers; hamburger is CSS-only; FAQ is details/summary. Only JS is main.js loaded as type="module" (deferred by default). Already passing. |
| PERF-04 | Fontes auto-hospedadas com font-display: swap | @fontsource/inter 5.2.8 includes `font-display: swap` in all @font-face declarations. Verified in built CSS at `/assets/main-Drputy-u.css`. No additional CSS needed. |
| PERF-05 | Lighthouse Performance Score >= 90 em mobile | Enabled by: cache headers (immutable assets), font preload (reduces render-blocking), no hero image. netlify.toml cache headers are the highest-impact single change. |
| SEO-03 | sitemap.xml gerado e acessivel em /sitemap.xml | Create `/public/sitemap.xml` with 7 URLs (excluding /obrigado/). Google ignores changefreq/priority; only lastmod matters. Use YYYY-MM-DD format. |
| SEO-04 | robots.txt configurado corretamente | Create `/public/robots.txt` with Allow: /, Disallow: /obrigado/, Sitemap directive pointing to nptengenharia.com.br. |
</phase_requirements>

---

## Standard Stack

### Core (no new dependencies needed)
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Vite | 6.4.1 (pinned) | Build pipeline already in place | Already installed, no change |
| @fontsource/inter | 5.2.8 | Self-hosted fonts | Already installed, font-display:swap built-in |
| Netlify | Free tier | Hosting, CDN, HTTPS | Already live at npt-site.netlify.app |

No new npm packages are needed for this phase. All implementation is HTML/TOML/XML text files.

**Installation:** None required.

**Version verification:** Confirmed via package.json — `vite@^6.4.1`, `@fontsource/inter@^5.2.8`.

---

## Architecture Patterns

### Vite Build Output Structure (verified from actual dist/)

```
dist/
├── index.html              # HTML pages at root or in named subdirs
├── sobre/index.html
├── servicos/pressurizacao-escadas-emergencia/index.html
├── servicos/projetos-hidraulicos/index.html
├── servicos/projetos-eletricos/index.html
├── portfolio/index.html
├── contato/index.html
├── obrigado/index.html
├── assets/                 # ALL hashed assets go here (single directory)
│   ├── main-B-tY_Cxr.js       # Hashed JS bundle
│   ├── main-Drputy-u.css      # Hashed CSS bundle (includes font @font-face)
│   ├── inter-latin-400-normal-C38fXH4l.woff2   # Hashed font files
│   └── inter-*.woff2 / *.woff  # All font subsets/weights
├── favicon.svg
├── og-image.png
├── sitemap.xml             # Copied verbatim from public/
└── robots.txt              # Copied verbatim from public/
```

**Critical finding:** Vite's default `build.assetsDir` is `"assets"`. With no override in `vite.config.js`, CSS, JS, and fonts ALL output to `/assets/`. The netlify.toml cache header path `for = "/assets/*"` covers all three. There is no separate `/_assets/` directory.

### Pattern 1: netlify.toml Cache Headers

**What:** Adds HTTP `Cache-Control` headers via Netlify's routing layer. Netlify reads this file from the repository root (not from `dist/`).

**When to use:** All static site deploys on Netlify that want long-lived cache for content-addressed assets.

```toml
# Source: https://docs.netlify.com/manage/routing/headers/

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

**Why this structure:**
- `/assets/*` covers ALL hashed assets (fonts, CSS, JS) in one rule
- `immutable` tells browsers the file will never change at that URL — enables aggressive client-side caching
- HTML gets `no-cache` so browsers always revalidate; hashed filenames in the HTML change on each build
- Security headers on `/*` apply to all responses
- `[[headers]]` rules are additive; more specific paths do not override less specific ones for different headers

### Pattern 2: GA4 gtag.js Snippet

**What:** Two-script tag pattern. First loads the gtag library async; second initializes the dataLayer and configures the measurement ID.

**Placement:** Immediately after the opening `<head>` tag on every page (before title, meta, or any other scripts).

```html
<!-- Source: https://developers.google.com/tag-platform/gtagjs -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N6NX09NWHS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-N6NX09NWHS');
</script>
```

**Why `async`:** The first script tag has `async` so it does not block HTML parsing. The second inline script is synchronous but tiny (5 lines), initializing the dataLayer before the async script returns.

### Pattern 3: sitemap.xml

**What:** Static XML file listing all indexable URLs with lastmod dates.

**Google's current behavior (2026):** Google ignores `<changefreq>` and `<priority>` entirely. Only `<loc>` and `<lastmod>` (YYYY-MM-DD format) are used. Keep the file clean without ignored tags.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nptengenharia.com.br/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
  <url>
    <loc>https://nptengenharia.com.br/sobre/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
  <url>
    <loc>https://nptengenharia.com.br/servicos/pressurizacao-escadas-emergencia/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
  <url>
    <loc>https://nptengenharia.com.br/servicos/projetos-hidraulicos/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
  <url>
    <loc>https://nptengenharia.com.br/servicos/projetos-eletricos/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
  <url>
    <loc>https://nptengenharia.com.br/portfolio/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
  <url>
    <loc>https://nptengenharia.com.br/contato/</loc>
    <lastmod>2026-03-20</lastmod>
  </url>
</urlset>
```

**Note:** 7 URLs total (not 8 — /obrigado/ is excluded per locked decision).

### Pattern 4: robots.txt

```
User-agent: *
Allow: /
Disallow: /obrigado/

Sitemap: https://nptengenharia.com.br/sitemap.xml
```

**Blank line before Sitemap directive is required** per the robots.txt specification.

### Pattern 5: Font Preload

**What:** `<link rel="preload">` hint tells the browser to fetch the Inter 400 woff2 font file before it would normally discover it in the CSS.

**Critical constraint:** The hashed filename changes on every `npm run build`. The preload `href` must match the exact filename in the current dist output. As of the last build, the Inter 400 latin woff2 is `inter-latin-400-normal-C38fXH4l.woff2`, but this will change after any rebuild. The implementation task must run `npm run build` first and then read the actual hash from `dist/assets/`.

**The `crossorigin` attribute is mandatory** even for same-origin fonts. Browsers fetch fonts without credentials by default; the preload hint must also be without credentials. Without `crossorigin`, the browser double-fetches the font — once from preload (wrong credentials context) and once from CSS (correct). This wastes the preload entirely.

```html
<!-- Source: https://web.dev/articles/codelab-preload-web-fonts -->
<link
  rel="preload"
  href="/assets/inter-latin-400-normal-C38fXH4l.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

**Recommendation on font preload complexity:** Given the hash changes on each build, the font preload has a real maintenance risk: the href will be stale after any CSS change triggers a rebuild. A pragmatic alternative is to use `<link rel="preconnect">` with fonts being same-origin (no benefit) — so the real decision is whether the LCP gain from preload justifies the maintenance complexity. Given that the LCP element is text (h1), browsers render text before fonts load (due to `font-display: swap`), so the preload mainly eliminates the FOIT flash. It is a quality-of-life improvement, not a hard requirement. The planner should decide whether to implement a build step that extracts the font hash automatically, or accept the manual update requirement.

### Pattern 6: Canonical URL Bulk Replace

**What:** Replace all occurrences of `npt-site.netlify.app` with `nptengenharia.com.br` across 8 HTML files.

**Scope (verified from index.html inspection):** Each HTML file contains at minimum:
- `<link rel="canonical" href="https://npt-site.netlify.app/...">` (1 occurrence)
- `<meta property="og:url" content="https://npt-site.netlify.app/...">` (1 occurrence)
- `<meta property="og:image" content="https://npt-site.netlify.app/og-image.png">` (1 occurrence)
- JSON-LD `"url": "https://npt-site.netlify.app..."` (1-2 occurrences)
- JSON-LD `"logo": "https://npt-site.netlify.app/favicon.svg"` (1 occurrence)

**Safest approach:** A targeted sed/replace on `npt-site.netlify.app` string, which only appears in canonical/OG/JSON-LD contexts (never in navigation links, which use relative paths). The search string is unique enough to avoid false positives.

**Files to update (8 total):**
```
index.html
sobre/index.html
obrigado/index.html
contato/index.html
portfolio/index.html
servicos/pressurizacao-escadas-emergencia/index.html
servicos/projetos-hidraulicos/index.html
servicos/projetos-eletricos/index.html
```

**Verification command after replace:**
```bash
grep -r "npt-site.netlify.app" /c/Users/valdrighi/*.html /c/Users/valdrighi/sobre/ /c/Users/valdrighi/obrigado/ /c/Users/valdrighi/contato/ /c/Users/valdrighi/portfolio/ /c/Users/valdrighi/servicos/
```
Expected output: zero lines.

### Anti-Patterns to Avoid

- **Putting netlify.toml in dist/:** Netlify reads it from the repo root, not the build output. It must be at `C:/Users/valdrighi/netlify.toml`, not inside `dist/`.
- **Using `/_assets/*` path in netlify.toml:** This project's Vite config uses the default `assetsDir = "assets"`, so all hashed assets are at `/assets/`, not `/_assets/`. Using the wrong path means cache headers silently don't apply.
- **Omitting `crossorigin` from font preload:** The font will be fetched twice — the preload is wasted and potentially adds latency.
- **Adding `<priority>` and `<changefreq>` to sitemap:** Google ignores these completely. Including them adds noise without benefit.
- **Placing GA4 snippet in main.js:** GA4 must be in the HTML `<head>`, not in the JS module. Placing it in JS means it fires after module evaluation, potentially missing early pageview events. Additionally, it would add an external script dependency to the JS bundle.
- **Implementing a cookie banner in this phase:** Locked as deferred to v2. Do not implement.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cache busting | Custom hash renaming | Vite's built-in content hashing | Already working; Vite appends `-[hash]` automatically |
| Font subsetting | Custom woff2 generation | @fontsource/inter's unicode-range subsets | @fontsource already ships latin, cyrillic, greek, vietnamese subsets with unicode-range |
| Sitemap generation | npm sitemap package | Static hand-written XML | 7 URLs, stable content — a package adds a build step for zero benefit |
| Analytics | Custom event tracking | GA4 gtag default pageview | Auto-collected events cover all v1 requirements |

**Key insight:** This is a static site with 7 indexable pages. Every "automation" approach adds complexity without solving a real problem at this scale.

---

## Common Pitfalls

### Pitfall 1: Vite Asset Path Mismatch in netlify.toml

**What goes wrong:** Developer configures netlify.toml with `for = "/_assets/*"` (common pattern for Astro or custom Vite configs), but this Vite config uses the default `assetsDir`. Cache headers silently apply to zero files.

**Why it happens:** Different frameworks/configs use different asset directory names. The assumption from other projects bleeds in.

**How to avoid:** Always verify with `ls dist/` after a build. This project outputs to `dist/assets/` (confirmed). Use `for = "/assets/*"`.

**Warning signs:** Lighthouse "serve static assets with efficient cache policy" audit still failing after deploying netlify.toml.

### Pitfall 2: Font Preload href Goes Stale After Rebuild

**What goes wrong:** Preload `href` is hardcoded to `inter-latin-400-normal-C38fXH4l.woff2`. After any CSS change, Vite regenerates the hash and the filename changes. The preload points to a 404, and the browser double-fetches the font.

**Why it happens:** Vite content-hashes assets based on file content. Any change to the CSS bundle (which includes the font-face declarations) changes the CSS hash, which changes the JS hash, which can change the font hash.

**How to avoid:** Either (a) implement the preload as a build-time step that reads the actual hash, or (b) accept that it needs manual update after CSS changes, or (c) skip the preload entirely (the LCP impact is minimal since hero is text and font-display:swap is already set).

**Warning signs:** Browser DevTools Network tab shows two requests for the same font file.

### Pitfall 3: og:image URL Not Updated

**What goes wrong:** Search-and-replace catches `<link rel="canonical">` and `og:url` but misses `og:image` because it has a path suffix (`/og-image.png`). Social sharing crawlers get a broken image URL.

**Why it happens:** The replace string `https://npt-site.netlify.app` appears in three distinct contexts in the HTML. A regex that anchors on the closing `"` might not match the image URL.

**How to avoid:** Replace the string `npt-site.netlify.app` (without https://) across all contexts — this matches canonical, og:url, og:image, and JSON-LD `url`/`logo` in a single operation.

**Warning signs:** `grep -r "npt-site.netlify.app"` after replacement still shows matches.

### Pitfall 4: JSON-LD url/logo Fields Missed

**What goes wrong:** The canonical link and og:url are updated, but the JSON-LD `"url"` and `"logo"` fields (in `<script type="application/ld+json">`) are not. Google's Rich Results Test shows the old domain in structured data.

**Why it happens:** Developers doing manual edits focus on meta tags and forget the JSON block.

**How to avoid:** After the bulk replace, verify with: `grep -r "npt-site.netlify.app" [all html files]` — zero results expected.

### Pitfall 5: netlify.toml Header Order

**What goes wrong:** More general rules (`/*`) are listed before more specific rules (`/assets/*`), and the developer expects the specific rule to "win". Netlify actually applies ALL matching rules, not just the most specific one.

**Why it happens:** Nginx/Apache override semantics don't apply to Netlify headers. Netlify merges all matching header rules.

**How to avoid:** With merging behavior, putting `/*` with security headers and `/assets/*` with cache headers is correct — both apply to asset responses, which is fine (security headers on assets are harmless). For `Cache-Control`, set it only on the paths where it should differ, since setting it on `/*` would also set it on assets (overriding the immutable rule). The safe structure is: security headers on `/*`, HTML cache on `/*.html`, asset cache on `/assets/*`.

---

## Code Examples

### Complete netlify.toml

```toml
# Source: https://docs.netlify.com/manage/routing/headers/
# Located at: repo root (NOT inside dist/)

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Note:** HTML files at subdirectory paths like `/sobre/index.html` are matched by Netlify's `/*.html` pattern only for root-level HTML. For subdirectory HTML, the pattern needs to be `/**/*.html` or simply rely on Netlify's default behavior (HTML defaults to shorter cache). Verify after deploy with curl or browser DevTools.

**Safer HTML cache pattern:**
```toml
[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/*/index.html"
  [headers.values]
    Cache-Control = "no-cache"
```

Or use the simplest approach: set `no-cache` on `/*` and then override with `immutable` on `/assets/*` (Netlify applies both, but the last Cache-Control wins for the same header name — this needs testing):

**Recommended safest netlify.toml:**
```toml
# Security headers — all responses
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"

# Long cache for hashed assets (Vite content-hashed filenames)
# This project's Vite config outputs to /assets/ (default assetsDir)
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Note on HTML cache:** Netlify's default for HTML is already no-cache behavior (CDN respects short max-age). Explicitly setting it is belt-and-suspenders but not strictly required.

### GA4 Snippet (exact, with real Measurement ID)

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N6NX09NWHS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-N6NX09NWHS');
</script>
```

Place immediately after `<head>` opening tag, before `<meta charset>` if possible, or at minimum before `</head>`.

### Font Preload (with caveat on hash stability)

```html
<!-- Inter 400 latin — hash must match current dist/assets/ after build -->
<!-- Run: ls dist/assets/inter-latin-400-normal-*.woff2 to get current hash -->
<link
  rel="preload"
  href="/assets/inter-latin-400-normal-C38fXH4l.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

Current hash (as of last build): `inter-latin-400-normal-C38fXH4l.woff2`
Verify before implementing: `ls dist/assets/ | grep "inter-latin-400-normal.*woff2"`

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Include `<changefreq>` and `<priority>` in sitemap | Omit both; only `<lastmod>` matters | Google confirmed ignoring these ~2023 | Simpler XML, no functional difference |
| Google Fonts CDN | Self-hosted via @fontsource | Ongoing trend; accelerated by GDPR/LGPD | Already implemented; no CDN request |
| `font-display: block` | `font-display: swap` | Web Vitals era (2019+) | @fontsource sets this by default |
| Manual `_headers` file in dist/ | `netlify.toml` in repo root | Netlify current recommended approach | Config lives in version control |
| UA/analytics.js | GA4 / gtag.js | UA sunset July 2023 | Only GA4 is current |

**Deprecated/outdated:**
- Universal Analytics (UA): sunset July 2023. Not applicable.
- `analytics.js`: replaced by `gtag.js`. Not applicable.
- Google Fonts CDN import: not used in this project (self-hosted via @fontsource).

---

## Open Questions

1. **netlify.toml `/*.html` pattern for subdirectory pages**
   - What we know: Netlify wildcard `*` matches within a single path segment
   - What's unclear: Whether `/*.html` matches `/sobre/index.html` or only `/index.html`
   - Recommendation: Rely on Netlify's default HTML cache behavior rather than adding a potentially wrong HTML cache rule. The asset cache rule is the high-value one.

2. **Font preload hash maintenance**
   - What we know: Font filename hash changes when CSS bundle content changes
   - What's unclear: How stable the hash will be post-launch (low CSS change frequency expected)
   - Recommendation: Implement font preload for launch. Add a comment in each HTML file noting the hash must be updated when CSS changes. Alternatively, skip it — the LCP baseline (text-only hero) is already excellent.

3. **ob:url /obrigado/ page canonical**
   - What we know: /obrigado/ is excluded from sitemap and robots.txt disallows it
   - What's unclear: Whether the canonical on /obrigado/ should point to itself with the new domain, or be removed
   - Recommendation: Update the canonical URL to `nptengenharia.com.br/obrigado/` as part of the bulk replace (the page still exists, canonical is not harmful), but confirm Disallow in robots.txt prevents indexing.

---

## Validation Architecture

nyquist_validation is enabled (config.json confirms `"nyquist_validation": true`).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None (pure HTML/CSS/JS project with no test runner) |
| Config file | N/A |
| Quick run command | `npm run build` (build validation) + `grep` checks |
| Full suite command | Manual PageSpeed Insights post-deploy |

This project has no automated test framework. Validation is build-verification + grep + manual PageSpeed Insights. Wave 0 should establish grep-based shell assertions as the "test suite" for this phase.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-01 | LCP < 2.5s on mobile | manual | PageSpeed Insights post-deploy | N/A (manual) |
| PERF-02 | All `<img>` have width+height | smoke | `grep -r "<img" [html files] \| grep -v "width="` → zero output | ❌ Wave 0 |
| PERF-03 | No blocking JS in critical path | smoke | `grep -r "<script" [html files] \| grep -v "type=\"module\"" \| grep -v "async" \| grep -v "ld+json"` → only GA4 async | ❌ Wave 0 |
| PERF-04 | font-display:swap present | smoke | `grep "font-display" dist/assets/main-*.css` → "swap" | ❌ Wave 0 (requires build first) |
| PERF-05 | Lighthouse >= 90 mobile | manual | PageSpeed Insights post-deploy | N/A (manual) |
| SEO-03 | sitemap.xml accessible | smoke | `cat dist/sitemap.xml` + verify 7 `<loc>` entries | ❌ Wave 0 |
| SEO-04 | robots.txt correct | smoke | `cat dist/robots.txt` + verify Disallow:/obrigado/ and Sitemap: directive | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build && echo "Build OK"`
- **Per wave merge:** Full grep audit (canonical URLs, GA4 Measurement ID presence, sitemap URL count, robots.txt content)
- **Phase gate:** `npm run build` exits 0 + grep audit clean + manual PageSpeed >= 90

### Wave 0 Gaps

- [ ] No test runner to install — validation is shell commands
- [ ] Establish post-build grep verification script (or run inline in tasks)
- [ ] Manual PageSpeed Insights check can only run after deploy to Netlify

---

## Sources

### Primary (HIGH confidence)
- Netlify Docs — Custom Headers: https://docs.netlify.com/manage/routing/headers/ — netlify.toml syntax, path patterns, header merging behavior
- Google Search Central — Build Sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap — confirmed Google ignores changefreq/priority, uses lastmod YYYY-MM-DD
- Google Tag Platform — gtag.js: https://developers.google.com/tag-platform/gtagjs — canonical two-script GA4 snippet
- web.dev — Preload Web Fonts: https://web.dev/articles/codelab-preload-web-fonts — crossorigin attribute requirement
- @fontsource/inter source (verified in node_modules): `font-display: swap` confirmed in all @font-face declarations

### Secondary (MEDIUM confidence)
- sitemaps.org Protocol: https://www.sitemaps.org/protocol.html — XML structure, namespace, required vs optional fields
- MDN — rel="preload": https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload — as="font" and crossorigin attributes

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; all existing, verified
- Architecture: HIGH — verified from actual dist/ output and official Netlify/Google docs
- Pitfalls: HIGH — two pitfalls (asset path mismatch, font preload staleness) verified from actual build output inspection
- Font-display:swap: HIGH — verified directly in @fontsource/inter/400.css and compiled dist CSS

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (stable APIs; Netlify header syntax and GA4 snippet format rarely change)
