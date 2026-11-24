import { defaultLocale } from '@/lib/i18n';

const TRANSLATED = ['description', 'stack', 'challenge', 'features', 'results'];

// Project content in the database is German; other locales read optional overrides from `translations`.
export function localizeProject(project, locale) {
  if (locale === defaultLocale) return project;
  const translation = project.translations?.[locale] || {};
  return { ...project, ...Object.fromEntries(TRANSLATED.filter((key) => translation[key]?.length).map((key) => [key, translation[key]])) };
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

export const categoryIcons = {
  'ecommerce-marketplace-automation': 'ShoppingCart', 'workforce-hr-automation': 'Users', 'ai-business-solutions': 'Sparkles',
  'supply-chain-warehouse': 'Package', 'industrial-ai-manufacturing': 'Factory', 'hospitality-hotel-software': 'Hotel',
  'automotive-software': 'Car', 'finance-accounting-automation': 'Landmark', 'custom-software-business-automation': 'CodeXml',
};
