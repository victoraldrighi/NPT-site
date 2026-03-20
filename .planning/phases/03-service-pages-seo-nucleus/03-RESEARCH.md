# Phase 3: Service Pages & SEO Nucleus - Research

**Researched:** 2026-03-19
**Domain:** Technical SEO, Schema Markup, Multi-Page HTML/Vite, Service Page Content
**Confidence:** HIGH (most findings verified against official Google documentation and Vite docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- URLs: `/servicos/pressurizacao-escadas-emergencia/`, `/servicos/projetos-hidraulicos/`, `/servicos/projetos-eletricos/`
- Vite entry points: add 3 paths in `rollupOptions.input`
- Meta titles: exact strings defined per page (54, 57, 63 chars respectively — all under 60-char limit)
- Meta descriptions: exact strings defined per page (155, 152, 144 chars — within 144-160 window)
- Canonical tags on ALL pages including existing (index.html, sobre, obrigado)
- og:image: `public/og-image.png` at 1200x630px — same file for all pages
- Schema: ProfessionalService on home; Service + BreadcrumbList + FAQPage per service page
- FAQ: `<details>/<summary>` CSS-only, no JS library
- New CSS file: `src/css/components/service-page.css`
- Import it in `src/js/main.js`
- No hex colors — use `var()` tokens throughout
- No external schema libraries — JSON-LD inline in `<script type="application/ld+json">`
- Stack: HTML/CSS/JS + Vite 6.4.1, zero framework overhead
- Hosting: Netlify (canonical URL: `https://npt-site.netlify.app`)
- NBR norms per service are locked (see Normas por serviço in CONTEXT.md)
- H1/H2/H3 content structure with 6 sections per page is locked
- Breadcrumb: both HTML visual nav and BreadcrumbList JSON-LD schema per service page
- Nav: add 3 direct links to service pages (no dropdown) across all pages

### Claude's Discretion
- Exact wording of service page body copy (800-1200 words per service)
- Exact wording of FAQ questions and answers (3 per service page)
- Exact wording of NPT differentials section per service
- Visual implementation of the CSS-only FAQ accordion
- Breadcrumb visual styling

### Deferred Ideas (OUT OF SCOPE)
- sitemap.xml and robots.txt — Phase 5
- Google Search Console submission — v2 (ANLT-02)
- Hreflang (English version) — out of v1 scope
- Structured data for Reviews/Ratings — no reviews at launch
- Blog articles — v2 (BLOG-01 to BLOG-04)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-02 | Página de serviço — Pressurização de Escadas de Emergência (800-1200 palavras, referências NBR 9077 e IT 11 CBPMESP) | Content structure section, `<details>/<summary>` SEO findings |
| PAGE-03 | Página de serviço — Projetos Hidráulicos (800-1200 palavras, referências NBR 5626 e NBR 7198) | Content structure section, word count guidance |
| PAGE-04 | Página de serviço — Projetos Elétricos (800-1200 palavras, referências NBR 5410 e NBR 5419) | Content structure section, word count guidance |
| SEO-01 | URLs semânticas para todas as páginas | Vite multi-page entry points pattern |
| SEO-02 | Meta tags únicas por página (title, description, og:title, og:description, og:image) | Meta tag limits, og:image approach |
| SEO-05 | Schema markup JSON-LD — ProfessionalService na home, Service em cada página de serviço | Schema markup patterns, FAQPage status, BreadcrumbList pitfalls |
| SEO-06 | Canonical tags em todas as páginas | Canonical implementation best practice |
</phase_requirements>

---

## Summary

Phase 3 is the SEO foundation of the site. It creates three service pages at semantic URLs with 800-1200 words of technical content, applies complete on-page SEO (meta tags, canonical, og tags) to all existing and new pages, and adds JSON-LD structured data throughout.

The most important finding is that **FAQPage schema no longer generates rich results for non-government, non-health sites** (Google restricted this in August 2023 and the restriction remains active in 2026). However, the schema is still worth implementing for three reasons: AI answer engine visibility, structural clarity signals, and future re-eligibility. The `<details>/<summary>` element for the FAQ accordion is indexed by Google but may receive slightly less ranking weight than visible text — this is acceptable because FAQ content is supplementary, not primary.

BreadcrumbList schema has a critical 2025 status change: **Google removed breadcrumbs from mobile SERPs in January 2025** but kept them on desktop. They still improve CTR on desktop and site architecture signals. The visual breadcrumb nav must exactly match the JSON-LD markup to avoid inconsistency penalties.

The Vite multi-page setup for nested subdirectory paths follows the same `resolve()` pattern already established in `vite.config.js` — this is a low-risk, proven pattern.

**Primary recommendation:** Implement all schema types as specified, use `<details>/<summary>` for FAQ, and ensure the visible HTML breadcrumb exactly mirrors the JSON-LD BreadcrumbList. Keep primary keyword-rich content visible (not inside `<details>`), reserving FAQ Q&A for the accordion.

---

## Standard Stack

### Core (existing — no new installs needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | 6.4.1 (pinned) | Build tool, dev server, multi-page bundling | Pinned — do NOT upgrade (Vite 8 breaks rollupOptions API) |
| @fontsource/inter | 5.2.8 | Self-hosted Inter font | Already imported in main.js |

### No New npm Dependencies
Phase 3 requires zero new npm packages:
- Schema markup: inline JSON-LD (no library)
- FAQ accordion: native `<details>/<summary>` (no JS)
- og:image: static PNG pre-placed in `public/` (no build plugin)
- Canonical/og tags: plain HTML `<link>` and `<meta>` tags

**Version verification:** Confirmed via project's `package.json`. No additions needed.

---

## Architecture Patterns

### Recommended Project Structure (additions for Phase 3)
```
/
├── servicos/
│   ├── pressurizacao-escadas-emergencia/
│   │   └── index.html              # PAGE-02 — SEO-01
│   ├── projetos-hidraulicos/
│   │   └── index.html              # PAGE-03 — SEO-01
│   └── projetos-eletricos/
│       └── index.html              # PAGE-04 — SEO-01
├── public/
│   └── og-image.png                # 1200x630px — SEO-02
└── src/
    └── css/
        └── components/
            └── service-page.css    # New: service page layout + FAQ accordion
```

### Pattern 1: Vite Multi-Page Nested Entry Points (SEO-01)
**What:** Add 3 nested HTML entry points to `rollupOptions.input` in `vite.config.js`
**When to use:** Every new page added to the site

The existing pattern in `vite.config.js` already handles `sobre/index.html` and `obrigado/index.html`. The service pages follow the exact same pattern. Vite respects the file's resolved path for output, not the key name — `servicos/pressurizacao-escadas-emergencia/index.html` will be output as `dist/servicos/pressurizacao-escadas-emergencia/index.html`.

```javascript
// src: vite.dev/guide/build (official docs)
// vite.config.js — add to existing rollupOptions.input:
input: {
  main: resolve(__dirname, 'index.html'),
  sobre: resolve(__dirname, 'sobre/index.html'),
  obrigado: resolve(__dirname, 'obrigado/index.html'),
  // NEW for Phase 3:
  servicosPressurizacao: resolve(__dirname, 'servicos/pressurizacao-escadas-emergencia/index.html'),
  servicosHidraulica: resolve(__dirname, 'servicos/projetos-hidraulicos/index.html'),
  servicosEletrica: resolve(__dirname, 'servicos/projetos-eletricos/index.html'),
}
```

**Important:** The `servicos/pressurizacao-escadas-emergencia/` directory and `index.html` must physically exist before running `vite build`. Create directories first.

### Pattern 2: Service Page HTML Structure (PAGE-02/03/04)
**What:** Each service page replicates the site-wide header/footer from `index.html` and adds service-specific content
**When to use:** All three service pages

```html
<!-- Source: index.html established pattern -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- UNIQUE per page: -->
  <title>Pressurização de Escadas de Emergência | NPT Engenharia</title>
  <meta name="description" content="Projetos de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP. Aprovação na primeira vistoria. Atendimento nacional. Solicite orçamento." />
  <link rel="canonical" href="https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/" />
  <!-- og tags: -->
  <meta property="og:title" content="Pressurização de Escadas de Emergência | NPT Engenharia" />
  <meta property="og:description" content="Projetos de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP. Aprovação na primeira vistoria. Atendimento nacional. Solicite orçamento." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/" />
  <meta property="og:image" content="https://npt-site.netlify.app/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="NPT Engenharia" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <!-- JSON-LD schemas: Service + BreadcrumbList + FAQPage -->
  <script type="application/ld+json">{ ... }</script>
  <script type="application/ld+json">{ ... }</script>
  <script type="application/ld+json">{ ... }</script>
</head>
<body class="page-service page-pressurizacao">
  <!-- identical site-header as index.html — with nav updated to include service links -->
  <header>...</header>
  <main>
    <nav aria-label="Navegação estrutural" class="breadcrumb">
      <ol role="list">
        <li><a href="/">Home</a></li>
        <li aria-hidden="true">›</li>
        <li><span>Pressurização de Escadas de Emergência</span></li>
      </ol>
    </nav>
    <article class="service-article">
      <h1>Pressurização de Escadas de Emergência</h1>
      <!-- 6 sections per CONTEXT.md structure -->
    </article>
  </main>
  <footer>...</footer>
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

### Pattern 3: JSON-LD Schema — Multiple Scripts Per Page (SEO-05)
**What:** Use separate `<script type="application/ld+json">` tags for each schema type
**When to use:** Service pages (3 schemas each), home page (1 schema)

Google supports multiple JSON-LD blocks per page. Separating Service, BreadcrumbList, and FAQPage schemas into three distinct `<script>` tags is the correct approach — it avoids @graph complexity and is easier to validate individually in the Rich Results Test.

```html
<!-- Source: developers.google.com/search/docs/appearance/structured-data/intro-structured-data -->
<!-- Schema 1: Service -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pressurização de Escadas de Emergência",
  "description": "Projeto técnico de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "NPT Engenharia",
    "url": "https://npt-site.netlify.app"
  },
  "areaServed": {"@type": "Country", "name": "Brasil"},
  "serviceType": "Engenharia de Segurança Predial"
}
</script>

