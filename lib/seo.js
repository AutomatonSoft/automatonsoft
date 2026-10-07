import { defaultLocale, getDictionary, href, locales } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';

// Pages without real content yet: reachable, but kept out of search results and the sitemap.
export const draftPages = ['blog'];

const absolute = (path) => new URL(path, siteConfig.url).href;

export function pageAlternates(page) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, href(locale, page)]));
  return { ...languages, 'x-default': languages[defaultLocale] };
}

export function buildMetadata(locale, page) {
  const t = getDictionary(locale);
  const { title, description = t.meta.description } = t.pages[page].meta;
  const fullTitle = title ? `${title} | ${siteConfig.shortName}` : t.meta.title;
  const url = href(locale, page);
  const image = { url: siteConfig.ogImage(locale), width: 1200, height: 630, alt: t.meta.ogAlt, type: 'image/jpeg' };
  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: pageAlternates(page) },
    openGraph: {
      type: 'website', url, title: fullTitle, description, siteName: siteConfig.name, locale: t.ogLocale,
      alternateLocale: locales.filter((item) => item !== locale).map((item) => getDictionary(item).ogLocale),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
    icons: { icon: [{ url: siteConfig.favicon, sizes: '48x48', type: 'image/png' }], apple: siteConfig.appleIcon },
    ...(draftPages.includes(page) && { robots: { index: false, follow: true } }),
  };
}

// One linked graph per page: the organisation and the website it publishes.
export function siteJsonLd(locale) {
  const t = getDictionary(locale);
  const { address } = siteConfig;
  const organizationId = absolute('/#organization');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.name,
        url: absolute(href(defaultLocale, 'home')),
        logo: { '@type': 'ImageObject', url: absolute(siteConfig.logo), width: 600, height: 443 },
        image: absolute(siteConfig.ogImage(locale)),
        email: siteConfig.email,
        telephone: siteConfig.phone.display,
        address: { '@type': 'PostalAddress', streetAddress: address.street, postalCode: address.postalCode, addressLocality: address.city, addressCountry: address.country },
        areaServed: 'Worldwide',
        knowsLanguage: ['de', 'en'],
        description: t.meta.description,
      },
      {
        '@type': 'WebSite',
        '@id': absolute(`${href(locale, 'home')}#website`),
        url: absolute(href(locale, 'home')),
        name: siteConfig.shortName,
        inLanguage: locale,
        publisher: { '@id': organizationId },
      },
    ],
  };
}

export function breadcrumbJsonLd(locale, page) {
  const t = getDictionary(locale);
  const content = t.pages[page];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.common.home, item: absolute(href(locale, 'home')) },
      { '@type': 'ListItem', position: 2, name: t.nav[page] || t.footer[page] || content.eyebrow, item: absolute(href(locale, page)) },
    ],
  };
}
