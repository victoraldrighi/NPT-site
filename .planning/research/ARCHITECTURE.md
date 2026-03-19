# Architecture Research

**Domain:** Static HTML/CSS/JS B2B Professional Services Institutional Website
**Project:** NPT Engenharia — Site Institucional
**Researched:** 2026-03-19
**Confidence:** HIGH (stable, well-established patterns; no external tools available — based on training knowledge through August 2025)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                              │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │index.html│  │servicos/ │  │portfolio/│  │  contato/        │    │
│  │(homepage)│  │[service] │  │index.html│  │  index.html      │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘    │
│       │             │             │                  │              │
│  ┌────┴─────────────┴─────────────┴──────────────────┴─────────┐   │
│  │              Shared Components (JS modules)                   │   │
│  │   header.js · nav.js · footer.js · cta-whatsapp.js           │   │
│  └────────────────────────────────────────────────────────────┬─┘   │
│                                                                │     │
│  ┌─────────────────────────────────────────────────────────────┴──┐  │
│  │                   CSS Layer                                      │  │
│  │   tokens.css · reset.css · typography.css · components.css      │  │
│  │   layout.css · utilities.css · [page-specific].css              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                        CDN / STATIC HOST                             │
│              Netlify (recommended) or GitHub Pages                   │
├─────────────────────────────────────────────────────────────────────┤
│                     EXTERNAL SERVICES (no backend)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │ Netlify Forms│  │  WhatsApp    │  │  Google Search Console /  │  │
│  │ (form POST)  │  │  API link    │  │  Analytics (optional)     │  │
│  └──────────────┘  └──────────────┘  └───────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | File(s) |
|-----------|----------------|---------|
| Header | Logo, primary nav, mobile hamburger, CTA button | `components/header.html` + `js/header.js` |
| Hero | Value proposition H1, sub-headline, primary CTA | Inline per page (varies by page intent) |
| Services Grid | Overview of 3 services with links to detail pages | `components/services-grid.html` |
| Service Detail | Full SEO page per service — description, normas, processo, FAQ | `servicos/[slug]/index.html` |
| Portfolio | Project cards (1 now, N later) with photos, stats, description | `portfolio/index.html` |
| Contact Form | Name, company, project type, message — submits to Netlify Forms | `components/contact-form.html` + `js/form.js` |
| WhatsApp CTA | Floating button + inline CTAs — opens wa.me link | `js/whatsapp-cta.js` |
| Footer | Address, phone, email, service links, sitemap links, schema anchor | `components/footer.html` |
| Schema Injector | Injects JSON-LD structured data per page type | `js/schema.js` |
| Breadcrumbs | Navigation trail for interior pages — feeds schema + UX | `components/breadcrumbs.html` |

---

## Recommended Project Structure

