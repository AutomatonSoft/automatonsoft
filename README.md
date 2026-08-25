# AutomatonSoft GmbH – Website

Statische Website (reines HTML/CSS/JavaScript, kein Build-Prozess, kein Framework) für AutomatonSoft GmbH. Kann direkt auf jedem Webspace/Static-Hosting (z. B. Apache, Nginx, Netlify, Vercel, GitHub Pages, IONOS, Strato …) hochgeladen werden.

## Struktur

```
/
├── index.html                  Startseite
├── unternehmen.html            Über uns, Warum AutomatonSoft, Team, Prozess, Karriere, FAQ (Anker-Sektionen)
├── dienstleistungen.html       Alle 16 Leistungen (Anker-Sektionen)
├── branchen.html               15 Branchen (Anker-Sektionen)
├── entwickler-engagieren.html  Team-Verstärkung / Staff Augmentation (Anker-Sektionen)
├── portfolio.html              Portfolio, gegliedert nach 9 Kategorien (E-Commerce, Workforce & HR, AI Business Solutions, Supply Chain, Industrial AI, Hospitality, Automotive, Finance, Custom Software)
├── blog.html                   Blog-Übersicht (Platzhalter-Beiträge)
├── kontakt.html                Kontaktformular, Kontaktdaten, Karte (Click-to-load)
├── impressum.html              Impressum (§5 TMG) – Platzhalter, siehe unten
├── datenschutz.html            Datenschutzerklärung (DSGVO) – Platzhalter, siehe unten
├── robots.txt                  Crawler-Steuerung
├── sitemap.xml                 XML-Sitemap für Suchmaschinen
├── README.md                   Diese Datei
└── assets/
    ├── css/style.css           Gesamtes Styling (CSS-Variablen am Dateianfang)
    ├── js/main.js               Navigation, Dropdowns, FAQ-Akkordeon, Portfolio-Filter, Formular-Stub, Scroll-Reveal
    ├── js/editor.js             Passwortgeschützter Frontend-Bearbeitungsmodus (Texte/Bilder/Portfolio, lokal gespeichert)
    └── img/                     Logo, Icon-Crop, generierte SVG-Grafik
```

Jede Seite ist eigenständiges HTML mit identischem Header/Footer-Markup (kein Templating/Includes, bewusst einfach gehalten). Wer ein Framework (Next.js, Astro, 11ty …) aufsetzen möchte, kann Header/Footer/Nav 1:1 als Komponente übernehmen.

## Technik-Stack

- Reines HTML5 / CSS3 (Flexbox, Grid, CSS-Variablen) / Vanilla JavaScript (ES5-kompatibel, keine Abhängigkeiten)
- Schriften: Google Fonts (Poppins, Inter) via `<link>` im `<head>`
- Keine Build-Tools, kein npm nötig – einfach die Dateien deployen

## Bekannte Platzhalter (vor Go-Live ersetzen)

| Was | Wo | Suchen nach |
|---|---|---|
| E-Mail-Adresse | überall | `info@automatonsoft.de` (Domain ggf. anpassen) |
| Geschäftsführer, Registergericht, HRB-Nr., USt-IdNr. | impressum.html | `[Bitte … ergänzen]` |
| Hosting-Anbieter | datenschutz.html | `[Bitte Namen und Anschrift …]` |
| Team-Kacheln (echte Namen/Fotos) | unternehmen.html `#team` | Kürzel „GF“, „SE“, „UX“, „IT“ |
| Fälle mit Status „In Vorbereitung“ (Aftercool, LizaBot, Industry Human Organization, ProVocat, Woodguard, Router) | portfolio.html | Tag „In Vorbereitung“ |
| Blog-Beiträge (echte Artikel) | blog.html | Badge „Beispielbeitrag“ |
| Domain in SEO-Tags | alle `<head>`-Bereiche | `https://www.automatonsoft.de/` (canonical, Open Graph, JSON-LD, sitemap.xml, robots.txt) |
| Kontaktformular-Versand | kontakt.html / main.js | Formular ist aktuell nur ein Frontend-Stub (siehe unten) |
| Social-Media-Links (YouTube, Facebook, TikTok, Instagram, Snapchat, X) | Fußzeile aller Seiten, kontakt.html | `automatonsoft` in den jeweiligen Plattform-URLs |
| Bearbeitungsmodus-Passwort | assets/js/editor.js | Konstante `AS_EDIT_PASSWORD` |

