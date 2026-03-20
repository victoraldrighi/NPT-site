# Phase 2: Home, Sobre & Credibility Shell - Research

**Researched:** 2026-03-19
**Domain:** Static HTML pages (multi-page Vite), CSS-only navigation, inline SVG icons, semantic HTML structure for process steps, CONFEA/CREA credibility signals
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Hero:** `var(--color-brand-primary)` navy solid background, no image, result-focused headline, CTA amber button + WhatsApp link with inline SVG
- **Homepage sections (fixed order):** Hero → 3 service cards → "Como trabalhamos" (4 steps) → mini-case teaser → footer
- **New pages:** `index.html` (replace stub), `sobre/index.html`, `obrigado/index.html`
- **Vite config:** add `sobre/index.html` and `obrigado/index.html` as entry points in `build.rollupOptions.input`
- **New CSS component files:** `src/css/components/hero.css`, `services-grid.css`, `how-we-work.css`, `case-teaser.css`, `footer.css`, `about.css` (and `src/css/components/header.css` for the nav)
- **Mobile-first:** 375px base, `@media (min-width: 48rem)` tablet, `@media (min-width: 80rem)` desktop — raw rem in @media, NOT CSS vars
- **All CSS uses `var()` from tokens.css** — do NOT use hardcoded color/spacing values
- **Navigation:** header sticky (`position: sticky; top: 0; z-index: 100`), links: Home | Sobre | Contato, hamburger mobile CSS-only (checkbox hack), no JS
- **SVG icons:** inline only, no external library (Heroicons/Font Awesome = no)
  - Service icons: chama/fogo (pressurização), gota d'água (hidráulica), raio (elétrica)
  - Differential icons: checkmark, globe, technical doc, approval
  - All decorative SVGs: `aria-hidden="true" focusable="false"`
- **Sobre page:** engineer photo placeholder `width="400" height="400"` with `object-fit: cover`, navy background as CSS fallback; name + CREA + link to `https://consultaprofissional.confea.org.br/`; 4 differentials with SVG bullets; mission paragraph
- **Obrigado page:** check SVG icon, "Mensagem recebida!", "Entraremos em contato em breve", back link — no full navigation, only logo linked to home
- **"Como trabalhamos":** 4 numbered steps (amber step number), desktop flexbox row with decorative connector, mobile flexbox column without connector
- **Placeholders:** engineer name, CREA number, WhatsApp, email, photo — all clearly marked for client substitution
- **Free only:** no paid libraries, no JS libraries for menu

### Claude's Discretion

- Exact number of columns in services grid (2-col mobile → 3-col desktop)
- Card border-radius and shadow values (use `var(--radius-md)`, `var(--shadow-md)` from tokens)
- Exact wording of 2-line service descriptions (technical, engineering B2B tone)
- Exact wording of "Como trabalhamos" step descriptions
- Hero headline and sub-headline wording
- Order of differentials on Sobre page

### Deferred Ideas (OUT OF SCOPE)

- JS-animated dropdown menu
- Client testimonials/reviews (EXP-01 — no testimonials available at launch)
- Photo gallery of projects
- FAQ (EXP-03)
- Scroll-triggered animations (harmful to CWV)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-01 | Homepage with: hero + CTA, service summaries, price differential, quick case, footer | Hero CSS patterns, services grid, "Como trabalhamos" semantic HTML, footer with CREA |
| PAGE-06 | Sobre page with: team photo, CREA number, mission, differentials | `<img>` placeholder with explicit dimensions, CONFEA portal link, SVG bullet icons |
| PAGE-08 | Thank-you page /obrigado/ after form submission | Minimal page structure, no-nav pattern, check SVG icon |
| CRED-01 | CREA registration number visible on Sobre page and in footer | Footer pattern, Sobre page CREA section, CONFEA portal URL |
| CRED-02 | Professional photo of engineer on Sobre page | `<img>` with explicit `width` and `height`, `object-fit: cover`, CSS fallback background |
| CRED-04 | "Como trabalhamos" process section with numbered steps visible on home or Sobre | `<ol>` semantic pattern, flexbox step layout, numbered step CSS pattern |
</phase_requirements>

---

## Summary

Phase 2 builds three HTML pages on top of the Phase 1 design system. All pages inherit tokens from `tokens.css` and styles from `base.css` via the `src/js/main.js` import. The implementation is pure HTML/CSS — no new JavaScript is required in this phase.

The core technical surface is: (1) adding two new Vite entry points to `vite.config.js`, (2) implementing a CSS-only checkbox hamburger menu in a sticky header, (3) writing semantic page HTML using existing token variables, and (4) embedding three inline SVG icons (fire, water drop, lightning bolt) with proper accessibility attributes. All these are well-solved problems with verified patterns.

The CONFEA professional verification URL is `https://consultaprofissional.confea.org.br/` — a public search tool that accepts name, CPF, or national registration number. There is no deep-link format for a specific CREA number; the link on the Sobre page should point to the root of the consultation portal with instructional text telling the visitor to search for the engineer's name or CREA number.