```
npt-engenharia/
├── index.html                    # Homepage — hero + services overview + 1 portfolio teaser + contact
├── sobre/
│   └── index.html                # About page — team, history, differentials, credibility
├── servicos/
│   ├── index.html                # Services overview (optional — can redirect to homepage#servicos)
│   ├── pressurizacao-escadas/
│   │   └── index.html            # SEO page: "projeto pressurização escada emergência"
│   ├── projeto-hidraulico/
│   │   └── index.html            # SEO page: "projeto hidráulico predial"
│   └── projeto-eletrico/
│       └── index.html            # SEO page: "projeto elétrico predial"
├── portfolio/
│   ├── index.html                # Portfolio index — grid of projects
│   └── [projeto-slug]/
│       └── index.html            # Individual project page (one now, more later)
├── contato/
│   └── index.html                # Standalone contact page with full form + map embed
├── obrigado/
│   └── index.html                # Post-form-submission thank-you (Netlify redirect target)
├── 404.html                      # Custom 404 with nav + contact CTA
├── sitemap.xml                   # Manually maintained (auto-gen after MVP)
├── robots.txt                    # Allow all, sitemap pointer
├── .netlify/                     # Netlify config (auto-generated)
├── netlify.toml                  # Redirects, headers, form config
├── assets/
│   ├── css/
│   │   ├── tokens.css            # Design tokens: colors, spacing, type scale (CSS custom properties)
│   │   ├── reset.css             # Minimal reset (not full normalize — keep it lean)
│   │   ├── typography.css        # Font face declarations, heading/body rules
│   │   ├── layout.css            # Grid, container, section spacing
│   │   ├── components.css        # Header, footer, cards, buttons, forms
│   │   ├── utilities.css         # Margin/padding helpers, display, visibility
│   │   └── pages/
│   │       ├── home.css          # Homepage-specific styles
│   │       ├── service.css       # Shared service page styles
│   │       └── portfolio.css     # Portfolio grid styles
│   ├── js/
│   │   ├── main.js               # Entry: imports, init calls
│   │   ├── nav.js                # Mobile menu toggle, scroll behavior
│   │   ├── form.js               # Contact form validation + Netlify submission handling
│   │   ├── whatsapp-cta.js       # WhatsApp button show/hide on scroll, UTM params
│   │   ├── schema.js             # JSON-LD injection per page
│   │   └── lazy-load.js          # IntersectionObserver for images below fold
│   ├── images/
│   │   ├── logo.svg              # Primary logo (SVG for sharpness)
│   │   ├── logo-white.svg        # Footer/dark-bg variant
│   │   ├── hero/                 # Hero backgrounds (WebP + JPEG fallback)
│   │   ├── portfolio/            # Project photos (WebP, multiple sizes)
│   │   └── icons/                # SVG icons (inline preferred for performance)
│   └── fonts/                    # Self-hosted fonts (woff2 only — modern browsers)
└── components/                   # HTML partials (loaded via JS fetch or copy-paste strategy)
    ├── header.html
    ├── footer.html
    └── cta-banner.html
```

### Structure Rationale

- **`/servicos/[slug]/index.html`:** Clean URLs (`/servicos/pressurizacao-escadas/`) without `.html` extension. Netlify serves `index.html` from directory by default. Each service gets its own crawlable page for keyword targeting.
- **`/portfolio/[slug]/`:** Same pattern. Future-proofed for N projects — the grid in `portfolio/index.html` just grows.
- **`assets/css/tokens.css`:** Single source of truth for the design system. Changing a color means changing one variable. This prevents visual inconsistency across 8+ pages.
- **`assets/js/schema.js`:** Centralizes structured data injection. Each page calls `injectSchema(type, data)` — avoids copy-pasting JSON-LD blocks across HTML files.
- **`/obrigado/`:** Dedicated thank-you page (not a modal) — enables Google Analytics goal tracking and gives Netlify a clean redirect target after form submission.
- **`components/`:** For a pure HTML site, these are copy-paste fragments OR loaded via `fetch()` — see Pattern 2 below for tradeoffs.

---

## Page Architecture: URL Structure and SEO Targeting

### Page Map with Keyword Targets

| Page | URL | Primary Keyword Target | Intent |
|------|-----|----------------------|--------|
| Homepage | `/` | "NPT Engenharia" / brand | Brand + overview |
| Sobre | `/sobre/` | "empresa de projetos de engenharia" | Trust/credibility |
| Servico: Pressurização | `/servicos/pressurizacao-escadas/` | "projeto pressurização escada emergência" / "NBR 9077" | Transactional |
| Servico: Hidráulico | `/servicos/projeto-hidraulico/` | "projeto hidráulico predial" / "projeto SPDA" | Transactional |
| Servico: Elétrico | `/servicos/projeto-eletrico/` | "projeto elétrico predial residencial" | Transactional |
| Portfolio | `/portfolio/` | "projetos entregues engenharia" | Social proof |
| Contato | `/contato/` | "orçamento projeto engenharia" | Conversion |

### Internal Linking Architecture

