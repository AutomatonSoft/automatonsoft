import { getDictionary, href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';
import CardGrid from '@/components/sections/card-grid';
import CtaBand from '@/components/sections/cta-band';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import ProcessSteps from '@/components/home/process-steps';
import EngagementModels from '@/components/home/engagement-models';
import DetailBlock from '@/components/sections/detail-block';
import TechStack from '@/components/services/tech-stack';

export default function ServicesPage({ locale }) {
  const { pages, services, home } = getDictionary(locale);
  const t = pages.services;
  const portfolioHref = href(locale, 'portfolio');
  const overview = services.items.map(({ id, icon, title, text }) => ({ icon, title, text, href: `#${id}` }));
  return (
    <>
      <LocalizedPageHero locale={locale} page="services" actions={(
        <>
          <ButtonLink href={href(locale, 'contact')} arrow>{t.primaryCta}</ButtonLink>
          <ButtonLink href={portfolioHref} variant="outline">{t.secondaryCta}</ButtonLink>
        </>
      )} />
      <Section>
        <SectionHead eyebrow={t.overviewEyebrow} title={t.overviewTitle} text={t.overviewText} center />
        <CardGrid items={overview} />
      </Section>
      <Section tone="pale">
        <div className="service-details">
          {services.items.map((service, index) => (
            <DetailBlock key={service.id} id={service.id} index={index} icon={service.icon} title={service.title}
              listLabel={t.deliverablesLabel} list={[...service.points, ...service.more]}
              reference={service.reference && { label: t.referenceLabel, name: service.reference.name, href: `${portfolioHref}#${service.reference.category}`, linkLabel: t.referenceLink }}>
              <p className="service-lead">{service.text}</p>
              <p>{service.details}</p>
            </DetailBlock>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow={t.tech.eyebrow} title={t.tech.title} text={t.tech.text} center />
        <TechStack groups={t.tech.groups} />
      </Section>
      <Section tone="navy">
        <SectionHead eyebrow={home.process.eyebrow} title={home.process.title} text={home.process.text} center />
        <ProcessSteps steps={home.process.steps} />
      </Section>
      <Section>
        <SectionHead eyebrow={home.engagement.eyebrow} title={home.engagement.title} text={home.engagement.text} center />
        <EngagementModels locale={locale} models={home.engagement.models} bestForLabel={home.engagement.bestFor} />
      </Section>
      <Section tone="pale">
        <CtaBand title={t.ctaTitle} text={t.ctaText} actions={[{ href: href(locale, 'contact'), label: t.primaryCta }]} />
      </Section>
    </>
  );
}
