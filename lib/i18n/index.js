import de from './dictionaries/de';
import en from './dictionaries/en';

export const locales = ['de', 'en'];
export const defaultLocale = 'de';

const dictionaries = { de, en };

// Page id -> public slug per locale. German URLs stay unprefixed to keep existing links and rankings intact.
const routes = {
  de: { home: '', company: 'unternehmen', services: 'dienstleistungen', industries: 'branchen', hire: 'entwickler-engagieren', portfolio: 'portfolio', blog: 'blog', contact: 'kontakt', imprint: 'impressum', privacy: 'datenschutz' },
  en: { home: '', company: 'company', services: 'services', industries: 'industries', hire: 'hire-developers', portfolio: 'portfolio', blog: 'blog', contact: 'contact', imprint: 'imprint', privacy: 'privacy' },
};

export const pageIds = Object.keys(routes.de);

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function href(locale, page, hash = '') {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const slug = routes[locale][page];
  return `${prefix}${slug ? `/${slug}` : ''}${hash ? `#${hash}` : ''}` || '/';
}

export function pageFromSlug(locale, slug = []) {
  if (slug.length > 1) return null;
  return pageIds.find((page) => routes[locale][page] === (slug[0] || '')) || null;
}

export function staticParams(locale) {
  return pageIds.map((page) => ({ slug: routes[locale][page] ? [routes[locale][page]] : [] }));
}