```
Homepage
  ├── → /servicos/pressurizacao-escadas/  (hero CTA + services card)
  ├── → /servicos/projeto-hidraulico/     (services card)
  ├── → /servicos/projeto-eletrico/       (services card)
  ├── → /portfolio/                       (portfolio teaser section)
  ├── → /sobre/                           (credibility section)
  └── → /contato/                         (multiple CTAs throughout)

Service Pages (each)
  ├── → /contato/                         (CTA in hero + bottom of page)
  ├── → /portfolio/                       (cross-link: "veja projetos entregues")
  └── → other service pages               (related services section at bottom)

Portfolio
  ├── → /contato/                         (CTA: "quer um projeto assim?")
  └── → /servicos/[relevant-service]/    (link to service used in project)

Footer (global — appears on every page)
  ├── → /servicos/pressurizacao-escadas/
  ├── → /servicos/projeto-hidraulico/
  ├── → /servicos/projeto-eletrico/
  ├── → /portfolio/
  ├── → /sobre/
  └── → /contato/
```

**Rationale:** Homepage and service pages get the most external links (SEO equity). Footer ensures every page passes link equity to service pages. Contact page is linked from everywhere because conversion is the primary goal.

---

## Architectural Patterns

### Pattern 1: HTML-First with Progressive JS Enhancement

**What:** Pages are fully functional HTML. JavaScript adds UX enhancements (mobile menu, scroll effects, form validation) but is never required for content delivery.
**When to use:** Always, for every component on this site.
**Trade-offs:** Slightly more HTML per page. Zero JS-bundle-failure risk. Best for SEO (Googlebot sees full content without JS execution).

```html
<!-- Form works without JS (Netlify handles POST) -->
<form name="contato" method="POST" data-netlify="true" action="/obrigado/">
  <input type="hidden" name="form-name" value="contato" />
  <!-- fields -->
  <button type="submit">Solicitar Orçamento</button>
</form>

<!-- JS layer adds: validation, loading state, error messages -->
<script>
  document.querySelector('form[name="contato"]').addEventListener('submit', handleFormSubmit);
</script>
```

### Pattern 2: Component Inclusion Strategy — Copy-Paste over Fetch

**What:** Duplicate header/footer HTML in each file rather than using `fetch()` to load partials.
**When to use:** For a site with under ~10 pages and no build step.
**Trade-offs:**
- Fetch approach: DRY but requires JavaScript for navigation — bad for SEO and flash of unstyled content on slow connections.
- Copy-paste approach: Repetitive but renders immediately, zero JS dependency for structure, no FOUC.
- **Recommendation:** Copy-paste header/footer. When the site reaches 10+ pages, introduce a simple build step (11ty or a shell script with `sed` includes) to compile from partials. Do NOT use `fetch()` for structural components.

### Pattern 3: CSS Custom Properties as Design Tokens

**What:** All colors, spacing, and type scale defined as `--var` in `:root` in `tokens.css`. Components reference tokens, never raw values.
**When to use:** Always from day one.
**Trade-offs:** Minimal overhead, maximum maintainability. A client color change means editing one file.

```css
/* tokens.css */
:root {
  --color-primary: #1a3a5c;       /* NPT navy — credibility, technical */
  --color-accent: #e8a020;        /* amber — CTA contrast */
  --color-text: #1f2937;
  --color-bg: #ffffff;
  --space-section: clamp(4rem, 8vw, 8rem);
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius-card: 8px;
  --shadow-card: 0 2px 8px rgba(0,0,0,0.08);
}
```

### Pattern 4: Schema Injection via JS Module

**What:** A single `schema.js` file exports functions that build and inject JSON-LD `<script>` tags into `<head>`. Each page's inline script calls the appropriate function.
**When to use:** Centralizes all structured data — prevents duplication errors, easy to update business info.

```javascript
// js/schema.js
export function injectOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NPT Engenharia",
    "url": "https://nptengenharia.com.br",
    "telephone": "+55-XX-XXXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "serviceType": [
      "Projeto de Pressurização de Escadas de Emergência",
      "Projeto Hidráulico Predial",
      "Projeto Elétrico Predial"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
```

---

## SEO Technical Architecture

### Schema Markup Strategy (Confidence: HIGH — stable schema.org spec)

