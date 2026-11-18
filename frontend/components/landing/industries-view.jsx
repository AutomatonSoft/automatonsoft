import { Check } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { landingHrefFor } from '@/lib/landings';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import { PageHead, SitePage } from '@/components/landing/shell';
import { block, button, hover, pill, Section, tone } from '@/components/landing/blocks';

// /branchen in design E: every industry as one block; industries with their own landing page lead there.
export default function IndustriesView({ locale }) {
  const { pages, industries, services, home, nav } = getDictionary(locale);
  const t = pages.industries;
  const labels = home.industries.labels;
  const other = locale === 'de' ? 'en' : 'de';
  const serviceTitles = Object.fromEntries(services.items.map((service) => [service.id, service.title]));
  const portfolioHref = href(locale, 'portfolio');
  const items = industries.items.map((item) => ({ ...item, landing: landingHrefFor(locale, item.id) }))
    .sort((a, b) => Number(Boolean(b.landing)) - Number(Boolean(a.landing)));
  const loud = ['wave', 'foam'];
  let loudIndex = 0;

  return (
    <SitePage locale={locale} languageHref={href(other, 'industries')}>
      <PageHead tags={[{ label: nav.industries }]} title={t.title} lead={t.intro}
        actions={(
          <>
            <a href={href(locale, 'contact')} className={cn(button, 'bg-primary text-primary-foreground')}>{t.primaryCta}</a>
            <a href={portfolioHref} className={cn(button, 'bg-foam text-ink')}>{t.secondaryCta}</a>
          </>
        )} />

      <Section>
        <div className="grid grid-cols-1 gap-4">
          {items.map((industry) => {
            const scheme = tone[industry.landing ? loud[loudIndex++ % 2] : 'deep'];
            return (
              <article key={industry.id} id={industry.id} className={cn(block, 'grid scroll-mt-24 grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]', scheme.card)}>
                <div>
                  <h2 className="text-[clamp(2rem,3.4vw,3rem)] leading-none font-black tracking-[-0.04em]">{industry.title}</h2>
                  <p className={cn('mt-5 text-xs font-bold tracking-[0.14em] uppercase', scheme.muted)}>{labels.challenge}</p>
                  <p className="mt-1.5">{industry.challenge}</p>
                  {industry.landing && <a href={industry.landing} className={cn(button, 'mt-8', scheme.button)}>{home.industries.labels.viewSolution || t.primaryCta} →</a>}
                </div>
                <div className="grid min-w-0 grid-cols-1 content-start gap-6">
                  <div>
                    <p className={cn('text-xs font-bold tracking-[0.14em] uppercase', scheme.muted)}>{labels.solutions}</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2.5">
                      {industry.solutions.map((item) => <li key={item} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={2.6} /><span className="min-w-0 break-words">{item}</span></li>)}
                    </ul>
                  </div>
                  <div>
                    <p className={cn('text-xs font-bold tracking-[0.14em] uppercase', scheme.muted)}>{t.servicesLabel}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {industry.services.map((id) => <li key={id}><a href={href(locale, 'services', id)} className={cn(pill, 'inline-block', scheme.tag, hover)}>{serviceTitles[id]}</a></li>)}
                    </ul>
                  </div>
                  {industry.reference && (
                    <a href={`${portfolioHref}#${industry.category}`} className={cn('rounded-[1.5rem] p-4 sm:p-5', scheme.tag, hover)}>
                      <span className={cn('block text-xs font-bold tracking-[0.14em] uppercase', scheme.muted)}>{t.referenceLabel}</span>
                      <span className="mt-1 block text-lg leading-snug font-extrabold">{industry.reference.name}</span>
                      <span className={cn('mt-1 block text-sm', scheme.muted)}>{industry.reference.text}</span>
                      <span className="mt-3 block text-sm font-extrabold">{t.viewInPortfolio} →</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <CtaBand title={t.ctaTitle} text={t.ctaText} cta={t.primaryCta} href={href(locale, 'contact')} />
    </SitePage>
  );
}
