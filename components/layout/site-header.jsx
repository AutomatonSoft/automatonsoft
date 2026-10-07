'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Client island: scroll state and the mobile menu live here; links and labels are resolved on the server.
export default function SiteHeader({ brand, links, labels, contactHref }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="header-inner">
        {brand}
        <nav id="site-nav" className={`nav ${menuOpen ? 'open' : ''}`} aria-label={labels.nav}>
          <ul>
            {links.map(({ label, href, current }) => (
              <li key={href}><a href={href} className={`nav-link ${current ? 'current' : ''}`} aria-current={current ? 'page' : undefined} onClick={close}>{label}</a></li>
            ))}
            <li className="nav-cta-mobile"><a href={contactHref} className="btn btn-primary" onClick={close}>{labels.cta}</a></li>
          </ul>
        </nav>
        <button type="button" className={`nav-backdrop ${menuOpen ? 'open' : ''}`} aria-label={labels.closeMenu} tabIndex={-1} onClick={close} />
        <div className="header-cta">
          <a href={contactHref} className="btn btn-primary btn-sm">{labels.cta}<ArrowRight aria-hidden="true" /></a>
          <button className={`burger ${menuOpen ? 'open' : ''}`} type="button" aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
      </div>
    </header>
  );
}
