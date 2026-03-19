# Phase 2: Home, Sobre & Credibility Shell - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Criar a Homepage completa (hero + seções de conteúdo + footer), a Página Sobre (engenheiro + CREA + missão + diferenciais), e a página /obrigado/ pós-formulário. Tudo usando o design system da Phase 1. Nenhum formulário funcional nesta fase (Phase 4) — apenas estrutura HTML + links de navegação.

</domain>

<decisions>
## Implementation Decisions

### Hero da Homepage
- Background: `var(--color-brand-primary)` navy sólido — sem imagem de hero (evita LCP ruim, foco no texto)
- Headline: foco em resultado, não em serviço — ex: "Projetos de engenharia que aprovam na primeira vistoria"
- Sub-headline: 2 linhas explicando o que a NPT faz — pressurização de escadas, projetos hidráulicos e elétricos
- CTA principal: botão amber "Solicitar Orçamento" — âncora `#contato` (placeholder para Phase 4)
- CTA secundário: link WhatsApp com ícone SVG inline — número placeholder `+55 (11) 9 0000-0000` (cliente vai substituir)
- Mobile (375px): headline font-size 2xl (24px), CTA full-width, hero height auto (não vh fixo)
- Desktop: headline 4xl–5xl (36–48px), CTAs lado a lado, padding vertical generoso

### Seções da Homepage (ordem fixa)
1. **Hero** — proposta de valor + duplo CTA
2. **Serviços** — 3 cards (Pressurização, Hidráulica, Elétrica) com ícone SVG, título, 2 linhas de descrição, link "Saiba mais" (href para Phase 3 pages — placeholder `#`)
3. **Como trabalhamos** — 4 etapas numeradas: Contato → Análise do projeto → Desenvolvimento → Entrega e aprovação
4. **Projeto destaque** — teaser do único case disponível: título, cidade, tipo de projeto, link "Ver portfólio" (href para Phase 4 — placeholder `#`)
5. **Footer** — logo, CREA, email placeholder, telefone placeholder, copyright 2026

### Estrutura de Arquivos (novas páginas)
- `index.html` — substituir stub pela Homepage real
- `sobre/index.html` — Página Sobre (URL: /sobre/)
- `obrigado/index.html` — Página /obrigado/ (URL: /obrigado/)
- `src/css/components/hero.css` — estilos do hero
- `src/css/components/services-grid.css` — grid de serviços
- `src/css/components/how-we-work.css` — seção de etapas
- `src/css/components/case-teaser.css` — mini-case
- `src/css/components/footer.css` — footer global
- `src/css/components/about.css` — estilos da página Sobre
- `vite.config.js` — adicionar `sobre/index.html` e `obrigado/index.html` como entry points

### Página Sobre
- Estrutura: foto do engenheiro (img com placeholder se não disponível) + nome + CREA com link CONFEA + especialização
- Link CREA: `https://www.confea.org.br/` (busca pública do CONFEA) — número real fornecido pelo cliente
- Tom: técnico mas acessível — "Somos especializados em projetos de pressurização de escadas de emergência (NBR 9077), sistemas hidráulicos prediais e instalações elétricas de baixa tensão"
- Missão: 1 parágrafo — estrutura enxuta = melhor custo-benefício, atendimento nacional, compromisso com normas ABNT
- Diferenciais: 4 bullets com ícone SVG inline:
  - Estrutura enxuta = preço competitivo sem perder qualidade técnica
  - Projetos entregues remotamente para todo o Brasil
  - Especialização profunda em NBR 9077, NBR 5626, NBR 5410
  - Aprovação na primeira vistoria como meta em cada projeto
- Foto: `<img src="/src/assets/images/engenheiro.jpg" alt="[Nome] — Engenheiro responsável, CREA [número]">` — placeholder com dimensions fixas width/height para evitar CLS

### Página /obrigado/
- Conteúdo simples: ícone de check SVG, "Mensagem recebida!", "Entraremos em contato em breve", link "Voltar para o início"
- Sem header de navegação completo — apenas logo linkado à home
- Propósito: confirmar envio de formulário para o visitante (Netlify Forms redireciona aqui)

### "Como trabalhamos" — Layout
- 4 steps numerados com número grande em amber, título, descrição curta
- Desktop: layout horizontal (flexbox row) com linha conectora decorativa entre steps
- Mobile: layout vertical (flexbox column), sem linha conectora
- Steps: 1. Contato inicial, 2. Análise do projeto, 3. Desenvolvimento do projeto, 4. Entrega e aprovação

### Ícones
- SVG inline em todo o site — zero dependência de biblioteca externa (Heroicons/Font Awesome = não)
- Ícones por serviço: chama/fogo (pressurização), gota d'água (hidráulica), raio/elétrica (elétrica)
- Ícones nos diferenciais: checkmark, globe, documento técnico, aprovação
- Todos os SVGs devem ter `aria-hidden="true"` (decorativos) ou `aria-label` (informativos)

