# Project Research Summary

**Project:** NPT Engenharia — Site Institucional B2B
**Domain:** Static HTML/CSS/JS institutional website — B2B engineering services lead generation (pressurização, hidráulica, elétrica)
**Researched:** 2026-03-19
**Confidence:** MEDIUM-HIGH

---

## Executive Summary

NPT Engenharia needs a static, multi-page institutional website targeting construtoras and incorporadoras in the Brazilian civil construction market. The research is unanimous: the correct architecture is vanilla HTML/CSS/JS built with Vite, deployed on Netlify, with no frameworks, no CMS, and no client-side routing. This is not a compromise choice — it is the optimal stack for this problem. Pure HTML gives full SEO control, best possible Core Web Vitals, and zero maintenance overhead. For a 7–10 page site focused on organic lead generation, any framework adds cost with no benefit.

The central business challenge is credibility, not technology. NPT is a new company with one delivered project. Every feature and design decision must answer the implicit question every prospect asks: "can I trust this company with an AVCB-critical project?" The recommended approach front-loads trust signals — CREA number, team photo, case study with outcomes, ABNT norm references — and pairs them with a dual-channel conversion architecture (contact form + persistent WhatsApp CTA). SEO is non-negotiable from day one: thin service pages, missing schema markup, or incorrect canonical configuration will prevent the site from ranking for 12+ months, which would be catastrophic for a new business.

The primary risks are content-related, not technical. Poor copy on service pages (under 800 words, no NBR norm citations, no scope definition) is the single highest-recovery-cost pitfall. Technical risks — Core Web Vitals, schema markup errors, robots.txt misconfiguration — are all pre-launch checkable and easily fixed if caught before go-live. The build order therefore is: design system and credibility assets first, then SEO page structure, then conversion infrastructure, then trust and polish. Do not start coding before the service page content strategy is resolved.

---

## Key Findings

### Recommended Stack

The stack is intentionally minimal and converges around Vite as the only build tool. Vite handles HMR during development, bundles and hashes assets for production, and supports multi-page HTML entry points natively — the correct pattern for a site where each URL must be a real HTML file with its own `<title>` and schema markup. CSS is written as vanilla CSS with custom properties (BEM naming), with all design tokens centralized in `tokens.css`. No Tailwind, no Bootstrap, no Sass — each would add complexity and CSS overhead with zero benefit at this scale.

For form handling, Netlify Forms is the definitive choice: it works with plain HTML POST (no JavaScript dependency), is free for up to 100 submissions/month (ample for a new B2B firm), and requires no additional service or account beyond the Netlify deployment. Fonts should be self-hosted via `@fontsource/inter` — this eliminates the Google Fonts cross-origin DNS lookup and ensures LGPD compliance (no data sent to Google on page load). Swiper and Lenis are available as optional dependencies but should only be added if the specific UX need is confirmed — a portfolio carousel (Swiper) or premium scroll transitions (Lenis).

**Core technologies:**
- Vite 6.x: build tool and dev server — fastest HMR, native multi-page HTML support, zero-config for vanilla projects
- Vanilla HTML5: page structure — direct search engine parsing, full meta/schema control, fastest TTFB
- CSS3 + Custom Properties (BEM): styling — no unused CSS, one-file design token system, no build complexity
- Vanilla ES2022+ JS (ESM modules): interactivity — fetch, IntersectionObserver, FormData all native, no polyfills
- @fontsource/inter: typography — self-hosted, LGPD-compliant, Vite-hashed cache
- Netlify: hosting + forms — edge CDN, git push deploy, free form handling, deploy previews
- sharp (dev-time script): image optimization — one-time WebP conversion, no runtime dependency

**What NOT to use:** Tailwind CDN (3 MB CSS), Bootstrap, jQuery, Next.js/Astro, reCAPTCHA v2, Font Awesome CDN, Google Analytics standard script (use Netlify Analytics or Plausible instead).

### Expected Features

For a new engineering company targeting the Brazilian B2B market, the credibility bar is higher than typical institutional sites. Prospects are procurement officers at construtoras who will verify CREA registration and expect ABNT norm citations before making contact. The MVP must include all trust signals alongside standard conversion elements.

