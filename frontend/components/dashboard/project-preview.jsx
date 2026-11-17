import { Eye, ImagePlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categoryName } from '@/components/dashboard/copy';

export default function ProjectPreview({ t, lang, preview, category, title, description, developmentTime, stack }) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-semibold tracking-widest text-slate-400"><Eye className="size-4" /> {t.preview}</div>
      <div className="aspect-[16/9] bg-gradient-to-br from-cyan-700 to-slate-900">
        {preview ? <img className="size-full object-cover" src={preview} alt={t.preview} /> : <div className="flex size-full items-center justify-center text-slate-300"><ImagePlus className="mr-2 size-5" /> {t.noScreenshot}</div>}
      </div>
      <div className="space-y-3 p-4">
        <p className="text-[10px] font-semibold tracking-widest text-cyan-300">{categoryName(category, lang)}</p>
        <h3 className="text-xl font-bold leading-tight">{title || t.projectName}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-300">{description || t.previewDescription}</p>
        <div className="flex flex-wrap gap-1.5"><Badge>{developmentTime || t.time}</Badge>{stack.map((item) => <Badge key={item}>{item}</Badge>)}</div>
      </div>
    </aside>
  );
}
