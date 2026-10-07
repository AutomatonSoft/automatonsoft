import { href, locales, pageIds } from '@/lib/i18n';
import { draftPages, pageAlternates } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

const absolute = (path) => new URL(path, siteConfig.url).href;
const indexedPages = pageIds.filter((page) => !['imprint', 'privacy', ...draftPages].includes(page));

export default function sitemap() {
  return locales.flatMap((locale) => indexedPages.map((page) => ({
    url: absolute(href(locale, page)),
    changeFrequency: page === 'home' ? 'weekly' : 'monthly',
    priority: page === 'home' ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(Object.entries(pageAlternates(page)).map(([lang, path]) => [lang, absolute(path)])) },
  })));
}
