import { ArrowRight, Check, Database, Link2, MessageCircle, Mic, Phone, Plus, RefreshCw, ShoppingCart } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { landingHref, landings } from '@/lib/landings';
import { addressLines, siteConfig } from '@/lib/site-config';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import LandingContactForm from '@/components/landing/landing-contact-form';

// Design B: brand navy with turquoise glow (tokens: .dark in app/globals.css).
const logo = '/assets/img/logo-icon-96.webp';
const stepIcons = { database: Database, link: Link2, sync: RefreshCw, voice: Mic };
const shell = 'mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-10';
const section = `${shell} pt-24 sm:pt-32`;
const h2 = 'font-heading text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance';
const card = 'reveal rounded-[1.25rem] border border-border bg-card shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-200 hover:border-primary/35';
const glow = (size) => `pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(53,208,198,0.28)_0%,rgba(53,208,198,0.07)_45%,transparent_72%)] ${size}`;
const primaryButton = 'h-auto min-h-12 shrink py-3 whitespace-normal shadow-[0_8px_32px_rgba(53,208,198,0.28)] hover:bg-primary hover:brightness-110';

function SectionHead({ title, center = true }) {
  return <div className={center ? 'mx-auto max-w-[720px] text-center' : ''}><h2 className={cn(h2, 'reveal')}>{title}</h2></div>;
}