**Must have (table stakes — v1 launch):**
- Hero section with H1 value proposition + dual CTA (form anchor + WhatsApp link) above the fold on 375px mobile
- Three individual service pages (pressurização, hidráulica, elétrica) with 800-1200 words of technical content each, citing NBR norms (9077, 5626/8160/10844, 5410/5419)
- Persistent floating WhatsApp button with pre-filled message — visible at all scroll depths on all pages
- Contact form (5-6 fields: nome, empresa, WhatsApp/email, tipo de projeto, mensagem) — Netlify Forms backend
- Sobre page with engineer name, photo, CREA number (linkable to CONFEA portal), and specialization
- Portfolio: one project as a full case study (building type, challenge, norms applied, deliverables, result) — not a photo gallery
- Schema markup: ProfessionalService + Service (per service page) + BreadcrumbList (inner pages)
- SEO fundamentals: unique meta title/description per page, canonical tags, sitemap.xml, robots.txt, Open Graph tags
- Mobile-first responsive design with sector-appropriate visual language (navy, amber, technical imagery)
- Identidade visual coesa (logo, paleta de cores, tipografia) — credibility prerequisite for all other content

**Should have (v1.x — add after first leads validate conversion):**
- FAQ section per service page (3-5 questions based on real prospect queries)
- Google Analytics 4 + Search Console setup and conversion goal (form submission = /obrigado/ page view)
- Breadcrumb navigation with BreadcrumbList schema
- Open Graph image per page (for WhatsApp/LinkedIn share previews)
- Depoimento from first client (only after obtained, never fabricated)

**Defer to v2+:**
- Blog/artigos técnicos — requires minimum 5 articles before activation; structure can be built but not published
- Google Ads landing page (separate from institutional site)
- Portfolio filters (after 5+ projects across different service types)
- Calculadora de estimativas online (MEDIUM-HIGH complexity; needs pricing parameter knowledge)

**Anti-features to explicitly reject:**
- Image carousel/slider in hero (reduces conversion, hurts LCP)
- Live chat widget (Intercom/Drift — cost, monitoring burden, frustration if unanswered)
- Newsletter pop-up (wrong stage, wrong audience)
- Fabricated project counters or unverified certifications
- English version of the site (100% national market)

### Architecture Approach

The architecture follows an HTML-first, progressive enhancement pattern: every page is fully functional without JavaScript, with JS adding only UX layers (mobile menu, form validation, scroll effects). This is the correct approach for SEO — Googlebot sees complete content on first render — and for reliability — a JS error in `schema.js` cannot break the form.

The project structure uses Vite's multi-page app configuration with real directory-based URLs (`/servicos/pressurizacao-escadas/index.html` served as `/servicos/pressurizacao-escadas/`). Header and footer are copy-pasted into each HTML file — not fetched via `fetch()` which would cause FOUC and SEO issues. CSS is split into layers: `tokens.css` → `reset.css` → `typography.css` → `layout.css` → `components.css` → `utilities.css` → page-specific files. Critical CSS (header + hero styles, ~2-5 KB) is inlined in `<head>` to reduce LCP by 200-500ms on mobile.

