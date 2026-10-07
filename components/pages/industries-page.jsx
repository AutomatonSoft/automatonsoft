import { getDictionary, href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';
import CardGrid from '@/components/sections/card-grid';
import CtaBand from '@/components/sections/cta-band';
import DetailBlock from '@/components/sections/detail-block';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import CaseStudies from '@/components/portfolio/case-studies';

export default function IndustriesPage({ locale }) {
  const { pages, industries, services, home } = getDictionary(locale);
  const t = pages.industries;
  const portfolioHref = href(locale, 'portfolio');
  const serviceTitles = Object.fromEntries(services.items.map((service) => [service.id, service.title]));
  const overview = industries.items.map(({ id, icon, title, summary }) => ({ icon, title, text: summary, href: `#${id}` }));
  return (
    <>
      <LocalizedPageHero locale={locale} page="industries" actions={(
        <>
          <ButtonLink href={href(locale, 'contact')} arrow>{t.primaryCta}</ButtonLink>
          <ButtonLink href={portfolioHref} variant="outline">{t.secondaryCta}</ButtonLink>
        </>
      )} />
      <Section>
        <SectionHead eyebrow={t.overview.eyebrow} title={t.overview.title} text={t.overview.text} center />
        <CardGrid items={overview} />
      </Section>
      <Section tone="pale">
        <div className="service-details">
          {industries.items.map((industry, index) => (
            <DetailBlock key={industry.id} id={industry.id} index={index} icon={industry.icon} title={industry.title}
              listLabel={home.industries.labels.solutions} list={industry.solutions}
              reference={industry.reference && { label: t.referenceLabel, name: industry.reference.name, text: industry.reference.text, href: `${portfolioHref}#${industry.category}`, linkLabel: t.viewInPortfolio }}>
              <p className="industry-label">{home.industries.labels.challenge}</p>
              <p className="service-lead">{industry.challenge}</p>
              <p className="industry-label">{t.servicesLabel}</p>
              <ul className="service-tags">
                {industry.services.map((id) => <li key={id}><a href={href(locale, 'services', id)}>{serviceTitles[id]}</a></li>)}
              </ul>
            </DetailBlock>
          ))}
        </div>
      </Section>
      <Section>
        <CaseStudies locale={locale} content={home.caseStudies} />
      </Section>
      <Section tone="pale">
        <CtaBand title={t.ctaTitle} text={t.ctaText} actions={[{ href: href(locale, 'contact'), label: t.primaryCta }]} />
      </Section>
    </>
  );
}
