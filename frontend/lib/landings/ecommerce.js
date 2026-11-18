import { commonFaq } from './common';
import { images } from './cases';

// Industry landing: E-commerce & marketplaces. Only facts from shipped projects – no invented numbers (docs/TZ.md §8).
const de = {
  meta: {
    title: 'E-Commerce-Automatisierung für Marktplätze & Shops',
    description: 'Produktdaten, Preise und Bestellungen für otto.de, Kaufland, Google Merchant Center und Shopware aus einer zentralen Quelle. Individuelle Software aus Deutschland – DSGVO-konform.',
  },
  name: 'E-Commerce & Marktplätze',
  hero: {
    eyebrow: 'Branchen · E-Commerce & Marktplätze',
    titleStart: 'Ein Produkt.', titleHighlight: 'Jeder Marktplatz.', titleEnd: 'Ohne doppelte Pflege.',
    lead: 'Produktdaten, Preise und Bestellungen werden über Shops und Marktplätze hinweg von Hand gepflegt – langsam und fehleranfällig. Wir verbinden alles mit einer zentralen Quelle.',
    primary: 'Kostenlosen Prozess-Check anfragen', secondary: 'Referenzen',
    imageAlt: 'Lisa Console: „Every call answered, even at night.“', imageCaption: 'Lisa · JV Möbel · Afterbuy',
  },
  problem: {
    eyebrow: 'Das Problem', title: 'Jeder neue Kanal bedeutet mehr Handarbeit',
    items: [
      { title: 'Jeder Kanal wird einzeln gepflegt', text: 'Titel, Preise und Bilder werden pro Shop und Marktplatz von Hand angelegt und angepasst.' },
      { title: 'Bestände laufen auseinander', text: 'Ohne automatischen Abgleich drohen Überverkäufe und falsche Verfügbarkeiten.' },
      { title: 'Anfragen binden das Team', text: '„Wo ist meine Bestellung?“ – dieselben Fragen per Telefon und E-Mail, jeden Tag.' },
    ],
    note: 'Was das in Ihrem Unternehmen kostet, hängt von Kanälen, Sortiment und Volumen ab. Im Erstgespräch schätzen wir es mit Ihren Zahlen ab.',
  },
  solution: {
    eyebrow: 'So lösen wir es', title: 'Vier Bausteine, schrittweise eingeführt',
    text: 'Wir starten mit dem Baustein, der Ihnen am meisten Zeit spart, und bauen von dort aus weiter – ohne Ihren laufenden Betrieb zu stören.',
    steps: [
      { title: 'Zentrale Produktdatenbank', text: 'Alle Produktdaten an einem Ort – die Grundlage für jeden Kanal.' },
      { title: 'Marktplatz- und Shop-Anbindungen', text: 'Produkte und Preise gehen automatisch an otto.de, Kaufland, Google und Ihren Shop.' },
      { title: 'Auftrags- und Bestandsabgleich', text: 'Bestellungen laufen zusammen, Bestände bleiben über alle Kanäle synchron.' },
      { title: 'KI für Kundenanfragen', text: 'Eine KI-Assistentin beantwortet Statusfragen am Telefon – rund um die Uhr.' },
    ],
  },
  compare: {
    rows: [
      ['Prozesse', 'Sie passen Ihre Abläufe der Software an', 'Die Software folgt Ihren Abläufen'],
      ['Anbindungen', 'Nur die vorgesehenen Schnittstellen', 'Ihre Marktplätze, Shops und Ihr ERP'],
      ['Kosten', 'Lizenz pro Nutzer oder Kanal', 'Entwicklung nach Aufwand, keine Lizenz pro Nutzer'],
      ['Start', 'Sofort nutzbar', 'Start in Etappen nach der Analyse'],
      ['Weiterentwicklung', 'Nach der Roadmap des Anbieters', 'Nach Ihren Prioritäten'],
    ],
  },
  references: { eyebrow: 'Referenzen', title: 'Bereits im Einsatz im Online-Handel' },
  integrations: { title: 'Bereits angebunden' },
  band: { text: 'Erzählen Sie uns, welche Kanäle Ihr Team am meisten Zeit kosten – wir zeigen, was von selbst laufen kann.' },
  faq: {
    items: [
      { q: 'Welche Marktplätze und Shops können Sie anbinden?', a: 'Im Einsatz sind bereits Anbindungen an otto.de, kaufland.de, Google Merchant Center, Shopware und Afterbuy. Weitere Marktplätze und Shopsysteme binden wir über deren Schnittstellen an – welche für Sie sinnvoll sind, klären wir im Erstgespräch.' },
      commonFaq.de.erp,
      { q: 'Wie viel Zeit und Kosten spart die Automatisierung?', a: 'Weniger manuelle Pflege pro Kanal, weniger Bestandsfehler und schnellere Bearbeitung von Bestellungen. Die tatsächliche Ersparnis hängt von Ihren Prozessen, Kanälen und dem Automatisierungsgrad ab – im Erstgespräch schätzen wir sie mit Ihren Zahlen ab.' },
      { q: 'Was kostet ein Projekt?', a: 'Das hängt vom Umfang ab: Anzahl der Kanäle, Datenqualität und vorhandene Systeme. Nach der Analyse erhalten Sie ein Angebot mit klaren Etappen. Das Erstgespräch ist kostenlos.' },
      commonFaq.de.gdpr,
      commonFaq.de.ownership,
    ],
  },
  contact: {
    text: 'Beschreiben Sie Ihre Kanäle und Systeme. Wir melden uns mit einer ersten Einschätzung und einem Terminvorschlag.',
    message: 'Welche Shops und Marktplätze nutzen Sie?',
  },
};

