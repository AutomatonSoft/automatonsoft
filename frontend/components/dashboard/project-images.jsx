import { ImagePlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/dashboard/field';

// `cover` is the index of the picture the site shows first, or -1 when none of these will be it.
function Thumbnails({ urls, cover, t }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {urls.map((url, index) => (
        <li key={url} className="relative">
          <a href={url} target="_blank" rel="noopener" className="block overflow-hidden rounded-lg border border-border bg-secondary">
            <img src={url} alt={`${t.noScreenshot} ${index + 1}`} loading="lazy" className="aspect-[16/10] w-full object-cover" />
          </a>
          {index === cover && <Badge className="absolute top-2 left-2">{t.cover}</Badge>}
        </li>
      ))}
    </ul>
  );
}

// Saved pictures come newest first and the newest one is the cover, so among new files the last selected wins.
export default function ProjectImages({ saved, added, onSelect, t }) {
  return (
    <>
      <Card title={t.currentImages}>
        {saved.length ? <Thumbnails urls={saved} cover={added.length ? -1 : 0} t={t} /> : <p className="text-sm text-muted-foreground">{t.noImages}</p>}
      </Card>
      <Card title={t.addImages} hint={t.imagesHint}>
        <label className="relative flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-input bg-background p-8 text-center font-bold text-primary focus-within:ring-3 focus-within:ring-ring/50 hover:border-primary">
          <ImagePlus className="size-7" />
          {t.chooseFiles}
          {/* Invisible but on top of the whole box, so clicking and dropping files both work. The selection lives in the
              form state (it outlasts the input), so the input is emptied and the same files can be picked again. */}
          <input type="file" accept="image/*" multiple aria-label={t.chooseFiles} className="absolute inset-0 cursor-pointer opacity-0" onChange={(event) => { onSelect([...event.target.files]); event.target.value = ''; }} />
        </label>
        {added.length > 0 && (
          <>
            <p className="text-sm font-semibold">{t.newImages}: {added.length}</p>
            <Thumbnails urls={added} cover={added.length - 1} t={t} />
          </>
        )}
      </Card>
    </>
  );
}
