# Feature Research

**Domain:** Site Institucional B2B — Empresa de Engenharia Especializada (pressurização, hidráulica, elétrica)
**Researched:** 2026-03-19
**Confidence:** MEDIUM (web tools unavailable; based on domain expertise in B2B lead generation, Brazilian engineering regulation, and institutional website patterns — flagged where lower confidence)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that prospects assume exist. Missing any of these causes immediate loss of credibility or conversion.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| CTA primário para orçamento (formulário ou WhatsApp) acima do fold | Visitante qualificado quer contato imediato; sem CTA visível = abandona | LOW | WhatsApp via link `wa.me/55...` é zero-custo e culturalmente dominante no B2B brasileiro |
| Listagem clara dos serviços oferecidos | Visitante precisa confirmar que a empresa faz o que ele precisa em 5 segundos | LOW | Três serviços (pressurização, hidráulica, elétrica) cada um com página própria |
| Página por serviço com descrição técnica | Engenheiros e arquitetos que especificam fornecedores precisam de detalhes técnicos | MEDIUM | Cada página deve referenciar normas ABNT correspondentes |
| Formulário de contato funcional | Canal formal esperado por decisores corporativos que não querem WhatsApp | LOW | Campos: nome, empresa, cargo, tipo de projeto, mensagem; sem CAPTCHA agressivo |
| Endereço/região de atuação | Construtoras verificam se a empresa atende sua região antes de qualquer contato | LOW | "Atendimento nacional — projetos entregues remotamente" resolve a ausência de escritório físico |
| Identidade visual profissional consistente | Empresa sem credibilidade visual = empresa sem credibilidade técnica no B2B | MEDIUM | Logo + paleta + tipografia coerentes; amateurismo visual é o maior killer de conversão |
| Site responsivo e funcional em mobile | Mestres de obras, compradores e donos de construtora usam muito celular | LOW | Critical: Google indexa mobile-first; falha aqui = sem ranking |
| Velocidade de carregamento adequada (Core Web Vitals) | Google penaliza sites lentos; usuários mobile abandonam após 3s | LOW | HTML/CSS/JS puro elimina esse problema por padrão |
| HTTPS e certificado SSL válido | Navegadores mostram "não seguro" sem HTTPS — mata credibilidade na hora | LOW | Gratuito via Netlify/GitHub Pages |
| Informações de contato claras (telefone, email, WhatsApp) | Padrão universal; empresa sem contatos visíveis parece inexistente | LOW | Rodapé + página de contato + header no mobile |
| Meta title e description relevantes por página | Impacta diretamente o CTR no Google antes mesmo do visitante chegar | LOW | Parte da estrutura técnica de SEO básico |

### Differentiators (Competitive Advantage)

