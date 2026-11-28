import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { categoryName } from '@/components/dashboard/copy';
import { Card, Check, Field } from '@/components/dashboard/field';
import LanguageSwitch from '@/components/dashboard/language-switch';
import ProjectImages from '@/components/dashboard/project-images';
import ProjectPreview from '@/components/dashboard/project-preview';
import { container, control, gutter } from '@/components/dashboard/styles';
import { useProjectDraft } from '@/components/dashboard/use-project-draft';

const splitStack = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);
const platforms = [['web', 'Web'], ['desktop', 'Desktop'], ['mobile', 'Mobile']];
// The preview is a section of its own only on narrow screens; from xl it always stands next to the form.
const sections = [['main', 'sectionMain'], ['page', 'sectionPage'], ['images', 'sectionImages'], ['preview', 'sectionPreview']];

const formValues = (project, categories) => ({
  title: project.title, description: project.description, category: project.category || categories[0]?.value || '',
  development_time: project.development_time, stack: project.stack?.join(', ') || '', published: project.published, in_development: Boolean(project.in_development),
  platforms: platforms.map(([value]) => value).filter((value) => project.platforms?.includes(value)),
  description_en: project.translations?.en?.description || '', stack_en: project.translations?.en?.stack?.join(', ') || '',
  slug: project.slug || '', website: project.website || '', challenge: project.challenge || '',
  features: project.features?.join('\n') || '', results: project.results?.join('\n') || '',
  challenge_en: project.translations?.en?.challenge || '',
  features_en: project.translations?.en?.features?.join('\n') || '', results_en: project.translations?.en?.results?.join('\n') || '',
  own: Boolean(project.own), integrations: project.integrations?.join(', ') || '',
  pictures: (project.screenshot_ids || []).map((id, index) => ({ id, remove: false, de: project.screenshot_alts[index]?.de || '', en: project.screenshot_alts[index]?.en || '' })),
});

// A stored copy may list pictures that are gone by now, or miss ones added since: those stay as the server has them.
const mergeDraft = (base, stored) => {
  const saved = new Set(base.pictures.map((picture) => picture.id));
  const kept = (stored.pictures || []).filter((picture) => saved.has(picture.id));
  const known = new Set(kept.map((picture) => picture.id));
  return { ...base, ...stored, pictures: [...kept, ...base.pictures.filter((picture) => !known.has(picture.id))] };
};

