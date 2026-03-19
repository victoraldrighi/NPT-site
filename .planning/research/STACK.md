# Stack Research

**Domain:** Institutional B2B website — HTML/CSS/JS only, no framework, no CMS
**Project:** NPT Engenharia — Site Institucional
**Researched:** 2026-03-19
**Confidence:** MEDIUM-HIGH (training data through Aug 2025 + Netlify official docs verified)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vite | 6.x | Build tool, dev server, asset bundler | Fastest HMR in class; native ESM; built-in HTML entry point support; minifies CSS/JS/HTML out of the box; zero config for vanilla HTML projects; industry standard as of 2024-2025 |
| Vanilla HTML5 | — | Page structure, semantic markup, SEO | No abstraction overhead; search engines parse HTML directly; fastest possible TTFB; full control over every tag for schema/meta |
| CSS3 with Custom Properties | — | Styling, responsive design, theming | CSS custom properties (variables) replace the need for Sass/Less for this project size; `container queries` and `has()` selector cover modern layout needs natively |
| Vanilla ES2022+ JS | — | Interactivity, form handling, scroll effects | Modules (`type="module"`), `fetch`, `IntersectionObserver`, `FormData` are all native; no polyfills needed for 2025 browser baseline |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Swiper | 11.x | Touch-friendly portfolio slider / carousel | Use if portfolio section needs carousel; zero-dependency, tree-shakeable, 60fps CSS-based transitions |
| Lenis | 1.x | Smooth scroll | Use for premium scroll feel on hero/section transitions; very lightweight (~3 KB gzipped); replaces heavy scroll libraries |
| lite-youtube-embed | 0.3.x | YouTube embed without iframe performance hit | Only if video content is added; defers full YouTube load until user clicks; prevents CLS from iframes |
| AOS (Animate on Scroll) | 3.x | Scroll-triggered entry animations | Optional; use sparingly for section reveals; IntersectionObserver-based, CSS-driven animations |

**Note on AOS:** AOS is a valid choice but can be replaced entirely with 15 lines of vanilla JS + CSS if keeping dependencies minimal is a priority. For this project, custom IntersectionObserver implementation is preferred over AOS to eliminate the dependency.

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vite | Dev server + production build | `vite` command starts dev server with HMR; `vite build` outputs to `dist/` with hashed assets |
| vite-plugin-html | HTML template processing, meta injection | Allows variables in HTML templates (useful for meta tags across pages); install as dev dep |
| Prettier | Code formatting | Enforce consistent HTML/CSS/JS formatting; use `.prettierrc` with `printWidth: 100`, `tabWidth: 2` |
| Stylelint | CSS linting | Catches CSS property ordering issues, deprecated features; use `stylelint-config-standard` |
| sharp / imagemin | Image optimization | Run as a one-time script or npm script; convert hero/portfolio images to WebP; crucial for LCP score |
| Lighthouse CI | Performance auditing | Run locally before deploy; enforce LCP < 2.5s, CLS < 0.1, INP < 200ms thresholds |

---

## Build Configuration (Vite)

For a multi-page vanilla HTML site (home + service pages + contact), Vite's multi-page app config is the correct approach:

```javascript
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:          resolve(__dirname, 'index.html'),
        pressurizacao: resolve(__dirname, 'pressurizacao/index.html'),
        hidraulica:    resolve(__dirname, 'hidraulica/index.html'),
        eletrica:      resolve(__dirname, 'eletrica/index.html'),
        portfolio:     resolve(__dirname, 'portfolio/index.html'),
        sobre:         resolve(__dirname, 'sobre/index.html'),
        contato:       resolve(__dirname, 'contato/index.html'),
      }
    }
  }
})
```

Each page gets its own HTML file — no client-side routing needed. This is the correct pattern for SEO: each URL is a real HTML file with its own `<title>`, `<meta description>`, and schema markup.

---

## CSS Methodology

**Recommendation: Vanilla CSS with Custom Properties + BEM naming.**

Do NOT use Tailwind CDN (explained below). Do NOT use Sass — not needed for a project of this size.

```css
/* Design tokens as CSS custom properties */
:root {
  --color-primary:    #1B3A6B;   /* NPT navy — engineering credibility */
  --color-accent:     #F5A623;   /* amber — CTAs, highlights */
  --color-surface:    #F8F9FA;
  --color-text:       #1A1A2E;
  --font-heading:     'Inter', sans-serif;
  --font-body:        'Inter', sans-serif;
  --space-section:    clamp(4rem, 8vw, 8rem);
  --border-radius:    8px;
  --shadow-card:      0 2px 12px rgba(0,0,0,.08);
}
```

