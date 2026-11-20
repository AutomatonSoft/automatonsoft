import { getDictionary, href, projectHref } from '@/lib/i18n';
import common from '@/lib/landings/common';
import { caseImages, homeExtras } from '@/lib/landings/home';
import { landingHrefFor, landings } from '@/lib/landings';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { block, button, chipRow, ContactSection, FaqSection, hover, num, pill, Section, StepCards, Title, tone, wrap } from '@/components/landing/blocks';
import CtaBand from '@/components/landing/cta-band';
import { FloatingCta, MobileContactBar, SiteFooter, SiteHeader } from '@/components/landing/chrome';

// Home page in design E (docs/TZ.md §6). Shared blocks: blocks.jsx. Copy: dictionaries/*/home.js + lib/landings/home.js.

export default function HomeLanding({ locale }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.home;
  const x = homeExtras(locale);
  const shared = common[locale];
  const otherLocale = locale === 'de' ? 'en' : 'de';
  const cases = Object.fromEntries(t.caseStudies.items.map((item) => [item.id, item]));
  const industries = dictionary.industries.items.map((item) => {
    const landing = landings[item.id];
    const tags = landing ? (landing.integrations || landing.content[locale].hero.panel?.map((entry) => entry.name) || []).slice(0, 3) : [item.reference?.name].filter(Boolean);
    return { ...item, tags, href: landingHrefFor(locale, item.id) || href(locale, 'industries', item.id), hasLanding: Boolean(landing) };
  }).sort((a, b) => Number(b.hasLanding) - Number(a.hasLanding));
  const loud = ['wave', 'foam'];
  const featured = ['hubnity', 'jv-mobel-online-shop']; // the two finished products shown as cards; the rest are quick links

  return (
    <div className="overflow-x-clip bg-background pb-24 font-sans text-[17px] leading-normal text-foreground antialiased">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">{dictionary.nav.skip}</a>
      <SiteHeader locale={locale} label={dictionary.nav.label} cta={{ href: '#kontakt', label: shared.nav.cta }}
        language={{ href: href(otherLocale, 'home'), label: shared.nav.language, locale: otherLocale }}
        links={[
          { href: '#leistungen', label: dictionary.nav.services },
          { href: '#branchen', label: dictionary.nav.industries },
          { href: '#projekte', label: dictionary.nav.portfolio },
          { href: href(locale, 'company'), label: dictionary.nav.company },
        ]} />

      <main id="inhalt">
        <section className={`${wrap} pt-10`}>
          <ul className="flex flex-wrap gap-2">
            {x.tags.map((tag, index) => (
              <li key={tag} className={cn('flex items-center gap-2 rounded-[1.1rem] px-3.5 py-1.5 text-sm leading-snug font-bold', index ? 'bg-card' : 'border-[1.5px] border-lilac text-lilac')}>
                {!index && <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-hot motion-reduce:animate-none" />}{tag}
              </li>
            ))}
          </ul>
          <h1 className="mt-7 text-[clamp(2.5rem,min(6vw,11vh),5rem)] leading-[0.92] font-black tracking-[-0.04em] text-balance">
            {t.titleStart} <span className="block text-lilac">{t.titleHighlight}</span>
          </h1>
        </section>

        <section className={`${wrap} mt-12 flex flex-wrap gap-4`}>
          <div className={`${block} @container order-2 flex flex-[1_1_360px] flex-col justify-between min-[960px]:order-1 gap-8 bg-card p-8 sm:p-10`}>
            <p className="text-[clamp(1.0625rem,6cqw,1.875rem)] leading-snug font-semibold tracking-[-0.02em]">{t.lead}</p>
            <div className="grid gap-2.5">
              <a href="#kontakt" className={`${button} bg-primary text-primary-foreground`}>{t.primaryCta}</a>
              <a href="#projekte" className={`${button} bg-foam text-ink`}>{t.secondaryCta}</a>
            </div>
          </div>
          <figure className={`${block} order-1 relative flex flex-[1.6_1_520px] min-[960px]:order-2 flex-col overflow-hidden bg-primary px-5 pt-6 text-primary-foreground sm:px-9 sm:pt-9`}>
            <div aria-hidden="true" className="absolute -top-24 -right-24 size-75 rounded-full border-[50px] border-white/22" />
            <figcaption className="relative flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pb-6 text-lg font-extrabold">
              {x.stageLabel}<span className="flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-sm whitespace-nowrap text-white"><span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-hot motion-reduce:animate-none" />{x.stageBadge}</span>
            </figcaption>
            <img src={caseImages.lisa.src} width={caseImages.lisa.width} height={caseImages.lisa.height} alt={cases.lisa?.image?.alt || x.stageLabel}
              srcSet={`${caseImages.lisa.small} 960w, ${caseImages.lisa.src} 2000w`} sizes="(min-width: 1024px) 800px, 100vw"
              className="relative mt-auto aspect-[2/1] w-full rounded-t-[22px] object-cover object-top-right" />
          </figure>
        </section>

        <section aria-label={t.trust.label} className="mt-18 overflow-hidden border-y border-secondary py-5">
          <div className="marquee text-[clamp(1.75rem,3vw,2.75rem)] font-black tracking-[-0.03em] whitespace-nowrap">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex">
                {t.ticker.map((item, index) => <li key={item} className={cn('px-7', index % 2 && 'text-lilac')}>{item} <span aria-hidden="true" className="text-hot">✦</span></li>)}
              </ul>
            ))}
          </div>
        </section>

        <section className={`${wrap} mt-18`}>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {x.stats.map((stat, index) => (
              <li key={stat.label} className={cn(block, '@container flex min-h-52 flex-col justify-between p-8', tone[['wave', 'foam', 'deep', 'deep'][index]].card)}>
                <span className="text-[clamp(2.5rem,28cqw,6rem)] leading-[0.9] font-black tracking-[-0.06em] whitespace-nowrap">{stat.value}</span>
                <span className="mt-4 text-lg font-bold">{stat.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <Section id="leistungen">
          <Title parts={x.titles.services} />
          <p className="mt-6 max-w-[560px] text-muted-foreground">{t.services.text}</p>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dictionary.services.items.map((service, index) => (
              <li key={service.id}>
                <a href={href(locale, 'services', service.id)} className={`${block} group flex h-full flex-col gap-6 bg-card p-8 ${hover}`}>
                  <span className="text-5xl leading-none font-black tracking-[-0.05em] text-lilac">{num(index)}</span>
                  <span className="text-2xl font-black tracking-[-0.03em] break-words hyphens-auto">{service.title}</span>
                  <span className="text-muted-foreground">{service.text}</span>
                  <span className="mt-auto text-[15px] font-extrabold group-hover:text-lilac">{x.more} →</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="branchen">
          <Title parts={x.titles.industries} />
          <p className="mt-6 max-w-[560px] text-muted-foreground">{t.industries.text}</p>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((item, index) => {
              const scheme = tone[item.hasLanding ? loud[index % 2] : 'deep'];
              return (
                <li key={item.id}>
                  <a href={item.href} className={cn(block, 'flex h-full min-h-75 flex-col justify-between gap-10 p-8', hover, scheme.card)}>
                    <span>
                      <span className="flex flex-wrap gap-1.5">{item.tags.map((tag) => <span key={tag} className={cn(pill, scheme.tag)}>{tag}</span>)}</span>
                      <span className="mt-6 block text-[2rem] leading-none font-black tracking-[-0.035em] break-words hyphens-auto">{item.title}</span>
                      <span className={cn('mt-3 block', scheme.muted)}>{item.summary}</span>
                    </span>
                    <span className={cn('self-start rounded-full px-5 py-3 text-[15px] font-extrabold', scheme.button)}>{item.hasLanding ? x.viewSolution : x.more} →</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="projekte">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <Title parts={x.titles.products} />
            <a href={href(locale, 'portfolio')} className="text-[17px] font-extrabold text-lilac hover:underline max-sm:hidden">{shared.allProjects} →</a>
          </div>
          <p className="mt-6 max-w-[560px] text-muted-foreground">{t.caseStudies.text}</p>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {featured.map((id) => {
              const item = cases[id];
              const image = caseImages[id];
              const scheme = tone.deep;
              return (
                <a key={id} href={projectHref(locale, id)} className={cn(block, 'flex flex-col overflow-hidden px-8 pt-8', hover, scheme.card)}>
                  <span className="flex flex-wrap gap-1.5">
                    <span className={cn(pill, 'bg-primary text-primary-foreground')}>{item.tag}</span>
                  </span>
                  <span className="mt-5 block text-[2.5rem] leading-none font-black tracking-[-0.04em]">{item.brand}</span>
                  <span className={cn('mt-3 mb-7 block max-w-[520px]', scheme.muted)}>{item.text}</span>
                  <img src={image.src} width={image.width} height={image.height} alt={item.image?.alt || item.brand} loading="lazy" decoding="async"
                    srcSet={`${image.small} 960w, ${image.src} ${image.width}w`} sizes="(min-width: 1024px) 620px, 100vw"
                    className="-mx-8 mt-auto aspect-video w-[calc(100%+4rem)] max-w-none object-cover object-top" />
                </a>
              );
            })}
          </div>
          <p className="mt-10 text-sm font-bold text-muted-foreground">{x.moreProjects}</p>
          <ul className={cn(chipRow, 'mt-3')}>
            {x.products.filter((product) => !featured.includes(product.slug)).map((product) => (
              <li key={product.slug}><a href={projectHref(locale, product.slug)} className="block rounded-full bg-card px-3.5 py-2 text-sm font-bold shadow-[0_1px_2px_rgba(10,15,36,0.05)] transition-colors hover:bg-secondary sm:px-4 sm:py-2.5 sm:text-[15px]">{product.name}</a></li>
            ))}
          </ul>
          <a href={href(locale, 'portfolio')} className="mt-4 inline-block rounded-full bg-primary px-4 py-2.5 text-[15px] font-extrabold text-primary-foreground transition-opacity hover:opacity-85">{shared.allProjects} →</a>
        </Section>

        <Section>
          <Title parts={x.titles.steps} />
          <StepCards steps={t.process.steps} />
        </Section>

        <FaqSection title={x.titles.faq} text={t.faq.text} items={t.faq.items} />

        <CtaBand title={x.titles.cta.join(' ')} cta={t.primaryCta} href="#kontakt" secondary={{ href: siteConfig.phone.href, label: siteConfig.phone.display }} />

        <ContactSection id="kontakt" locale={locale} contact={{ title: t.cta.title, text: t.cta.text, points: shared.contact.points, next: shared.contact.next, message: dictionary.contact.message }} formT={dictionary.contact} privacyHref={href(locale, 'privacy')} />
      </main>

      <SiteFooter locale={locale} />
      <FloatingCta href="#kontakt" label={shared.nav.cta} />
      <MobileContactBar labels={shared.mobile} requestHref="#kontakt" />
    </div>
  );
}
