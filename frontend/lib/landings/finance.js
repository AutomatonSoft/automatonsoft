import { commonFaq } from './common';

// Industry landing: finance & accounting. Facts from the Cashbook project and the industry copy on /branchen only (docs/TZ.md §8).
// No product screenshot yet, so the hero lists the building blocks instead of an image.
const de = {
  meta: {
    title: 'Software für Finance & Buchhaltung',
    description: 'Digitale Kassenbücher, Buchhaltungsschnittstellen und automatisierte Belege statt Papier. Individuelle Software aus Deutschland, DSGVO-konform.',
  },
  name: 'Finance & Buchhaltung',
  hero: {
    eyebrow: 'Branchen · Finance & Buchhaltung',
    titleStart: 'Kasse und Belege.', titleHighlight: 'Digital.', titleEnd: 'Nicht auf Papier.',
    lead: 'Kassenführung und Buchhaltung werden noch auf Papier dokumentiert und von Hand übertragen. Wir bringen beides in ein System, das Ihr Team gern benutzt und das zu Ihrer Buchhaltung passt.',
    primary: 'Kostenlosen Prozess-Check anfragen', secondary: 'Referenzen',
    panelLabel: 'Was wir bauen', panelTitle: 'Finance-Automatisierung',
    panel: [
      { name: 'Digitale Kassenbücher', text: 'Kasse digital statt auf Papier' },
      { name: 'Buchhaltungsschnittstellen', text: 'Daten ohne Abtippen übergeben' },
      { name: 'Belegautomatisierung', text: 'Belege und Dokumente automatisch erfasst' },
    ],
  },
  problem: {
    eyebrow: 'Das Problem', title: 'Zettel, Abtippen, Rückfragen',
    items: [
      { title: 'Kasse auf Papier', text: 'Einnahmen und Ausgaben werden handschriftlich festgehalten – das kostet Zeit und ist schwer auszuwerten.' },
      { title: 'Doppelte Erfassung', text: 'Was in der Kasse steht, wird später von Hand in die Buchhaltung übertragen.' },
      { title: 'Belege im Ordner', text: 'Dokumente sammeln sich auf Papier und in Postfächern, bis jemand sie sortiert.' },
    ],
    note: 'Was das in Ihrem Unternehmen kostet, hängt von Belegvolumen, Kassen und Ihrer Buchhaltung ab. Im Erstgespräch schätzen wir es mit Ihren Zahlen ab.',
  },
  solution: {
    eyebrow: 'So lösen wir es', title: 'Drei Bausteine, schrittweise eingeführt',
    text: 'Wir starten mit dem Baustein, der Ihnen am meisten Zeit spart, und bauen von dort aus weiter – ohne Ihren laufenden Betrieb zu stören.',
    steps: [
      { title: 'Digitale Kassenbücher', text: 'Die Kasse wird digital geführt statt auf Papier – übersichtlich für das ganze Team.' },
      { title: 'Buchhaltungsschnittstellen', text: 'Daten gehen über Schnittstellen an Ihre Buchhaltung, statt abgetippt zu werden.' },
      { title: 'Beleg- und Dokumentenautomatisierung', text: 'Belege und Dokumente werden automatisch erfasst und zugeordnet, statt von Hand sortiert.' },
    ],
  },
  compare: {
    rows: [
      ['Prozesse', 'Sie passen Ihre Abläufe der Software an', 'Die Software folgt Ihren Abläufen in Kasse und Buchhaltung'],
      ['Anbindungen', 'Nur die vorgesehenen Schnittstellen', 'Ihre Buchhaltung und Ihre bestehenden Systeme'],
      ['Kosten', 'Lizenz pro Nutzer oder Standort', 'Entwicklung nach Aufwand, keine Lizenz pro Nutzer'],
      ['Start', 'Sofort nutzbar', 'Start in Etappen nach der Analyse'],
      ['Weiterentwicklung', 'Nach der Roadmap des Anbieters', 'Nach Ihren Prioritäten'],
    ],
  },
  references: { eyebrow: 'Referenzen', title: 'Bereits im Einsatz bei der Kassenführung' },
  band: { text: 'Erzählen Sie uns, wo Kasse oder Belege Ihr Team die meiste Zeit kosten – wir zeigen, was von selbst laufen kann.' },
  faq: {
    items: [
      { q: 'Können wir nur mit dem Kassenbuch starten?', a: 'Ja. Wir beginnen mit dem Bereich, der Ihnen am meisten Zeit spart, und erweitern Schritt für Schritt um Schnittstellen und Belegverarbeitung.' },
      { q: 'Wie binden Sie unsere Buchhaltung an?', a: 'Wir verbinden Ihre bestehende Buchhaltungssoftware über deren Schnittstellen. Welche Anbindung für Sie sinnvoll ist, klären wir im Erstgespräch.' },
      commonFaq.de.erp,
      { q: 'Wie berücksichtigen Sie unsere Vorgaben aus Buchhaltung und Steuerberatung?', a: 'Wir erfassen Ihre Anforderungen in der Analyse und stimmen den Ablauf mit den Beteiligten ab. Ihre Buchhaltung und Ihre Steuerberatung bleiben dabei Ihre Ansprechpartner für fachliche Vorgaben.' },
      { q: 'Was kostet ein Projekt?', a: 'Das hängt vom Umfang ab: Anzahl der Kassen und Belege, vorhandene Systeme und Datenqualität. Nach der Analyse erhalten Sie ein Angebot mit klaren Etappen. Das Erstgespräch ist kostenlos.' },
      commonFaq.de.gdpr,
      commonFaq.de.ownership,
    ],
  },
  contact: {
    text: 'Beschreiben Sie, wie Ihre Kasse und Ihre Belege heute laufen. Wir melden uns mit einer ersten Einschätzung und einem Terminvorschlag.',
    message: 'Wie führen Sie heute Ihre Kasse und wie kommen Belege in Ihre Buchhaltung?',
  },
};

