import { notFound } from 'next/navigation';
import { pageFromSlug, projectFromSlug, projectHref, projectParams, staticParams } from '@/lib/i18n';
import { FALLBACK_SLUG } from '@/lib/portfolio';
import { loadProject, projectSlugs } from '@/lib/portfolio-snapshot';
import { breadcrumbJsonLd, buildMetadata, projectAlternates, projectMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/json-ld';
import SiteShell from '@/components/layout/site-shell';
import HomePage from '@/components/pages/home-page';
import PortfolioPage from '@/components/pages/portfolio-page';
import ContactPage from '@/components/pages/contact-page';
import ContentPage from '@/components/pages/content-page';
import ServicesPage from '@/components/pages/services-page';
import CompanyPage from '@/components/pages/company-page';
import IndustriesPage from '@/components/pages/industries-page';
import HirePage from '@/components/pages/hire-page';
import ProjectPage from '@/components/pages/project-page';

const pageComponents = { home: HomePage, company: CompanyPage, services: ServicesPage, industries: IndustriesPage, hire: HirePage, portfolio: PortfolioPage, contact: ContactPage };

// Factory for the per-locale catch-all route: every locale shares the same page tree,
// plus one landing page per portfolio project (/portfolio/<slug>) generated from the build-time snapshot.
export function createLocaleRoute(locale) {
  const resolve = async (params) => pageFromSlug(locale, (await params).slug) || notFound();
  const resolveProject = async (params) => {
    const slug = projectFromSlug(locale, (await params).slug);
    return slug && { slug, project: await loadProject(slug) };
  };
  return {
    generateStaticParams: async () => [
      ...staticParams(locale),
      ...[FALLBACK_SLUG, ...(await projectSlugs())].map((slug) => projectParams(locale, slug)),
    ],
    generateMetadata: async ({ params }) => {
      const match = await resolveProject(params);
      return match ? projectMetadata(locale, match.project) : buildMetadata(locale, await resolve(params));
    },
    Page: async function LocalePage({ params }) {
      const match = await resolveProject(params);
      if (match) {
        const { slug, project } = match;
        return (
          <SiteShell locale={locale} page="portfolio" alternates={project ? projectAlternates(slug) : undefined}>
            {project && <JsonLd data={breadcrumbJsonLd(locale, 'portfolio', { name: project.title, path: projectHref(locale, slug) })} />}
            <ProjectPage locale={locale} slug={slug === FALLBACK_SLUG ? null : slug} project={project} />
          </SiteShell>
        );
      }
      const page = await resolve(params);
      const Component = pageComponents[page] || ContentPage;
      return (
        <SiteShell locale={locale} page={page}>
          {page !== 'home' && <JsonLd data={breadcrumbJsonLd(locale, page)} />}
          <Component locale={locale} page={page} />
        </SiteShell>
      );
    },
  };
}
