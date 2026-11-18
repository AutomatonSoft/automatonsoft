import { Check } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { landingHref, landings } from '@/lib/landings';
import caseStudies from '@/lib/landings/cases';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { block, button, ContactSection, FaqSection, hover, Lead, NumberCards, pill, Section, Title, tone, wrap } from '@/components/landing/blocks';
import CtaBand from '@/components/landing/cta-band';
import { FloatingCta, MobileContactBar, SiteFooter, SiteHeader } from '@/components/landing/chrome';

// Industry landing in design E, same blocks as the home page (docs/TZ.md §6). Content: lib/landings.
export default function LandingPage({ locale, id }) {
  const landing = landings[id];
  const t = landing.content[locale];
  const dictionary = getDictionary(locale);
  const otherLocale = locale === 'de' ? 'en' : 'de';
  const image = landing.heroImage;
  const references = landing.cases.map((key) => ({ key, ...caseStudies[key][locale] }));
  const tags = (landing.integrations || t.hero.panel?.map((entry) => entry.name) || []).slice(0, 4);

  return (
    <div className="overflow-x-clip bg-background pb-24 font-sans text-[17px] leading-normal text-foreground antialiased">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">{t.nav.skip}</a>

      <SiteHeader locale={locale} label={t.name} cta={{ href: '#anfrage', label: t.nav.cta }}
        language={{ href: landingHref(otherLocale, id), label: t.nav.language, locale: otherLocale }}
        links={[{ href: '#loesung', label: t.nav.solution }, { href: '#referenzen', label: t.nav.references }, { href: '#faq', label: t.nav.faq }]} />

      <main id="inhalt">
        <section className={`${wrap} pt-10`}>
          <ul className="flex flex-wrap gap-2">
            <li className="rounded-full border-[1.5px] border-lilac px-3.5 py-1.5 text-sm font-bold text-lilac">{t.hero.eyebrow}</li>
          </ul>
          <h1 className="mt-7 text-[clamp(2.5rem,min(6vw,11vh),5rem)] leading-[0.92] font-black tracking-[-0.04em] text-balance">
            {t.hero.titleStart} <span className="block text-lilac">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
          </h1>
        </section>

        <section className={`${wrap} mt-12 flex flex-wrap gap-4`}>
          <div className={`${block} @container order-2 flex flex-[1_1_360px] flex-col justify-between min-[960px]:order-1 gap-8 bg-card p-8 sm:p-10`}>
            <p className="text-[clamp(1.25rem,6cqw,1.875rem)] leading-tight font-semibold tracking-[-0.02em]">{t.hero.lead}</p>
            <div className="grid gap-2.5">
              <a href="#anfrage" className={`${button} bg-primary text-primary-foreground`}>{t.hero.primary}</a>
              <a href="#referenzen" className={`${button} bg-foam text-ink`}>{t.hero.secondary}</a>
            </div>
          </div>
          {image ? (
            <figure className={`${block} order-1 relative flex flex-[1.6_1_520px] min-[960px]:order-2 flex-col overflow-hidden bg-primary px-5 pt-6 text-primary-foreground sm:px-9 sm:pt-9`}>
              <div aria-hidden="true" className="absolute -top-24 -right-24 size-75 rounded-full border-[50px] border-white/22" />
              <figcaption className="relative pb-6 text-lg font-extrabold">{t.hero.imageCaption}</figcaption>
              <img src={image.src} width={image.width} height={image.height} alt={t.hero.imageAlt} srcSet={`${image.small} 960w, ${image.src} 2000w`} sizes="(min-width: 1024px) 800px, 100vw"
                className="relative mt-auto aspect-[2/1] w-full rounded-t-[22px] object-cover object-top-right" />
            </figure>
          ) : (
            // No product screenshot yet: the shipped modules carry the hero instead of a stock image.
            <aside className={`${block} order-1 relative flex-[1.6_1_520px] overflow-hidden min-[960px]:order-2 bg-primary p-8 text-primary-foreground sm:p-10`}>
              <div aria-hidden="true" className="absolute -top-24 -right-24 size-75 rounded-full border-[50px] border-white/22" />
              <p className="relative text-lg font-extrabold">{t.hero.panelLabel}</p>
              <p className="relative mt-3 max-w-[520px] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-black tracking-[-0.03em]">{t.hero.panelTitle}</p>
              <ul className="relative mt-8 grid gap-2.5">
                {t.hero.panel.map((item) => (
                  <li key={item.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-[1.25rem] bg-ink/25 px-5 py-4">
                    <span className="text-lg font-extrabold">{item.name}</span>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </section>

        {landing.integrations && (
          <section aria-labelledby="integrationen" className={`${wrap} mt-12`}>
            <h2 id="integrationen" className="sr-only">{t.integrations.title}</h2>
            <p aria-hidden="true" className="mb-3 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{t.integrations.title}</p>
            <ul className="flex flex-wrap gap-2">
              {landing.integrations.map((name) => <li key={name} className={cn(pill, 'bg-card text-sm')}>{name}</li>)}
            </ul>
          </section>
        )}

        <Section>
          <Title parts={t.problem.title} />
          <NumberCards as="ol" items={t.problem.items} tones={['wave', 'foam', 'deep']} />
          <p className="mt-8 max-w-[560px] text-sm text-muted-foreground">{t.problem.note}</p>
        </Section>

        <Section id="loesung">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div>
              <Title parts={t.solution.title} />
              <Lead className="max-w-[440px]">{t.solution.text}</Lead>
            </div>
            <ol className="grid gap-3">
              {t.solution.steps.map((step, index) => (
                <li key={step.title} className={cn(block, 'flex gap-5 bg-card p-6 sm:p-7')}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-lg font-black text-primary-foreground">{index + 1}</span>
                  <span><span className="block text-xl font-extrabold tracking-[-0.02em]">{step.title}</span><span className="mt-1 block text-muted-foreground">{step.text}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section>
          <Title parts={t.compare.title} />
          <Lead>{t.compare.text}</Lead>
          {/* A real table for screen readers and search engines; below md each row becomes a card. */}
          <table className="mt-12 w-full border-separate border-spacing-y-3 text-left max-md:block">
            <thead className="max-md:sr-only">
              <tr>
                {t.compare.columns.map((column, index) => (
                  <th key={column || 'criteria'} scope="col" className={cn('px-6 pb-1 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase', index === 2 && 'text-lilac')}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="max-md:block">
              {t.compare.rows.map(([criteria, standard, custom]) => (
                <tr key={criteria} className="max-md:mb-3 max-md:block max-md:rounded-[1.75rem] max-md:bg-card max-md:p-6">
                  <th scope="row" className="rounded-l-[1.75rem] bg-card px-6 py-6 align-top text-lg font-extrabold max-md:block max-md:bg-transparent max-md:p-0">{criteria}</th>
                  <td data-label={t.compare.columns[1]} className="bg-card px-6 py-6 align-top text-muted-foreground max-md:block max-md:bg-transparent max-md:p-0 max-md:pt-3 max-md:before:block max-md:before:text-xs max-md:before:font-bold max-md:before:tracking-[0.12em] max-md:before:uppercase max-md:before:content-[attr(data-label)]">{standard}</td>
                  <td data-label={t.compare.columns[2]} className="rounded-r-[1.75rem] bg-foam px-6 py-6 align-top font-semibold text-ink max-md:block max-md:rounded-none max-md:bg-transparent max-md:p-0 max-md:pt-3 max-md:before:block max-md:before:text-xs max-md:before:font-bold max-md:before:tracking-[0.12em] max-md:before:text-lilac max-md:before:uppercase max-md:before:content-[attr(data-label)]">
                    <span className="inline-flex gap-2.5"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 max-md:hidden" strokeWidth={2.6} />{custom}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="referenzen">
          <Title parts={t.references.title} />
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {references.map((item, index) => {
              const scheme = tone[index ? 'deep' : 'foam'];
              return (
                <article key={item.key} className={cn(block, 'flex flex-col gap-8 p-8 sm:p-10', scheme.card)}>
                  <div>
                    <span className={cn(pill, 'inline-block', index ? 'bg-primary text-primary-foreground' : scheme.tag)}>{item.meta}</span>
                    <h3 className="mt-5 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{item.title}</h3>
                    <p className={cn('mt-3 max-w-[520px]', scheme.muted)}>{item.text}</p>
                  </div>
                  <div>
                    {item.listLabel && <p className={cn('mb-4 text-xs font-bold tracking-[0.14em] uppercase', scheme.muted)}>{item.listLabel}</p>}
                    <ul className="grid content-start gap-3">
                      {item.list.map((entry) => item.status ? (
                        <li key={entry} className="flex items-center justify-between gap-4 text-lg font-extrabold">
                          {entry}<span className={cn('flex items-center gap-2 text-sm font-medium', scheme.muted)}><span aria-hidden="true" className="size-2 rounded-full bg-hot" />{item.status}</span>
                        </li>
                      ) : (
                        <li key={entry} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={2.6} />{entry}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-8"><a href={href(locale, 'portfolio')} className={`${button} bg-card text-foreground`}>{t.allProjects} →</a></p>
        </Section>

        <CtaBand title={t.band.title} text={t.band.text} cta={t.band.cta} href="#anfrage" secondary={{ href: siteConfig.phone.href, label: siteConfig.phone.display }} />

        <Section>
          <Title parts={t.models.title} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {t.models.items.map((model, index) => {
              const scheme = tone[index === 1 ? 'wave' : 'deep'];
              return (
                <div key={model.title} className={cn(block, 'p-8', scheme.card, hover)}>
                  <h3 className="text-2xl font-black tracking-[-0.03em]">{model.title}</h3>
                  <p className={cn('mt-2 text-sm', scheme.muted)}>{t.models.bestFor} {model.bestFor}</p>
                  <ul className="mt-6 grid gap-3 text-[15px]">
                    {model.points.map((point) => <li key={point} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={2.6} />{point}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        <FaqSection title={t.faq.title} text={t.faq.text} items={t.faq.items} />

        <ContactSection id="anfrage" locale={locale} contact={t.contact} formT={dictionary.contact} privacyHref={href(locale, 'privacy')} />
      </main>

      <SiteFooter locale={locale} />
      <FloatingCta href="#anfrage" label={t.nav.cta} />
      <MobileContactBar labels={t.mobile} requestHref="#anfrage" />
    </div>
  );
}
