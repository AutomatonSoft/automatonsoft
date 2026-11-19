import { getDictionary, href } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import { PageHead, SitePage } from '@/components/landing/shell';
import { block, button, ModelCards, pill, Section, StepCards, Title, tone } from '@/components/landing/blocks';
import { Icon } from '@/components/sections/icons';

// /entwickler-engagieren in design E: models of working together, roles, process and why to trust us.
export default function HireView({ locale }) {
  const { pages, home, nav } = getDictionary(locale);
  const t = pages.hire;
  const other = locale === 'de' ? 'en' : 'de';
  const contactHref = href(locale, 'contact');

  return (
    <SitePage locale={locale} languageHref={href(other, 'hire')}>
      <PageHead tags={[{ label: nav.hire }]} title={t.title} lead={t.intro}
        actions={(
          <>
            <a href={contactHref} className={cn(button, 'bg-primary text-primary-foreground')}>{t.primaryCta}</a>
            <a href="#models" className={cn(button, 'bg-foam text-ink')}>{t.secondaryCta}</a>
          </>
        )} />

      <Section id="models">
        <Title parts={home.engagement.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{home.engagement.text}</p>
        <ModelCards locale={locale} models={home.engagement.models} bestFor={home.engagement.bestFor} />
      </Section>

      <Section>
        <Title parts={t.roles.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{t.roles.text}</p>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.roles.items.map((role) => (
            <li key={role.title} className={cn(block, 'flex flex-col gap-5 bg-card p-6')}>
              <span className="grid size-11 place-items-center rounded-full bg-secondary text-lilac"><Icon name={role.icon} className="size-5" /></span>
              <span>
                <span className="block text-lg leading-snug font-extrabold">{role.title}</span>
                <span className="mt-1.5 block text-sm text-muted-foreground">{role.text}</span>
              </span>
              <span className="mt-auto flex flex-wrap gap-1.5">{role.skills.map((skill) => <span key={skill} className={cn(pill, 'bg-secondary')}>{skill}</span>)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Title parts={t.steps.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{t.steps.text}</p>
        <StepCards steps={t.steps.items} />
      </Section>

      <Section>
        <Title parts={t.trust.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{t.trust.text}</p>
        <ul aria-label={home.trust.label} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.trust.items.map(({ icon, title, text }, index) => {
            const scheme = tone[index === 0 ? 'wave' : 'deep'];
            return (
              <li key={title} className={cn(block, 'flex flex-col gap-5 p-6', scheme.card)}>
                <span className={cn('grid size-11 place-items-center rounded-full', scheme.tag)}><Icon name={icon} className="size-5" /></span>
                <span>
                  <span className="block text-lg leading-snug font-extrabold">{title}</span>
                  <span className={cn('mt-1.5 block text-sm', scheme.muted)}>{text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBand title={t.ctaTitle} text={t.ctaText} cta={t.primaryCta} href={contactHref} />
    </SitePage>
  );
}
