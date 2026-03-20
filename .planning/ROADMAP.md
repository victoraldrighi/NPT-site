# Roadmap: NPT Engenharia — Site Institucional B2B

## Active Milestone

*(none — v1.0 complete, next milestone not yet started)*

## Completed Milestones

<details>
<summary>✅ v1.0 Site Institucional NPT Engenharia MVP (Phases 1–5) — SHIPPED 2026-03-20</summary>

### Overview

Five phases deliver a site that ranks on Google and converts construtoras into leads. Phase 1 locks the design system and Vite/Netlify infrastructure that every other phase depends on. Phases 2-4 build the content shell, SEO nucleus, and conversion funnel in dependency order. Phase 5 is a hard gate: nothing ships until Lighthouse mobile hits 90+ and the full launch checklist passes.

### Phases

- [x] **Phase 1: Foundation & Design System** - Vite 6.x scaffold, CSS token system, Netlify deploy, visual identity locked (completed 2026-03-19)
- [x] **Phase 2: Home, Sobre & Credibility Shell** - Homepage, Sobre page, thank-you page, and all trust signals live (completed 2026-03-20)
- [x] **Phase 3: Service Pages & SEO Nucleus** - Three rich service pages with NBR references, schema markup, and per-page SEO (completed 2026-03-20)
- [x] **Phase 4: Portfolio, Conversion & Contact** - Case study page, contact form, WhatsApp CTA, and full conversion loop (completed 2026-03-20)
- [x] **Phase 5: Performance & Launch QA** - Core Web Vitals green, sitemap/robots, Lighthouse 90+ gate, launch (completed 2026-03-20)

### Phase Details

#### Phase 1: Foundation & Design System
**Goal**: The project is live on Netlify with a locked visual identity and a CSS token system that all subsequent pages inherit
**Depends on**: Nothing (first phase)
**Requirements**: IDEN-01, IDEN-02, IDEN-03, IDEN-04, INFRA-01, INFRA-02, INFRA-03
**Plans:** 2/2 plans complete

Plans:
- [x] 01-01-PLAN.md — Scaffold Vite 6.x project, CSS design token system, Inter font, stub page with logo
- [x] 01-02-PLAN.md — Deploy to Netlify and verify live URL with design system applied

#### Phase 2: Home, Sobre & Credibility Shell
**Goal**: Visitors can land on the homepage, understand the company in under 30 seconds, navigate to the Sobre page, and see all trust signals that address the "can I trust a new company?" question
**Depends on**: Phase 1
**Requirements**: PAGE-01, PAGE-06, PAGE-08, CRED-01, CRED-02, CRED-04
**Plans:** 2/2 plans complete

Plans:
- [x] 02-01-PLAN.md — Homepage with hero, services grid, "Como trabalhamos", case teaser, shared header/footer/buttons CSS
- [x] 02-02-PLAN.md — Sobre page with engineer bio, CREA, photo, differentials + /obrigado/ thank-you page

#### Phase 3: Service Pages & SEO Nucleus
**Goal**: The three service pages exist at semantic URLs with full technical content (800-1200 words each), NBR norm citations, per-page schema markup, and complete on-page SEO — making them eligible to rank on Google from day one of indexing
**Depends on**: Phase 2
**Requirements**: PAGE-02, PAGE-03, PAGE-04, SEO-01, SEO-02, SEO-05, SEO-06
**Plans:** 2/2 plans complete

Plans:
- [x] 03-01-PLAN.md — SEO infrastructure: vite entries, og-image.png, canonical/og on existing pages, ProfessionalService schema on home, nav service links, service-page.css
- [x] 03-02-PLAN.md — Three service pages: pressurização, hidráulica, elétrica (full HTML content, JSON-LD, breadcrumb, FAQ accordion)

#### Phase 4: Portfolio, Conversion & Contact
**Goal**: Visitors have a complete path from landing on any page to submitting a lead — via the contact form or WhatsApp — and the portfolio case study gives skeptical prospects a concrete reason to trust NPT
**Depends on**: Phase 3
**Requirements**: PAGE-05, PAGE-07, CONV-01, CONV-02, CONV-03, CONV-04, CRED-03
**Plans:** 2/2 plans complete

Plans:
- [x] 04-01-PLAN.md — CSS components + Vite config + Portfolio page + Contact page with Netlify Forms
- [x] 04-02-PLAN.md — Global conversion elements: WhatsApp button, phone in header, email in footer across all 8 pages

#### Phase 5: Performance & Launch QA
**Goal**: The site passes every pre-launch gate: Core Web Vitals are green on mobile, Lighthouse Performance score is 90+ on mobile for the homepage and at least two service pages, sitemap.xml and robots.txt are correct, and the full conversion loop has been tested end-to-end
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, SEO-03, SEO-04
**Plans:** 1/1 plans complete

Plans:
- [x] 05-01-PLAN.md — Canonical URL update, sitemap/robots creation, netlify.toml cache headers, GA4 snippet, build verification

### Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/2 | Complete | 2026-03-19 |
| 2. Home, Sobre & Credibility Shell | 2/2 | Complete | 2026-03-20 |
| 3. Service Pages & SEO Nucleus | 2/2 | Complete | 2026-03-20 |
| 4. Portfolio, Conversion & Contact | 2/2 | Complete | 2026-03-20 |
| 5. Performance & Launch QA | 1/1 | Complete | 2026-03-20 |

**Archive:** [v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>