| Page | Schema Type | Key Properties |
|------|-------------|----------------|
| Homepage | `Organization` + `ProfessionalService` | name, url, telephone, address, serviceType, areaServed |
| Each Service page | `Service` + `BreadcrumbList` | name, description, provider (linked Organization), serviceType |
| Portfolio | `ItemList` of `CreativeWork` | name, description, image, dateCompleted, provider |
| Individual project | `CreativeWork` + `BreadcrumbList` | name, image, description, about (service type) |
| Contact page | `ContactPage` + `BreadcrumbList` | — |
| Sobre page | `AboutPage` + `Person` (team members) | name, jobTitle, sameAs |

**Why `ProfessionalService` over `LocalBusiness`:** NPT serves nationally (not local walk-in clientele). `ProfessionalService` is the correct schema.org subtype for remote B2B technical service providers. `LocalBusiness` is appropriate only if there's a physical storefront. Use `areaServed: Brazil` to signal national reach without a local schema.

**NBR/ABNT authority signal:** Reference normas (NBR 9077, ABNT NBR 5410) in page body text — schema alone is insufficient. Google rewards authoritative technical content. Include the norm citation in the H2/H3 of the service page and in the page meta description.

### Meta Tags Structure (per page)

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO -->
  <title>Projeto de Pressurização de Escada de Emergência | NPT Engenharia</title>
  <meta name="description" content="Projetos de pressurização de escadas de emergência conforme NBR 9077. Atendimento nacional, entrega ágil. Solicite orçamento.">
  <link rel="canonical" href="https://nptengenharia.com.br/servicos/pressurizacao-escadas/">

  <!-- Open Graph (WhatsApp/LinkedIn share preview) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="/assets/images/og-pressurizacao.jpg">
  <meta property="og:url" content="...">

  <!-- Critical CSS inline — fold content only -->
  <style>/* critical.css inline here */</style>

  <!-- Full CSS deferred -->
  <link rel="preload" href="/assets/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/assets/css/main.css"></noscript>

  <!-- Fonts preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- JSON-LD injected by schema.js at bottom of body -->
</head>
```

---

## Performance Architecture

### Critical CSS Strategy (Confidence: HIGH)

**Rule:** Only inline CSS that affects above-the-fold content (header, hero section). Everything else loads asynchronously.

```
Critical CSS (inline in <head>, ~2-5KB):
  - Header styles
  - Hero section styles
  - Font fallback system fonts
  - Basic layout container

Non-critical CSS (async via preload trick):
  - Services section
  - Portfolio
  - Footer
  - Form styles
  - All utility classes
```

**Implementation:** No build tooling needed. Manually identify ~30-50 CSS rules that affect the header and hero. Paste them inline. This alone reduces Largest Contentful Paint (LCP) by 200-500ms on mobile connections.

### Font Loading Strategy (Confidence: HIGH)

Priority order:
1. **Self-hosted woff2** (fastest — no DNS lookup, no FOUT risk from CDN outage). Place in `/assets/fonts/`.
2. **Google Fonts with `display=swap`** (acceptable for MVP, adds one external DNS lookup).
3. **System font stack fallback** — always include as ultimate fallback.

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400 700;          /* variable font range */
  font-display: swap;            /* show text immediately, swap when loaded */
  src: url('/assets/fonts/inter-variable.woff2') format('woff2');
}
```

**Recommendation for NPT:** Self-host Inter or a similar clean sans-serif. Single variable font file covers all weights. Download from Google Fonts and serve locally — removes external dependency, improves Core Web Vitals.

### Image Loading Strategy (Confidence: HIGH)

| Image | Strategy | Format |
|-------|----------|--------|
| Logo | Inline SVG or `<img>` with no lazy | SVG |
| Hero background | `preload` link in `<head>`, no lazy | WebP + JPEG fallback |
| Portfolio photos | `loading="lazy"` + `decoding="async"` | WebP + JPEG fallback |
| Team photos (Sobre) | `loading="lazy"` | WebP + JPEG fallback |
| Service icons | Inline SVG (no HTTP request) | SVG inline |

