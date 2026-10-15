import { defaultLocale, getDictionary, href, locales, projectHref } from '@/lib/i18n';
import { isPreparing, localizeProject } from '@/lib/portfolio';
import { siteConfig } from '@/lib/site-config';

// Pages without real content yet: reachable, but kept out of search results and the sitemap.
export const draftPages = ['blog'];

const absolute = (path) => new URL(path, siteConfig.url).href;

export function pageAlternates(page) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, href(locale, page)]));
  return { ...languages, 'x-default': languages[defaultLocale] };
}

export function projectAlternates(slug) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, projectHref(locale, slug)]));
  return { ...languages, 'x-default': languages[defaultLocale] };
}

// overrides: { meta, path, languages, image, noindex } for pages outside the dictionary, such as project landing pages.
export function buildMetadata(locale, page, overrides = {}) {
  const t = getDictionary(locale);
  const { title, description = t.meta.description } = { ...t.pages[page].meta, ...overrides.meta };
  const fullTitle = title ? `${title} | ${siteConfig.shortName}` : t.meta.title;
  const url = overrides.path || href(locale, page);
  const image = overrides.image || { url: siteConfig.ogImage(locale), width: 1200, height: 630, alt: t.meta.ogAlt, type: 'image/jpeg' };
  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: overrides.languages || pageAlternates(page) },
    openGraph: {
      type: 'website', url, title: fullTitle, description, siteName: siteConfig.name, locale: t.ogLocale,
      alternateLocale: locales.filter((item) => item !== locale).map((item) => getDictionary(item).ogLocale),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
    icons: { icon: [{ url: siteConfig.favicon, sizes: '48x48', type: 'image/png' }], apple: siteConfig.appleIcon },
    ...((draftPages.includes(page) || overrides.noindex) && { robots: { index: false, follow: true } }),
  };
}

// Without a project (the client-rendered fallback page) the portfolio metadata is used, kept out of the index.
export function projectMetadata(locale, project) {
  if (!project) return buildMetadata(locale, 'portfolio', { noindex: true });
  const { title, description, slug, screenshots } = localizeProject(project, locale);
  return buildMetadata(locale, 'portfolio', {
    meta: { title, description }, path: projectHref(locale, slug), languages: projectAlternates(slug),
    image: screenshots[0] && { url: screenshots[0], alt: title }, noindex: isPreparing(project),
  });
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

// project: optional third crumb { name, path } below the page.
export function breadcrumbJsonLd(locale, page, project) {
  const t = getDictionary(locale);
  const content = t.pages[page];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.common.home, item: absolute(href(locale, 'home')) },
      { '@type': 'ListItem', position: 2, name: t.nav[page] || t.footer[page] || content.eyebrow, item: absolute(href(locale, page)) },
      ...(project ? [{ '@type': 'ListItem', position: 3, name: project.name, item: absolute(project.path) }] : []),
    ],
  };
}