<!-- Schema 2: BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://npt-site.netlify.app/"},
    {"@type": "ListItem", "position": 2, "name": "Serviços", "item": "https://npt-site.netlify.app/servicos/"},
    {"@type": "ListItem", "position": 3, "name": "Pressurização de Escadas de Emergência"}
  ]
}
</script>

<!-- Schema 3: FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quando a pressurização de escada é obrigatória?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A pressurização é obrigatória em edificações com altura superior a 12 metros (acima do pavimento de descarga), conforme a NBR 9077 e a IT 11 do CBPMESP. Inclui edifícios residenciais, comerciais e de uso misto que possuam escadas enclausuradas."
      }
    }
  ]
}
</script>
```

### Pattern 4: BreadcrumbList — Critical Property Rules (SEO-05)
**What:** BreadcrumbList `ListItem` requirements from Google official docs
**Critical rules (verified at developers.google.com/search/docs/appearance/structured-data/breadcrumb):**

1. `position` must start at 1 and be sequential integers — no gaps
2. `name` is required for every item
3. `item` (URL) is required for all items EXCEPT the final (current page) item — omit it for the last ListItem
4. Use absolute URLs including protocol (`https://`) for all `item` values
5. The visible breadcrumb HTML must match the schema exactly — inconsistencies can prevent Google from displaying breadcrumbs
6. Minimum 2 items required in `itemListElement`