const en = {
  meta: {
    title: 'E-commerce automation for marketplaces & shops',
    description: 'Product data, prices and orders for otto.de, Kaufland, Google Merchant Center and Shopware from one central source. Custom software from Germany – GDPR-compliant.',
  },
  name: 'E-commerce & marketplaces',
  hero: {
    eyebrow: 'Industries · E-commerce & marketplaces',
    titleStart: 'One product.', titleHighlight: 'Every marketplace.', titleEnd: 'No double data entry.',
    lead: 'Product data, prices and orders are maintained by hand across shops and marketplaces – slow and error-prone. We connect everything to one central source.',
    primary: 'Request a free process check', secondary: 'References',
    imageAlt: 'Lisa Console: “Every call answered, even at night.”', imageCaption: 'Lisa · JV Möbel · Afterbuy',
  },
  problem: {
    eyebrow: 'The problem', title: 'Every new channel means more manual work',
    items: [
      { title: 'Every channel is maintained separately', text: 'Titles, prices and images are created and updated by hand for each shop and marketplace.' },
      { title: 'Stock levels drift apart', text: 'Without automatic syncing you risk overselling and wrong availability.' },
      { title: 'Enquiries tie up your team', text: '“Where is my order?” – the same questions by phone and email, every day.' },
    ],
    note: 'What this costs your business depends on channels, assortment and volume. In the first call we estimate it with your numbers.',
  },
  solution: {
    eyebrow: 'How we solve it', title: 'Four building blocks, introduced step by step',
    text: 'We start with the building block that saves you the most time and build from there – without disrupting your day-to-day operations.',
    steps: [
      { title: 'Central product database', text: 'All product data in one place – the foundation for every channel.' },
      { title: 'Marketplace and shop connections', text: 'Products and prices flow automatically to otto.de, Kaufland, Google and your shop.' },
      { title: 'Order and stock sync', text: 'Orders come together in one place, stock stays in sync across all channels.' },
      { title: 'AI for customer enquiries', text: 'An AI assistant answers order status questions on the phone – around the clock.' },
    ],
  },
  compare: {
    rows: [
      ['Processes', 'You adapt your workflows to the software', 'The software follows your workflows'],
      ['Connections', 'Only the interfaces provided', 'Your marketplaces, shops and ERP'],
      ['Costs', 'Licence per user or channel', 'Development by effort, no per-user licence'],
      ['Start', 'Ready to use immediately', 'Rolled out in stages after the analysis'],
      ['Further development', 'Follows the vendor’s roadmap', 'Follows your priorities'],
    ],
  },
  references: { eyebrow: 'References', title: 'Already in use in online retail' },
  integrations: { title: 'Already connected' },
  band: { text: 'Tell us which channels cost your team the most time – we will show you what can run on its own.' },
  faq: {
    items: [
      { q: 'Which marketplaces and shops can you connect?', a: 'Connections to otto.de, kaufland.de, Google Merchant Center, Shopware and Afterbuy are already in use. We connect further marketplaces and shop systems via their APIs – which ones make sense for you, we clarify in the first call.' },
      commonFaq.en.erp,
      { q: 'How much time and money does automation save?', a: 'Less manual maintenance per channel, fewer stock errors and faster order processing. The actual savings depend on your processes, channels and degree of automation – in the first call we estimate them with your numbers.' },
      { q: 'What does a project cost?', a: 'That depends on the scope: number of channels, data quality and existing systems. After the analysis you receive a quote with clear milestones. The first call is free.' },
      commonFaq.en.gdpr,
      commonFaq.en.ownership,
    ],
  },
  contact: {
    text: 'Describe your channels and systems. We’ll get back to you with a first assessment and a proposed date.',
    message: 'Which shops and marketplaces do you use?',
  },
};

const ecommerce = {
  slug: { de: 'e-commerce', en: 'e-commerce' },
  heroImage: images.lisa,
  cases: ['lisa', 'ecommerceSuite'],
  integrations: ['otto.de', 'kaufland.de', 'Google Merchant Center', 'Shopware', 'Afterbuy', 'Twilio', 'Stripe'],
  content: { de, en },
};

export default ecommerce;