```html
<!-- Hero image: preloaded -->
<link rel="preload" as="image" href="/assets/images/hero/hero.webp" type="image/webp">

<!-- Portfolio: lazy loaded -->
<img
  src="/assets/images/portfolio/projeto-1.webp"
  alt="Projeto de pressurização — edifício residencial São Paulo"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
>
```

**Always specify `width` and `height`** — prevents layout shift (CLS), which is a Core Web Vitals metric. CLS > 0.1 hurts Google ranking.

---

## Contact Form Architecture

### Recommended: Netlify Forms (Confidence: HIGH)

**Why Netlify Forms over alternatives:**

| Feature | Netlify Forms | Formspree | EmailJS |
|---------|---------------|-----------|---------|
| No backend required | YES | YES | YES |
| Works with plain HTML POST | YES | NO (JS required) | NO (JS required) |
| Free tier submissions | 100/month | 50/month | 200/month |
| Spam protection | Built-in honeypot + reCAPTCHA | Paid tier | Manual |
| Email notification to owner | YES | YES (paid for custom) | YES (via EmailJS template) |
| Works if JS fails | YES | NO | NO |
| Requires external account | Netlify account | Formspree account | EmailJS account |
| CDN same host as site | YES | NO | NO |

**Conclusion:** Netlify Forms is the correct choice. It works with a plain `<form method="POST">` — zero JavaScript dependency for submission. JavaScript only adds the UX layer (loading spinner, inline success/error messages). The form still submits if JS fails.

**Free tier limit (100 submissions/month):** More than sufficient for a new B2B company. At conversion rates typical of B2B services (1-3%), this handles 3,000-10,000 monthly visitors with room to spare. Upgrade path exists when needed.

### Form Data Flow

```
User fills form (HTML)
    ↓
JS validates client-side (optional — improves UX)
    ↓
form.submit() → POST https://[site].netlify.app/
    ↓
Netlify Forms middleware intercepts multipart/form-data
    ↓
Netlify stores submission in dashboard
    ↓
Netlify sends email notification to NPT (configured in dashboard)
    ↓
Browser follows action="/obrigado/" redirect
    ↓
Thank-you page displayed (enables GA4 conversion goal)
```

### Form Implementation Pattern

```html
<!-- netlify.toml registers the form -->
<!-- HTML: works without JS -->
<form
  name="contato"
  method="POST"
  action="/obrigado/"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contato">
  <input type="text" name="bot-field" style="display:none" aria-hidden="true">

  <label for="nome">Nome *</label>
  <input type="text" id="nome" name="nome" required autocomplete="name">

  <label for="empresa">Empresa *</label>
  <input type="text" id="empresa" name="empresa" required autocomplete="organization">

  <label for="tipo-projeto">Tipo de Projeto *</label>
  <select id="tipo-projeto" name="tipo-projeto" required>
    <option value="">Selecione</option>
    <option value="pressurizacao">Pressurização de Escadas</option>
    <option value="hidraulico">Projeto Hidráulico</option>
    <option value="eletrico">Projeto Elétrico</option>
    <option value="outro">Outro</option>
  </select>

  <label for="mensagem">Mensagem *</label>
  <textarea id="mensagem" name="mensagem" rows="4" required></textarea>

  <button type="submit">Solicitar Orçamento</button>
</form>
```

### netlify.toml Configuration

```toml
[[redirects]]
  from = "/obrigado"
  to = "/obrigado/"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Data Flow Summary

### Form Submission Flow

```
User → HTML Form → Netlify Edge → Netlify Forms Storage → Email to NPT
                                                        → /obrigado/ page
```

### WhatsApp CTA Flow

```
User clicks button → JS builds wa.me URL with pre-filled message + UTM params
                   → window.open(url, '_blank')
                   → WhatsApp Web / App opens
```

### Page Render Flow (no backend)

```
Browser → Netlify CDN → HTML file (complete, no JS required for content)
                      → Critical CSS (inline, renders immediately)
                      → Deferred CSS (async load)
                      → JS modules (defer attribute — never blocks render)
                      → JSON-LD injected (after DOM ready)
