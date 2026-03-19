# Requirements: NPT Engenharia — Site Institucional

**Defined:** 2026-03-19
**Core Value:** O visitante encontra a NPT pelo Google, entende os serviços em menos de 30 segundos, e entra em contato para pedir orçamento — tudo em uma única visita.

## v1 Requirements

### Identidade Visual

- [x] **IDEN-01**: Site possui paleta de cores e tipografia profissional sugerida (adequada ao setor de engenharia B2B)
- [x] **IDEN-02**: Logo da NPT integrado ao design com versão vetorial
- [x] **IDEN-03**: Design system com tokens de cor, tipografia e espaçamento documentados em CSS custom properties
- [x] **IDEN-04**: Layout responsivo funcional em mobile, tablet e desktop

### Páginas

- [ ] **PAGE-01**: Página Home com seções: hero com CTA, serviços resumidos, diferencial de preço, case rápido e rodapé
- [ ] **PAGE-02**: Página de serviço — Pressurização de Escadas de Emergência (800-1200 palavras, referências NBR 9077 e IT 11 CBPMESP)
- [ ] **PAGE-03**: Página de serviço — Projetos Hidráulicos (800-1200 palavras, referências NBR 5626 e NBR 7198)
- [ ] **PAGE-04**: Página de serviço — Projetos Elétricos (800-1200 palavras, referências NBR 5410 e NBR 5419)
- [ ] **PAGE-05**: Página Portfólio com case study completo do único projeto entregue (tipo, normas aplicadas, escopo, resultado)
- [ ] **PAGE-06**: Página Sobre a Empresa (equipe/sócios com foto, número CREA, missão, diferenciais)
- [ ] **PAGE-07**: Página Contato / Solicitar Orçamento com formulário funcional e dados de contato completos
- [ ] **PAGE-08**: Página de agradecimento pós-envio de formulário (/obrigado/)

### Conversão

- [ ] **CONV-01**: Botão WhatsApp flutuante e persistente em todas as páginas com mensagem pré-preenchida
- [ ] **CONV-02**: Formulário de contato/orçamento funcional (nome, empresa, tipo de projeto, mensagem) — integrado via Google Forms ou Netlify Forms (gratuito)
- [ ] **CONV-03**: Email visível no rodapé de todas as páginas
- [ ] **CONV-04**: Telefone/celular visível no header de todas as páginas

### SEO Técnico

- [ ] **SEO-01**: URLs semânticas para todas as páginas (ex: /servicos/pressurizacao-escadas-emergencia/)
- [ ] **SEO-02**: Meta tags únicas por página (title, meta description, og:title, og:description, og:image)
- [ ] **SEO-03**: sitemap.xml gerado e acessível em /sitemap.xml
- [ ] **SEO-04**: robots.txt configurado corretamente (sem bloquear indexação acidental)
- [ ] **SEO-05**: Schema markup JSON-LD implementado — ProfessionalService na home, Service em cada página de serviço, ItemList no portfólio
- [ ] **SEO-06**: Canonical tags em todas as páginas

### Performance (Core Web Vitals)

- [ ] **PERF-01**: LCP < 2.5s — imagem hero otimizada com fetchpriority="high" e formato WebP
- [ ] **PERF-02**: CLS < 0.1 — todos os elementos `<img>` com atributos width e height explícitos
- [ ] **PERF-03**: INP < 200ms — sem JavaScript bloqueante no critical path
- [ ] **PERF-04**: Fontes auto-hospedadas (sem Google Fonts CDN) com font-display: swap
- [ ] **PERF-05**: Lighthouse Performance Score ≥ 90 em mobile

### Credibilidade

- [ ] **CRED-01**: Número de registro CREA visível na página Sobre e no rodapé
- [ ] **CRED-02**: Foto profissional da equipe/sócios na página Sobre
- [ ] **CRED-03**: Case study do projeto entregue com detalhes técnicos (não apenas foto)
- [ ] **CRED-04**: Seção "Como trabalhamos" com processo em etapas visível na home ou página Sobre

### Infraestrutura

- [x] **INFRA-01**: Build pipeline Vite 6.x configurado com suporte a múltiplas páginas HTML
- [x] **INFRA-02**: Deploy configurado no Netlify com HTTPS automático
- [x] **INFRA-03**: Estrutura de pastas preparada para adição futura de blog (/blog/) sem refatoração

