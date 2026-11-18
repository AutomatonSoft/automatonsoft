import { ArrowRight, Check, MessageCircle, Phone, Plus } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { landingHref, landings } from '@/lib/landings';
import { addressLines, siteConfig } from '@/lib/site-config';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import LandingContactForm from '@/components/landing/landing-contact-form';

// Design B, "quiet premium": navy ground, type and hairlines instead of boxes, one turquoise moment (CtaBand).
// Tokens: .dark in app/globals.css. Rules: docs/TZ.md §6.
const logo = '/assets/img/logo-icon-96.webp';
const shell = 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10';
const sectionSpace = `${shell} pt-32 sm:pt-44`;
const h2 = 'mt-5 max-w-[760px] font-heading text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance';
const h3 = 'font-heading text-xl font-semibold tracking-[-0.01em]';
const hairline = 'border-white/10';
const primaryButton = 'h-auto min-h-12 shrink py-3 whitespace-normal hover:bg-primary hover:brightness-110';
const number = (index) => String(index + 1).padStart(2, '0');

function Kicker({ children }) {
  return <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{children}</p>;
}

function TextLink({ href: target, children }) {
  return (
    <a href={target} className="group inline-flex items-center gap-2 font-semibold hover:text-primary">
      {children}<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function LandingPage({ locale, id }) {
  const landing = landings[id];
  const t = landing.content[locale];
  const dictionary = getDictionary(locale);
  const otherLocale = locale === 'de' ? 'en' : 'de';
  const { deliveredLabel, items: cases } = dictionary.home.caseStudies;
  const lisaDelivered = cases.find((item) => item.id === 'lisa').delivered.slice(0, 4);

  return (
    <div className="overflow-x-clip bg-background pb-20 font-sans text-[16px] leading-relaxed text-foreground antialiased md:pb-0">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">{t.nav.skip}</a>

      <header className={`sticky top-0 z-30 border-b ${hairline} bg-background/80 backdrop-blur-md`}>
        <div className={`${shell} flex h-16 items-center justify-between gap-6`}>
          <a href={href(locale, 'home')} className="flex items-center gap-2.5 font-heading text-[15px] font-semibold">
            <img src={logo} alt="" width="28" height="28" className="size-7 rounded-md" />
            {siteConfig.shortName}
          </a>
          <nav aria-label={t.name} className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#loesung" className="hover:text-foreground">{t.nav.solution}</a>
            <a href="#referenzen" className="hover:text-foreground">{t.nav.references}</a>
            <a href="#faq" className="hover:text-foreground">{t.nav.faq}</a>
            <a href={landingHref(otherLocale, id)} hrefLang={otherLocale} lang={otherLocale} className="hover:text-foreground">{t.nav.language}</a>
          </nav>
          <a href="#anfrage" className={cn(buttonVariants(), 'h-9 rounded-lg px-4 font-semibold hover:bg-primary hover:brightness-110')}>{t.nav.cta}</a>
        </div>
      </header>

      <main id="inhalt">
        {/* Left-aligned type, one accent word, one product image – nothing competing with it. */}
        <section className="pt-14 sm:pt-28">
          <div className={`${shell} grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16`}>
            <div>
              <Kicker>{t.hero.eyebrow}</Kicker>
              <h1 className="mt-6 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-balance">
                {t.hero.titleStart}<br className="max-sm:hidden" /> <span className="text-primary">{t.hero.titleHighlight}</span><br className="max-sm:hidden" /> {t.hero.titleEnd}
              </h1>
              <p className="mt-7 max-w-[520px] text-lg leading-relaxed text-muted-foreground">{t.hero.lead}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href="#anfrage" className={cn(buttonVariants({ size: 'xl' }), primaryButton)}>{t.hero.primary}</a>
                <TextLink href="#referenzen">{t.hero.secondary}</TextLink>
              </div>
            </div>
            <figure>
              <img src={landing.lisaImage.src} width={landing.lisaImage.width} height={landing.lisaImage.height} alt={t.references.lisa.alt} srcSet={`${landing.lisaImage.small} 960w, ${landing.lisaImage.src} 2000w`} sizes="(min-width: 1024px) 1050px, 180vw" className="aspect-[10/11] w-full rounded-2xl border border-white/10 object-cover object-right shadow-[0_40px_100px_rgba(0,0,0,0.45)]" />
              <figcaption className="mt-4 text-sm text-muted-foreground">Lisa · {t.references.lisa.tags[1]}</figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="integrationen" className={`${shell} mt-24 sm:mt-32`}>
          <div className={`flex flex-wrap items-baseline gap-x-12 gap-y-4 border-t ${hairline} pt-8`}>
            <h2 id="integrationen" className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{t.integrations.title}</h2>
            <ul className="flex flex-wrap gap-x-9 gap-y-2 font-heading text-lg font-medium text-foreground/70">
              {landing.integrations.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        </section>

        <section className={sectionSpace}>
          <Kicker>{t.problem.eyebrow}</Kicker>
          <h2 className={h2}>{t.problem.title}</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {t.problem.items.map((item, index) => (
              <div key={item.title} className={`border-t ${hairline} pt-6`}>
                <div className="text-sm font-medium text-primary tabular-nums">{number(index)}</div>
                <h3 className={`mt-5 ${h3}`}>{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-[560px] text-sm text-muted-foreground">{t.problem.note}</p>
        </section>

        <section id="loesung" className={`${sectionSpace} scroll-mt-24`}>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
            <div>
              <Kicker>{t.solution.eyebrow}</Kicker>
              <h2 className={h2}>{t.solution.title}</h2>
              <p className="mt-6 max-w-[440px] text-muted-foreground">{t.solution.text}</p>
            </div>
            <ol className={`border-b ${hairline}`}>
              {t.solution.steps.map((step, index) => (
                <li key={step.title} className={`grid grid-cols-[2.5rem_1fr] gap-x-4 border-t ${hairline} py-7`}>
                  <span className="pt-1 text-sm font-medium text-primary tabular-nums">{number(index)}</span>
                  <div>
                    <h3 className={h3}>{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={sectionSpace}>
          <Kicker>{t.compare.eyebrow}</Kicker>
          <h2 className={h2}>{t.compare.title}</h2>
          <p className="mt-6 max-w-[560px] text-muted-foreground">{t.compare.text}</p>
          {/* A real table for screen readers and search engines; below md each row stacks. */}
          <table className="mt-14 w-full border-collapse text-left max-md:block">
            <thead className="max-md:sr-only">
              <tr className={`border-b ${hairline}`}>
                {t.compare.columns.map((column, index) => (
                  <th key={column || 'criteria'} scope="col" className={cn('pb-4 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase', index === 2 && 'text-primary')}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="max-md:block">
              {t.compare.rows.map(([criteria, standard, custom]) => (
                <tr key={criteria} className={`border-b ${hairline} max-md:block max-md:py-6`}>
                  <th scope="row" className="py-6 pr-6 align-top font-heading text-lg font-semibold max-md:block max-md:p-0">{criteria}</th>
                  <td data-label={t.compare.columns[1]} className="py-6 pr-6 align-top text-muted-foreground max-md:block max-md:p-0 max-md:pt-3 max-md:before:block max-md:before:text-xs max-md:before:tracking-[0.12em] max-md:before:uppercase max-md:before:content-[attr(data-label)]">{standard}</td>
                  <td data-label={t.compare.columns[2]} className="py-6 align-top max-md:block max-md:p-0 max-md:pt-3 max-md:before:block max-md:before:text-xs max-md:before:tracking-[0.12em] max-md:before:text-primary max-md:before:uppercase max-md:before:content-[attr(data-label)]">
                    <span className="inline-flex gap-2.5"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary max-md:hidden" strokeWidth={2.2} />{custom}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="referenzen" className={`${sectionSpace} scroll-mt-24`}>
          <Kicker>{t.references.eyebrow}</Kicker>
          <h2 className={h2}>{t.references.title}</h2>
          <div className={`mt-16 border-b ${hairline}`}>
            <article className={`grid gap-10 border-t ${hairline} py-12 lg:grid-cols-2 lg:gap-20`}>
              <div>
                <p className="text-sm text-primary">{t.references.lisa.tags[0]} · {t.references.lisa.tags[1]}</p>
                <h3 className="mt-4 font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.02em]">{t.references.lisa.title}</h3>
                <p className="mt-4 max-w-[480px] text-muted-foreground">{t.references.lisa.text}</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{deliveredLabel}</p>
                <ul className="mt-5 grid gap-3.5">
                  {lisaDelivered.map((item) => <li key={item} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.2} />{item}</li>)}
                </ul>
              </div>
            </article>
            <article className={`grid gap-10 border-t ${hairline} py-12 lg:grid-cols-2 lg:gap-20`}>
              <div>
                <p className="text-sm text-primary">{t.references.suite.tags.join(' · ')}</p>
                <h3 className="mt-4 font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.02em]">{t.references.suite.title}</h3>
                <p className="mt-4 max-w-[480px] text-muted-foreground">{t.references.suite.text}</p>
              </div>
              <ul className="grid content-start gap-3.5">
                {landing.suiteChannels.map((name) => (
                  <li key={name} className="flex items-center justify-between gap-4 font-heading text-lg font-medium">
                    {name}<span className="flex items-center gap-2 font-sans text-sm text-muted-foreground"><span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />{t.references.suite.status}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-10"><TextLink href={href(locale, 'portfolio')}>{t.allProjects}</TextLink></p>
        </section>

        <section className={sectionSpace}>
          <CtaBand title={t.band.title} text={t.band.text} cta={t.band.cta} href="#anfrage" />
        </section>

        <section className={sectionSpace}>
          <Kicker>{t.models.eyebrow}</Kicker>
          <h2 className={h2}>{t.models.title}</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {t.models.items.map((model) => (
              <div key={model.title} className={`border-t ${hairline} pt-6`}>
                <h3 className={h3}>{model.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.models.bestFor} {model.bestFor}</p>
                <ul className="mt-6 grid gap-3 text-[15px]">
                  {model.points.map((point) => <li key={point} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.2} />{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className={`${sectionSpace} scroll-mt-24`}>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <Kicker>{t.faq.eyebrow}</Kicker>
              <h2 className={h2}>{t.faq.title}</h2>
              <p className="mt-6 max-w-[360px] text-muted-foreground">{t.faq.text}</p>
              <div className="mt-6 grid gap-1.5">
                <a href={siteConfig.phone.href} className="underline decoration-white/25 underline-offset-4 hover:text-primary">{siteConfig.phone.display}</a>
                <a href={`mailto:${siteConfig.email}`} className="underline decoration-white/25 underline-offset-4 hover:text-primary">{siteConfig.email}</a>
              </div>
            </div>
            {/* Native details keep every answer in the static HTML for search engines and work without JavaScript. */}
            <div className={`border-b ${hairline}`}>
              {t.faq.items.map((item) => (
                <details key={item.q} className={`group border-t ${hairline}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus aria-hidden="true" className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45 group-open:text-primary" strokeWidth={1.8} />
                  </summary>
                  <p className="max-w-[640px] pb-7 text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="anfrage" className={`${sectionSpace} scroll-mt-24 pb-32 sm:pb-44`}>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Kicker>{t.nav.cta}</Kicker>
              <h2 className={h2}>{t.contact.title}</h2>
              <p className="mt-6 max-w-[460px] text-muted-foreground">{t.contact.text}</p>
              <p className="mt-4 text-sm text-secondary-foreground">{t.contact.points.join(' · ')}</p>
              <p className="mt-12 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{t.contact.nextTitle}</p>
              <ol className={`mt-5 border-b ${hairline}`}>
                {t.contact.next.map((step, index) => (
                  <li key={step.title} className={`grid grid-cols-[2.5rem_1fr] gap-x-4 border-t ${hairline} py-5`}>
                    <span className="pt-0.5 text-sm font-medium text-primary tabular-nums">{number(index)}</span>
                    <div><div className="font-semibold">{step.title}</div><p className="mt-1 text-sm text-muted-foreground">{step.text}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 grid gap-1.5">
                <a href={siteConfig.phone.href} className="hover:text-primary">{siteConfig.phone.display}</a>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">{siteConfig.email}</a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card p-6 sm:p-10">
              <LandingContactForm locale={locale} t={dictionary.contact} messageLabel={t.contact.message} privacyHref={href(locale, 'privacy')} />
            </div>
          </div>
        </section>
      </main>

      <footer className={`border-t ${hairline}`}>
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
      <nav aria-label={t.mobile.request} className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-card/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden">
        <a href={siteConfig.phone.href} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold hover:bg-primary/10"><Phone aria-hidden="true" className="size-4 text-primary" />{t.mobile.call}</a>
        <a href={siteConfig.whatsapp.href} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold hover:bg-primary/10"><MessageCircle aria-hidden="true" className="size-4 text-primary" />{t.mobile.whatsapp}</a>
        <a href="#anfrage" className="flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">{t.mobile.request}</a>
      </nav>
    </div>
  );
}