Features que separam a NPT dos concorrentes. Especialmente importantes para empresa nova sem histórico extenso.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Referências normativas explícitas nas páginas de serviço | Sinaliza domínio técnico real; engenheiros reconhecem quem sabe do assunto | MEDIUM | NBR 9077 (pressurização), NBR 5626 (instalações hidráulicas), NBR 5410 (elétrica) em posição de destaque — não apenas mencionadas, mas explicadas |
| Registro CREA em destaque | Credencial obrigatória que muitas empresas novas esquecem de exibir visualmente | LOW | Exibir número do CREA do responsável técnico com link para busca pública no portal CREA-SP/CONFEA confere verificabilidade |
| Caso de uso / portfólio detalhado do único projeto | Um caso bem documentado supera uma galeria rasa de 10 projetos | MEDIUM | Incluir: tipo de edificação, desafio técnico, normas aplicadas, resultado entregue, foto se disponível |
| Proposta de valor centrada em preço competitivo com qualidade técnica | Diferencial real da empresa (estrutura enxuta = custo menor) comunicado diretamente | LOW | Framing: "Projetos técnicos certificados com o melhor custo-benefício do mercado" — não "barato" |
| Explicação do processo de trabalho (como funciona) | Reduz fricção para primeiro contato: prospects sabem o que esperar | LOW | 4–5 passos: "Você nos conta o projeto → análise técnica → proposta → execução → entrega" |
| Seção "Por que a NPT" com diferenciais concretos | Responde objeção implícita: "por que contratar uma empresa nova?" | LOW | Focar em: tempo de resposta rápido, engenheiro sênior acessível, entrega no prazo, atendimento nacional |
| Schema markup LocalBusiness + Service | Melhora presença no Google (rich snippets, Knowledge Panel) para empresa nova | LOW | JSON-LD no `<head>` — alto impacto SEO com implementação simples em HTML puro |
| Open Graph e meta tags para compartilhamento | Quando construtoras compartilham o site por WhatsApp ou email, aparece corretamente formatado | LOW | og:title, og:description, og:image por página |
| Seção de perguntas frequentes (FAQ) por serviço | Captura long-tail SEO; responde dúvidas de clientes antes do contato; aumenta tempo na página | MEDIUM | Ex: "O projeto de pressurização precisa de ART?" — sim, ART (Anotação de Responsabilidade Técnica) é obrigatória; explicar isso demonstra competência |
| Página "Sobre" com apresentação do responsável técnico | Humaniza empresa nova; engenheiros querem saber quem assina o projeto | LOW | Nome completo, CREA, especialidade, foto profissional — humanização é trust signal crítico para empresa nova |
| Estrutura de URL semântica por serviço | Favorece ranqueamento por palavra-chave específica | LOW | `/servicos/pressurizacao-escadas-emergencia`, `/servicos/projeto-hidraulico`, `/servicos/projeto-eletrico` |
| Breadcrumb navigation com schema markup | Melhora navegação e SEO; sinaliza estrutura para Google | LOW | Especialmente útil quando há páginas de serviço individuais |
| Atributo `alt` descritivo em todas as imagens | SEO básico mas frequentemente ignorado; ajuda no Google Images para projetos de engenharia | LOW | "Projeto de pressurização de escada de emergência em edifício residencial — NPT Engenharia" |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Slider/carrossel de imagens na hero section | Parece dinâmico e moderno | Diminui conversão (distra do CTA), piora performance (LCP), baixo engajamento real — dados de UX consistentemente mostram que sliders reduzem conversão em B2B | Hero estática com uma imagem forte e CTA direto; texto claro de proposta de valor |
| Chat em tempo real (Intercom, Drift, etc.) | Parece "profissional" e responsivo | Custo mensal, exige monitoramento constante, empresa pequena não consegue responder em tempo real — gera frustração se não respondido | Botão de WhatsApp flutuante — mesmo resultado, zero custo, culturalmente esperado no Brasil |
| Pop-up de "newsletter" ou "baixe nosso ebook" | Lead magnet para captura de email | Empresa nova sem conteúdo; interrompe visitante qualificado que quer orçamento, não conteúdo; pode parecer spam | Formulário de orçamento direto com proposta de valor clara |
| Contador de "projetos entregados" inflado | Demonstrar escala | Com 1 projeto, qualquer número inventado é antiético e detectável — destrói confiança | "Já entregamos projetos em [cidade/estado]" ou mostrar o único projeto com qualidade |
| Certificações genéricas (ISO, etc.) sem ter | Parece mais profissional | Empresa nova não tem; mencionar certificações que não possui é fraude; prospects do setor verificam | CREA do responsável técnico + ART são as credenciais que o mercado verifica de verdade |
| Página de "cases" com apenas imagens sem contexto | Demonstrar portfólio | Imagem sem contexto técnico não convence engenheiro; parece portfólio de designer, não de engenharia | Estudo de caso completo: problema, solução técnica, normas aplicadas, resultado |
| Formulário extenso (15+ campos) | Capturar mais informações do lead | Cada campo adicional reduz taxa de preenchimento; dados extras coletados no follow-up | 5–6 campos máximo: nome, empresa, WhatsApp/email, tipo de projeto, descrição breve |
| Blog vazio ou com 1-2 posts | "Ter um blog" para SEO | Blog sem conteúdo sinaliza abandono; Google não ranqueia blog sem autoridade; piora credibilidade | Estrutura de blog preparada mas sem exibição de posts até ter volume mínimo (5+); ou seção de artigos técnicos bem curada desde o início |
| Versão inglês do site | Parece "international" | Mercado-alvo é 100% nacional; recurso dilui foco; manutenção duplicada | Zero. Foco total em português com terminologia técnica correta do setor |

