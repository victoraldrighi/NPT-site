# Phase 3: Service Pages & SEO Nucleus - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Criar as 3 páginas de serviço com conteúdo técnico completo (800-1200 words cada, citando as normas ABNT relevantes), implementar schema markup JSON-LD em todas as páginas do site, e completar o SEO on-page (meta tags únicas, og tags, canonical) em todas as páginas existentes e novas. As URLs seguem padrão semântico. O objetivo é que as páginas sejam elegíveis para ranqueamento orgânico desde o primeiro dia de indexação.

</domain>

<decisions>
## Implementation Decisions

### URLs Semânticas das Páginas de Serviço (SEO-01)
- Pressurização: `servicos/pressurizacao-escadas-emergencia/index.html` → URL `/servicos/pressurizacao-escadas-emergencia/`
- Hidráulica: `servicos/projetos-hidraulicos/index.html` → URL `/servicos/projetos-hidraulicos/`
- Elétrica: `servicos/projetos-eletricos/index.html` → URL `/servicos/projetos-eletricos/`
- Vite config: adicionar os 3 entry points em `rollupOptions.input`

### Meta Tags — Formato Exato (SEO-02)
Cada página deve ter meta tags únicas. Formato:

**Pressurização:**
- `<title>Pressurização de Escadas de Emergência | NPT Engenharia</title>` (54 chars)
- `<meta name="description" content="Projetos de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP. Aprovação na primeira vistoria. Atendimento nacional. Solicite orçamento.">` (155 chars)
- `<link rel="canonical" href="https://npt-site.netlify.app/servicos/pressurizacao-escadas-emergencia/">`

**Hidráulica:**
- `<title>Projetos Hidráulicos Prediais | NPT Engenharia</title>` (57 chars)
- `<meta name="description" content="Projetos hidráulicos prediais (NBR 5626/8160) para construtoras residenciais e industriais. Entrega ágil, preço competitivo. Solicite orçamento.">` (152 chars)
- `<link rel="canonical" href="https://npt-site.netlify.app/servicos/projetos-hidraulicos/">`

**Elétrica:**
- `<title>Projetos Elétricos de Baixa Tensão | NPT Engenharia</title>` (63 chars)
- `<meta name="description" content="Projetos elétricos de baixa tensão conforme NBR 5410 e NBR 5419. Laudos e ART para regularização. Atendimento nacional. Solicite orçamento.">` (144 chars)
- `<link rel="canonical" href="https://npt-site.netlify.app/servicos/projetos-eletricos/">`

**Home e outras páginas:** Também recebem canonical e og tags completas nesta fase.

### Open Graph Tags (SEO-02)
Todas as páginas do site (incluindo as criadas nas Phases 1 e 2) recebem:
```html
<meta property="og:title" content="[page title]">
<meta property="og:description" content="[meta description]">
<meta property="og:type" content="website">
<meta property="og:url" content="[canonical URL]">
<meta property="og:image" content="https://npt-site.netlify.app/og-image.png">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="NPT Engenharia">
```
`og-image.png`: criar placeholder 1200×630px em navy com logo NPT — colocar em `public/og-image.png`

### Schema Markup JSON-LD (SEO-05)

