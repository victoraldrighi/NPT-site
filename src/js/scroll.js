// ============================================================
// scroll.js — Animações Precision Industrial
// Header scroll · Scroll-reveal · Counter-up · Parallax grid
// Scanline hero · Magnetic hover · Section line progress
// ============================================================

// --- 1. Header: scroll class ---
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('site-header--scrolled', window.scrollY > 80);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// --- 2. Scroll-reveal via IntersectionObserver ---
(function () {
  if (!('IntersectionObserver' in window)) return;

  var style = document.createElement('style');
  style.textContent = [
    '[data-reveal]{opacity:0;transform:translateY(1.5rem);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}',
    '[data-reveal="left"]{transform:translateX(-2rem) translateY(0);}',
    '[data-reveal="right"]{transform:translateX(2rem) translateY(0);}',
    '[data-reveal="scale"]{transform:scale(.96) translateY(0);}',
    '[data-reveal].is-visible{opacity:1 !important;transform:none !important;}',
    '[data-delay="100"]{transition-delay:.1s;}',
    '[data-delay="200"]{transition-delay:.2s;}',
    '[data-delay="300"]{transition-delay:.3s;}',
    '[data-delay="400"]{transition-delay:.4s;}',
    '[data-delay="500"]{transition-delay:.5s;}',
    '@media(prefers-reduced-motion:reduce){[data-reveal],[data-reveal].is-visible{opacity:1;transform:none;transition:none;}}'
  ].join('');
  document.head.appendChild(style);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });
})();

// --- 3. Counter-up animado nas hero__stats ---
(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Anima números nas stat-values quando visíveis
  function animateValue(el, from, to, duration, suffix) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // ease out expo
      var eased = 1 - Math.pow(1 - progress, 4);
      var current = Math.round(from + (to - from) * eased);
      el.textContent = current + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = to + (suffix || '');
    }
    requestAnimationFrame(step);
  }

  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var raw = el.getAttribute('data-count');
      if (!raw) return;
      var suffix = el.getAttribute('data-suffix') || '';
      var target = parseInt(raw, 10);
      animateValue(el, 0, target, 1200, suffix);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    statObserver.observe(el);
  });
})();

// --- 4. Parallax no blueprint grid (desktop only) ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      // Move o grid de fundo lentamente (parallax sutil)
      var offset = y * 0.15;
      hero.style.setProperty('--parallax-y', offset + 'px');
      ticking = false;
    });
  }, { passive: true });
})();

// --- 5. Scanline sweep no hero (desktop only, uma vez) ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  var hero = document.querySelector('.hero');
  if (!hero) return;

  // Cria elemento scanline
  var line = document.createElement('div');
  line.style.cssText = [
    'position:absolute',
    'left:0',
    'right:0',
    'height:1px',
    'background:linear-gradient(90deg,transparent,rgba(212,134,10,0.4) 20%,rgba(245,166,35,0.7) 50%,rgba(212,134,10,0.4) 80%,transparent)',
    'pointer-events:none',
    'z-index:10',
    'top:0',
    'transform:translateY(-2px)',
    'transition:none',
    'opacity:0'
  ].join(';');
  hero.appendChild(line);

  // Animação manual — mais controle que CSS @keyframes
  var heroH = hero.offsetHeight;
  var startTime = null;
  var duration = 1800; // ms para atravessar

  function sweep(ts) {
    if (!startTime) startTime = ts;
    var elapsed = ts - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var y = progress * heroH;
    line.style.opacity = progress < 0.05 ? (progress / 0.05).toString() :
                         progress > 0.85 ? ((1 - progress) / 0.15).toString() : '1';
    line.style.transform = 'translateY(' + y + 'px)';
    if (progress < 1) {
      requestAnimationFrame(sweep);
    } else {
      line.remove();
    }
  }

  // Dispara após as animações de entrada terminarem
  setTimeout(function () {
    requestAnimationFrame(sweep);
  }, 1600);
})();

// --- 5b. Linha de progresso na timeline how-we-work (desktop) ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  var steps = document.querySelector('.how-we-work__steps');
  if (!steps) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        steps.classList.add('is-visible');
        obs.unobserve(steps);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(steps);
})();