**Primary recommendation:** Build all three HTML pages as complete, full-markup documents. Import `src/js/main.js` as `type="module"` in each page's `<script>` tag. Keep each CSS component file tightly scoped to its section. Add SVG icons as literal path data (sourced from Bootstrap Icons MIT license) directly in HTML.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | 6.4.1 | Build tool — already installed | Pinned in Phase 1; do not upgrade |
| @fontsource/inter | 5.2.8 | Self-hosted font — already installed | Loaded via `src/js/main.js` |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none) | — | No new dependencies for Phase 2 | All functionality via HTML/CSS only |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG path data | Heroicons, Lucide, Font Awesome | External libraries add HTTP request or npm dependency — inline SVG has zero overhead and enables `currentColor` CSS control |
| CSS-only hamburger (checkbox hack) | Alpine.js / vanilla JS toggle | JS adds hydration overhead and fails without JS; CSS hack works everywhere, including JS-disabled environments |
| Bootstrap Icons path data (MIT, free) | Custom-drawn SVG paths | Bootstrap Icons paths are optimized, license-clear, and well-tested — no design cost |

**Installation:** No new packages. Phase 2 uses the existing `package.json`.

---

## Architecture Patterns

### Recommended Project Structure

```
/
├── index.html                        # Homepage (replace stub completely)
├── sobre/
│   └── index.html                    # Sobre page (URL: /sobre/)
├── obrigado/
│   └── index.html                    # Thank-you page (URL: /obrigado/)
├── vite.config.js                    # Add sobre + obrigado entry points
└── src/
    └── css/
        └── components/
            ├── header.css            # Sticky header + CSS hamburger menu
            ├── hero.css              # Hero section (navy bg, headline, CTAs)
            ├── services-grid.css     # 3-card services grid
            ├── how-we-work.css       # 4-step process section
            ├── case-teaser.css       # Mini case highlight
            ├── footer.css            # Global footer with CREA
            └── about.css            # Sobre page content
```

### Pattern 1: Vite Multi-Page Entry Points

**What:** Add new HTML pages as keyed entries in `build.rollupOptions.input`.
**When to use:** Every new HTML file that needs to be included in the Vite build.

```javascript
// vite.config.js — updated for Phase 2
// Source: https://v6.vite.dev/guide/build#multi-page-app
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre/index.html'),
        obrigado: resolve(__dirname, 'obrigado/index.html'),
      },
    },
  },
})
```

**Key behavior:** The key name (`sobre`, `obrigado`) is ignored by Vite for output path purposes. The file path determines the output location: `sobre/index.html` → `dist/sobre/index.html`. This is the same pattern used for the stub `main` entry in Phase 1.

**Directories must exist** before running `vite build`: create `sobre/` and `obrigado/` directories with their `index.html` files before updating `vite.config.js`.

### Pattern 2: CSS-Only Hamburger Menu (Checkbox Hack)

**What:** A hidden checkbox controls nav visibility via the CSS `:checked` sibling combinator. The `<label>` is the visible hamburger button. No JavaScript needed.
**When to use:** Mobile nav toggle where JS is not permitted.

```html
<!-- Within <header class="site-header"> -->
<!-- Source: https://blog.logrocket.com/create-responsive-mobile-menu-with-css-no-javascript/ -->
<nav class="site-nav">
  <input
    class="nav-toggle"
    type="checkbox"
    id="nav-toggle"
    aria-label="Abrir menu de navegação"
  />
  <label class="nav-hamburger" for="nav-toggle" aria-hidden="true">
    <span class="nav-hamburger__line"></span>
    <span class="nav-hamburger__line"></span>
    <span class="nav-hamburger__line"></span>
  </label>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/sobre/">Sobre</a></li>
    <li><a href="#contato">Contato</a></li>
  </ul>
</nav>
```

```css
/* src/css/components/header.css */
.site-header {
  background-color: var(--color-brand-primary);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Hide checkbox visually but keep it accessible */
.nav-toggle {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Hamburger visible only on mobile */
.nav-hamburger {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  cursor: pointer;
  padding: var(--space-2);
}

.nav-hamburger__line {
  display: block;
  width: 1.5rem;
  height: 2px;
  background-color: var(--color-bg-surface);
  transition: transform var(--transition-base), opacity var(--transition-base);
}

/* Nav links hidden on mobile by default — use visibility to prevent keyboard focus */
.nav-links {
  visibility: hidden;
  max-height: 0;
  overflow: hidden;
  list-style: none;
  display: flex;
  flex-direction: column;
  transition: max-height var(--transition-base);
}

/* When checkbox is checked: show nav links */
.nav-toggle:checked ~ .nav-links {
  visibility: visible;
  max-height: 20rem;
}

/* Transform hamburger to X when open */
.nav-toggle:checked ~ .nav-hamburger .nav-hamburger__line:nth-child(1) {
  transform: translateY(0.4rem) rotate(45deg);
}
.nav-toggle:checked ~ .nav-hamburger .nav-hamburger__line:nth-child(2) {
  opacity: 0;
}
.nav-toggle:checked ~ .nav-hamburger .nav-hamburger__line:nth-child(3) {
  transform: translateY(-0.4rem) rotate(-45deg);
}

/* Focus indicator for keyboard users */
.nav-toggle:focus-visible ~ .nav-hamburger {
  outline: 2px solid var(--color-brand-accent);
  outline-offset: var(--space-1);
}

/* Desktop: hide hamburger, show links inline */
@media (min-width: 48rem) {
  .nav-hamburger {
    display: none;
  }
  .nav-links {
    visibility: visible;
    max-height: none;
    flex-direction: row;
    gap: var(--space-6);
  }
}
```