**Home (index.html) — ProfessionalService:**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "NPT Engenharia",
  "description": "Empresa especializada em projetos de pressurização de escadas de emergência, sistemas hidráulicos prediais e instalações elétricas de baixa tensão.",
  "url": "https://npt-site.netlify.app",
  "logo": "https://npt-site.netlify.app/favicon.svg",
  "areaServed": {"@type": "Country", "name": "Brasil"},
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de Engenharia",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Pressurização de Escadas de Emergência"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Projetos Hidráulicos Prediais"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Projetos Elétricos de Baixa Tensão"}}
    ]
  },
  "contactPoint": {"@type": "ContactPoint", "contactType": "sales", "availableLanguage": "Portuguese"}
}
```

**Cada página de serviço — Service + BreadcrumbList + FAQPage:**
```json
// Service schema (exemplo para pressurização)
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pressurização de Escadas de Emergência",
  "description": "Projeto técnico de pressurização de escadas conforme NBR 9077 e IT 11 do CBPMESP.",
  "provider": {"@type": "ProfessionalService", "name": "NPT Engenharia", "url": "https://npt-site.netlify.app"},
  "areaServed": {"@type": "Country", "name": "Brasil"},
  "serviceType": "Engenharia de Segurança Predial"
}
// BreadcrumbList
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://npt-site.netlify.app"},
    {"@type": "ListItem", "position": 2, "name": "Serviços", "item": "https://npt-site.netlify.app/servicos/"},
    {"@type": "ListItem", "position": 3, "name": "Pressurização de Escadas"}
  ]
}
// FAQPage (3 perguntas por serviço)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Quando a pressurização de escada é obrigatória?", "acceptedAnswer": {"@type": "Answer", "text": "..."}},
    ...
  ]
}
```

### Estrutura de Conteúdo das Páginas de Serviço (800-1200 words)
Cada página segue exatamente esta estrutura H1/H2/H3:

```
<h1>[Título do Serviço]</h1>                           (~20 words)
<section> Introdução                                    (~150 words)
<h2>Quando é obrigatório</h2>                          (~150 words + referência NBR)
<h2>Como desenvolvemos o projeto</h2>                  (~200 words — processo NPT)
<h2>Especificações técnicas</h2>                       (~150 words — lista ou tabela)
<h2>Por que escolher a NPT Engenharia</h2>             (~150 words — diferenciais)
<h2>Perguntas frequentes</h2>                          (FAQ com 3 Q&A, ~200 words)
<section class="service-cta"> CTA final                (botão + WhatsApp)
```

**Normas por serviço:**
- Pressurização: NBR 9077 (escadas de emergência) + IT 11 CBPMESP (instrução técnica do Corpo de Bombeiros SP)
- Hidráulica: NBR 5626 (instalações prediais de água fria) + NBR 8160 (sistemas prediais de esgoto sanitário) + NBR 7198 (projetos e execução de instalações prediais de água quente)
- Elétrica: NBR 5410 (instalações elétricas de baixa tensão) + NBR 5419 (proteção de estruturas contra descargas atmosféricas — SPDA)

### Navegação — Atualização (SEO + UX)
- Atualizar os 3 `href="#"` dos service cards na homepage para as URLs reais
- No `<nav>`, adicionar as 3 páginas de serviço como links diretos (não dropdown — CSS dropdown sem JS é frágil em mobile):
  ```html
  <li><a href="/servicos/pressurizacao-escadas-emergencia/">Pressurização</a></li>
  <li><a href="/servicos/projetos-hidraulicos/">Hidráulica</a></li>
  <li><a href="/servicos/projetos-eletricos/">Elétrica</a></li>
  ```
- Nota: isso pode tornar o nav muito longo em mobile — agrupar visualmente com separador CSS ou manter dentro do hamburger menu

### Breadcrumb HTML Visível
Além do schema, cada página de serviço exibe breadcrumb visual:
```html
<nav aria-label="Navegação estrutural" class="breadcrumb">
  <ol role="list">
    <li><a href="/">Home</a></li>
    <li aria-hidden="true">›</li>
    <li><span>Pressurização de Escadas de Emergência</span></li>
  </ol>