**Status change (January 2025):** Google removed breadcrumbs from mobile SERPs. They still display on desktop. Visual breadcrumb nav still provides UX value on both.

### Pattern 5: FAQ with `<details>/<summary>` (PAGE-02/03/04)
**What:** Native HTML accordion for FAQ — no JS, accessible, CLS-safe
**When to use:** The "Perguntas frequentes" section of each service page

```html
<!-- Source: MDN Web Docs — details element -->
<section class="service-faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Perguntas frequentes</h2>

  <details class="faq-item">
    <summary class="faq-item__question">Quando a pressurização de escada é obrigatória?</summary>
    <div class="faq-item__answer">
      <p>A pressurização é obrigatória em edificações com altura superior a 12 metros...</p>
    </div>
  </details>

  <details class="faq-item">
    <summary class="faq-item__question">Qual norma rege a pressurização de escadas?</summary>
    <div class="faq-item__answer">
      <p>A NBR 9077 da ABNT estabelece os requisitos...</p>
    </div>
  </details>
</details>
```

**SEO impact of `<details>`:** Google indexes content inside closed `<details>` elements. John Mueller (2020) confirmed hidden-for-UX content is fully indexed. However, some practitioner tests suggest visible content may receive marginally higher ranking weight. Since FAQ content is supplementary (not the primary keyword-dense content), using `<details>` is fine — the H1 through H2 sections before it carry the main ranking signals.

