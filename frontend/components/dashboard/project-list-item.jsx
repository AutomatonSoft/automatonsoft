import { ExternalLink, ImagePlus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categoryName } from '@/components/dashboard/copy';

const iconButton = cn(buttonVariants({ variant: 'outline' }), 'size-10 bg-card');

export default function ProjectListItem({ project, t, lang, onEdit, onDelete }) {
  return (
    <li className="flex flex-col gap-3 p-3 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-4">
      <button type="button" onClick={() => onEdit(project)} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left sm:gap-4">
        <span className="grid aspect-[16/10] w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-secondary sm:w-28">
          {project.screenshots[0] ? <img className="size-full object-cover" src={project.screenshots[0]} alt="" loading="lazy" /> : <ImagePlus className="size-5 text-muted-foreground" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-bold">{project.title}</span>
          <span className="block truncate text-xs text-muted-foreground">{categoryName(project, lang)}</span>
          <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge className={project.published ? 'bg-foam text-ink' : 'bg-amber-100 text-amber-900'}>{project.published ? t.publishedStatus : t.draftStatus}</Badge>
            {project.in_development && <Badge variant="outline">{t.developmentStatus}</Badge>}
            <span className="text-xs text-muted-foreground">{t.order}: {project.position}</span>
          </span>
        </span>
      </button>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={() => onEdit(project)} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 flex-1 bg-card px-3 text-primary sm:flex-none')}><Pencil /> {t.editButton}</button>
        {project.slug && <a href={`/portfolio/${project.slug}`} target="_blank" rel="noopener" aria-label={`${t.viewPage}: ${project.title}`} title={t.viewPage} className={iconButton}><ExternalLink /></a>}
        <button type="button" onClick={() => onDelete(project)} aria-label={`${t.deleteButton}: ${project.title}`} title={t.deleteButton} className={cn(iconButton, 'text-destructive hover:bg-destructive/10 hover:text-destructive')}><Trash2 /></button>
      </div>
    </li>
  );
}
