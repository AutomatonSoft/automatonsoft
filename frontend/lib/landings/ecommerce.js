// Industry landing: E-commerce & marketplaces. Only facts from shipped projects – no invented numbers (docs/TZ.md §8).
const channels = [
  { name: 'otto.de', kind: 'marketplace' },
  { name: 'kaufland.de', kind: 'marketplace' },
  { name: 'Google Merchant', kind: 'feed' },
  { name: 'Shopware', kind: 'shop' },
  { name: 'Afterbuy', kind: 'orders' },
];
const integrations = ['otto.de', 'kaufland.de', 'Google Merchant Center', 'Shopware', 'Afterbuy', 'Twilio', 'Stripe'];
const lisaImage = { src: '/assets/img/cases/lisa-console.webp', small: '/assets/img/cases/lisa-console-960.webp', width: 2000, height: 1135 };
const suiteChannels = ['otto.de', 'kaufland.de', 'Google Merchant Center', 'Shopware'];

const de = {
  meta: {
    title: 'E-Commerce-Automatisierung für Marktplätze & Shops',
    description: 'Produktdaten, Preise und Bestellungen für otto.de, Kaufland, Google Merchant Center und Shopware aus einer zentralen Quelle. Individuelle Software aus Deutschland – DSGVO-konform.',
  },
  name: 'E-Commerce & Marktplätze',
  nav: { solution: 'Lösung', references: 'Referenzen', faq: 'FAQ', cta: 'Projekt anfragen', language: 'English', skip: 'Zum Inhalt springen' },
  hero: {
    eyebrow: 'Branchen · E-Commerce & Marktplätze',
    titleStart: 'Ein Produkt.', titleHighlight: 'Jeder Marktplatz.', titleEnd: 'Ohne doppelte Pflege.',
    lead: 'Produktdaten, Preise und Bestellungen werden über Shops und Marktplätze hinweg von Hand gepflegt – langsam und fehleranfällig. Wir verbinden alles mit einer zentralen Quelle.',
    primary: 'Kostenlosen Prozess-Check anfragen', secondary: 'Referenzen',
    proof: ['Bereits angebunden: otto.de, Kaufland, Google, Shopware', 'Ihr ERP und Ihre Warenwirtschaft bleiben', 'DSGVO-konform ab dem ersten Konzept'],
  },
  hub: {
    title: 'Zentrale Produktdatenbank', text: 'Einmal pflegen – überall aktuell',
    kinds: { marketplace: 'Marktplatz', feed: 'Feed', shop: 'Shop', orders: 'Aufträge' },
    fields: [{ label: 'Produkt', value: 'Eichentisch' }, { label: 'Preis', value: 'überall gleich' }, { label: 'Bestand', value: 'live abgeglichen' }],
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
      { icon: 'database', title: 'Zentrale Produktdatenbank', text: 'Alle Produktdaten an einem Ort – die Grundlage für jeden Kanal.' },
      { icon: 'link', title: 'Marktplatz- und Shop-Anbindungen', text: 'Produkte und Preise gehen automatisch an otto.de, Kaufland, Google und Ihren Shop.' },
      { icon: 'sync', title: 'Auftrags- und Bestandsabgleich', text: 'Bestellungen laufen zusammen, Bestände bleiben über alle Kanäle synchron.' },
      { icon: 'voice', title: 'KI für Kundenanfragen', text: 'Eine KI-Assistentin beantwortet Statusfragen am Telefon – rund um die Uhr.' },
    ],
  },
  references: {
    eyebrow: 'Referenzen', title: 'Bereits im Einsatz im Online-Handel',
    lisa: { tags: ['Voice AI', 'JV Möbel · Afterbuy'], title: 'Lisa beantwortet „Wo ist meine Bestellung?“', text: 'Für den Möbelhändler JV Möbel nimmt Lisa Anrufe rund um die Uhr an, verifiziert Anrufer und nennt den Live-Bestellstatus aus Afterbuy.', alt: 'Lisa Console: „Every call answered, even at night.“' },
    suite: { tags: ['Produktdaten', 'Marktplätze'], title: 'E-Commerce Automation Suite', text: 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de, Google Merchant Center und Shopware – aus einer zentralen Produktdatenbank heraus.', status: 'synchron' },
  },
  integrations: { title: 'Bereits angebunden', text: 'Weitere Systeme über deren Schnittstellen auf Anfrage.' },
  band: { title: 'Ihr Prozess ist der nächste.', text: 'Erzählen Sie uns, welche Kanäle Ihr Team am meisten Zeit kosten – wir zeigen, was von selbst laufen kann.', cta: 'Kostenlosen Prozess-Check anfragen' },
  allProjects: 'Alle Projekte ansehen',
  models: {
    eyebrow: 'Zusammenarbeit', title: 'So, wie es zu Ihnen passt', bestFor: 'Ideal für',
    items: [
      { title: 'Projektumsetzung', bestFor: 'klar abgegrenzte Vorhaben', points: ['Verantwortung von A bis Z', 'Vereinbarter Umfang und Meilensteine', 'Vom Konzept bis zum Go-live'] },
      { title: 'Dediziertes Team', bestFor: 'Produktentwicklung über Monate', points: ['Ein Team exklusiv für Ihr Produkt', 'Fester technischer Ansprechpartner', 'Wächst mit Ihrer Roadmap'] },
      { title: 'Teamverstärkung', bestFor: 'Lücken im bestehenden Team', points: ['Spezialisten verstärken Ihr Team', 'Full-Stack, Mobile, DevOps, QA', 'Ihre Prozesse und Tools'] },
    ],
  },
  faq: {
    eyebrow: 'FAQ', title: 'Häufige Fragen', text: 'Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns.',
    items: [
      { q: 'Welche Marktplätze und Shops können Sie anbinden?', a: 'Im Einsatz sind bereits Anbindungen an otto.de, kaufland.de, Google Merchant Center, Shopware und Afterbuy. Weitere Marktplätze und Shopsysteme binden wir über deren Schnittstellen an – welche für Sie sinnvoll sind, klären wir im Erstgespräch.' },
      { q: 'Müssen wir unser ERP oder unsere Warenwirtschaft ersetzen?', a: 'Nein. Wir verbinden Ihre bestehenden Systeme und erweitern sie Schritt für Schritt, ohne den laufenden Betrieb zu stören.' },
      { q: 'Wie viel Zeit und Kosten spart die Automatisierung?', a: 'Weniger manuelle Pflege pro Kanal, weniger Bestandsfehler und schnellere Bearbeitung von Bestellungen. Die tatsächliche Ersparnis hängt von Ihren Prozessen, Kanälen und dem Automatisierungsgrad ab – im Erstgespräch schätzen wir sie mit Ihren Zahlen ab.' },
      { q: 'Was kostet ein Projekt?', a: 'Das hängt vom Umfang ab: Anzahl der Kanäle, Datenqualität und vorhandene Systeme. Nach der Analyse erhalten Sie ein Angebot mit klaren Etappen. Das Erstgespräch ist kostenlos.' },
      { q: 'Sind unsere Daten DSGVO-konform geschützt?', a: 'Ja. DSGVO-Anforderungen sind ab dem ersten Konzept Teil der Architektur. Auf Wunsch unterzeichnen wir vor dem ersten Gespräch ein NDA.' },
      { q: 'Wem gehört die entwickelte Software?', a: 'Eigentum am Quellcode und Nutzungsrechte werden von Anfang an transparent im Vertrag geregelt – ohne spätere Überraschungen.' },
    ],
  },
  contact: {
    title: 'Kostenloser Prozess-Check',
    text: 'Beschreiben Sie Ihre Kanäle und Systeme. Wir melden uns mit einer ersten Einschätzung und einem Terminvorschlag.',
    points: ['Kostenlos und unverbindlich', 'NDA auf Wunsch vor dem Gespräch', 'Persönlicher Ansprechpartner ab Tag eins'],
    message: 'Welche Shops und Marktplätze nutzen Sie?',
    nextTitle: 'So geht es nach Ihrer Anfrage weiter',
    next: [
      { title: 'Wir melden uns', text: 'Wir lesen Ihre Anfrage und melden uns persönlich – per E-Mail oder Telefon.' },
      { title: 'Kurzes Erstgespräch', text: 'Wir klären Kanäle, Systeme und Ziele. Kostenlos und unverbindlich.' },
      { title: 'Einschätzung und Plan', text: 'Sie erhalten eine erste Einschätzung mit Umfang, Etappen und nächsten Schritten.' },
    ],
  },
  compare: {
    title: 'Standardsoftware oder individuelle Lösung?',
    text: 'Standardsoftware ist oft die richtige Wahl. Wir sagen Ihnen ehrlich, wann sich eine eigene Lösung lohnt.',
    columns: ['', 'Standardsoftware', 'Individuelle Lösung'],
    rows: [
      ['Prozesse', 'Sie passen Ihre Abläufe der Software an', 'Die Software folgt Ihren Abläufen'],
      ['Anbindungen', 'Nur die vorgesehenen Schnittstellen', 'Ihre Marktplätze, Shops und Ihr ERP'],
      ['Kosten', 'Lizenz pro Nutzer oder Kanal', 'Entwicklung nach Aufwand, keine Lizenz pro Nutzer'],
      ['Start', 'Sofort nutzbar', 'Start in Etappen nach der Analyse'],
      ['Weiterentwicklung', 'Nach der Roadmap des Anbieters', 'Nach Ihren Prioritäten'],
    ],
  },
  mobile: { call: 'Anrufen', whatsapp: 'WhatsApp', request: 'Anfrage' },
};

