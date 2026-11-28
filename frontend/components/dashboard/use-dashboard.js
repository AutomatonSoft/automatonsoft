'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { apiFetch, fetchProjects } from '@/lib/api';
import { copy } from '@/components/dashboard/copy';
import { removeDraft } from '@/components/dashboard/drafts';

const LANGUAGE_KEY = 'admin-language';
// How long the start may wait for the server before it shows what it has.
const PATIENCE = 10000;

// Owns dashboard state and every API side effect; components stay presentational.
export function useDashboard() {
  // undefined while the session is being checked, null when signed out.
  const [user, setUser] = useState(undefined);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [leads, setLeads] = useState([]);
  const [notice, setNotice] = useState(null);
  const [lang, setLangState] = useState('de');
  const langRef = useRef(lang);
  langRef.current = lang;
  const t = copy[lang];

  const say = (text, error = false) => setNotice({ text, error });
  const dismissNotice = useCallback(() => setNotice(null), []);

  // Any 401 from a staff endpoint means the Django session ended: return to LoginForm without losing drafts or hash.
  const authedFetch = useCallback(async (path, options) => {
    const result = await apiFetch(path, options);
    if (result.status === 401) {
      setUser(null);
      setNotice({ text: copy[langRef.current].sessionExpired, error: true });
    }
    return result;
  }, []);

  const load = useCallback(async () => {
    const [projectResult, leadResult] = await Promise.all([fetchProjects(), authedFetch('/contact-requests/')]);
    if (projectResult.ok) { setProjects(projectResult.data.projects); setCategories(projectResult.data.categories); }
    if (leadResult.ok) setLeads(leadResult.data.requests);
  }, [authedFetch]);

  // The data is fetched before the dashboard appears, so it does not open as an empty list.
  const enter = useCallback(async (username) => {
    await Promise.race([load().catch(() => {}), new Promise((resolve) => setTimeout(resolve, PATIENCE))]);
    setUser(username);
  }, [load]);

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) || 'de';
    setLangState(saved);
    apiFetch('/session/', { signal: AbortSignal.timeout(PATIENCE) }).catch(() => null).then((session) => {
      if (session?.data?.authenticated) return enter(session.data.username);
      if (!session?.ok) setNotice({ text: copy[saved].serverError, error: true });
      setUser(null);
    });
  }, [enter]);

  // Opening a project reloads the list first: a dashboard tab left open for a while (or an import run in between)
  // would otherwise show an old copy, and saving the form would write that old copy over the newer data.
  // If the request fails, the list already on screen is returned.
  const refresh = async () => {
    const result = await fetchProjects().catch(() => null);
    if (!result?.ok) return { projects, categories };
    setProjects(result.data.projects);
    setCategories(result.data.categories);
    return result.data;
  };

  const projectMissing = () => say(t.notFound, true);

  const setLang = (value) => { localStorage.setItem(LANGUAGE_KEY, value); setLangState(value); };

  const login = async (form) => {
    const { ok, data } = await apiFetch('/session/login/', { method: 'POST', json: { username: form.username.value, password: form.password.value } });
    if (!ok) return say(t.loginError, true);
    await enter(data.username);
    say(t.welcome);
  };

  const logout = async () => { await apiFetch('/session/logout/', { method: 'POST' }); setUser(null); setNotice(null); };

  const saveProject = async (form, project, files) => {
    const body = new FormData(form);
    body.set('published', form.published.checked ? 'true' : 'false');
    files.forEach((file) => body.append('screenshots', file));
    let saved;
    try {
      const { ok, status, data } = await authedFetch(`/projects/${project.id ? `${project.id}/update` : 'create'}/`, { method: 'POST', body });
      if (status === 401) return null;
      if (!ok) { say(`${t.saveError} (${data?.detail || `HTTP ${status}`})`, true); return null; }
      saved = data.project;
    } catch {
      say(t.saveError, true);
      return null;
    }
    say(project.id ? t.updated : t.created);
    load();
    return saved; // the project as the server has it now
  };

  const deleteProject = async (project) => {
    if (!window.confirm(`„${project.title}“ ${t.confirmDelete}`)) return;
    const { ok, status } = await authedFetch(`/projects/${project.id}/delete/`, { method: 'DELETE' });
    if (status === 401) return;
    say(ok ? t.deleted : t.deleteError, !ok);
    if (ok) { removeDraft(project.id); load(); }
  };

  // The list shows the new order at once. The requests go out one after another, because each move builds on the last,
  // and the list is reloaded when the last one is done.
  const moves = useRef(Promise.resolve());
  const moveProject = (project, place) => {
    setProjects((current) => {
      const next = current.filter((item) => item.id !== project.id);
      next.splice(place - 1, 0, project);
      return next.map((item, index) => ({ ...item, position: index + 1 }));
    });
    const request = moves.current.then(async () => {
      try {
        const { ok, status } = await authedFetch(`/projects/${project.id}/move/`, { method: 'POST', json: { place } });
        if (status === 401) return false;
        say(ok ? t.orderSaved : t.moveError, !ok);
        return true;
      } catch {
        say(t.moveError, true);
        return true;
      }
    });
    moves.current = request;
    request.then((keepGoing) => { if (keepGoing && moves.current === request) load(); });
  };

  const loadLeads = async () => {
    const result = await authedFetch('/contact-requests/').catch(() => null);
    if (result?.ok) setLeads(result.data.requests);
  };

  // A status shows at once. A note counts as saved only when the server says so: until then the card keeps the typed
  // text and tries again the next time the field is left. Changes go out one after another, in the order made.
  const leadWrites = useRef(Promise.resolve());
  const apply = (id, changes) => setLeads((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  const updateLead = (lead, changes) => {
    if (changes.status) apply(lead.id, changes);
    leadWrites.current = leadWrites.current.then(async () => {
      const result = await authedFetch(`/contact-requests/${lead.id}/update/`, { method: 'POST', json: changes }).catch(() => null);
      if (result?.status === 401) return;
      if (!result?.ok) { say(t.leadError, true); if (changes.status) await loadLeads(); return; }
      if ('note' in changes) apply(lead.id, { note: result.data.request.note });
      say(changes.status ? t.statusSaved : t.noteSaved);
    });
  };

  const deleteLead = async (lead) => {
    if (!window.confirm(`„${lead.name}“: ${t.confirmDeleteLead}`)) return;
    const result = await authedFetch(`/contact-requests/${lead.id}/delete/`, { method: 'DELETE' }).catch(() => null);
    if (result?.status === 401) return;
    say(result?.ok ? t.leadDeleted : t.leadDeleteError, !result?.ok);
    if (result?.ok) setLeads((current) => current.filter((item) => item.id !== lead.id));
  };

  return { user, projects, categories, leads, notice, lang, t, setLang, login, logout, saveProject, deleteProject, moveProject, refresh, projectMissing, loadLeads, updateLead, deleteLead, dismissNotice };
}