**Accessibility notes:**
- `aria-label` on the checkbox gives screen readers a meaningful description ("Abrir menu de navegação")
- `aria-hidden="true"` on the `<label>` prevents screen readers from reading the decorative hamburger spans
- `visibility: hidden` (not `display: none`) keeps hidden links out of the keyboard tab order when the menu is closed — this is the critical accessibility difference
- `focus-visible` outline ensures keyboard users can see the active state

### Pattern 3: Inline SVG Icons for Services

**What:** SVG path data pasted directly into HTML. Decorative icons use `aria-hidden="true" focusable="false"`. No external library, no HTTP request.
**License:** Bootstrap Icons MIT license — free for commercial use with no attribution requirement.
**Source:** https://icons.getbootstrap.com/

```html
<!-- Fire / Pressurização — Bootstrap Icons bi-fire (MIT) -->
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
     viewBox="0 0 16 16" aria-hidden="true" focusable="false">
  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
</svg>

<!-- Water drop / Hidráulica — Bootstrap Icons bi-droplet (MIT) -->
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
     viewBox="0 0 16 16" aria-hidden="true" focusable="false">
  <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
  <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
</svg>

<!-- Lightning bolt / Elétrica — Bootstrap Icons bi-lightning (MIT) -->
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
     viewBox="0 0 16 16" aria-hidden="true" focusable="false">
  <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z"/>
</svg>
```

**Token-driven color control:** All SVGs use `fill="currentColor"`. CSS `color: var(--color-brand-accent)` on the wrapping element (or the SVG itself) makes the icon render in amber. `color: var(--color-bg-surface)` renders it white. Never hardcode hex values.

### Pattern 4: "Como trabalhamos" — Semantic Numbered Steps

**What:** An `<ol>` (ordered list) is the correct semantic element for sequential process steps. Screen readers announce "list of 4 items" and the index of each step automatically.
**When to use:** Any ordered sequence where the position (1, 2, 3, 4) is meaningful.

```html
<!-- Source: W3C Accessibility Guidelines — ordered lists for sequential steps -->
<section class="how-we-work" aria-labelledby="how-we-work-heading">
  <div class="container">
    <h2 id="how-we-work-heading">Como trabalhamos</h2>
    <ol class="how-we-work__steps" role="list">
      <li class="how-we-work__step">
        <span class="how-we-work__number" aria-hidden="true">01</span>
        <h3 class="how-we-work__title">Contato inicial</h3>
        <p class="how-we-work__desc">Você nos descreve o projeto — tipo de edificação, localização e normas aplicáveis.</p>
      </li>
      <li class="how-we-work__step">
        <span class="how-we-work__number" aria-hidden="true">02</span>
        <h3 class="how-we-work__title">Análise do projeto</h3>
        <p class="how-we-work__desc">Avaliamos os requisitos técnicos e definimos o escopo e o orçamento.</p>
      </li>
      <li class="how-we-work__step">
        <span class="how-we-work__number" aria-hidden="true">03</span>
        <h3 class="how-we-work__title">Desenvolvimento do projeto</h3>
        <p class="how-we-work__desc">Desenvolvemos o projeto completo conforme as normas ABNT aplicáveis, com todos os memoriais e pranchas.</p>
      </li>
      <li class="how-we-work__step">
        <span class="how-we-work__number" aria-hidden="true">04</span>
        <h3 class="how-we-work__title">Entrega e aprovação</h3>
        <p class="how-we-work__desc">Entregamos o projeto revisado e acompanhamos o processo de aprovação junto ao órgão competente.</p>
      </li>
    </ol>
  </div>
</section>
```

**Note:** `role="list"` is added as a defensive accessibility measure. Some CSS resets (`list-style: none` on `<ol>`) cause VoiceOver (Safari/macOS) to stop announcing the element as a list. Adding `role="list"` explicitly restores list semantics regardless of CSS applied.

```css
/* src/css/components/how-we-work.css */
.how-we-work__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.how-we-work__number {
  display: block;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-accent);
  line-height: 1;
  margin-bottom: var(--space-2);
}

/* Desktop: horizontal layout with decorative connector */
@media (min-width: 48rem) {
  .how-we-work__steps {
    flex-direction: row;
    gap: var(--space-4);
    position: relative;
  }

  .how-we-work__step {
    flex: 1;
    position: relative;
  }

  /* Decorative horizontal line between steps */
  .how-we-work__step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 1.5rem; /* align with center of number */
    right: calc(-1 * var(--space-4) / 2);
    width: var(--space-4);
    height: 2px;
    background-color: var(--color-brand-accent);
    opacity: 0.4;
  }
}
```

