import { href, locales, pageIds } from '@/lib/i18n';
import { draftPages, pageAlternates } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

const absolute = (path) => new URL(path, siteConfig.url).href;
// Static export: every deploy rebuilds the site, so the build time is the content's last modification.
const lastModified = new Date();
const indexedPages = pageIds.filter((page) => !['imprint', 'privacy', ...draftPages].includes(page));

export default function sitemap() {
  return locales.flatMap((locale) => indexedPages.map((page) => ({
    url: absolute(href(locale, page)),
    lastModified,
    changeFrequency: page === 'home' ? 'weekly' : 'monthly',
    priority: page === 'home' ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(Object.entries(pageAlternates(page)).map(([lang, path]) => [lang, absolute(path)])) },
  })));
}
