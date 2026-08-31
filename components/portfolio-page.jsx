'use client';

import { useEffect, useState } from 'react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('alle');
  useEffect(() => { fetch('/api/projects/').then((response) => response.ok ? response.json() : { projects: [], categories: [] }).then((data) => { setProjects(data.projects || []); setCategories(data.categories || []); }); }, []);
  const visibleProjects = active === 'alle' ? projects : projects.filter((project) => project.category === active);
  return <><SiteHeader /><main>
    <section className="page-hero"><div className="hex-pattern" /><div className="container"><div className="breadcrumb"><a href="/">Start</a> / Portfolio</div><h1>Software. Automation. Artificial Intelligence.</h1><p>Unser Portfolio gliedert sich in neun Kategorien – von E-Commerce-Automatisierung über Workforce-Management bis zu Industrial AI.</p></div></section>
    <section className="section-pad"><div className="container"><div className="badge-note" style={{ marginBottom: 36 }}>Hinweis: Unser Portfolio wächst kontinuierlich. Lösungen ohne vollständige Beschreibung sind als „In Vorbereitung“ gekennzeichnet. KI-Erweiterungen in Konzeptphase sind als „Konzept“ ausgewiesen.</div><div className="filter-bar">{[{ value: 'alle', label: 'Alle Lösungen' }, ...categories].map((category) => <button type="button" key={category.value} className={`filter-btn ${active === category.value ? 'active' : ''}`} onClick={() => setActive(category.value)}>{category.label}</button>)}</div><div className="grid grid-3" id="portfolio-grid">{visibleProjects.map((project) => <article className="project-card" data-category={project.category} key={project.id}><div className="project-thumb">{project.screenshots[0] ? <img src={project.screenshots[0]} alt={project.title} /> : <><div className="hex-pattern" /><span>{project.title}</span></>}</div><div className="project-body"><div className="project-tag">{project.category_label}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-meta"><span>{project.development_time}</span>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</div></div></section>
    <section className="section-pad bg-pale"><div className="container"><div className="cta-band"><div className="hex-pattern" /><h2>Ihre Anforderung passt in keine Kategorie?</h2><p>Wir entwickeln individuelle Software für Geschäftsprozesse, die über unser bestehendes Portfolio hinausgehen.</p><div className="cta-actions"><a href="/kontakt" className="btn btn-primary">Projekt anfragen</a></div></div></div></section>
  </main><SiteFooter /></>;
}