### Pattern 5: Engineer Photo with CLS Prevention

**What:** Explicit `width` and `height` attributes prevent CLS. `object-fit: cover` fills the container without distortion. Navy background CSS fallback handles missing photo gracefully.
**When to use:** Any `<img>` where the real asset may not be available yet.

```html
<!-- Source: https://www.aleksandrhovhannisyan.com/blog/setting-width-and-height-on-images/ -->
<!-- CRED-02: Foto profissional com dimensões explícitas para prevenir CLS -->
<div class="about-photo">
  <img
    src="/src/assets/images/engenheiro.jpg"
    alt="[Nome do Engenheiro] — Engenheiro responsável, CREA-SP [000000-D]"
    width="400"
    height="400"
    class="about-photo__img"
  />
</div>
```

```css
/* src/css/components/about.css */
.about-photo {
  width: 400px;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--color-brand-primary); /* navy fallback when image missing */
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.about-photo__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

**Note on asset path:** Phase 2 uses `/src/assets/images/engenheiro.jpg`. This path works in Vite dev mode (served from project root). In production, Vite will process and hash this file. If the file does not exist yet, the `<img>` will show the broken image indicator but the layout will not shift because the `width="400" height="400"` attributes pre-reserve the space.

**The directory `src/assets/images/` does not exist yet** — the implementer must create it (add a `.gitkeep` if the actual photo is not yet available).

### Pattern 6: CREA Link to CONFEA Portal

**What:** Link the CREA number text to the CONFEA public consultation portal. No direct deep-link format exists for individual CREA numbers.
**Source:** Verified at https://consultaprofissional.confea.org.br/ (2026-03-19)

```html
<!-- CRED-01: CREA visível no footer de todas as páginas -->
<p class="footer-crea">
  Engenheiro responsável: <strong>[Nome do Engenheiro]</strong> —
  <a
    href="https://consultaprofissional.confea.org.br/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Verificar registro CREA-SP [000000-D] no portal CONFEA (abre em nova aba)"
  >CREA-SP [000000-D]</a>
</p>
```

**Important:** The portal `consultaprofissional.confea.org.br` requires manual search by name, CPF, or national registration number — it does not support a URL query parameter for direct lookup by CREA number. The `aria-label` instructs the visitor to verify the number, which is the intended UX.

### Pattern 7: Hero Section Structure

**What:** Navy background, text-centered headline, two CTAs side-by-side (desktop) or stacked (mobile).
**What not to do:** Do not use a `<img>` or CSS `background-image` in the hero — the locked decision is plain navy background for LCP performance.

```html
<!-- Section semantics: <section> with aria-label for screen reader landmark -->
<section class="hero" aria-label="Proposta de valor NPT Engenharia">
  <div class="container">
    <h1 class="hero__headline">
      Projetos de engenharia que aprovam na primeira vistoria
    </h1>
    <p class="hero__subheadline">
      Especialistas em pressurização de escadas de emergência, projetos hidráulicos
      e instalações elétricas de baixa tensão para todo o Brasil.
    </p>
    <div class="hero__ctas">
      <a href="#contato" class="btn btn--primary">Solicitar Orçamento</a>
      <a
        href="https://wa.me/5511900000000"
        class="btn btn--secondary hero__whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp (abre WhatsApp)"
      >
        <!-- WhatsApp SVG icon inline -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
        WhatsApp
      </a>
    </div>
  </div>
</section>
```

```css
/* src/css/components/hero.css */
.hero {
  background-color: var(--color-brand-primary);
  color: var(--color-bg-surface);
  padding: var(--space-16) 0;
  text-align: center;
}

.hero__headline {
  font-size: var(--font-size-2xl);  /* 24px mobile */
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  margin-bottom: var(--space-4);
  color: var(--color-bg-surface);
}

.hero__subheadline {
  font-size: var(--font-size-base);
  color: var(--color-bg-surface);
  opacity: 0.9;
  margin-bottom: var(--space-8);
  max-width: 44rem;
  margin-left: auto;
  margin-right: auto;
}

.hero__ctas {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
}

/* Button utilities — may live in base.css or a shared buttons.css */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  text-decoration: none;
  transition: background-color var(--transition-base), color var(--transition-base);
  width: 100%; /* Full width on mobile */
  justify-content: center;
}

.btn--primary {
  background-color: var(--color-brand-accent);
  color: var(--color-text-body);
}

.btn--primary:hover {
  background-color: #d4911f; /* amber darkened — no token exists for this; acceptable exception */
  color: var(--color-text-body);
}

.btn--secondary {
  background-color: transparent;
  color: var(--color-bg-surface);
  border: 2px solid var(--color-bg-surface);
}

.btn--secondary:hover {
  background-color: var(--color-bg-surface);
  color: var(--color-brand-primary);
}

@media (min-width: 48rem) {
  .hero__headline {
    font-size: var(--font-size-5xl); /* 48px desktop */
  }
  .hero__subheadline {
    font-size: var(--font-size-lg);
  }
  .hero__ctas {
    flex-direction: row;
    justify-content: center;
  }
  .btn {
    width: auto;
  }
}
```

### Pattern 8: Services Card Grid

```css
/* src/css/components/services-grid.css */
.services {
  padding: var(--space-16) 0;
  background-color: var(--color-bg-page);
}

