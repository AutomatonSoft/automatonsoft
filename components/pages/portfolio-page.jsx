import { getDictionary, href } from '@/lib/i18n';
import CtaBand from '@/components/sections/cta-band';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import CaseStudies from '@/components/portfolio/case-studies';
import PortfolioGrid from '@/components/portfolio/portfolio-grid';

export default function PortfolioPage({ locale }) {
  const { portfolio: t, home } = getDictionary(locale);
  return (
    <>
      <LocalizedPageHero locale={locale} page="portfolio" title={t.title} intro={t.intro} />
      <Section>
        <CaseStudies locale={locale} content={home.caseStudies} />
      </Section>
      <Section tone="pale" id="solutions">
        <SectionHead eyebrow={t.catalogEyebrow} title={t.catalogTitle} text={t.catalogText} />
        <PortfolioGrid locale={locale} labels={{ all: t.all, loading: t.loading, empty: t.empty, preparing: t.preparing, categories: t.categories }} />
      </Section>
      <Section>
        <CtaBand title={t.ctaTitle} text={t.ctaText} actions={[{ href: href(locale, 'contact'), label: t.ctaButton }]} />
      </Section>
    </>
  );
}
