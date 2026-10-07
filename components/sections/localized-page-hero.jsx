import { getDictionary, href } from '@/lib/i18n';
import PageHero from '@/components/sections/page-hero';

export default function LocalizedPageHero({ locale, page, title, intro }) {
  const t = getDictionary(locale);
  const content = t.pages[page];
  return <PageHero homeHref={href(locale, 'home')} homeLabel={t.common.home} crumb={content.eyebrow} title={title || content.title} intro={intro || content.intro} />;
}