### Pattern 6: og:image — Static PNG in `public/` (SEO-02)
**What:** Pre-made 1200x630px PNG placed in `public/og-image.png` — served by Netlify as a static asset
**Why static:** Zero build complexity, zero CDN dependency, Vite copies `public/` directory verbatim to `dist/`

**Creation approach (no external tools required):**
Create an SVG file describing the OG card, then convert to PNG using browser devtools or any free online converter (svgtopng.com). Alternatively, create a simple HTML page that renders the card at 1200x630, screenshot at 1x, save as PNG.

**og:image best practices:**
- Dimensions: exactly 1200x630px
- Include `<meta property="og:image:width" content="1200">` and `<meta property="og:image:height" content="630">` on every page
- Use same file (`/og-image.png`) for all pages in Phase 3 — per-service images are a v2 enhancement
- WhatsApp and LinkedIn (key B2B sharing channels) both support 1200x630 OG images

### Pattern 7: Canonical Tags — Self-Referencing (SEO-06)
**What:** Every page includes `<link rel="canonical" href="[absolute-URL]">` pointing to itself
**Why:** Even on pages with unique content, self-referencing canonicals are best practice (confirmed by Google Search Central) — they prevent parameter-appended URLs from diluting link equity

```html
<!-- Source: developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls -->
<!-- Home: -->
<link rel="canonical" href="https://npt-site.netlify.app/" />
<!-- Sobre: -->
<link rel="canonical" href="https://npt-site.netlify.app/sobre/" />
<!-- Obrigado: -->
<link rel="canonical" href="https://npt-site.netlify.app/obrigado/" />
<!-- Service pages: exact strings from CONTEXT.md -->
<link rel="canonical" href="https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/" />
<link rel="canonical" href="https://npt-site.netlify.app/servicos/projetos-hidraulicos/" />
<link rel="canonical" href="https://npt-site.netlify.app/servicos/projetos-eletricos/" />
```

**Never:** Two `<link rel="canonical">` tags on the same page. Always one, always absolute URL.

### Pattern 8: Adding og tags and canonical to existing pages (SEO-02, SEO-06)
Three existing pages need updates in this phase:
- `index.html` — add canonical, og tags, ProfessionalService JSON-LD, update 3 service card `href="#"` to real URLs, add 3 service page nav links
- `sobre/index.html` — add canonical, og tags
- `obrigado/index.html` — add canonical, og tags

### Anti-Patterns to Avoid

- **Two canonical tags on one page:** If CMS or template adds one and you add another, Google ignores both. Audit the `<head>` of every page to confirm exactly one `<link rel="canonical">`.
- **Final BreadcrumbList item has `item` URL:** Google's official docs say omit the `item` property on the last ListItem (current page). Including it is not strictly wrong but is explicitly "not recommended."
- **og:image relative URL:** Must be absolute (`https://npt-site.netlify.app/og-image.png`), not `/og-image.png`. WhatsApp and LinkedIn crawlers may not resolve relative URLs.
- **Schema `item` URLs without trailing slash:** Match your canonical URLs exactly. If canonical ends in `/`, schema `item` must also end in `/`.
- **Putting keyword-dense content inside `<details>`:** Core content (H2 sections on "Quando é obrigatório", "Especificações técnicas") must be visible on load. FAQ Q&A inside `<details>` is acceptable.
- **Forgetting the `servicos/` intermediate directory in BreadcrumbList:** Include it as position 2 even though there is no actual `/servicos/` index page — this is standard practice and Google accepts it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema generation | Custom schema builder / JavaScript generator | Inline JSON-LD in `<script>` tags | No runtime dependency, validates in Rich Results Test, crawlable without JS |
| FAQ accordion | JavaScript toggle + ARIA state management | `<details>/<summary>` HTML | Native browser support, accessible without JS, no CLS, no hydration overhead |
| og:image | Server-side generation, Cloudinary, Satori at build time | Static PNG in `public/` | Zero complexity, works on Netlify free tier, 1200x630 PNG is sufficient for Phase 3 |
| Font for og:image text | Google Fonts in canvas | Navy rectangle + white text using system font in SVG/canvas | Zero CDN, zero licensing complexity |