</nav>
```

### CSS Component Novo
- `src/css/components/service-page.css` — layout da página de serviço (hero compacto, breadcrumb, article, FAQ accordion CSS-only, CTA section)
- FAQ accordion: CSS-only usando `<details>/<summary>` — sem JS, acessível nativamente

### og:image Placeholder
- Arquivo: `public/og-image.png` (1200×630px)
- Gerar via script HTML→canvas ou simplesmente um SVG convertido — pode ser navy com texto "NPT Engenharia" e logo em branco
- Usar mesmo arquivo para todas as páginas até ter fotos reais

### Soluções 100% Gratuitas
- Schema markup: JSON-LD inline nos `<script type="application/ld+json">` — zero dependência
- og:image: arquivo estático — zero CDN
- FAQ: `<details>/<summary>` nativo — zero JS library

### Claude's Discretion
- Wording exato do conteúdo das páginas (800-1200 words por serviço)
- Wording exato das perguntas e respostas do FAQ
- Wording exato dos diferenciais NPT por serviço
- Exata implementação visual do accordion FAQ
- Breadcrumb visual styling

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System (MANDATORY)
- `src/css/tokens.css` — usar var() em todo CSS novo
- `src/css/base.css` — .container class e estilos base
- `src/js/main.js` — adicionar import de service-page.css aqui
- `index.html` — referência de estrutura HTML (header, footer, script tag) para replicar nas novas páginas

### Páginas Existentes para Atualizar
- `index.html` — adicionar og tags, canonical, ProfessionalService schema, atualizar href dos service cards
- `sobre/index.html` — adicionar og tags e canonical
- `obrigado/index.html` — adicionar og tags e canonical

### Requisitos da Fase
- `.planning/REQUIREMENTS.md` — PAGE-02, PAGE-03, PAGE-04, SEO-01, SEO-02, SEO-05, SEO-06
- `.planning/ROADMAP.md` — Success criteria da Phase 3

### Contexto das Fases Anteriores
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md` — tokens, stack, soluções gratuitas
- `.planning/phases/02-home-sobre-and-credibility-shell/02-CONTEXT.md` — padrões HTML/CSS estabelecidos

### Configuração
- `vite.config.js` — adicionar 3 novos entry points para páginas de serviço

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/css/components/header.css` — header sticky, hamburger CSS-only — copiar estrutura nas novas páginas
- `src/css/components/footer.css` — footer com CREA — copiar nas novas páginas
- `src/css/components/buttons.css` — `.btn`, `.btn--primary`, `.btn--secondary` — usar nos CTAs
- `src/css/components/hero.css` — hero compacto pode ser adaptado para service page hero
- `src/css/components/how-we-work.css` — padrão de seção com steps numerados (reutilizável)

### Established Patterns
- Toda página HTML importa `src/js/main.js` como `type="module"`
- Mobile-first: `@media (min-width: 48rem)` tablet, `@media (min-width: 80rem)` desktop
- `.container` class para max-width 1200px
- Sem hex hardcoded — tudo via `var()` tokens
- SVG icons: inline, `aria-hidden="true"`, `fill="currentColor"`

### Integration Points
- `index.html` service cards: 3 `href="#"` a atualizar para URLs reais
- `vite.config.js`: adicionar `servicos/pressurizacao-escadas-emergencia/index.html`, `servicos/projetos-hidraulicos/index.html`, `servicos/projetos-eletricos/index.html` ao `rollupOptions.input`
- Nav links: adicionar links para as 3 páginas de serviço no nav existente (em todas as páginas)
- `src/js/main.js`: adicionar `import './css/components/service-page.css'`

</code_context>

<specifics>
## Specific Ideas

- Usuário quer MÁXIMO SEO — tratar esta fase como o núcleo de SEO do site
- FAQPage schema é especialmente valioso para featured snippets no Google Brasil
- BreadcrumbList melhora CTR nos resultados de busca (Google exibe breadcrumb no snippet)
- Conteúdo técnico com citações de normas NBR específicas → alta relevância para buscas de engenheiros e arquitetos
- `<details>/<summary>` para FAQ: acessível nativamente, sem JS, sem CLS (conteúdo não desaparece no CLS)
- og:image 1200×630px é o tamanho canônico para compartilhamento no WhatsApp e LinkedIn (canais frequentes para B2B de construção)

</specifics>

<deferred>
## Deferred Ideas

- sitemap.xml e robots.txt — Phase 5 (Performance & Launch QA)
- Google Search Console submission — v2 (ANLT-02)
- Hreflang (versão em inglês) — fora do escopo v1
- Structured data para Reviews/Ratings — sem avaliações disponíveis no lançamento
- Conteúdo de blog com artigos técnicos — v2 (BLOG-01 a BLOG-04)

</deferred>

---

*Phase: 03-service-pages-seo-nucleus*
*Context gathered: 2026-03-19*
