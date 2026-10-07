import { getDictionary, href } from '@/lib/i18n';
import { addressLines, siteConfig } from '@/lib/site-config';
import CardGrid from '@/components/sections/card-grid';
import CtaBand from '@/components/sections/cta-band';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';

const companyAddress = [siteConfig.name, ...addressLines].join('\n');

// Generic dictionary-driven page: hero, titled sections with card grids and a closing CTA.
export default function ContentPage({ locale, page }) {
  const t = getDictionary(locale);
  const content = t.pages[page];
  return (
    <>
      <LocalizedPageHero locale={locale} page={page} />
      <Section>
        {content.sections.map((section) => (
          <section className="section-pad" key={section.title}>
            <SectionHead eyebrow={content.eyebrow} title={section.title} text={section.address ? companyAddress : section.text} preserveLines={section.address} />
            <CardGrid items={section.items} />
          </section>
        ))}
        <CtaBand title={t.common.helpTitle} text={t.common.helpText} actions={[{ href: href(locale, 'contact'), label: t.common.helpCta }]} />
      </Section>
    </>
  );
}
