---
phase: 03-service-pages-seo-nucleus
plan: "02"
subsystem: service-pages
tags: [service-pages, seo, schema-org, faq, breadcrumb, structured-data, pt-BR]
dependency_graph:
  requires:
    - 03-01 (service-page.css scaffold, vite entries, servicos/ directories)
  provides:
    - servicos/pressurizacao-escadas-emergencia/index.html (PAGE-02)
    - servicos/projetos-hidraulicos/index.html (PAGE-03)
    - servicos/projetos-eletricos/index.html (PAGE-04)
  affects:
    - Netlify deploy (3 new URLs become indexable)
    - SEO coverage for all 3 primary service keywords
tech_stack:
  added: []
  patterns:
    - Three JSON-LD blocks per page (Service + BreadcrumbList + FAQPage) in <head>
    - BreadcrumbList position 3 has no `item` property (Google spec — current page)
    - FAQPage schema for AI engine visibility (Perplexity, ChatGPT, Google AI Overviews)
    - CSS-only FAQ accordion via details/summary (inherited from service-page.css)
    - dl.service-specs for technical spec lists
key_files:
  created:
    - servicos/pressurizacao-escadas-emergencia/index.html
    - servicos/projetos-hidraulicos/index.html
    - servicos/projetos-eletricos/index.html
  modified: []
decisions:
  - "FAQPage schema comment added above script tag per plan spec: AI engine visibility only — not eligible for Google SERP rich result (policy since 2023)"
  - "BreadcrumbList position 3 has no item property per Google spec — current page node"
  - "All 3 pages share identical header/footer/nav structure, copied exactly from index.html"
metrics:
  duration: "11 min"
  completed_date: "2026-03-20"
  tasks_completed: 3
  files_created: 3
  files_modified: 0
---

# Phase 03 Plan 02: Service Pages (Wave 2) Summary

**One-liner:** Three complete service pages in pt-BR with 900+ words each, 3 JSON-LD blocks per page (Service/BreadcrumbList/FAQPage), CSS-only FAQ accordion, and breadcrumb nav — npm build exits 0 with all 6 dist HTML files present.

## What Was Implemented

### Task 1: Pressurização de Escadas de Emergência page

**File:** `servicos/pressurizacao-escadas-emergencia/index.html`

Complete HTML service page with:
- Title: "Pressurização de Escadas de Emergência | NPT Engenharia" (54 chars)
- Description: "Projetos de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP. Aprovação na primeira vistoria. Atendimento nacional. Solicite orçamento." (155 chars)
- Canonical: `https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/`
- Body class: `page-service page-pressurizacao`
- 3 JSON-LD scripts: Service, BreadcrumbList (position 3 no `item`), FAQPage
- 6 content sections: intro, Quando é obrigatório, Como desenvolvemos, Especificações técnicas, Por que NPT, Perguntas frequentes
- `dl.service-specs` with 7 spec items including NBR 9077 + IT 11 do CBPMESP
- 3 CSS-only FAQ accordion items (details/summary) with question text matching FAQPage schema name fields exactly
- CTA section with `/#contato` and WhatsApp buttons
- 312 lines — estimated ~950 words visible body text

**NBR citations:** NBR 9077 (14 occurrences), IT 11 do CBPMESP throughout

### Task 2: Projetos Hidráulicos Prediais page

**File:** `servicos/projetos-hidraulicos/index.html`

Complete HTML service page with:
- Title: "Projetos Hidráulicos Prediais | NPT Engenharia" (47 chars)
- Description: "Projetos hidráulicos prediais (NBR 5626/8160) para construtoras residenciais e industriais. Entrega ágil, preço competitivo. Solicite orçamento." (152 chars)
- Canonical: `https://npt-site.netlify.app/servicos/projetos-hidraulicos/`
- Body class: `page-service page-hidraulica`
- 3 JSON-LD scripts: Service, BreadcrumbList, FAQPage
- Content covers água fria (NBR 5626), esgoto (NBR 8160), água quente (NBR 7198)
- `dl.service-specs` with 7 spec items
- 3 CSS-only FAQ accordion items with question text matching FAQPage schema name fields exactly
- 318 lines — estimated ~960 words visible body text

