import { defaultLocale } from '@/lib/i18n';

const TRANSLATED = ['description', 'stack', 'challenge', 'features', 'results'];

// The development time is typed only once, in German ("ca. 3,5 Monate", "seit 07/2026"); these are the words it is written with.
const ENGLISH_TIME = { 'ca.': 'approx.', seit: 'since', Prototyp: 'Prototype', Tag: 'day', Tage: 'days', Woche: 'week', Wochen: 'weeks', Monat: 'month', Monate: 'months', Jahr: 'year', Jahre: 'years' };
const englishTime = (value) => value
  .replace(/\bca\.|\p{L}+/gu, (word) => ENGLISH_TIME[word] || word)
  .replace(/(\d),(\d)/g, '$1.$2');

// Project content in the database is German; other locales read optional overrides from `translations`.
export function localizeProject(project, locale) {
  if (locale === defaultLocale) return project;
  const translation = project.translations?.[locale] || {};
  return {
    ...project,
    ...(project.development_time && { development_time: englishTime(project.development_time) }),
    ...Object.fromEntries(TRANSLATED.filter((key) => translation[key]?.length).map((key) => [key, translation[key]])),
  };
}

// Slug of the client-rendered page Nginx serves for projects added after the last build.
export const FALLBACK_SLUG = '_';

// Status is carried by German base tags; rank orders finished work first, then concepts, then placeholders.
const PREPARING_TAG = 'In Vorbereitung';
const CONCEPT_TAG = 'Konzept';
export const isPreparing = (project) => project.stack.includes(PREPARING_TAG);
// The tag is German in the base content and English in the translation, so both are accepted.
export const isConcept = (project) => project.stack.includes(CONCEPT_TAG) || project.stack.includes('Concept');
export const projectRank = (project) => (isPreparing(project) ? 2 : isConcept(project) ? 1 : 0);

// The order number from the dashboard decides (smaller first). Among equal numbers finished work comes before concepts and
// concepts before placeholders "in preparation"; after that the API order stays, newest first.
export const compareProjects = (a, b) => (a.position ?? 100) - (b.position ?? 100) || projectRank(a) - projectRank(b);

// Where a product runs: order and icon of the platform marks on the card and the project page.
export const platformIcons = { web: 'Globe', desktop: 'Monitor', mobile: 'Smartphone' };

export const categoryIcons = {
  'ecommerce-marketplace-automation': 'ShoppingCart', 'workforce-hr-automation': 'Users', 'ai-business-solutions': 'Sparkles',
  'supply-chain-warehouse': 'Package', 'industrial-ai-manufacturing': 'Factory', 'hospitality-hotel-software': 'Hotel',
  'automotive-software': 'Car', 'finance-accounting-automation': 'Landmark', 'custom-software-business-automation': 'CodeXml',
};
