import { defaultLocale, href, locales } from '@/lib/i18n';
import ecommerce from './ecommerce';

// Industry landing pages (docs/TZ.md §4): one template, one data file per industry.
export const landings = { ecommerce };

export const landingHref = (locale, id) => `${href(locale, 'industries')}/${landings[id].slug[locale]}`;

export const landingFromSlug = (locale, slug) => Object.keys(landings).find((id) => landings[id].slug[locale] === slug) || null;

export const landingParams = (locale) => Object.values(landings).map((landing) => ({ industry: landing.slug[locale] }));

export function landingAlternates(id) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, landingHref(locale, id)]));
  return { ...languages, 'x-default': languages[defaultLocale] };
}

// Industry id (dictionaries/industries.js) -> its landing page, if one exists.
export const landingHrefFor = (locale, id) => (landings[id] ? landingHref(locale, id) : null);