.services__grid {
  display: grid;
  grid-template-columns: 1fr;          /* 1 col mobile */
  gap: var(--space-6);
}

.service-card {
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);
}

.service-card:hover {
  box-shadow: var(--shadow-md);
}

.service-card__icon {
  color: var(--color-brand-accent);
  margin-bottom: var(--space-4);
}

.service-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-brand-primary);
  margin-bottom: var(--space-2);
}

.service-card__desc {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: var(--line-height-body);
}

.service-card__link {
  display: inline-block;
  margin-top: var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-brand-primary);
}

/* Claude's discretion: 2-col at tablet, 3-col at desktop */
@media (min-width: 48rem) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 80rem) {
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Pattern 9: Page HTML Boilerplate (applies to all 3 pages)

Every HTML page in this phase follows this structure. The `<body class="page-{name}">` class enables body-level CSS for active nav link states.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Page Title] — NPT Engenharia</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body class="page-[name]">
  <!-- Site header (same in all pages except /obrigado/) -->
  <header class="site-header">
    <div class="container site-header__inner">
      <a href="/" class="site-logo" aria-label="NPT Engenharia — ir para a página inicial">
        <svg ...><!-- logo SVG paths --></svg>
      </a>
      <nav class="site-nav" aria-label="Navegação principal">
        <input class="nav-toggle" type="checkbox" id="nav-toggle"
               aria-label="Abrir menu de navegação" />
        <label class="nav-hamburger" for="nav-toggle" aria-hidden="true">
          <span class="nav-hamburger__line"></span>
          <span class="nav-hamburger__line"></span>
          <span class="nav-hamburger__line"></span>
        </label>
        <ul class="nav-links" role="list">
          <li><a href="/">Home</a></li>
          <li><a href="/sobre/">Sobre</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <!-- Page-specific content -->
  </main>

  <!-- Footer (same in all pages in this phase) -->
  <footer class="site-footer">
    <div class="container">
      <!-- logo, CREA, email, phone, copyright -->
    </div>
  </footer>

  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

**Note for /obrigado/ page:** Omit the `<nav>` element entirely. Keep only the `<a>` logo in the header. No footer navigation.

### Anti-Patterns to Avoid

- **Hardcoded hex values in component CSS:** Use `var(--color-brand-primary)` not `#1B3A6B`. Tokens exist for all colors used in this phase.
- **CSS vars in @media queries:** `@media (min-width: var(--bp-tablet))` silently fails — always use `48rem` and `80rem` as raw rem values.
- **`display: none` on nav links:** Hidden links with `display: none` are still focusable in some browsers, creating invisible keyboard tab stops. Use `visibility: hidden` + `max-height: 0` pattern instead.
- **Omitting `width` and `height` on `<img>`:** The engineer photo MUST have explicit `width="400" height="400"` to prevent CLS (PERF-02 risk even though PERF-02 is a Phase 5 requirement).
- **Linking CREA number to www.confea.org.br root:** The correct URL for public CREA verification is `https://consultaprofissional.confea.org.br/` — the CONFEA main site does not have a direct search for professionals.
- **Adding a new page without updating vite.config.js:** Dev server serves any HTML file on disk; build output only includes explicitly declared entry points. Missing entries cause 404 in production.
- **Forgetting to create the `sobre/` and `obrigado/` directories:** `vite.config.js` references these paths — the directories and their `index.html` files must exist before running any build command.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG icons | Custom-drawn SVG paths | Bootstrap Icons path data (MIT) | Licensed, optimized, tested paths; no HTTP overhead |
| Hamburger toggle | JavaScript event listener | CSS checkbox `:checked` sibling combinator | Zero JS dependency; works without JS enabled |
| CLS-safe image placeholder | Inline `<div>` with fixed height | `<img width="400" height="400">` + `aspect-ratio` CSS | Browser-native CLS prevention, works before CSS loads |
| Step numbers | Custom counter CSS or JS | `<ol>` + custom `.step-number` `<span>` | `<ol>` provides screen reader semantics automatically |
| WhatsApp link | API calls or SDK | `href="https://wa.me/[number]"` | WhatsApp's official deep-link format, zero dependency |

**Key insight:** This phase is HTML/CSS content work. Every interactive element is either native HTML (links, checkbox) or pure CSS (`:checked`, `:hover`, `visibility`). Any JS dependency would be a regression from the Phase 1 constraint.

---

## Common Pitfalls

### Pitfall 1: `display: none` on Hidden Nav Links Traps Keyboard Focus

**What goes wrong:** Closing the mobile nav with `display: none` still allows keyboard Tab to reach hidden links in some browser/screen reader combinations.
**Why it happens:** `display: none` removes elements from the accessibility tree, but timing and implementation inconsistencies exist across browsers.
**How to avoid:** Use `visibility: hidden` combined with `max-height: 0; overflow: hidden`. `visibility: hidden` reliably removes elements from tab order.
**Warning signs:** Screen reader announces navigation links even when the hamburger is closed.

