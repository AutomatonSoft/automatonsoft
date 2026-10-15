import { getDictionary, href } from '@/lib/i18n';
import ProjectLanding from '@/components/portfolio/project-landing';

// Landing page of one portfolio project; content comes from the dashboard, labels from the dictionary.
export default function ProjectPage({ locale, slug, project }) {
  const t = getDictionary(locale);
  const links = { home: href(locale, 'home'), portfolio: href(locale, 'portfolio'), contact: href(locale, 'contact') };
  const labels = { ...t.portfolio.project, home: t.common.home, portfolio: t.nav.portfolio, categories: t.portfolio.categories };
  return <ProjectLanding locale={locale} slug={slug} initial={project} links={links} labels={labels} />;
}