Ein Grep über das ganze Projekt hilft, alle Stellen zu finden:

```bash
grep -rn "XX XX XXX\|Bitte.*ergänzen\|automatonsoft.de" .
```

## Kontaktformular anbinden

`kontakt.html` enthält ein reines Frontend-Formular (`#contact-form`). Der Submit-Handler in `assets/js/main.js` verhindert aktuell nur das Neuladen der Seite und zeigt einen Hinweistext. Für einen echten Versand:

1. Einfachste Variante: Formular-Service wie Formspree, Getform oder Web3Forms einbinden (POST-Endpoint in `action`-Attribut eintragen, JS-Handler ggf. entfernen oder anpassen).
2. Eigenes Backend: kleines Skript (PHP `mail()`, Node/Express-Route, Serverless-Function o. Ä.), das die Formulardaten per POST entgegennimmt und per E-Mail versendet oder in einer Datenbank/CRM speichert.
3. Nach Anbindung: Abschnitt „Kontaktformular“ in `datenschutz.html` entsprechend aktualisieren (welcher Dienst, welche Datenverarbeitung).

## SEO / GEO (Auffindbarkeit in Google & KI-Suchsystemen)

Bereits umgesetzt:

- Pro Seite: individueller `<title>`, Meta-Description, `rel="canonical"`
- Open Graph + Twitter-Card-Tags für Link-Vorschauen (Social Media, Messenger, KI-Chat-Suche)
- JSON-LD strukturierte Daten: `LocalBusiness` (auf allen Hauptseiten), `BreadcrumbList` (pro Seite), `FAQPage` (unternehmen.html), `Service` (entwickler-engagieren.html)
- `sitemap.xml` und `robots.txt` im Root
- Semantisches HTML (`h1`–`h3`-Hierarchie, `nav`, `header`, `footer`, `section`)

Empfehlungen für den Programmierer:

- Nach Domain-Festlegung: alle `https://www.automatonsoft.de/` Vorkommen (canonical, og:url, JSON-LD `@id`/`url`, sitemap.xml, robots.txt) auf die echte Domain anpassen (`grep -rln "automatonsoft.de" .`).
- Google Search Console einrichten, `sitemap.xml` dort einreichen.
- Für echte Portfolio-Projekte: pro Projekt ggf. eigene JSON-LD `CreativeWork`/`Project`-Daten ergänzen.
- Bilder (Logo, ggf. neue Fotos) mit aussagekräftigen `alt`-Texten versehen (teilweise schon vorhanden, bei neuen Bildern nicht vergessen).
- Ladezeit: Logo-PNG (`assets/img/logo.png`, ~480 KB) für Produktivbetrieb ggf. komprimieren oder als WebP bereitstellen.

## Barrierefreiheit / Robustheit

- `noscript`-Fallback sorgt dafür, dass Inhalte auch ohne JavaScript sichtbar sind (Scroll-Reveal-Animation).
- Google Maps auf der Kontaktseite lädt erst nach Klick (Datenschutz/DSGVO-freundlich, „Klick-Schranke“).
- Mobile Navigation als Off-Canvas-Menü, Breakpoint bei 1480px (wegen des 4. Mega-Dropdowns „Entwickler engagieren“ bewusst höher angesetzt als üblich, damit der Header nie umbricht).

## Portfolio-Struktur (`portfolio.html`)

Das Portfolio ist nach neun Kategorien gegliedert (Header-Dropdown „Portfolio“ verlinkt direkt auf die jeweilige Kategorie per Anker, z. B. `portfolio.html#ai-business-solutions`):

1. E-Commerce & Marketplace Automation
2. Workforce & HR Automation
3. AI Business Solutions
4. Supply Chain & Warehouse
5. Industrial AI & Manufacturing
6. Hospitality & Hotel Software
7. Automotive Software
8. Finance & Accounting Automation
9. Custom Software & Business Automation

