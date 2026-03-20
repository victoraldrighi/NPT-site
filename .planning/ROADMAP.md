# Roadmap: NPT Engenharia — Site Institucional B2B

## Overview

Five phases deliver a site that ranks on Google and converts construtoras into leads. Phase 1 locks the design system and Vite/Netlify infrastructure that every other phase depends on. Phases 2-4 build the content shell, SEO nucleus, and conversion funnel in dependency order. Phase 5 is a hard gate: nothing ships until Lighthouse mobile hits 90+ and the full launch checklist passes.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Design System** - Vite 6.x scaffold, CSS token system, Netlify deploy, visual identity locked (completed 2026-03-19)
- [x] **Phase 2: Home, Sobre & Credibility Shell** - Homepage, Sobre page, thank-you page, and all trust signals live (completed 2026-03-20)
- [x] **Phase 3: Service Pages & SEO Nucleus** - Three rich service pages with NBR references, schema markup, and per-page SEO (completed 2026-03-20)
- [x] **Phase 4: Portfolio, Conversion & Contact** - Case study page, contact form, WhatsApp CTA, and full conversion loop (completed 2026-03-20)
- [ ] **Phase 5: Performance & Launch QA** - Core Web Vitals green, sitemap/robots, Lighthouse 90+ gate, launch

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: The project is live on Netlify with a locked visual identity and a CSS token system that all subsequent pages inherit
**Depends on**: Nothing (first phase)
**Requirements**: IDEN-01, IDEN-02, IDEN-03, IDEN-04, INFRA-01, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. A Netlify URL is live and returns a valid HTML response (even if stub content)
  2. CSS custom properties (color, type, spacing tokens) are defined in tokens.css and visually applied to the live page
  3. Logo renders correctly on desktop and mobile at all breakpoints (375px, 768px, 1280px)
  4. The /blog/ directory path exists in the project structure without any HTML content (blog scaffold ready for v2)
  5. Vite build produces hashed, bundled assets and deploys automatically on git push
**Plans:** 2/2 plans complete

Plans:
- [x] 01-01-PLAN.md — Scaffold Vite 6.x project, CSS design token system, Inter font, stub page with logo
- [ ] 01-02-PLAN.md — Deploy to Netlify and verify live URL with design system applied

### Phase 2: Home, Sobre & Credibility Shell
**Goal**: Visitors can land on the homepage, understand the company in under 30 seconds, navigate to the Sobre page, and see all trust signals that address the "can I trust a new company?" question
**Depends on**: Phase 1
**Requirements**: PAGE-01, PAGE-06, PAGE-08, CRED-01, CRED-02, CRED-04
**Success Criteria** (what must be TRUE):
  1. Homepage hero communicates the NPT value proposition above the fold on a 375px mobile screen, with at least one visible CTA
  2. Sobre page displays engineer name, professional photo, CREA registration number (linkable to CONFEA portal), and company specialization
  3. "Como trabalhamos" process section is visible on the homepage or Sobre page with numbered steps
  4. /obrigado/ page renders and confirms form submission to the visitor
  5. CREA number appears in the page footer on all pages delivered in this phase
**Plans:** 2/2 plans complete

Plans:
- [ ] 02-01-PLAN.md — Homepage with hero, services grid, "Como trabalhamos", case teaser, shared header/footer/buttons CSS
- [ ] 02-02-PLAN.md — Sobre page with engineer bio, CREA, photo, differentials + /obrigado/ thank-you page

### Phase 3: Service Pages & SEO Nucleus
**Goal**: The three service pages exist at semantic URLs with full technical content (800-1200 words each), NBR norm citations, per-page schema markup, and complete on-page SEO — making them eligible to rank on Google from day one of indexing
**Depends on**: Phase 2
**Requirements**: PAGE-02, PAGE-03, PAGE-04, SEO-01, SEO-02, SEO-05, SEO-06
**Success Criteria** (what must be TRUE):
  1. Each service page is accessible at its semantic URL (/servicos/pressurizacao-escadas-emergencia/, /servicos/projetos-hidraulicos/, /servicos/projetos-eletricos/) and returns a 200 status
  2. Each service page contains at least 800 words of unique technical content citing the relevant ABNT norms (NBR 9077 for pressurização, NBR 5626/8160 for hidráulica, NBR 5410/5419 for elétrica)
  3. Every page on the site has a unique meta title, meta description, og:title, og:description, og:image, and canonical tag
  4. Google's Rich Results Test validates Service schema markup on each service page and ProfessionalService schema on the homepage without errors
**Plans:** 2/2 plans complete

Plans:
- [ ] 03-01-PLAN.md — SEO infrastructure: vite entries, og-image.png, canonical/og on existing pages, ProfessionalService schema on home, nav service links, service-page.css
- [ ] 03-02-PLAN.md — Three service pages: pressurização, hidráulica, elétrica (full HTML content, JSON-LD, breadcrumb, FAQ accordion)

### Phase 4: Portfolio, Conversion & Contact
**Goal**: Visitors have a complete path from landing on any page to submitting a lead — via the contact form or WhatsApp — and the portfolio case study gives skeptical prospects a concrete reason to trust NPT
**Depends on**: Phase 3
**Requirements**: PAGE-05, PAGE-07, CONV-01, CONV-02, CONV-03, CONV-04, CRED-03
**Success Criteria** (what must be TRUE):
  1. A test form submission on /contato/ delivers a notification to the configured email address and redirects the visitor to /obrigado/
  2. The floating WhatsApp button is visible and clickable at all scroll depths on every page, with a pre-filled message that includes the company name
  3. Portfolio case study page documents the single delivered project with building type, applicable norms, scope of deliverables, and result — not just a photo
  4. Phone number is visible in the site header and email address is visible in the site footer on all pages
  5. Visitor can initiate contact from any page without navigating to /contato/ (WhatsApp CTA or in-page form anchor present throughout)
**Plans:** 2/2 plans complete

Plans:
- [ ] 04-01-PLAN.md — CSS components + Vite config + Portfolio page + Contact page with Netlify Forms
- [ ] 04-02-PLAN.md — Global conversion elements: WhatsApp button, phone in header, email in footer across all 8 pages

### Phase 5: Performance & Launch QA
**Goal**: The site passes every pre-launch gate: Core Web Vitals are green on mobile, Lighthouse Performance score is 90+ on mobile for the homepage and at least two service pages, sitemap.xml and robots.txt are correct, and the full conversion loop has been tested end-to-end
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, SEO-03, SEO-04
**Success Criteria** (what must be TRUE):
  1. PageSpeed Insights mobile score is 90 or above on the homepage and on /servicos/pressurizacao-escadas-emergencia/
  2. LCP is under 2.5s, CLS is under 0.1, and INP is under 200ms as measured by PageSpeed Insights on a mobile device simulation
  3. /sitemap.xml returns a valid XML sitemap listing all pages; /robots.txt allows Googlebot access and references the sitemap URL
  4. All fonts are self-hosted (no external CDN requests in the waterfall) and display correctly across Chrome, Firefox, and Safari
  5. A real end-to-end test confirms: form submission receives an email, WhatsApp link opens with pre-filled message, /obrigado/ page loads post-redirect
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/2 | Complete    | 2026-03-19 |
| 2. Home, Sobre & Credibility Shell | 2/2 | Complete    | 2026-03-20 |
| 3. Service Pages & SEO Nucleus | 2/2 | Complete   | 2026-03-20 |
| 4. Portfolio, Conversion & Contact | 2/2 | Complete   | 2026-03-20 |
| 5. Performance & Launch QA | 0/TBD | Not started | - |
