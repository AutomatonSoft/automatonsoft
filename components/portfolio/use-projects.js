'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/api';

export function useProjects() {
  const [state, setState] = useState({ projects: [], categories: [], loading: true });
  useEffect(() => {
    fetchProjects().then(({ ok, data }) => setState({ projects: ok ? data.projects : [], categories: ok ? data.categories : [], loading: false }));
  }, []);
  return state;
}
