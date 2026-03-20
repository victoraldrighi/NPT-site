# Phase 5: Performance & Launch QA - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Otimização final antes do go-live: Core Web Vitals verde no mobile, Lighthouse Performance ≥ 90 na homepage e em pelo menos uma página de serviço, sitemap.xml e robots.txt corretos, Google Analytics 4 instalado, e conversão end-to-end validada. Fase é um hard gate — nada sobe para produção sem esses critérios passando.

</domain>

<decisions>
## Implementation Decisions

### Domínio & Sitemap
- **Domínio final:** `https://nptengenharia.com.br` — usar este domínio em TODAS as URLs absolutas do sitemap e canonical (não `npt-site.netlify.app`)
- **Sitemap.xml:** `/public/sitemap.xml` — gerado estaticamente, listando todas as 8 páginas indexáveis
- **Páginas incluídas no sitemap:** `/`, `/sobre/`, `/servicos/pressurizacao-escadas-emergencia/`, `/servicos/projetos-hidraulicos/`, `/servicos/projetos-eletricos/`, `/portfolio/`, `/contato/`
- **Páginas excluídas do sitemap:** `/obrigado/` (página de thank-you não deve ser indexada — não agrega valor de busca)
- **Prioridades sugeridas:** homepage `1.0`, serviços `0.9`, portfolio/contato/sobre `0.8`
- **Changefreq:** `monthly` para todas as páginas (conteúdo técnico estável)
- **robots.txt:** permitir Googlebot em tudo (`User-agent: * / Allow: /`), `Disallow: /obrigado/` para excluir da indexação, `Sitemap: https://nptengenharia.com.br/sitemap.xml`

### Canônicos — Atualização de Domínio
- Todos os `<link rel="canonical">` e `og:url` nas 8 páginas estão apontando para `npt-site.netlify.app`
- **Decisão:** atualizar para `https://nptengenharia.com.br` em todas as páginas nesta fase
- Isso afeta: canonical link, og:url, og:image (URL absoluta da og-image.png), JSON-LD `url` e `logo` fields

### Otimizações de Performance (Core Web Vitals)

**LCP — Largest Contentful Paint:**
- Hero da homepage é texto puro (sem imagem) — LCP element será o `<h1>` ou `<p>` do hero — já está ótimo por padrão
- Foto do engenheiro em `/sobre/` ainda é placeholder — não bloquear LCP; adicionar `loading="lazy"` e `fetchpriority="low"` para não competir com conteúdo above-fold
- Nenhuma imagem hero a otimizar — excelente baseline para LCP < 2.5s

**CLS — Cumulative Layout Shift:**
- `<img>` na foto do engenheiro já tem `width="400" height="400"` explícitos — CLS zero neste elemento
- Verificar que `@fontsource/inter` tem `font-display: swap` habilitado — evita FOIT
- Sem skeleton loaders nem elementos que aparecem tardiamente

**INP — Interaction to Next Paint:**
- Sem JavaScript bloqueante no critical path (puro HTML/CSS)
- Hamburger menu via CSS-only checkbox — zero JS
- FAQ accordion via `<details>/<summary>` — zero JS
- Único JS é main.js (CSS imports + fontsource) — impacto mínimo no INP

