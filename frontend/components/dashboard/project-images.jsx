import { ImagePlus, RotateCcw, Star, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Card, Field } from '@/components/dashboard/field';
import { control } from '@/components/dashboard/styles';

const action = cn(buttonVariants({ variant: 'outline' }), 'h-10 bg-card px-3');

function Thumbnail({ url, label, badge, dimmed }) {
  return (
    <div className="relative">
      <a href={url} target="_blank" rel="noopener" className="block overflow-hidden rounded-lg border border-border bg-secondary">
        <img src={url} alt={label} loading="lazy" className={cn('aspect-[16/10] w-full object-cover', dimmed && 'opacity-30 grayscale')} />
      </a>
      {badge && <Badge className="absolute top-2 left-2">{badge}</Badge>}
    </div>
  );
}

// `pictures` are the saved ones in the order of the form (the first one kept is the cover): { id, remove, de, en }.
// `urls` gives their addresses by id; `added` are the addresses of the files picked but not yet saved.
export default function ProjectImages({ pictures, urls, onChange, added, onAdd, onDrop, t }) {
  const cover = pictures.find((picture) => !picture.remove)?.id;
  const change = (id, changes) => onChange(pictures.map((picture) => (picture.id === id ? { ...picture, ...changes } : picture)));
  const makeCover = (id) => onChange([pictures.find((picture) => picture.id === id), ...pictures.filter((picture) => picture.id !== id)]);

  return (
    <>
      <Card title={t.currentImages} hint={pictures.length ? t.captionHint : undefined}>
        {!pictures.length && <p className="text-sm text-muted-foreground">{t.noImages}</p>}
        <ul className="grid gap-4 md:grid-cols-2">
          {pictures.map((picture, index) => (
            <li key={picture.id} className="space-y-3 rounded-xl border border-border p-3">
              <Thumbnail url={urls[picture.id]} label={`${t.noScreenshot} ${index + 1}`} dimmed={picture.remove} badge={picture.remove ? t.willBeRemoved : picture.id === cover && t.cover} />
              {!picture.remove && ['de', 'en'].map((language) => (
                <Field key={language} name={`caption-${picture.id}-${language}`} label={`${t.caption} · ${language.toUpperCase()}`}>
                  <Input id={`caption-${picture.id}-${language}`} value={picture[language]} maxLength={300} className={control} onChange={(event) => change(picture.id, { [language]: event.target.value })} />
                </Field>
              ))}
              <div className="flex flex-wrap justify-end gap-2">
                {!picture.remove && picture.id !== cover && <button type="button" onClick={() => makeCover(picture.id)} className={cn(action, 'mr-auto text-primary')}><Star /> {t.makeCover}</button>}
                {picture.remove
                  ? <button type="button" onClick={() => change(picture.id, { remove: false })} className={action}><RotateCcw /> {t.keepImage}</button>
                  : <button type="button" onClick={() => change(picture.id, { remove: true })} aria-label={`${t.deleteButton}: ${t.noScreenshot} ${index + 1}`} title={t.deleteButton} className={cn(action, 'text-destructive hover:bg-destructive/10 hover:text-destructive')}><Trash2 /></button>}
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title={t.addImages} hint={t.imagesHint}>
        <label className="relative flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-input bg-background p-8 text-center font-bold text-primary focus-within:ring-3 focus-within:ring-ring/50 hover:border-primary">
          <ImagePlus className="size-7" />
          {t.chooseFiles}
          {/* Invisible but on top of the whole box, so clicking and dropping files both work. The selection lives in the
              form state (it outlasts the input), so the input is emptied and the same files can be picked again. */}
          <input type="file" accept="image/*" multiple aria-label={t.chooseFiles} className="absolute inset-0 cursor-pointer opacity-0" onChange={(event) => { onAdd([...event.target.files]); event.target.value = ''; }} />
        </label>
        {added.length > 0 && (
          <>
            <p className="text-sm font-semibold">{t.newImages}: {added.length}</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {added.map((url, index) => (
                <li key={url} className="relative">
                  <Thumbnail url={url} label={`${t.noScreenshot} ${index + 1}`} badge={cover === undefined && index === 0 && t.cover} />
                  <button type="button" onClick={() => onDrop(index)} aria-label={`${t.dropImage}: ${index + 1}`} title={t.dropImage} className="absolute top-2 right-2 grid size-9 place-items-center rounded-lg bg-card text-foreground shadow hover:text-destructive"><X className="size-4" /></button>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
    </>
  );
}
