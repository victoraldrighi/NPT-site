# NPT Engenharia — Site Institucional

## What This Is

Site institucional da NPT Engenharia, empresa especializada em projetos de pressurização de escadas de emergência, hidráulica e elétrica. O site serve como principal canal de geração de leads B2B, atendendo construtoras residenciais e industriais de todo o Brasil. É o ponto de entrada tanto para engenheiros/arquitetos que especificam fornecedores quanto para donos de construtoras que decidem por preço e confiança.

## Core Value

O visitante encontra a NPT pelo Google, entende os serviços em menos de 30 segundos, e entra em contato para pedir orçamento — tudo em uma única visita.

## Requirements

### Validated (v1.0 — 2026-03-20)

- [x] Site encontrável no Google para buscas de "projeto pressurização escada emergência", "projeto hidráulico", "projeto elétrico" em âmbito nacional — Validated in Phase 3: Service Pages & SEO Nucleus
- [x] Página de cada serviço otimizada para SEO (pressurização, hidráulica, elétrica) com conteúdo técnico relevante — Validated in Phase 3
- [x] Formulário de contato/orçamento funcional (nome, empresa, tipo de projeto, mensagem) — Validated in Phase 4: Portfolio, Conversion & Contact
- [x] CTA para WhatsApp presente em posição de destaque (desativado até número disponível) — Validated in Phase 4
- [x] Seção de portfólio com ao menos 1 projeto entregue — Validated in Phase 4
- [x] Identidade visual profissional que transmita credibilidade técnica — Validated in Phase 1: Foundation & Design System
- [x] Performance excelente (Core Web Vitals verdes, Lighthouse ≥ 90 mobile) — Validated in Phase 5: Performance & Launch QA
- [x] Site responsivo e funcional em mobile — Validated in Phase 2: Home, Sobre & Credibility Shell
- [x] Estrutura técnica de SEO: meta tags, schema markup, sitemap.xml, robots.txt — Validated in Phase 5
- [x] Página Sobre com apresentação da equipe e diferenciais da empresa — Validated in Phase 2
- [x] Estrutura pronta para adição futura de blog/artigos técnicos — Validated in Phase 1

### Active

(None — all v1.0 requirements validated)

### Out of Scope

- Blog com artigos técnicos (v1) — estrutura preparada, conteúdo na fase 2
- Área do cliente / login — fora do escopo de site institucional
- E-commerce ou pagamento online — não aplicável ao modelo de negócio
- Chat em tempo real — WhatsApp atende com menor custo de manutenção
- Versão em inglês — mercado nacional por enquanto

## Context

- **Empresa nova:** A NPT está começando no setor, o que é um desafio de credibilidade. O site precisa compensar a falta de histórico com profissionalismo visual e conteúdo técnico sólido.
- **1 projeto entregue:** Caso real disponível para portfólio — usar com destaque para prova social.
- **Diferencial de preço:** Estrutura enxuta = preço competitivo. Isso deve ser comunicado sem parecer "barato" — o posicionamento é "melhor custo-benefício do mercado".
- **Público técnico + decisor:** Engenheiros querem ver normas (NBR 9077, ABNT), especificações, competência técnica. Donos de construtora querem ver confiança, agilidade e preço.
- **Logo existente:** Cliente tem logo, mas está aberto a nova sugestão de identidade visual.
- **Stack:** HTML/CSS/JS puro — máxima performance para SEO, hospedagem gratuita (Netlify/GitHub Pages), sem dependências.
- **Atendimento nacional:** Projetos entregues remotamente, sem restrição geográfica.

## Constraints

- **Stack**: HTML/CSS/JS puro — sem frameworks pesados, sem CMS, máxima performance
- **Portfólio**: Apenas 1 projeto disponível no lançamento — design deve suportar 1-N projetos
- **SEO**: Conteúdo técnico deve referenciar normas ABNT (NBR 9077 para pressurização) para autoridade de domínio
- **Identidade**: Logo existente como referência; sugestão de nova paleta e tipografia é bem-vinda

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| HTML/CSS/JS puro (sem framework) | Melhor performance = melhor SEO; zero overhead; hospedagem gratuita | ✓ Validated — Lighthouse ≥ 90 mobile |
| Estrutura para blog sem conteúdo v1 | SEO de longo prazo exige blog, mas não bloquear lançamento | ✓ Scaffold in /blog/ directory, conteúdo v2 |
| Foco em lead generation (formulário + WhatsApp) | Conversão é o KPI principal do site | ✓ Netlify Forms + WhatsApp FAB implementados |
| Identidade visual nova sugerida | Logo existe mas empresa está aberta a reposicionamento visual | ✓ Navy #1B3A6B + Amber #F5A623 aplicados |

## Current State

**v1.0 milestone complete — 2026-03-20**

All 5 phases shipped:
1. Foundation & Design System — Vite 6.x, CSS tokens, Netlify deploy
2. Home, Sobre & Credibility Shell — Homepage, Sobre, CREA, Como trabalhamos
3. Service Pages & SEO Nucleus — 3 service pages, schema markup, OG tags
4. Portfolio, Conversion & Contact — Portfolio, contact form, WhatsApp FAB
5. Performance & Launch QA — Core Web Vitals green, sitemap, robots.txt, GA4

Site live at https://nptengenharia.com.br (production domain configured).

---
*Last updated: 2026-03-20 after v1.0 milestone completion*
