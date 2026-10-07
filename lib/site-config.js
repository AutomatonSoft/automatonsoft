// Single source of truth for company facts used across pages, SEO and structured data.
export const siteConfig = {
  name: 'AutomatonSoft GmbH',
  shortName: 'AutomatonSoft',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://automatonsoft.com',
  logo: '/assets/img/logo.webp',
  icon: '/assets/img/logo-icon.webp',
  favicon: '/assets/img/favicon-48.png',
  appleIcon: '/assets/img/apple-touch-icon.png',
  ogImage: (locale) => `/assets/img/og/og-${locale}.jpg`,
  email: 'info@automatonsoft.de',
  phone: { display: '+49 7392 9378410', href: 'tel:+4973929378410' },
  whatsapp: { display: '+49 176 43450100', href: 'https://wa.me/4917643450100' },
  address: { street: 'Am Flugplatz 28', postalCode: '88483', city: 'Burgrieden', country: 'DE' },
};

export const addressLines = [siteConfig.address.street, `${siteConfig.address.postalCode} ${siteConfig.address.city}`];
