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
export const projectRank = (project) => (isPreparing(project) ? 2 : project.stack.includes(CONCEPT_TAG) ? 1 : 0);

// Within a rank the big finished projects come first, in this order; the generic category card goes last, the rest keeps the API order.
const FIRST = ['hubnity', 'jv-mobel-online-shop', 'benim-depom', 'cashbook', 'roader', 'lisa'];
const LAST = ['custom-software-business-automation'];
export const projectOrder = (project) => {
  const index = FIRST.indexOf(project.slug);
  return index >= 0 ? index - FIRST.length : LAST.includes(project.slug) ? 1 : 0;
};
export const compareProjects = (a, b) => projectRank(a) - projectRank(b) || projectOrder(a) - projectOrder(b);

export const categoryIcons = {
  'ecommerce-marketplace-automation': 'ShoppingCart', 'workforce-hr-automation': 'Users', 'ai-business-solutions': 'Sparkles',
  'supply-chain-warehouse': 'Package', 'industrial-ai-manufacturing': 'Factory', 'hospitality-hotel-software': 'Hotel',
  'automotive-software': 'Car', 'finance-accounting-automation': 'Landmark', 'custom-software-business-automation': 'CodeXml',
};
