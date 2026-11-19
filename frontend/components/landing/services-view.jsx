import { Check } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import { PageHead, SitePage } from '@/components/landing/shell';
import { block, button, hover, ModelCards, num, pill, Section, StepCards, Title, tone } from '@/components/landing/blocks';

const serviceTones = ['wave', 'deep', 'deep', 'foam', 'deep', 'deep'];

// /dienstleistungen in design E: every service as one block, then stack, process and ways of working together.
export default function ServicesView({ locale }) {
  const { pages, services, home, nav } = getDictionary(locale);
  const t = pages.services;
  const other = locale === 'de' ? 'en' : 'de';
  const portfolioHref = href(locale, 'portfolio');

  return (
    <SitePage locale={locale} languageHref={href(other, 'services')}>
      <PageHead tags={[{ label: nav.services }]} title={t.title} lead={t.intro}
        actions={(
          <>
            <a href={href(locale, 'contact')} className={cn(button, 'bg-primary text-primary-foreground')}>{t.primaryCta}</a>
            <a href={portfolioHref} className={cn(button, 'bg-foam text-ink')}>{t.secondaryCta}</a>
          </>
        )} />

      <Section>
        <div className="grid grid-cols-1 gap-4">
          {services.items.map((service, index) => {
            const scheme = tone[serviceTones[index % serviceTones.length]];
            return (
              <article key={service.id} id={service.id} className={cn(block, 'grid scroll-mt-24 grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]', scheme.card)}>
                <div>
                  <span className={cn('block text-6xl leading-[0.85] font-black tracking-[-0.05em]', scheme.accent)}>{num(index)}</span>
                  <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] leading-none font-black tracking-[-0.04em]">{service.title}</h2>
                  <p className="mt-5 text-lg leading-snug font-semibold">{service.text}</p>
                  <p className={cn('mt-3', scheme.muted)}>{service.details}</p>
                </div>
                <div className="grid min-w-0 grid-cols-1 content-start gap-6">
                  <div>
                    <p className={cn('text-xs font-bold tracking-[0.1em] uppercase sm:tracking-[0.14em]', scheme.muted)}>{t.deliverablesLabel}</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2.5">
                      {[...service.points, ...service.more].map((item) => <li key={item} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={2.6} /><span className="min-w-0 break-words">{item}</span></li>)}
                    </ul>
                  </div>
                  {service.reference && (
                    <a href={`${portfolioHref}#${service.reference.category}`} className={cn('rounded-[1.5rem] p-4 sm:p-5', scheme.tag, hover)}>
                      <span className={cn('block text-xs font-bold tracking-[0.1em] uppercase sm:tracking-[0.14em]', scheme.muted)}>{t.referenceLabel}</span>
                      <span className="mt-1 block text-lg leading-snug font-extrabold">{service.reference.name}</span>
                      <span className="mt-3 block text-sm font-extrabold">{t.referenceLink} →</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <Title parts={t.tech.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{t.tech.text}</p>
        <dl className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.tech.groups.map(({ label, items }) => (
            <div key={label} className={cn(block, 'bg-card p-6 sm:p-8')}>
              <dt className="text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase sm:tracking-[0.14em]">{label}</dt>
              <dd className="mt-4"><ul className="flex flex-wrap gap-1.5">{items.map((item) => <li key={item} className={cn(pill, 'bg-secondary')}>{item}</li>)}</ul></dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <Title parts={home.process.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{home.process.text}</p>
        <StepCards steps={home.process.steps} />
      </Section>

      <Section>
        <Title parts={home.engagement.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{home.engagement.text}</p>
        <ModelCards locale={locale} models={home.engagement.models} bestFor={home.engagement.bestFor} />
      </Section>

      <CtaBand title={t.ctaTitle} text={t.ctaText} cta={t.primaryCta} href={href(locale, 'contact')} />
    </SitePage>
  );
}