// --- 6. Linha de progresso âmbar na seção (desktop) ---
// Aparece no topo de cada seção ao rolar
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  var style = document.createElement('style');
  style.textContent = [
    '.section-progress-bar{position:absolute;top:0;left:0;height:1px;background:var(--amber);width:0;transition:width 0.6s cubic-bezier(.16,1,.3,1);z-index:2;}',
    '.section-progress-bar.is-grown{width:120px;}'
  ].join('');
  document.head.appendChild(style);

  var sections = document.querySelectorAll('.services, .how-we-work, .case-teaser');
  sections.forEach(function (sec) {
    // Garante position:relative
    if (getComputedStyle(sec).position === 'static') {
      sec.style.position = 'relative';
    }
    var bar = document.createElement('div');
    bar.className = 'section-progress-bar';
    sec.prepend(bar);

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          setTimeout(function () { bar.classList.add('is-grown'); }, 200);
          obs.unobserve(sec);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(sec);
  });
})();

// --- 7. Hover magnético nos service-cards (desktop) ---
// O número âmbar reage à posição do mouse dentro do card
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.service-card').forEach(function (card) {
    var num = card.querySelector('.service-card__number');
    if (!num) return;

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var relY = e.clientY - rect.top;
      var centerY = rect.height / 2;
      var dy = (relY - centerY) / centerY; // -1 a 1
      num.style.transform = 'translateY(' + (dy * 4) + 'px)';
      num.style.textShadow = '0 0 20px rgba(212,134,10,' + (0.15 + Math.abs(dy) * 0.25) + ')';
    });

    card.addEventListener('mouseleave', function () {
      num.style.transform = '';
      num.style.textShadow = '';
    });
  });
})();

// --- 8. Contador pulsante nas métricas do case-teaser ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var style = document.createElement('style');
  style.textContent = [
    '@keyframes metricPop{0%{transform:scale(1)}40%{transform:scale(1.06)}100%{transform:scale(1)}}',
    '.case-teaser__metric-value.did-count{animation:metricPop 0.4s var(--ease-out) both;}'
  ].join('');
  document.head.appendChild(style);

  var metricObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var values = e.target.querySelectorAll('.case-teaser__metric-value');
      values.forEach(function (v, i) {
        setTimeout(function () {
          v.classList.add('did-count');
        }, i * 150);
      });
      metricObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });

  var metrics = document.querySelector('.case-teaser__metrics');
  if (metrics) metricObs.observe(metrics);
})();

// --- 9. Efeito glitch no logo em hover (sutil) ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var style = document.createElement('style');
  style.textContent = [
    '@keyframes glitch{',
    '0%,100%{clip-path:inset(0 0 100% 0);transform:translateX(0)}',
    '20%{clip-path:inset(30% 0 50% 0);transform:translateX(-2px)}',
    '40%{clip-path:inset(60% 0 10% 0);transform:translateX(2px)}',
    '60%{clip-path:inset(10% 0 80% 0);transform:translateX(-1px)}',
    '80%{clip-path:inset(80% 0 5% 0);transform:translateX(1px)}',
    '}',
    '.site-logo__mark{position:relative;}',
    '.site-logo__mark::after{',
    'content:attr(data-text);',
    'position:absolute;inset:0;',
    'color:var(--amber);',
    'animation:none;',
    'clip-path:inset(0 0 100% 0);',
    '}',
    '.site-logo:hover .site-logo__mark::after{animation:glitch 0.4s steps(1) 1;}'
  ].join('');
  document.head.appendChild(style);

  var marks = document.querySelectorAll('.site-logo__mark');
  marks.forEach(function (m) {
    m.setAttribute('data-text', m.textContent);
  });
})();

