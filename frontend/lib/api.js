// Thin client for the Django API (same origin in production, proxied by next dev locally).
const API_BASE = '/api';

function csrfToken() {
  return document.cookie.split('; ').find((item) => item.startsWith('csrftoken='))?.split('=')[1] || '';
}

export async function apiFetch(path, { method = 'GET', json, body, ...options } = {}) {
  const headers = { ...options.headers };
  if (method !== 'GET') headers['X-CSRFToken'] = csrfToken();
  if (json !== undefined) headers['Content-Type'] = 'application/json';
  const response = await fetch(`${API_BASE}${path}`, { ...options, method, headers, credentials: 'include', body: json !== undefined ? JSON.stringify(json) : body });
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, data };
}

export const fetchProjects = () => apiFetch('/projects/');