### Navegação (header global)
- Links: Home | Serviços ▾ (dropdown placeholder, sem JS — apenas anchor links) | Sobre | Contato
- Mobile: hamburger menu simples com CSS only (checkbox hack) — sem JS
- Active state: link sublinhado baseado em página atual (via class no `<body>`)
- Header sticky no topo com `position: sticky; top: 0; z-index: 100`

### Dados Placeholder (cliente vai substituir)
- Nome do engenheiro: "[Nome do Engenheiro]"
- CREA: "[CREA-SP 000000-D]"
- WhatsApp: "+55 (11) 9 0000-0000"
- Email: "contato@nptengenharia.com.br" (placeholder)
- Telefone: "(11) 0000-0000" (placeholder)
- Foto: usar `width="400" height="400"` com `object-fit: cover` e background navy como fallback

### Soluções Gratuitas (continuidade da Phase 1)
- Sem JS libraries para menu mobile — CSS only
- Sem icon libraries — SVG inline
- Sem fonts extras — Inter já carregado

### Claude's Discretion
- Número exato de colunas no grid de serviços (2 col mobile → 3 col desktop)
- Border-radius e shadow dos cards de serviço
- Exata wording das descrições de serviço (2 linhas técnicas por serviço)
- Exata wording das etapas do "Como trabalhamos"
- Wording do hero headline e sub-headline
- Ordem dos diferenciais

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System (Phase 1 — MANDATORY)
- `src/css/tokens.css` — custom properties de cor, tipografia, espaçamento que DEVEM ser usados em todo CSS desta fase
- `src/css/base.css` — reset e estilos base já aplicados
- `src/js/main.js` — entry point JS, imports de fontes — adicionar novos imports aqui

### Requisitos da Fase
- `.planning/REQUIREMENTS.md` — PAGE-01, PAGE-06, PAGE-08, CRED-01, CRED-02, CRED-04 com critérios exatos
- `.planning/ROADMAP.md` — Success criteria da Phase 2 (5 critérios verificáveis)

### Contexto do Projeto
- `.planning/PROJECT.md` — contexto do cliente, público-alvo, constraints
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md` — decisões de identidade visual travadas

### Configuração Vite
- `vite.config.js` — adicionar entry points para novas páginas neste arquivo

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/css/tokens.css` — todos os tokens de cor, tipografia e espaçamento. USAR via `var()` em todo CSS novo
- `src/css/base.css` — reset, `.container` class (max-width 1200px, padding lateral responsivo), tipografia base
- `index.html` — estrutura atual (stub): header com SVG logo, main, footer, script type=module
- `src/js/main.js` — entry point com imports de fontsource Inter (4 weights) + tokens.css + base.css

### Established Patterns (da Phase 1)
- `.container` class já definida em base.css — usar para todos os wrappers de largura máxima
- Header usa `background-color: var(--color-brand-primary)` + logo SVG inline `currentColor`
- Footer usa `background-color: var(--color-brand-primary)` + texto claro
- Mobile-first: estilos base para 375px, `@media (min-width: 48rem)` para tablet, `@media (min-width: 80rem)` para desktop
- Sem CSS vars em @media queries — usar rem literais (48rem, 80rem)

### Integration Points
- `vite.config.js` usa `build.rollupOptions.input` para multi-page — adicionar `sobre/index.html` e `obrigado/index.html`
- Cada nova página HTML importa `src/js/main.js` como `type="module"` (carrega tokens + fontes automaticamente)
- Footer com CREA aparece em TODAS as páginas desta fase (PAGE-01, PAGE-06, PAGE-08)

</code_context>

<specifics>
## Specific Ideas

- Usuário delegou todas as decisões — Claude tem liberdade total dentro do contexto B2B de engenharia
- Empresa nova = credibilidade é o tema central desta fase: CREA visível, NBR references, processo claro
- Público duplo: engenheiros querem ver normas e competência técnica; donos de construtora querem ver confiança e preço
- Hero sem imagem: decisão intencional para garantir LCP rápido (imagem de hero seria o maior LCP element)
- CSS-only hamburger menu: sem JS = sem hydration overhead, funciona sem JavaScript habilitado

</specifics>

<deferred>
## Deferred Ideas

- Menu dropdown com JS/animação suave — fora do escopo v1 (CSS only suficiente)
- Depoimentos/avaliações de clientes — v2, EXP-01 (sem depoimentos disponíveis no lançamento)
- Galeria de fotos de projetos — Phase 4 (portfolio)
- FAQ — v2, EXP-03
- Animações de entrada (scroll-triggered) — fora do escopo (prejudicam CWV)

</deferred>

---

*Phase: 02-home-sobre-and-credibility-shell*
*Context gathered: 2026-03-19*
