// Shipped projects a landing can cite as references. Facts only – taken from the portfolio and the case studies.
// list: what was delivered (or connected); status: optional label shown next to every list item.
export const images = {
  lisa: { src: '/assets/img/cases/lisa-console.webp', small: '/assets/img/cases/lisa-console-960.webp', width: 2000, height: 1135 },
};

const cases = {
  roader: {
    de: {
      meta: 'Auslieferung · Fahrer-App', title: 'Roader',
      text: 'Roader organisiert Auslieferungen für Fahrer: Routen und Stopps auf dem Smartphone, digitale Empfangsbestätigung mit Unterschrift und Benachrichtigungen an Kunden.',
      listLabel: 'Was wir umgesetzt haben',
      list: ['Routen mit Stopps als Liste und Karte in der Fahrer-App', 'Digitale Unterschrift des Empfängers', 'Signierter Lieferschein als PDF', 'Arbeiten ohne Internet, Daten werden später übertragen'],
    },
    en: {
      meta: 'Deliveries · Driver app', title: 'Roader',
      text: 'Roader organizes deliveries for drivers: routes and stops on the phone, digital proof of receipt with a signature, and notifications to customers.',
      listLabel: 'What we delivered',
      list: ['Routes with stops as a list and map in the driver app', 'Digital recipient signature', 'Signed delivery note as a PDF', 'Works without internet, data syncs later'],
    },
  },
  benimDepom: {
    de: {
      meta: 'Warenerfassung · Marktplätze', title: 'Benim Depom',
      text: 'Plattform für Möbelhersteller: Produkte werden per Smartphone-App im Lager erfasst, KI erstellt Bilder und Texte, Manager prüfen die Angebote und veröffentlichen sie auf Online-Marktplätzen.',
      listLabel: 'Was wir umgesetzt haben',
      list: ['Produkte mit dem Smartphone erfassen, bis zu 20 Fotos', 'Bilder und Texte per KI', 'Prüfung durch Manager mit Entscheidungsverlauf', 'Veröffentlichen auf OTTO, Kaufland und Hood.de'],
    },
    en: {
      meta: 'Product capture · Marketplaces', title: 'Benim Depom',
      text: 'Platform for furniture manufacturers: products are captured with a smartphone app in the warehouse, AI creates images and texts, and managers review the listings and publish them to online marketplaces.',
      listLabel: 'What we delivered',
      list: ['Capture products with a smartphone, up to 20 photos', 'Images and texts created with AI', 'Manager review with a history of decisions', 'Publishing to OTTO, Kaufland and Hood.de'],
    },
  },
  lisa: {
    de: {
      meta: 'Voice AI · JV Möbel · Afterbuy', title: 'Lisa beantwortet „Wo ist meine Bestellung?“',
      text: 'Für den Möbelhändler JV Möbel nimmt Lisa Anrufe automatisch an, verifiziert Anrufer und nennt den Live-Bestellstatus aus Afterbuy.',
      listLabel: 'Was wir umgesetzt haben',
      list: ['KI-Sprachassistentin, die Anrufe automatisch annimmt', 'Anruferverifizierung, bevor Daten geteilt werden', 'Live-Bestellstatus aus Afterbuy', 'Sprachnachrichten mit Transkript per E-Mail'],
    },
    en: {
      meta: 'Voice AI · JV Möbel · Afterbuy', title: 'Lisa answers “Where is my order?”',
      text: 'For the furniture retailer JV Möbel, Lisa answers calls automatically, verifies callers and gives the live order status from Afterbuy.',
      listLabel: 'What we delivered',
      list: ['AI voice assistant that answers calls automatically', 'Caller verification before any data is shared', 'Live order status from Afterbuy', 'Voice messages with transcripts by email'],
    },
  },
  ecommerceSuite: {
    de: {
      meta: 'Produktdaten · Marktplätze', title: 'E-Commerce Automation Suite',
      text: 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de und Shopware – aus einer zentralen Produktdatenbank heraus.',
      list: ['otto.de', 'kaufland.de', 'Shopware'], status: 'synchron',
    },
    en: {
      meta: 'Product data · Marketplaces', title: 'E-Commerce Automation Suite',
      text: 'Automated product data management for otto.de, kaufland.de and Shopware – from one central product database.',
      list: ['otto.de', 'kaufland.de', 'Shopware'], status: 'in sync',
    },
  },
  cashbook: {
    de: {
      meta: 'Belege & Kassenbuch', title: 'Cashbook',
      text: 'Belege hochladen, ordnen und per E-Mail weiterleiten, Kassenbuch führen und Steuer- sowie Belegberichte als PDF erstellen – im Web und per App.',
      listLabel: 'Was wir umgesetzt haben',
      list: ['Belege hochladen, ordnen und per E-Mail weiterleiten', 'Kassenbuch mit Kontostand je Nutzer', 'Steuer- und Belegberichte als PDF'],
    },
    en: {
      meta: 'Receipts & cash book', title: 'Cashbook',
      text: 'Upload, sort and forward receipts by email, keep a cash book, and create tax and document reports as PDF – on the web and in a mobile app.',
      listLabel: 'What we delivered',
      list: ['Upload, sort and forward receipts by email', 'Cash book with a balance per user', 'Tax and document reports as PDF'],
    },
  },
  lunanitiz: {
    de: {
      meta: 'Prototyp · Hotelsoftware', title: 'Lunanitiz Hotel Software',
      text: 'Mobile App für Hotels und Ferienunterkünfte: Buchungskalender, Preise, Zimmerreinigung und Berichte an einem Ort. Ein Prototyp mit Beispieldaten.',
      listLabel: 'Was der Prototyp zeigt',
      list: ['Buchungskalender mit Belegung über 21 Tage', 'Smart Pricing: Preisvorschläge nach Saison, Feiertagen und Wochentag', 'Zimmerreinigung und Berichte'],
    },
    en: {
      meta: 'Prototype · Hotel software', title: 'Lunanitiz Hotel Software',
      text: 'Mobile app for hotels and holiday rentals: booking calendar, prices, housekeeping and reports in one place. A prototype running on sample data.',
      listLabel: 'What the prototype shows',
      list: ['Booking calendar with a 21-day occupancy view', 'Smart pricing: price suggestions by season, holidays and weekday', 'Housekeeping and reports'],
    },
  },
};

export default cases;
