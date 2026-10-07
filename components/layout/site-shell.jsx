import { getDictionary, href } from '@/lib/i18n';
import Brand from '@/components/layout/brand';
import TopBar from '@/components/layout/top-bar';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import QuickContact from '@/components/layout/quick-contact';
import LanguageSwitcher from '@/components/layout/language-switcher';
import AttributionTracker from '@/components/layout/attribution-tracker';

const navPages = ['company', 'services', 'industries', 'portfolio', 'hire'];

export default function SiteShell({ locale, page, children }) {
  const { nav } = getDictionary(locale);
  const links = navPages.map((item) => ({ label: nav[item], href: href(locale, item), current: item === page }));
  return (
    <>
      <a className="skip-link" href="#main">{nav.skip}</a>
      <TopBar tagline={nav.tagline} languageSwitcher={<LanguageSwitcher locale={locale} page={page} label={nav.language} />} />
      <SiteHeader
        brand={<Brand homeHref={href(locale, 'home')} />}
        links={links}
        labels={{ nav: nav.label, cta: nav.cta, openMenu: nav.openMenu, closeMenu: nav.closeMenu }}
        contactHref={href(locale, 'contact')}
      />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} page={page} />
      <QuickContact locale={locale} />
      <AttributionTracker />
    </>
  );
}