// --- 10. Ambient glow no hero ao mover o mouse (desktop) ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var glow = document.createElement('div');
  glow.style.cssText = [
    'position:absolute',
    'width:600px',
    'height:600px',
    'border-radius:50%',
    'background:radial-gradient(circle,rgba(212,134,10,0.07) 0%,transparent 70%)',
    'pointer-events:none',
    'z-index:1',
    'transform:translate(-50%,-50%)',
    'transition:left 0.6s ease,top 0.6s ease',
    'left:50%',
    'top:50%'
  ].join(';');
  hero.appendChild(glow);

  var ticking = false;
  hero.addEventListener('mousemove', function (e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
      ticking = false;
    });
  }, { passive: true });
})();

// --- 11. Urgency Ticker — scroll infinito ---
(function () {
  var ticker = document.querySelector('.urgency-ticker');
  if (!ticker) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var track = ticker.querySelector('.urgency-ticker__track');
  if (!track) return;

  // Duplicar itens para loop infinito
  var items = Array.from(track.children);
  items.forEach(function (item) {
    var clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  var x = 0;
  var speed = window.innerWidth < 768 ? 30 : 40; // px/s
  var lastTime = null;
  var paused = false;
  var halfWidth = 0;

  function init() {
    // Largura da metade (itens originais apenas)
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      total += items[i].offsetWidth;
    }
    halfWidth = total;
  }

  ticker.addEventListener('mouseenter', function () { paused = true; });
  ticker.addEventListener('mouseleave', function () { paused = false; });

  function tick(ts) {
    if (!lastTime) lastTime = ts;
    var dt = (ts - lastTime) / 1000; // segundos
    lastTime = ts;

    if (!paused) {
      x -= speed * dt;
      if (halfWidth > 0 && -x >= halfWidth) {
        x += halfWidth; // reset invisível
      }
      track.style.transform = 'translateX(' + x + 'px)';
    }

    requestAnimationFrame(tick);
  }

  // Inicializa após render
  requestAnimationFrame(function () {
    init();
    requestAnimationFrame(tick);
  });
})();

// --- 12. Sticky CTA Sidebar ---
(function () {
  var sidebar = document.getElementById('sticky-cta');
  if (!sidebar) return;
  if (window.innerWidth < 1200) return;

  var dismissed = false;
  var SCROLL_THRESHOLD = 300;

  function updateVisibility() {
    if (dismissed) return;
    var scrolled = window.scrollY > SCROLL_THRESHOLD;
    // Ocultar próximo ao footer
    var footer = document.querySelector('.site-footer');
    var nearFooter = false;
    if (footer) {
      var footerTop = footer.getBoundingClientRect().top;
      nearFooter = footerTop < window.innerHeight + 100;
    }
    if (scrolled && !nearFooter) {
      sidebar.classList.add('is-visible');
      sidebar.classList.remove('is-hidden');
    } else {
      sidebar.classList.remove('is-visible');
      sidebar.classList.add('is-hidden');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  // Botão fechar
  var closeBtn = sidebar.querySelector('.sticky-cta__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      dismissed = true;
      sidebar.classList.remove('is-visible');
      sidebar.classList.add('is-hidden');
    });
  }
})();

// --- 13. Spec Accordion — aria-expanded + max-height transition ---
(function () {
  var accordions = document.querySelectorAll('.spec-accordion');
  if (!accordions.length) return;

  accordions.forEach(function (accordion) {
    var triggers = accordion.querySelectorAll('.spec-accordion__trigger');
    triggers.forEach(function (trigger) {
      var bodyId = trigger.getAttribute('aria-controls');
      var body = bodyId ? document.getElementById(bodyId) : null;
      if (!body) return;

      // Remove hidden e fecha via max-height
      body.removeAttribute('hidden');
      body.style.maxHeight = '0';
      body.style.overflow = 'hidden';
      body.style.transition = 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)';

      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Fechar todos no mesmo accordion
        triggers.forEach(function (t) {
          var bId = t.getAttribute('aria-controls');
          var b = bId ? document.getElementById(bId) : null;
          if (b && t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            b.style.maxHeight = '0';
          }
        });

        // Toggle atual
        if (isOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = '0';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  });
})();

// --- 14. Process Timeline — stagger reveal via IntersectionObserver ---
(function () {
  if (!('IntersectionObserver' in window)) return;

  var timelines = document.querySelectorAll('.process-timeline__list');
  timelines.forEach(function (list) {
    var steps = list.querySelectorAll('.process-timeline__step');
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        steps.forEach(function (step, i) {
          setTimeout(function () {
            step.classList.add('is-visible');
          }, i * 120);
        });
        obs.unobserve(list);
      });
    }, { threshold: 0.1 });
    obs.observe(list);
  });
})();

