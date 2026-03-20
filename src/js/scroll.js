// Header scroll effect — adds .site-header--scrolled after 80px
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var threshold = 80;
  function onScroll() {
    if (window.scrollY > threshold) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