**Key insight:** All SEO primitives in this phase — schema, canonical, og tags, breadcrumbs — are plain HTML/JSON. The moment you introduce a library to "help" generate them, you add a dependency that must be maintained and a failure mode. Plain static HTML never has a runtime error.

---

## Common Pitfalls

### Pitfall 1: FAQPage Schema — Expecting Rich Results
**What goes wrong:** Developer adds FAQPage schema expecting Google to show expandable FAQ cards in search results.
**Why it happens:** Pre-August 2023 behavior is widely documented and referenced in tutorials.
**How to avoid:** Implement FAQPage schema as specified in CONTEXT.md, but document in a code comment that rich results are currently restricted to government/health sites. The value is AI answer engine visibility (ChatGPT, Perplexity, AI Overviews), not traditional rich results.
**Warning signs:** Google Search Console shows FAQPage schema detected but "Not eligible for rich results." This is expected — not a bug.

### Pitfall 2: BreadcrumbList — Mobile SERP Invisibility
**What goes wrong:** Team invests time on breadcrumb schema expecting to see breadcrumb trails in all Google results.
**Why it happens:** Most tutorials predate January 2025 Google change.
**How to avoid:** Implement as specified (high SEO value remains for desktop, site architecture signals, CTR on desktop). Do not skip implementation — value is still real. Just do not measure success by mobile SERP appearance.

### Pitfall 3: HTML Breadcrumb Doesn't Match JSON-LD
**What goes wrong:** Visual breadcrumb shows "Serviços > Pressurização" but JSON-LD has different names or URLs.
**Why it happens:** HTML and schema are edited separately and drift.
**How to avoid:** Write the visual breadcrumb HTML and the JSON-LD BreadcrumbList side-by-side in the same `<head>` section. The `name` in each ListItem must match exactly what the visible breadcrumb displays.
**Warning signs:** Google Search Console "Breadcrumb" report shows inconsistency warnings.

### Pitfall 4: Vite Multi-Page — Directory Not Created Before Build
**What goes wrong:** `vite build` throws "Entry file not found" for new service pages.
**Why it happens:** `rollupOptions.input` path is added to config but the physical directory and `index.html` file do not exist.
**How to avoid:** Create directory and empty `index.html` before adding to vite.config.js, or create both in the same implementation step. The order is: create dir → create HTML → update config.

### Pitfall 5: Canonical URL Trailing Slash Inconsistency
**What goes wrong:** Canonical is `https://npt-site.netlify.app/servicos/projetos-hidraulicos` (no trailing slash) but Netlify serves the page at `/servicos/projetos-hidraulicos/` (with trailing slash).
**Why it happens:** Developer forgets trailing slash on directory-style URLs.
**How to avoid:** Directory-style URLs (index.html inside a folder) always use trailing-slash canonical. Netlify's default behavior is to redirect without-slash to with-slash — the canonical must match the served URL.
**Exact values:** All service page canonicals must end with `/` per CONTEXT.md.

### Pitfall 6: og:image Without Absolute URL
**What goes wrong:** Social media (WhatsApp, LinkedIn) shows no preview image.
**Why it happens:** `content="/og-image.png"` is a relative path — crawlers that don't load the page's base URL cannot resolve it.
**How to avoid:** Always `content="https://npt-site.netlify.app/og-image.png"`.

### Pitfall 7: Meta Description Exceeding 160 Characters
**What goes wrong:** Google truncates the description mid-sentence, creating a poor SERP snippet.
**Why it happens:** Accidentally copying a longer string.
**How to avoid:** The CONTEXT.md strings are already verified (155, 152, 144 chars). Do not modify them. If any description is lengthened during copy editing, count characters before committing.

