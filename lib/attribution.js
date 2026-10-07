// First-touch ad attribution kept for the browser session so leads can be tied to campaigns.
const STORAGE_KEY = 'as-attribution';
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'msclkid'];

function read() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || null; } catch { return null; }
}

export function captureAttribution() {
  if (read()) return;
  const params = new URLSearchParams(window.location.search);
  const data = Object.fromEntries(PARAMS.filter((key) => params.get(key)).map((key) => [key, params.get(key)]));
  data.landing_page = window.location.pathname;
  if (document.referrer && !document.referrer.startsWith(window.location.origin)) data.referrer = document.referrer;
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* storage unavailable: attribution is best effort */ }
}

export function getAttribution() {
  return read() || {};
}