Innerhalb jeder Kategorie stehen einzelne Produktfamilien/Fälle als Karten (`.project-card`, `data-category="<kategorie-slug>"`). Ein Klick auf einen Filter-Button oben (bzw. ein Kategorie-Link im Header-Dropdown) blendet über `assets/js/main.js` alle Karten der übrigen Kategorien aus; per URL-Hash (`#<kategorie-slug>`) lässt sich direkt zu einer Kategorie verlinken/scrollen.

Fälle ohne belastbare Funktionsbeschreibung (Aftercool, LizaBot, Industry Human Organization, ProVocat, Woodguard, Router) sind bewusst mit dem Tag „In Vorbereitung“ ausgewiesen statt mit erfundenen Inhalten aufgefüllt zu werden. Die „Automatonsoft AI Platform“-Karte bündelt 16 KI-Erweiterungen, die durchgängig als „Konzept“ gekennzeichnet sind, nicht als bereits produktiv im Einsatz.

**Hintergrund:** Diese Struktur (Kategorien, Produktfamilien, Konsolidierungslogik) basiert auf einer separaten strategischen Portfolio-Ausarbeitung (Word-Dokument „Automatonsoft-Portfolio-Strategie“). Dort sind für jeden Fall ausführliche Texte (Problem, Lösung, Funktionsweise, SEO-Text, GEO-Fragen) hinterlegt, falls später eigene Detailseiten pro Fall gebaut werden sollen — auf der Website selbst ist aktuell nur die Portfolio-Übersicht umgesetzt, keine Einzelseiten pro Fall.

Neue Kategorien/Fälle ergänzen: Filter-Button + passende Karte(n) in `portfolio.html` einfügen, `data-category` konsistent zum `data-filter`-Wert setzen, und bei Bedarf das `<select id="as-p-cat">` in `assets/js/editor.js` (Portfolio-Upload-Formular) um die neue Kategorie erweitern.

## Social-Media-Buttons (Fußzeile)

In der Fußzeile jeder Seite (klein) sowie zusätzlich groß auf der Kontaktseite befinden sich anklickbare Buttons zu YouTube, Facebook, TikTok, Instagram, WhatsApp, Snapchat und X. Alle Links sind aktuell **Platzhalter-URLs** (z. B. `https://www.instagram.com/automatonsoft`) und öffnen in einem neuen Tab. Vor Go-Live bitte durch die echten Profil-Links ersetzen:

```bash
grep -rln “youtube.com/@automatonsoft\|facebook.com/automatonsoft\|tiktok.com/@automatonsoft\|instagram.com/automatonsoft\|snapchat.com/add/automatonsoft\|x.com/automatonsoft” .
```

Die echte WhatsApp-Nummer (`wa.me/4917643450100`) ist an mehreren Stellen hinterlegt (Fußzeile, Kontaktseite, Social-Buttons, Schnellkontakt-Button – siehe nächster Abschnitt).

## Schnellkontakt: WhatsApp- und Kontakt-Button (alle Seiten)

Unten links auf jeder Seite schweben zwei Buttons (`.site-quick-contact` in jeder HTML-Datei, Styles in `assets/css/style.css`):

- **WhatsApp** (`.quick-whatsapp`) – großer, grüner Kreis-Button mit Puls-Animation, öffnet einen WhatsApp-Chat mit der echten Nummer `+49 176 43450100` inkl. vorausgefüllter Nachricht (`wa.me/4917643450100?text=...`). Damit landet man direkt im Chat mit dem hinterlegten Anschluss – die Website selbst kann WhatsApp nicht automatisch mit einem bestimmten Support-Mitarbeiter verbinden, das übernimmt WhatsApp/der Empfänger dieser Nummer.
- **Kontakt** (`.quick-contact`) – Pill-Button, verlinkt auf `kontakt.html#contact-form` und scrollt direkt zum Kontaktformular.