export default function LandingPage({ locale, id }) {
  const landing = landings[id];
  const t = landing.content[locale];
  const dictionary = getDictionary(locale);
  const otherLocale = locale === 'de' ? 'en' : 'de';
  const channels = landing.channels.map((item) => ({ ...item, kind: t.hub.kinds[item.kind] }));
  const { deliveredLabel, items: cases } = dictionary.home.caseStudies;
  const lisaCase = { deliveredLabel, delivered: cases.find((item) => item.id === 'lisa').delivered.slice(0, 4) };

  return (
    <div className="overflow-x-clip bg-background pb-20 font-sans text-[16px] leading-relaxed text-foreground antialiased md:pb-0">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">{t.nav.skip}</a>

      <header className="sticky top-0 z-30 px-4 pt-3.5 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 rounded-2xl border border-border bg-card/80 py-2.5 pr-2.5 pl-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
          <a href={href(locale, 'home')} className="flex items-center gap-2.5 font-heading text-base font-semibold">
            <img src={logo} alt="" width="30" height="30" className="size-7.5 rounded-lg" />
            {siteConfig.shortName}
          </a>
          <nav aria-label={t.name} className="hidden items-center gap-6.5 text-sm text-muted-foreground md:flex">
            <a href="#loesung" className="hover:text-foreground">{t.nav.solution}</a>
            <a href="#referenzen" className="hover:text-foreground">{t.nav.references}</a>
            <a href="#faq" className="hover:text-foreground">{t.nav.faq}</a>
            <a href={landingHref(otherLocale, id)} hrefLang={otherLocale} lang={otherLocale} className="hover:text-foreground">{t.nav.language}</a>
          </nav>
          <a href="#anfrage" className={cn(buttonVariants(), 'h-10 rounded-[10px] px-4 font-semibold hover:bg-primary hover:brightness-110')}>{t.nav.cta}</a>
        </div>
      </header>

      <main id="inhalt">
        <section className="relative px-4 pt-14 text-center sm:px-6 sm:pt-24">
          <div aria-hidden="true" className={glow('-top-30 h-[720px] w-[min(1100px,140vw)]')} />
          <div className="relative mx-auto max-w-[940px]">
            <a href={href(locale, 'industries')} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[13px] text-secondary-foreground hover:border-primary/40">
              <ShoppingCart aria-hidden="true" className="size-3.5 text-primary" strokeWidth={2} />{t.hero.eyebrow}
            </a>
            <h1 className="mt-7 font-heading text-[clamp(2.5rem,6.2vw,4.75rem)] leading-[1.12] font-semibold tracking-[-0.04em] text-balance">
              {t.hero.titleStart}<br /><span className="rounded-[0.32em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] sm:my-[0.06em] sm:inline-block bg-[linear-gradient(120deg,#35d0c6_0%,#7fe9e2_55%,#35d0c6_100%)] px-[0.22em] pb-[0.06em] leading-[1.05] text-primary-foreground sm:whitespace-nowrap">{t.hero.titleHighlight}</span><br />{t.hero.titleEnd}
            </h1>
            <p className="mx-auto mt-7 max-w-[660px] text-[clamp(1.0625rem,1.6vw,1.25rem)] text-muted-foreground">{t.hero.lead}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#anfrage" className={cn(buttonVariants({ size: 'xl' }), primaryButton)}>{t.hero.primary}<ArrowRight aria-hidden="true" /></a>
              <a href="#referenzen" className={cn(buttonVariants({ size: 'xl', variant: 'outline' }), 'border-primary/25 bg-transparent hover:bg-primary/8 dark:bg-transparent dark:hover:bg-primary/8')}>{t.hero.secondary}</a>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {t.hero.proof.map((item) => <li key={item} className="flex items-center gap-2"><Check aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={2.4} />{item}</li>)}
            </ul>
          </div>

          {/* Hero visual: a real product screenshot (Lisa for JV Möbel) framed as an app window, with the synced channels beside it. */}
          {/* Turquoise stage: the CTA band's gradient and ring, so the top of the page carries the same contrast. */}
          <div className="relative mx-auto mt-16 max-w-[1080px] rounded-[1.75rem] bg-[linear-gradient(120deg,#35d0c6_0%,#7fe9e2_55%,#35d0c6_100%)] p-2.5 text-left sm:mt-20 sm:p-8 lg:p-12">
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem]"><div className="absolute -top-24 -right-16 size-72 rounded-full border-[40px] border-white/20" /></div>
            <figure className="relative overflow-hidden rounded-[1.25rem] border border-[#04222b]/20 bg-card shadow-[0_30px_80px_rgba(4,34,43,0.4)]">
              <div aria-hidden="true" className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
                <span className="ml-3 truncate text-xs text-muted-foreground">Lisa Console · {t.references.lisa.tags[1]}</span>
              </div>
              <img src={landing.lisaImage.src} width={landing.lisaImage.width} height={landing.lisaImage.height} alt={t.references.lisa.alt} srcSet={`${landing.lisaImage.small} 960w, ${landing.lisaImage.src} 2000w`} sizes="(min-width: 1040px) 1000px, 100vw" className="block w-full" />
            </figure>
            <div aria-hidden="true" className="absolute top-16 -left-14 hidden w-60 rounded-2xl border border-border bg-card/95 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur lg:block">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="" width="28" height="28" className="size-7 rounded-lg" />
                <div className="text-sm leading-tight font-semibold">{t.hub.title}</div>
              </div>
              <ul className="mt-3 grid gap-1.5">
                {channels.slice(0, 4).map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3 rounded-lg bg-background/60 px-2.5 py-1.5 text-[13px]">
                    <span>{item.name}</span><span className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" />{t.references.suite.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden="true" className="absolute -right-12 bottom-14 hidden items-center gap-3 rounded-2xl border border-primary/30 bg-card/95 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur lg:flex">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Mic className="size-4" strokeWidth={2.2} /></span>
              <div>
                <div className="text-sm font-semibold">{t.references.lisa.tags[0]} · 24/7</div>
                <div className="text-xs text-muted-foreground">{t.references.lisa.tags[1]}</div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="integrationen" className="mt-20 border-y border-border bg-card/40 sm:mt-28">
          <div className={`${shell} flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-7`}>
            <h2 id="integrationen" className="text-[13px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">{t.integrations.title}</h2>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 font-heading text-lg font-semibold text-secondary-foreground/90">
              {landing.integrations.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        </section>

        <section className={section}>
          <SectionHead title={t.problem.title} />
          <div className="mt-14 grid gap-3.5 md:grid-cols-3">
            {t.problem.items.map((item, index) => (
              <div key={item.title} className={`${card} p-7`}>
                <div className="font-heading text-[44px] leading-none font-semibold text-primary/90">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="mt-5 font-heading text-[21px] leading-tight font-semibold">{item.title}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[640px] text-center text-sm text-muted-foreground">{t.problem.note}</p>
        </section>

        <section id="loesung" className="mt-24 scroll-mt-24 border-y border-border bg-[#0a1a24] py-24 sm:mt-32 sm:py-28">
          <div className={shell}>
          <SectionHead title={t.solution.title} />
          <p className="mx-auto mt-4 max-w-[640px] text-center text-muted-foreground">{t.solution.text}</p>
          <ol className="mt-14 grid gap-3.5 md:grid-cols-2">
            {t.solution.steps.map((step) => {
              const Icon = stepIcons[step.icon];
              return (
                <li key={step.title} className={`${card} flex gap-5 p-7`}>
                  <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-primary/12 text-primary"><Icon aria-hidden="true" className="size-[22px]" strokeWidth={1.8} /></span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-[15px] text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          </div>
        </section>

        <section className={section}>
          <SectionHead title={t.compare.title} />
          <p className="mx-auto mt-4 max-w-[640px] text-center text-muted-foreground">{t.compare.text}</p>
          {/* A real table for screen readers and search engines; below md each row becomes a labelled card. */}
          <table className="reveal mt-12 w-full border-separate border-spacing-0 overflow-hidden rounded-[1.25rem] border border-border text-left text-[15px] max-md:block max-md:border-0">
            <thead className="max-md:sr-only">
              <tr>
                {t.compare.columns.map((column, index) => (
                  <th key={column || 'criteria'} scope="col" className={cn('bg-card px-6 py-4 font-heading text-base font-semibold', index === 2 && 'bg-primary/12 text-primary')}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="max-md:grid max-md:gap-3">
              {t.compare.rows.map(([criteria, standard, custom]) => (
                <tr key={criteria} className="max-md:grid max-md:rounded-2xl max-md:border max-md:border-border max-md:bg-card max-md:p-4">
                  <th scope="row" className="border-t border-border px-6 py-4 font-semibold max-md:border-0 max-md:p-0">{criteria}</th>
                  <td data-label={t.compare.columns[1]} className="border-t border-border px-6 py-4 text-muted-foreground max-md:border-0 max-md:p-0 max-md:pt-2 max-md:before:block max-md:before:text-xs max-md:before:content-[attr(data-label)]">{standard}</td>
                  <td data-label={t.compare.columns[2]} className="border-t border-border bg-primary/6 px-6 py-4 text-secondary-foreground max-md:mt-2 max-md:rounded-lg max-md:border-0 max-md:px-3 max-md:py-2 max-md:before:block max-md:before:text-xs max-md:before:text-primary max-md:before:content-[attr(data-label)]">
                    <span className="inline-flex gap-2"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary max-md:hidden" strokeWidth={2.4} />{custom}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="referenzen" className={`${section} scroll-mt-24`}>
          <SectionHead title={t.references.title} />
          <div className="mt-14 grid gap-5">
            <article className={`${card} flex flex-wrap items-center overflow-hidden rounded-3xl`}>
              <div className="flex-[1_1_360px] p-7 sm:p-12">
                <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">{t.references.lisa.tags[0]}</span>
                <h3 className="mt-5 font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.02em]">{t.references.lisa.title}</h3>
                <p className="mt-3 text-muted-foreground">{t.references.lisa.text}</p>
                <p className="mt-4 text-sm text-secondary-foreground">{t.references.lisa.tags[1]}</p>
              </div>
              {/* The screenshot is already the hero visual; here the shipped scope from the case study. */}
              <div className="flex-[1.2_1_420px] self-stretch bg-[radial-gradient(80%_80%_at_70%_30%,rgba(53,208,198,0.16)_0%,transparent_70%)] p-7 sm:p-12">
                <p className="text-[13px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">{lisaCase.deliveredLabel}</p>
                <ul className="mt-4 grid gap-2.5">
                  {lisaCase.delivered.map((item) => (
                    <li key={item} className="flex gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-[15px]"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.4} />{item}</li>
                  ))}
                </ul>
              </div>
            </article>
            <article className={`${card} rounded-3xl p-7 sm:p-12`}>
              <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">{t.references.suite.tags[0]}</span>
              <h3 className="mt-5 font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.02em]">{t.references.suite.title}</h3>
              <p className="mt-3 max-w-[720px] text-muted-foreground">{t.references.suite.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label={t.references.suite.tags[1]}>
                {landing.suiteChannels.map((name) => (
                  <li key={name} className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3.5 py-2 text-sm font-medium">
                    <span aria-hidden="true" className="size-1.75 rounded-full bg-primary" />{name}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-8 text-center">
            <a href={href(locale, 'portfolio')} className="inline-flex items-center gap-2 font-semibold text-primary hover:text-foreground">{t.allProjects}<ArrowRight aria-hidden="true" className="size-4" /></a>
          </p>
        </section>

        <section className={`${shell} pt-24 sm:pt-32`}>
          <CtaBand title={t.band.title} text={t.band.text} cta={t.band.cta} href="#anfrage" />
        </section>

        <section className={section}>
          <SectionHead title={t.models.title} />
          <div className="mt-14 grid gap-3.5 md:grid-cols-3">
            {t.models.items.map((model, index) => (
              <div key={model.title} className={cn(card, 'p-7', index === 1 && 'border-primary/45 bg-[radial-gradient(100%_80%_at_50%_0%,rgba(53,208,198,0.16)_0%,transparent_70%)] bg-card')}>
                <h3 className="font-heading text-[21px] font-semibold">{model.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.models.bestFor} {model.bestFor}</p>
                <ul className="mt-5 grid gap-2.5 text-[15px] text-secondary-foreground">
                  {model.points.map((point) => <li key={point} className="flex gap-2.5"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.4} />{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className={`mx-auto w-full max-w-[820px] px-4 pt-24 scroll-mt-24 sm:px-6 sm:pt-32`}>
          <SectionHead title={t.faq.title} />
          {/* Native details keep every answer in the static HTML for search engines and work without JavaScript. */}
          <div className="mt-12 grid gap-2.5">
            {t.faq.items.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-border bg-card px-5.5 transition-colors open:border-primary/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus aria-hidden="true" className="size-[18px] shrink-0 text-primary transition-transform group-open:rotate-45" strokeWidth={2.2} />
                </summary>
                <p className="pb-5.5 text-[15px] text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.faq.text} <a href={siteConfig.phone.href} className="text-secondary-foreground underline underline-offset-4 hover:text-foreground">{siteConfig.phone.display}</a> · <a href={`mailto:${siteConfig.email}`} className="text-secondary-foreground underline underline-offset-4 hover:text-foreground">{siteConfig.email}</a>
          </p>
        </section>

        <section id="anfrage" className={`relative ${shell} scroll-mt-24 py-24 sm:py-32`}>
          <div aria-hidden="true" className={glow('top-1/2 h-[600px] w-[min(1000px,130vw)] -translate-y-1/2 opacity-70')} />
          <div className="relative flex flex-wrap gap-12 rounded-[1.75rem] border border-primary/20 bg-card/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-12">
            <div className="flex-[1_1_300px]">
              <h2 className="font-heading text-[clamp(1.875rem,3.8vw,2.875rem)] leading-[1.05] font-semibold tracking-[-0.035em]">{t.contact.title}</h2>
              <p className="mt-3.5 text-muted-foreground">{t.contact.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-[13px] text-secondary-foreground">
                {t.contact.points.map((point) => <li key={point} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1"><Check aria-hidden="true" className="size-3.5 shrink-0 text-primary" strokeWidth={2.6} />{point}</li>)}
              </ul>
              <h3 className="mt-9 text-[13px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">{t.contact.nextTitle}</h3>
              <ol className="mt-4 grid gap-4">
                {t.contact.next.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/50 font-heading text-sm font-semibold text-primary">{index + 1}</span>
                    <div><div className="font-semibold">{step.title}</div><p className="mt-0.5 text-sm text-muted-foreground">{step.text}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 grid gap-1.5 text-[15px]">
                <a href={siteConfig.phone.href} className="hover:text-primary">{siteConfig.phone.display}</a>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">{siteConfig.email}</a>
              </div>
            </div>
            <div className="flex-[1.3_1_380px]">
              <LandingContactForm locale={locale} t={dictionary.contact} messageLabel={t.contact.message} privacyHref={href(locale, 'privacy')} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className={`${shell} flex flex-wrap justify-between gap-6 py-10 text-sm text-muted-foreground`}>
          <div>
            <div className="font-heading text-base font-semibold text-foreground">{siteConfig.shortName}</div>
            <div className="mt-1.5">{[siteConfig.name, ...addressLines].join(' · ')}</div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-start gap-6">
            <a href={href(locale, 'home')} className="hover:text-foreground">{dictionary.common.home}</a>
            <a href={href(locale, 'imprint')} className="hover:text-foreground">{dictionary.footer.imprint}</a>
            <a href={href(locale, 'privacy')} className="hover:text-foreground">{dictionary.footer.privacy}</a>
          </nav>
        </div>
      </footer>

      {/* Phones: the three ways to reach us stay one tap away. Pure CSS, no script. */}
      <nav aria-label={t.mobile.request} className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden">
        <a href={siteConfig.phone.href} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold hover:bg-primary/10"><Phone aria-hidden="true" className="size-4 text-primary" />{t.mobile.call}</a>
        <a href={siteConfig.whatsapp.href} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold hover:bg-primary/10"><MessageCircle aria-hidden="true" className="size-4 text-primary" />{t.mobile.whatsapp}</a>
        <a href="#anfrage" className="flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">{t.mobile.request}</a>
      </nav>
    </div>
  );
}
