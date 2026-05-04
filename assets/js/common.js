(function () {
  'use strict';

  // Navbar scroll
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Mobile menu
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Fade-in
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fi').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.fi').forEach(function (el) { el.classList.add('in'); });
  }

  // Animated counters (apenas se existirem)
  var counters = document.querySelectorAll('.stat-val[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    function countUp(el) {
      var target = +el.dataset.target;
      var suffix = el.dataset.suffix || '';
      var prefix = el.dataset.prefix || '';
      var start = null;
      requestAnimationFrame(function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1200, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(e * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      });
    }
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // FAQ accordion (genérico — aceita .faq-item OU .faq-home-item)
  document.querySelectorAll('.faq-q, .faq-home-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var openClass = item.classList.contains('faq-home-item') ? '.faq-home-item.open' : '.faq-item.open';
      var isOpen = item.classList.contains('open');
      document.querySelectorAll(openClass).forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });
})();
