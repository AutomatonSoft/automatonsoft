import { Eye, ImagePlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { categoryName } from '@/components/dashboard/copy';
import { eyebrow, panel } from '@/components/dashboard/styles';

export default function ProjectPreview({ t, lang, image, category, title, description, developmentTime, stack }) {
  return (
    <div className={cn(panel, 'overflow-hidden')}>
      <p className="flex items-center gap-2 border-b border-border px-4 py-3 text-xs font-bold tracking-widest text-muted-foreground uppercase"><Eye className="size-4" /> {t.preview}</p>
      <div className="aspect-[16/10] bg-foam">
        {image ? <img className="size-full object-cover" src={image} alt={t.preview} /> : <div className="flex size-full items-center justify-center gap-2 text-ink"><ImagePlus className="size-5" /> {t.noScreenshot}</div>}
      </div>
      <div className="space-y-3 p-4">
        <p className={eyebrow}>{categoryName(category, lang)}</p>
        <h3 className="text-xl leading-tight font-black text-ink">{title || t.projectName}</h3>
        <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">{description || t.previewDescription}</p>
        <div className="flex flex-wrap gap-1.5"><Badge>{developmentTime || t.time}</Badge>{stack.map((item, index) => <Badge key={`${item}-${index}`} variant="accent">{item}</Badge>)}</div>
      </div>
    </div>
  );
}
