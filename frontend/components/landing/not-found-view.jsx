import { getDictionary, href } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { SitePage } from '@/components/landing/shell';
import { button, wrap } from '@/components/landing/blocks';

// Where the 404 page of each language lives (one line per language, next to nginx.conf's map).
const notFoundPath = { de: '/nicht-gefunden', en: '/en/not-found' };

// The 404 page of one language. nginx picks it by the language prefix of the missing URL (see nginx.conf),
// so the visitor reads it in their language; the header switches to the 404 page of the other language, not to its home page.
export default function NotFoundView({ locale }) {
  const t = getDictionary(locale);
  const other = locale === 'de' ? 'en' : 'de';
  return (
    <SitePage locale={locale} languageHref={notFoundPath[other]}>
      <section className={`${wrap} flex min-h-[60vh] flex-col items-center justify-center py-16 text-center`}>
        <p className="inline-block rounded-full border-[1.5px] border-lilac px-3.5 py-1.5 text-sm leading-snug font-bold text-lilac">{t.notFound.eyebrow}</p>
        <h1 className="mt-6 text-[clamp(6rem,24vw,14rem)] leading-[0.85] font-black tracking-[-0.06em] text-lilac">404</h1>
        <p className="mx-auto mt-6 max-w-[560px] text-lg text-muted-foreground">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={href(locale, 'home')} className={cn(button, 'bg-primary text-primary-foreground')}>{t.notFound.home} →</a>
          <a href={href(locale, 'contact')} className={cn(button, 'bg-foam text-ink')}>{t.notFound.contact}</a>
        </div>
      </section>
    </SitePage>
  );
}
