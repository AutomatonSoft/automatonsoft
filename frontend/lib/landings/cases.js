// Shipped projects a landing can cite as references. Facts only – taken from the portfolio and the case studies.
// list: what was delivered (or connected); status: optional label shown next to every list item.
export const images = {
  lisa: { src: '/assets/img/cases/lisa-console.webp', small: '/assets/img/cases/lisa-console-960.webp', width: 2000, height: 1135 },
};

const cases = {
  lisa: {
    de: {
      meta: 'Voice AI · JV Möbel · Afterbuy', title: 'Lisa beantwortet „Wo ist meine Bestellung?“',
      text: 'Für den Möbelhändler JV Möbel nimmt Lisa Anrufe rund um die Uhr an, verifiziert Anrufer und nennt den Live-Bestellstatus aus Afterbuy.',
      listLabel: 'Was wir umgesetzt haben',
      list: ['KI-Sprachassistentin, die Anrufe rund um die Uhr annimmt', 'Anruferverifizierung, bevor Daten geteilt werden', 'Live-Bestellstatus aus Afterbuy', 'Sprachnachrichten mit Transkript per E-Mail'],
    },
    en: {
      meta: 'Voice AI · JV Möbel · Afterbuy', title: 'Lisa answers “Where is my order?”',
      text: 'For the furniture retailer JV Möbel, Lisa answers calls around the clock, verifies callers and gives the live order status from Afterbuy.',
      listLabel: 'What we delivered',
      list: ['AI voice assistant answering calls 24/7', 'Caller verification before any data is shared', 'Live order status from Afterbuy', 'Voice messages with transcripts by email'],
    },
  },
  ecommerceSuite: {
    de: {
      meta: 'Produktdaten · Marktplätze', title: 'E-Commerce Automation Suite',
      text: 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de, Google Merchant Center und Shopware – aus einer zentralen Produktdatenbank heraus.',
      list: ['otto.de', 'kaufland.de', 'Google Merchant Center', 'Shopware'], status: 'synchron',
    },
    en: {
      meta: 'Product data · Marketplaces', title: 'E-Commerce Automation Suite',
      text: 'Automated product data management for otto.de, kaufland.de, Google Merchant Center and Shopware – from one central product database.',
      list: ['otto.de', 'kaufland.de', 'Google Merchant Center', 'Shopware'], status: 'in sync',
    },
  },
  supplyChainSuite: {
    de: {
      meta: 'Bestellungen · Lager', title: 'Supply Chain Automation Suite',
      text: 'Zentrale Bestellverwaltung (OrderHub) und strukturierte Lagerorganisation (Warehouse Organizer, BerimDepom) aus einer Suite.',
      listLabel: 'Module',
      list: ['OrderHub – zentrale Bestellverwaltung', 'Warehouse Organizer – Lagerorganisation', 'BerimDepom – Lagerorganisation'],
    },
    en: {
      meta: 'Orders · Warehouse', title: 'Supply Chain Automation Suite',
      text: 'Central order management (OrderHub) and structured warehouse organisation (Warehouse Organizer, BerimDepom) in one suite.',
      listLabel: 'Modules',
      list: ['OrderHub – central order management', 'Warehouse Organizer – warehouse organisation', 'BerimDepom – warehouse organisation'],
    },
  },
};

export default cases;
