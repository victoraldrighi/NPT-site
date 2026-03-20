# Phase 4: Portfolio, Conversion & Contact - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Completar o funil de conversão: criar a página /portfolio/ com o único case study técnico, criar a página /contato/ com formulário funcional (Netlify Forms), implementar botão WhatsApp flutuante (estrutura criada mas desativada — habilitável sem código), e adicionar telefone no header e email no footer como links clicáveis em todas as páginas.

</domain>

<decisions>
## Implementation Decisions

### Formulário de Contato (/contato/)

- **URL:** `/contato/` — página dedicada e indexável, não apenas âncora #contato
- **Campos:** 5 campos no total:
  1. Nome (obrigatório)
  2. Email (obrigatório)
  3. Telefone (obrigatório)
  4. Tipo de projeto: `<select>` com opções (Pressurização de Escadas, Projeto Hidráulico, Projeto Elétrico, Outro) — quando "Outro" selecionado, campo de texto livre aparece ou o próprio select inclui campo adicional. Implementação: `<select>` + campo condicional CSS-only via `:has()` ou simplesmente campo de texto sempre visível após select.
  5. Mensagem (obrigatório)
- **Backend:** Netlify Forms — `netlify` attribute no `<form>`, `data-netlify="true"`, redirect para `/obrigado/`
- **Campos obrigatórios:** Nome, Email, Tipo de projeto e Mensagem são obrigatórios. Telefone também obrigatório (usuário decidiu incluí-lo nos campos).
- **Vite entry point:** `contato/index.html` adicionado ao `rollupOptions.input`
- **SEO:** meta title e description únicos, canonical `/contato/`

### WhatsApp Flutuante (CONV-01)

- **Status atual:** Empresa não tem WhatsApp dedicado ainda — botão criado mas **desativado**
- **Implementação:** HTML criado com `hidden` attribute ou classe `whatsapp-btn--disabled` que esconde o elemento. Para habilitar: remover `hidden` (ou trocar classe) e preencher o número no `href`
- **Quando ativado:** posição fixed bottom-right, z-index alto, visível em todo scroll em todas as páginas
- **Link format quando ativado:** `https://wa.me/5511900000000?text=Ol%C3%A1%2C+vim+pelo+site+da+NPT+Engenharia+e+gostaria+de+solicitar+um+or%C3%A7amento.`
- **Ícone:** SVG inline Bootstrap Icons bi-whatsapp (MIT), aria-hidden quando desativado
- **CSS component:** `src/css/components/whatsapp-btn.css`

### Portfolio / Case Study (/portfolio/)

- **URL:** `/portfolio/` — página dedicada, indexável
- **Conteúdo:** textual com dados técnicos completos — sem foto da obra (edifício ainda não construído)
- **Resultado enquadrado como:** "Projeto técnico completo entregue dentro do prazo, aprovado pelo engenheiro responsável e pronto para execução" — honesto, sem afirmar aprovação em vistoria (obra não ocorreu)
- **Estrutura da página:**
  ```
  <h1>Portfólio de Projetos</h1>
  <section class="portfolio-case">
    <h2>[Nome/Tipo do Projeto]</h2>
    Tipo de edificação | Cidade, Estado | Ano
    Normas aplicadas: NBR [X]
    Escopo de entrega: [lista]
    Resultado: Projeto técnico completo entregue...
    <p class="portfolio-note">Foto da obra em breve após conclusão da construção.</p>
  </section>
  <section class="portfolio-cta">CTA para orçamento</section>
  ```
- **Schema markup:** `ItemList` com 1 item (escalonável para múltiplos projetos) — `ListItem` com name, description, url
- **Futuro:** estrutura HTML permite adicionar mais `<article>` ou `<section class="portfolio-case">` à medida que novos projetos forem entregues
- **Dados:** usuário possui todos os dados técnicos do projeto — Claude usa placeholders `[TIPO DE EDIFICAÇÃO]`, `[CIDADE]`, `[ANO]`, `[NORMAS]`, `[ESCOPO]` para o executor preencher com os dados reais fornecidos pelo cliente
- **Link na homepage:** o "Ver portfólio" do case-teaser já está com `href="#"` — atualizar para `/portfolio/`
- **CSS component:** `src/css/components/portfolio.css`

### Contato no Header e Footer (CONV-03, CONV-04)

- **Telefone no header:**
  - Formato: `<a href="tel:+55110000000000">(11) 9 0000-0000</a>` — link `tel:` clicável
  - Desktop: visível no header ao lado do logo / nav
  - Mobile: dentro do menu hamburger (quando nav-links está aberto)
  - Placeholder: `+55 (11) 9 0000-0000` → cliente substitui pelo número real
  - Atualizar em TODAS as páginas: index.html, sobre, obrigado, contato, portfolio, 3 service pages

- **Email no footer:**
  - Formato: `<a href="mailto:contato@nptengenharia.com.br">contato@nptengenharia.com.br</a>`
  - Já existe no footer como placeholder — confirmar que está como `mailto:` link (verificar)
  - Atualizar em TODAS as páginas se ainda não estiver como link

