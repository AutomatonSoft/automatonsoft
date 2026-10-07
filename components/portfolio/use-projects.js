'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/api';

// Starts from the build-time snapshot when available and always refreshes from the live API.
export function useProjects(snapshot) {
  const [state, setState] = useState(snapshot ? { ...snapshot, loading: false } : { projects: [], categories: [], loading: true });
  useEffect(() => {
    fetchProjects().then(({ ok, data }) => setState((current) => (ok ? { projects: data.projects, categories: data.categories, loading: false } : { ...current, loading: false })));
  }, []);
  return state;
}
