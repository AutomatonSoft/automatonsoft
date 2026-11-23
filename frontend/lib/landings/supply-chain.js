import { commonFaq } from './common';

// Industry landing: warehouse & logistics. Facts from the Supply Chain Automation Suite only (docs/TZ.md §8).
// No product screenshot yet, so the hero shows the suite's modules instead of an image.
const de = {
  meta: {
    title: 'Lager- und Logistiksoftware nach Maß',
    description: 'Bestellungen aus allen Kanälen an einem Ort und strukturierte Lagerorganisation statt Papier. Individuelle Software aus Deutschland, DSGVO-konform.',
  },
  name: 'Lager & Logistik',
  hero: {
    eyebrow: 'Branchen · Lager & Logistik',
    titleStart: 'Alle Bestellungen.', titleHighlight: 'Ein Ort.', titleEnd: 'Ein Lager ohne Zettel.',
    lead: 'Bestellungen kommen über viele Kanäle, während Lagerprozesse auf Papier und manuellen Übergaben beruhen. Wir bringen Bestellungen und Lager in ein System, mit dem Ihr Team gern arbeitet.',
    primary: 'Kostenlosen Prozess-Check anfragen', secondary: 'Referenzen',
    panelLabel: 'Bereits im Einsatz', panelTitle: 'Supply Chain Automation Suite',
    panel: [
      { name: 'OrderHub', text: 'Bestellungen aus allen Kanälen an einem Ort' },
      { name: 'Warehouse Organizer', text: 'Strukturierte Lagerorganisation' },
      { name: 'BerimDepom', text: 'Lagerorganisation' },
    ],
  },
  problem: {
    eyebrow: 'Das Problem', title: 'Bestellungen überall, Wissen nur im Kopf',
    items: [
      { title: 'Bestellungen aus vielen Kanälen', text: 'Shop, E-Mail, Telefon, Marktplatz: Aufträge landen an verschiedenen Stellen und werden von Hand zusammengeführt.' },
      { title: 'Papier und Zuruf im Lager', text: 'Lagerprozesse beruhen auf Zetteln und mündlichen Übergaben – das Wissen steckt in einzelnen Köpfen.' },
      { title: 'Kein aktueller Überblick', text: 'Wo steht ein Auftrag, was liegt wo? Jede Antwort kostet Rückfragen und Zeit.' },
    ],
    note: 'Was das in Ihrem Unternehmen kostet, hängt von Auftragsvolumen, Kanälen und Lagergröße ab. Im Erstgespräch schätzen wir es mit Ihren Zahlen ab.',
  },
  solution: {
    eyebrow: 'So lösen wir es', title: 'Drei Bausteine, schrittweise eingeführt',
    text: 'Wir starten mit dem Baustein, der Ihnen am meisten Zeit spart, und bauen von dort aus weiter – ohne Ihren laufenden Betrieb zu stören.',
    steps: [
      { title: 'Zentrale Bestellverwaltung', text: 'Aufträge aus allen Kanälen laufen an einem Ort zusammen – mit klarem Status für das ganze Team.' },
      { title: 'Lagerorganisation', text: 'Bestände und Abläufe im Lager strukturiert im System statt auf Papier.' },
      { title: 'Lieferanten- und Kanalanbindung', text: 'Lieferanten und Verkaufskanäle über Schnittstellen angebunden – ohne Abtippen.' },
    ],
  },
  compare: {
    rows: [
      ['Prozesse', 'Sie passen Ihre Abläufe der Software an', 'Die Software folgt Ihren Abläufen im Lager'],
      ['Anbindungen', 'Nur die vorgesehenen Schnittstellen', 'Ihre Kanäle, Lieferanten und Ihr ERP'],
      ['Kosten', 'Lizenz pro Nutzer oder Standort', 'Entwicklung nach Aufwand, keine Lizenz pro Nutzer'],
      ['Start', 'Sofort nutzbar', 'Start in Etappen nach der Analyse'],
      ['Weiterentwicklung', 'Nach der Roadmap des Anbieters', 'Nach Ihren Prioritäten'],
    ],
  },
  references: { eyebrow: 'Referenzen', title: 'Bereits im Einsatz in Bestellung und Lager' },
  band: { text: 'Erzählen Sie uns, wo bei Bestellungen oder im Lager die meiste Zeit verloren geht – wir zeigen, was von selbst laufen kann.' },
  faq: {
    items: [
      { q: 'Können wir mit einem Lager oder einem Kanal starten?', a: 'Ja. Wir beginnen mit dem Bereich, der Ihnen am meisten Zeit spart, und erweitern Schritt für Schritt um weitere Kanäle und Standorte.' },
      commonFaq.de.erp,
      { q: 'Welche Systeme können Sie anbinden?', a: 'Wir binden Shops, Marktplätze, ERP- und Warenwirtschaftssysteme über deren Schnittstellen an. Welche Anbindungen für Sie sinnvoll sind, klären wir im Erstgespräch.' },
      { q: 'Wie viel Zeit spart die Automatisierung?', a: 'Weniger Abtippen, weniger Rückfragen und ein aktueller Überblick über Aufträge und Lager. Die tatsächliche Ersparnis hängt von Ihren Prozessen und dem Automatisierungsgrad ab – im Erstgespräch schätzen wir sie mit Ihren Zahlen ab.' },
      { q: 'Was kostet ein Projekt?', a: 'Das hängt vom Umfang ab: Anzahl der Kanäle und Standorte, vorhandene Systeme und Datenqualität. Nach der Analyse erhalten Sie ein Angebot mit klaren Etappen. Das Erstgespräch ist kostenlos.' },
      commonFaq.de.gdpr,
      commonFaq.de.ownership,
    ],
  },
  contact: {
    text: 'Beschreiben Sie Ihre Bestellkanäle und Lagerabläufe. Wir melden uns mit einer ersten Einschätzung und einem Terminvorschlag.',
    message: 'Wie kommen Bestellungen heute zu Ihnen, und wie ist Ihr Lager organisiert?',
  },
};

