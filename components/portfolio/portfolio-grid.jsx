'use client';

import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '@/components/portfolio/project-card';
import { useProjects } from '@/components/portfolio/use-projects';
import { isPreparing, localizeProject, projectRank } from '@/lib/portfolio';

const ALL = 'alle';
const SKELETONS = 6;

export default function PortfolioGrid({ locale, labels, snapshot }) {
  const { projects, categories, loading } = useProjects(snapshot);
  const [active, setActive] = useState(ALL);

  // Finished work first, then concepts; placeholders "in preparation" are kept but moved to the end.
  const items = useMemo(() => [...projects]
    .sort((a, b) => projectRank(a) - projectRank(b))
    .map((project) => ({ project: localizeProject(project, locale), preparing: isPreparing(project) })), [projects, locale]);
  const counts = useMemo(() => items.reduce((map, { project }) => ({ ...map, [project.category]: (map[project.category] || 0) + 1 }), {}), [items]);
  const filters = [{ value: ALL, count: items.length }, ...categories.filter((category) => counts[category.value]).map((category) => ({ value: category.value, count: counts[category.value] }))];

  // Deep links such as /portfolio#ai-business-solutions preselect a category.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (categories.some((category) => category.value === hash)) setActive(hash);
  }, [categories]);

  const choose = (value) => {
    setActive(value);
    window.history.replaceState(null, '', value === ALL ? window.location.pathname : `#${value}`);
  };
  const visible = active === ALL ? items : items.filter(({ project }) => project.category === active);
  const label = (value) => (value === ALL ? labels.all : labels.categories[value]);

  if (loading) {
    return <div className="grid grid-3" aria-busy="true" aria-label={labels.loading}>{Array.from({ length: SKELETONS }, (_, index) => <div key={index} className="project-skeleton" />)}</div>;
  }

  return (
    <>
      <div className="filter-bar" role="toolbar">
        {filters.map(({ value, count }) => (
          <button type="button" key={value} className={`filter-btn ${active === value ? 'active' : ''}`} aria-pressed={active === value} onClick={() => choose(value)}>
            {label(value)}<span className="filter-count">{count}</span>
          </button>
        ))}
      </div>
      {visible.length === 0 ? <p>{labels.empty}</p> : (
        <div className="grid grid-3" id="portfolio-grid">
          {visible.map(({ project, preparing }) => (
            <ProjectCard key={project.id} project={project} preparing={preparing} categoryLabel={labels.categories[project.category]} preparingLabel={labels.preparing} />
          ))}
        </div>
      )}
    </>
  );
}
