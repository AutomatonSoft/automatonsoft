import { ImagePlus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { categoryName } from '@/components/dashboard/copy';

export default function ProjectListItem({ project, t, lang, onEdit, onDelete }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:border-cyan-400/40">
      <div className="grid sm:grid-cols-[180px_1fr]">
        <div className="aspect-[16/10] bg-slate-800">
          {project.screenshots[0] ? <img className="size-full object-cover" src={project.screenshots[0]} alt={project.title} /> : <div className="flex size-full items-center justify-center text-slate-500"><ImagePlus className="size-6" /></div>}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-xs font-semibold tracking-widest text-cyan-300">{categoryName(project, lang)}</p><h3 className="mt-1 text-xl font-bold">{project.title}</h3></div>
            <Badge className={project.published ? 'bg-cyan-400/15 text-cyan-200' : 'bg-slate-700 text-slate-300'}>{project.published ? t.publishedStatus : t.draftStatus}</Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5"><Badge>{project.development_time}</Badge>{project.stack.map((item) => <Badge key={item}>{item}</Badge>)}</div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => onEdit(project)} className={`${buttonVariants({ variant: 'outline' })} !border-slate-600 !bg-slate-700 !text-white hover:!bg-slate-600`}><Pencil className="size-3.5" /> {t.editButton}</button>
            <button type="button" onClick={() => onDelete(project)} className={`${buttonVariants({ variant: 'destructive' })} !bg-red-500 !text-white hover:!bg-red-400`}><Trash2 className="size-3.5" /> {t.deleteButton}</button>
          </div>
        </div>
      </div>
    </article>
  );
}
