// Single source of truth for company facts used across pages, SEO and structured data.
export const siteConfig = {
  name: 'AEA GmbH & Co. KG', // legal entity: imprint, address, copyright
  shortName: 'AutomatonSoft', // brand: page titles, social previews, search results
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://automatonsoft.com',
  logo: '/assets/img/logo.webp',
  // Browsers keep icons for a long time: a new picture needs a new file name, or the old one stays visible.
  favicon: '/assets/img/favicon-mark-48.png',
  appleIcon: '/assets/img/apple-touch-icon-mark.png',
  ogImage: (locale) => `/assets/img/og/og-${locale}.jpg`,
  email: 'info@automatonsoft.de',
  vatId: 'DE327113973',
  phone: { display: '+49 7392 9378440', href: 'tel:+4973929378440' },
  whatsapp: { display: '+49 176 43450100', href: 'https://wa.me/4917643450100' },
  address: { street: 'Am Flugplatz 28', postalCode: '88483', city: 'Burgrieden', country: 'DE' },
};

// The `icons` metadata of every root layout.
export const siteIcons = { icon: [{ url: siteConfig.favicon, sizes: '48x48', type: 'image/png' }], apple: siteConfig.appleIcon };

export const addressLines =[siteConfig.address.street, `${siteConfig.address.postalCode} ${siteConfig.address.city}`];
