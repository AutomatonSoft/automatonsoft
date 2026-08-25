/* AutomatonSoft GmbH — Frontend-Bearbeitungsmodus
   -----------------------------------------------------------------------
   Passwortgeschützter "Klick-und-bearbeite"-Modus, mit dem Texte, Bilder
   (Logo etc.) und die Portfolio-Projekte direkt im Frontend geändert
   werden können — ganz ohne CMS/Backend.

   WICHTIG (bitte lesen, auch in README.md dokumentiert):
   - Änderungen werden ausschließlich im localStorage DIESES Browsers
     gespeichert. Sie sind NICHT serverseitig gespeichert, gelten also nur
     auf diesem Gerät/Browser und werden nicht automatisch mit anderen
     Besuchern oder Geräten geteilt.
   - Das Passwort unten ist eine einfache Klartext-Prüfung im Frontend-Code
     und dient nur als Zugriffs-Hürde für den Editier-Modus einer
     statischen Demo-Seite — KEIN echter Sicherheitsmechanismus (der
     Quellcode ist im Browser einsehbar). Für echten, geräteübergreifenden
     und abgesicherten Login sollte ein Entwickler ein Backend mit
     echter Authentifizierung anbinden.
   - Über den Button "Änderungen exportieren" im Werkzeugleisten-Modus
     lässt sich der aktuelle Stand aller lokalen Änderungen als JSON-Datei
     herunterladen und einem Programmierer zur dauerhaften Übernahme geben.
   ----------------------------------------------------------------------- */
