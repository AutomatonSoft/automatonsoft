'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch, fetchProjects } from '@/lib/api';
import { copy } from '@/components/dashboard/copy';

const LANGUAGE_KEY = 'admin-language';

// Owns dashboard state and every API side effect; components stay presentational.
export function useDashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [leads, setLeads] = useState([]);
  const [notice, setNotice] = useState(null);
  const [lang, setLangState] = useState('de');
  const t = copy[lang];

  const say = (text, error = false) => setNotice({ text, error });
  const dismissNotice = useCallback(() => setNotice(null), []);

  const load = useCallback(async () => {
    const [projectResult, leadResult] = await Promise.all([fetchProjects(), apiFetch('/contact-requests/')]);
    if (projectResult.ok) { setProjects(projectResult.data.projects); setCategories(projectResult.data.categories); }
    if (leadResult.ok) setLeads(leadResult.data.requests);
  }, []);

  useEffect(() => {
    setLangState(localStorage.getItem(LANGUAGE_KEY) || 'de');
    apiFetch('/session/').then(({ data }) => { if (data?.authenticated) { setUser(data.username); load(); } });
  }, [load]);

  // Opening a project reloads the list first: a dashboard tab left open for a while (or an import run in between)
  // would otherwise show an old copy, and saving the form would write that old copy over the newer data.
  const refreshProject = async (project) => {
    const result = await fetchProjects();
    if (!result.ok) return project;
    setProjects(result.data.projects);
    setCategories(result.data.categories);
    return result.data.projects.find((item) => item.id === project.id) || project;
  };

  const setLang = (value) => { localStorage.setItem(LANGUAGE_KEY, value); setLangState(value); };

  const login = async (form) => {
    const { ok, data } = await apiFetch('/session/login/', { method: 'POST', json: { username: form.username.value, password: form.password.value } });
    if (!ok) return say(t.loginError, true);
    setUser(data.username); say(t.welcome); load();
  };

  const logout = async () => { await apiFetch('/session/logout/', { method: 'POST' }); setUser(null); setNotice(null); };

  const saveProject = async (form, project) => {
    const body = new FormData(form);
    body.set('published', form.published.checked ? 'true' : 'false');
    try {
      const { ok, status, data } = await apiFetch(`/projects/${project.id ? `${project.id}/update` : 'create'}/`, { method: 'POST', body });
      if (!ok) { say(`${t.saveError} (${data?.detail || `HTTP ${status}`})`, true); return false; }
    } catch {
      say(t.saveError, true);
      return false;
    }
    say(project.id ? t.updated : t.created);
    load();
    return true;
  };

  const deleteProject = async (project) => {
    if (!window.confirm(`„${project.title}“ ${t.confirmDelete}`)) return;
    const { ok } = await apiFetch(`/projects/${project.id}/delete/`, { method: 'DELETE' });
    say(ok ? t.deleted : t.deleteError, !ok);
    if (ok) load();
  };

  return { user, projects, categories, leads, notice, lang, t, setLang, login, logout, saveProject, deleteProject, refreshProject, dismissNotice };
}
