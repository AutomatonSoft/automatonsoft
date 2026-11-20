'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { fetchProjects } from '@/lib/api';
import { localizeProject } from '@/lib/portfolio';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import CtaBand from '@/components/landing/cta-band';
import { PageHead } from '@/components/landing/shell';
import { block, button, Section, Title, tone, pill } from '@/components/landing/blocks';

// One portfolio project in design E. Renders the build-time snapshot immediately and refreshes from the API,
// so dashboard edits show up before the next deploy. Without a slug (fallback page) it is read from the URL.
export default function ProjectView({ locale, slug, initial, links, labels }) {
  const [project, setProject] = useState(initial || undefined); // undefined: loading, null: not found

  useEffect(() => {
    const current = slug || decodeURIComponent(window.location.pathname.split('/').pop());
    fetchProjects().then(({ ok, data }) => setProject((previous) => (ok ? data.projects.find((item) => item.slug === current) || null : previous ?? null)));
  }, [slug]);

  useEffect(() => {
    if (project && !slug) document.title = `${project.title} | ${siteConfig.shortName}`;
  }, [project, slug]);

  if (project === undefined) {
    return <Section><div className={cn(block, 'h-96 animate-pulse bg-secondary motion-reduce:animate-none')} aria-busy="true" aria-label={labels.loading} /></Section>;
  }
  if (project === null) {
    return (
      <Section>
        <Title parts={labels.notFound} />
        <p className="mt-8"><a href={links.portfolio} className={cn(button, 'bg-primary text-primary-foreground')}>{labels.back} →</a></p>
      </Section>
    );
  }

  const p = localizeProject(project, locale);
  const [cover, ...gallery] = p.screenshots;
  const alts = (p.screenshot_alts || []).map((alt) => alt?.[locale] || alt?.de || p.title);
  const category = labels.categories[p.category] || p.category_label;
  const time = p.development_time && p.development_time !== '—' ? p.development_time : null;
  const facts = [[labels.category, category], ...(time ? [[labels.time, time]] : [])];

  return (
    <>
      <PageHead tags={[{ label: `← ${labels.portfolio}`, href: links.portfolio }, { label: category }, ...(p.own ? [{ label: labels.own }] : [])]} title={p.title} lead={p.description}
        actions={(
          <>
            {p.website && <a href={p.website} target="_blank" rel="noopener" className={cn(button, 'gap-2 bg-primary text-primary-foreground')}>{labels.visit}<ArrowUpRight aria-hidden="true" className="size-5" /></a>}
            <a href={links.contact} className={cn(button, p.website ? 'bg-foam text-ink' : 'bg-primary text-primary-foreground')}>{labels.similar}</a>
          </>
        )} />

      {cover && (
        <section className="mx-auto mt-12 w-full max-w-[1200px] px-4 sm:px-6">
          <figure className={cn(block, 'relative overflow-hidden bg-primary px-5 pt-6 sm:px-9 sm:pt-9')}>
            <div aria-hidden="true" className="absolute -top-24 -right-24 size-75 rounded-full border-[50px] border-white/22" />
            <img src={cover} alt={alts[0] || p.title} className="relative aspect-video w-full rounded-t-[22px] object-cover object-top" />
          </figure>
        </section>
      )}

      <Section>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className={cn(block, 'bg-card p-5 sm:p-10 lg:sticky lg:top-24')}>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{p.challenge ? labels.challenge : labels.overview}</h2>
            {p.challenge && <p className="mt-5 text-muted-foreground">{p.challenge}</p>}
            <dl className="mt-8 grid gap-4">
              {facts.map(([label, value]) => (
                <div key={label}><dt className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{label}</dt><dd className="mt-1 font-extrabold">{value}</dd></div>
              ))}
              {p.stack.length > 0 && (
                <div><dt className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{labels.stack}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">{p.stack.map((item) => <span key={item} className={cn(pill, 'bg-secondary')}>{item}</span>)}</dd></div>
              )}
              {p.integrations?.length > 0 && (
                <div><dt className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{labels.integrations}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">{p.integrations.map((item) => <span key={item} className={cn(pill, 'bg-secondary')}>{item}</span>)}</dd></div>
              )}
            </dl>
          </div>
          {p.features.length > 0 && (
            <div className={cn(block, tone.foam.card, 'p-5 sm:p-10')}>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{labels.features}</h2>
              <ul className="mt-6 grid grid-cols-1 gap-3">
                {p.features.map((item) => <li key={item} className="flex gap-2.5 rounded-[1.25rem] bg-white/60 p-3.5 sm:gap-3 sm:p-4"><Check aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={2.6} /><span className="min-w-0 break-words">{item}</span></li>)}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {p.results.length > 0 && (
        <Section>
          <Title parts={labels.results} />
          <ul className={cn('mt-12 grid grid-cols-1 gap-4', p.results.length > 2 ? 'md:grid-cols-3' : p.results.length === 2 && 'md:grid-cols-2')}>
            {p.results.map((item, index) => {
              const scheme = tone[['wave', 'deep', 'deep'][index % 3]];
              return <li key={item} className={cn(block, 'p-6 text-lg font-extrabold sm:p-8', p.results.length === 1 && 'sm:p-10 sm:text-3xl sm:leading-tight', scheme.card)}>{item}</li>;
            })}
          </ul>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section>
          <Title parts={labels.gallery} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {gallery.map((src, index) => <figure key={src} className={cn(block, 'overflow-hidden bg-card md:[&:last-child:nth-child(odd)]:col-span-2 md:[&:last-child:nth-child(odd)_img]:aspect-[16/7]')}><img src={src} alt={alts[index + 1] || p.title} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" /></figure>)}
          </div>
        </Section>
      )}

      <CtaBand title={labels.ctaTitle} text={labels.ctaText} cta={labels.similar} href={links.contact} secondary={{ href: links.portfolio, label: labels.back }} />
    </>
  );
}
