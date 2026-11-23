'use client';

import { useEffect, useMemo, useState } from 'react';
import { useProjects } from '@/components/portfolio/use-projects';
import { projectHref } from '@/lib/i18n';
import { categoryIcons, compareProjects, isPreparing, localizeProject } from '@/lib/portfolio';
import { Icon } from '@/components/sections/icons';
import { cn } from '@/lib/utils';
import { block, chipRow, hover, pill } from '@/components/landing/blocks';

const ALL = 'alle';

function ProjectCard({ project, preparing, href, category, preparingLabel, ownLabel }) {
  const body = (
    <>
      <span className="relative block aspect-[16/10] overflow-hidden bg-secondary">
        {project.screenshots[0]
          ? <img src={project.screenshots[0]} alt={project.title} loading="lazy" decoding="async" className="size-full object-cover object-top" />
          : <Icon name={categoryIcons[project.category]} className="absolute inset-0 m-auto size-16 text-lilac/40" />}
        {preparing && <span className={cn(pill, 'absolute top-4 left-4 bg-ink text-white')}>{preparingLabel}</span>}
      </span>
      <span className="flex flex-1 flex-col gap-3 p-7">
        <span className="flex flex-wrap gap-1.5 self-start">
          <span className={cn(pill, 'bg-secondary')}>{category}</span>
          {project.own && <span className={cn(pill, 'bg-foam text-ink')}>{ownLabel}</span>}
        </span>
        <span className="text-[1.625rem] leading-tight font-black tracking-[-0.03em]">{project.title}</span>
        <span className="line-clamp-3 text-muted-foreground">{project.description}</span>
        {!preparing && project.stack.length > 0 && (
          <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 4).map((item) => <span key={item} className={cn(pill, 'bg-background text-muted-foreground')}>{item}</span>)}
          </span>
        )}
      </span>
    </>
  );
  const className = cn(block, 'flex h-full flex-col overflow-hidden bg-card');
  return href ? <a href={href} className={cn(className, hover)}>{body}</a> : <div className={className}>{body}</div>;
}

export default function PortfolioList({ locale, labels, snapshot }) {
  const { projects, categories, loading } = useProjects(snapshot);
  const [active, setActive] = useState(ALL);

  // Finished work first, then concepts; placeholders "in preparation" stay but move to the end.
  const items = useMemo(() => [...projects]
    .sort(compareProjects)
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label={labels.loading}>
        {Array.from({ length: 6 }, (_, index) => <div key={index} className={cn(block, 'h-96 animate-pulse bg-secondary motion-reduce:animate-none')} />)}
      </div>
    );
  }

  return (
    <>
      <div className={chipRow} role="toolbar">
        {filters.map(({ value, count }) => (
          <button type="button" key={value} aria-pressed={active === value} onClick={() => choose(value)}
            className={cn('rounded-full px-4 py-2 text-[15px] font-bold transition', active === value ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-secondary')}>
            {value === ALL ? labels.all : labels.categories[value]} <span className={active === value ? 'text-primary-foreground/80' : 'text-muted-foreground'}>{count}</span>
          </button>
        ))}
      </div>
      {visible.length === 0 ? <p className="mt-8 text-muted-foreground">{labels.empty}</p> : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ project, preparing }) => (
            <ProjectCard key={project.id} project={project} preparing={preparing} category={labels.categories[project.category]} preparingLabel={labels.preparing} ownLabel={labels.own}
              href={!preparing && project.slug ? projectHref(locale, project.slug) : null} />
          ))}
        </div>
      )}
    </>
  );
}