### Pitfall 8: Service Card Links Still Point to `#` After Phase 3
**What goes wrong:** Homepage service cards still have `href="#"` after service pages are built.
**Why it happens:** Developer focuses on new service page files and forgets to update `index.html`.
**How to avoid:** Include `index.html` updates (3 href changes + 3 nav links) as an explicit task in the plan.

---

## Code Examples

Verified patterns from official sources and established project patterns:

### Complete Head Block for Service Page (Pressurização)
```html
<!-- Based on: CONTEXT.md locked decisions + Google Search Central docs -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pressurização de Escadas de Emergência | NPT Engenharia</title>
  <meta name="description" content="Projetos de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP. Aprovação na primeira vistoria. Atendimento nacional. Solicite orçamento." />
  <link rel="canonical" href="https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/" />
  <meta property="og:title" content="Pressurização de Escadas de Emergência | NPT Engenharia" />
  <meta property="og:description" content="Projetos de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP. Aprovação na primeira vistoria. Atendimento nacional. Solicite orçamento." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/" />
  <meta property="og:image" content="https://npt-site.netlify.app/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="NPT Engenharia" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pressurização de Escadas de Emergência",
    "description": "Projeto técnico de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP.",
    "provider": {"@type": "ProfessionalService", "name": "NPT Engenharia", "url": "https://npt-site.netlify.app"},
    "areaServed": {"@type": "Country", "name": "Brasil"},
    "serviceType": "Engenharia de Segurança Predial"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://npt-site.netlify.app/"},
      {"@type": "ListItem", "position": 2, "name": "Serviços", "item": "https://npt-site.netlify.app/servicos/"},
      {"@type": "ListItem", "position": 3, "name": "Pressurização de Escadas de Emergência"}
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "[Question 1 text]",
        "acceptedAnswer": {"@type": "Answer", "text": "[Answer 1 text]"}
      },
      {
        "@type": "Question",
        "name": "[Question 2 text]",
        "acceptedAnswer": {"@type": "Answer", "text": "[Answer 2 text]"}
      },
      {
        "@type": "Question",
        "name": "[Question 3 text]",
        "acceptedAnswer": {"@type": "Answer", "text": "[Answer 3 text]"}
      }
    ]
  }
  </script>
</head>
```

### CSS-Only FAQ Accordion (service-page.css)
```css
/* Source: established project patterns — mobile-first, var() tokens only */
.faq-item {
  border-bottom: 1px solid var(--color-bg-page);
  margin-bottom: var(--space-2);
}

.faq-item summary {
  cursor: pointer;
  list-style: none; /* removes default triangle in some browsers */
  padding: var(--space-4) 0;
  font-weight: var(--font-weight-semibold);
  color: var(--color-brand-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Remove default marker */
.faq-item summary::-webkit-details-marker { display: none; }

/* Custom indicator */
.faq-item summary::after {
  content: '+';
  font-size: var(--font-size-xl);
  color: var(--color-brand-accent);
  transition: transform var(--transition-base);
}

.faq-item[open] summary::after {
  content: '−';
}

.faq-item__answer {
  padding: 0 0 var(--space-4);
  color: var(--color-text-body);
  line-height: var(--line-height-body);
}
```

### Vite Config — Updated with Service Page Entry Points
```javascript
// Source: vite.dev/guide/build — verified against existing vite.config.js pattern
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre/index.html'),
        obrigado: resolve(__dirname, 'obrigado/index.html'),
        servicosPressurizacao: resolve(__dirname, 'servicos/pressurizacao-escadas-emergencia/index.html'),
        servicosHidraulica: resolve(__dirname, 'servicos/projetos-hidraulicos/index.html'),
        servicosEletrica: resolve(__dirname, 'servicos/projetos-eletricos/index.html'),
      },
    },
  },
})
```

### Service Page Content Structure (800-1200 words target)
Word count guidance per section (from CONTEXT.md):
- H1 + intro paragraph: ~170 words
- H2 "Quando é obrigatório" + NBR citation: ~150 words
- H2 "Como desenvolvemos o projeto": ~200 words
- H2 "Especificações técnicas" (list or table): ~150 words
- H2 "Por que escolher a NPT Engenharia": ~150 words
- H2 "Perguntas frequentes" (3 Q&A): ~200 words
- CTA section text: ~30 words
- Total: ~1050 words (within 800-1200 target)

