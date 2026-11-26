import { useEffect, useRef, useState } from 'react';

const read = () => window.location.hash.slice(1);

// The screen is part of the address (#new, #edit/12), so the browser's Back and Forward move between the list and the
// editor and a reload stays where it was. A hash needs no server route, which suits the static export.
export function useHashRoute() {
  const [route, setRoute] = useState('');
  const goingBack = useRef(false);

  useEffect(() => {
    const sync = () => { goingBack.current = false; setRoute(read()); };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = (next) => {
    if (read() === next) return;
    window.history.pushState({ fromList: true }, '', `#${next}`);
    setRoute(next);
  };

  // Back to the list. An entry this page added is taken back, so Back from the list does not reopen the editor;
  // after arriving by a link there is no list entry behind it, and the address is only cleaned up.
  const close = () => {
    if (!read() || goingBack.current) return;
    if (window.history.state?.fromList) {
      goingBack.current = true; // a second click must not go back twice and leave the dashboard
      window.history.back();
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setRoute('');
    }
  };

  return { route, open, close };
}
