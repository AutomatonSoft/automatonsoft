import { commonFaq } from './common';

// Industry landing: hospitality. Facts from the Lunanitiz Hotel Software project and the industry copy on /branchen only (docs/TZ.md §8).
// No product screenshot yet, so the hero lists the building blocks instead of an image.
const de = {
  meta: {
    title: 'Hotelsoftware: Buchungen zentral steuern',
    description: 'Buchungen und Verfügbarkeiten aus allen Kanälen an einem Ort. Individuelle Software für Hotellerie, DSGVO-konform.',
  },
  name: 'Hotellerie',
  hero: {
    eyebrow: 'Branchen · Hotellerie',
    titleStart: 'Jede Buchung.', titleHighlight: 'Ein Kalender.', titleEnd: 'Doppelbuchungen vermeiden.',
    lead: 'Buchungen und Verfügbarkeiten verteilen sich auf mehrere Plattformen – mit manuellem Abgleich als Folge. Wir bringen alles in ein System, mit dem Ihr Team den Überblick behält.',
    primary: 'Kostenlosen Prozess-Check anfragen', secondary: 'Referenzen',
    panelLabel: 'Unser Prototyp', panelTitle: 'Lunanitiz Hotel Software',
    panel: [
      { name: 'Buchungskalender', text: 'Belegung über 21 Tage' },
      { name: 'Smart Pricing', text: 'Preisvorschläge nach Saison und Wochentag' },
      { name: 'Housekeeping', text: 'Zimmerreinigung und Status' },
    ],
  },
  problem: {
    eyebrow: 'Das Problem', title: 'Mehrere Plattformen, ein Kalender im Kopf',
    items: [
      { title: 'Buchungen auf vielen Plattformen', text: 'Anfragen und Buchungen kommen über verschiedene Kanäle und müssen von Hand zusammengeführt werden.' },
      { title: 'Abgleich von Hand', text: 'Verfügbarkeiten werden manuell nachgezogen – Doppelbuchungen sind die Folge.' },
      { title: 'Kein gemeinsamer Überblick', text: 'Wer reist wann an, welches Objekt ist frei? Jede Antwort kostet Zeit und Rückfragen.' },
    ],
    note: 'Was das in Ihrem Betrieb kostet, hängt von Objekten, Kanälen und Buchungsvolumen ab. Im Erstgespräch schätzen wir es mit Ihren Zahlen ab.',
  },
  solution: {
    eyebrow: 'So lösen wir es', title: 'Drei Bausteine, schrittweise eingeführt',
    text: 'Wir starten mit dem Baustein, der Ihnen am meisten Zeit spart, und bauen von dort aus weiter – ohne Ihren laufenden Betrieb zu stören.',
    steps: [
      { title: 'Buchungs- und Verfügbarkeitsmanagement', text: 'Buchungen und Verfügbarkeiten laufen an einem Ort zusammen – mit klarem Stand für das ganze Team.' },
      { title: 'Kanal- und Plattformanbindung', text: 'Plattformen werden über Schnittstellen angebunden, statt von Hand abgeglichen. ' },
      { title: 'Gäste- und Objektverwaltung', text: 'Gäste und Objekte werden strukturiert im System geführt.' },
    ],
  },
  compare: {
    rows: [
      ['Prozesse', 'Sie passen Ihre Abläufe der Software an', 'Die Software folgt Ihren Abläufen im Betrieb'],
      ['Anbindungen', 'Nur die vorgesehenen Schnittstellen', 'Ihre Plattformen und Ihre bestehenden Systeme'],
      ['Kosten', 'Lizenz pro Nutzer oder Objekt', 'Entwicklung nach Aufwand, keine Lizenz pro Nutzer'],
      ['Start', 'Sofort nutzbar', 'Start in Etappen nach der Analyse'],
      ['Weiterentwicklung', 'Nach der Roadmap des Anbieters', 'Nach Ihren Prioritäten'],
    ],
  },
  references: { eyebrow: 'Referenzen', title: 'Unser Prototyp für Buchungen und Preise' },
  band: { text: 'Erzählen Sie uns, wo Buchungen oder Verfügbarkeiten Ihr Team die meiste Zeit kosten – wir zeigen, was von selbst laufen kann.' },
  faq: {
    items: [
      { q: 'Können wir mit einem Objekt oder einer Plattform starten?', a: 'Ja. Wir beginnen mit dem Bereich, der Ihnen am meisten Zeit spart, und erweitern Schritt für Schritt um weitere Plattformen und Objekte.' },
      { q: 'Welche Plattformen können Sie anbinden?', a: 'Gängige Buchungsportale lassen sich über Schnittstellen anbinden. Welche Plattformen für Sie sinnvoll sind, klären wir im Erstgespräch.' },
      commonFaq.de.erp,
      { q: 'Für welche Betriebe ist die Lösung gedacht?', a: 'Für Hotellerie und Kurzzeitvermietung. Ob ein einzelnes Haus oder mehrere Objekte: Wir richten die Lösung nach Ihren Abläufen aus.' },
      { q: 'Was kostet ein Projekt?', a: 'Das hängt vom Umfang ab: Anzahl der Objekte und Plattformen, vorhandene Systeme und Datenqualität. Nach der Analyse erhalten Sie ein Angebot mit klaren Etappen. Das Erstgespräch ist kostenlos.' },
      commonFaq.de.gdpr,
      commonFaq.de.ownership,
    ],
  },
  contact: {
    text: 'Beschreiben Sie, wie Buchungen und Verfügbarkeiten heute bei Ihnen laufen. Wir melden uns mit einer ersten Einschätzung und einem Terminvorschlag.',
    message: 'Über welche Plattformen kommen Buchungen zu Ihnen, und wie gleichen Sie Verfügbarkeiten heute ab?',
  },
};

