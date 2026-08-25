// AutomatonSoft GmbH — shared site behaviour
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.classList.toggle('open');
    });
  }

  /* Dropdown menus (click on mobile, hover on desktop handled by CSS focus too) */
  var dropdownParents = document.querySelectorAll('.has-dropdown');
  dropdownParents.forEach(function (item) {
    var link = item.querySelector('.nav-link');
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1480) {
        e.preventDefault();
        var wasOpen = item.classList.contains('open');
        dropdownParents.forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 1480 && !e.target.closest('.has-dropdown')) {
      dropdownParents.forEach(function (i) { i.classList.remove('open'); });
    }
  });
  if (window.innerWidth > 1480) {
    dropdownParents.forEach(function (item) {
      item.addEventListener('mouseenter', function () { item.classList.add('open'); });
      item.addEventListener('mouseleave', function () { item.classList.remove('open'); });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (faq) {
    var q = faq.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = faq.classList.contains('open');
      faq.parentElement.querySelectorAll('.faq-item').forEach(function (f) { f.classList.remove('open'); });
      if (!isOpen) faq.classList.add('open');
    });
  });

  /* Portfolio filter (re-queries cards on every click so project cards added
     later — e.g. via den Bearbeitungsmodus/Portfolio-Upload — are included too) */
  var filterBtns = document.querySelectorAll('.filter-btn');
  function applyFilter(cat) {
    filterBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-filter') === cat);
    });
    var projectCards = document.querySelectorAll('[data-category]');
    projectCards.forEach(function (card) {
      if (cat === 'alle' || card.getAttribute('data-category') === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
  /* Deep-linking: Portfolio-Dropdown im Header verlinkt auf portfolio.html#<kategorie-slug>.
     Beim Laden bzw. bei Klick auf einen solchen Link wird automatisch der passende Filter aktiviert
     und zur betreffenden Karte gescrollt. */
  if (filterBtns.length) {
    var applyHashFilter = function () {
      var slug = window.location.hash.replace('#', '');
      if (!slug) return;
      var matchingBtn = document.querySelector('.filter-btn[data-filter="' + slug + '"]');
      if (matchingBtn) {
        applyFilter(slug);
        var target = document.getElementById(slug);
        if (target) {
          setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
        }
      }
    };
    applyHashFilter();
    window.addEventListener('hashchange', applyHashFilter);
  }

  /* Scroll reveal (with safety fallback so content never stays stuck at
     opacity:0 — e.g. if IntersectionObserver never fires for an element,
     a screenshot tool captures instantly, or something else goes wrong) */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(function (el) { obs.observe(el); });
    // Safety net: reveal everything after a short delay regardless.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }, 1800);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Click-to-load Google Map (avoids loading Google's iframe — and transmitting
     the visitor's IP to Google — before the visitor actively consents) */
  var mapBtn = document.getElementById('load-map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var placeholder = document.getElementById('map-placeholder');
      var iframe = document.createElement('iframe');
      iframe.title = 'Standort AutomatonSoft GmbH';
      iframe.src = 'https://www.google.com/maps?q=Am+Flugplatz+28,+88483+Burgrieden,+Germany&output=embed';
      iframe.width = '100%';
      iframe.height = '420';
      iframe.style.border = '0';
      iframe.style.display = 'block';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      placeholder.replaceWith(iframe);
    });
  }

  /* Contact form — front-end only stub (no backend wired up yet) */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('form-note');
      if (note) {
        note.textContent = 'Danke! Dieses Formular ist noch nicht mit einem Versand verbunden — bitte richten Sie dafür einen Formular-Service oder ein Backend ein.';
        note.style.display = 'block';
      }
      form.reset();
    });
  }

  /* Active nav link highlight */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('current');
  });

});