**Major components:**
1. Design token system (`tokens.css`) — single source of truth for colors, spacing, type scale; NPT navy (#1B3A6B) + amber accent (#F5A623)
2. Service pages (`/servicos/[slug]/index.html`) — SEO-targeted pages per specialty, 800-1200 words each, primary conversion entry points
3. Contact form (`form.js` + Netlify Forms) — HTML POST works without JS; JS adds validation, loading state, success message
4. WhatsApp CTA module (`whatsapp-cta.js`) — floating button persistent across all pages/scroll positions, pre-filled message
5. Schema injector (`schema.js`) — centralized JSON-LD injection, one function per schema type, called per-page
6. Portfolio case study (`/portfolio/[slug]/index.html`) — structured case study format, not image gallery
7. Internal linking architecture — footer links to all service pages globally; service pages cross-link to each other and to /contato/

### Critical Pitfalls

The research identifies 10 pitfalls; the following 5 represent the highest impact / most likely to occur on this project:

1. **Thin service page copy** — Pages under 600 words with no NBR citations will never rank. Each service page needs 800-1200 words covering: what the service is, when it is legally required, full scope of deliverables, the work process, target client type, and FAQs with real search intent. This must be resolved before a developer writes a single line of HTML. Recovery is expensive post-launch.

2. **Core Web Vitals failures** — The most common killers on pure HTML/CSS/JS sites: hero image not preloaded, `<img>` tags without `width`/`height` (CLS), web fonts loaded via CSS `@import` (render-blocking), third-party scripts not deferred. All are preventable at build time; none require retrofitting if caught in the foundation phase.

3. **Missing or incorrect schema markup** — `ProfessionalService` (not `LocalBusiness`) is the correct top-level type for a nationally-operating B2B firm. `LocalBusiness` implies physical storefront foot traffic. Missing `telephone` and `url` in Organization schema, or Service schema that does not match the H1 of its page, are common errors that fail validation. Validate with Google's Rich Results Test before launch.

4. **Zero credibility for a new company** — The prospect question is "can I trust this with an AVCB approval?" A site without CREA number, engineer photo, and at least one case study with a documented outcome (even "projeto aprovado pelo CBPMESP em 2024") will lose leads even with excellent SEO traffic. This is a content requirement, not a design one.

5. **WhatsApp CTA buried** — In the Brazilian B2B market, WhatsApp is frequently the primary conversion channel over the formal form. A floating button visible only on scroll is a conversion failure. The button must be fixed-position, visible at all scroll depths, text-labeled (not icon-only), and include a pre-filled message. Secondary WhatsApp CTA belongs in the hero section above the fold.

---

## Implications for Roadmap

The research provides clear phase ordering based on three dependencies: (1) content must precede development for SEO pages, (2) design system must precede all HTML, (3) conversion infrastructure must be tested end-to-end before launch. The architecture research even provides an explicit build order that maps to roadmap phases.

### Phase 1: Foundation and Design System
**Rationale:** Everything else depends on this. CSS tokens, visual identity, and Vite project structure are prerequisites for all other work. Setting up Netlify deployment at this phase also means the site is live from day one and Google can begin indexing (even if incomplete).
**Delivers:** Live Netlify URL, design token system, header/footer shell, homepage with stub content
**Addresses:** Pitfall 5 (sector-appropriate visual design) and Pitfall 8 (canonical URL configuration from day one)
**Avoids:** Building service pages before the visual identity is locked — credibility visual is a prerequisite, not a polish step

### Phase 2: Content Strategy and Copy (runs in parallel with Phase 1)
**Rationale:** Service page copy — including keyword targeting, NBR norm citations, deliverable scope definitions, and FAQs — must be finalized before HTML is written. This is a client/content task, not a developer task, but it blocks Phase 3. Identify long-tail keywords per service in this phase.
**Delivers:** Final copy for all three service pages (800-1200 words each), about page content, case study structured text for portfolio
**Addresses:** Pitfall 1 (thin pages), Pitfall 9 (generic keyword targeting)
**Note:** This phase is not development work; it is a dependency that must be resolved before Phase 3 begins

### Phase 3: Core SEO Pages
**Rationale:** Service pages are the primary organic traffic entry points and the first conversion touchpoints for Google-referred visitors. They should be built before conversion infrastructure because without them, there is no traffic to convert.
**Delivers:** Three fully-formed service pages at semantic URLs, sitemap.xml, robots.txt, per-page meta/canonical/OG tags, schema.js with Organization + Service markup
**Addresses:** Pitfall 1 (thin pages), Pitfall 3 (missing schema), Pitfall 8 (canonical), Pitfall 9 (keyword targeting), Pitfall 10 (robots.txt)
**Uses:** Vite multi-page input config, JSON-LD schema.js module, BEM CSS components

### Phase 4: Conversion Infrastructure
**Rationale:** With SEO pages live, the site needs to capture leads. Contact form, WhatsApp CTA, and the /obrigado/ thank-you page form the complete conversion loop. End-to-end form delivery testing is mandatory before this phase closes.
**Delivers:** Contact form with Netlify Forms backend, /obrigado/ page (enables GA4 goal tracking), floating WhatsApp CTA module, /contato/ standalone page
**Addresses:** Pitfall 6 (WhatsApp CTA buried), Pitfall 7 (form leaking leads)
**Implements:** form.js, whatsapp-cta.js, netlify.toml redirect rules, honeypot spam protection

### Phase 5: Trust and Credibility
**Rationale:** Once the core SEO-to-conversion funnel exists, this phase adds the content that converts skeptical prospects — particularly important for a new company. The Sobre page and portfolio case study are not cosmetic; they are the answers to "can I trust them?"
**Delivers:** Sobre page (engineer name, photo, CREA number, bio), portfolio index + first project case study, "Como funciona" process section on homepage, "Por que a NPT" section
**Addresses:** Pitfall 4 (credibility collapse), all trust signal requirements from FEATURES.md

### Phase 6: Performance and Launch QA
**Rationale:** Performance optimization and pre-launch checklist must be a discrete phase, not "done as we go." The "looks done but isn't" checklist from PITFALLS.md provides the exact gate criteria.
**Delivers:** Critical CSS inlined, all images WebP with JPEG fallback, fonts self-hosted, all pages 90+ Lighthouse mobile score, canonical/robots/sitemap verified, form delivery confirmed end-to-end
**Addresses:** Pitfall 2 (Core Web Vitals), Pitfall 7 (form delivery), Pitfall 10 (robots.txt), all items in the pre-launch checklist
**Gate:** Do not launch until PageSpeed Insights mobile score is 90+ on homepage and both highest-priority service pages

### Phase Ordering Rationale

- Design system before content pages because credibility visual is a prerequisite, not polish — a well-written service page on an amateurish design loses leads
- Content strategy as a parallel-to-development phase because it gates the highest-impact SEO pages; starting development without final copy leads to placeholder text that gets indexed
- SEO pages before conversion infrastructure because traffic must exist before conversion optimization matters; without indexed service pages there are no leads to capture
- Trust and credibility after technical infrastructure because the Sobre/portfolio content requires finalized design system and reliable deployment
- Performance as the final phase because it is verifiable only on the complete site, but must be a hard gate before launch — not an afterthought

### Research Flags

Phases needing deeper research during planning:
- **Phase 2 (Content Strategy):** Keyword research for long-tail Brazilian engineering queries requires current Google Search data (monthly search volume, keyword difficulty). Training knowledge provides keyword patterns but not current competition levels. Use Google Keyword Planner or Semrush before writing final copy.
- **Phase 4 (Netlify Forms):** Verify current free tier limits (100 submissions/month as of Aug 2025) before committing. If client anticipates higher volume from day one, evaluate Formspree or a custom serverless function.

Phases with standard, well-documented patterns (can skip research-phase):
- **Phase 1 (Foundation):** Vite multi-page config, CSS custom properties, Netlify setup — all well-documented with stable APIs
- **Phase 3 (SEO Pages):** JSON-LD schema types, meta tag patterns, canonical URL configuration — stable, high-confidence
- **Phase 6 (Performance):** Core Web Vitals optimization for HTML/CSS/JS sites — thoroughly documented, standard patterns

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Vite, Netlify Forms, vanilla CSS — all stable, official docs corroborate; no breaking changes expected |
| Features | MEDIUM-HIGH | ABNT norms and CREA requirements are high-confidence; Brazilian WhatsApp B2B behavior is medium-confidence pattern inference; competitor analysis not possible without live web access |
| Architecture | HIGH | Static HTML patterns are well-established; all architectural recommendations are low-risk, stable patterns since 2020+ |
| Pitfalls | MEDIUM-HIGH | SEO, CWV, and schema pitfalls are HIGH confidence; Google algorithm-specific pitfalls should be re-verified given knowledge cutoff Aug 2025 |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Keyword research validation:** Research provides keyword patterns ("projeto pressurização escada emergência NBR 9077") but current search volume and competition cannot be verified without live tools. Must be done before Phase 2 copy is finalized. Use Google Search Console post-launch to validate and iterate.
- **Competitor site analysis:** WebSearch was unavailable during research. The competitive differentiation recommendations (CREA in header, FAQ, process section) are based on pattern inference, not live competitor audit. A manual audit of 3-5 actual competitor sites before design is recommended.
- **Client content assets:** Research assumes availability of engineer photo, real CREA number, and case study details from the single delivered project. If these are not available, Phase 5 delivery is blocked. Confirm asset availability before roadmap is finalized.
- **WhatsApp number and pre-filled message text:** Must be confirmed with client before Phase 4 implementation. The wa.me URL format requires exact phone number with country code.
- **Google Analytics 4 vs. Netlify Analytics decision:** Both are valid; client preference and LGPD sensitivity should determine which is used. GA4 standard script hurts INP if not deferred correctly.

---

## Sources

### Primary (HIGH confidence)
- Vite official docs (vitejs.dev) — multi-page config, build pipeline, ESM support
- Google Core Web Vitals (web.dev/vitals) — LCP/CLS/INP thresholds, stable since 2024
- Google Search Central — JSON-LD preference, canonical tag implementation, robots.txt spec
- Schema.org specification — ProfessionalService, Service, BreadcrumbList types
- Netlify Forms documentation (docs.netlify.com/forms/setup/) — form attributes, honeypot, redirect config
- ABNT NBR 9077:2001, NBR 5626, NBR 5410, NBR 5419, NBR 8160, NBR 10844 — Brazilian engineering norms cited in feature and pitfall research

### Secondary (MEDIUM confidence)
- @fontsource npm package — widely used, covers Inter, stable API; LGPD compliance inference based on no Google server contact
- Brazilian B2B market: WhatsApp as primary contact channel, CREA as trust signal — pattern inference from sector knowledge, Aug 2025 cutoff
- B2B conversion rate optimization: form friction, CTA copy, above-the-fold patterns — established field, stable principles

### Tertiary (LOW confidence — needs validation)
- Competitor feature analysis — no live competitor sites were accessed; all findings are inference-based
- Current keyword difficulty for Brazilian engineering search terms — requires live Google Keyword Planner or Semrush data to validate

---

*Research completed: 2026-03-19*
*Ready for roadmap: yes*
