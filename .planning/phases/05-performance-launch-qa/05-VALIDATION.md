---
phase: 5
slug: performance-launch-qa
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vite build + grep + browser manual checks |
| **Config file** | `vite.config.js` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + browser manual check
- **Before `/gsd:verify-work`:** Full suite green + all manual checks passed
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| canonical-update | 05-01 | 1 | SEO-02 | grep | `grep "nptengenharia.com.br" index.html servicos/pressurizacao-escadas-emergencia/index.html` | ⬜ pending |
| sitemap-create | 05-01 | 1 | SEO-03 | file | `test -f public/sitemap.xml && grep "nptengenharia.com.br" public/sitemap.xml` | ⬜ pending |
| robots-create | 05-01 | 1 | SEO-04 | file | `test -f public/robots.txt && grep "Sitemap:" public/robots.txt` | ⬜ pending |
| netlify-toml | 05-01 | 1 | PERF-05 | file | `test -f netlify.toml && grep "Cache-Control" netlify.toml` | ⬜ pending |
| ga4-snippet | 05-01 | 1 | PERF-05 | grep | `grep "G-N6NX09NWHS" index.html && grep "G-N6NX09NWHS" contato/index.html` | ⬜ pending |
| build-all | 05-01 | 1 | PERF-01 | build | `npm run build && test -f dist/sitemap.xml && test -f dist/robots.txt` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

*No new test files needed — verification is via grep, file existence, and Vite build.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| PageSpeed Insights mobile ≥ 90 | PERF-05 | External tool — requires live URL | After deploy: test https://nptengenharia.com.br at pagespeed.web.dev |
| LCP < 2.5s, CLS < 0.1, INP < 200ms | PERF-01, PERF-02, PERF-03 | PageSpeed Insights mobile simulation | Same PageSpeed run — check Core Web Vitals section |
| Fonts self-hosted (no CDN requests) | PERF-04 | Network waterfall check | DevTools → Network → filter "font" — verify no requests to fonts.googleapis.com |
| /sitemap.xml valid XML in browser | SEO-03 | Browser render check | Visit /sitemap.xml — must render as formatted XML, not 404 |
| /robots.txt accessible | SEO-04 | Browser check | Visit /robots.txt — must return plain text, not 404 |
| GA4 receiving events | PERF-05 | GA4 Realtime check | Visit site → GA4 dashboard → Realtime → verify active user |
| Form submission end-to-end | CONV-02 | Live Netlify check | Submit form → receive email → /obrigado/ loads |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
