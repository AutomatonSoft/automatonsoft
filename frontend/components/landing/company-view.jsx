import { ArrowUpRight, MapPin } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { categoryIcons } from '@/lib/portfolio';
import { addressLines } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import { PageHead, SitePage } from '@/components/landing/shell';
import { block, button, hover, InfoCard, Section, StepCards, Title, tone } from '@/components/landing/blocks';
import { Icon } from '@/components/sections/icons';

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLines.join(', '))}`;
const valueTones = ['wave', 'deep', 'deep', 'deep', 'deep', 'foam'];

// /unternehmen in design E: who we are, principles, products, process and where to find us.
export default function CompanyView({ locale }) {
  const { pages, home, contact, nav } = getDictionary(locale);
  const t = pages.company;
  const other = locale === 'de' ? 'en' : 'de';
  const portfolioHref = href(locale, 'portfolio');

  return (
    <SitePage locale={locale} languageHref={href(other, 'company')}>
      <PageHead tags={[{ label: nav.company }]} title={t.title} lead={t.intro}
        actions={(
          <>
            <a href={href(locale, 'contact')} className={cn(button, 'bg-primary text-primary-foreground')}>{t.primaryCta}</a>
            <a href={portfolioHref} className={cn(button, 'bg-foam text-ink')}>{t.secondaryCta}</a>
          </>
        )} />

      <Section>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className={cn(block, 'bg-card p-6 sm:p-10')}>
            <Title parts={t.story.title} className="text-[clamp(2rem,3.6vw,3.25rem)]" />
            {t.story.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)} className="mt-5 text-muted-foreground">{paragraph}</p>)}
          </div>
          <div className={cn(block, tone.foam.card, 'p-6 sm:p-10')}>
            <p className="text-xs font-bold tracking-[0.1em] uppercase sm:tracking-[0.14em]">{t.story.factsTitle}</p>
            <dl className="mt-5 grid grid-cols-1 gap-3">
              {t.story.facts.map(({ label, value }) => (
                <div key={label} className="rounded-[1.25rem] bg-white/60 p-4">
                  <dt className="text-xs font-bold tracking-[0.1em] uppercase opacity-70 sm:tracking-[0.14em]">{label}</dt>
                  <dd className="mt-1 text-lg font-extrabold break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <Title parts={t.values.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{t.values.text}</p>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.values.items.map((item, index) => {
            const scheme = tone[valueTones[index % valueTones.length]];
            return (
              <li key={item.title} className={cn(block, 'flex flex-col gap-6 p-6 sm:p-8', scheme.card)}>
                <span className={cn('grid size-12 place-items-center rounded-full', scheme.tag)}><Icon name={item.icon} className="size-6" /></span>
                <span>
                  <span className="block text-[1.375rem] leading-tight font-extrabold tracking-[-0.02em]">{item.title}</span>
                  <span className={cn('mt-1.5 block text-[15px]', scheme.muted)}>{item.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <Title parts={t.products.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{t.products.text}</p>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.products.items.map((product) => (
            <li key={product.name}>
              <a href={`${portfolioHref}#${product.category}`} className={cn(block, 'flex h-full flex-col gap-5 bg-card p-6', hover)}>
                <span className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-secondary text-lilac"><Icon name={categoryIcons[product.category]} className="size-5" /></span>
                  <ArrowUpRight aria-hidden="true" className="size-5 text-muted-foreground" />
                </span>
                <span>
                  <span className="block text-lg leading-snug font-extrabold">{product.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{product.tag}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8"><a href={portfolioHref} className={cn(button, 'bg-card text-foreground')}>{t.secondaryCta} →</a></p>
      </Section>

      <Section>
        <Title parts={home.process.title} />
        <p className="mt-6 max-w-[560px] text-muted-foreground">{home.process.text}</p>
        <StepCards steps={home.process.steps} />
      </Section>

      <Section>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className={cn(block, 'bg-card p-6 sm:p-10')}>
            <Title parts={t.location.title} className="text-[clamp(2rem,3.6vw,3.25rem)]" />
            <p className="mt-5 text-muted-foreground">{t.location.text}</p>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={cn(button, 'mt-8 gap-2 bg-foam text-ink')}><MapPin aria-hidden="true" className="size-5" />{t.location.directions}</a>
          </div>
          <InfoCard t={contact} />
        </div>
      </Section>

      <CtaBand title={t.ctaTitle} text={t.ctaText} cta={t.ctaButton} href={href(locale, 'contact')} />
    </SitePage>
  );
}
