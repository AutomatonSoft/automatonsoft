import { defaultLocale } from '@/lib/i18n';

// Project content in the database is German; other locales read optional overrides from `translations`.
export function localizeProject(project, locale) {
  if (locale === defaultLocale) return project;
  const translation = project.translations?.[locale] || {};
  return { ...project, description: translation.description || project.description, stack: translation.stack?.length ? translation.stack : project.stack };
}

// Status is carried by German base tags; rank orders finished work first, then concepts, then placeholders.
const PREPARING_TAG = 'In Vorbereitung';
const CONCEPT_TAG = 'Konzept';
export const isPreparing = (project) => project.stack.includes(PREPARING_TAG);
export const projectRank = (project) => (isPreparing(project) ? 2 : project.stack.includes(CONCEPT_TAG) ? 1 : 0);

export const categoryIcons = {
  'ecommerce-marketplace-automation': 'ShoppingCart', 'workforce-hr-automation': 'Users', 'ai-business-solutions': 'Sparkles',
  'supply-chain-warehouse': 'Package', 'industrial-ai-manufacturing': 'Factory', 'hospitality-hotel-software': 'Hotel',
  'automotive-software': 'Car', 'finance-accounting-automation': 'Landmark', 'custom-software-business-automation': 'CodeXml',
};