### Pitfall 2: Missing Vite Entry Point Causes Production 404

**What goes wrong:** `/sobre/` and `/obrigado/` work in `vite dev` but return 404 after `vite build`.
**Why it happens:** Vite dev server serves any HTML file found on disk. Build output only includes files explicitly listed in `rollupOptions.input`.
**How to avoid:** Update `vite.config.js` before or immediately after creating the new HTML files. Verify with `npm run build && npm run preview` that both URLs resolve.
**Warning signs:** 404 on `vite preview` for a page that worked in `vite dev`.

### Pitfall 3: `position: sticky` on Header Breaks Inside `overflow: hidden` Parent

**What goes wrong:** Sticky header stops sticking and scrolls with page content.
**Why it happens:** `position: sticky` does not work if any ancestor element has `overflow: hidden`, `overflow: auto`, or `overflow: scroll`.
**How to avoid:** Ensure `<body>` and `<html>` have no `overflow` property set, or use `overflow: clip` (which does not break sticky). Check the `.container` wrapper inside the header does not have `overflow` set.
**Warning signs:** Header scrolls away on mobile despite `position: sticky; top: 0` in CSS.

### Pitfall 4: SVG `fill` Attribute Overrides `currentColor`

**What goes wrong:** An SVG icon does not change color when parent CSS `color` property is set.
**Why it happens:** If `fill` is hardcoded as a hex value in the `<path>` element (e.g., `fill="#1B3A6B"`), it cannot be overridden by CSS `color`. The `currentColor` keyword in `fill` is what enables CSS control.
**How to avoid:** Ensure all inline SVGs use `fill="currentColor"` on the `<svg>` element (not a hardcoded hex). Path elements inherit from the parent SVG's `fill` unless they override it.
**Warning signs:** Icon stays one color regardless of CSS applied.

### Pitfall 5: `<ol>` With `list-style: none` Loses List Semantics in VoiceOver

**What goes wrong:** Screen reader (VoiceOver on Safari/macOS) stops announcing the "Como trabalhamos" section as a list.
**Why it happens:** VoiceOver treats `list-style: none` on an `<ol>` as a signal that the developer did not intend it as a list, and removes list semantics.
**How to avoid:** Add `role="list"` explicitly to the `<ol>` element. This overrides VoiceOver's heuristic and restores list announcement.
**Warning signs:** VoiceOver users hear the step items without hearing "list" or item count.

### Pitfall 6: WhatsApp URL Format

**What goes wrong:** WhatsApp link does not open correctly on mobile or desktop.
**Why it happens:** Incorrect URL format. Some developers use `https://api.whatsapp.com/send?phone=...` (older API format) or forget the country code.
**How to avoid:** Use `https://wa.me/[countrycode][number]` with no spaces, dashes, or plus sign. For placeholder: `https://wa.me/5511900000000`. Annotate clearly in HTML for client to replace.
**Warning signs:** WhatsApp link opens but number is not pre-filled, or link opens a 404.

### Pitfall 7: `src/assets/images/` Directory Does Not Exist

**What goes wrong:** Build or dev server errors when the engineer photo `<img src="/src/assets/images/engenheiro.jpg">` references a non-existent path.
**Why it happens:** The `images/` subdirectory under `src/assets/` was not part of Phase 1's file structure.
**How to avoid:** Create `src/assets/images/` with a `.gitkeep` file as a placeholder. Update the `alt` text to clearly indicate this is a placeholder awaiting the real photo from the client.
**Warning signs:** Build warnings about unresolved asset references.

---

## Code Examples

### Complete footer with CREA (all pages in this phase)

```html
<!-- Source: CONTEXT.md decisions — CRED-01 requirement -->
<footer class="site-footer">
  <div class="container site-footer__inner">
    <div class="site-footer__brand">
      <a href="/" aria-label="NPT Engenharia — ir para o início">
        <svg class="site-logo site-logo--light" ...><!-- logo --></svg>
      </a>
    </div>
    <div class="site-footer__info">
      <p>
        <a
          href="https://consultaprofissional.confea.org.br/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verificar registro CREA-SP no portal CONFEA"
        >CREA-SP [000000-D]</a>
      </p>
      <p>
        <a href="mailto:contato@nptengenharia.com.br">contato@nptengenharia.com.br</a>
      </p>
    </div>
    <p class="site-footer__copy">&copy; 2026 NPT Engenharia. Todos os direitos reservados.</p>
  </div>
</footer>
```

### /obrigado/ page minimal structure

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mensagem recebida — NPT Engenharia</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body class="page-obrigado">
  <!-- Minimal header: logo only, no nav -->
  <header class="site-header site-header--minimal">
    <div class="container">
      <a href="/" aria-label="NPT Engenharia — voltar para o início">
        <svg class="site-logo site-logo--light" ...><!-- logo --></svg>
      </a>
    </div>
  </header>

  <main class="obrigado-main">
    <div class="container">
      <!-- Checkmark SVG (Bootstrap Icons bi-check-circle, MIT) -->
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
           class="obrigado-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
      </svg>
      <h1>Mensagem recebida!</h1>
      <p>Entraremos em contato em breve.</p>
      <a href="/" class="btn btn--primary">Voltar para o início</a>
    </div>
  </main>

  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

