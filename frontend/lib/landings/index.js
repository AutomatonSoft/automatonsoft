import { defaultLocale, href, locales } from '@/lib/i18n';
import common from './common';
import ecommerce from './ecommerce';
import supplyChain from './supply-chain';

// Industry landing pages (docs/TZ.md §4): one template, one data file per industry.
// Keys are the industry ids from dictionaries/industries.js, so the home and industries pages can link to them.
const sources = { ecommerce, 'supply-chain': supplyChain };

// A landing's own copy overrides the shared copy, one level deep (e.g. contact.text replaces only that field).
const withCommon = (shared, own) => Object.fromEntries(
  [...new Set([...Object.keys(shared), ...Object.keys(own)])].map((key) => {
    const [a, b] = [shared[key], own[key]];
    const merge = a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a);
    return [key, merge ? { ...a, ...b } : b ?? a];
  }),
);

export const landings = Object.fromEntries(Object.entries(sources).map(([id, landing]) => [id, {
  ...landing,
  content: Object.fromEntries(locales.map((locale) => [locale, withCommon(common[locale], landing.content[locale])])),
}]));

export const landingHref = (locale, id) => `${href(locale, 'industries')}/${landings[id].slug[locale]}`;

export const landingFromSlug = (locale, slug) => Object.keys(landings).find((id) => landings[id].slug[locale] === slug) || null;

export const landingParams = (locale) => Object.values(landings).map((landing) => ({ industry: landing.slug[locale] }));

export function landingAlternates(id) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, landingHref(locale, id)]));
  return { ...languages, 'x-default': languages[defaultLocale] };
}

// Industry id (dictionaries/industries.js) -> its landing page, if one exists.
export const landingHrefFor = (locale, id) => (landings[id] ? landingHref(locale, id) : null);