const en = {
  meta: {
    title: 'E-commerce automation for marketplaces & shops',
    description: 'Product data, prices and orders for otto.de, Kaufland, Google Merchant Center and Shopware from one central source. Custom software from Germany – GDPR-compliant.',
  },
  name: 'E-commerce & marketplaces',
  nav: { solution: 'Solution', references: 'References', faq: 'FAQ', cta: 'Start a project', language: 'Deutsch', skip: 'Skip to content' },
  hero: {
    eyebrow: 'Industries · E-commerce & marketplaces',
    titleStart: 'One product.', titleHighlight: 'Every marketplace.', titleEnd: 'No double data entry.',
    lead: 'Product data, prices and orders are maintained by hand across shops and marketplaces – slow and error-prone. We connect everything to one central source.',
    primary: 'Request a free process check', secondary: 'References',
    proof: ['Already connected: otto.de, Kaufland, Google, Shopware', 'Your ERP and inventory system stay in place', 'GDPR-compliant from the first concept'],
  },
  hub: {
    title: 'Central product database', text: 'Maintain once – up to date everywhere',
    kinds: { marketplace: 'Marketplace', feed: 'Feed', shop: 'Shop', orders: 'Orders' },
    fields: [{ label: 'Product', value: 'Oak table' }, { label: 'Price', value: 'same everywhere' }, { label: 'Stock', value: 'synced live' }],
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
      { icon: 'database', title: 'Central product database', text: 'All product data in one place – the foundation for every channel.' },
      { icon: 'link', title: 'Marketplace and shop connections', text: 'Products and prices flow automatically to otto.de, Kaufland, Google and your shop.' },
      { icon: 'sync', title: 'Order and stock sync', text: 'Orders come together in one place, stock stays in sync across all channels.' },
      { icon: 'voice', title: 'AI for customer enquiries', text: 'An AI assistant answers order status questions on the phone – around the clock.' },
    ],
  },
  references: {
    eyebrow: 'References', title: 'Already in use in online retail',
    lisa: { tags: ['Voice AI', 'JV Möbel · Afterbuy'], title: 'Lisa answers “Where is my order?”', text: 'For the furniture retailer JV Möbel, Lisa answers calls around the clock, verifies callers and gives the live order status from Afterbuy.', alt: 'Lisa Console: “Every call answered, even at night.”' },
    suite: { tags: ['Product data', 'Marketplaces'], title: 'E-Commerce Automation Suite', text: 'Automated product data management for otto.de, kaufland.de, Google Merchant Center and Shopware – from one central product database.', status: 'in sync' },
  },
  integrations: { title: 'Already connected', text: 'Other systems via their APIs on request.' },
  band: { title: 'Your process is next.', text: 'Tell us which channels cost your team the most time – we will show you what can run on its own.', cta: 'Request a free process check' },
  allProjects: 'View all projects',
  models: {
    eyebrow: 'Working together', title: 'The way that suits you', bestFor: 'Ideal for',
    items: [
      { title: 'Project delivery', bestFor: 'clearly scoped projects', points: ['End-to-end responsibility', 'Agreed scope and milestones', 'From concept to go-live'] },
      { title: 'Dedicated team', bestFor: 'product development over months', points: ['A team exclusively for your product', 'A fixed technical contact', 'Grows with your roadmap'] },
      { title: 'Team extension', bestFor: 'gaps in your existing team', points: ['Specialists strengthen your team', 'Full-stack, mobile, DevOps, QA', 'Your processes and tools'] },
    ],
  },
  faq: {
    eyebrow: 'FAQ', title: 'Frequently asked questions', text: 'Your question is not listed? Call or write to us.',
    items: [
      { q: 'Which marketplaces and shops can you connect?', a: 'Connections to otto.de, kaufland.de, Google Merchant Center, Shopware and Afterbuy are already in use. We connect further marketplaces and shop systems via their APIs – which ones make sense for you, we clarify in the first call.' },
      { q: 'Do we have to replace our ERP or inventory system?', a: 'No. We connect your existing systems and extend them step by step, without disrupting day-to-day operations.' },
      { q: 'How much time and money does automation save?', a: 'Less manual maintenance per channel, fewer stock errors and faster order processing. The actual savings depend on your processes, channels and degree of automation – in the first call we estimate them with your numbers.' },
      { q: 'What does a project cost?', a: 'That depends on the scope: number of channels, data quality and existing systems. After the analysis you receive a quote with clear milestones. The first call is free.' },
      { q: 'Is our data protected in line with the GDPR?', a: 'Yes. GDPR requirements are part of the architecture from the first concept. On request we sign an NDA before the first call.' },
      { q: 'Who owns the software you develop?', a: 'Ownership of the source code and usage rights are set out transparently in the contract from the start – no surprises later.' },
    ],
  },
  contact: {
    title: 'Free process check',
    text: 'Describe your channels and systems. We’ll get back to you with a first assessment and a proposed date.',
    points: ['Free and non-binding', 'NDA before the call on request', 'Personal contact from day one'],
    message: 'Which shops and marketplaces do you use?',
    nextTitle: 'What happens after your enquiry',
    next: [
      { title: 'We get back to you', text: 'We read your enquiry and reply personally – by email or phone.' },
      { title: 'Short first call', text: 'We clarify channels, systems and goals. Free and non-binding.' },
      { title: 'Assessment and plan', text: 'You receive a first assessment with scope, milestones and next steps.' },
    ],
  },
  compare: {
    title: 'Off-the-shelf software or a custom solution?',
    text: 'Off-the-shelf software is often the right choice. We tell you honestly when a custom solution pays off.',
    columns: ['', 'Off-the-shelf software', 'Custom solution'],
    rows: [
      ['Processes', 'You adapt your workflows to the software', 'The software follows your workflows'],
      ['Connections', 'Only the interfaces provided', 'Your marketplaces, shops and ERP'],
      ['Costs', 'Licence per user or channel', 'Development by effort, no per-user licence'],
      ['Start', 'Ready to use immediately', 'Rolled out in stages after the analysis'],
      ['Further development', 'Follows the vendor’s roadmap', 'Follows your priorities'],
    ],
  },
  mobile: { call: 'Call', whatsapp: 'WhatsApp', request: 'Enquiry' },
};

const ecommerce = { slug: { de: 'e-commerce', en: 'e-commerce' }, channels, integrations, lisaImage, suiteChannels, content: { de, en } };

export default ecommerce;