**netlify.toml — Cache Headers:**
- Criar `netlify.toml` na raiz com headers de cache otimizados:
  - Assets hashed (CSS/JS em `/_assets/`): `Cache-Control: public, max-age=31536000, immutable`
  - HTML: `Cache-Control: no-cache` (revalidar sempre para garantir conteúdo fresco)
  - Fontes (`/assets/`): `Cache-Control: public, max-age=31536000, immutable`
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` — headers de segurança básicos

**Preconnect/Preload:**
- Fontes são self-hosted (nenhum preconnect para Google Fonts necessário)
- Sem CDN externo — nenhum preconnect necessário
- ~~`<link rel="preload">` para fonte Inter 400 (peso mais usado) no `<head>` de todas as páginas~~ **REVISADO:** Font preload skipped. RESEARCH.md encontrou que o filename hash da fonte muda a cada rebuild do CSS (`inter-latin-400-normal-Cxxxxxxx.woff2`), criando risco de manutenção (preload stale = double fetch = pior performance). `@fontsource/inter` já inclui `font-display:swap` em todas as declarações @font-face (verificado no CSS compilado), prevenindo FOIT. O intent original do preload (reduzir FOIT) já está coberto por font-display:swap.

### Google Analytics 4
- **Measurement ID:** `G-N6NX09NWHS`
- **Implementação:** snippet `gtag.js` inline no `<head>` de todas as 8 páginas (antes do `</head>`)
- **Banner de cookies:** não implementar nesta fase — MVP sem LGPD compliance completo; adicionar banner na v2
- **Eventos rastreados nesta fase:** pageview automático (via gtag default) — eventos customizados (clique WhatsApp, envio formulário) são ANLT-01/03, deferred para v2
- **Google Search Console:** configurar após deploy com domínio real — fora do escopo do código, ação manual do cliente

### Checklist de Launch (Hard Gate)
Os seguintes itens devem ser confirmados antes de marcar a fase como completa:
1. `npm run build` exits 0 sem warnings
2. `/sitemap.xml` acessível e válido (8 URLs, excluindo /obrigado/)
3. `/robots.txt` acessível e correto
4. GA4 snippet presente em todas as 8 páginas (grep por `G-N6NX09NWHS`)
5. Canonical/og:url atualizado para `nptengenharia.com.br` em todas as páginas
6. PageSpeed Insights mobile >= 90 na homepage (manual, pós-deploy)
7. LCP < 2.5s, CLS < 0.1, INP < 200ms (manual, PageSpeed Insights)

### Claude's Discretion
- Estrutura exata do `netlify.toml` (path patterns, header syntax)
- Formato exato das datas `<lastmod>` no sitemap (ISO 8601: `2026-03-20`)
- Posição do snippet GA4 no `<head>` (após title/meta, antes de scripts)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System (MANDATORY)
- `src/css/tokens.css` — tokens globais, não adicionar hex hardcoded
- `src/js/main.js` — adicionar import do novo CSS component aqui se necessário

### Páginas a Atualizar (canonical/og:url/JSON-LD)
- `index.html` — home
- `sobre/index.html`
- `obrigado/index.html`
- `contato/index.html`
- `portfolio/index.html`
- `servicos/pressurizacao-escadas-emergencia/index.html`
- `servicos/projetos-hidraulicos/index.html`
- `servicos/projetos-eletricos/index.html`

### Requisitos da Fase
- `.planning/REQUIREMENTS.md` — PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, SEO-03, SEO-04
- `.planning/ROADMAP.md` — Success criteria da Phase 5

### Infraestrutura
- `vite.config.js` — configuração do build; entender output paths para configurar cache headers corretos no netlify.toml
- `package.json` — dependências instaladas

### Fases Anteriores
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md` — tokens, stack, Netlify free tier
- `.planning/phases/03-service-pages-seo-nucleus/03-CONTEXT.md` — padrão canonical/og já implementado (a ser atualizado para novo domínio)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/js/main.js` — ponto de entrada JS; GA4 snippet vai no HTML `<head>`, não aqui
- `public/` — arquivos colocados aqui são copiados para `dist/` verbatim — usar para `sitemap.xml` e `robots.txt`

### Established Patterns
- Self-hosted fonts via `@fontsource/inter` (4 pesos: 400, 500, 600, 700) — já garante PERF-04
- Hero da homepage sem imagem — LCP element será texto, que por definição já é fast
- `<img>` da foto do engenheiro em `/sobre/` tem `width="400" height="400"` — CLS zero
- `netlify.toml` não existe ainda — criar do zero na raiz do projeto

### Integration Points
- `public/sitemap.xml` → copiado para `dist/sitemap.xml` → acessível em `/sitemap.xml`
- `public/robots.txt` → copiado para `dist/robots.txt` → acessível em `/robots.txt`
- `netlify.toml` na raiz → lido pelo Netlify no deploy (não faz parte do `dist/`)
- GA4 snippet: adicionar em todas as 8 páginas HTML no `<head>` antes do `</head>`
- Canonical URLs: buscar e substituir `npt-site.netlify.app` → `nptengenharia.com.br` em todos os arquivos HTML e JSON-LD

</code_context>

<specifics>
## Specific Ideas

- Domínio real é `nptengenharia.com.br` — canonical update é o item de maior impacto SEO desta fase
- GA4 Measurement ID real fornecido: `G-N6NX09NWHS` — implementar diretamente, sem placeholder
- `/obrigado/` excluída do sitemap e disallowed no robots.txt — evita indexação de página de thank-you
- netlify.toml com cache headers longos em assets hashed (`immutable`) melhora significativamente o Lighthouse Performance Score
- Font preload skipped — `@fontsource/inter` already provides `font-display:swap` which prevents FOIT; preload hash instability creates maintenance risk that outweighs the marginal LCP benefit on a text-hero site

</specifics>

<deferred>
## Deferred Ideas

- Banner de cookies LGPD compliant — v2 (quando analytics compliance for prioritizado)
- Eventos GA4 customizados (clique WhatsApp, envio formulário) — v2, ANLT-01/03
- Google Search Console configuração e sitemap submission — ação manual pós-deploy pelo cliente (ANLT-02)
- WebP conversion pipeline para foto do engenheiro — quando arquivo real estiver disponível

</deferred>

---

*Phase: 05-performance-launch-qa*
*Context gathered: 2026-03-20*