---

## Feature Dependencies

```
[Páginas de Serviço por Especialidade]
    └──requires──> [Identidade Visual Profissional]
    └──requires──> [Estrutura de URL Semântica]
    └──enhances──> [Schema Markup Service]
    └──enhances──> [FAQ por Serviço]

[Portfólio / Caso de Uso]
    └──requires──> [Identidade Visual Profissional]
    └──enhances──> [Seção "Por que a NPT"]

[Schema Markup (LocalBusiness + Service)]
    └──requires──> [Página de Contato com informações corretas]
    └──enhances──> [Páginas de Serviço]

[Formulário de Orçamento]
    └──requires──> [HTTPS]
    └──enhances──> [CTA primário acima do fold]

[WhatsApp CTA flutuante]
    └──conflicts──> [Chat em tempo real] (redundância, escolher um)

[FAQ por Serviço]
    └──enhances──> [SEO long-tail]
    └──requires──> [Páginas de Serviço por Especialidade]

[Blog/Artigos Técnicos]
    └──requires──> [Estrutura de URL Semântica]
    └──requires──> [5+ artigos prontos antes de ativar] (anti-feature se vazio)
    └──enhances──> [SEO autoridade de domínio]

[Registro CREA em destaque]
    └──requires──> [Página Sobre com responsável técnico]
    └──enhances──> [Credibilidade para empresa nova]
```

### Dependency Notes

- **Páginas de Serviço requires Identidade Visual:** Credibilidade visual precisa estar resolvida antes de criar conteúdo técnico; texto bom em design amador não converte.
- **FAQ requires Páginas de Serviço:** O FAQ é expansão do conteúdo de serviço, não pode existir independentemente com qualidade.
- **Blog requires volume mínimo:** Ativar seção de blog com menos de 5 artigos sinaliza abandono; estrutura técnica pode ser implementada sem exibição pública de posts.
- **Schema markup requires dados corretos na página:** Markup errado é pior que nenhum markup (Google penaliza inconsistências).
- **CREA requires Página Sobre:** Número do CREA sem contexto do responsável técnico tem menos impacto que CREA + foto + nome + especialidade juntos.

---

## MVP Definition

### Launch With (v1)

Mínimo para validar conversão e ganhar presença no Google.

- [ ] **Hero section com proposta de valor clara + CTA duplo (formulário + WhatsApp)** — primeiro ponto de contato; sem isso nada funciona
- [ ] **Três páginas de serviço individuais** — uma por especialidade, com descrição técnica e referência normativa — necessário para SEO por serviço
- [ ] **Página Sobre com responsável técnico e CREA** — trust signal crítico para empresa nova
- [ ] **Portfólio: 1 caso de uso bem documentado** — melhor do que galeria rasa; único projeto disponível deve brilhar
- [ ] **Formulário de orçamento funcional (5 campos)** — canal formal de conversão
- [ ] **WhatsApp button flutuante** — canal de conversão preferencial no mercado brasileiro
- [ ] **Seção "Como funciona" (processo de 4–5 passos)** — reduz fricção para primeiro contato
- [ ] **Schema markup: LocalBusiness + Service + BreadcrumbList** — impacto SEO alto, custo de implementação baixo
- [ ] **SEO técnico básico: meta tags, sitemap.xml, robots.txt, Open Graph** — fundação para ranqueamento
- [ ] **Identidade visual coesa (logo, paleta, tipografia)** — credibilidade visual é pré-requisito de tudo

### Add After Validation (v1.x)

Adicionar quando houver pelo menos 2–3 leads qualificados confirmando o canal.

