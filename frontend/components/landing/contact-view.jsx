import { getDictionary, href } from '@/lib/i18n';
import common from '@/lib/landings/common';
import { cn } from '@/lib/utils';
import LandingContactForm from '@/components/landing/landing-contact-form';
import { PageHead, SitePage } from '@/components/landing/shell';
import { block, InfoCard, Section } from '@/components/landing/blocks';

// /kontakt in design E: how to reach us, what happens next, and the request form.
export default function ContactView({ locale }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.contact;
  const page = dictionary.pages.contact;
  const shared = common[locale].contact;
  const other = locale === 'de' ? 'en' : 'de';

  return (
    <SitePage locale={locale} languageHref={href(other, 'contact')}>
      <PageHead tags={[{ label: dictionary.footer.contactPage || page.eyebrow }]} title={page.title} lead={page.intro} />
      <Section className="pt-16 sm:pt-20">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="lg:col-start-1 lg:row-start-1"><InfoCard t={t} /></div>
            <div className={cn(block, 'order-3 bg-card p-6 sm:p-10 lg:order-none lg:col-start-1 lg:row-start-2')}>
              <p className="text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase sm:tracking-[0.14em]">{shared.nextTitle}</p>
              <ol className="mt-4 grid grid-cols-1 gap-3">
                {shared.next.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 rounded-[1.25rem] bg-secondary p-3.5 sm:gap-x-4 sm:p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-black text-primary-foreground sm:row-span-2 sm:self-start">{index + 1}</span>
                    <span className="block font-extrabold">{step.title}</span>
                    <span className="col-span-2 block text-sm text-muted-foreground sm:col-span-1 sm:col-start-2">{step.text}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted-foreground">{shared.points.join(' · ')}</p>
            </div>
          <div className={cn(block, 'order-2 bg-secondary p-6 sm:p-10 lg:sticky lg:top-24 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1')}>
            <h2 className="mb-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{t.formTitle}</h2>
            <LandingContactForm locale={locale} t={t} messageLabel={t.message} privacyHref={href(locale, 'privacy')} />
          </div>
        </div>
      </Section>
    </SitePage>
  );
}