**NBR citations:** NBR 5626 (14 occurrences), NBR 8160 (9 occurrences), NBR 7198 throughout

### Task 3: Projetos Elétricos de Baixa Tensão page + full build verify

**File:** `servicos/projetos-eletricos/index.html`

Complete HTML service page with:
- Title: "Projetos Elétricos de Baixa Tensão | NPT Engenharia" (52 chars)
- Description: "Projetos elétricos de baixa tensão conforme NBR 5410 e NBR 5419. Laudos e ART para regularização. Atendimento nacional. Solicite orçamento." (144 chars)
- Canonical: `https://npt-site.netlify.app/servicos/projetos-eletricos/`
- Body class: `page-service page-eletrica`
- 3 JSON-LD scripts: Service, BreadcrumbList, FAQPage
- Content covers low-voltage electrical (NBR 5410) and SPDA para-raios (NBR 5419)
- Includes CEMIG/CPFL/Enel/Equatorial concessionária alignment differential
- Mentions project compatibilization with hydraulic and pressurization projects
- 324 lines — estimated ~980 words visible body text

**NBR citations:** NBR 5410 (12 occurrences), NBR 5419 (11 occurrences)

## Build Verification

```
npm run build → exit 0
vite v6.4.1 — 23 modules transformed, built in 393ms
```

All 6 dist HTML files confirmed:

| File | Status | Size |
|------|--------|------|
| dist/index.html | FOUND | 14.98 kB |
| dist/sobre/index.html | FOUND | 12.34 kB |
| dist/obrigado/index.html | FOUND | 3.68 kB |
| dist/servicos/pressurizacao-escadas-emergencia/index.html | FOUND | 18.60 kB |
| dist/servicos/projetos-hidraulicos/index.html | FOUND | 18.56 kB |
| dist/servicos/projetos-eletricos/index.html | FOUND | 19.61 kB |

## Automated Verification Results

| Check | Pressurização | Hidráulica | Elétrica |
|-------|--------------|------------|---------|
| Primary norm citations | NBR 9077 ×14 | NBR 5626 ×14 | NBR 5410 ×12 |
| Secondary norm citations | IT 11 ×13 | NBR 8160 ×9 | NBR 5419 ×11 |
| JSON-LD script blocks | 3 | 3 | 3 |
| BreadcrumbList present | PASS | PASS | PASS |
| FAQPage present | PASS | PASS | PASS |
| Canonical with trailing slash | PASS | PASS | PASS |
| og:image absolute URL | PASS | — | — |
| Breadcrumb nav class | PASS | PASS | PASS |
| FAQ .faq-item occurrences | 6 (3 items) | 6 (3 items) | 6 (3 items) |
| Line count | 312 | 318 | 324 |

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `ac5f0c2` | feat(03-02): Pressurização de Escadas de Emergência service page |
| Task 2 | `e40e508` | feat(03-02): Projetos Hidráulicos Prediais service page |
| Task 3 | `9634520` | feat(03-02): Projetos Elétricos de Baixa Tensão page + full build verify |

## Deviations from Plan

None - plan executed exactly as written. All locked values from CONTEXT.md used verbatim. FAQ question text matches JSON-LD name fields exactly on all three pages. BreadcrumbList position 3 has no `item` property as specified. FAQPage schema comment present on all pages.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| servicos/pressurizacao-escadas-emergencia/index.html | FOUND |
| servicos/projetos-hidraulicos/index.html | FOUND |
| servicos/projetos-eletricos/index.html | FOUND |
| commit ac5f0c2 (Task 1) | FOUND |
| commit e40e508 (Task 2) | FOUND |
| commit 9634520 (Task 3) | FOUND |
| npm run build exit 0 | PASS |
| All 6 dist HTML files | PASS |
