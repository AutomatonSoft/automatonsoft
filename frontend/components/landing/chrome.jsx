import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { landingHref, landings } from '@/lib/landings';
import { addressLines, siteConfig } from '@/lib/site-config';
import { wrap as shell } from '@/components/landing/blocks';

const hairline = 'border-border';

const logo = '/assets/img/logo-icon-96.webp';

// links: [{ href, label }]; language: { href, label, locale } of the same page in the other language.
export function SiteHeader({ locale, links, language, cta, label }) {
  return (
    <header className="sticky top-0 z-30 transform-gpu bg-background/95">
      <div className={`${shell} flex h-18 items-center justify-between gap-6`}>
        <a href={href(locale, 'home')} className="flex shrink-0 items-center gap-2.5 text-lg font-extrabold tracking-[-0.02em] whitespace-nowrap">
          <img src={logo} alt="" width="34" height="34" className="size-8.5 rounded-[10px]" />
          {siteConfig.shortName}
        </a>
        <nav aria-label={label} className="hidden items-center gap-1 rounded-full bg-card p-1.5 text-[15px] font-semibold lg:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="rounded-full px-4 py-2 hover:bg-secondary hover:text-lilac">{link.label}</a>)}
          <a href={language.href} hrefLang={language.locale} lang={language.locale} className="rounded-full px-4 py-2 text-muted-foreground hover:bg-secondary hover:text-lilac">{language.label}</a>
        </nav>
        <span className="flex items-center gap-3">
          <a href={language.href} hrefLang={language.locale} lang={language.locale} aria-label={`${language.locale.toUpperCase()} – ${language.label}`} className="rounded-full px-2 py-2 text-sm font-extrabold text-muted-foreground uppercase hover:text-lilac lg:hidden">{language.locale}</a>
          <a href={cta.href} className="hidden rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold whitespace-nowrap text-primary-foreground transition-opacity hover:opacity-85 sm:inline-block sm:px-5 sm:text-[15px]">{cta.label}</a>
        </span>
      </div>
    </header>
  );
}

// Desktop: the request stays one click away (phones get MobileContactBar instead).
export function FloatingCta({ href: target, label }) {
  return (
    <a href={target} className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-4 rounded-full bg-white py-2 pr-2 pl-7 text-[17px] font-extrabold text-foreground shadow-[0_0_0_1px_rgba(6,37,135,0.08),0_18px_48px_rgba(6,37,135,0.28)] transition hover:-translate-y-0.5 md:flex">
      {label}
      <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="size-5" strokeWidth={2.5} /></span>
    </a>
  );
}

// Every page links every industry landing, so new landings are reachable from anywhere.
export function SiteFooter({ locale }) {
  const t = getDictionary(locale);
  const pages = ['services', 'industries', 'portfolio', 'company', 'contact'];
  const industryTitles = Object.fromEntries(t.industries.items.map((item) => [item.id, item.title]));
  return (
    <footer>
      <div className={`${shell} grid gap-10 py-14 text-sm text-muted-foreground sm:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <div className="font-heading text-base font-semibold text-foreground">{siteConfig.shortName}</div>
          <p className="mt-3 max-w-[340px]">{t.footer.tagline}</p>
          <p className="mt-5">{[siteConfig.name, ...addressLines].join(' · ')}</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-semibold text-foreground">
            <a href={siteConfig.phone.href} className="hover:text-lilac">{siteConfig.phone.display}</a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-lilac">{siteConfig.email}</a>
          </p>
        </div>
        <nav aria-label={t.footer.industries}>
          <p className="text-xs font-medium tracking-[0.16em] uppercase">{t.footer.industries}</p>
          <ul className="mt-4 grid gap-2.5">
            {Object.keys(landings).map((id) => <li key={id}><a href={landingHref(locale, id)} className="text-foreground/80 hover:text-foreground">{industryTitles[id] || landings[id].content[locale].name}</a></li>)}
            <li><a href={href(locale, 'industries')} className="hover:text-foreground">{t.nav.industries} →</a></li>
          </ul>
        </nav>
        <nav aria-label={t.footer.company}>
          <p className="text-xs font-medium tracking-[0.16em] uppercase">{t.footer.company}</p>
          <ul className="mt-4 grid gap-2.5">
            {pages.map((page) => <li key={page}><a href={href(locale, page)} className="text-foreground/80 hover:text-foreground">{t.nav[page] || t.footer[page] || t.footer.contactPage}</a></li>)}
          </ul>
        </nav>
      </div>
      <div className={`${shell} flex flex-wrap justify-between gap-4 border-t ${hairline} py-6 text-xs text-muted-foreground`}>
        <span>© {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}</span>
        <span className="flex gap-6">
          <a href={href(locale, 'imprint')} className="hover:text-foreground">{t.footer.imprint}</a>
          <a href={href(locale, 'privacy')} className="hover:text-foreground">{t.footer.privacy}</a>
        </span>
      </div>
    </footer>
  );
}

// Phones: the three ways to reach us stay one tap away. Pure CSS, no script.
export function MobileContactBar({ labels, requestHref }) {
  return (
    <nav aria-label={labels.request} className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-2 shadow-[0_12px_40px_rgba(6,37,135,0.22)] md:hidden">
      <a href={siteConfig.phone.href} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold hover:bg-primary/10"><Phone aria-hidden="true" className="size-4 text-lilac" />{labels.call}</a>
      <a href={siteConfig.whatsapp.href} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold hover:bg-primary/10"><MessageCircle aria-hidden="true" className="size-4 text-lilac" />{labels.whatsapp}</a>
      <a href={requestHref} className="flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">{labels.request}</a>
    </nav>
  );
}
