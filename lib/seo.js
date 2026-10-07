import { defaultLocale, getDictionary, href, locales } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';

// Pages without real content yet: reachable, but kept out of search results and the sitemap.
export const draftPages = ['blog'];

export function pageAlternates(page) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, href(locale, page)]));
  return { ...languages, 'x-default': languages[defaultLocale] };
}

export function buildMetadata(locale, page) {
  const t = getDictionary(locale);
  const { title, description = t.meta.description } = t.pages[page].meta;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : t.meta.title;
  const url = href(locale, page);
  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: pageAlternates(page) },
    openGraph: {
      type: 'website', url, title: fullTitle, description, siteName: siteConfig.name, locale: t.ogLocale,
      alternateLocale: locales.filter((item) => item !== locale).map((item) => getDictionary(item).ogLocale),
      images: [{ url: siteConfig.logo, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    icons: { icon: siteConfig.icon },
    ...(draftPages.includes(page) && { robots: { index: false, follow: true } }),
  };
}

export function organizationJsonLd(locale) {
  const { address } = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: new URL(href(locale, 'home'), siteConfig.url).href,
    logo: new URL(siteConfig.logo, siteConfig.url).href,
    email: siteConfig.email,
    telephone: siteConfig.phone.display,
    address: { '@type': 'PostalAddress', streetAddress: address.street, postalCode: address.postalCode, addressLocality: address.city, addressCountry: address.country },
    description: getDictionary(locale).meta.description,
  };
}
