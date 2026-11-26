import { ArrowDown, ArrowUp, ExternalLink, GripVertical, ImagePlus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categoryName } from '@/components/dashboard/copy';
import PlaceNumber from '@/components/dashboard/place-number';

const iconButton = cn(buttonVariants({ variant: 'outline' }), 'size-10 bg-card');

// `order` is set while the list can be sorted: { count, onMove(place), onDragStart(event) }.
export default function ProjectListItem({ project, t, lang, order, style, dragged, unsaved, onEdit, onDelete }) {
  const place = project.position;
  const arrow = (step, label, Icon) => (
    <button type="button" onClick={() => order.onMove(place + step)} disabled={place + step < 1 || place + step > order.count}
      aria-label={`${label}: ${project.title}`} title={label} className={iconButton}><Icon /></button>
  );

  return (
    <li style={style} className={cn('relative flex flex-col gap-3 bg-card p-3 lg:flex-row lg:items-center lg:gap-4',dragged ? 'z-10 rounded-xl shadow-xl ring-2 ring-primary' : 'hover:bg-background')}>
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <div className="flex shrink-0 flex-col items-center gap-1 sm:flex-row">
          {order && (
            // Only the handle blocks touch scrolling; arrows and the number do the same job from the keyboard.
            <button type="button" tabIndex={-1} onPointerDown={order.onDragStart} aria-label={`${t.drag}: ${project.title}`} title={t.drag}
              className="grid size-10 cursor-grab touch-none place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary active:cursor-grabbing">
              <GripVertical className="size-5" />
            </button>
          )}
          <PlaceNumber place={place} count={order?.count} label={t.changePlace} onMove={order?.onMove} />
        </div>
        <button type="button" onClick={() => onEdit(project)} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left sm:gap-4">
          <span className="grid aspect-[16/10] w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-secondary sm:w-28">
            {project.screenshots[0] ? <img className="size-full object-cover" src={project.screenshots[0]} alt="" loading="lazy" draggable="false" /> : <ImagePlus className="size-5 text-muted-foreground" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-bold">{project.title}</span>
            <span className="block truncate text-xs text-muted-foreground">{categoryName(project, lang)}</span>
            <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge className={project.published ? 'bg-foam text-ink' : 'bg-amber-100 text-amber-900'}>{project.published ? t.publishedStatus : t.draftStatus}</Badge>
              {project.in_development && <Badge variant="outline">{t.developmentStatus}</Badge>}
              {unsaved && <Badge className="bg-amber-500 text-amber-950">{t.unsavedEdits}</Badge>}
            </span>
          </span>
        </button>
      </div>
      <div className="flex shrink-0 gap-2">
        {order && <>{arrow(-1, t.moveUp, ArrowUp)}{arrow(1, t.moveDown, ArrowDown)}</>}
        <button type="button" onClick={() => onEdit(project)} aria-label={`${t.editButton}: ${project.title}`} title={t.editButton} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 flex-1 bg-card px-3 text-primary lg:flex-none')}><Pencil /> <span className="max-sm:hidden">{t.editButton}</span></button>
        {project.slug && <a href={`/portfolio/${project.slug}`} target="_blank" rel="noopener" aria-label={`${t.viewPage}: ${project.title}`} title={t.viewPage} className={iconButton}><ExternalLink /></a>}
        <button type="button" onClick={() => onDelete(project)} aria-label={`${t.deleteButton}: ${project.title}`} title={t.deleteButton} className={cn(iconButton, 'text-destructive hover:bg-destructive/10 hover:text-destructive')}><Trash2 /></button>
      </div>
    </li>
  );
}
