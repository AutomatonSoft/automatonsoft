import { getDictionary, href } from '@/lib/i18n';
import { loadProjectsSnapshot } from '@/lib/portfolio-snapshot';
import CtaBand from '@/components/landing/cta-band';
import PortfolioList from '@/components/landing/portfolio-list';
import { PageHead, SitePage } from '@/components/landing/shell';
import { Section } from '@/components/landing/blocks';

// /portfolio in design E. The list renders from the build-time snapshot and refreshes from the API in the browser.
export default async function PortfolioView({ locale }) {
  const { portfolio: t, nav } = getDictionary(locale);
  const snapshot = await loadProjectsSnapshot();
  const other = locale === 'de' ? 'en' : 'de';
  return (
    <SitePage locale={locale} languageHref={href(other, 'portfolio')}>
      <PageHead tags={[{ label: nav.portfolio }]} title={t.title} lead={t.intro} />
      <Section id="solutions">
        <PortfolioList locale={locale} snapshot={snapshot} labels={{ all: t.all, allDevices: t.allDevices, loading: t.loading, empty: t.empty, preparing: t.preparing, concept: t.concept, own: t.own, available: t.available, platforms: t.platforms, inDevelopment: t.inDevelopment, categories: t.categories }} />
      </Section>
      <CtaBand title={t.ctaTitle} text={t.ctaText} cta={t.ctaButton} href={href(locale, 'contact')} />
    </SitePage>
  );
}