NBR citations must be exact per service:
- Pressurização: "NBR 9077" + "IT 11 do CBPMESP" (not "Instrução Técnica 11" — use full form on first mention, abbreviation after)
- Hidráulica: "NBR 5626" + "NBR 8160" + "NBR 7198"
- Elétrica: "NBR 5410" + "NBR 5419"

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FAQPage schema shows accordion rich results in SERPs | Restricted to government/health sites only | August 2023 | No visual SERP impact, but AI engine value remains |
| Breadcrumb trail visible on mobile SERPs | Desktop only | January 2025 | Mobile CTR benefit gone; implement anyway for desktop |
| JS-powered FAQ accordions (Bootstrap, custom) | Native `<details>/<summary>` | Progressive since ~2020 | Zero JS, native a11y, no CLS |
| og:image relative paths sometimes worked | Always use absolute URLs | Ongoing | Social crawlers require absolute URLs |

**Current best practice on ProfessionalService vs Organization schema:**
Google docs recommend using the most specific `@type` that fits. `ProfessionalService` is a valid schema.org type (subtype of LocalBusiness) even though it's marked as "deprecated" on schema.org itself — Google still documents it and NPT's CONTEXT.md has locked it in. For this project, use `ProfessionalService` as specified.

---

## Open Questions

1. **`/servicos/` intermediate page**
   - What we know: BreadcrumbList position 2 references `https://npt-site.netlify.app/servicos/` — but there is no `servicos/index.html` in the project.
   - What's unclear: Does the absence of an actual `/servicos/` page matter for BreadcrumbList? Google docs do not require the intermediary URL to return a 200 — the schema is about hierarchy, not URL existence.
   - Recommendation: Include the `/servicos/` item in BreadcrumbList as specified in CONTEXT.md. Google accepts intermediate items that are logical ancestors even if no page exists at that URL. No action needed — this is a non-issue per official docs.

2. **og:image creation method**
   - What we know: A static PNG must be placed at `public/og-image.png` before deployment.
   - What's unclear: Who creates it and when in the implementation flow.
   - Recommendation: Planner should include a Wave 0 task to create the og:image PNG. The simplest approach that requires no external tools: write an HTML file with a 1200x630 div styled navy with "NPT Engenharia" text, open in browser at 100% zoom, screenshot exactly 1200x630px. Alternatively, use any free online SVG-to-PNG converter. No build step needed — just a one-time asset creation.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — this is a static HTML/CSS/JS site with no test runner |
| Config file | none |
| Quick run command | `vite build` (verifies Vite entry points resolve) |
| Full suite command | Manual: open each URL in browser + Google Rich Results Test |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | Service pages return 200 at semantic URLs | smoke | `vite build && vite preview` then `curl -o /dev/null -s -w "%{http_code}" http://localhost:4173/servicos/pressurizacao-escadas-emergencia/` | ❌ Wave 0 (pages must be created) |
| SEO-01 | All 3 service URLs accessible | smoke | curl each URL after `vite preview` | ❌ Wave 0 |
| SEO-02 | Each page has unique meta title | grep | `grep -r "<title>" servicos/` | ❌ Wave 0 |
| SEO-02 | Each page has meta description | grep | `grep -r "name=\"description\"" servicos/` | ❌ Wave 0 |
| SEO-02 | og:image uses absolute URL | grep | `grep -r "og:image" index.html servicos/` | ❌ Wave 0 |
| SEO-05 | Service schema present on each service page | grep | `grep -r "application/ld+json" servicos/` | ❌ Wave 0 |
| SEO-05 | ProfessionalService schema on home | grep | `grep "ProfessionalService" index.html` | ❌ Wave 0 |
| SEO-05 | Rich Results Test passes (manual) | manual | https://search.google.com/test/rich-results | N/A |
| SEO-06 | Canonical tag present on all pages | grep | `grep -r "rel=\"canonical\"" index.html sobre/ obrigado/ servicos/` | ❌ Wave 0 |
| PAGE-02 | 800+ words on pressurização page | manual/wc | `wc -w < <(grep -v '<[^>]*>' servicos/pressurizacao-escadas-emergencia/index.html)` | ❌ Wave 0 |
| PAGE-03 | 800+ words on hidráulica page | manual/wc | `wc -w < <(grep -v '<[^>]*>' servicos/projetos-hidraulicos/index.html)` | ❌ Wave 0 |
| PAGE-04 | 800+ words on elétrica page | manual/wc | `wc -w < <(grep -v '<[^>]*>' servicos/projetos-eletricos/index.html)` | ❌ Wave 0 |

