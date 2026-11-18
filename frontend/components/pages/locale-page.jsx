import { notFound } from 'next/navigation';
import { pageFromSlug, staticParams } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/json-ld';
import SiteShell from '@/components/layout/site-shell';
import ContactPage from '@/components/pages/contact-page';
import ContentPage from '@/components/pages/content-page';
import ServicesPage from '@/components/pages/services-page';
import CompanyPage from '@/components/pages/company-page';
import HirePage from '@/components/pages/hire-page';

const pageComponents = { company: CompanyPage, services: ServicesPage, hire: HirePage, contact: ContactPage };
// Pages already in design E live in the (landing-*) root layouts: the home page, the portfolio (with its project pages) and the industries.
const redesigned = ['home', 'portfolio', 'industries'];

// Factory for the per-locale catch-all route: every locale shares the same page tree.
export function createLocaleRoute(locale) {
  const resolve = async (params) => {
    const page = pageFromSlug(locale, (await params).slug);
    return page && !redesigned.includes(page) ? page : notFound();
  };
  return {
    generateStaticParams: () => staticParams(locale).filter(({ slug }) => slug.length && !redesigned.some((page) => pageFromSlug(locale, slug) === page)),
    generateMetadata: async ({ params }) => buildMetadata(locale, await resolve(params)),
    Page: async function LocalePage({ params }) {
      const page = await resolve(params);
      const Component = pageComponents[page] || ContentPage;
      return (
        <SiteShell locale={locale} page={page}>
          <JsonLd data={breadcrumbJsonLd(locale, page)} />
          <Component locale={locale} page={page} />
        </SiteShell>
      );
    },
  };
}
