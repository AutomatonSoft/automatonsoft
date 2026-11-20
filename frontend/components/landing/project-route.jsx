import { getDictionary, href, projectHref } from '@/lib/i18n';
import { FALLBACK_SLUG } from '@/lib/portfolio';
import { loadProject, projectSlugs } from '@/lib/portfolio-snapshot';
import { breadcrumbJsonLd, buildMetadata, projectMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/json-ld';
import PortfolioView from '@/components/landing/portfolio-view';
import ProjectView from '@/components/landing/project-view';
import { SitePage } from '@/components/landing/shell';

// Routes of /portfolio and /portfolio/<slug> in the (landing-*) root layouts. The project pages come from the build-time snapshot;
// FALLBACK_SLUG is the client-rendered page nginx serves for projects added after the last build.
export function createPortfolioRoute(locale) {
  return {
    generateMetadata: () => buildMetadata(locale, 'portfolio'),
    Page: function Portfolio() {
      return (
        <>
          <JsonLd data={breadcrumbJsonLd(locale, 'portfolio')} />
          <PortfolioView locale={locale} />
        </>
      );
    },
  };
}

export function createProjectRoute(locale) {
  const other = locale === 'de' ? 'en' : 'de';
  return {
    generateStaticParams: async () => [FALLBACK_SLUG, ...(await projectSlugs())].map((slug) => ({ slug })),
    generateMetadata: async ({ params }) => projectMetadata(locale, await loadProject((await params).slug)),
    Page: async function Project({ params }) {
      const slug = (await params).slug;
      const project = await loadProject(slug);
      const t = getDictionary(locale);
      const links = { home: href(locale, 'home'), portfolio: href(locale, 'portfolio'), contact: href(locale, 'contact') };
      const labels = { ...t.portfolio.project, portfolio: t.nav.portfolio, categories: t.portfolio.categories, own: t.portfolio.own };
      return (
        <SitePage locale={locale} languageHref={project ? projectHref(other, slug) : href(other, 'portfolio')}>
          {project && <JsonLd data={breadcrumbJsonLd(locale, 'portfolio', { name: project.title, path: projectHref(locale, slug) })} />}
          <ProjectView locale={locale} slug={slug === FALLBACK_SLUG ? null : slug} initial={project} links={links} labels={labels} />
        </SitePage>
      );
    },
  };
}
