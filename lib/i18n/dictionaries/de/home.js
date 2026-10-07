const home = {
  eyebrow: 'Software · Web · Mobile · Automatisierung',
  titleStart: 'Individuelle Software, die ', titleHighlight: 'Ihr Unternehmen voranbringt.',
  lead: 'AutomatonSoft entwickelt maßgeschneiderte Softwarelösungen, Websites, Apps und Automatisierungen für Unternehmen, die mehr wollen als Standard.',
  primaryCta: 'Projekt besprechen', secondaryCta: 'Portfolio ansehen',
  assurance: 'Kostenloses, unverbindliches Erstgespräch',
  hub: {
    label: 'Illustration: AutomatonSoft verbindet Ihre Geschäftssysteme zu einer Plattform',
    center: 'Ihre Plattform', caption: 'Vernetzte Systeme. Eine verlässliche Datenbasis.',
    nodes: [
      { icon: 'Database', label: 'ERP' }, { icon: 'UsersRound', label: 'CRM' }, { icon: 'ShoppingCart', label: 'Shop & Marktplätze' },
      { icon: 'ChartColumn', label: 'Analytics' }, { icon: 'Smartphone', label: 'Mobile Apps' }, { icon: 'Sparkles', label: 'KI-Services' },
    ],
  },
  services: {
    eyebrow: 'Was wir tun', title: 'End-to-End-Entwicklung für geschäftskritische Software', cta: 'Alle Leistungen ansehen', more: 'Mehr erfahren', flipHint: 'Details', 
    text: 'Ein Partner von der Analyse bis zum Betrieb: Wir konzipieren, entwickeln, integrieren und betreiben Software, auf die sich Ihre Teams täglich verlassen.',
  },
  trust: {
    label: 'Warum AutomatonSoft',
    items: [
      { icon: 'MapPin', title: 'Entwickelt in Deutschland', text: 'Entwicklung und Projektleitung aus Burgrieden, Baden-Württemberg.' },
      { icon: 'ShieldCheck', title: 'Privacy by Design', text: 'DSGVO-Anforderungen sind ab dem ersten Konzept Teil der Architektur.' },
      { icon: 'KeyRound', title: 'Klare Rechte am Code', text: 'Transparente Vereinbarungen zu Quellcode und Nutzungsrechten ab Tag eins.' },
      { icon: 'Handshake', title: 'Direkter Ansprechpartner', text: 'Ein fester technischer Kontakt statt anonymer Ticket-Warteschlangen.' },
    ],
  },
  industries: {
    eyebrow: 'Branchen', title: 'Bewährt in den Branchen, die wir betreuen', cta: 'Alle Branchen ansehen',
    text: 'Jede Branche hat eigene Prozesse, Systeme und Vorgaben. Wir bauen auf Lösungen auf, die in unserem Portfolio bereits im Einsatz sind.',
    labels: { list: 'Branchen', challenge: 'Die Herausforderung', solutions: 'Was wir entwickeln', reference: 'Referenzlösung', viewInPortfolio: 'Im Portfolio ansehen' },
  },
  caseStudies: {
    eyebrow: 'Ausgewählte Projekte', title: 'Produkte, die wir entwickelt haben',
    text: 'Echte Plattformen im täglichen Einsatz – von SaaS für verteilte Teams bis zu KI, die Kundenanrufe beantwortet.',
    switchLabel: 'Fallstudien', deliveredLabel: 'Was wir umgesetzt haben', similar: 'Ähnliches Projekt besprechen',
    items: [
      { id: 'hubnity', brand: 'Hubnity', tag: 'hubnity.com', title: 'Hubnity: Zeiterfassungs-SaaS für verteilte Teams',
        text: 'Wir haben Hubnity entwickelt – eine Cloud-Plattform, die Teams verlässliche Arbeitszeiten, Projektkontext, Anwesenheit und Reports in einem Workspace bietet, im Web, auf dem Desktop und mobil.',
        delivered: ['Automatische Zeit- und Aktivitätserfassung', 'Stundenzettel, abrechenbare Zeiten und Rechnungen', 'Desktop-Apps für Windows, macOS und Linux', 'Android-App mit GPS-Erfassung für Außendienst-Teams', 'Abo-Abrechnung mit Stripe', 'Reports und Exporte als PDF und CSV'],
        facts: [{ label: 'Produkt', value: 'B2B-SaaS-Plattform' }, { label: 'Plattformen', value: 'Web · Windows · macOS · Linux · Android' }, { label: 'Zielgruppe', value: 'Agenturen, Remote- und Außendienst-Teams' }],
        stackLabel: 'Technologie-Stack', stack: ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Stripe'],
        url: 'https://hubnity.com', visit: 'hubnity.com besuchen',
        image: { src: '/assets/img/cases/hubnity-site.webp', width: 2000, height: 905, alt: 'Hubnity-Website: „Time Tracking Software for Teams & Businesses“ mit Team-Dashboard, Projektfortschritt, mobiler GPS-Karte und Umsatz-Widgets' } },
      { id: 'lisa', brand: 'Lisa', tag: 'Voice AI · JV Möbel', title: 'Lisa: KI-Sprachassistentin für Kundenanrufe',
        text: 'Für das Möbelunternehmen JV Möbel haben wir Lisa entwickelt – eine KI-Sprachassistentin, die Kundenanrufe rund um die Uhr annimmt, Anrufer verifiziert und den Bestellstatus mitteilt, während das Team Anrufe, Bestellungen und Sprachnachrichten in einer Konsole verwaltet.',
        delivered: ['KI-Sprachassistentin, die Anrufe rund um die Uhr annimmt', 'Anruferverifizierung, bevor Daten geteilt werden', 'Live-Bestellstatus aus Afterbuy', 'Sprachnachrichten mit Transkript per E-Mail', 'Mitarbeiterkonsole für Anrufe, Bestellungen und Nachrichten', 'Rollenbasierter Zugriff und Brute-Force-Schutz'],
        facts: [{ label: 'Produkt', value: 'KI-Sprachassistentin und Mitarbeiterkonsole' }, { label: 'Kanäle', value: 'Telefonanrufe · Sprachnachrichten' }, { label: 'Branche', value: 'Möbel-E-Commerce' }],
        stackLabel: 'Integrationen', stack: ['Twilio', 'Afterbuy'],
        image: { src: '/assets/img/cases/lisa-console.webp', width: 2000, height: 1135, alt: 'Anmeldeseite der Lisa Console: „Every call answered, even at night.“ mit einem verifizierten, ohne Mitarbeiter gelösten Anruf' } },
    ],
  },
  process: {
    eyebrow: 'Unser Vorgehen', title: 'Ein klarer Weg von der Idee bis zum Betrieb',
    text: 'Wir starten mit Ihren Anforderungen, entwickeln transparent in Etappen und verbessern auch nach dem Go-live kontinuierlich.',
    steps: [
      { title: 'Erstgespräch', text: 'Ein kostenloses, unverbindliches Gespräch über Ihre Ziele, Anforderungen und Prioritäten.' },
      { title: 'Analyse & Konzept', text: 'Wir erfassen Ihre Prozesse und Systeme und legen Umfang, Architektur und Etappen fest.' },
      { title: 'Iterative Entwicklung', text: 'Umsetzung in transparenten Etappen mit regelmäßigen Demos – Sie sehen jederzeit echten Fortschritt.' },
      { title: 'Qualität & Go-live', text: 'Tests, Qualitätssicherung und ein kontrollierter Go-live in Ihrer Umgebung.' },
      { title: 'Betrieb & Weiterentwicklung', text: 'Monitoring, Wartung und kontinuierliche Weiterentwicklung, während Ihr Unternehmen wächst.' },
    ],
  },
  engagement: {
    eyebrow: 'Zusammenarbeit', title: 'Arbeiten Sie mit uns so, wie es zu Ihnen passt',
    text: 'Ob klar abgegrenztes Projekt oder langfristige Kapazität – wählen Sie das Modell, das zu Ihrer Organisation passt.',
    bestFor: 'Ideal für',
    models: [
      { id: 'project', icon: 'Target', title: 'Projektumsetzung', bestFor: 'Klar abgegrenzte Vorhaben mit definiertem Ziel',
        points: ['Verantwortung von A bis Z', 'Vereinbarter Umfang und Meilensteine', 'Vom Konzept bis zum Go-live'], cta: 'Projekt anfragen', target: 'contact' },
      { id: 'team', icon: 'UsersRound', title: 'Dediziertes Team', bestFor: 'Produktentwicklung über Monate oder Jahre',
        points: ['Ein Team exklusiv für Ihr Produkt', 'Fester technischer Ansprechpartner', 'Wächst mit Ihrer Roadmap'], cta: 'Team aufbauen', target: 'hire' },
      { id: 'extension', icon: 'UserPlus', title: 'Teamverstärkung', bestFor: 'Kompetenzlücken im bestehenden Team schließen',
        points: ['Spezialisten verstärken Ihr Team', 'Full-Stack, Mobile, DevOps, QA, UI/UX', 'Ihre Prozesse und Tools'], cta: 'Entwickler engagieren', target: 'hire' },
    ],
  },
  faq: {
    eyebrow: 'FAQ', title: 'Häufige Fragen',
    text: 'Ihre Frage ist nicht dabei? Sprechen Sie uns an – wir helfen gern weiter.',
    items: [
      { q: 'Wie startet ein Projekt mit AutomatonSoft?', a: 'Mit einem kostenlosen, unverbindlichen Erstgespräch. Wir klären Ihre Ziele, Anforderungen und Prioritäten und schlagen anschließend ein passendes Vorgehen, einen Umfang und die nächsten Schritte vor.' },
      { q: 'Arbeiten Sie auch mit Unternehmen außerhalb Deutschlands?', a: 'Ja. Unser Team arbeitet auf Deutsch und Englisch und arbeitet remote mit Kunden zusammen – der Standort ist kein Hindernis.' },
      { q: 'Wem gehört der Quellcode?', a: 'Eigentum am Quellcode und Nutzungsrechte werden von Anfang an transparent im Vertrag geregelt – ohne spätere Überraschungen.' },
      { q: 'Unterzeichnen Sie eine Geheimhaltungsvereinbarung?', a: 'Ja. Wir behandeln Ihre Informationen vertraulich und unterzeichnen gern ein NDA, bevor wir Details Ihres Projekts besprechen.' },
      { q: 'Können Sie bestehende Software übernehmen oder erweitern?', a: 'Ja. Wir analysieren bestehende Systeme und erweitern, integrieren oder modernisieren sie Schritt für Schritt – ohne Ihren laufenden Betrieb zu stören.' },
      { q: 'Was passiert nach dem Go-live?', a: 'Auf Wunsch übernehmen wir Hosting, Monitoring, Updates und Weiterentwicklung – damit Ihre Software sicher bleibt und mit Ihrem Unternehmen wächst.' },
    ],
  },
  cta: {
    title: 'Bereit für Ihr nächstes Software-Projekt?', primary: 'Jetzt Kontakt aufnehmen', secondary: 'Leistungen entdecken',
    text: 'Erzählen Sie uns von Ihrer Idee – wir melden uns mit einer ersten Einschätzung und einem unverbindlichen Gesprächstermin.',
  },
};

export default home;
