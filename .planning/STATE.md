---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
stopped_at: Completed 05-01-PLAN.md (all 6 tasks including Task 6 human-verify approved)
last_updated: "2026-03-20T21:25:37.221Z"
progress:
  total_phases: 5
  completed_phases: 5
  total_plans: 9
  completed_plans: 9
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-19)

**Core value:** O visitante encontra a NPT pelo Google, entende os serviços em menos de 30 segundos, e entra em contato para pedir orçamento — tudo em uma única visita.
**Current focus:** Phase 05 — performance-launch-qa

## Current Position

Phase: 05 (performance-launch-qa) — EXECUTING
Plan: 1 of 1

## Performance Metrics

**Velocity:**

- Total plans completed: 1
- Average duration: 8 min
- Total execution time: 0.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation-and-design-system | 1/2 | 8 min | 8 min |

**Recent Trend:**

- Last 5 plans: 01-01 (8 min)
- Trend: —

*Updated after each plan completion*
| Phase 01-foundation-and-design-system P02 | 5 | 2 tasks | 0 files |
| Phase 02-home-sobre-and-credibility-shell P01 | 8 min | 2 tasks | 14 files |
| Phase 02-home-sobre-and-credibility-shell P02 | 5 min | 2 tasks | 5 files |
| Phase 03-service-pages-seo-nucleus P01 | 8 min | 3 tasks | 12 files |
| Phase 03-service-pages-seo-nucleus P02 | 11 min | 3 tasks | 3 files |
| Phase 04-portfolio-conversion-contact P01 | 7 | 3 tasks | 7 files |
| Phase 04-portfolio-conversion-contact P02 | 5 | 2 tasks | 8 files |
| Phase 05-performance-launch-qa P01 | 15 | 5 tasks | 10 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Stack: HTML/CSS/JS puro com Vite 6.x — maximum performance, zero framework overhead, free Netlify hosting
- Forms: Netlify Forms (free tier, HTML POST, no JS dependency) — do not switch without validating volume needs
- Fonts: Self-hosted via @fontsource/inter — eliminates Google Fonts CDN request, LGPD-compliant
- Identity: NPT navy (#1B3A6B) + amber accent (#F5A623) palette LOCKED in tokens.css (01-01)
- Vite pinned: vite@6.4.1 explicitly — npm latest installs Vite 8 (Rolldown), breaking rollupOptions API
- Token architecture: two-layer (primitives + semantic) — semantic names are what all CSS uses directly
- @fontsource: 4 separate weight imports in main.js (400/500/600/700) — bare import only loads 400
- Breakpoints: raw rem in @media (48rem tablet, 80rem desktop) — CSS vars cannot be used in media queries
- [Phase 01-foundation-and-design-system]: Netlify free tier confirmed for hosting: CDN, HTTPS, CI/CD, and Forms all on free plan
- [Phase 01-foundation-and-design-system]: Live URL: https://npt-site.netlify.app/ — canonical production URL for all v1 phases
- [Phase 02-home-sobre-and-credibility-shell]: CSS hamburger uses visibility:hidden (not display:none) on nav-links to prevent keyboard focus trap when menu is closed
- [Phase 02-home-sobre-and-credibility-shell]: ol[role=list] on Como trabalhamos steps restores VoiceOver list semantics after list-style:none removes them
- [Phase 02-home-sobre-and-credibility-shell]: Footer id=contato serves as anchor target for Solicitar Orcamento CTA buttons
- [Phase 02-home-sobre-and-credibility-shell]: CONFEA link uses consultaprofissional.confea.org.br (not www.confea.org.br) for direct professional registration verification
- [Phase 03-service-pages-seo-nucleus]: og-image generation: pure-Node approach using zlib.deflateSync + manual CRC32 — no new npm packages, 1200x630 navy PNG
- [Phase 03-service-pages-seo-nucleus]: service-page CSS-only FAQ accordion via details/summary — no JavaScript, progressively enhances with native browser behavior
- [Phase 03-service-pages-seo-nucleus]: FAQPage schema placed on service pages for AI engine visibility (Perplexity/ChatGPT/Google AI Overviews) — not eligible for Google SERP rich result since 2023 policy
- [Phase 03-service-pages-seo-nucleus]: BreadcrumbList position 3 has no item property — current page node per Google spec
- [Phase 04-portfolio-conversion-contact]: tipo-outro field always visible (not conditional via CSS :has()) — eliminates browser compatibility concerns, label text makes purpose clear
- [Phase 04-portfolio-conversion-contact]: Portfolio page uses .service-cta class for CTA section — zero new CSS for navy block, consistent with service pages
- [Phase 04-portfolio-conversion-contact]: obrigado page skips nav phone — minimal header has no nav list; WhatsApp FAB added as sole conversion element
- [Phase 04-portfolio-conversion-contact]: All stale #contato and /#contato anchor links eliminated site-wide; replaced with /contato/ page route
- [Phase 05-performance-launch-qa]: GA4 inline init script (window.dataLayer) non-blocking in practice — PERF-03 accepts 5-line dataLayer initializer pattern
- [Phase 05-performance-launch-qa]: Font preload skipped: @fontsource/inter has font-display:swap built into compiled CSS — preload omitted to avoid stale-hash double fetch
- [Phase 05-performance-launch-qa]: sitemap.xml excludes /obrigado/ — thank-you page must not be indexed by search engines

### Pending Todos

None yet.

### Blockers/Concerns

- Content blocker (Phase 3): Service page copy (800-1200 words per service with NBR citations) must be finalized before Phase 3 HTML is written. If content is not ready, Phase 3 will be delayed.
- Asset dependency (Phase 2): Engineer professional photo and real CREA number must be confirmed available before Phase 2 can complete CRED-02 and CRED-01.
- WhatsApp number (Phase 4): Client must supply WhatsApp number with country code (+55) before Phase 4 implementation of CONV-01.

## Session Continuity

Last session: 2026-03-20T21:18:11.091Z
Stopped at: Completed 05-01-PLAN.md (all 6 tasks including Task 6 human-verify approved)
Resume file: None
