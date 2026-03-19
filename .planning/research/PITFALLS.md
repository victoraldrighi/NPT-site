# Pitfalls Research

**Domain:** Site institucional B2B — empresa de engenharia (pressurização, hidráulica, elétrica)
**Researched:** 2026-03-19
**Confidence:** MEDIUM (WebSearch/WebFetch unavailable; based on well-established SEO, CRO, and B2B web design principles — flagged where recency matters)

---

## Critical Pitfalls

### Pitfall 1: Thin Service Pages That Cannot Rank

**What goes wrong:**
Each service page (pressurização, hidráulica, elétrica) gets 150–300 words of generic copy — "Fazemos projetos de pressurização com qualidade e compromisso." Google cannot differentiate this page from 500 competitors. The page never leaves page 3+.

**Why it happens:**
Developers focus on visual design and copy-and-paste the client's elevator pitch. Nobody invests in the question: "what would an engenheiro searching for a fornecedor actually need to read to trust this company?"

**How to avoid:**
Each service page needs a minimum of 800–1200 words of technical content covering:
- What the service is and when it is required by law (NBR 9077 for pressurização)
- The full project scope (what deliverables the client receives)
- The technical process (how NPT executes the project)
- Who the ideal client is (construtoras, incorporadoras, retrofits)
- FAQs that match real search intent ("projeto pressurização escada emergência preço", "NBR 9077 exige projeto")
- At least one concrete reference (the existing portfolio project)

**Warning signs:**
- Service page word count under 600
- No mention of ABNT norms or NBR numbers
- No answer to "o que está incluso no projeto?"
- Bounce rate above 80% on service pages after launch

**Phase to address:** Content/copy phase (before or during development, not after launch)

---

### Pitfall 2: Ignoring Core Web Vitals From Day One

**What goes wrong:**
LCP (Largest Contentful Paint) above 2.5s, CLS (Cumulative Layout Shift) above 0.1, or INP (Interaction to Next Paint) above 200ms causes Google to rank the site below competitors with better scores, even if the content is superior. For a new domain competing against established players, CWV is a meaningful tiebreaker.

**Why it happens:**
On pure HTML/CSS/JS, the most common killers are:
- Hero image not lazy-loaded or not properly sized (LCP)
- Web fonts loaded via `@import` inside CSS instead of `<link rel="preload">` (LCP)
- Images without `width` and `height` attributes causing layout shifts (CLS)
- No `font-display: swap` on custom fonts (CLS)
- External scripts (Google Analytics, WhatsApp widget) blocking main thread (INP)

**How to avoid:**
- Always use `<img width="..." height="...">` on every image — prevents CLS
- Preload the hero image with `<link rel="preload" as="image">`
- Use `font-display: swap` in all `@font-face` declarations
- Load third-party scripts with `defer` or `async`
- Serve images in WebP format with `<picture>` fallback
- Set explicit `aspect-ratio` on containers that receive dynamic content

**Warning signs:**
- Lighthouse score below 90 on mobile
- PageSpeed Insights showing LCP > 2.5s on any page
- Any CLS score above 0.05

**Phase to address:** Foundation/build phase — build correctly from the start, not retrofitted

---

### Pitfall 3: Missing or Broken Schema Markup

**What goes wrong:**
No schema = no rich results, no sitelinks, no star ratings in SERP. For a B2B services company, the most impactful schemas are `Organization`, `ProfessionalService`, `LocalBusiness`, and `Service`. Without them, competitors with identical content but correct schema get visual advantage in search results (breadcrumbs, contact info, service descriptions in SERP).

**Why it happens:**
Developers treat schema as optional. Even when added, common errors are: wrong `@type` hierarchy, missing `telephone` and `url` in `Organization`, `Service` blocks that don't match actual page content, or JSON-LD that validates on schema.org but uses deprecated properties.

**How to avoid:**
- Implement JSON-LD (not microdata) — easier to maintain on static HTML
- Organization schema on every page (name, url, logo, telephone, address, sameAs with Google Business Profile URL)
- Service schema on each service page (name, description, provider, areaServed: "Brasil")
- BreadcrumbList on inner pages
- Validate with Google's Rich Results Test before launch
- Do NOT use `LocalBusiness` alone if the business serves nationally — use `ProfessionalService` with `areaServed` set to "BR"

