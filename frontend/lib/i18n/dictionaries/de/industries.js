// Industry catalogue shared by the homepage explorer, the industries page and the footer.
const industries = {
  items: [
    { id: 'ecommerce', summary: 'Produktdaten, Bestellungen und Marktplätze aus einer Quelle.', services: ['process-automation', 'custom-software', 'ai-solutions'], category: 'ecommerce-marketplace-automation', icon: 'ShoppingCart', title: 'E-Commerce & Marktplätze',
      challenge: 'Produktdaten, Preise und Bestellungen werden über Shops und Marktplätze hinweg von Hand gepflegt – langsam, fehleranfällig und schwer skalierbar.',
      solutions: ['Zentrales Produktdatenmanagement', 'Marktplatz- und Shop-Anbindungen', 'Automatischer Auftrags- und Bestandsabgleich'],
      reference: { name: 'E-Commerce Automation Suite', text: 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de, Google Merchant Center und Shopware – aus einer zentralen Produktdatenbank heraus.' } },
    { id: 'workforce', summary: 'Verlässliche Arbeitszeiten, Anwesenheit und Projektzeiten.', services: ['web-mobile', 'custom-software'], category: 'workforce-hr-automation', icon: 'Users', title: 'Workforce & HR',
      challenge: 'Arbeitszeiten, Anwesenheit und Projektzeiten werden manuell erfasst – mit Lücken, Rückfragen und langsamer Lohn- und Rechnungsstellung.',
      solutions: ['Automatische Zeit- und Aktivitätserfassung', 'Stundenzettel und abrechenbare Zeiten', 'GPS-Zeiterfassung für den Außendienst'],
      reference: { name: 'Hubnity', text: 'Zeiterfassungs-SaaS mit Arbeitszeiten, Projektkontext, Anwesenheit und Reports in einem Workspace – im Web, auf dem Desktop und unter Android.' } },
    { id: 'supply-chain', summary: 'Bestellungen und Lagerprozesse im Griff.', services: ['process-automation', 'custom-software'], category: 'supply-chain-warehouse', icon: 'Package', title: 'Supply Chain & Lager',
      challenge: 'Bestellungen kommen über viele Kanäle, während Lagerprozesse auf Papier und manuellen Übergaben beruhen.',
      solutions: ['Zentrale Bestellverwaltung', 'Lagerorganisation', 'Lieferanten- und Kanalanbindung'],
      reference: { name: 'Supply Chain Automation Suite', text: 'Zentrale Bestellverwaltung (OrderHub) und strukturierte Lagerorganisation (Warehouse Organizer, BerimDepom) aus einer Suite.' } },
    { id: 'hospitality', summary: 'Buchungen und Verfügbarkeiten über alle Kanäle.', services: ['web-mobile', 'process-automation'], category: 'hospitality-hotel-software', icon: 'Hotel', title: 'Hospitality',
      challenge: 'Buchungen und Verfügbarkeiten verteilen sich auf mehrere Plattformen – mit Doppelbuchungen und manuellem Abgleich als Folge.',
      solutions: ['Buchungs- und Verfügbarkeitsmanagement', 'Kanal- und Plattformanbindung', 'Gäste- und Objektverwaltung'],
      reference: { name: 'Lunanitiz Hotel Software', text: 'Zentrale Verwaltung von Buchungen und Verfügbarkeiten für Hotellerie und Kurzzeitvermietung, mit Anbindung an Airbnb.' } },
    { id: 'automotive', summary: 'Fahrzeug-, Kunden- und Auftragsdaten für Autohäuser und Werkstätten.', services: ['custom-software', 'web-mobile'], category: 'automotive-software', icon: 'Car', title: 'Automotive',
      challenge: 'Fahrzeug-, Kunden- und Auftragsdaten sind zwischen Büro und Werkstatt verstreut.',
      solutions: ['Autohaus- und Werkstattverwaltung', 'Fahrzeug- und Kundendaten', 'Mobile Apps für die Werkstatt'],
      reference: { name: 'AutoCar Software Suite', text: 'Verwaltung von Fahrzeug-, Kunden- und Auftragsdaten für Autohäuser und Werkstätten – im Backoffice und mobil.' } },
    { id: 'finance', summary: 'Digitale Kassenbücher und weniger manuelle Buchhaltung.', services: ['process-automation', 'custom-software'], category: 'finance-accounting-automation', icon: 'Landmark', title: 'Finance & Accounting',
      challenge: 'Kassenführung und Buchhaltung werden noch auf Papier dokumentiert und manuell übertragen.',
      solutions: ['Digitale Kassenbücher', 'Buchhaltungsschnittstellen', 'Beleg- und Dokumentenautomatisierung'],
      reference: { name: 'Cashbook', text: 'Digitale Kassenbuchführung für kleine und mittlere Unternehmen mit Bargeldverkehr.' } },
    { id: 'industrial-ai', summary: 'Produktionsdaten, die Entscheidungen unterstützen.', services: ['ai-solutions', 'process-automation'], category: 'industrial-ai-manufacturing', icon: 'Factory', title: 'Industrial AI & Fertigung',
      challenge: 'Produktionsdaten sind vorhanden, werden aber selten verknüpft und für Entscheidungen in der Fertigung genutzt.',
      solutions: ['Integration von Produktionsdaten', 'KI-gestützte Qualitäts- und Prozessanalyse', 'Anwendungen für die Fertigung'] },
  ],
};

export default industries;
