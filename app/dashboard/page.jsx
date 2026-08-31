'use client';

import { useEffect, useState } from 'react';
import { Eye, ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const api = '/api';
const csrf = () => document.cookie.split('; ').find((item) => item.startsWith('csrftoken='))?.split('=')[1] || '';
const emptyProject = { title: '', description: '', category: '', development_time: '', stack: [], published: true, screenshots: [] };
const ruCategories = {
  'ecommerce-marketplace-automation': 'E-Commerce и маркетплейсы', 'workforce-hr-automation': 'Персонал и HR',
  'ai-business-solutions': 'AI-решения для бизнеса', 'supply-chain-warehouse': 'Логистика и склад',
  'industrial-ai-manufacturing': 'Промышленный AI', 'hospitality-hotel-software': 'Гостеприимство',
  'automotive-software': 'Автомобильные решения', 'finance-accounting-automation': 'Финансы и учёт',
  'custom-software-business-automation': 'Заказная разработка',
};
const copy = {
  de: { edit: 'PROJEKT BEARBEITEN', new: 'NEUES PROJEKT', createTitle: 'Portfolio-Projekt anlegen', cancel: 'Abbrechen', name: 'Name', category: 'Kategorie', time: 'Entwicklungszeit', stack: 'Stack', description: 'Beschreibung', screenshot: 'Screenshot', addImages: '(neue Bilder werden ergänzt)', public: 'Auf der öffentlichen Portfolio-Seite anzeigen', save: 'Projekt speichern', saveChanges: 'Änderungen speichern', published: 'Wird veröffentlicht', draft: 'Bleibt ein Entwurf', preview: 'LIVE-VORSCHAU', noScreenshot: 'Screenshot', projectName: 'Projektname', previewDescription: 'Die Beschreibung des Projekts erscheint hier.', projects: 'Portfolio verwalten', subtitle: 'Projekte bearbeiten, veröffentlichen und in der finalen Kartenansicht prüfen.', newProject: 'Neues Projekt', all: 'Alle Projekte', live: 'Veröffentlicht', drafts: 'Entwürfe', allProjects: 'Alle Projekte', entries: 'Einträge', publishedStatus: 'Veröffentlicht', draftStatus: 'Entwurf', editButton: 'Bearbeiten', deleteButton: 'Löschen', confirmDelete: 'endgültig löschen?', created: 'Projekt angelegt.', updated: 'Projekt aktualisiert.', deleted: 'Projekt gelöscht.', saveError: 'Projekt konnte nicht gespeichert werden.', deleteError: 'Projekt konnte nicht gelöscht werden.', loginTitle: 'Admin', loginHint: 'Mit einem Django-Administrator anmelden.', username: 'Benutzername', password: 'Passwort', login: 'Anmelden', loginError: 'Anmeldedaten ungültig.', welcome: 'Willkommen zurück.', language: 'DE' },
  ru: { edit: 'РЕДАКТИРОВАНИЕ ПРОЕКТА', new: 'НОВЫЙ ПРОЕКТ', createTitle: 'Создать проект для портфолио', cancel: 'Отмена', name: 'Название', category: 'Категория', time: 'Срок разработки', stack: 'Стек', description: 'Описание', screenshot: 'Скриншоты', addImages: '(новые изображения будут добавлены)', public: 'Показывать на публичной странице портфолио', save: 'Сохранить проект', saveChanges: 'Сохранить изменения', published: 'Будет опубликован', draft: 'Останется черновиком', preview: 'ПРЕДПРОСМОТР', noScreenshot: 'Скриншот', projectName: 'Название проекта', previewDescription: 'Здесь появится описание проекта.', projects: 'Управление портфолио', subtitle: 'Редактируйте, публикуйте проекты и проверяйте вид итоговой карточки.', newProject: 'Новый проект', all: 'Всего проектов', live: 'Опубликовано', drafts: 'Черновики', allProjects: 'Все проекты', entries: 'записей', publishedStatus: 'Опубликован', draftStatus: 'Черновик', editButton: 'Редактировать', deleteButton: 'Удалить', confirmDelete: 'удалить безвозвратно?', created: 'Проект создан.', updated: 'Проект обновлён.', deleted: 'Проект удалён.', saveError: 'Не удалось сохранить проект.', deleteError: 'Не удалось удалить проект.', loginTitle: 'Админка', loginHint: 'Войдите с учётной записью администратора Django.', username: 'Имя пользователя', password: 'Пароль', login: 'Войти', loginError: 'Неверные данные для входа.', welcome: 'Добро пожаловать.', language: 'RU' },
};
const categoryName = (project, lang) => lang === 'ru' ? ruCategories[project.category] || project.category_label : project.category_label;

function LanguageSwitch({ lang, setLang }) {
  return <div className="flex rounded-lg border border-white/15 p-1 text-xs font-bold"><button type="button" onClick={() => setLang('de')} className={`rounded px-2 py-1 ${lang === 'de' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}>DE</button><button type="button" onClick={() => setLang('ru')} className={`rounded px-2 py-1 ${lang === 'ru' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}>RU</button></div>;
}

function ProjectForm({ project, categories, lang, onSave, onCancel }) {
  const t = copy[lang];
  const [preview, setPreview] = useState(project.screenshots?.[0] || '');
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [category, setCategory] = useState(project.category || categories[0]?.value || '');
  const [developmentTime, setDevelopmentTime] = useState(project.development_time);
  const [stack, setStack] = useState(project.stack?.join(', ') || '');
  const [published, setPublished] = useState(project.published);
  const selectedCategory = categories.find((item) => item.value === category) || { category, category_label: '' };

  return <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-7">
    <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold tracking-[0.18em] text-cyan-300">{project.id ? t.edit : t.new}</p><h2 className="mt-1 text-2xl font-bold">{project.id ? project.title : t.createTitle}</h2></div><button type="button" onClick={onCancel} className={buttonVariants({ variant: 'outline' })}>{t.cancel}</button></div>
    <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={(event) => { event.preventDefault(); onSave(event.currentTarget); }}>
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>{t.name}</Label><Input name="title" value={title} onChange={(event) => setTitle(event.target.value)} required /></div>
        <div><Label>{t.category}</Label><select name="category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 h-8 w-full rounded-lg border border-input bg-background px-2 text-sm" required>{categories.map((item) => <option key={item.value} value={item.value}>{categoryName({ category: item.value, category_label: item.label }, lang)}</option>)}</select></div>
        <div><Label>{t.time}</Label><Input name="development_time" value={developmentTime} onChange={(event) => setDevelopmentTime(event.target.value)} placeholder="z. B. 12 Wochen" required /></div>
        <div><Label>{t.stack}</Label><Input name="stack" value={stack} onChange={(event) => setStack(event.target.value)} placeholder="Next.js, Django, Docker" /></div>
        <div className="md:col-span-2"><Label>{t.description}</Label><Textarea name="description" value={description} onChange={(event) => setDescription(event.target.value)} required /></div>
        <div className="md:col-span-2"><Label>{t.screenshot} {project.id ? t.addImages : ''}</Label><Input name="screenshots" type="file" accept="image/*" multiple onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} /></div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300"><input name="published" type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} className="size-4 accent-cyan-400" /><span>{t.public}</span></label>
        <div className="flex items-center gap-3"><button type="submit" className={`${buttonVariants()} !bg-cyan-400 !text-slate-950 hover:!bg-cyan-300`}>{project.id ? t.saveChanges : t.save}</button><span className="text-xs text-slate-400">{published ? t.published : t.draft}</span></div>
      </div>
      <aside className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950"><div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-semibold tracking-widest text-slate-400"><Eye className="size-4" /> {t.preview}</div><div className="aspect-[16/9] bg-gradient-to-br from-cyan-700 to-slate-900">{preview ? <img className="size-full object-cover" src={preview} alt={t.preview} /> : <div className="flex size-full items-center justify-center text-slate-300"><ImagePlus className="mr-2 size-5" /> {t.noScreenshot}</div>}</div><div className="space-y-3 p-4"><p className="text-[10px] font-semibold tracking-widest text-cyan-300">{categoryName(selectedCategory, lang)}</p><h3 className="text-xl font-bold leading-tight">{title || t.projectName}</h3><p className="line-clamp-3 text-sm leading-6 text-slate-300">{description || t.previewDescription}</p><div className="flex flex-wrap gap-1.5"><Badge>{developmentTime || t.time}</Badge>{stack.split(',').map((item) => item.trim()).filter(Boolean).map((item) => <Badge key={item}>{item}</Badge>)}</div></div></aside>
    </form>
  </section>;
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');
  const [lang, setLang] = useState('de');
  const t = copy[lang];
  const load = async () => { const result = await fetch(`${api}/projects/`, { credentials: 'include' }); const data = await result.json(); setProjects(data.projects || []); setCategories(data.categories || []); };
  useEffect(() => { setLang(localStorage.getItem('admin-language') || 'de'); fetch(`${api}/session/`, { credentials: 'include' }).then((result) => result.json()).then((data) => setUser(data.authenticated ? data.username : null)); load(); }, []);
  const chooseLanguage = (value) => { localStorage.setItem('admin-language', value); setLang(value); };
  const login = async (form) => { const result = await fetch(`${api}/session/login/`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf() }, body: JSON.stringify({ username: form.username.value, password: form.password.value }) }); if (result.ok) { setUser((await result.json()).username); setNotice(t.welcome); load(); } else setNotice(t.loginError); };
  const save = async (form) => { const isUpdate = Boolean(editing.id); const data = new FormData(form); data.set('published', form.published.checked ? 'true' : 'false'); const result = await fetch(`${api}/projects/${isUpdate ? `${editing.id}/update` : 'create'}/`, { method: 'POST', credentials: 'include', headers: { 'X-CSRFToken': csrf() }, body: data }); if (result.ok) { setNotice(isUpdate ? t.updated : t.created); setEditing(null); load(); } else setNotice(t.saveError); };
  const remove = async (project) => { if (!window.confirm(`„${project.title}“ ${t.confirmDelete}`)) return; const result = await fetch(`${api}/projects/${project.id}/delete/`, { method: 'DELETE', credentials: 'include', headers: { 'X-CSRFToken': csrf() } }); if (result.ok) { setNotice(t.deleted); load(); } else setNotice(t.deleteError); };

  if (!user) return <main className="dark min-h-screen bg-slate-950 p-6 text-slate-100"><section className="mx-auto mt-20 max-w-md rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold tracking-[0.18em] text-cyan-300">AUTOMATONSOFT</p><h1 className="mt-2 text-3xl font-bold">{t.loginTitle}</h1></div><LanguageSwitch lang={lang} setLang={chooseLanguage} /></div><p className="mt-2 text-sm text-slate-400">{t.loginHint}</p><form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); login(event.currentTarget); }}><Input name="username" placeholder={t.username} required /><Input name="password" type="password" placeholder={t.password} required /><button type="submit" className={`${buttonVariants()} !bg-cyan-400 !text-slate-950 hover:!bg-cyan-300`}>{t.login}</button><p className="text-sm text-red-400">{notice}</p></form></section></main>;

  const published = projects.filter((project) => project.published).length;
  return <main className="dark min-h-screen bg-slate-950 p-5 text-slate-100 md:p-9"><div className="mx-auto max-w-7xl space-y-6"><header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end"><div><p className="text-xs font-semibold tracking-[0.18em] text-cyan-300">ADMIN · {user}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{t.projects}</h1><p className="mt-2 text-slate-400">{t.subtitle}</p></div><div className="flex items-center gap-3"><LanguageSwitch lang={lang} setLang={chooseLanguage} /><button type="button" onClick={() => setEditing({ ...emptyProject, category: categories[0]?.value || '' })} className={`${buttonVariants({ size: 'lg' })} !bg-cyan-400 !text-slate-950 hover:!bg-cyan-300`}><Plus className="size-4" /> {t.newProject}</button></div></header>
    <section className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-slate-900 p-4"><p className="text-sm text-slate-400">{t.all}</p><p className="mt-1 text-3xl font-bold">{projects.length}</p></div><div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4"><p className="text-sm text-cyan-100/70">{t.live}</p><p className="mt-1 text-3xl font-bold text-cyan-300">{published}</p></div><div className="rounded-2xl border border-white/10 bg-slate-900 p-4"><p className="text-sm text-slate-400">{t.drafts}</p><p className="mt-1 text-3xl font-bold">{projects.length - published}</p></div></section>
    {editing && <ProjectForm key={editing.id || 'new'} project={editing} categories={categories} lang={lang} onSave={save} onCancel={() => setEditing(null)} />}
    {notice && <p className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">{notice}</p>}
    <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{t.allProjects}</h2><span className="text-sm text-slate-400">{projects.length} {t.entries}</span></div><div className="grid gap-4 lg:grid-cols-2">{projects.map((project) => <article key={project.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:border-cyan-400/40"><div className="grid sm:grid-cols-[180px_1fr]"><div className="aspect-[16/10] bg-slate-800">{project.screenshots[0] ? <img className="size-full object-cover" src={project.screenshots[0]} alt={project.title} /> : <div className="flex size-full items-center justify-center text-slate-500"><ImagePlus className="size-6" /></div>}</div><div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-widest text-cyan-300">{categoryName(project, lang)}</p><h3 className="mt-1 text-xl font-bold">{project.title}</h3></div><Badge className={project.published ? 'bg-cyan-400/15 text-cyan-200' : 'bg-slate-700 text-slate-300'}>{project.published ? t.publishedStatus : t.draftStatus}</Badge></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{project.description}</p><div className="mt-3 flex flex-wrap gap-1.5"><Badge>{project.development_time}</Badge>{project.stack.map((item) => <Badge key={item}>{item}</Badge>)}</div><div className="mt-4 flex gap-2"><button type="button" onClick={() => setEditing(project)} className={`${buttonVariants({ variant: 'outline' })} !border-slate-600 !bg-slate-700 !text-white hover:!bg-slate-600`}><Pencil className="size-3.5" /> {t.editButton}</button><button type="button" onClick={() => remove(project)} className={`${buttonVariants({ variant: 'destructive' })} !bg-red-500 !text-white hover:!bg-red-400`}><Trash2 className="size-3.5" /> {t.deleteButton}</button></div></div></div></article>)}</div></section>
  </div></main>;
}