(function () {
  'use strict';

  var AS_EDIT_PASSWORD = 'automatonsoft2026'; /* TODO Entwickler: Passwort ändern / durch echtes Login ersetzen */
  var PAGE = (window.location.pathname.split('/').pop() || 'index.html');
  var LS_TEXT_PREFIX = 'as_edit_text::' + PAGE + '::';
  var LS_IMG_PREFIX = 'as_edit_img::';
  var SESSION_KEY = 'as_edit_mode_on';
  var PORTFOLIO_KEY = 'as_portfolio_custom';
  var MAX_IMG_BYTES = 1.8 * 1024 * 1024;

  var IMG_ROLE_BY_FILE = {
    'logo-icon.png': 'logo-icon',
    'logo.png': 'logo-main',
    'network-graphic.svg': 'network-graphic'
  };

  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';
  var ICON_EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.5l4 4L8 20l-5 1 1-5z"/></svg>';

  function qsAll(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function isEditMode() { return sessionStorage.getItem(SESSION_KEY) === '1'; }

  function isExcluded(el) {
    return !!el.closest('.site-header, .site-footer, .dropdown, .filter-bar, .footer-social, .as-add-card, .as-custom-project, .site-quick-contact, script, style, .legal-links, .breadcrumb, [data-no-edit]');
  }

  function getEditableTextEls() {
    var sel = 'h1,h2,h3,h4,p,li,.lead,.eyebrow,.badge-note';
    return qsAll(sel).filter(function (el) {
      if (isExcluded(el)) return false;
      if (el.children.length > 0) return false;
      if (el.textContent.trim().length < 2) return false;
      return true;
    });
  }

  /* ---------------- Gespeicherte Änderungen anwenden (immer, unabhängig vom Bearbeitungsmodus) ---------------- */
  function applySavedTextEdits() {
    getEditableTextEls().forEach(function (el, i) {
      var key = LS_TEXT_PREFIX + el.tagName + '-' + i;
      el.setAttribute('data-as-key', key);
      var saved;
      try { saved = localStorage.getItem(key); } catch (e) { saved = null; }
      if (saved !== null) el.innerHTML = saved;
    });
  }

  function applySavedImages() {
    qsAll('img').forEach(function (img) {
      var file = (img.getAttribute('src') || '').split('/').pop();
      var role = IMG_ROLE_BY_FILE[file];
      if (!role) return;
      img.setAttribute('data-as-img-role', role);
      var saved;
      try { saved = localStorage.getItem(LS_IMG_PREFIX + role); } catch (e) { saved = null; }
      if (saved) img.src = saved;
    });
  }

  /* ---------------- Toast ---------------- */
  var toastTimer;
  function showToast(msg) {
    var t = document.getElementById('as-toast');
    if (!t) { t = document.createElement('div'); t.id = 'as-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  /* ---------------- Bearbeiten-Button (unten rechts, auf jeder Seite) ---------------- */
  function buildFab() {
    if (document.getElementById('as-edit-fab')) return;
    var fab = document.createElement('button');
    fab.id = 'as-edit-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Bearbeitungsmodus');
    updateFabLabel(fab);
    fab.addEventListener('click', function () {
      if (isEditMode()) { disableEditMode(); } else { openLoginModal(); }
    });
    document.body.appendChild(fab);
  }

  function updateFabLabel(fab) {
    fab.innerHTML = isEditMode()
      ? ICON_CLOSE + '<span>Bearbeitung beenden</span>'
      : ICON_EDIT + '<span>Bearbeiten</span>';
  }

  function openLoginModal() {
    var overlay = document.createElement('div');
    overlay.className = 'as-modal-overlay';
    overlay.innerHTML =
      '<div class="as-modal" role="dialog" aria-modal="true">' +
      '  <h3>Bearbeitungsmodus</h3>' +
      '  <p>Bitte geben Sie das Passwort ein, um Texte, Bilder und das Portfolio direkt auf dieser Seite zu bearbeiten.</p>' +
      '  <div class="field"><label for="as-pw-input">Passwort</label><input type="password" id="as-pw-input" autocomplete="off"></div>' +
      '  <div class="as-modal-note">Hinweis: Änderungen werden nur lokal in diesem Browser gespeichert, nicht serverseitig. Für dauerhafte, geräteübergreifende Änderungen sollte ein Entwickler ein echtes Backend anbinden (siehe README.md).</div>' +
      '  <div class="as-modal-actions">' +
      '    <button type="button" class="btn btn-outline-dark btn-sm" id="as-pw-cancel">Abbrechen</button>' +
      '    <button type="button" class="btn btn-primary btn-sm" id="as-pw-submit">Anmelden</button>' +
      '  </div>' +
      '  <div class="as-modal-error" id="as-pw-error" style="display:none">Falsches Passwort.</div>' +
      '</div>';
    document.body.appendChild(overlay);
    var input = overlay.querySelector('#as-pw-input');
    input.focus();

    function submit() {
      if (input.value === AS_EDIT_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.remove();
        enableEditMode();
      } else {
        overlay.querySelector('#as-pw-error').style.display = 'block';
      }
    }
    overlay.querySelector('#as-pw-submit').addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    overlay.querySelector('#as-pw-cancel').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  function enableEditMode() {
    document.body.classList.add('as-edit-on');
    var fab = document.getElementById('as-edit-fab');
    if (fab) updateFabLabel(fab);
    makeTextEditable();
    makeImagesEditable();
    buildToolbar();
    if (PAGE === 'portfolio.html') buildPortfolioAdmin();
    showToast('Bearbeitungsmodus aktiv.');
  }

  function disableEditMode() {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  }

  /* ---------------- Texte bearbeiten ---------------- */
  function makeTextEditable() {
    getEditableTextEls().forEach(function (el) {
      el.setAttribute('contenteditable', 'true');
      el.classList.add('as-editable');
      el.addEventListener('blur', function () {
        var key = el.getAttribute('data-as-key');
        try {
          localStorage.setItem(key, el.innerHTML);
          showToast('Änderung gespeichert.');
        } catch (e) {
          showToast('Speichern fehlgeschlagen — lokaler Speicher ist voll.');
        }
      });
    });
  }

  /* ---------------- Bilder bearbeiten (Logo etc.) ---------------- */
  function makeImagesEditable() {
    qsAll('img[data-as-img-role]').forEach(function (img) {
      if (img.closest('.as-img-edit-wrap')) return;
      var wrap = document.createElement('span');
      wrap.className = 'as-img-edit-wrap';
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'as-img-edit-btn';
      btn.textContent = 'Bild ändern';
      wrap.appendChild(btn);

      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      wrap.appendChild(input);

      btn.addEventListener('click', function () { input.click(); });
      input.addEventListener('change', function () {
        var file = input.files[0];
        if (!file) return;
        if (file.size > MAX_IMG_BYTES) {
          showToast('Bild ist recht groß — für lokale Speicherung idealerweise unter 1,8 MB.');
        }
        var reader = new FileReader();
        reader.onload = function () {
          img.src = reader.result;
          try {
            localStorage.setItem(LS_IMG_PREFIX + img.getAttribute('data-as-img-role'), reader.result);
            showToast('Bild gespeichert.');
          } catch (e) {
            showToast('Speichern fehlgeschlagen — lokaler Speicher ist voll.');
          }
        };
        reader.readAsDataURL(file);
      });
    });
  }

  /* ---------------- Werkzeugleiste ---------------- */
  function buildToolbar() {
    if (document.getElementById('as-toolbar')) return;
    var bar = document.createElement('div');
    bar.id = 'as-toolbar';
    bar.innerHTML =
      '<span class="as-toolbar-label">✎ Bearbeitungsmodus aktiv — klicken Sie auf Texte, Bilder oder das Portfolio, um sie zu ändern. Änderungen speichern automatisch beim Verlassen des Feldes.</span>' +
      '<div class="as-toolbar-actions">' +
      '  <button type="button" id="as-export-btn" class="btn btn-outline btn-sm">Änderungen exportieren</button>' +
      '  <button type="button" id="as-reset-btn" class="btn btn-outline btn-sm">Seite zurücksetzen</button>' +
      '  <button type="button" id="as-logout-btn" class="btn btn-primary btn-sm">Abmelden</button>' +
      '</div>';
    document.body.appendChild(bar);
    document.getElementById('as-export-btn').addEventListener('click', exportEdits);
    document.getElementById('as-reset-btn').addEventListener('click', resetPageEdits);
    document.getElementById('as-logout-btn').addEventListener('click', disableEditMode);
  }

  function resetPageEdits() {
    if (!window.confirm('Alle lokalen Text- und Bild-Änderungen dieser Seite wirklich zurücksetzen?')) return;
    Object.keys(localStorage).forEach(function (k) {
      if (k.indexOf(LS_TEXT_PREFIX) === 0) localStorage.removeItem(k);
    });
    location.reload();
  }

  function exportEdits() {
    var data = {};
    Object.keys(localStorage).forEach(function (k) {
      if (k.indexOf('as_edit_text::') === 0 || k.indexOf(LS_IMG_PREFIX) === 0 || k.indexOf(PORTFOLIO_KEY) === 0) {
        data[k] = localStorage.getItem(k);
      }
    });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'automatonsoft-aenderungen.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Export heruntergeladen.');
  }

  /* ---------------- Portfolio: eigene Projekte hochladen ---------------- */
  function getCustomProjects() {
    try { return JSON.parse(localStorage.getItem(PORTFOLIO_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveCustomProjects(list) {
    try { localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(list)); }
    catch (e) { showToast('Speichern fehlgeschlagen — lokaler Speicher ist voll (Bild ggf. verkleinern).'); }
  }

  function renderCustomProjects() {
    var grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    qsAll('.as-custom-project', grid).forEach(function (el) { el.remove(); });
    getCustomProjects().forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'project-card as-custom-project';
      card.setAttribute('data-category', p.category);
      var thumbStyle = p.image ? ' style="background-image:url(\'' + p.image + '\');background-size:cover;background-position:center"' : '';
      card.innerHTML =
        '<div class="project-thumb"' + thumbStyle + '>' +
        (p.image ? '' : '<div class="hex-pattern"></div><span>' + escapeHtml(p.title) + '</span>') +
        '<button type="button" class="as-card-delete" data-id="' + p.id + '" aria-label="Projekt löschen">✕</button>' +
        '</div>' +
        '<div class="project-body">' +
        '  <div class="project-tag">' + escapeHtml(p.categoryLabel) + ' · Eigenes Projekt</div>' +
        '  <h3>' + escapeHtml(p.title) + '</h3>' +
        '  <p>' + escapeHtml(p.desc) + '</p>' +
        '</div>';
      grid.appendChild(card);
    });
    qsAll('.as-card-delete', grid).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!window.confirm('Dieses Projekt wirklich löschen?')) return;
        var id = btn.getAttribute('data-id');
        saveCustomProjects(getCustomProjects().filter(function (p) { return p.id !== id; }));
        renderCustomProjects();
      });
    });
  }

  function buildPortfolioAdmin() {
    var grid = document.getElementById('portfolio-grid');
    if (!grid || document.querySelector('.as-add-card')) return;
    var addCard = document.createElement('button');
    addCard.type = 'button';
    addCard.className = 'project-card as-add-card';
    addCard.innerHTML = '<span class="as-add-card-inner"><span class="as-add-plus">+</span>Neues Projekt hochladen</span>';
    addCard.addEventListener('click', openPortfolioForm);
    grid.insertBefore(addCard, grid.firstChild);
  }

  function openPortfolioForm() {
    var overlay = document.createElement('div');
    overlay.className = 'as-modal-overlay';
    overlay.innerHTML =
      '<div class="as-modal" role="dialog" aria-modal="true">' +
      '  <h3>Neues Projekt hochladen</h3>' +
      '  <div class="field"><label for="as-p-title">Titel</label><input type="text" id="as-p-title"></div>' +
      '  <div class="field"><label for="as-p-cat">Kategorie</label>' +
      '    <select id="as-p-cat">' +
      '      <option value="ecommerce-marketplace-automation">E-Commerce &amp; Marketplace Automation</option>' +
      '      <option value="workforce-hr-automation">Workforce &amp; HR Automation</option>' +
      '      <option value="ai-business-solutions">AI Business Solutions</option>' +
      '      <option value="supply-chain-warehouse">Supply Chain &amp; Warehouse</option>' +
      '      <option value="industrial-ai-manufacturing">Industrial AI &amp; Manufacturing</option>' +
      '      <option value="hospitality-hotel-software">Hospitality &amp; Hotel Software</option>' +
      '      <option value="automotive-software">Automotive Software</option>' +
      '      <option value="finance-accounting-automation">Finance &amp; Accounting Automation</option>' +
      '      <option value="custom-software-business-automation">Custom Software &amp; Business Automation</option>' +
      '    </select></div>' +
      '  <div class="field"><label for="as-p-desc">Kurzbeschreibung</label><textarea id="as-p-desc" rows="3"></textarea></div>' +
      '  <div class="field"><label for="as-p-img">Bild (optional)</label><input type="file" id="as-p-img" accept="image/*"></div>' +
      '  <div class="as-modal-note">Wird nur lokal in diesem Browser gespeichert (siehe Hinweis oben im Bearbeitungsmodus).</div>' +
      '  <div class="as-modal-actions">' +
      '    <button type="button" class="btn btn-outline-dark btn-sm" id="as-p-cancel">Abbrechen</button>' +
      '    <button type="button" class="btn btn-primary btn-sm" id="as-p-submit">Projekt speichern</button>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#as-p-cancel').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#as-p-submit').addEventListener('click', function () {
      var title = overlay.querySelector('#as-p-title').value.trim();
      if (!title) { showToast('Bitte einen Titel angeben.'); return; }
      var catSelect = overlay.querySelector('#as-p-cat');
      var catVal = catSelect.value;
      var catLabel = catSelect.options[catSelect.selectedIndex].text;
      var desc = overlay.querySelector('#as-p-desc').value.trim();
      var fileInput = overlay.querySelector('#as-p-img');
      var file = fileInput.files[0];

      function finish(imageDataUrl) {
        var list = getCustomProjects();
        list.push({
          id: 'p' + new Date().getTime(),
          title: title, category: catVal, categoryLabel: catLabel, desc: desc,
          image: imageDataUrl || null
        });
        saveCustomProjects(list);
        renderCustomProjects();
        overlay.remove();
        showToast('Projekt hinzugefügt.');
      }

      if (file) {
        if (file.size > MAX_IMG_BYTES) showToast('Bild ist recht groß — für lokale Speicherung idealerweise unter 1,8 MB.');
        var reader = new FileReader();
        reader.onload = function () { finish(reader.result); };
        reader.readAsDataURL(file);
      } else {
        finish(null);
      }
    });
  }

  /* ---------------- Start ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    applySavedTextEdits();
    applySavedImages();
    buildFab();
    if (PAGE === 'portfolio.html') renderCustomProjects();
    if (isEditMode()) enableEditMode();
  });

})();