This approach:
- Generates zero unused CSS (Tailwind CDN ships 3+ MB of styles)
- Custom properties cascade correctly for responsive overrides
- BEM class names make HTML readable and debuggable without DevTools
- No build step required for CSS (Vite handles it natively)

---

## Form Handling (Static Site)

**Recommendation: Netlify Forms (free tier, no backend needed)**

Netlify Forms is the correct choice for this project because:
1. Zero backend code required — Netlify intercepts form POSTs at the CDN edge
2. Free tier covers ~100 submissions/month (more than sufficient for a new engineering firm)
3. Email notifications built in — client gets notified on each submission
4. Works without JavaScript (pure HTML form POST) — but AJAX submission improves UX

**Implementation pattern:**

```html
<!-- HTML form — Netlify detects `netlify` attribute at build time -->
<form
  name="orcamento"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  action="/obrigado/"
>
  <input type="hidden" name="form-name" value="orcamento" />
  <p class="visually-hidden">
    <label>Não preencha: <input name="bot-field" /></label>
  </p>
  <input type="text"   name="nome"    required placeholder="Seu nome" />
  <input type="text"   name="empresa" required placeholder="Empresa" />
  <input type="email"  name="email"   required placeholder="E-mail" />
  <select name="tipo-projeto" required>
    <option value="">Tipo de projeto</option>
    <option value="pressurizacao">Pressurização de escada</option>
    <option value="hidraulica">Projeto hidráulico</option>
    <option value="eletrica">Projeto elétrico</option>
  </select>
  <textarea name="mensagem" rows="4" placeholder="Descreva seu projeto"></textarea>
  <button type="submit">Solicitar orçamento</button>
</form>
```

**AJAX submission (recommended for better UX — no page reload):**

```javascript
document.querySelector('form[name="orcamento"]').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    // Show success state inline
    e.target.innerHTML = '<p class="form-success">Mensagem enviada! Retornaremos em até 24h.</p>'
  } catch {
    alert('Erro ao enviar. Tente pelo WhatsApp.')
  }
})
```

**Important:** The `netlify-honeypot` field prevents spam without reCAPTCHA friction. Do not add reCAPTCHA v2 — it adds 200ms+ load time and degrades conversion rate.

---

## Deployment

**Recommendation: Netlify (primary) or Cloudflare Pages (alternative)**

| Platform | Free Tier | CDN | Build Integration | Custom Domain | HTTPS |
|----------|-----------|-----|-------------------|---------------|-------|
| Netlify | 100 GB bandwidth/mo, 300 build min/mo | Global CDN | Git push auto-deploy | Yes (free) | Yes (auto) |
| Cloudflare Pages | Unlimited bandwidth, 500 builds/mo | Best-in-class CDN | Git push auto-deploy | Yes (free) | Yes (auto) |
| GitHub Pages | 100 GB bandwidth/mo | GitHub CDN | GitHub Actions | Yes (free) | Yes (auto) |

**Choose Netlify** for this project because:
- Forms integration is seamless (zero extra service)
- Deploy previews for every branch (useful for client review)
- Netlify Analytics available if needed later
- `netlify.toml` for redirect rules (important for clean URLs and 301s)

**GitHub Pages is NOT recommended** for this project because it does not support form handling — you'd need a third-party form service (Formspree, Basin, etc.) which adds a dependency and potential cost.

---

## SEO Tooling

### Schema Markup (JSON-LD)

**Recommendation: Hand-authored JSON-LD in each HTML page's `<head>`**

No library needed. Google's structured data supports JSON-LD natively. Use the following types:

**Home page:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "NPT Engenharia",
  "description": "Projetos de pressurização de escadas de emergência, hidráulica e elétrica para construtoras.",
  "url": "https://nptengenharia.com.br",
  "telephone": "+55-XX-XXXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  },
  "areaServed": "BR",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de Engenharia",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projeto de Pressurização de Escada de Emergência" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projeto Hidráulico" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projeto Elétrico" }}
    ]
  }
}
</script>
```

**Service pages:** Use `@type: "Service"` with `provider`, `areaServed`, and `description` matching the page's H1/meta description.

**Portfolio page:** Use `@type: "ItemList"` with individual `@type: "CreativeWork"` entries for each project case.

### Sitemap

**Recommendation: Handwritten `sitemap.xml`** — for a 7-page site, automated generation is unnecessary complexity.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nptengenharia.com.br/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://nptengenharia.com.br/pressurizacao/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://nptengenharia.com.br/hidraulica/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://nptengenharia.com.br/eletrica/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://nptengenharia.com.br/portfolio/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://nptengenharia.com.br/sobre/</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>
  <url><loc>https://nptengenharia.com.br/contato/</loc><changefreq>yearly</changefreq><priority>0.8</priority></url>
</urlset>
```