### Active nav link via body class

```css
/* In header.css — highlights current page link */
/* body.page-home .nav-links a[href="/"] */
.page-home .nav-links a[href="/"],
.page-sobre .nav-links a[href="/sobre/"] {
  color: var(--color-brand-accent);
  text-decoration: underline;
  text-underline-offset: 0.25em;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS-dependent hamburger menu | CSS checkbox hack | 2018–present | Zero JS dependency, works without JS |
| `background-image` hero for visual impact | Text-only hero on solid background | LCP awareness post-2020 | Hero text becomes LCP element (fast), not a lazy-loaded image |
| `<div class="step">` with CSS counters | `<ol>` + visually styled step number `<span>` | Accessibility awareness 2022+ | Screen readers get list semantics automatically |
| External icon fonts (Font Awesome CDN) | Inline SVG path data | 2019–present | No HTTP request, no render-blocking stylesheet, `currentColor` works |
| Google Fonts CDN for Inter | `@fontsource/inter` self-hosted | ~2022 adoption | Already in place from Phase 1 |

**Deprecated/outdated:**
- `http://www.confea.org.br/` as verification link: The correct public search portal is `https://consultaprofissional.confea.org.br/` — the CONFEA main site only has institutional information, not the professional search tool.
- `onclick="..."` inline handlers for hamburger toggle: Never appropriate; CSS-only approach is superior for this use case.

---

## Open Questions

1. **Engineer photo file availability**
   - What we know: CONTEXT.md confirms photo is a placeholder; real photo is a client deliverable (STATE.md blocker noted)
   - What's unclear: Whether the real photo will be available before Phase 2 implementation completes
   - Recommendation: Create `src/assets/images/engenheiro.jpg` as a colored placeholder (a simple solid navy 400x400 image, or just document the missing asset with `.gitkeep`) and clearly comment in HTML that this is a client-supplied asset

2. **Logo SVG path data**
   - What we know: Phase 1 stub uses a text-based SVG `<text>` placeholder for the logo; `src/assets/logo/` directory exists but was empty as of research date
   - What's unclear: Whether the real logo SVG file has been placed in `src/assets/logo/` yet
   - Recommendation: If no real logo SVG exists, continue using the `<text>NPT</text>` SVG placeholder from the stub — it renders correctly on navy and white via `currentColor`

3. **"Serviços" dropdown in nav**
   - What we know: CONTEXT.md specifies "Serviços ▾ (dropdown placeholder, sem JS — apenas anchor links)"
   - What's unclear: Whether this dropdown should be attempted in Phase 2 CSS-only or simply omitted until Phase 3 when service pages exist
   - Recommendation: Omit the dropdown in Phase 2 — service pages don't exist yet, so the dropdown links would all be `href="#"` placeholders. Add plain "Serviços" link in Phase 3 when the service page URLs are real.

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` — section included.

### Test Framework

This is a static HTML/CSS site with no JavaScript test framework. Validation is build-verification and browser-based.

| Property | Value |
|----------|-------|
| Framework | None (static site — validation via build output + browser inspection) |
| Config file | `vite.config.js` (build entry points) |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run preview` + manual browser checks |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| PAGE-01 | Homepage exists with hero, services, process, footer | smoke | `npm run build && ls dist/index.html` | Visual check at 375px in DevTools |
| PAGE-06 | `/sobre/` page exists with name, CREA, photo, mission | smoke | `npm run build && ls dist/sobre/index.html` | Visual check; verify CREA link present |
| PAGE-08 | `/obrigado/` page exists and renders confirmation | smoke | `npm run build && ls dist/obrigado/index.html` | Visual check; verify back link works |
| CRED-01 | CREA number visible in footer on all pages + Sobre | manual | `grep -r "CREA-SP" dist/` | Confirm in dist output |
| CRED-02 | Engineer photo `<img>` with explicit width/height on Sobre | manual | `grep -n "width=\"400\"" dist/sobre/index.html` | Verify dimensions present |
| CRED-04 | "Como trabalhamos" `<ol>` with 4 steps visible | manual | `grep -n "how-we-work" dist/index.html` | Visual check of step rendering |

**Additional verification commands:**

```bash
# Verify all 3 pages built to dist
ls dist/index.html dist/sobre/index.html dist/obrigado/index.html

# Verify CREA appears in footer of all pages (CRED-01)
grep -l "CREA-SP" dist/index.html dist/sobre/index.html dist/obrigado/index.html

# Verify engineer photo has explicit dimensions (CRED-02, prevents CLS)
grep -n 'width="400" height="400"' dist/sobre/index.html

# Verify no hardcoded hex colors in component CSS (use tokens)
grep -rn "#[0-9A-Fa-f]\{6\}" src/css/components/

# Verify CSS vars not in @media queries
grep -n "var(--" src/css/components/*.css | grep "@media"

# Verify hamburger nav links use visibility (not display:none)
grep -n "visibility" src/css/components/header.css

# Check CONFEA link format
grep -n "consultaprofissional.confea.org.br" dist/sobre/index.html dist/index.html

# Success criteria 1: hero above fold on 375px
# Manual: open localhost at npm run preview, DevTools → 375px, verify h1 and at least 1 CTA visible without scrolling

# Success criteria 5: CREA in footer on all pages
grep "CREA" dist/index.html dist/sobre/index.html dist/obrigado/index.html
```

