// Copy every industry landing shares. A landing's own data file overrides any key (one level deep, see index.js).
const de = {
  nav: { solution: 'Lösung', references: 'Referenzen', faq: 'FAQ', cta: 'Projekt anfragen', language: 'English', skip: 'Zum Inhalt springen' },
  band: { title: 'Ihr Prozess ist der nächste.', cta: 'Kostenlosen Prozess-Check anfragen' },
  allProjects: 'Alle Projekte ansehen',
  compare: {
    eyebrow: 'Vergleich',
    title: 'Standardsoftware oder individuelle Lösung?',
    text: 'Standardsoftware ist oft die richtige Wahl. Wir sagen Ihnen ehrlich, wann sich eine eigene Lösung lohnt.',
    columns: ['', 'Standardsoftware', 'Individuelle Lösung'],
  },
  models: {
    eyebrow: 'Zusammenarbeit', title: 'So, wie es zu Ihnen passt', bestFor: 'Ideal für',
    items: [
      { title: 'Projektumsetzung', bestFor: 'klar abgegrenzte Vorhaben', points: ['Verantwortung von A bis Z', 'Vereinbarter Umfang und Meilensteine', 'Vom Konzept bis zum Go-live'] },
      { title: 'Dediziertes Team', bestFor: 'Produktentwicklung über Monate', points: ['Ein Team exklusiv für Ihr Produkt', 'Fester technischer Ansprechpartner', 'Wächst mit Ihrer Roadmap'] },
      { title: 'Teamverstärkung', bestFor: 'Lücken im bestehenden Team', points: ['Spezialisten verstärken Ihr Team', 'Full-Stack, Mobile, DevOps, QA', 'Ihre Prozesse und Tools'] },
    ],
  },
  faq: { eyebrow: 'FAQ', title: 'Häufige Fragen', text: 'Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns.' },
  contact: {
    title: 'Kostenloser Prozess-Check',
    points: ['Kostenlos und unverbindlich', 'NDA auf Wunsch vor dem Gespräch', 'Persönlicher Ansprechpartner ab Tag eins'],
    nextTitle: 'So geht es nach Ihrer Anfrage weiter',
    next: [
      { title: 'Wir melden uns', text: 'Wir lesen Ihre Anfrage und melden uns persönlich – per E-Mail oder Telefon.' },
      { title: 'Kurzes Erstgespräch', text: 'Wir klären Abläufe, Systeme und Ziele. Kostenlos und unverbindlich.' },
      { title: 'Einschätzung und Plan', text: 'Sie erhalten eine erste Einschätzung mit Umfang, Etappen und nächsten Schritten.' },
    ],
  },
  mobile: { call: 'Anrufen', whatsapp: 'WhatsApp', request: 'Anfrage' },
};

const en = {
  nav: { solution: 'Solution', references: 'References', faq: 'FAQ', cta: 'Start a project', language: 'Deutsch', skip: 'Skip to content' },
  band: { title: 'Your process is next.', cta: 'Request a free process check' },
  allProjects: 'View all projects',
  compare: {
    eyebrow: 'Comparison',
    title: 'Off-the-shelf software or a custom solution?',
    text: 'Off-the-shelf software is often the right choice. We tell you honestly when a custom solution pays off.',
    columns: ['', 'Off-the-shelf software', 'Custom solution'],
  },
  models: {
    eyebrow: 'Working together', title: 'The way that suits you', bestFor: 'Ideal for',
    items: [
      { title: 'Project delivery', bestFor: 'clearly scoped projects', points: ['End-to-end responsibility', 'Agreed scope and milestones', 'From concept to go-live'] },
      { title: 'Dedicated team', bestFor: 'product development over months', points: ['A team exclusively for your product', 'A fixed technical contact', 'Grows with your roadmap'] },
      { title: 'Team extension', bestFor: 'gaps in your existing team', points: ['Specialists strengthen your team', 'Full-stack, mobile, DevOps, QA', 'Your processes and tools'] },
    ],
  },
  faq: { eyebrow: 'FAQ', title: 'Frequently asked questions', text: 'Your question is not listed? Call or write to us.' },
  contact: {
    title: 'Free process check',
    points: ['Free and non-binding', 'NDA before the call on request', 'Personal contact from day one'],
    nextTitle: 'What happens after your enquiry',
    next: [
      { title: 'We get back to you', text: 'We read your enquiry and reply personally – by email or phone.' },
      { title: 'Short first call', text: 'We clarify workflows, systems and goals. Free and non-binding.' },
      { title: 'Assessment and plan', text: 'You receive a first assessment with scope, milestones and next steps.' },
    ],
  },
  mobile: { call: 'Call', whatsapp: 'WhatsApp', request: 'Enquiry' },
};

// Shared FAQ answers that hold for every industry (GDPR, ownership, cost, existing systems).
export const commonFaq = {
  de: {
    erp: { q: 'Müssen wir unser ERP oder unsere Warenwirtschaft ersetzen?', a: 'Nein. Wir verbinden Ihre bestehenden Systeme und erweitern sie Schritt für Schritt, ohne den laufenden Betrieb zu stören.' },
    gdpr: { q: 'Sind unsere Daten DSGVO-konform geschützt?', a: 'Ja. DSGVO-Anforderungen sind ab dem ersten Konzept Teil der Architektur. Auf Wunsch unterzeichnen wir vor dem ersten Gespräch ein NDA.' },
    ownership: { q: 'Wem gehört die entwickelte Software?', a: 'Eigentum am Quellcode und Nutzungsrechte werden von Anfang an transparent im Vertrag geregelt – ohne spätere Überraschungen.' },
  },
  en: {
    erp: { q: 'Do we have to replace our ERP or inventory system?', a: 'No. We connect your existing systems and extend them step by step, without disrupting day-to-day operations.' },
    gdpr: { q: 'Is our data protected in line with the GDPR?', a: 'Yes. GDPR requirements are part of the architecture from the first concept. On request we sign an NDA before the first call.' },
    ownership: { q: 'Who owns the software you develop?', a: 'Ownership of the source code and usage rights are set out transparently in the contract from the start – no surprises later.' },
  },
};

const common = { de, en };

export default common;
