// ============================================================
// scroll.js — Header scroll effect + scroll-reveal animations
// ============================================================

// --- Header: adiciona .site-header--scrolled após 80px ---
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('site-header--scrolled', window.scrollY > 80);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// --- Scroll-reveal via IntersectionObserver ---
// Elementos com [data-reveal] animam ao entrar no viewport
(function () {
  if (!('IntersectionObserver' in window)) return;

  var style = document.createElement('style');
  style.textContent = [
    '[data-reveal]{opacity:0;transform:translateY(2rem);transition:opacity 0.6s cubic-bezier(.4,0,.2,1),transform 0.6s cubic-bezier(.4,0,.2,1);}',
    '[data-reveal="left"]{transform:translateX(-2rem);}',
    '[data-reveal="right"]{transform:translateX(2rem);}',
    '[data-reveal="scale"]{transform:scale(.95);}',
    '[data-reveal].is-visible{opacity:1;transform:none;}',
    '[data-delay="100"]{transition-delay:.1s;}',
    '[data-delay="200"]{transition-delay:.2s;}',
    '[data-delay="300"]{transition-delay:.3s;}',
    '[data-delay="400"]{transition-delay:.4s;}',
    '[data-delay="500"]{transition-delay:.5s;}',
    '@media(prefers-reduced-motion:reduce){[data-reveal]{opacity:1;transform:none;transition:none;}}'
  ].join('');
  document.head.appendChild(style);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });
})();
