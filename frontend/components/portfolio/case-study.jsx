import { ArrowUpRight, Check } from 'lucide-react';

export default function CaseStudy({ study, deliveredLabel, similarCta }) {
  return (
    <div className="case-study">
      <div className="case-copy">
        <h3 className="case-title">{study.title}</h3>
        <p className="case-text">{study.text}</p>
        <p className="industry-label">{deliveredLabel}</p>
        <ul className="card-points case-delivered">{study.delivered.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
        <div className="hero-actions">
          {study.url && <a className="btn btn-primary" href={study.url} target="_blank" rel="noopener">{study.visit}<ArrowUpRight className="btn-arrow" aria-hidden="true" /></a>}
          {similarCta}
        </div>
      </div>
      <aside className="case-panel">
        <div className="case-brand"><span>{study.brand}</span><small>{study.tag}</small></div>
        <dl className="case-facts">
          {study.facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <p className="industry-label">{study.stackLabel}</p>
        <ul className="tech-chips">{study.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      </aside>
      {study.image && (
        <figure className="case-media">
          <div className="case-media-bar" aria-hidden="true"><span /><span /><span /></div>
          <img src={study.image.src} width={study.image.width} height={study.image.height} alt={study.image.alt} loading="lazy" decoding="async" />
        </figure>
      )}
    </div>
  );
}