## v2 Requirements

### Blog / Conteúdo

- **BLOG-01**: Artigos técnicos sobre pressurização de escadas (O que é, quando é obrigatório, NBR 9077 explicada)
- **BLOG-02**: Artigos sobre projeto hidráulico residencial vs industrial
- **BLOG-03**: Artigos sobre AVCB e laudos de bombeiros
- **BLOG-04**: FAQ dedicada por tipo de serviço baseada em dúvidas reais de clientes

### Analytics

- **ANLT-01**: Google Analytics 4 ou Plausible.io (LGPD-compliant) configurado
- **ANLT-02**: Google Search Console configurado e sitemap submetido
- **ANLT-03**: Eventos de conversão rastreados (cliques no WhatsApp, envios de formulário)

### Expansão

- **EXP-01**: Seção de depoimentos/avaliações de clientes
- **EXP-02**: Galeria de projetos com múltiplos portfolios conforme pipeline cresce
- **EXP-03**: Página de FAQ com perguntas frequentes de construtoras

## Out of Scope

| Feature | Reason |
|---------|--------|
| Blog com artigos técnicos | Conteúdo insuficiente no lançamento — estrutura preparada, publicação na v2 |
| Área do cliente / login | Fora do escopo de site institucional |
| E-commerce / pagamento online | Não aplicável ao modelo de negócio B2B de projetos |
| Chat em tempo real | WhatsApp cobre com custo zero de manutenção |
| Versão em inglês | Mercado nacional, não há demanda identificada |
| WordPress / CMS | Stack definido como HTML/CSS/JS puro para máxima performance |
| Animações pesadas / three.js | Prejudicam Core Web Vitals e parecem inadequados para público B2B de construção |

## Traceability

| Requirement | Phase | Phase Name | Status |
|-------------|-------|------------|--------|
| IDEN-01 | Phase 1 | Foundation & Design System | Complete (01-01) |
| IDEN-02 | Phase 1 | Foundation & Design System | Complete (01-01) |
| IDEN-03 | Phase 1 | Foundation & Design System | Complete (01-01) |
| IDEN-04 | Phase 1 | Foundation & Design System | Complete (01-01) |
| INFRA-01 | Phase 1 | Foundation & Design System | Complete (01-01) |
| INFRA-02 | Phase 1 | Foundation & Design System | Pending (01-02) |
| INFRA-03 | Phase 1 | Foundation & Design System | Complete (01-01) |
| PAGE-01 | Phase 2 | Home, Sobre & Credibility Shell | Pending |
| PAGE-06 | Phase 2 | Home, Sobre & Credibility Shell | Pending |
| PAGE-08 | Phase 2 | Home, Sobre & Credibility Shell | Pending |
| CRED-01 | Phase 2 | Home, Sobre & Credibility Shell | Pending |
| CRED-02 | Phase 2 | Home, Sobre & Credibility Shell | Pending |
| CRED-04 | Phase 2 | Home, Sobre & Credibility Shell | Pending |
| PAGE-02 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| PAGE-03 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| PAGE-04 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| SEO-01 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| SEO-02 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| SEO-05 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| SEO-06 | Phase 3 | Service Pages & SEO Nucleus | Pending |
| PAGE-05 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| PAGE-07 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| CONV-01 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| CONV-02 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| CONV-03 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| CONV-04 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| CRED-03 | Phase 4 | Portfolio, Conversion & Contact | Pending |
| SEO-03 | Phase 5 | Performance & Launch QA | Pending |
| SEO-04 | Phase 5 | Performance & Launch QA | Pending |
| PERF-01 | Phase 5 | Performance & Launch QA | Pending |
| PERF-02 | Phase 5 | Performance & Launch QA | Pending |
| PERF-03 | Phase 5 | Performance & Launch QA | Pending |
| PERF-04 | Phase 5 | Performance & Launch QA | Pending |
| PERF-05 | Phase 5 | Performance & Launch QA | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0

---
*Requirements defined: 2026-03-19*
*Last updated: 2026-03-19 — traceability finalized after roadmap creation*