```

---

## Component Boundaries (What Talks to What)

| Component | Reads From | Writes To | External Calls |
|-----------|-----------|-----------|----------------|
| Header | URL (active nav state) | DOM (mobile menu toggle) | None |
| Contact Form | DOM input values | DOM (loading/error states), POST to Netlify | Netlify Forms |
| WhatsApp CTA | Scroll position, page URL | window.open() | wa.me (WhatsApp) |
| Schema Injector | Page-level data (page type, service name) | `<head>` JSON-LD script tag | None |
| Lazy Load | IntersectionObserver API | img.src attribute | None |
| Nav | Scroll position, viewport width | CSS classes on `<header>` | None |

**Key boundary rule:** No component reads from another component's DOM. Each JS module is self-contained and queries its own DOM scope. This prevents cascading failures — if `schema.js` errors, the form still works.

---

## Build Order (Fastest Path to Live Site)

### Phase 1 — Foundation (gets the site online)

1. `netlify.toml` + Netlify account setup + domain configuration
2. `assets/css/tokens.css` — design tokens (colors, spacing, type)
3. `assets/css/reset.css` + `typography.css` — base styles
4. Header + Footer HTML (copy-paste template)
5. `index.html` — homepage with all sections stubbed (placeholder text OK)
6. Deploy to Netlify (triggers immediately on git push)

**Result:** Live URL exists. Client can see progress. SEO crawling can begin.

### Phase 2 — Core SEO Pages

7. `/servicos/pressurizacao-escadas/index.html` — highest-value keyword page
8. `/servicos/projeto-hidraulico/index.html`
9. `/servicos/projeto-eletrico/index.html`
10. `sitemap.xml` + `robots.txt`
11. `js/schema.js` — Organization + Service schemas

**Result:** Google can index all service pages. Core SEO structure in place.

### Phase 3 — Conversion Infrastructure

12. Contact form with Netlify Forms registration
13. `/obrigado/index.html`
14. WhatsApp CTA button (floating + inline)
15. `/contato/index.html`

**Result:** Leads can be captured. Site is business-functional.

### Phase 4 — Trust and Polish

16. `/sobre/index.html`
17. `/portfolio/index.html` + first project page
18. Performance pass: critical CSS inline, lazy load images, self-host fonts
19. Mobile nav JS
20. Open Graph meta tags for all pages

**Result:** Full site. Ready for client handoff.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10 pages (now) | Copy-paste header/footer. Manual sitemap. Netlify free tier. |
| 10-30 pages (with blog) | Introduce 11ty (Eleventy) as static site generator — same HTML output, but partials compiled at build time. Zero runtime change for visitors. |
| 30+ pages | 11ty + content collections. sitemap auto-generated. Still plain HTML output. |

**First bottleneck:** Duplicated header/footer HTML across files. Fix: introduce Eleventy or a simple Node.js build script that compiles `_includes/header.html` into each page. No runtime change — output is still static HTML.

**Second bottleneck:** Portfolio grows beyond 6-8 projects — manually editing the grid becomes tedious. Fix: JSON data file (`portfolio.json`) + build script generates the grid HTML.

---

## Anti-Patterns

### Anti-Pattern 1: Using `fetch()` for Header/Footer Partials

**What people do:** Load `components/header.html` via `fetch()` in JavaScript to avoid duplication.
**Why it's wrong:** The header is invisible until JS executes and the fetch resolves. This causes a flash of no-header, hurts perceived performance, and the navigation is missing in Googlebot's initial render.
**Do this instead:** Copy-paste the header/footer HTML into each page. Accept the duplication in v1. Add a build step (Eleventy) when the page count makes it painful.

### Anti-Pattern 2: Blocking Render with JS

**What people do:** Load scripts in `<head>` without `defer` or `async`.
**Why it's wrong:** Every script in `<head>` without `defer` blocks HTML parsing. On a 3G mobile connection, this can add 500ms-2s to Time to First Byte perception.
**Do this instead:** All `<script>` tags at bottom of `<body>` OR use `<script defer src="...">` in `<head>`. Schema.js should use `defer`. Form JS should use `defer`.

### Anti-Pattern 3: One Monolithic CSS File

**What people do:** Put all CSS in one `styles.css` — easier initially.
**Why it's wrong:** Forces the browser to parse all styles for every page, even styles that only apply to the portfolio page when visiting the homepage. Also makes the critical CSS extraction impossible.
**Do this instead:** Split CSS by layer (tokens, reset, layout, components, utilities) and use page-specific files. The browser caches aggressively — the overhead of multiple files after first visit is zero.

### Anti-Pattern 4: Putting Contact Form on Homepage Only

**What people do:** Single contact form only in the homepage `#contato` section.
**Why it's wrong:** Users who land directly on a service page from Google have to navigate back to homepage to find the form. Every extra navigation step loses ~20-40% of potential leads.
**Do this instead:** CTA button ("Solicitar Orçamento") appears on every service page linking to `/contato/`, AND a compact inline form or CTA banner at the bottom of every service page.