Submit to Google Search Console after deploy. Update manually when pages are added (this will happen rarely).

### Meta Tags

Each page must have unique, hand-authored `<title>` and `<meta name="description">`:

| Page | Title Pattern | Max Chars |
|------|--------------|-----------|
| Home | `NPT Engenharia — Projetos de Pressurização, Hidráulica e Elétrica` | 60 |
| Pressurização | `Projeto de Pressurização de Escada de Emergência — NPT Engenharia` | 60 |
| Hidráulica | `Projeto Hidráulico para Construção Civil — NPT Engenharia` | 60 |
| Elétrica | `Projeto Elétrico para Construtoras — NPT Engenharia` | 60 |

Include `<link rel="canonical">` on every page to prevent duplicate content issues.

---

## Performance Tooling

### Image Strategy (most impactful for LCP)

**Mandatory:** All images converted to WebP with a JPEG/PNG fallback via `<picture>`.

```html
<picture>
  <source srcset="/assets/hero.webp" type="image/webp" />
  <img src="/assets/hero.jpg" alt="Projeto de pressurização NPT Engenharia"
       width="1200" height="600" loading="eager" fetchpriority="high" />
</picture>
```

- Hero image: `loading="eager"` + `fetchpriority="high"` — critical for LCP
- Below-fold images: `loading="lazy"` — critical for initial page weight
- Always include `width` and `height` attributes — prevents CLS

**Tooling:** Use `sharp` via a one-time npm script to generate WebP versions. No runtime dependency.

```json
// package.json scripts
"optimize-images": "node scripts/optimize-images.js"
```

### Font Strategy

**Recommendation: Google Fonts Inter with `font-display: swap` + preconnect**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Alternative (better performance):** Self-host fonts using `fontsource` npm package. This eliminates the Google Fonts DNS lookup and allows Vite to hash and cache the font file permanently.

```bash
npm install @fontsource/inter
```

```javascript
// main.js
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
```

Self-hosting with fontsource is **recommended** over Google Fonts CDN because: (1) eliminates cross-origin DNS lookup, (2) files are cache-busted by Vite's asset hashing, (3) LGPD compliance — no data sent to Google servers.

### Core Web Vitals Targets (2025)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s – 4s | > 4s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 – 0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200ms – 500ms | > 500ms |

FID was replaced by INP in March 2024. All tooling references should use INP.

---

## Installation

