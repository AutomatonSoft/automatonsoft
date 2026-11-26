import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { categoryName } from '@/components/dashboard/copy';
import ProjectListItem from '@/components/dashboard/project-list-item';
import { control, panel } from '@/components/dashboard/styles';
import { useDragOrder } from '@/components/dashboard/use-drag-order';

const filterTests = {
  all: () => true,
  live: (project) => project.published,
  drafts: (project) => !project.published,
};

export default function ProjectList({ projects, t, lang, onNew, onEdit, onDelete, onMove }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const needle = query.trim().toLowerCase();
  const visible = projects.filter((project) => filterTests[filter](project)
    && [project.title, categoryName(project, lang), ...project.stack].join(' ').toLowerCase().includes(needle));
  // Sorting needs the whole list: in a filtered one "third place" would be ambiguous.
  const sortable = filter === 'all' && !needle && projects.length > 1;
  const drag = useDragOrder((from, to) => onMove(visible[from], to + 1));

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-ink sm:text-3xl">{t.projects}</h1>
        <button type="button" onClick={onNew} className={cn(buttonVariants({ size: 'xl' }), 'h-11 text-sm max-sm:w-full')}><Plus /> {t.newProject}</button>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label={t.search} placeholder={t.search} className={cn(control, 'pl-9')} />
        </div>
        <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
          {Object.entries(filterTests).map(([id, test]) => (
            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}
              className={cn('h-9 flex-auto rounded-lg px-2 text-[13px] font-semibold whitespace-nowrap sm:px-3 sm:text-sm',filter === id ? 'bg-secondary text-primary' : 'text-muted-foreground hover:text-foreground')}>
              {t[id]} <span className="ml-0.5 tabular-nums opacity-70">{projects.filter(test).length}</span>
            </button>
          ))}
        </div>
      </div>
      {!sortable && projects.length > 1 && visible.length > 0 && <p className="text-sm text-muted-foreground">{t.sortOff}</p>}
      {visible.length
        ? (
          <ul className={cn(panel, 'divide-y divide-border *:first:rounded-t-2xl *:last:rounded-b-2xl', drag.dragged !== undefined && 'select-none')}>
            {visible.map((project, index) => (
              <ProjectListItem key={project.id} project={project} t={t} lang={lang} onEdit={onEdit} onDelete={onDelete}
                order={sortable ? { count: projects.length, onMove: (place) => onMove(project, place), onDragStart: (event) => drag.start(event, index) } : null}
                style={drag.rowStyle(index)} dragged={drag.dragged === index} />
            ))}
          </ul>
        )
        : <p className={cn(panel, 'p-8 text-center text-muted-foreground')}>{t.nothingFound}</p>}
    </section>
  );
}
