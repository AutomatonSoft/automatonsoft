import { siteConfig } from '@/lib/site-config';

// Static export cannot query the database, so the portfolio is fetched from the public API at build time
// and rendered into the HTML for search engines; the browser still refreshes it on load.
const SNAPSHOT_URL = process.env.PORTFOLIO_SNAPSHOT_URL
  || (process.env.NODE_ENV === 'development' ? `${process.env.BACKEND_URL || 'http://127.0.0.1:8000'}/api/projects/` : `${siteConfig.url}/api/projects/`);

export async function loadProjectsSnapshot() {
  try {
    const response = await fetch(SNAPSHOT_URL, { signal: AbortSignal.timeout(8000), cache: 'force-cache' });
    if (!response.ok) return null;
    const { projects, categories } = await response.json();
    return Array.isArray(projects) && Array.isArray(categories) ? { projects, categories } : null;
  } catch {
    return null; // API unreachable during the build: the grid falls back to loading in the browser.
  }
}