const en = {
  meta: {
    title: 'Warehouse & logistics software',
    description: 'Orders from every channel in one place and structured warehouse organisation instead of paper. Custom software from Germany, GDPR-compliant.',
  },
  name: 'Warehouse & logistics',
  hero: {
    eyebrow: 'Industries · Warehouse & logistics',
    titleStart: 'Every order.', titleHighlight: 'One place.', titleEnd: 'A warehouse without paper.',
    lead: 'Orders arrive through many channels while warehouse processes rely on paper and manual hand-offs. We bring orders and stock into one system your team actually likes to use.',
    primary: 'Request a free process check', secondary: 'References',
    panelLabel: 'Already in use', panelTitle: 'Supply Chain Automation Suite',
    panel: [
      { name: 'OrderHub', text: 'Orders from every channel in one place' },
      { name: 'Warehouse Organizer', text: 'Structured warehouse organisation' },
      { name: 'BerimDepom', text: 'Warehouse organisation' },
    ],
  },
  problem: {
    eyebrow: 'The problem', title: 'Orders everywhere, knowledge only in people’s heads',
    items: [
      { title: 'Orders from many channels', text: 'Shop, email, phone, marketplace: orders land in different places and are merged by hand.' },
      { title: 'Paper and shouting in the warehouse', text: 'Warehouse processes rely on notes and verbal hand-offs – the knowledge sits with individual people.' },
      { title: 'No up-to-date overview', text: 'Where is an order, what is stored where? Every answer costs follow-up questions and time.' },
    ],
    note: 'What this costs your business depends on order volume, channels and warehouse size. In the first call we estimate it with your numbers.',
  },
  solution: {
    eyebrow: 'How we solve it', title: 'Three building blocks, introduced step by step',
    text: 'We start with the building block that saves you the most time and build from there – without disrupting your day-to-day operations.',
    steps: [
      { title: 'Central order management', text: 'Orders from every channel come together in one place – with a clear status for the whole team.' },
      { title: 'Warehouse organisation', text: 'Stock and warehouse workflows structured in the system instead of on paper.' },
      { title: 'Supplier and channel integration', text: 'Suppliers and sales channels connected via interfaces – no retyping.' },
    ],
  },
  compare: {
    rows: [
      ['Processes', 'You adapt your workflows to the software', 'The software follows your warehouse workflows'],
      ['Connections', 'Only the interfaces provided', 'Your channels, suppliers and ERP'],
      ['Costs', 'Licence per user or site', 'Development by effort, no per-user licence'],
      ['Start', 'Ready to use immediately', 'Rolled out in stages after the analysis'],
      ['Further development', 'Follows the vendor’s roadmap', 'Follows your priorities'],
    ],
  },
  references: { eyebrow: 'References', title: 'Already in use for orders and warehousing' },
  band: { text: 'Tell us where orders or the warehouse cost your team the most time – we will show you what can run on its own.' },
  faq: {
    items: [
      { q: 'Can we start with one warehouse or one channel?', a: 'Yes. We start with the area that saves you the most time and extend step by step to further channels and sites.' },
      commonFaq.en.erp,
      { q: 'Which systems can you connect?', a: 'We connect shops, marketplaces, ERP and inventory systems via their APIs. Which connections make sense for you, we clarify in the first call.' },
      { q: 'How much time does automation save?', a: 'Less retyping, fewer follow-up questions and an up-to-date overview of orders and stock. The actual savings depend on your processes and degree of automation – in the first call we estimate them with your numbers.' },
      { q: 'What does a project cost?', a: 'That depends on the scope: number of channels and sites, existing systems and data quality. After the analysis you receive a quote with clear milestones. The first call is free.' },
      commonFaq.en.gdpr,
      commonFaq.en.ownership,
    ],
  },
  contact: {
    text: 'Describe your order channels and warehouse workflows. We’ll get back to you with a first assessment and a proposed date.',
    message: 'How do orders reach you today, and how is your warehouse organised?',
  },
};

const supplyChain = {
  slug: { de: 'lager-logistik', en: 'warehouse-logistics' },
  cases: ['lisa'],
  content: { de, en },
};

export default supplyChain;