const en = {
  meta: {
    title: 'Finance & accounting software',
    description: 'Digital cash books, accounting interfaces and automated receipts instead of paper. Custom software from Germany, GDPR-compliant.',
  },
  name: 'Finance & accounting',
  hero: {
    eyebrow: 'Industries · Finance & accounting',
    titleStart: 'Cash and receipts.', titleHighlight: 'Digital.', titleEnd: 'Not on paper.',
    lead: 'Cash handling and bookkeeping are still documented on paper and re-entered by hand. We bring both into one system your team likes to use and that fits your accounting.',
    primary: 'Request a free process check', secondary: 'References',
    panelLabel: 'What we build', panelTitle: 'Finance automation',
    panel: [
      { name: 'Digital cash books', text: 'Cash digital instead of on paper' },
      { name: 'Accounting interfaces', text: 'Data handed over without retyping' },
      { name: 'Receipt automation', text: 'Receipts and documents captured automatically' },
    ],
  },
  problem: {
    eyebrow: 'The problem', title: 'Paper, retyping, follow-up questions',
    items: [
      { title: 'Cash on paper', text: 'Income and expenses are written down by hand – that costs time and is hard to analyse.' },
      { title: 'Double entry', text: 'What is in the cash book is later transferred to the accounting by hand.' },
      { title: 'Receipts in folders', text: 'Documents pile up on paper and in inboxes until someone sorts them.' },
    ],
    note: 'What this costs your business depends on receipt volume, cash points and your accounting. In the first call we estimate it with your numbers.',
  },
  solution: {
    eyebrow: 'How we solve it', title: 'Three building blocks, introduced step by step',
    text: 'We start with the building block that saves you the most time and build from there – without disrupting your day-to-day operations.',
    steps: [
      { title: 'Digital cash books', text: 'The cash book is kept digitally instead of on paper – clear for the whole team.' },
      { title: 'Accounting interfaces', text: 'Data goes to your accounting through interfaces instead of being retyped.' },
      { title: 'Receipt and document automation', text: 'Receipts and documents are captured and assigned automatically instead of sorted by hand.' },
    ],
  },
  compare: {
    rows: [
      ['Processes', 'You adapt your workflows to the software', 'The software follows your cash and accounting workflows'],
      ['Connections', 'Only the interfaces provided', 'Your accounting and your existing systems'],
      ['Costs', 'Licence per user or site', 'Development by effort, no per-user licence'],
      ['Start', 'Ready to use immediately', 'Rolled out in stages after the analysis'],
      ['Further development', 'Follows the vendor’s roadmap', 'Follows your priorities'],
    ],
  },
  references: { eyebrow: 'References', title: 'Already in use for cash handling' },
  band: { text: 'Tell us where cash or receipts cost your team the most time – we will show you what can run on its own.' },
  faq: {
    items: [
      { q: 'Can we start with the cash book only?', a: 'Yes. We start with the area that saves you the most time and extend step by step with interfaces and receipt processing.' },
      { q: 'How do you connect our accounting?', a: 'We connect your existing accounting software through its interfaces. Which connection makes sense for you, we clarify in the first call.' },
      commonFaq.en.erp,
      { q: 'How do you take our accounting and tax-advisor requirements into account?', a: 'We capture your requirements in the analysis and agree the workflow with everyone involved. Your accounting and your tax advisor remain your contacts for professional requirements.' },
      { q: 'What does a project cost?', a: 'That depends on the scope: number of cash points and receipts, existing systems and data quality. After the analysis you receive a quote with clear milestones. The first call is free.' },
      commonFaq.en.gdpr,
      commonFaq.en.ownership,
    ],
  },
  contact: {
    text: 'Describe how your cash and receipts run today. We’ll get back to you with a first assessment and a proposed date.',
    message: 'How do you keep your cash book today, and how do receipts reach your accounting?',
  },
};

const finance = {
  slug: { de: 'finanzen-buchhaltung', en: 'finance-accounting' },
  cases: ['cashbook'],
  content: { de, en },
};

export default finance;
