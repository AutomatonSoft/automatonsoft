// Home page additions on top of dictionaries/*/home.js: the products in use shown beside the hero
// (portfolio slugs, so every entry links to its project page) and the screenshots of the case studies.
export const caseImages = {
  hubnity: { src: '/assets/img/cases/hubnity-site.webp', small: '/assets/img/cases/hubnity-site-960.webp', width: 1600, height: 900 },
  'jv-mobel-online-shop': { src: '/assets/img/cases/jv-shop.webp', small: '/assets/img/cases/jv-shop-960.webp', width: 1600, height: 900 },
};

const products = [
  { slug: 'hubnity', name: 'Hubnity', de: 'Zeiterfassung für verteilte Teams', en: 'Time tracking for distributed teams' },
  { slug: 'benim-depom', name: 'Benim Depom', de: 'Produkte erfassen und auf Marktplätzen anbieten', en: 'Capture products and list them on marketplaces' },
  { slug: 'cashbook', name: 'Cashbook', de: 'Digitale Kassenbücher', en: 'Digital cash books' },
  { slug: 'roader', name: 'Roader', de: 'Auslieferungen für Fahrer', en: 'Deliveries for drivers' },
  { slug: 'lisa', name: 'Lisa', de: 'KI-Sprachassistentin im Kundenservice', en: 'AI voice assistant for customer calls' },
  { slug: 'aftercool', name: 'Aftercool', de: 'Produktdaten verwalten und abgleichen', en: 'Manage and sync product data' },
];

const labels = {
  de: {
    moreProjects: 'Weitere Projekte', panel: 'Im Einsatz', before: 'Vorher', after: 'Nachher', more: 'Mehr erfahren', viewProject: 'Projekt ansehen', viewSolution: 'Lösung ansehen',
    tags: ['KI im Live-Betrieb', 'Entwickelt in Deutschland', 'DSGVO by Design'],
    stats: [
      { value: '6', label: 'Produkte im täglichen Einsatz' },
      { value: 'Live', label: 'Lisa nimmt Kundenanrufe an' },
      { value: '7', label: 'Branchen, die wir betreuen' },
      { value: 'DE/EN', label: 'Projekte auf Deutsch und Englisch' },
    ],
    titles: { services: ['Was wir', 'bauen.'], industries: ['Für Ihre Branche', 'gebaut.'], products: ['Läuft.', 'Jeden Tag.'], steps: ['In 5 Schritten', 'live.'], faq: ['Kurz', 'gefragt.'], cta: ['Ihr Prozess ist', 'der nächste.'] },
  },
  en: {
    moreProjects: 'More projects', panel: 'In daily use', before: 'Before', after: 'After', more: 'Learn more', viewProject: 'View project', viewSolution: 'See the solution',
    tags: ['AI in live operation', 'Engineered in Germany', 'GDPR by design'],
    stats: [
      { value: '6', label: 'Products in daily use' },
      { value: 'Live', label: 'Lisa answers customer calls' },
      { value: '7', label: 'Industries we serve' },
      { value: 'DE/EN', label: 'Projects in German and English' },
    ],
    titles: { services: ['What we', 'build.'], industries: ['Built for', 'your industry.'], products: ['Running.', 'Every day.'], steps: ['Live in', '5 steps.'], faq: ['Quick', 'answers.'], cta: ['Your process', 'is next.'] },
  },
};

export const homeExtras = (locale) => ({ ...labels[locale], products: products.map(({ slug, name, ...text }) => ({ slug, name, text: text[locale] })) });