- [ ] **FAQ por serviço (3–5 perguntas cada)** — aguardar primeiras dúvidas reais de leads para preencher com conteúdo real
- [ ] **Google Analytics 4 + Search Console configurados** — validar de onde vêm os leads antes de otimizar
- [ ] **Segundo caso de portfólio** — assim que próximo projeto for entregue
- [ ] **Depoimentos/referências de clientes** — após primeiros clientes satisfeitos; não fabricar

### Future Consideration (v2+)

Diferir até ter volume de tráfego e leads justificando o esforço.

- [ ] **Blog com artigos técnicos** — exige volume (5+ artigos), revisão técnica, publicação consistente; mínimo 3 meses de conteúdo antes de ativar seção pública
- [ ] **Google Ads / Meta Ads integração (landing page específica)** — só após validar conversão orgânica; landing page separada do site institucional
- [ ] **Portfólio expandido com filtros** — quando houver 5+ projetos de tipos diferentes
- [ ] **Calculadora/estimativa online de projetos** — diferenciador forte, mas complexidade MEDIUM/HIGH; exige conhecimento dos parâmetros técnicos de precificação

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| CTA WhatsApp flutuante | HIGH | LOW | P1 |
| Formulário de orçamento | HIGH | LOW | P1 |
| Páginas de serviço com conteúdo técnico | HIGH | MEDIUM | P1 |
| Identidade visual profissional | HIGH | MEDIUM | P1 |
| CREA em destaque + Página Sobre | HIGH | LOW | P1 |
| Portfólio: 1 caso de uso detalhado | HIGH | MEDIUM | P1 |
| Schema markup LocalBusiness + Service | HIGH | LOW | P1 |
| SEO técnico (meta tags, sitemap, OG) | HIGH | LOW | P1 |
| Mobile responsivo | HIGH | LOW | P1 |
| Seção "Como funciona" | MEDIUM | LOW | P1 |
| FAQ por serviço | MEDIUM | MEDIUM | P2 |
| Google Analytics 4 + Search Console | HIGH | LOW | P2 |
| Open Graph e meta tags sociais | MEDIUM | LOW | P2 |
| Breadcrumb com schema | MEDIUM | LOW | P2 |
| Blog (estrutura preparada, sem conteúdo v1) | MEDIUM | LOW | P2 |
| Depoimentos de clientes | HIGH | LOW | P2 (após primeiros clientes) |
| Blog com conteúdo publicado | HIGH | HIGH | P3 |
| Calculadora de projetos | MEDIUM | HIGH | P3 |
| Segundo portfólio | HIGH | MEDIUM | P3 (após próximo projeto) |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Service Page Content Specifications

Esta seção detalha o que cada página de serviço deve conter para atingir autoridade técnica e ranqueamento.

### Página: Pressurização de Escadas de Emergência

**Conteúdo obrigatório:**
- Definição clara: o que é pressurização de escadas e por que é obrigatória
- Referência normativa central: **NBR 9077:2001** (Saídas de emergência em edifícios) — mencionar explicitamente o nome e número da norma; descrever que a pressurização impede a entrada de fumaça nas rotas de fuga
- Referência complementar: **IT-11 do CBPMESP** (Instrução Técnica do Corpo de Bombeiros de SP) para projetos em São Paulo; mencionar que exigências variam por estado (IT estaduais)
- Tipos de edificações atendidas: residencial (acima de 4 pavimentos em geral), comercial, industrial
- Quando é obrigatória: altura da edificação, ocupação — critérios da NBR
- O que a NPT entrega: memorial descritivo, planta técnica, especificações de equipamentos (ventiladores, dampers, pressostatos), ART (Anotação de Responsabilidade Técnica)
- Por que contratar projeto especializado: irregularidade com bombeiros, risco de vida, impacto no habite-se
- FAQ específico:
  - "Quando minha obra precisa de pressurização?"
  - "O que é ART e por que é obrigatória no projeto?"
  - "Como funciona o processo de aprovação nos bombeiros?"

**Keywords target:** "projeto pressurização escada emergência", "projeto pressurização NBR 9077", "projeto SPDA escadas emergência", "pressurização escada bombeiros"