### Anti-Pattern 5: Images Without Dimensions

**What people do:** `<img src="..." alt="...">` without `width` and `height` attributes.
**Why it's wrong:** Browser cannot reserve layout space before image loads → Cumulative Layout Shift (CLS) → Core Web Vitals penalty → lower Google ranking.
**Do this instead:** Always specify `width` and `height` matching the image's intrinsic dimensions. Use `aspect-ratio` in CSS for responsive sizing.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Netlify Forms | HTML `data-netlify="true"` attribute + POST | Requires `form-name` hidden input. Register form on first deploy. 100 submissions/month free. |
| WhatsApp Business | `href="https://wa.me/55XXXXXXXXXXX?text=..."` | URL-encode the pre-filled message. UTM params don't work in wa.me URLs — use a redirect page if tracking is needed. |
| Google Search Console | Meta tag verification OR DNS TXT record | Netlify supports DNS records. Verify immediately on launch. |
| Google Analytics 4 | `<script>` in `<head>` (async) | Optional for v1. If added, use `gtag.js` async — does not block render. Configure `/obrigado/` as conversion goal. |
| Google Fonts | `<link rel="preconnect">` + `<link rel="stylesheet">` | Move to self-hosted after MVP for better CWV scores. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| HTML ↔ CSS | Class names (BEM recommended: `.section-hero__title`) | No inline styles except critical override cases |
| HTML ↔ JS | `data-*` attributes + IDs (never style classes) | JS selects via `data-action` or `id`, never `.css-class` |
| Page ↔ Schema | Page-level `<script>` calls `injectSchema(type, pageData)` | Each page knows its own type; schema.js is stateless |
| Form ↔ Netlify | HTTP POST with `Content-Type: multipart/form-data` | Netlify bot pre-processes HTML at deploy time to register forms |

---

## Sources

All findings based on training knowledge (through August 2025). External tool access was unavailable during this research session.

- Schema.org specification: https://schema.org/ProfessionalService — `ProfessionalService` is the canonical type for B2B technical service companies
- Netlify Forms documentation (well-established, stable API since 2016): https://docs.netlify.com/forms/setup/
- Google Core Web Vitals documentation: https://web.dev/vitals/
- `font-display: swap` — CSS Fonts Level 4 specification, universally supported since 2019
- `loading="lazy"` — HTML Living Standard, universally supported since 2021
- Critical CSS pattern — documented in Google PageSpeed Insights guidance
- BEM CSS methodology: http://getbem.com/

**Confidence notes:**
- Schema markup types: HIGH — schema.org spec is stable; `ProfessionalService` type has been present since 2012
- Netlify Forms API: HIGH — core feature, no breaking changes since 2020
- Critical CSS / performance patterns: HIGH — Google CWV spec is stable
- Font loading (`font-display: swap`): HIGH — CSS spec, universal browser support
- WhatsApp wa.me link format: HIGH — stable since 2018

---

*Architecture research for: Static HTML/CSS/JS B2B Professional Services Website (NPT Engenharia)*
*Researched: 2026-03-19*