```bash
# Initialize project
npm create vite@latest npt-engenharia -- --template vanilla

cd npt-engenharia

# Core dev tools
npm install -D vite prettier stylelint stylelint-config-standard

# Self-hosted fonts (recommended over Google Fonts CDN)
npm install @fontsource/inter

# Optional: Swiper for portfolio carousel (only if carousel is needed)
npm install swiper

# Optional: Lenis for smooth scroll
npm install lenis

# Image optimization (run once as a script, not a runtime dep)
npm install -D sharp
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Vite | Parcel 2 | Parcel has zero-config appeal, but Vite is faster, better documented, and has more community resources for 2025 |
| Vite | Webpack 5 | Webpack for large-scale SPAs only; overkill for a 7-page static site; config complexity not justified |
| Netlify Forms | Formspree | Use Formspree if hosting on GitHub Pages instead of Netlify; paid tier required for > 50 submissions/month |
| Netlify Forms | Basin | Open-source alternative to Formspree; use if avoiding vendor lock-in is priority |
| @fontsource/inter | Google Fonts CDN | Use Google Fonts CDN if LGPD compliance is deprioritized and simplicity is preferred |
| Vanilla CSS + Custom Properties | Tailwind CDN | Use Tailwind CDN only if developer has deep Tailwind muscle memory; CDN version ships 3MB+ to users |
| Hand-authored sitemap.xml | sitemap npm package | Use npm package only if site grows beyond 20 pages with dynamic content |
| JSON-LD schema (inline) | schema.org microdata | Microdata mixes content and metadata in HTML; JSON-LD is Google's explicit preference and easier to maintain |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Tailwind CDN (cdn.tailwindcss.com) | Ships 3+ MB of CSS to the browser; no purging via CDN; catastrophic for LCP and bandwidth | Vanilla CSS with custom properties |
| Tailwind via npm (PostCSS) | Adds significant build complexity for a project that gains no benefit from utility-first at this scale | Vanilla CSS with BEM naming |
| Bootstrap 5 | ~30 KB JS + ~22 KB CSS overhead; generic visual output undermines the credibility positioning; requires jQuery-like mental model | Vanilla CSS custom properties |
| Jekyll / Eleventy / Hugo | These are SSGs — they add a templating layer, build complexity, and dependencies. The project explicitly calls for HTML/CSS/JS only. The performance benefit is marginal over Vite for 7 pages. | Vite + multi-page HTML |
| Next.js / Astro | Frameworks designed for React/component-based workflows; zero benefit for vanilla HTML; adds Node.js abstraction that makes direct HTML SEO control harder | Vite |
| WordPress | CMS overhead defeats the performance and SEO goals; PHP hosting costs money; plugin ecosystem creates maintenance burden | Static HTML on Netlify |
| React / Vue / Svelte | SPA hydration overhead hurts Core Web Vitals; defeats purpose of HTML/CSS/JS constraint | Vanilla JS modules |
| jQuery | 87 KB for DOM helpers that have been native since ES6; `document.querySelector`, `fetch`, `classList` cover all use cases | Native DOM APIs |
| reCAPTCHA v2 on forms | Adds 200ms+ load time; degrades conversion rate; unnecessary friction for a B2B contact form with low spam risk | Netlify honeypot field |
| Font Awesome CDN | 76+ KB for icon fonts; renders icons as text (CLS risk); blocks render | Inline SVG icons (each icon ~0.5 KB) |
| Google Analytics (GA4 standard) | 45 KB script; blocked by most ad blockers; slows page load | Netlify Analytics (server-side, no script) or Plausible.io (lightweight, LGPD-friendly) |

---

## Stack Patterns by Variant

**If the client wants blog/articles in v2:**
- Structure blog as `blog/index.html` (listing) + `blog/[slug]/index.html` (article) from the start
- Use Vite's multi-page input to add blog pages later without refactoring
- Do NOT add a CMS for v1 — write HTML articles directly

**If the portfolio grows beyond 6 projects:**
- Consider a `portfolio.json` data file + a lightweight JS template function to render cards
- This avoids duplicating HTML for each portfolio item while remaining framework-free

**If self-hosting domain (nptengenharia.com.br):**
- Register with Registro.br
- Point DNS to Netlify's nameservers — Netlify handles HTTPS automatically via Let's Encrypt
- Add `netlify.toml` with redirect rules: `www` to apex, `/contato` to `/contato/` (trailing slash consistency)

**If adding a WhatsApp CTA button:**
- Use a fixed-position button with `href="https://wa.me/55XXXXXXXXXXX?text=Olá%2C%20vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento"`
- Load WhatsApp icon as inline SVG — do not use an external icon library for a single icon
- Set `rel="noopener noreferrer"` on the link

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| vite@6.x | Node.js >= 18.0.0 | Node 18 LTS is the minimum; Node 20 LTS recommended for 2025 projects |
| swiper@11.x | Vite@6.x | Full ESM support; tree-shakeable; import only needed modules |
| lenis@1.x | Vite@6.x | ESM-native; no conflicts |
| @fontsource/inter@5.x | Vite@6.x | CSS imports work natively with Vite's CSS handling |
| stylelint@16.x | Node.js >= 18.12 | Use `stylelint-config-standard` v36+ for CSS3 custom property support |

---

## Sources

- Netlify official docs (docs.netlify.com/forms/setup/) — Form handling verified MEDIUM-HIGH confidence
- Vite official docs (vitejs.dev) — Build tool features and multi-page config; HIGH confidence from training data + ecosystem dominance
- Google Core Web Vitals (web.dev/vitals) — LCP/CLS/INP thresholds confirmed stable since 2024; HIGH confidence
- Google Search Central — JSON-LD preference over microdata documented; HIGH confidence
- @fontsource npm package — active, widely used, covers all major typefaces; MEDIUM confidence
- Netlify free tier limits — 100 GB bandwidth/month, 300 build minutes/month confirmed; MEDIUM confidence (official docs accessed)
- jQuery usage statistics — npm download trends confirm decline; HIGH confidence from multiple ecosystem reports

---

*Stack research for: NPT Engenharia — Site Institucional B2B (HTML/CSS/JS)*
*Researched: 2026-03-19*
