import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { categoryName } from '@/components/dashboard/copy';
import ProjectPreview from '@/components/dashboard/project-preview';
import { eyebrow, primaryButton } from '@/components/dashboard/styles';

const splitStack = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

export default function ProjectForm({ project, categories, t, lang, onSave, onCancel }) {
  const [values, setValues] = useState({
    title: project.title, description: project.description, category: project.category || categories[0]?.value || '',
    development_time: project.development_time, stack: project.stack?.join(', ') || '', published: project.published,
    description_en: project.translations?.en?.description || '', stack_en: project.translations?.en?.stack?.join(', ') || '',
  });
  const [preview, setPreview] = useState(project.screenshots?.[0] || '');
  const bind = (name) => ({ name, value: values[name], onChange: (event) => setValues({ ...values, [name]: event.target.value }) });
  const selected = categories.find((item) => item.value === values.category);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div><p className={eyebrow}>{project.id ? t.edit : t.new}</p><h2 className="mt-1 text-2xl font-bold">{project.id ? project.title : t.createTitle}</h2></div>
        <button type="button" onClick={onCancel} className={buttonVariants({ variant: 'outline' })}>{t.cancel}</button>
      </div>
      <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={(event) => { event.preventDefault(); onSave(event.currentTarget); }}>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>{t.name}</Label><Input {...bind('title')} required /></div>
          <div>
            <Label>{t.category}</Label>
            <select {...bind('category')} className="mt-1 h-8 w-full rounded-lg border border-input bg-background px-2 text-sm" required>
              {categories.map((item) => <option key={item.value} value={item.value}>{categoryName({ category: item.value, category_label: item.label }, lang)}</option>)}
            </select>
          </div>
          <div><Label>{t.time}</Label><Input {...bind('development_time')} placeholder="z. B. 12 Wochen" required /></div>
          <div><Label>{t.stack}</Label><Input {...bind('stack')} placeholder="Next.js, Django, Docker" /></div>
          <div className="md:col-span-2"><Label>{t.description}</Label><Textarea {...bind('description')} required /></div>
          <div className="md:col-span-2"><Label>{t.descriptionEn}</Label><Textarea {...bind('description_en')} /></div>
          <div className="md:col-span-2"><Label>{t.stackEn}</Label><Input {...bind('stack_en')} placeholder="Workflow automation, API integration" /></div>
          <div className="md:col-span-2">
            <Label>{t.screenshot} {project.id ? t.addImages : ''}</Label>
            <Input name="screenshots" type="file" accept="image/*" multiple onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} />
          </div>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
            <input name="published" type="checkbox" checked={values.published} onChange={(event) => setValues({ ...values, published: event.target.checked })} className="size-4 accent-cyan-400" />
            <span>{t.public}</span>
          </label>
          <div className="flex items-center gap-3">
            <button type="submit" className={primaryButton()}>{project.id ? t.saveChanges : t.save}</button>
            <span className="text-xs text-slate-400">{values.published ? t.published : t.draft}</span>
          </div>
        </div>
        <ProjectPreview t={t} lang={lang} preview={preview} category={{ category: values.category, category_label: selected?.label || '' }}
          title={values.title} description={values.description} developmentTime={values.development_time} stack={splitStack(values.stack)} />
      </form>
    </section>
  );
}