export default function ProjectForm({ project, categories, t, lang, setLang, onSave, onClose }) {
  const { values, setValues, files, setFiles, copiedAt, dirty, found, restore, discard } = useProjectDraft(project, (source) => formValues(source, categories), mergeDraft);
  const [section, setSection] = useState('main');
  const [saving, setSaving] = useState(false);

  const added = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => added.forEach((url) => URL.revokeObjectURL(url)), [added]);

  const urls = Object.fromEntries((project.screenshot_ids || []).map((id, index) => [id, project.screenshots[index]]));
  // The same order as the server will keep: the first saved picture that stays, else the first new one.
  const cover = urls[values.pictures.find((picture) => !picture.remove)?.id] || added[0];

  const bind = (name) => ({ id: name, name, value: values[name], onChange: (event) => setValues({ ...values, [name]: event.target.value }) });
  const toggle = (name) => ({ name, checked: values[name], onChange: (event) => setValues({ ...values, [name]: event.target.checked }) });
  const togglePlatform = (platform, checked) => setValues({ ...values, platforms: platforms.map(([value]) => value).filter((value) => (value === platform ? checked : values.platforms.includes(value))) });
  const selected = categories.find((item) => item.value === values.category);
  const showSection = (id) => { setSection(id); window.scrollTo(0, 0); };
  const time = (stamp, options) => new Date(stamp).toLocaleString(lang, options);

  // The browser cannot point at a field in a hidden section, so open that section first (the form is noValidate).
  const submit = async (event) => {
    event.preventDefault();
    if (saving) return;
    const form = event.currentTarget;
    const invalid = form.querySelector('input:invalid, select:invalid, textarea:invalid');
    if (invalid) {
      flushSync(() => setSection(invalid.closest('[data-section]').dataset.section));
      invalid.scrollIntoView({ block: 'center' });
      invalid.reportValidity();
      return;
    }
    setSaving(true);
    await onSave(form, files);
    setSaving(false);
  };

  // German and English side by side; on a phone English follows right below German.
  const pair = (name, label, render) => (
    <div className="grid gap-4 md:grid-cols-2">
      <Field name={name} label={`${label} · DE`}>{render(name)}</Field>
      <Field name={`${name}_en`} label={`${label} · EN`}>{render(`${name}_en`)}</Field>
    </div>
  );
  const text = (className) => function textField(name) {
    return <Textarea {...bind(name)} required={name === 'description'} className={cn('bg-card', className)} />;
  };

  return (
    <form noValidate onSubmit={submit}>
      <header className={cn('sticky top-0 z-20 border-b border-border bg-card', gutter)}>
        <div className={cn(container, 'flex items-center gap-2 py-3 sm:gap-3')}>
          <button type="button" onClick={onClose} disabled={saving} aria-label={t.back} title={t.back} className={cn(buttonVariants({ variant: 'outline' }), 'size-10 bg-card')}><ArrowLeft /></button>
          <div className="min-w-0 flex-1">
            <p className={cn('truncate text-xs', dirty ? 'font-bold text-amber-700' : 'text-muted-foreground')} aria-live="polite">
              {dirty ? t.unsaved : project.id ? t.edit : t.new}
              {dirty && copiedAt && <span className="font-normal max-sm:hidden"> · {t.copyKept}, {time(copiedAt, { timeStyle: 'short' })}</span>}
            </p>
            <h1 className="truncate text-base font-black text-ink sm:text-xl">{values.title || t.projectName}</h1>
          </div>
          <div className="max-sm:hidden"><LanguageSwitch lang={lang} setLang={setLang} /></div>
          {/* The saved project's page, in a new tab so the editor stays. */}
          {project.slug && (
            <a href={`/portfolio/${project.slug}`} target="_blank" rel="noopener" aria-label={t.viewOnSite} title={t.viewOnSite} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 min-w-10 bg-card text-primary')}>
              <ExternalLink /> <span className="max-md:hidden">{t.viewOnSite}</span>
            </a>
          )}
          <button type="submit" disabled={saving || Boolean(found)} className={cn(buttonVariants({ size: 'xl' }), 'h-10 px-4 text-sm sm:px-6')}>{saving ? t.saving : t.save}</button>
        </div>
        <div className={cn(container, 'flex overflow-x-auto max-sm:px-1')} role="tablist" aria-label={t.sections}>
          {sections.map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={section === id} onClick={() => showSection(id)}
              className={cn('flex-auto border-b-2 px-1.5 py-2.5 text-[13px] font-bold whitespace-nowrap sm:flex-none sm:px-4 sm:text-sm', id === 'preview' && 'xl:hidden',
                section === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
                id === 'main' && section === 'preview' && 'xl:border-primary xl:text-primary')}>
              {t[label]}
            </button>
          ))}
        </div>
      </header>

      <div className={gutter}>
        {found && (
          <div className={cn(container, 'pt-6')}>
            <div role="alert" className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-950">
              <div className="min-w-0 flex-1 basis-64">
                <p className="font-bold">{t.draftFound} {time(found.savedAt, { dateStyle: 'short', timeStyle: 'short' })}</p>
                {found.outdated && <p className="mt-1 text-sm">{t.draftOutdated}</p>}
              </div>
              <button type="button" onClick={restore} className={cn(buttonVariants(), 'h-10 px-4')}>{t.restore}</button>
              <button type="button" onClick={discard} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 bg-card px-4')}>{t.discardCopy}</button>
            </div>
          </div>
        )}

        <div className={cn(container, 'grid items-start gap-6 py-6 xl:grid-cols-[minmax(0,1fr)_340px]')}>
        {/* Typing waits for the decision above: it would replace the copy that was found. */}
        <div className={cn('min-w-0', found && 'opacity-50')} inert={Boolean(found)}>
          {/* All sections stay in the form and are only hidden, so saving always sends every field. */}
          <div data-section="main" hidden={!['main', 'preview'].includes(section)} className={cn('space-y-4', section === 'preview' && 'max-xl:hidden')}>
            <Card>
              <div>
                <Check {...toggle('published')}>{t.public}</Check>
                <p className="pl-7.5 text-xs text-muted-foreground">{values.published ? t.published : t.draft}</p>
              </div>
              <Check {...toggle('in_development')} value="true">{t.inDevelopment}</Check>
              {/* An unchecked box sends nothing, and nothing means "leave as it is": the hidden field says "false". */}
              <Check checked={values.own} onChange={(event) => setValues({ ...values, own: event.target.checked })}>{t.own}</Check>
              <input type="hidden" name="own" value={String(values.own)} />
            </Card>
            <Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="title" label={t.name}><Input {...bind('title')} className={control} required /></Field>
                <Field name="category" label={t.category}>
                  <select {...bind('category')} className="h-10 w-full rounded-lg border border-input bg-card px-2 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm" required>
                    {categories.map((item) => <option key={item.value} value={item.value}>{categoryName({ category: item.value, category_label: item.label }, lang)}</option>)}
                  </select>
                </Field>
                <Field name="development_time" label={t.time}><Input {...bind('development_time')} className={control} placeholder={t.timeExample} required /></Field>
              </div>
              <fieldset className="flex flex-wrap items-center gap-x-6">
                <legend className="mb-1 text-sm font-semibold">{t.platforms}</legend>
                {platforms.map(([value, name]) => <Check key={value} name="platforms" value={value} checked={values.platforms.includes(value)} onChange={(event) => togglePlatform(value, event.target.checked)}>{name}</Check>)}
              </fieldset>
            </Card>
            <Card>
              {pair('description', t.description, text('min-h-28'))}
              {pair('stack', t.stack, (name) => <Input {...bind(name)} className={control} placeholder={name === 'stack' ? 'Next.js, Django, Docker' : 'Workflow automation, API integration'} />)}
              <p className="text-xs text-muted-foreground">{t.stackHint}</p>
            </Card>
          </div>

          <div data-section="page" hidden={section !== 'page'} className="space-y-4">
            <Card hint={t.landingHint}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="slug" label={t.slug}><Input {...bind('slug')} className={control} placeholder={t.slugHint} pattern="[a-z0-9\-]*" title={t.slugRule} autoCapitalize="none" /></Field>
                <Field name="website" label={t.website} hint={/^https?:\/\/\S+$/.test(values.website) && <a href={values.website} target="_blank" rel="noopener" className="inline-flex items-center gap-1 py-1 text-sm font-semibold text-primary hover:underline">{t.openWebsite} <ExternalLink className="size-3.5" /></a>}><Input {...bind('website')} className={control} type="url" placeholder="https://" /></Field>
              </div>
              <Field name="integrations" label={t.integrations} hint={t.integrationsHint}><Input {...bind('integrations')} className={control} placeholder="Afterbuy, Klarna" /></Field>
              {pair('challenge', t.challenge, text('min-h-24'))}
              {pair('features', t.features, text('min-h-40'))}
              {pair('results', t.results, text('min-h-24'))}
            </Card>
          </div>

          <div data-section="images" hidden={section !== 'images'} className="space-y-4">
            <ProjectImages pictures={values.pictures} urls={urls} onChange={(pictures) => setValues({ ...values, pictures })}
              added={added} onAdd={(picked) => setFiles([...files, ...picked])} onDrop={(index) => setFiles(files.filter((_, other) => other !== index))} t={t} />
            <input type="hidden" name="pictures" value={JSON.stringify(values.pictures.map(({ id, remove, de, en }) => ({ id, remove, alt: { de, en } })))} />
          </div>
        </div>

        <aside className={cn('xl:sticky xl:top-36 xl:block', section !== 'preview' && 'hidden')}>
          <ProjectPreview t={t} lang={lang} image={cover} category={{ category: values.category, category_label: selected?.label || '' }}
            title={values.title} description={values.description} developmentTime={values.development_time} stack={splitStack(values.stack)} />
        </aside>
        </div>
      </div>
    </form>
  );
}