const en = {
  meta: {
    title: 'Hotel software: manage bookings centrally',
    description: 'Bookings and availability from every channel in one place. Custom software for hotels and short-term rentals, GDPR-compliant.',
  },
  name: 'Hospitality',
  hero: {
    eyebrow: 'Industries · Hospitality',
    titleStart: 'Every booking.', titleHighlight: 'One calendar.', titleEnd: 'Avoid double bookings.',
    lead: 'Bookings and availability are spread across several platforms, which means manual reconciliation. We bring everything into one system that lets your team keep the overview.',
    primary: 'Request a free process check', secondary: 'References',
    panelLabel: 'Our prototype', panelTitle: 'Lunanitiz Hotel Software',
    panel: [
      { name: 'Booking calendar', text: '21-day occupancy view' },
      { name: 'Smart pricing', text: 'Price suggestions by season and weekday' },
      { name: 'Housekeeping', text: 'Room cleaning and status' },
    ],
  },
  problem: {
    eyebrow: 'The problem', title: 'Several platforms, one calendar in your head',
    items: [
      { title: 'Bookings on many platforms', text: 'Enquiries and bookings arrive through different channels and have to be merged by hand.' },
      { title: 'Reconciling by hand', text: 'Availability is updated manually – double bookings are the result.' },
      { title: 'No shared overview', text: 'Who arrives when, which property is free? Every answer costs time and follow-up questions.' },
    ],
    note: 'What this costs your business depends on properties, channels and booking volume. In the first call we estimate it with your numbers.',
  },
  solution: {
    eyebrow: 'How we solve it', title: 'Three building blocks, introduced step by step',
    text: 'We start with the building block that saves you the most time and build from there – without disrupting your day-to-day operations.',
    steps: [
      { title: 'Booking and availability management', text: 'Bookings and availability come together in one place – with a clear status for the whole team.' },
      { title: 'Channel and platform integration', text: 'Platforms are connected through interfaces instead of reconciled by hand. ' },
      { title: 'Guest and property administration', text: 'Guests and properties are kept in the system in a structured way.' },
    ],
  },
  compare: {
    rows: [
      ['Processes', 'You adapt your workflows to the software', 'The software follows your day-to-day workflows'],
      ['Connections', 'Only the interfaces provided', 'Your platforms and your existing systems'],
      ['Costs', 'Licence per user or property', 'Development by effort, no per-user licence'],
      ['Start', 'Ready to use immediately', 'Rolled out in stages after the analysis'],
      ['Further development', 'Follows the vendor’s roadmap', 'Follows your priorities'],
    ],
  },
  references: { eyebrow: 'References', title: 'Our prototype for bookings and prices' },
  band: { text: 'Tell us where bookings or availability cost your team the most time – we will show you what can run on its own.' },
  faq: {
    items: [
      { q: 'Can we start with one property or one platform?', a: 'Yes. We start with the area that saves you the most time and extend step by step to further platforms and properties.' },
      { q: 'Which platforms can you connect?', a: 'Common booking portals can be connected through interfaces. Which platforms make sense for you, we clarify in the first call.' },
      commonFaq.en.erp,
      { q: 'Which businesses is the solution meant for?', a: 'For hotels and short-term rentals. Whether a single house or several properties: we shape the solution around your workflows.' },
      { q: 'What does a project cost?', a: 'That depends on the scope: number of properties and platforms, existing systems and data quality. After the analysis you receive a quote with clear milestones. The first call is free.' },
      commonFaq.en.gdpr,
      commonFaq.en.ownership,
    ],
  },
  contact: {
    text: 'Describe how bookings and availability run for you today. We’ll get back to you with a first assessment and a proposed date.',
    message: 'Which platforms do your bookings come through, and how do you reconcile availability today?',
  },
};

const hospitality = {
  slug: { de: 'hotellerie', en: 'hospitality' },
  cases: ['lunanitiz'],
  content: { de, en },
};

export default hospitality;