**Warning signs:**
- Google Search Console showing "Structured data errors" after indexation
- Rich Results Test returning validation failures
- No breadcrumbs showing in Google for inner pages after 4+ weeks indexed

**Phase to address:** Foundation/build phase — schema is part of HTML structure, not an afterthought

---

### Pitfall 4: New Company Credibility Collapse (Zero Social Proof)

**What goes wrong:**
Visitors land on the site, see no case studies, no client names, no testimonials, no team photos, no registration numbers, and no certifications. They leave within 30 seconds. For B2B engineering, the trust threshold is extremely high — a construtora is trusting this company with an AVCB (Auto de Vistoria do Corpo de Bombeiros) approval process. Thin credibility = zero leads even with good traffic.

**Why it happens:**
New companies underestimate how much proof B2B buyers need. The instinct is to say "we're new but good" — buyers hear "unproven risk." Developers don't push back because it's not their domain.

**How to avoid:**
- The single portfolio project must be presented as a full case study, not just a photo. Include: building type, city, scope delivered, norm compliance achieved, and — if possible — a quote from the client.
- Display engineer credentials: CREA registration number, engineer name and photo. In Brazil, CREA number is a legal trust signal that differentiates legitimate firms from "office in a garage."
- Show the team section with real names and roles — not stock photos.
- If no written testimonials exist yet, use the result of the project ("projeto aprovado pelo CBPMESP em 2024") as proof.
- Add an "Anos de Experiência" signal carefully — if the principals have 10+ years in the field before founding NPT, that is legitimately theirs to claim.

**Warning signs:**
- Portfolio section exists but shows only one image with no context
- "Sobre" page has no team photos, no CREA numbers, no bios
- No mention of any delivered project outcome

**Phase to address:** Content/credibility phase — must be resolved before launch, not post-launch

---

### Pitfall 5: "Startup-y" Visual Design That Signals Wrong Sector

**What goes wrong:**
The site uses trendy design patterns — pastel gradients, rounded blobs, sans-serif-heavy layouts with massive whitespace — that are common in SaaS and fintech. A construtora's procurement officer or a sênior engineer visiting the site subconsciously registers "this is a tech startup, not an engineering office." Trust drops. The visual language mismatches the sector expectation.

**Why it happens:**
Developers copy from popular design inspiration sites (Dribbble, Behance) without filtering for sector fit. The templates that win awards are rarely B2B engineering.

**How to avoid:**
- Visual references should be reputable Brazilian or international engineering consultancies, not SaaS startups.
- Palette: navy blue, dark gray, white, with one accent color (typically yellow, orange, or green depending on service). These are sector-standard trust colors for engenharia.
- Typography: use a neutral, professional sans-serif (Inter, Source Sans, or Roboto) — avoid thin display fonts or hand-drawn aesthetics.
- Hero imagery: engineering project photos, blueprints, rendered floor plans — not abstract gradients or 3D blobs.
- Icons should be line-based, technical — not illustrated characters.
- One differentiator test: "If I covered the logo and company name, would a visitor know this is an engineering firm in 2 seconds?"

**Warning signs:**
- Design uses more than 3 font weights on headers
- Hero section has no technical imagery, only abstract background
- Color palette would fit a fintech app equally well

**Phase to address:** Design phase — before any HTML is written

---

### Pitfall 6: WhatsApp CTA Buried or Non-Persistent

**What goes wrong:**
The WhatsApp CTA is placed once, in the contact section at the bottom of the page. Mobile users who are 60% of Brazilian web traffic never scroll that far. The lead is lost. For this market specifically — construtoras and engenheiros often prefer WhatsApp over forms — this is the highest-impact conversion element and it disappears.

**Why it happens:**
Developers treat WhatsApp as "just another contact option." In the Brazilian B2B services market, WhatsApp is the primary conversion channel. This misjudgment is sector-specific and not obvious from generic conversion rate optimization advice.