### Página: Projetos Hidráulicos

**Conteúdo obrigatório:**
- Tipos de projetos: água fria, água quente, esgoto sanitário, águas pluviais, combate a incêndio (hidrantes)
- Referência normativa: **NBR 5626** (Instalação predial de água fria e água quente), **NBR 8160** (Sistemas prediais de esgoto sanitário), **NBR 10844** (Instalações prediais de águas pluviais)
- Aplicações: residencial, comercial, industrial, retrofit
- O que a NPT entrega: projetos conforme ABNT, memoriais, especificações, compatibilização com estrutural e arquitetura, ART
- Diferencial: projetos compatíveis com aprovação em prefeitura e corpo de bombeiros
- FAQ específico:
  - "Projeto hidráulico é obrigatório para alvará de construção?"
  - "Qual a diferença entre projeto hidráulico e instalações hidráulicas?"

**Keywords target:** "projeto hidráulico predial", "projeto instalações hidráulicas", "projeto hidráulico residencial comercial", "projeto hidráulico NBR 5626"

### Página: Projetos Elétricos

**Conteúdo obrigatório:**
- Tipos de projetos: instalações elétricas prediais, SPDA (para-raios), quadros de distribuição, entrada de energia (ANEEL/concessionária)
- Referência normativa: **NBR 5410** (Instalações elétricas de baixa tensão), **NBR 5419** (SPDA — Sistema de proteção contra descargas atmosféricas)
- Aplicações: residencial, comercial, industrial
- O que a NPT entrega: projeto executivo, diagrama unifilar, memorial de cálculo, especificação de materiais, ART
- Destaque: conformidade com exigências das concessionárias (ANEEL) e CREA
- FAQ específico:
  - "Quando o projeto elétrico precisa de ART?"
  - "Minha obra precisa de SPDA (para-raios)?"
  - "Qual a diferença entre projeto elétrico e projeto luminotécnico?"

**Keywords target:** "projeto elétrico predial", "projeto elétrico residencial", "projeto SPDA para-raios", "projeto elétrico NBR 5410"

---

## Trust Signals Específicos para Empresa Nova

Empresa nova enfrenta objeção implícita: "posso confiar em quem não tem histórico?" Estes elementos respondem diretamente à objeção sem precisar de histórico longo.

| Trust Signal | Implementação | Impacto | Custo |
|--------------|---------------|---------|-------|
| Número do CREA do responsável técnico com link verificável | Exibir no rodapé e na Página Sobre; link para portal.confea.org.br ou creasp.org.br | Crítico — verificável por qualquer cliente | LOW |
| Foto profissional do engenheiro responsável | Página Sobre; basta 1 foto de qualidade aceitável | Alto — humaniza empresa nova | LOW |
| ART mencionada como entregável padrão | Em cada página de serviço: "projeto acompanhado de ART" | Alto — clientes sabem que é obrigatória e procuram quem já menciona | LOW |
| Caso de uso detalhado (único projeto disponível) | Portfólio: título, desafio, solução, normas aplicadas, resultado, foto se possível | Alto — 1 caso bem documentado vale mais que 10 imagens | MEDIUM |
| Depoimento ou referência do cliente existente | Seção de depoimentos: nome, cargo, empresa, texto | Crítico — mas só com depoimento real; nunca fabricar | LOW (obter o depoimento pode ser o trabalho) |
| Associações técnicas (ABECE, ABRACO, etc.) | Mencionar se o responsável técnico for membro | Médio — sinaliza envolvimento ativo no setor | LOW |
| Atendimento nacional explícito | "Atendemos todo o Brasil — projetos entregues remotamente via PDF e DWG" | Médio — remove objeção geográfica | LOW |
| Tempo de resposta comprometido | "Retornamos em até 24 horas úteis" | Médio — reduz ansiedade sobre empresa nova | LOW |

---

## Brazilian Market Specifics

Características do mercado brasileiro de engenharia que impactam diretamente as features do site:

| Característica | Impacto no Site | Implementação |
|----------------|-----------------|---------------|
| CREA obrigatório para exercício da profissão | Deve ser exibido e verificável — ausência é red flag imediato para clientes técnicos | Número CREA + link para portal CONFEA no rodapé e Página Sobre |
| ART (Anotação de Responsabilidade Técnica) em todo projeto | Mencionar ART como entregável padrão em cada serviço | Bullet point explícito nas listas de entregáveis |
| Corpo de Bombeiros aprova projetos de pressurização | Mencionar processo de aprovação como parte do serviço (ou como o projeto facilita) | Seção de FAQ ou processo de trabalho |
| ABNT como referência normativa (não ISO) | Usar siglas ABNT + NBR, não EN/ISO, nas páginas de serviço | Conteúdo técnico por serviço |
| WhatsApp como canal B2B preferencial | CTA WhatsApp é tão ou mais importante que formulário | Botão flutuante + link direto no header e rodapé |
| Termos regionais variam (SP, RJ, MG têm Instruções Técnicas diferentes) | Mencionar que atende normas estaduais específicas + IT dos bombeiros por estado | FAQ de pressurização, cláusula de atendimento nacional |
| Construtoras pequenas e médias decidem por indicação + preço | Seção de proposta de valor e preço competitivo explícita | "Por que a NPT" com custo-benefício |
| Habite-se depende de laudos e projetos aprovados | Mencionar que projetos NPT facilitam aprovação e habite-se | Feature de benefício nas páginas de serviço |

---

## Competitor Feature Analysis

MEDIUM confidence — baseado em padrões observados no mercado brasileiro de engenharia especializada; sem acesso direto a sites de concorrentes no momento da pesquisa.

| Feature | Concorrentes Típicos | Abordagem NPT Recomendada |
|---------|---------------------|--------------------------|
| Listagem de serviços | Texto genérico, sem normas | Normas ABNT explícitas, termos técnicos corretos |
| Portfólio | Galeria de fotos de obra sem contexto | Estudo de caso com problema → solução → normas → resultado |
| CREA | Ausente ou no rodapé sem destaque | Destaque visual na Página Sobre + rodapé linkado |
| FAQ | Ausente na maioria | FAQ por serviço com perguntas técnicas reais |
| Processo de trabalho | Ausente | "Como funciona" em 4–5 passos visuais |
| CTA WhatsApp | Presente (padrão de mercado) | Presente e com texto específico (não genérico "fale conosco") |
| Conteúdo técnico de normas | Ausente ou superficial | Seção por serviço com número da NBR, quando aplica, o que exige |
| Schema markup | Ausente (oportunidade) | Implementado para vantagem no Google |
| Mobile first | Frequentemente ignorado | Prioritário desde o design |

---

## Sources

- Conhecimento de domínio: padrões de B2B lead generation websites (HIGH confidence)
- Regulamentação brasileira: CREA/CONFEA, ART, estrutura normativa ABNT NBR (HIGH confidence — baseado em legislação federal e normas técnicas vigentes)
- NBR 9077:2001 — saídas de emergência em edifícios: cobertura de pressurização de escadas (HIGH confidence)
- NBR 5626 — instalações prediais de água fria e água quente (HIGH confidence)
- NBR 5410 — instalações elétricas de baixa tensão (HIGH confidence)
- NBR 5419 — SPDA (HIGH confidence)
- NBR 8160 — sistemas prediais de esgoto sanitário (HIGH confidence)
- NBR 10844 — instalações prediais de águas pluviais (HIGH confidence)
- Comportamento do mercado B2B brasileiro (WhatsApp como canal, decisão por indicação/preço): MEDIUM confidence (padrões observados no setor de construção civil brasileira)
- Práticas de SEO local e schema markup para serviços (HIGH confidence — documentação Google Search Central)
- WebSearch e WebFetch indisponíveis durante esta pesquisa — análise de sites de concorrentes específicos não foi possível

---

*Feature research for: Site Institucional B2B — NPT Engenharia*
*Researched: 2026-03-19*
