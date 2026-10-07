import { notFound } from 'next/navigation';
import { pageFromSlug, staticParams } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/site-shell';
import HomePage from '@/components/pages/home-page';
import PortfolioPage from '@/components/pages/portfolio-page';
import ContactPage from '@/components/pages/contact-page';
import ContentPage from '@/components/pages/content-page';

const pageComponents = { home: HomePage, portfolio: PortfolioPage, contact: ContactPage };

// Factory for the per-locale catch-all route: every locale shares the same page tree.
export function createLocaleRoute(locale) {
  const resolve = async (params) => pageFromSlug(locale, (await params).slug) || notFound();
  return {
    generateStaticParams: () => staticParams(locale),
    generateMetadata: async ({ params }) => buildMetadata(locale, await resolve(params)),
    Page: async function LocalePage({ params }) {
      const page = await resolve(params);
      const Component = pageComponents[page] || ContentPage;
      return <SiteShell locale={locale} page={page}><Component locale={locale} page={page} /></SiteShell>;
    },
  };
}
