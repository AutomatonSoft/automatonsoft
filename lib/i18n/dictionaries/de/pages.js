const pages = {
  home: { meta: {} },
  portfolio: { eyebrow: 'Portfolio', meta: { title: 'Portfolio', description: 'Software, Automation und Artificial Intelligence – Projekte von AutomatonSoft.' } },
  company: {
    meta: { title: 'Unternehmen', description: 'Lernen Sie AutomatonSoft kennen – Softwareentwicklung im Dialog.' },
    eyebrow: 'Über uns', title: 'Software entsteht im Dialog.', intro: 'AutomatonSoft entwickelt digitale Lösungen für Unternehmen, die ihre Prozesse wirksam verbessern wollen.',
    sections: [
      { title: 'Was uns auszeichnet', text: 'Wir verbinden fachliches Verständnis, klare Kommunikation und solide technische Umsetzung.', items: ['Direkte Ansprechpartner', 'Individuelle Lösungen statt Standardprozesse', 'Von der Idee bis zum Betrieb'] },
      { title: 'Unser Vorgehen', text: 'Wir starten mit Ihren Anforderungen, entwickeln transparent in Etappen und verbessern kontinuierlich.', items: ['Analyse & Konzept', 'Entwicklung & Qualitätssicherung', 'Betrieb & Weiterentwicklung'] },
    ],
  },
  services: {
    meta: { title: 'Dienstleistungen', description: 'Softwareentwicklung, Web, Mobile, UI/UX und Automatisierung von AutomatonSoft.' },
    eyebrow: 'Leistungen', title: 'Technologie, die zu Ihrem Unternehmen passt.', intro: 'Von der Beratung bis zum Betrieb: Wir entwickeln digitale Produkte, Schnittstellen und automatisierte Prozesse.',
    sections: [
      { title: 'Softwareentwicklung', text: 'Maßgeschneiderte Web-, Desktop- und Backend-Anwendungen für komplexe Geschäftsprozesse.', items: ['Individuelle Business-Software', 'Schnittstellen & Integrationen', 'Daten- und Prozessautomatisierung'] },
      { title: 'Digitale Produkte', text: 'Wir gestalten und entwickeln Anwendungen, die für Mitarbeitende und Kunden einfach funktionieren.', items: ['Web-Entwicklung', 'Mobile Apps', 'UI/UX Gestaltung'] },
    ],
  },
  industries: {
    meta: { title: 'Branchen', description: 'Digitale Lösungen für E-Commerce, Logistik, Industrie, Hospitality und Automotive.' },
    eyebrow: 'Branchen', title: 'Lösungen für echte Arbeitsabläufe.', intro: 'Unsere Erfahrung reicht von E-Commerce und Logistik bis zu Industrie, Hospitality und Automotive.',
    sections: [
      { title: 'E-Commerce & Handel', text: 'Produktdaten, Marktplätze, Bestellungen und Backoffice-Prozesse zuverlässig verbinden.', items: ['Marketplace Automation', 'Produktdatenmanagement', 'Order Management'] },
      { title: 'Industrie & Dienstleistung', text: 'Digitale Systeme für Planung, Organisation und kontinuierliche Verbesserung.', items: ['Workforce Management', 'Industrial AI', 'Finance & Accounting'] },
    ],
  },
  hire: {
    meta: { title: 'Entwickler engagieren', description: 'Dedizierte Entwicklungsteams und Spezialisten für Ihr Projekt.' },
    eyebrow: 'Teams & Spezialisten', title: 'Entwicklungs-Know-how, wenn Sie es brauchen.', intro: 'Ergänzen Sie Ihr Team mit erfahrenen Spezialistinnen und Spezialisten für konkrete Projekte oder langfristige Vorhaben.',
    sections: [
      { title: 'Flexibel skalieren', text: 'Wir arbeiten als dediziertes Team, ergänzen vorhandene Teams oder übernehmen klar abgegrenzte Projekte.', items: ['Full-Stack Entwicklung', 'Web & Mobile', 'DevOps, QA und UI/UX'] },
      { title: 'Klar zusammenarbeiten', text: 'Sie erhalten transparente Kommunikation, nachvollziehbare Ergebnisse und einen festen technischen Ansprechpartner.', items: ['Direkte Abstimmung', 'Planbare Etappen', 'Langfristige Zusammenarbeit'] },
    ],
  },
  blog: {
    meta: { title: 'Blog', description: 'Einblicke in Softwareentwicklung, Automatisierung und digitale Produkte.' },
    eyebrow: 'Blog', title: 'Wissen für digitale Entscheidungen.', intro: 'Einblicke in Softwareentwicklung, Automatisierung und den Aufbau nachhaltiger digitaler Produkte.',
    sections: [
      { title: 'Individuelle Software', text: 'Wann Standardsoftware ausreicht – und wann eine maßgeschneiderte Lösung den entscheidenden Unterschied macht.', items: ['Software-Strategie', 'Business Prozesse', 'Digitale Produkte'] },
      { title: 'Automatisierung', text: 'Wie Schnittstellen und gut strukturierte Daten wiederkehrende Arbeit spürbar reduzieren.', items: ['Workflows', 'Integrationen', 'Künstliche Intelligenz'] },
    ],
  },
  contact: {
    meta: { title: 'Kontakt', description: 'Kontaktieren Sie AutomatonSoft GmbH – unverbindliches Erstgespräch zu Ihrem Software-Projekt.' },
    eyebrow: 'Kontakt', title: 'Lassen Sie uns über Ihr Projekt sprechen.', intro: 'Beschreiben Sie uns kurz Ihre Idee oder Herausforderung. Wir melden uns mit einer ersten Einschätzung.',
  },
  imprint: {
    meta: { title: 'Impressum', description: 'Impressum der AutomatonSoft GmbH.' },
    eyebrow: 'Rechtliches', title: 'Impressum', intro: 'Angaben gemäß § 5 TMG.',
    sections: [
      { title: 'Anbieter', address: true, items: ['Telefon: +49 7392 9378410', 'E-Mail: info@automatonsoft.de'] },
      { title: 'Hinweise', text: 'Inhalte dieser Website werden mit Sorgfalt erstellt. Für externe Inhalte, auf die wir verlinken, übernehmen wir keine Haftung.', items: ['Urheberrecht', 'Haftung für Links'] },
    ],
  },
  privacy: {
    meta: { title: 'Datenschutz', description: 'Datenschutzerklärung der AutomatonSoft GmbH.' },
    eyebrow: 'Rechtliches', title: 'Datenschutzerklärung', intro: 'Der Schutz Ihrer persönlichen Daten ist uns wichtig.',
    sections: [
      { title: 'Verantwortliche Stelle', address: true, items: ['Kontaktaufnahme', 'Server-Logdaten'] },
      { title: 'Ihre Rechte', text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.', items: ['Auskunft', 'Berichtigung', 'Löschung'] },
    ],
  },
};

export default pages;