### Soluções 100% Gratuitas
- Netlify Forms (gratuito no plano Starter — 100 envios/mês)
- WhatsApp API `wa.me` — gratuito e sem dependência de biblioteca
- Sem Google Forms, sem Formspree, sem Typeform — Netlify Forms é a decisão locked

### Claude's Discretion
- Layout visual da página /contato/ (coluna única vs duas colunas com dados de contato)
- Layout visual da página /portfolio/ (card único centrado vs largura total)
- Estilo e animação do botão WhatsApp quando ativado
- Exato posicionamento do telefone no header desktop (direita extrema vs junto ao CTA)
- Estrutura CSS do campo condicional "Outro" no tipo de projeto

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System (MANDATORY)
- `src/css/tokens.css` — usar var() em todo CSS novo, zero hex hardcoded
- `src/css/base.css` — .container class (max-width 1200px)
- `src/js/main.js` — adicionar imports dos novos CSS components aqui

### Páginas de Referência (estrutura HTML a replicar)
- `index.html` — estrutura header/footer/nav com 3 service links — copiar para /contato/ e /portfolio/
- `servicos/pressurizacao-escadas-emergencia/index.html` — padrão de página completa com JSON-LD e breadcrumb

### Requisitos da Fase
- `.planning/REQUIREMENTS.md` — PAGE-05, PAGE-07, CONV-01, CONV-02, CONV-03, CONV-04, CRED-03
- `.planning/ROADMAP.md` — Success criteria da Phase 4

### Vite Config
- `vite.config.js` — adicionar `contato/index.html` e `portfolio/index.html` aos rollupOptions.input

### Fases Anteriores
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md` — tokens, stack, soluções gratuitas
- `.planning/phases/02-home-sobre-and-credibility-shell/02-CONTEXT.md` — padrões HTML/CSS (header sticky, hamburger, footer CREA)
- `.planning/phases/03-service-pages-seo-nucleus/03-CONTEXT.md` — padrão OG/canonical a replicar nas novas páginas

### CSS Components Existentes (reaproveitáveis)
- `src/css/components/header.css` — header sticky + hamburger CSS-only
- `src/css/components/footer.css` — footer global
- `src/css/components/buttons.css` — .btn, .btn--primary, .btn--secondary
- `src/css/components/service-page.css` — .service-cta (modelo para CTA section no portfolio)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.btn`, `.btn--primary`, `.btn--secondary` (buttons.css) — usar nos CTAs de /contato/ e /portfolio/
- `.container` (base.css) — max-width wrapper para todas as novas páginas
- `site-header` + `.nav-links` (header.css) — copiar estrutura do header com os 3 service links já adicionados
- `.site-footer` (footer.css) — copiar footer com CREA e email de todas as páginas existentes

### Established Patterns
- Toda página HTML importa `src/js/main.js` como `type="module"`
- Mobile-first: `@media (min-width: 48rem)` tablet, `@media (min-width: 80rem)` desktop
- SVG icons: inline, `aria-hidden="true"`, `fill="currentColor"`
- Sem hex hardcoded — tudo via `var()` tokens
- JSON-LD: `<script type="application/ld+json">` no `<head>`
- Canonical: `<link rel="canonical" href="...">` + 9 og tags no `<head>`

### Integration Points
- `vite.config.js` → adicionar `contato` e `portfolio` ao rollupOptions.input
- `index.html` case-teaser: `href="#"` no "Ver portfólio" → atualizar para `/portfolio/`
- `index.html` footer #contato → redirecionar CTAs para `/contato/` (ou manter âncora + adicionar link)
- Header `<ul class="nav-links">` em TODAS as páginas → adicionar telefone como link `tel:` no menu mobile
- Footer em TODAS as páginas → confirmar email como `mailto:` link

### Netlify Forms Pattern
- `<form name="contato" method="POST" data-netlify="true" action="/obrigado/">`
- Campo hidden: `<input type="hidden" name="form-name" value="contato">`
- Netlify detecta o atributo no build e cria o endpoint automaticamente

</code_context>

<specifics>
## Specific Ideas

- WhatsApp deve ser estruturalmente presente mas visualmente oculto (`hidden` attribute) — uma linha de HTML para ativar
- Case study enquadra resultado como "projeto entregue pronto para execução" sem mencionar aprovação em vistoria (obra não iniciada)
- Dados reais do projeto serão fornecidos pelo cliente — executor usa placeholders `[TIPO]`, `[CIDADE]`, `[ANO]` etc.
- Página /contato/ deve também repetir os dados de contato diretos (email e telefone) além do formulário — assim o visitante tem alternativa imediata sem preencher formulário

</specifics>

<deferred>
## Deferred Ideas

- Animação hover/pulse no botão WhatsApp quando ativado — Phase 5 (QA) ou v2
- Múltiplos projetos no portfolio — v2, quando novos projetos forem entregues
- Foto da obra — adicionar futuramente à página /portfolio/ quando o edifício for construído
- Analytics de eventos (clique no WhatsApp, envio do formulário) — v2, ANLT-01/03

</deferred>

---

*Phase: 04-portfolio-conversion-contact*
*Context gathered: 2026-03-20*
