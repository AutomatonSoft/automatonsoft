'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { fetchProjects } from '@/lib/api';
import { localizeProject } from '@/lib/portfolio';
import { siteConfig } from '@/lib/site-config';
import ButtonLink from '@/components/sections/button-link';
import CtaBand from '@/components/sections/cta-band';
import PageHero from '@/components/sections/page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import CaseStudy from '@/components/portfolio/case-study';

// Renders the build-time snapshot immediately and refreshes from the API, so dashboard edits show up
// before the next deploy. Without a slug (fallback page for new projects) it is read from the URL.
export default function ProjectLanding({ locale, slug, initial, links, labels }) {
  const [project, setProject] = useState(initial || undefined); // undefined: loading, null: not found

  useEffect(() => {
    const current = slug || decodeURIComponent(window.location.pathname.split('/').pop());
    fetchProjects().then(({ ok, data }) => setProject((previous) => (ok ? data.projects.find((item) => item.slug === current) || null : previous ?? null)));
  }, [slug]);

  useEffect(() => {
    if (project && !slug) document.title = `${project.title} | ${siteConfig.shortName}`;
  }, [project, slug]);

  if (project === undefined) return <Section><div className="project-skeleton" aria-busy="true" aria-label={labels.loading} /></Section>;
  if (project === null) {
    return <Section><SectionHead title={labels.notFound} /><ButtonLink href={links.portfolio} arrow>{labels.back}</ButtonLink></Section>;
  }

  const p = localizeProject(project, locale);
  const [cover, ...gallery] = p.screenshots;
  const category = labels.categories[p.category] || p.category_label;
  const contact = <ButtonLink href={links.contact} variant={p.website ? 'outline-dark' : 'primary'} arrow={!p.website}>{labels.similar}</ButtonLink>;
  const study = {
    title: p.challenge ? labels.challenge : labels.overview, text: p.challenge,
    delivered: p.features, url: p.website, visit: labels.visit, brand: p.title, tag: category,
    facts: [{ label: labels.category, value: category }, ...(p.development_time && p.development_time !== '—' ? [{ label: labels.time, value: p.development_time }] : [])],
    stackLabel: labels.stack, stack: p.stack, image: cover && { src: cover, alt: p.title },
  };

  return (
    <>
      <PageHero homeHref={links.home} homeLabel={labels.home} crumb={<><a href={links.portfolio}>{labels.portfolio}</a> / {p.title}</>} title={p.title} intro={p.description}
        actions={p.website && <a className="btn btn-primary" href={p.website} target="_blank" rel="noopener">{labels.visit}<ArrowUpRight className="btn-arrow" aria-hidden="true" /></a>} />
      <Section>
        <CaseStudy study={study} deliveredLabel={p.features.length ? labels.features : ''} similarCta={contact} />
      </Section>
      {p.results.length > 0 && (
        <Section tone="pale">
          <SectionHead title={labels.results} />
          <ul className="card-points case-delivered">{p.results.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
        </Section>
      )}
      {gallery.length > 0 && (
        <Section>
          <SectionHead title={labels.gallery} />
          <div className="grid grid-2">
            {gallery.map((src) => <figure key={src} className="case-media"><img src={src} alt={p.title} loading="lazy" decoding="async" /></figure>)}
          </div>
        </Section>
      )}
      <Section>
        <CtaBand title={labels.ctaTitle} text={labels.ctaText} actions={[{ href: links.contact, label: labels.similar }, { href: links.portfolio, label: labels.back, variant: 'outline' }]} />
      </Section>
    </>
  );
}
