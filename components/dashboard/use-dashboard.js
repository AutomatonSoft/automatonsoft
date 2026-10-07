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
  const [notice, setNotice] = useState('');
  const [lang, setLangState] = useState('de');
  const t = copy[lang];

  const load = useCallback(async () => {
    const [projectResult, leadResult] = await Promise.all([fetchProjects(), apiFetch('/contact-requests/')]);
    if (projectResult.ok) { setProjects(projectResult.data.projects); setCategories(projectResult.data.categories); }
    if (leadResult.ok) setLeads(leadResult.data.requests);
  }, []);

  useEffect(() => {
    setLangState(localStorage.getItem(LANGUAGE_KEY) || 'de');
    apiFetch('/session/').then(({ data }) => { if (data?.authenticated) { setUser(data.username); load(); } });
  }, [load]);

  const setLang = (value) => { localStorage.setItem(LANGUAGE_KEY, value); setLangState(value); };

  const login = async (form) => {
    const { ok, data } = await apiFetch('/session/login/', { method: 'POST', json: { username: form.username.value, password: form.password.value } });
    if (!ok) return setNotice(t.loginError);
    setUser(data.username); setNotice(t.welcome); load();
  };

  const logout = async () => { await apiFetch('/session/logout/', { method: 'POST' }); setUser(null); setNotice(''); };

  const saveProject = async (form, project) => {
    const body = new FormData(form);
    body.set('published', form.published.checked ? 'true' : 'false');
    const { ok } = await apiFetch(`/projects/${project.id ? `${project.id}/update` : 'create'}/`, { method: 'POST', body });
    setNotice(ok ? (project.id ? t.updated : t.created) : t.saveError);
    if (ok) load();
    return ok;
  };

  const deleteProject = async (project) => {
    if (!window.confirm(`„${project.title}“ ${t.confirmDelete}`)) return;
    const { ok } = await apiFetch(`/projects/${project.id}/delete/`, { method: 'DELETE' });
    setNotice(ok ? t.deleted : t.deleteError);
    if (ok) load();
  };

  return { user, projects, categories, leads, notice, lang, t, setLang, login, logout, saveProject, deleteProject };
}