**How to avoid:**
- Fixed floating WhatsApp button (bottom-right) visible on ALL pages, ALL scroll positions, on mobile and desktop.
- The button must be clearly labeled: "Fale conosco" or "Peça seu orçamento" — not just the WhatsApp icon.
- Pre-fill the WhatsApp message with context: `https://wa.me/5511XXXXXXXX?text=Olá%2C%20vi%20o%20site%20da%20NPT%20e%20gostaria%20de%20saber%20mais%20sobre%20[SERVIÇO]`
- Include a secondary CTA in the hero section fold (above the fold on mobile) as a WhatsApp button, not just a "Saiba mais" anchor.

**Warning signs:**
- WhatsApp button only appears in the footer or contact section
- Button is icon-only with no text label
- Button has no pre-filled message context

**Phase to address:** Build phase — hero section and global layout must include this from day one

---

### Pitfall 7: Contact Form That Leaks Leads

**What goes wrong:**
The form submits to a PHP mailer that goes to spam, or submits to a service with no monitoring, or has a success state that doesn't confirm clearly. The user fills the form, hits submit, nothing visible happens (or page reloads), and they assume it failed. The lead is lost, or the email goes to the client's spam folder and is never seen.

**Why it happens:**
Developers use the simplest form handling method available — often a PHP script or a basic Netlify form — without testing the full delivery chain including spam folder.

**How to avoid:**
- Use Netlify Forms (already on stack) with email notification configured to a monitored inbox — not to the client's casual Gmail.
- Show a clear success state after submit: change the form to a "Recebemos seu contato! Retornaremos em até 24 horas." message, not just a page reload.
- Test the full chain: submit → email delivery → spam check → client receives → client can reply.
- Add honeypot field to prevent spam submissions that dilute real leads.
- For redundancy: also send form data to a Google Sheet via Netlify integration or a simple webhook — forms are too critical to rely on a single delivery mechanism.

**Warning signs:**
- No explicit success state on form submit
- Client's email is a personal Gmail without filters or labels for site leads
- Form has been "submitted" in testing but no email was received within 5 minutes

**Phase to address:** Build phase — must be tested end-to-end before launch, not assumed to work

---

### Pitfall 8: No Canonical URLs / Duplicate Content on Static Sites

**What goes wrong:**
Static sites commonly serve the same page at multiple URLs: `https://domain.com`, `https://domain.com/index.html`, `http://domain.com`, `https://www.domain.com`. Google sees 4 versions of the homepage. PageRank is diluted, and the canonical signal is ambiguous. On Netlify, redirects are easy to configure but often forgotten.

**Why it happens:**
Developers test locally and never audit the deployed URLs. HTTPS redirect, www vs. non-www, and `/index.html` stripping all need to be explicitly configured.

**How to avoid:**
- Add `canonical` link on every page pointing to the canonical URL (non-www, HTTPS)
- Configure Netlify `_redirects` or `netlify.toml`: force all HTTP → HTTPS, www → non-www (or consistent choice), `/index.html` → `/`
- Choose one canonical form (recommend: `https://nptengenharia.com.br`) and enforce it everywhere
- Verify in Google Search Console that only one URL is indexed per page

**Warning signs:**
- Visiting `http://www.domain.com` and `https://domain.com` both return 200 instead of one redirecting to the other
- Google Search Console showing both www and non-www versions indexed
- `<link rel="canonical">` tag absent from any page

**Phase to address:** Foundation/build phase — configure on deploy, not after indexation

---

### Pitfall 9: Targeting Keywords Too Generic to Ever Win

**What goes wrong:**
Targeting "projeto hidráulico" (search volume: high, competition: dominated by established firms and Wikipedia) instead of "projeto hidráulico para condomínio", "projeto hidráulico NBR 5626", or "projeto hidráulico industrial Goiânia." A new domain with zero backlinks cannot rank for head terms. Targeting them wastes content effort and produces zero organic traffic in the first 12 months.

**Why it happens:**
The client knows their service by its generic name. The developer takes the brief at face value without researching keyword difficulty.