### Sampling Rate

- **Per task commit:** `npm run build` — confirms no build errors, all entry points resolve
- **Per wave merge:** `npm run build && npm run preview` — manual browser check at 375px and 1280px for each of the 3 pages
- **Phase gate:** All 5 success criteria verified manually in browser + automated grep checks pass

### Wave 0 Gaps

- [ ] `sobre/index.html` — directory and file must be created before `vite.config.js` is updated
- [ ] `obrigado/index.html` — same as above
- [ ] `src/assets/images/` directory — create with `.gitkeep`; engineer photo is a client deliverable
- [ ] `src/css/components/header.css` — does not yet exist (components dir is empty)
- [ ] `src/css/components/hero.css` — does not yet exist
- [ ] `src/css/components/services-grid.css` — does not yet exist
- [ ] `src/css/components/how-we-work.css` — does not yet exist
- [ ] `src/css/components/case-teaser.css` — does not yet exist
- [ ] `src/css/components/footer.css` — does not yet exist
- [ ] `src/css/components/about.css` — does not yet exist

*(All CSS component files are new — the `src/css/components/` directory exists but is empty as of Phase 1 completion.)*

---

## Sources

### Primary (HIGH confidence)

- [https://v6.vite.dev/guide/build#multi-page-app](https://v6.vite.dev/guide/build#multi-page-app) — Vite 6 official multi-page `rollupOptions.input` documentation; confirmed exact config syntax
- [https://consultaprofissional.confea.org.br/](https://consultaprofissional.confea.org.br/) — CONFEA public professional consultation portal; verified this is the correct public-facing URL for CREA verification (no deep-link format exists)
- [https://icons.getbootstrap.com/icons/fire/](https://icons.getbootstrap.com/icons/fire/) — Bootstrap Icons bi-fire SVG path data (MIT license)
- [https://icons.getbootstrap.com/icons/droplet/](https://icons.getbootstrap.com/icons/droplet/) — Bootstrap Icons bi-droplet SVG path data (MIT license)
- [https://icons.getbootstrap.com/icons/lightning/](https://icons.getbootstrap.com/icons/lightning/) — Bootstrap Icons bi-lightning SVG path data (MIT license)
- `src/css/tokens.css` (existing file) — all token variable names confirmed from actual file
- `src/js/main.js` (existing file) — import order confirmed
- `vite.config.js` (existing file) — existing entry point structure confirmed

### Secondary (MEDIUM confidence)

- [https://blog.logrocket.com/create-responsive-mobile-menu-with-css-no-javascript/](https://blog.logrocket.com/create-responsive-mobile-menu-with-css-no-javascript/) — CSS-only hamburger menu pattern; verified `visibility: hidden` over `display: none` for accessibility
- [https://www.matsimon.dev/blog/accessible-hamburger-buttons-without-javascript](https://www.matsimon.dev/blog/accessible-hamburger-buttons-without-javascript) — accessible checkbox hack pattern; `aria-label` on checkbox, `aria-hidden` on label
- [https://www.aleksandrhovhannisyan.com/blog/setting-width-and-height-on-images/](https://www.aleksandrhovhannisyan.com/blog/setting-width-and-height-on-images/) — `width` and `height` attributes for CLS prevention
- [https://unused-css.com/blog/css-only-hamburger-menu/](https://unused-css.com/blog/css-only-hamburger-menu/) — `aria-label` on checkbox input, focus management pattern
- [https://css-tricks.com/accessible-svg-icons/](https://css-tricks.com/accessible-svg-icons/) — `aria-hidden="true" focusable="false"` pattern for decorative SVGs

### Tertiary (LOW confidence — noted for awareness)

- [https://www.htmhell.dev/adventcalendar/2023/17/](https://www.htmhell.dev/adventcalendar/2023/17/) — VoiceOver `role="list"` requirement when `list-style: none` is applied; single source, but widely reported behavior

---

## Metadata

**Confidence breakdown:**
- Vite multi-page config: HIGH — confirmed from Vite 6 official docs + existing vite.config.js in project
- CSS hamburger menu pattern: HIGH — multiple authoritative sources agree on `visibility: hidden` + checkbox approach
- Bootstrap Icons SVG paths: HIGH — sourced directly from official icons.getbootstrap.com pages (MIT)
- CONFEA portal URL: HIGH — verified by direct fetch of consultaprofissional.confea.org.br
- VoiceOver `role="list"` workaround: MEDIUM — widely documented community behavior, no single authoritative W3C spec reference found
- Token variable names: HIGH — confirmed from actual `src/css/tokens.css` file in project

**Research date:** 2026-03-19
**Valid until:** 2026-06-19 (stable technologies; CONFEA portal URL should be re-verified if client implementation is more than 90 days away)