Beide Buttons sind bewusst außerhalb von Header/Footer als eigenes, global eingebundenes Element pro Seite umgesetzt (kein serverseitiges Include vorhanden). Anpassung der Telefonnummer/Nachricht: `href` bei `.quick-whatsapp` in allen HTML-Dateien suchen und ersetzen.

## Frontend-Bearbeitungsmodus (Texte, Bilder, Portfolio direkt auf der Seite ändern)

Über den Button „✎ Bearbeiten” unten rechts auf jeder Seite lässt sich ein passwortgeschützter Bearbeitungsmodus aktivieren (`assets/js/editor.js`). Aktiv, können direkt im Frontend geändert werden:

- **Texte**: Alle Überschriften, Absätze und einfachen Listenpunkte im Hauptinhalt werden klickbar/editierbar (gestrichelter Rahmen beim Hovern). Änderungen speichern automatisch beim Verlassen des Feldes.
- **Bilder**: Logo (Header/Footer/Hero) und die Grafik auf „Entwickler engagieren” lassen sich per Klick auf „Bild ändern” durch eine eigene Datei ersetzen.
- **Portfolio**: Auf `portfolio.html` erscheint zusätzlich eine Karte „+ Neues Projekt hochladen” – Titel, eine der neun Portfolio-Kategorien, Kurzbeschreibung und optional ein Bild hochladen, das Projekt erscheint sofort in der passenden Kategorie/Filter und lässt sich über das ✕ wieder löschen.

**Standard-Passwort:** `automatonsoft2026` — bitte in `assets/js/editor.js` (Konstante `AS_EDIT_PASSWORD`, ganz oben) vor Veröffentlichung ändern.

**Wichtige Einschränkung, bitte unbedingt beachten:** Diese Website ist rein statisch (kein Server, keine Datenbank). Alle Änderungen im Bearbeitungsmodus werden ausschließlich im `localStorage` des jeweiligen Browsers gespeichert:

- Änderungen sind nur auf dem Gerät/Browser sichtbar, auf dem sie vorgenommen wurden – nicht automatisch für andere Besucher oder Geräte.
- Das Passwort ist eine einfache Klartext-Prüfung im JavaScript-Code (im Quelltext einsehbar) und dient nur als Zugriffs-Hürde für eine Demo/Kleinstlösung, **kein echter Sicherheitsmechanismus**.
- Über den Button „Änderungen exportieren” in der Werkzeugleiste (nur im Bearbeitungsmodus sichtbar) lässt sich der aktuelle Stand aller lokalen Änderungen als JSON-Datei herunterladen.

**Empfehlung für den Programmierer, falls echte, geräteübergreifende Bearbeitung gewünscht ist:** Ein kleines Backend (z. B. Node/Express, PHP oder eine Serverless-Function) mit echter Authentifizierung aufsetzen, das die per Export erzeugten JSON-Daten entgegennimmt und dauerhaft speichert (Datei oder Datenbank), sowie `editor.js` so erweitern, dass es beim Laden diese Daten vom Server statt aus `localStorage` lädt. Die Struktur (Text-Keys pro Seite/Element, Bild-Rollen, Portfolio-Array) ist in `assets/js/editor.js` dokumentiert und kann 1:1 übernommen werden.

Aus Stabilitätsgründen ist die Fußzeile bewusst von der automatischen Text-Bearbeitung ausgenommen (Navigations-/Struktur-Elemente). Bei Bedarf lässt sich das in `editor.js` in der Funktion `isExcluded()` anpassen.

## Bekannte Design-Entscheidung: „Entwickler engagieren”

Diese Rubrik wurde – angelehnt an gängige IT-Dienstleister-Strukturen – bewusst kompakter gehalten (10 Rollen statt z. B. 20+), um realistisch zur Teamgröße von AutomatonSoft zu passen. Bei Bedarf lässt sich die Liste in `entwickler-engagieren.html` (Karten-Grid) sowie im Nav-Dropdown aller Seiten beliebig erweitern – gleiches Markup-Muster wie bei den bestehenden Karten kopieren.

## Lokal testen

Kein Server nötig, aber empfohlen wegen relativer Pfade:

```bash
python3 -m http.server 8000
# dann im Browser: http://localhost:8000/index.html
```
