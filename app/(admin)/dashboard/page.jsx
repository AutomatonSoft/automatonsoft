'use client';

import { useState } from 'react';
import { LogOut, Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import LanguageSwitch from '@/components/dashboard/language-switch';
import LeadsList from '@/components/dashboard/leads-list';
import LoginForm from '@/components/dashboard/login-form';
import ProjectForm from '@/components/dashboard/project-form';
import ProjectListItem from '@/components/dashboard/project-list-item';
import StatCards from '@/components/dashboard/stat-cards';
import { eyebrow, primaryButton } from '@/components/dashboard/styles';
import { useDashboard } from '@/components/dashboard/use-dashboard';

const emptyProject = { title: '', description: '', category: '', development_time: '', stack: [], published: true, screenshots: [] };

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 border-b border-white/10" role="tablist">
      {tabs.map(({ id, label, count }) => (
        <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => onChange(id)}
          className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${active === id ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
          {label} <span className="ml-1 text-xs text-slate-500">{count}</span>
        </button>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const dashboard = useDashboard();
  const { user, projects, categories, leads, notice, lang, t, setLang } = dashboard;
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState('projects');

  if (!user) return <LoginForm t={t} lang={lang} setLang={setLang} notice={notice} onLogin={dashboard.login} />;

  const published = projects.filter((project) => project.published).length;
  const save = async (form) => { if (await dashboard.saveProject(form, editing)) setEditing(null); };

  return (
    <main className="dark min-h-screen bg-slate-950 p-5 text-slate-100 md:p-9">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div><p className={eyebrow}>ADMIN · {user}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{t.projects}</h1><p className="mt-2 text-slate-400">{t.subtitle}</p></div>
          <div className="flex items-center gap-3">
            <LanguageSwitch lang={lang} setLang={setLang} />
            <button type="button" onClick={dashboard.logout} className={buttonVariants({ variant: 'outline', size: 'lg' })}><LogOut className="size-4" /> {t.logout}</button>
            <button type="button" onClick={() => { setTab('projects'); setEditing({ ...emptyProject, category: categories[0]?.value || '' }); }} className={primaryButton('lg')}><Plus className="size-4" /> {t.newProject}</button>
          </div>
        </header>
        <StatCards stats={[{ label: t.all, value: projects.length }, { label: t.live, value: published, highlight: true }, { label: t.drafts, value: projects.length - published }]} />
        {notice && <p className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100" role="status">{notice}</p>}
        <Tabs active={tab} onChange={setTab} tabs={[{ id: 'projects', label: t.tabProjects, count: projects.length }, { id: 'leads', label: t.tabLeads, count: leads.length }]} />
        {tab === 'leads' ? <LeadsList leads={leads} t={t} lang={lang} /> : (
          <>
            {editing && <ProjectForm key={editing.id || 'new'} project={editing} categories={categories} t={t} lang={lang} onSave={save} onCancel={() => setEditing(null)} />}
            <section>
              <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{t.allProjects}</h2><span className="text-sm text-slate-400">{projects.length} {t.entries}</span></div>
              <div className="grid gap-4 lg:grid-cols-2">
                {projects.map((project) => <ProjectListItem key={project.id} project={project} t={t} lang={lang} onEdit={setEditing} onDelete={dashboard.deleteProject} />)}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
