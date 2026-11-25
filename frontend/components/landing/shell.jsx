import { getDictionary, href } from '@/lib/i18n';
import common from '@/lib/landings/common';
import { cn } from '@/lib/utils';
import { FloatingCta, MobileContactBar, SiteFooter, SiteHeader } from '@/components/landing/chrome';
import { Title, wrap } from '@/components/landing/blocks';

// Frame of every inner page in design E: header, content, footer, floating request button.
// languageHref: path of the same page in the other language.
export function SitePage({ locale, languageHref, children }) {
  const dictionary = getDictionary(locale);
  const shared = common[locale];
  const other = locale === 'de' ? 'en' : 'de';
  const request = href(locale, 'contact');
  return (
    <div className="overflow-x-clip bg-background pb-24 font-sans text-[17px] leading-normal text-foreground antialiased">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">{dictionary.nav.skip}</a>
      <SiteHeader locale={locale} label={dictionary.nav.label} cta={{ href: request, label: shared.nav.cta }}
        language={{ href: languageHref, label: shared.nav.language, locale: other }}
        links={['services', 'industries', 'portfolio', 'company'].map((page) => ({ href: href(locale, page), label: dictionary.nav[page] }))} />
      <main id="inhalt" className="pb-12">{children}</main>
      <SiteFooter locale={locale} />
      <FloatingCta href={request} label={shared.nav.cta} />
      <MobileContactBar labels={shared.mobile} requestHref={request} />
    </div>
  );
}

// Top of an inner page: crumb pills, big heading, lead, optional extra content and actions.
export function PageHead({ tags = [], title, lead, actions, children }) {
  return (
    <section className={`${wrap} pt-10`}>
      <ul className="flex flex-wrap gap-2">
        {tags.map(({ label, href: link }, index) => (
          <li key={label}>
            {(() => {
              const className = cn('block rounded-[1.1rem] px-3.5 py-1.5 text-sm leading-snug font-bold', index ? 'bg-card' : 'border-[1.5px] border-lilac text-lilac');
              return link ? <a href={link} className={cn(className, 'hover:bg-secondary')}>{label}</a> : <span className={className}>{label}</span>;
            })()}
          </li>
        ))}
      </ul>
      <Title as="h1" parts={title} className="mt-7 text-[clamp(2.5rem,min(6vw,11vh),5rem)] tracking-[-0.04em] leading-[0.92]" />
      {lead && <p className="mt-6 max-w-[640px] text-lg text-muted-foreground">{lead}</p>}
      {children}
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </section>
  );
}
