'use client';

import { useState } from 'react';

const links = [
  ['Unternehmen', '/unternehmen'], ['Leistungen', '/dienstleistungen'],
  ['Branchen', '/branchen'], ['Portfolio', '/portfolio'], ['Blog', '/blog'],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header"><div className="header-inner">
    <a href="/" className="brand"><img src="/assets/img/logo-icon.png" alt="AutomatonSoft Logo" /><span className="brand-name">Automaton<span>Soft</span></span></a>
    <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Hauptnavigation"><ul>{links.map(([label, href]) => <li key={href}><a href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a></li>)}<li className="nav-cta-mobile"><a href="/kontakt" className="nav-link" onClick={() => setMenuOpen(false)}>Kontakt aufnehmen</a></li></ul></nav>
    <div className="header-cta"><a href="tel:+4973929378410" className="tel"><span className="ic">☎</span><span className="tel-text">+49 7392 9378410</span></a><a href="/kontakt" className="btn btn-primary btn-sm">Kontakt aufnehmen</a><button className={`burger ${menuOpen ? 'open' : ''}`} type="button" aria-label="Menü öffnen" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button></div>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container"><div className="footer-top">
    <div><a href="/" className="brand"><img src="/assets/img/logo-icon.png" alt="AutomatonSoft Logo" style={{ height: 38 }} /><span className="brand-name">Automaton<span>Soft</span></span></a><p>Individuelle Softwareentwicklung, Web, Mobile und Automatisierung aus Burgrieden – für Unternehmen mit klarem Anspruch.</p></div>
    <div><h4>Unternehmen</h4><ul><li><a href="/unternehmen">Über uns</a></li><li><a href="/branchen">Branchen</a></li><li><a href="/blog">Blog</a></li></ul></div>
    <div><h4>Leistungen</h4><ul><li><a href="/dienstleistungen">Softwareentwicklung</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/entwickler-engagieren">Entwickler engagieren</a></li></ul></div>
    <div><h4>Kontakt</h4><ul><li><a href="mailto:info@automatonsoft.de">info@automatonsoft.de</a></li><li><a href="tel:+4973929378410">+49 7392 9378410</a></li><li>Am Flugplatz 28<br />88483 Burgrieden</li></ul></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} AutomatonSoft GmbH. Alle Rechte vorbehalten.</span><div className="legal-links"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/kontakt">Kontakt</a></div></div></div></footer>;
}
