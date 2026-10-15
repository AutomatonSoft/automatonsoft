import { href, locales, pageIds, projectHref } from '@/lib/i18n';
import { isPreparing } from '@/lib/portfolio';
import { loadProjectsSnapshot } from '@/lib/portfolio-snapshot';
import { draftPages, pageAlternates, projectAlternates } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

const absolute = (path) => new URL(path, siteConfig.url).href;
// Static export: every deploy rebuilds the site, so the build time is the content's last modification.
const lastModified = new Date();
const indexedPages = pageIds.filter((page) => !['imprint', 'privacy', ...draftPages].includes(page));

const absoluteAlternates = (alternates) => ({ languages: Object.fromEntries(Object.entries(alternates).map(([lang, path]) => [lang, absolute(path)])) });

export default async function sitemap() {
  const projects = ((await loadProjectsSnapshot())?.projects || []).filter((project) => project.slug && !isPreparing(project));
  return locales.flatMap((locale) => [
    ...indexedPages.map((page) => ({
      url: absolute(href(locale, page)),
      lastModified,
      changeFrequency: page === 'home' ? 'weekly' : 'monthly',
      priority: page === 'home' ? 1 : 0.7,
      alternates: absoluteAlternates(pageAlternates(page)),
    })),
    ...projects.map(({ slug }) => ({
      url: absolute(projectHref(locale, slug)), lastModified, changeFrequency: 'monthly', priority: 0.6, alternates: absoluteAlternates(projectAlternates(slug)),
    })),
  ]);
}