**How to avoid:**
- Target long-tail, intent-rich keywords: "pressurização escada emergência NBR 9077", "empresa projeto pressurização CBPMESP", "projeto hidráulico industrial aprovação corpo de bombeiros"
- Include city + service combinations even for national coverage (São Paulo, Goiânia, Belo Horizonte) — these have lower competition and real buyer intent
- Each service page gets ONE primary keyword and 2–3 secondary keywords, built into the H1, first paragraph, meta title, and meta description
- Do NOT stuff — each page answers a specific question the target keyword is asking

**Warning signs:**
- Meta title of service page is simply "Projeto de Pressurização | NPT Engenharia"
- H1 is the same as the service name with no keyword modifier
- Content does not mention the target norm (NBR 9077) or specific regulatory context

**Phase to address:** Content strategy phase — keyword research must precede copywriting

---

### Pitfall 10: Robots.txt or Meta Robots Accidentally Blocking Indexation

**What goes wrong:**
Site launches with `robots.txt` containing `Disallow: /` (from a development/staging configuration that was never reversed), or service pages have `<meta name="robots" content="noindex">` left from testing. The site appears to function normally, but Google never indexes it. This can go undetected for weeks.

**Why it happens:**
Developers use staging environments with noindex to prevent premature crawling, then forget to remove the block before launch. Netlify deployments from a staging branch can carry over the development robots.txt.

**How to avoid:**
- Pre-launch checklist item: verify `robots.txt` allows all crawlers
- Pre-launch checklist item: verify zero pages have `noindex` in meta robots or X-Robots-Tag header
- Submit sitemap to Google Search Console on launch day
- Check Google Search Console "Indexing" report 48 hours after launch — if zero pages indexed, check robots immediately

**Warning signs:**
- Google Search Console shows "Discovered - currently not indexed" for all pages 72 hours after launch
- Site: search on Google returns zero results 2 weeks after launch
- `curl -I https://domain.com/servicos/pressurizacao | grep -i x-robots` returns noindex

