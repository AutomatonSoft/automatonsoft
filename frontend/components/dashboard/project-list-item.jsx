import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, GripVertical, ImagePlus, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categoryName } from '@/components/dashboard/copy';
import PlaceNumber from '@/components/dashboard/place-number';
import { panel } from '@/components/dashboard/styles';

const iconButton = cn(buttonVariants({ variant: 'outline' }), 'size-10 bg-card');
const menuItem = 'flex h-10 w-full items-center gap-2.5 rounded-lg px-2.5 text-sm font-semibold text-foreground hover:bg-secondary';

// `order` is set while the list can be sorted: { count, onMove(place), onDragStart(event) }.
export default function ProjectListItem({ project, t, lang, order, style, dragged, unsaved, menuUp, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBox = useRef(null);
  const place = project.position;

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointer = (event) => { if (!menuBox.current?.contains(event.target)) setMenuOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const arrow = (step, label, Icon) => (
    <button type="button" onClick={() => order.onMove(place + step)} disabled={place + step < 1 || place + step > order.count}
      aria-label={`${label}: ${project.title}`} title={label} className={iconButton}><Icon /></button>
  );

  return (
    <li style={style} className={cn('relative flex flex-wrap items-center gap-x-2 gap-y-2.5 bg-card p-3 sm:flex-nowrap sm:gap-3 lg:gap-4', dragged ? 'z-20 rounded-xl shadow-xl ring-2 ring-primary' : menuOpen ? 'z-20 bg-background' : 'hover:bg-background')}>
      <div className="flex shrink-0 items-center gap-1">
        {order && (
          // Only the handle blocks touch scrolling; arrows and the number do the same job from the keyboard.
          <button type="button" tabIndex={-1} onPointerDown={order.onDragStart} aria-label={`${t.drag}: ${project.title}`} title={t.drag}
            className="grid size-10 cursor-grab touch-none place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary active:cursor-grabbing">
            <GripVertical className="size-5" />
          </button>
        )}
        <PlaceNumber place={place} count={order?.count} label={t.changePlace} onMove={order?.onMove} />
      </div>
      <button type="button" onClick={() => onEdit(project)} className="order-3 flex min-w-0 basis-full items-start gap-3 rounded-lg text-left sm:order-none sm:basis-auto sm:flex-1 sm:items-center sm:gap-4">
        <span className="grid aspect-[16/10] w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-secondary">
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
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
        <div className="hidden items-center gap-2 lg:flex">
          {order && <>{arrow(-1, t.moveUp, ArrowUp)}{arrow(1, t.moveDown, ArrowDown)}</>}
          <button type="button" onClick={() => onEdit(project)} aria-label={`${t.editButton}: ${project.title}`} title={t.editButton} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 bg-card px-3 text-primary')}><Pencil /> {t.editButton}</button>
        </div>
        <div ref={menuBox} className="relative">
          <button type="button" aria-label={`${t.actions}: ${project.title}`} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)} className={iconButton}><MoreVertical /></button>
          {menuOpen && (
            <div className={cn(panel, 'absolute right-0 z-30 w-52 p-1.5 shadow-xl shadow-ink/10', menuUp ? 'bottom-12' : 'top-12')}>
              <button type="button" onClick={() => { setMenuOpen(false); onEdit(project); }} className={cn(menuItem, 'text-primary lg:hidden')}>
                <Pencil className="size-4" /> {t.editButton}
              </button>
              {project.slug && (
                <a href={`/portfolio/${project.slug}`} target="_blank" rel="noopener" onClick={() => setMenuOpen(false)} className={menuItem}>
                  <ExternalLink className="size-4 text-muted-foreground" /> {t.viewPage}
                </a>
              )}
              {order && (
                <div className="lg:hidden">
                  <div className="my-1 border-t border-border" />
                  <button type="button" disabled={place <= 1} onClick={() => { setMenuOpen(false); order.onMove(place - 1); }} className={cn(menuItem, 'disabled:pointer-events-none disabled:opacity-40')}>
                    <ArrowUp className="size-4 text-muted-foreground" /> {t.moveUp}
                  </button>
                  <button type="button" disabled={place >= order.count} onClick={() => { setMenuOpen(false); order.onMove(place + 1); }} className={cn(menuItem, 'disabled:pointer-events-none disabled:opacity-40')}>
                    <ArrowDown className="size-4 text-muted-foreground" /> {t.moveDown}
                  </button>
                </div>
              )}
              <div className={cn('my-1 border-t border-border', !project.slug && 'lg:hidden')} />
              <button type="button" onClick={() => { setMenuOpen(false); onDelete(project); }} className={cn(menuItem, 'text-destructive hover:bg-destructive/10')}>
                <Trash2 className="size-4" /> {t.deleteButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
