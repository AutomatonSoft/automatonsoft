import { getDictionary, href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';
import CtaBand from '@/components/sections/cta-band';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import TrustBar from '@/components/sections/trust-bar';
import ProcessSteps from '@/components/home/process-steps';
import EngagementModels from '@/components/home/engagement-models';
import RoleGrid from '@/components/hire/role-grid';

export default function HirePage({ locale }) {
  const { pages, home } = getDictionary(locale);
  const t = pages.hire;
  const contactHref = href(locale, 'contact');
  return (
    <>
      <LocalizedPageHero locale={locale} page="hire" actions={(
        <>
          <ButtonLink href={contactHref} arrow>{t.primaryCta}</ButtonLink>
          <ButtonLink href="#models" variant="outline">{t.secondaryCta}</ButtonLink>
        </>
      )} />
      <Section id="models">
        <SectionHead eyebrow={home.engagement.eyebrow} title={home.engagement.title} text={home.engagement.text} center />
        <EngagementModels locale={locale} models={home.engagement.models} bestForLabel={home.engagement.bestFor} />
      </Section>
      <Section tone="pale">
        <SectionHead eyebrow={t.roles.eyebrow} title={t.roles.title} text={t.roles.text} center />
        <RoleGrid roles={t.roles.items} />
      </Section>
      <Section tone="navy">
        <SectionHead eyebrow={t.steps.eyebrow} title={t.steps.title} text={t.steps.text} center />
        <ProcessSteps steps={t.steps.items} />
      </Section>
      <Section>
        <SectionHead eyebrow={t.trust.eyebrow} title={t.trust.title} text={t.trust.text} center />
        <TrustBar label={home.trust.label} items={home.trust.items} />
      </Section>
      <Section tone="pale">
        <CtaBand title={t.ctaTitle} text={t.ctaText} actions={[{ href: contactHref, label: t.primaryCta }]} />
      </Section>
    </>
  );
}
