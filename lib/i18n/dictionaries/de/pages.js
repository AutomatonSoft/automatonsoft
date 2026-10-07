const pages = {
  home: { meta: {} },
  portfolio: { eyebrow: 'Portfolio', meta: { title: 'Portfolio: Software- & KI-Projekte', description: 'Software, Automation und Artificial Intelligence – Projekte von AutomatonSoft.' } },
  company: {
    meta: { title: 'Über uns – Softwareentwicklung aus Deutschland', description: 'AutomatonSoft GmbH aus Burgrieden entwickelt individuelle Software, Web- und Mobile-Apps, Automatisierung und KI – vom Konzept bis zum Betrieb.' },
    eyebrow: 'Über uns', title: 'Software entsteht im Dialog.',
    intro: 'AutomatonSoft entwickelt digitale Lösungen für Unternehmen, die ihre Prozesse wirksam verbessern wollen.',
    primaryCta: 'Lernen Sie uns kennen', secondaryCta: 'Unsere Projekte',
    story: {
      eyebrow: 'Wer wir sind', title: 'Ein Softwareunternehmen, entwickelt in Deutschland',
      paragraphs: [
        'Die AutomatonSoft GmbH ist ein Softwareunternehmen mit Sitz in Burgrieden, Baden-Württemberg. Wir konzipieren, entwickeln und betreiben individuelle Software, Web- und Mobile-Anwendungen, Prozessautomatisierung und KI-Lösungen für Unternehmen, die mehr wollen als Standard.',
        'Unsere Produkte laufen in ganz unterschiedlichen Branchen – von der Zeiterfassung für verteilte Teams über KI-Sprachassistenten bis zu E-Commerce, Hospitality und Automotive. Was sie verbindet, ist unsere Arbeitsweise: nah an Ihren Prozessen, transparent in jeder Etappe und verantwortlich vom ersten Konzept bis zum laufenden Betrieb.',
      ],
      factsTitle: 'Auf einen Blick',
      facts: [
        { label: 'Unternehmen', value: 'AutomatonSoft GmbH' },
        { label: 'Hauptsitz', value: 'Burgrieden, Deutschland' },
        { label: 'Schwerpunkt', value: 'Individualsoftware, Automatisierung & KI' },
        { label: 'Portfolio', value: '9 Lösungskategorien' },
        { label: 'Sprachen', value: 'Deutsch · Englisch' },
      ],
    },
    values: {
      eyebrow: 'Was uns auszeichnet', title: 'Prinzipien hinter jedem Projekt',
      text: 'Wir verbinden fachliches Verständnis, klare Kommunikation und solide technische Umsetzung.',
      items: [
        { icon: 'Handshake', title: 'Direkter Kontakt', text: 'Sie sprechen mit den Menschen, die Ihre Software entwickeln – ein fester technischer Ansprechpartner statt Ticket-Warteschlangen.' },
        { icon: 'Target', title: 'Individuell statt Baukasten', text: 'Lösungen richten sich nach Ihren Prozessen, statt Ihre Teams in Standardabläufe zu zwingen.' },
        { icon: 'Workflow', title: 'Verantwortung von A bis Z', text: 'Vom ersten Konzept über Entwicklung und Go-live bis zum Betrieb – ein verantwortlicher Partner.' },
        { icon: 'ChartColumn', title: 'Transparente Etappen', text: 'Wir liefern in klaren Etappen mit sichtbarem Fortschritt – Entscheidungen basieren auf funktionierender Software.' },
        { icon: 'ShieldCheck', title: 'Privacy by Design', text: 'DSGVO-Anforderungen sind ab dem ersten Konzept Teil der Architektur.' },
        { icon: 'UsersRound', title: 'Langfristige Partnerschaft', text: 'Wir betreiben und entwickeln Ihre Software weiter, während Ihr Unternehmen wächst.' },
      ],
    },
    products: {
      eyebrow: 'Unsere Arbeit', title: 'Produkte, die wir entwickelt haben',
      text: 'Plattformen und Lösungen aus unserem Portfolio – jede davon von unserem eigenen Entwicklungsteam umgesetzt.',
      link: 'Im Portfolio ansehen',
      items: [
        { name: 'Hubnity', category: 'workforce-hr-automation', tag: 'Zeiterfassungs-SaaS' },
        { name: 'Lisa', category: 'ai-business-solutions', tag: 'KI-Sprachassistentin' },
        { name: 'E-Commerce Automation Suite', category: 'ecommerce-marketplace-automation', tag: 'Marktplatz-Automatisierung' },
        { name: 'Supply Chain Automation Suite', category: 'supply-chain-warehouse', tag: 'Bestellungen & Lager' },
        { name: 'Lunanitiz Hotel Software', category: 'hospitality-hotel-software', tag: 'Hospitality' },
        { name: 'AutoCar Software Suite', category: 'automotive-software', tag: 'Automotive' },
        { name: 'Cashbook', category: 'finance-accounting-automation', tag: 'Finance' },
        { name: 'KIDOC_Office', category: 'ai-business-solutions', tag: 'KI-Dokumentenverarbeitung' },
      ],
    },
    location: {
      eyebrow: 'Standort', title: 'Entwickelt in Deutschland, für Kunden weltweit',
      text: 'Von unserem Hauptsitz in Burgrieden aus arbeiten wir mit Unternehmen in Deutschland und international – auf Deutsch und Englisch.',
      directions: 'Route planen',
    },
    ctaTitle: 'Lassen Sie uns über Ihr Projekt sprechen', ctaText: 'Erzählen Sie uns von Ihrer Idee – wir melden uns mit einer ersten Einschätzung und einem kostenlosen, unverbindlichen Gesprächstermin.', ctaButton: 'Kontakt aufnehmen',
  },
  services: {
    meta: { title: 'Softwareentwicklung, KI & Automatisierung', description: 'Individuelle Software, Web- und Mobile-Apps, Prozessautomatisierung, KI-Lösungen, UX/UI-Design und Betrieb – aus einer Hand, entwickelt in Deutschland.' },
    eyebrow: 'Leistungen', title: 'Technologie, die zu Ihrem Unternehmen passt.',
    intro: 'Von der Beratung bis zum Betrieb: Wir entwickeln digitale Produkte, Schnittstellen und automatisierte Prozesse – als ein verantwortlicher Partner.',
    primaryCta: 'Projekt besprechen', secondaryCta: 'Fallstudien ansehen',
    overviewEyebrow: 'Überblick', overviewTitle: 'Sechs Disziplinen, ein Team', overviewText: 'Kombinieren Sie genau das, was Sie brauchen – jede Leistung kommt vom selben Entwicklungsteam.',
    deliverablesLabel: 'Was Sie erhalten', referenceLabel: 'Referenzprojekt', referenceLink: 'Im Portfolio ansehen',
    tech: {
      eyebrow: 'Technologie', title: 'Ein bewährter Technologie-Stack', text: 'Die Technologien hinter den Plattformen, die wir entwickelt haben und produktiv betreiben.',
      groups: [
        { label: 'Frontend', items: ['TypeScript', 'React', 'Next.js'] },
        { label: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'Django'] },
        { label: 'Daten & Queues', items: ['PostgreSQL', 'Redis', 'BullMQ'] },
        { label: 'Integrationen', items: ['Stripe', 'Twilio', 'Afterbuy', 'Shopware', 'Google Merchant Center', 'Airbnb'] },
        { label: 'Infrastruktur', items: ['Docker', 'Nginx', 'GitHub Actions'] },
      ],
    },
    ctaTitle: 'Unsicher, welche Leistung Sie brauchen?', ctaText: 'Beschreiben Sie Ihre Herausforderung – wir empfehlen im kostenlosen, unverbindlichen Erstgespräch den passenden Weg.',
  },
  industries: {
    meta: { title: 'Software für E-Commerce, HR, Logistik & mehr', description: 'Software und Automatisierung für E-Commerce, Workforce-Management, Supply Chain, Hospitality, Automotive, Finance und Fertigung – mit Produkten im produktiven Einsatz.' },
    eyebrow: 'Branchen', title: 'Lösungen für echte Arbeitsabläufe.',
    intro: 'Unsere Erfahrung reicht von E-Commerce und Logistik bis zu Industrie, Hospitality und Automotive – belegt durch Produkte, die unser Team entwickelt hat.',
    primaryCta: 'Projekt besprechen', secondaryCta: 'Portfolio ansehen',
    overview: { eyebrow: 'Überblick', title: 'Sieben Branchen, ein Entwicklungsteam', text: 'Wählen Sie Ihre Branche und sehen Sie typische Herausforderungen, was wir entwickeln und eine Referenzlösung aus unserem Portfolio.' },
    servicesLabel: 'Eingesetzte Leistungen', referenceLabel: 'Referenzlösung', viewInPortfolio: 'Im Portfolio ansehen',
    ctaTitle: 'Ihre Branche ist nicht dabei?', ctaText: 'Unsere Individualsoftware und Automatisierung funktionieren auch jenseits dieser Branchen. Erzählen Sie uns von Ihren Prozessen – das Erstgespräch ist kostenlos und unverbindlich.',
  },
  hire: {
    meta: { title: 'Entwickler engagieren: Teams & Spezialisten', description: 'Dedizierte Entwickler und Teams aus Deutschland: Full-Stack, Frontend, Backend, Mobile, KI, DevOps, QA und UI/UX – als dediziertes Team oder Teamverstärkung.' },
    eyebrow: 'Teams & Spezialisten', title: 'Entwicklungs-Know-how, wenn Sie es brauchen.',
    intro: 'Ergänzen Sie Ihr Team mit erfahrenen Spezialistinnen und Spezialisten für konkrete Projekte oder langfristige Vorhaben.',
    primaryCta: 'Spezialisten anfragen', secondaryCta: 'Modelle vergleichen',
    roles: {
      eyebrow: 'Rollen', title: 'Spezialisten für jeden Teil Ihres Produkts',
      text: 'Entwicklerinnen und Entwickler aus dem Team, das unsere eigenen Produkte baut und betreibt – mit Praxiserfahrung in den folgenden Technologien.',
      items: [
        { icon: 'CodeXml', title: 'Full-Stack-Entwickler', text: 'Komplette Features von der Datenbank bis zur Oberfläche.', skills: ['TypeScript', 'React', 'Next.js', 'NestJS', 'PostgreSQL'] },
        { icon: 'Monitor', title: 'Frontend-Entwickler', text: 'Schnelle, barrierearme Weboberflächen und Dashboards.', skills: ['React', 'Next.js', 'TypeScript'] },
        { icon: 'Database', title: 'Backend-Entwickler', text: 'APIs, Schnittstellen und Datenverarbeitung.', skills: ['Node.js', 'NestJS', 'Python', 'Django', 'Redis', 'BullMQ'] },
        { icon: 'Smartphone', title: 'Mobile-Entwickler', text: 'Apps für Kunden und Außendienst-Teams.', skills: ['Android', 'iOS', 'Progressive Web Apps'] },
        { icon: 'Sparkles', title: 'KI-Entwickler', text: 'Sprachassistenten, Dokumentenverarbeitung und KI-Integrationen.', skills: ['Voice AI', 'Dokumentenverarbeitung', 'Twilio'] },
        { icon: 'ServerCog', title: 'DevOps-Engineer', text: 'Deployments, CI/CD und zuverlässiger Betrieb.', skills: ['Docker', 'Nginx', 'GitHub Actions'] },
        { icon: 'Bug', title: 'QA-Engineer', text: 'Tests und Qualitätssicherung für jedes Release.', skills: ['Testautomatisierung', 'Regressionstests', 'Release-Prüfungen'] },
        { icon: 'PenTool', title: 'UI/UX-Designer', text: 'Nutzerforschung, Prototypen und Design-Systeme.', skills: ['UX-Research', 'Prototyping', 'Design-Systeme'] },
      ],
    },
    steps: {
      eyebrow: 'So funktioniert es', title: 'Von der Anfrage zum produktiven Team',
      text: 'Ein klarer Ablauf, damit Spezialisten schon in den ersten Wochen zu Ihrem Produkt beitragen.',
      items: [
        { title: 'Anforderungen teilen', text: 'Erzählen Sie uns von Projekt, Tech-Stack, Teamstruktur und den benötigten Rollen.' },
        { title: 'Passende Profile', text: 'Wir schlagen Spezialisten vor, deren Erfahrung zu Ihrer Technologie und Branche passt.' },
        { title: 'Team kennenlernen', text: 'Sprechen Sie mit den vorgeschlagenen Entwicklern, bevor etwas vereinbart wird.' },
        { title: 'Onboarding', text: 'Die Spezialisten arbeiten in Ihren Tools, Prozessen und Kommunikationskanälen.' },
        { title: 'Flexibel skalieren', text: 'Regelmäßige Abstimmungen und die Flexibilität, das Team an neue Prioritäten anzupassen.' },
      ],
    },
    trust: { eyebrow: 'Warum AutomatonSoft', title: 'Sicher skalieren', text: 'Worauf Sie sich verlassen können, wenn unsere Spezialisten Ihr Team verstärken.' },
    ctaTitle: 'Sagen Sie uns, welche Spezialisten Sie brauchen', ctaText: 'Beschreiben Sie Rollen, Stack und Zeitrahmen – wir melden uns mit passenden Profilen und den nächsten Schritten.',
  },
  blog: {
    meta: { title: 'Blog: Software & Automatisierung', description: 'Einblicke in Softwareentwicklung, Automatisierung und digitale Produkte.' },
    eyebrow: 'Blog', title: 'Wissen für digitale Entscheidungen.', intro: 'Einblicke in Softwareentwicklung, Automatisierung und den Aufbau nachhaltiger digitaler Produkte.',
    sections: [
      { title: 'Individuelle Software', text: 'Wann Standardsoftware ausreicht – und wann eine maßgeschneiderte Lösung den entscheidenden Unterschied macht.', items: ['Software-Strategie', 'Business Prozesse', 'Digitale Produkte'] },
      { title: 'Automatisierung', text: 'Wie Schnittstellen und gut strukturierte Daten wiederkehrende Arbeit spürbar reduzieren.', items: ['Workflows', 'Integrationen', 'Künstliche Intelligenz'] },
    ],
  },
  contact: {
    meta: { title: 'Kontakt – kostenloses Erstgespräch', description: 'Kontaktieren Sie AutomatonSoft GmbH – unverbindliches Erstgespräch zu Ihrem Software-Projekt.' },
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
    meta: { title: 'Datenschutzerklärung', description: 'Datenschutzerklärung der AutomatonSoft GmbH.' },
    eyebrow: 'Rechtliches', title: 'Datenschutzerklärung', intro: 'Der Schutz Ihrer persönlichen Daten ist uns wichtig.',
    sections: [
      { title: 'Verantwortliche Stelle', address: true, items: ['Kontaktaufnahme', 'Server-Logdaten'] },
      { title: 'Ihre Rechte', text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.', items: ['Auskunft', 'Berichtigung', 'Löschung'] },
    ],
  },
};

export default pages;
