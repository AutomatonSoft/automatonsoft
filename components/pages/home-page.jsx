import { getDictionary, href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';
import CardGrid from '@/components/sections/card-grid';
import CtaBand from '@/components/sections/cta-band';
import FaqList from '@/components/sections/faq-list';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import TrustBar from '@/components/sections/trust-bar';
import Hero from '@/components/home/hero';
import IndustryExplorer from '@/components/home/industry-explorer';
import ProcessSteps from '@/components/home/process-steps';
import EngagementModels from '@/components/home/engagement-models';
import CaseStudies from '@/components/portfolio/case-studies';

export default function HomePage({ locale }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.home;
  const serviceItems = dictionary.services.items.map((item) => ({ ...item, href: href(locale, 'services', item.id) }));
  const { services, industries, process, engagement, faq } = t;
  return (
    <>
      <Hero t={t} locale={locale} />
      <Section>
        <SectionHead eyebrow={services.eyebrow} title={services.title} text={services.text} center />
        <CardGrid items={serviceItems} linkLabel={services.more} flipHint={services.flipHint} />
        <TrustBar label={t.trust.label} items={t.trust.items} />
        <div className="text-center" style={{ marginTop: 40 }}><ButtonLink href={href(locale, 'services')} variant="outline-dark">{services.cta}</ButtonLink></div>
      </Section>
      <Section tone="pale">
        <div className="section-head-split">
          <SectionHead eyebrow={industries.eyebrow} title={industries.title} text={industries.text} />
          <ButtonLink href={href(locale, 'industries')} variant="outline-dark" arrow>{industries.cta}</ButtonLink>
        </div>
        <IndustryExplorer items={dictionary.industries.items} labels={industries.labels} portfolioHref={href(locale, 'portfolio')} />
      </Section>
      <Section>
        <CaseStudies locale={locale} content={t.caseStudies} />
      </Section>
      <Section tone="navy">
        <SectionHead eyebrow={process.eyebrow} title={process.title} text={process.text} center />
        <ProcessSteps steps={process.steps} />
      </Section>
      <Section>
        <SectionHead eyebrow={engagement.eyebrow} title={engagement.title} text={engagement.text} center />
        <EngagementModels locale={locale} models={engagement.models} bestForLabel={engagement.bestFor} />
      </Section>
      <Section tone="pale">
        <div className="faq-layout">
          <div>
            <SectionHead eyebrow={faq.eyebrow} title={faq.title} text={faq.text} />
            <ButtonLink href={href(locale, 'contact')} arrow>{t.cta.primary}</ButtonLink>
          </div>
          <FaqList items={faq.items} />
        </div>
      </Section>
      <Section>
        <CtaBand title={t.cta.title} text={t.cta.text} actions={[
          { href: href(locale, 'contact'), label: t.cta.primary },
          { href: href(locale, 'services'), label: t.cta.secondary, variant: 'outline' },
        ]} />
      </Section>
    </>
  );
}