// --- Blueprint grid pulses ---
(function () {
  var canvas = document.getElementById('hero-grid-pulses');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  var CELL = 48;         // deve coincidir com background-size da grade CSS
  var MAX_PULSES = 3;    // poucos pulsos por vez
  var SPEED = 90;        // px/s — lento, sutil
  var pulses = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Cria um pulso: escolhe aleatoriamente uma linha H ou V e uma posição
  function spawnPulse() {
    var w = canvas.width;
    var h = canvas.height;
    var horiz = Math.random() < 0.5;
    if (horiz) {
      // linha horizontal: escolhe uma linha da grade
      var row = Math.floor(Math.random() * Math.ceil(h / CELL)) * CELL;
      var dir = Math.random() < 0.5 ? 1 : -1;
      pulses.push({
        horiz: true,
        x: dir > 0 ? -60 : w + 60,
        y: row,
        dir: dir,
        len: CELL * (1.5 + Math.random()),   // comprimento do pulso
        alpha: 0.55 + Math.random() * 0.25
      });
    } else {
      // linha vertical
      var col = Math.floor(Math.random() * Math.ceil(w / CELL)) * CELL;
      var dir = Math.random() < 0.5 ? 1 : -1;
      pulses.push({
        horiz: false,
        x: col,
        y: dir > 0 ? -60 : h + 60,
        dir: dir,
        len: CELL * (1.5 + Math.random()),
        alpha: 0.55 + Math.random() * 0.25
      });
    }
  }

  // Intervalo entre novos pulsos — espaçado para não poluir
  var spawnTimer = 0;
  var SPAWN_INTERVAL = 1.4; // segundos entre cada spawn

  var lastTime = null;

  function draw(ts) {
    if (!lastTime) lastTime = ts;
    var dt = Math.min((ts - lastTime) / 1000, 0.1);
    lastTime = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn
    spawnTimer += dt;
    if (spawnTimer >= SPAWN_INTERVAL && pulses.length < MAX_PULSES) {
      spawnPulse();
      spawnTimer = 0;
    }

    // Move e desenha
    for (var i = pulses.length - 1; i >= 0; i--) {
      var p = pulses[i];
      p.x += (p.horiz ? SPEED * p.dir * dt : 0);
      p.y += (p.horiz ? 0 : SPEED * p.dir * dt);

      // Remove quando saiu completamente
      var outH = p.horiz && (p.dir > 0 ? p.x - p.len > canvas.width : p.x + p.len < 0);
      var outV = !p.horiz && (p.dir > 0 ? p.y - p.len > canvas.height : p.y + p.len < 0);
      if (outH || outV) { pulses.splice(i, 1); continue; }

      // Gradiente linear: transparente → amber → transparente
      var gx0 = p.horiz ? p.x - p.len * (p.dir > 0 ? 1 : 0) : p.x;
      var gy0 = p.horiz ? p.y : p.y - p.len * (p.dir > 0 ? 1 : 0);
      var gx1 = p.horiz ? p.x + p.len * (p.dir > 0 ? 0 : 1) : p.x;
      var gy1 = p.horiz ? p.y : p.y + p.len * (p.dir > 0 ? 0 : 1);

      var grad = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
      grad.addColorStop(0,   'rgba(245,166,35,0)');
      grad.addColorStop(0.4, 'rgba(245,166,35,' + p.alpha + ')');
      grad.addColorStop(0.7, 'rgba(255,212,122,' + (p.alpha * 0.9) + ')');
      grad.addColorStop(1,   'rgba(245,166,35,0)');

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      if (p.horiz) {
        ctx.moveTo(gx0, p.y);
        ctx.lineTo(gx1, p.y);
      } else {
        ctx.moveTo(p.x, gy0);
        ctx.lineTo(p.x, gy1);
      }
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
