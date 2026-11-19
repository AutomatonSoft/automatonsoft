import { getDictionary, href } from '@/lib/i18n';
import { addressLines, siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import { PageHead, SitePage } from '@/components/landing/shell';
import { block, Section } from '@/components/landing/blocks';

const companyAddress = [siteConfig.name, ...addressLines].join('\n');

// Text pages (Impressum, Datenschutz, blog) in design E: head, one card per section, closing call to action.
export default function ContentView({ locale, page }) {
  const t = getDictionary(locale);
  const content = t.pages[page];
  const other = locale === 'de' ? 'en' : 'de';

  return (
    <SitePage locale={locale} languageHref={href(other, page)}>
      <PageHead tags={[{ label: content.eyebrow }]} title={content.title} lead={content.intro} />
      <Section>
        <div className="grid grid-cols-1 gap-4">
          {content.sections.map((section) => (
            <article key={section.title} className={cn(block, 'grid grid-cols-1 gap-6 bg-card p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]')}>
              <div>
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{section.title}</h2>
                {(section.address || section.text) && (
                  <p className={cn('mt-5 text-muted-foreground', section.address && 'whitespace-pre-line')}>{section.address ? companyAddress : section.text}</p>
                )}
              </div>
              <ul className="grid grid-cols-1 content-start gap-2.5">
                {section.items.map((item) => <li key={item} className="rounded-[1.25rem] bg-secondary px-5 py-4 font-bold break-words">{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand title={t.common.helpTitle} text={t.common.helpText} cta={t.common.helpCta} href={href(locale, 'contact')} />
    </SitePage>
  );
}