**Phase to address:** Launch/QA phase — explicit pre-launch checklist item

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline styles instead of CSS classes | Faster to write initially | Impossible to update brand consistently; impossible to maintain dark mode or responsive overrides | Never — use utility classes or custom properties |
| Single CSS file with no organization | Works for small sites | Becomes unmaintainable when blog is added in Phase 2; every new page becomes a guess | Only if under 200 lines total |
| `<img>` without `width` and `height` | Fewer HTML attributes to type | CLS failures; Google PageSpeed penalty | Never — always specify dimensions |
| Hard-coded phone/WhatsApp number in multiple places | Simple initially | When number changes, guaranteed to miss one instance | Never — store in one CSS custom property or a JS constant |
| No sitemap.xml | Saves 30 minutes | Google may miss or delay indexing new pages | Never for a site that depends on SEO |
| Inline Google Analytics script blocking | Simpler setup | Delays page render; hurts INP score | Never — always `defer` or use GA4 async |
| Portfolio as static images only | Faster to build | Can't tell the story of the project; provides no SEO value | Never — each project needs text content, not just a photo |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| WhatsApp CTA link | Using `https://api.whatsapp.com/send?phone=...` without country code | Always use `https://wa.me/55{DDD}{NÚMERO}` format with country code 55 and no spaces/dashes |
| Netlify Forms | Not adding `netlify` attribute to the `<form>` tag | Add `data-netlify="true"` and `name="contato"` attributes; include hidden `form-name` input for JS-submitted forms |
| Google Search Console | Submitting sitemap before domain is verified | Verify domain first via DNS TXT record; then submit sitemap — unverified properties accept sitemaps but don't process them |
| Google Analytics 4 | Using Universal Analytics (deprecated July 2023) snippet | Use GA4 measurement ID (`G-XXXXXXXXXX`), not UA-format; load via gtag.js with `defer` |
| Web fonts (Google Fonts) | `@import` inside CSS blocks render until fonts load | Use `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>` with `font-display: swap` in the CSS |
| Netlify redirects | Writing redirect rules in `netlify.toml` instead of `_redirects` file | Both work, but `_redirects` is simpler; `netlify.toml` takes precedence if both exist — pick one |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized hero image (PNG/JPG at original resolution) | LCP > 3s on mobile; PageSpeed score below 70 | Export hero at 1400px max width, serve WebP with JPEG fallback, use `loading="eager"` + `fetchpriority="high"` on hero `<img>` | From day one on mobile connections |
| Loading all JavaScript synchronously in `<head>` | High TBT (Total Blocking Time); poor INP | Move scripts to end of `<body>` or use `defer` on all scripts | Immediately on any page with >1 JS file |
| Loading unused CSS (full Bootstrap/Tailwind without purge) | Large CSS payload; slower FCP | Since stack is pure HTML/CSS/JS, write only needed CSS — do not import full frameworks | Any page with >50KB of CSS |
| Embedding Google Maps iframe directly | Maps iframe causes CLS and LCP delay | Use a static map image linking to Google Maps URL, or lazy-load the iframe below fold | Immediate — maps iframes are heavy by default |
| No browser caching headers on Netlify | Returning visitors re-download all assets | Set `Cache-Control` headers in `netlify.toml` for fonts, images, CSS, JS (1 year for hashed assets) | As soon as there are any returning visitors |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| No honeypot on contact form | Form flooded with spam; real leads get buried; client loses trust in the form channel | Add a hidden `<input type="text" name="_gotcha" style="display:none">` — Netlify supports this natively |
| Phone number displayed as plain text (not `tel:` link) | Mobile users cannot tap to call; missed conversions | Always use `<a href="tel:+55XXXXXXXXXX">` for phone numbers |
| External scripts loaded over HTTP | Mixed content warning; browser blocks script | All external resources must use HTTPS URLs |
| No `rel="noopener noreferrer"` on external links | Minor security risk (tab-napping); also passes referrer to external sites | Add `rel="noopener noreferrer"` to all `target="_blank"` links |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Contact form with too many required fields | Friction kills conversion; construtoras in early research phase won't fill 8 fields | Minimum viable form: Nome, Empresa, Telefone/WhatsApp, Tipo de projeto (select), Mensagem — all optional except one contact method |
| CTA button copy "Enviar" or "Saiba mais" | Generic; gives no benefit signal | Use action-oriented copy: "Solicitar orçamento gratuito", "Falar com engenheiro", "Ver projetos entregues" |
| Service page without clear scope definition | Engineer/arquiteto can't specify NPT without knowing what deliverables they get | Each service page must answer "O que está incluso no projeto?" with a bulleted list of deliverables |
| No above-the-fold mobile CTA | Mobile users (60%+ of Brazilian traffic) see no action to take without scrolling | Hero section must fit on a 375px viewport with H1, one sentence, and one CTA button — test on real device |
| Navigation with engineering jargon in menu labels | Donos de construtora (non-technical decision-makers) don't know what "sprinkling" means | Use plain Portuguese labels: "Pressurização de Escadas", "Projetos Hidráulicos", "Instalações Elétricas" — never abbreviated codes |
| Portfolio page that's a simple image gallery | No context = no proof of competence | Each project entry needs: building type, city/state, scope delivered, norm compliance achieved, and ideally client or building name |

---

## "Looks Done But Isn't" Checklist

