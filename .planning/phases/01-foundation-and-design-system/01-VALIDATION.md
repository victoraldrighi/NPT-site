---
phase: 1
slug: foundation-and-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-19
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vite build + browser manual checks (no JS test framework in Phase 1) |
| **Config file** | `vite.config.js` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + browser visual check
- **Before `/gsd:verify-work`:** Full suite must be green + all manual checks passed
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| scaffold | 01 | 1 | INFRA-01 | build | `npm run build` exits 0 | ⬜ pending |
| tokens | 01 | 1 | IDEN-03 | grep | `grep --color "color-primary" src/css/tokens.css` | ⬜ pending |
| fontsource | 01 | 1 | IDEN-01 | grep | `grep "@fontsource/inter" src/css/base.css` | ⬜ pending |
| logo | 01 | 2 | IDEN-02 | grep | `grep "<svg" index.html` | ⬜ pending |
| responsive | 01 | 2 | IDEN-04 | manual | Browser DevTools at 375/768/1280px | ⬜ pending |
| blog-dir | 01 | 1 | INFRA-03 | file | `test -f blog/.gitkeep` | ⬜ pending |
| netlify | 01 | 3 | INFRA-02 | manual | Netlify URL returns 200 in browser | ⬜ pending |
| deploy-auto | 01 | 3 | INFRA-01 | manual | git push → Netlify build triggers automatically | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test framework to install — Phase 1 uses build-time verification (`npm run build`) and manual browser checks. Existing `npm` infrastructure covers all automated checks.

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Logo renders at 375/768/1280px | IDEN-02, IDEN-04 | Visual check required | Open preview in browser, resize DevTools to each breakpoint, verify logo renders without distortion |
| Tokens visually applied to stub page | IDEN-03 | Color/font rendering is visual | Open preview, verify navy header background, amber accent visible, Inter font loaded |
| Netlify URL live and returns 200 | INFRA-02 | External service | Visit Netlify URL, verify HTML response, check HTTPS |
| Auto-deploy triggers on git push | INFRA-01 | CI/CD pipeline | Push commit to main, verify Netlify dashboard shows new deploy within 2 minutes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