**Note:** `wc -w` with HTML stripping is an approximation — strip tags with `sed 's/<[^>]*>//g'` for more accuracy. The count will include some HTML attribute text; aim for 900+ raw count to ensure the rendered word count is 800+.

### Sampling Rate
- **Per task commit:** `vite build` (confirms all entry points resolve)
- **Per wave merge:** `vite build && vite preview` + curl each service URL for 200 status + grep canonical/og/schema tags
- **Phase gate:** Google Rich Results Test on each service page + home page before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `servicos/pressurizacao-escadas-emergencia/index.html` — PAGE-02, SEO-01, SEO-02, SEO-05, SEO-06
- [ ] `servicos/projetos-hidraulicos/index.html` — PAGE-03, SEO-01, SEO-02, SEO-05, SEO-06
- [ ] `servicos/projetos-eletricos/index.html` — PAGE-04, SEO-01, SEO-02, SEO-05, SEO-06
- [ ] `src/css/components/service-page.css` — layout for service pages and FAQ accordion
- [ ] `public/og-image.png` — 1200x630px static asset (SEO-02)
- [ ] Update `vite.config.js` with 3 new entry points (SEO-01)
- [ ] Update `index.html` — add canonical, og tags, ProfessionalService schema, update href on 3 service cards, add 3 nav links (SEO-02, SEO-05, SEO-06)
- [ ] Update `sobre/index.html` — add canonical, og tags (SEO-02, SEO-06)
- [ ] Update `obrigado/index.html` — add canonical, og tags (SEO-02, SEO-06)
- [ ] Add `import './css/components/service-page.css'` to `src/js/main.js`

---

## Sources

### Primary (HIGH confidence)
- `developers.google.com/search/docs/appearance/structured-data/breadcrumb` — BreadcrumbList required properties, current SERP status (desktop only post Jan 2025)
- `developers.google.com/search/docs/appearance/structured-data/faqpage` — FAQPage current status (government/health only), required properties
- `vite.dev/guide/build` — multi-page app rollupOptions.input pattern, nested HTML entry points
- Project files (`vite.config.js`, `index.html`, `src/css/tokens.css`, `src/js/main.js`) — established patterns for replication

### Secondary (MEDIUM confidence)
- `searchengineland.com/canonicalization-seo-448161` — self-referencing canonical best practice 2026
- `developers.google.com/search/blog/2023/08/howto-faq-changes` — official Google announcement on FAQ/HowTo restriction (August 2023)
- `fullstackoptimization.com/a/breadcrumbs-change-google-2025` — January 2025 mobile breadcrumb removal
- `schema.org/ProfessionalService` — type definition and properties

### Tertiary (LOW confidence — informational only)
- Multiple SEO blogs on accordion/hidden content SEO impact — consistent but not official-source verified

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — existing project stack, no new dependencies
- Vite multi-page pattern: HIGH — verified against official Vite docs and existing vite.config.js
- Schema markup patterns: HIGH — verified against Google Search Central docs
- FAQPage rich results status: HIGH — confirmed via official Google docs (restriction is real and current)
- BreadcrumbList mobile removal: HIGH — confirmed via official docs and credible secondary sources
- `<details>/<summary>` SEO indexing: MEDIUM — Google's official statement is "indexed equally," practitioner tests show slight visible-content advantage; using it for supplementary FAQ content is safe
- Content word count guidance: MEDIUM — no official Google guidance on specific word counts; 800-1200 range aligns with B2B technical page best practices from credible sources
- og:image creation approach: HIGH — static PNG in `public/` is the established Vite/Netlify pattern

**Research date:** 2026-03-19
**Valid until:** 2026-06-19 (90 days — SEO best practices stable; schema.org types change slowly)
