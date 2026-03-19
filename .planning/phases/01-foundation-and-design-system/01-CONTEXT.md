# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Configurar o scaffold Vite 6.x, definir e implementar o sistema de tokens CSS (cores, tipografia, espaçamento), fazer o deploy inicial no Netlify, e travar a identidade visual que todas as fases seguintes herdarão. Nenhuma página de conteúdo real é criada nesta fase — apenas a fundação técnica e visual.

</domain>

<decisions>
## Implementation Decisions

### Identidade Visual — Paleta de Cores
- Primary: `#1B3A6B` (NPT navy) — transmite autoridade, setor de engenharia B2B
- Accent: `#F5A623` (amber) — CTA, hover states, destaques
- Background: `#F8F9FA` (off-white) — evita branco puro que cansa a leitura
- Surface: `#FFFFFF` (cards, formulários)
- Text dark: `#1A1A2E`
- Text muted: `#6B7280`
- Success/feedback: `#10B981`
- Tokens definidos como CSS custom properties em `src/css/tokens.css`

### Identidade Visual — Tipografia
- Fonte: Inter (self-hosted via `@fontsource/inter`) — elimina Google Fonts CDN, LGPD-compliant, gratuito (MIT)
- Weights: 400, 500, 600, 700 (apenas os usados, para manter bundle mínimo)
- Scale modular (base 16px): xs 12px, sm 14px, base 16px, lg 18px, xl 20px, 2xl 24px, 3xl 30px, 4xl 36px, 5xl 48px
- Line-height: 1.5 para corpo, 1.2 para headings
- Font tokens em `src/css/tokens.css`

### Identidade Visual — Espaçamento
- Escala 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Tokens: `--space-1` (4px) até `--space-32` (128px)
- Max-width conteúdo: 1200px, padding lateral mobile: 16px, tablet: 24px, desktop: 32px

### Estrutura de Arquivos Vite
```
/
├── index.html                 # Stub page (deploy validation)
├── vite.config.js             # Multi-page entry points
├── package.json
├── src/
│   ├── css/
│   │   ├── tokens.css         # Custom properties (cores, tipo, espaçamento)
│   │   ├── base.css           # Reset + tipografia base + utilidades globais
│   │   └── components/        # CSS por componente (header.css, footer.css, etc.)
│   ├── js/
│   │   └── main.js            # Entry point JS (mínimo na Phase 1)
│   └── assets/
│       ├── logo/              # SVG + PNG do logo
│       └── fonts/             # @fontsource/inter (ou node_modules, conforme setup)
├── blog/                      # Diretório vazio (scaffold para v2 — INFRA-03)
└── public/
    └── (favicon, robots.txt placeholder)
```

### Logo
- Usar logo existente do cliente como referência primária (IDEN-02)
- Formato SVG inline no header — zero request extra, controle total de cor/escala
- Versão dark (sobre background claro) e light (sobre navy) definidas via CSS custom properties
- PNG/WebP como fallback para og:image e contexts que não suportam SVG inline

### Stub Page (Deploy de Validação)
- HTML mínimo com identidade visual já aplicada: logo, tokens de cor e fonte carregados
- Mensagem: "Site em desenvolvimento — em breve" em pt-BR
- Propósito: validar visualmente que tokens.css funciona no Netlify antes das páginas reais
- Não é uma landing page — é apenas proof-of-deploy

### Breakpoints Responsivos (IDEN-04)
- Mobile: 375px (base — mobile-first)
- Tablet: 768px
- Desktop: 1280px
- Definidos como tokens CSS: `--bp-tablet: 768px`, `--bp-desktop: 1280px`

### Soluções Gratuitas (restrição do usuário)
- Vite 6.x: MIT — gratuito
- Netlify free tier: deploy automático via git push, HTTPS, Netlify Forms incluídos
- @fontsource/inter: MIT — gratuito, self-hosted
- Netlify Forms: gratuito até 100 submissions/mês (suficiente para v1 B2B)
- Sem serviços pagos na Phase 1

### Claude's Discretion
- Detalhes do reset CSS (preferir minimal reset sobre normalize.css)
- Configuração exata do Vite (plugins, resolvers)
- Estrutura interna do vite.config.js
- Variáveis CSS para border-radius, shadow, transition padrão
- Configuração do .gitignore e .netlifyignore

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos da Fase
- `.planning/REQUIREMENTS.md` — Requisitos IDEN-01, IDEN-02, IDEN-03, IDEN-04, INFRA-01, INFRA-02, INFRA-03 com critérios de aceitação exatos
- `.planning/ROADMAP.md` — Success criteria da Phase 1 (5 critérios verificáveis)

### Contexto do Projeto
- `.planning/PROJECT.md` — Stack constraints, contexto do cliente, decisões chave

No external ADRs or specs yet — requirements fully captured in decisions above and REQUIREMENTS.md.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Nenhum código existente — projeto greenfield. Phase 1 CRIA os padrões que fases seguintes reutilizarão.

### Established Patterns
- Nenhum padrão existente — Phase 1 é a fonte de verdade para:
  - Como tokens CSS são nomeados e usados
  - Como HTML é estruturado (semântica, BEM ou utility-first?)
  - Como JS é modularizado

### Integration Points
- Fases 2-5 herdam `tokens.css` — qualquer mudança de token após Phase 1 requer refatoração em cascata
- Netlify Forms configurado na Phase 1 é reutilizado na Phase 4 (formulário de contato)
- Estrutura `/blog/` criada na Phase 1 é populada na v2

</code_context>

<specifics>
## Specific Ideas

- Usuário quer soluções 100% gratuitas — Netlify free tier + @fontsource/inter + Vite open source cobrem tudo
- Paleta navy + amber é proposta para o setor de engenharia B2B: sério mas não pesado, técnico mas acessível
- Inter é a fonte de referência para SaaS/B2B tech moderno — legível em densidades altas, excelente hinting
- Deploy automático via git push ao Netlify valida o pipeline antes de qualquer conteúdo real

</specifics>

<deferred>
## Deferred Ideas

- Analytics (GA4/Plausible) — v2, ANLT-01
- Google Search Console — v2, ANLT-02
- Dark mode toggle — fora do escopo v1
- Animações de entrada (AOS, Framer) — fora do escopo (prejudicam CWV e parecem inadequados para B2B de construção)

</deferred>

---

*Phase: 01-foundation-and-design-system*
*Context gathered: 2026-03-19*
