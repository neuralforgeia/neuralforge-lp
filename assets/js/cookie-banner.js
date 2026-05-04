(function () {
  'use strict';
  var STORAGE_KEY = 'nf_cookie_consent';
  if (localStorage.getItem(STORAGE_KEY)) return;

  function buildBanner() {
    var b = document.createElement('div');
    b.className = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-live', 'polite');
    b.setAttribute('aria-label', 'Aviso de cookies');
    b.innerHTML =
      '<div class="cookie-banner__text">' +
        'Usamos cookies para melhorar sua experiência e entender como nosso site é usado. ' +
        'Veja nossa <a href="politica-privacidade.html">Política de Privacidade</a>.' +
      '</div>' +
      '<div class="cookie-banner__btns">' +
        '<button type="button" class="cookie-banner__btn cookie-banner__btn--reject" data-action="reject">Recusar</button>' +
        '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-action="accept">Aceitar</button>' +
      '</div>';
    return b;
  }

  function persist(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: value, ts: Date.now() }));
    } catch (e) { /* storage indisponível: no-op */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = buildBanner();
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('show'); });

    banner.addEventListener('click', function (e) {
      var action = e.target && e.target.getAttribute('data-action');
      if (!action) return;
      persist(action);
      banner.classList.remove('show');
      setTimeout(function () { banner.remove(); }, 400);
    });
  });
})();
