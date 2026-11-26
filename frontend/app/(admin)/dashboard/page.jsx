'use client';

import { useEffect, useRef, useState } from 'react';
import { LogOut } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageSwitch from '@/components/dashboard/language-switch';
import LeadsList from '@/components/dashboard/leads-list';
import LoginForm from '@/components/dashboard/login-form';
import ProjectForm from '@/components/dashboard/project-form';
import ProjectList from '@/components/dashboard/project-list';
import { container, eyebrow } from '@/components/dashboard/styles';
import Toast from '@/components/dashboard/toast';
import { useDashboard } from '@/components/dashboard/use-dashboard';

const emptyProject = { title: '', description: '', category: '', development_time: '', stack: [], published: true, screenshots: [], features: [], results: [] };

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1" role="tablist">
      {tabs.map(({ id, label, count }) => (
        <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => onChange(id)}
          className={cn('-mb-px border-b-2 px-4 py-3 text-sm font-bold', active === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
          {label} <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs tabular-nums">{count}</span>
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
  const listScroll = useRef(0);
  const editorOpen = Boolean(editing);

  // The editor starts at the top; closing it returns to the same place in the list.
  useEffect(() => { window.scrollTo(0, editorOpen ? 0 : listScroll.current); }, [editorOpen]);

  const open = (project) => { listScroll.current = window.scrollY; setEditing(project); };
  const toast = <Toast notice={notice} closeLabel={t.closeNotice} onClose={dashboard.dismissNotice} />;

  if (!user) return <LoginForm t={t} lang={lang} setLang={setLang} error={notice?.error ? notice.text : ''} onLogin={dashboard.login} />;

  const save = async (form) => {
    const saved = await dashboard.saveProject(form, editing);
    if (saved) setEditing(null);
    return saved;
  };

  return (
    <div lang={lang} className="min-h-screen bg-background pb-24">
      {editing && <ProjectForm key={editing.id || 'new'} project={editing} categories={categories} t={t} lang={lang} setLang={setLang} onSave={save} onClose={() => setEditing(null)} />}
      {/* Kept mounted while editing, so search, filter and tab are still there afterwards. */}
      <div hidden={editorOpen}>
        <header className="border-b border-border bg-card">
          <div className={cn(container, 'flex items-center justify-between gap-3 py-3')}>
            <div className="min-w-0"><p className={eyebrow}>AutomatonSoft</p><p className="truncate text-sm text-muted-foreground">Admin · {user}</p></div>
            <div className="flex items-center gap-2">
              <LanguageSwitch lang={lang} setLang={setLang} />
              <button type="button" onClick={dashboard.logout} aria-label={t.logout} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 min-w-10 bg-card')}><LogOut /> <span className="max-sm:hidden">{t.logout}</span></button>
            </div>
          </div>
          <div className={container}>
            <Tabs active={tab} onChange={setTab} tabs={[{ id: 'projects', label: t.tabProjects, count: projects.length }, { id: 'leads', label: t.tabLeads, count: leads.length }]} />
          </div>
        </header>
        <main className={cn(container, 'py-6')}>
          <div hidden={tab !== 'projects'}>
            <ProjectList projects={projects} t={t} lang={lang} onDelete={dashboard.deleteProject} onMove={dashboard.moveProject}
              onNew={() => open({ ...emptyProject, category: categories[0]?.value || '' })}
              onEdit={async (project) => open(await dashboard.refreshProject(project))} />
          </div>
          {tab === 'leads' && (
            <section className="space-y-4">
              <h1 className="text-2xl font-black text-ink sm:text-3xl">{t.leadsTitle}</h1>
              <LeadsList leads={leads} t={t} lang={lang} />
            </section>
          )}
        </main>
      </div>
      {toast}
    </div>
  );
}
