'use client';

import { useEffect, useRef, useState } from 'react';
import { LogOut } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { removeDraft, wouldLoseWork } from '@/components/dashboard/drafts';
import LanguageSwitch from '@/components/dashboard/language-switch';
import LeadsList from '@/components/dashboard/leads-list';
import LoadingScreen from '@/components/dashboard/loading-screen';
import LoginForm from '@/components/dashboard/login-form';
import ProjectForm from '@/components/dashboard/project-form';
import ProjectList from '@/components/dashboard/project-list';
import { container, eyebrow, gutter } from '@/components/dashboard/styles';
import Toast from '@/components/dashboard/toast';
import { useDashboard } from '@/components/dashboard/use-dashboard';
import { useHashRoute } from '@/components/dashboard/use-hash-route';

const emptyProject = { title: '', description: '', category: '', development_time: '', stack: [], published: true, screenshots: [], features: [], results: [] };
const routeOf = (project) => (project.id ? `edit/${project.id}` : 'new');

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1" role="tablist">
      {tabs.map(({ id, label, count, alert, hint }) => (
        <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => onChange(id)}
          className={cn('-mb-px border-b-2 px-4 py-3 text-sm font-bold', active === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
          {label} {count > 0 && <span title={hint && `${hint}: ${count}`} className={cn('ml-1 rounded-full px-2 py-0.5 text-xs tabular-nums', alert ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>{count}{hint && <span className="sr-only"> ({hint})</span>}</span>}
        </button>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const dashboard = useDashboard();
  const { user, projects, categories, leads, notice, lang, t, setLang } = dashboard;
  const { route, open, replace, close } = useHashRoute();
  // The open editor: its project, and a key that stays while the editor does (also when a new project gets its id).
  const [editing, setEditing] = useState(null);
  const listScroll = useRef(0);
  const arrived = useRef(false);
  const editorOpen = Boolean(editing) && routeOf(editing.project) === route;
  // The requests tab is part of the address like the editor, so a reload stays on it and Back returns to the portfolio.
  const tab = route === 'leads' ? 'leads' : 'projects';

  // The address says which editor to show. Its project is fetched first, so the form starts from current data.
  useEffect(() => {
    if (editorOpen) return undefined; // a new project was just saved and its editor is here already
    setEditing(null);
    const id = route.match(/^edit\/(\d+)$/)?.[1];
    if (!user || (route !== 'new' && !id)) return undefined;
    let outdated = false;
    dashboard.refresh().then((data) => {
      if (outdated) return;
      const project = id
        ? data.projects.find((item) => String(item.id) === id)
        : { ...emptyProject, category: data.categories[0]?.value || '' };
      if (project) setEditing({ project, key: route });
      else { dashboard.projectMissing(); close(); }
    });
    return () => { outdated = true; };
  }, [user, route]);

  // Requests arrive while the dashboard is open, so opening their tab fetches them again.
  useEffect(() => { if (user && route === 'leads') dashboard.loadLeads(); }, [route]);

  // The editor starts at the top; closing it returns to the same place in the list.
  useEffect(() => { window.scrollTo(0, editorOpen ? 0 : listScroll.current); }, [editorOpen]);

  // Typed text survives a reload; the browser only has to ask while something would really be lost.
  useEffect(() => {
    const warn = (event) => {
      if (!wouldLoseWork()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, []);

  const show = (next) => { listScroll.current = window.scrollY; open(next); };
  const toast = <Toast notice={notice} closeLabel={t.closeNotice} onClose={dashboard.dismissNotice} />;

  // Arriving straight on an editor (reload, link), wait for it instead of showing the list for a moment.
  const waitingForEditor = !arrived.current && /^(new|edit\/\d+)$/.test(route) && !editorOpen;

  if (user === null) return <LoginForm t={t} lang={lang} setLang={setLang} error={notice?.error ? notice.text : ''} onLogin={dashboard.login} />;
  if (!user || waitingForEditor) return <LoadingScreen label={t.loading} />;
  arrived.current = true;

  // Saving stays in the editor, which then shows the project as the server has it.
  const save = async (form, files) => {
    const { project, key } = editing;
    const saved = await dashboard.saveProject(form, project, files);
    if (!saved) return;
    removeDraft(project.id || 'new');
    // Only if the user has not gone elsewhere while the request was running.
    if (window.location.hash !== `#${routeOf(project)}`) return;
    setEditing({ project: saved, key });
    if (!project.id) replace(routeOf(saved)); // a new project has an address of its own from now on
  };

  const newLeads = leads.filter((lead) => lead.status === 'new').length;

  return (
    <div lang={lang} className="min-h-screen bg-background pb-24">
      {editorOpen && <ProjectForm key={editing.key} project={editing.project} categories={categories} t={t} lang={lang} setLang={setLang} onSave={save} onClose={close} />}
      {/* Kept mounted while editing, so search, filter and tab are still there afterwards. */}
      <div hidden={editorOpen}>
        <header className={cn('border-b border-border bg-card', gutter)}>
          <div className={cn(container, 'flex items-center justify-between gap-3 py-3')}>
            <div className="min-w-0"><p className={eyebrow}>AutomatonSoft</p><p className="truncate text-sm text-muted-foreground">Admin · {user}</p></div>
            <div className="flex items-center gap-2">
              <LanguageSwitch lang={lang} setLang={setLang} />
              <button type="button" onClick={dashboard.logout} aria-label={t.logout} className={cn(buttonVariants({ variant: 'outline' }), 'h-10 min-w-10 bg-card')}><LogOut /> <span className="max-sm:hidden">{t.logout}</span></button>
            </div>
          </div>
          <div className={container}>
            <Tabs active={tab} onChange={(next) => (next === 'leads' ? open('leads') : close())}
              tabs={[{ id: 'projects', label: t.tabProjects, count: projects.length }, { id: 'leads', label: t.tabLeads, count: newLeads, alert: true, hint: t.newLeads }]} />
          </div>
        </header>
        <div className={gutter}>
          <main className={cn(container, 'py-6')}>
            <div hidden={tab !== 'projects'}>
              <ProjectList projects={projects} t={t} lang={lang} onDelete={dashboard.deleteProject} onMove={dashboard.moveProject}
                onNew={() => show('new')} onEdit={(project) => show(routeOf(project))} />
            </div>
            {/* Hidden rather than removed, so search, filter and a note being typed survive a look at the portfolio. */}
            <section hidden={tab !== 'leads'} className="space-y-4">
              <h1 className="text-2xl font-black text-ink sm:flex sm:min-h-11 sm:items-center sm:text-3xl">{t.leadsTitle}</h1>
              <LeadsList leads={leads} t={t} lang={lang} onChange={dashboard.updateLead} onDelete={dashboard.deleteLead} />
            </section>
          </main>
        </div>
      </div>
      {toast}
    </div>
  );
}