- [ ] **Robots.txt:** File exists at `/robots.txt`, does NOT contain `Disallow: /`, and includes a `Sitemap:` directive pointing to `sitemap.xml`
- [ ] **Sitemap.xml:** File exists, lists all indexable pages, is submitted to Google Search Console on launch day
- [ ] **Canonical tags:** Every page has `<link rel="canonical" href="https://...">` with full absolute URL, pointing to the non-www HTTPS version
- [ ] **Schema markup:** Organization + ProfessionalService JSON-LD is present on the homepage; Service JSON-LD is present on each service page; validated with Google Rich Results Test
- [ ] **Meta description:** Every page has a unique meta description (120–155 characters) that includes the primary keyword and a clear value proposition — not a truncated version of body copy
- [ ] **Open Graph tags:** `og:title`, `og:description`, `og:image`, and `og:url` are set on every page — for when the URL is shared on WhatsApp or LinkedIn
- [ ] **WhatsApp button:** Floating button is visible on mobile at all scroll positions and includes a pre-filled message context
- [ ] **Contact form delivery:** Form has been submitted in production and the email was received in the client's inbox (not spam) within 10 minutes
- [ ] **Core Web Vitals:** PageSpeed Insights mobile score is 90+ on the homepage and both service pages before launch
- [ ] **HTTPS redirect:** Visiting `http://` and `http://www.` both redirect to `https://` non-www with a 301
- [ ] **Image alt text:** Every `<img>` has a descriptive `alt` attribute — not empty, not "image", not filename — describing what the image shows
- [ ] **404 page:** A custom 404 page exists and includes navigation back to homepage and a contact CTA
- [ ] **CREA number visible:** Engineer's CREA registration number is displayed on the site (Sobre page minimum) — this is the Brazilian engineering trust signal

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Thin service pages (launched with weak copy) | HIGH — weeks of content work; traffic already indexed at low quality | Rewrite pages entirely, submit for recrawl via Google Search Console, wait 4–8 weeks for re-ranking — content quality improvements take time to reflect |
| Robots.txt blocking indexation post-launch | LOW — fix is immediate but delay cost is high | Fix robots.txt, verify with Search Console URL inspection, submit all pages for indexing manually via Search Console |
| No schema markup post-launch | MEDIUM — retroactive addition is straightforward technically | Add JSON-LD to all pages, deploy, validate with Rich Results Test, submit sitemap for recrawl |
| Bad Core Web Vitals post-launch | MEDIUM — depends on root cause | Run PageSpeed Insights, fix largest offenders (image optimization, font loading, script deferral), redeploy, retest |
| Contact form silently losing leads | HIGH — leads already lost cannot be recovered | Add redundant delivery (Google Sheets webhook), fix email configuration, add visible success state, notify client of possible missed leads period |
| Wrong keyword targeting (too generic) | HIGH — all content must be rewritten with correct keyword strategy | Treat as a content rewrite project; use Google Search Console "Performance" to identify any accidental long-tail traction to preserve |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Thin service pages | Content strategy (before build) | Word count + keyword check per page before developer writes HTML |
| Core Web Vitals failures | Build phase (bake in from start) | PageSpeed Insights 90+ on mobile before launch |
| Missing/broken schema markup | Build phase | Google Rich Results Test passes on all page types |
| Credibility collapse / zero social proof | Content + design phase | Checklist: CREA number visible, team photo present, 1 case study with outcome text |
| Wrong visual design for sector | Design phase (before HTML) | Internal review: "does this look like an engineering firm, not a SaaS startup?" |
| WhatsApp CTA buried | Build phase (layout design) | Manual test on real mobile device at all scroll depths |
| Contact form leaking leads | Build phase (integration) | End-to-end test: submit → email received in inbox (not spam) |
| Duplicate content / no canonical | Build phase + launch checklist | Check all URL variants redirect correctly to canonical |
| Generic keyword targeting | Content strategy (before build) | Each service page has one specific long-tail primary keyword in H1, title, and meta |
| Robots.txt blocking indexation | Launch checklist | Curl request to `/robots.txt` + Google Search Console coverage report 48h post-launch |

---

## Sources

- Google Core Web Vitals documentation and thresholds (web.dev/vitals) — knowledge cutoff August 2025; CWV metrics stable; INP replaced FID as of March 2024
- Google Search Central SEO Starter Guide — canonical, robots.txt, sitemap best practices; well-established, low change rate
- Schema.org ProfessionalService and Organization types — well-documented; JSON-LD approach is Google-preferred
- B2B conversion rate optimization — established field; form friction, CTA copy, and above-the-fold patterns are stable
- Brazilian market context (WhatsApp as primary B2B contact channel, CREA as engineering trust signal, Corpo de Bombeiros as regulatory authority for NBR 9077) — domain-specific, HIGH confidence based on Brazilian market knowledge
- Netlify Forms documentation — honeypot, form attributes, redirect configuration; stable platform features
- NOTE: WebSearch and WebFetch were unavailable for this session. All findings are based on training knowledge (cutoff August 2025). Pitfalls in areas with fast-changing tooling (e.g., specific Google algorithm updates post-August 2025) should be re-verified before roadmap finalization.

---
*Pitfalls research for: site institucional B2B de engenharia — NPT Engenharia*
*Researched: 2026-03-19*
