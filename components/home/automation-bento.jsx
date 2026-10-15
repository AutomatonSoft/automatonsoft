import { ArrowRight } from 'lucide-react';
import { href, projectHref } from '@/lib/i18n';

// Each use case links to the page that proves it: a service section or the project landing page.
const targets = {
  orders: (locale) => href(locale, 'services', 'process-automation'),
  calls: (locale) => projectHref(locale, 'lisa'),
  reporting: (locale) => href(locale, 'services', 'custom-software'),
  time: (locale) => projectHref(locale, 'hubnity'),
};

const waveBars = [3, 6, 9, 5, 11, 7, 4, 10, 6, 12, 8, 5, 9, 4, 7, 11, 6, 3, 8, 10, 5, 7, 4, 6];

function Visual({ id }) {
  if (id === 'orders') {
    return (
      <div className="av-flow">
        <span>SHOP</span><i /><span>ERP</span><i /><span>PDF</span>
      </div>
    );
  }
  if (id === 'calls') {
    return <div className="av-wave">{waveBars.map((h, i) => <span key={i} style={{ '--h': h, '--d': `${(i % 6) * -0.18}s` }} />)}</div>;
  }
  if (id === 'reporting') {
    return (
      <svg className="av-chart" viewBox="0 0 240 110">
        <path className="av-chart-grid" d="M0 27.5H240M0 55H240M0 82.5H240" />
        <path className="av-chart-area" d="M0 92 L30 80 L60 84 L90 62 L120 66 L150 44 L180 50 L210 28 L240 18 V110 H0Z" />
        <path className="av-chart-line" d="M0 92 L30 80 L60 84 L90 62 L120 66 L150 44 L180 50 L210 28 L240 18" pathLength="1" />
      </svg>
    );
  }
  return (
    <svg className="av-ring" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" />
      <circle className="av-ring-progress" cx="60" cy="60" r="50" pathLength="1" />
      <circle className="av-ring-dot" cx="60" cy="10" r="4" />
    </svg>
  );
}

export default function AutomationBento({ t, locale, ctaHref }) {
  return (
    <section className="section-pad automate">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow hero-eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>
        <div className="bento">
          {t.items.map((item) => (
            <a key={item.id} href={targets[item.id](locale)} className={`bento-cell bento-${item.id}`}>
              <div className="bento-visual" aria-hidden="true">
                <span className="bento-tag">{item.tag}</span>
                <Visual id={item.id} />
              </div>
              <div className="bento-body">
                <h3>{item.title}</h3>
                <dl>
                  <div className="bento-before"><dt>{t.before}</dt><dd>{item.before}</dd></div>
                  <div className="bento-after"><dt>{t.after}</dt><dd>{item.after}</dd></div>
                </dl>
                <span className="bento-more">{t.more}<ArrowRight aria-hidden="true" /></span>
              </div>
            </a>
          ))}
          <a href={ctaHref} className="bento-cell bento-cta">
            <h3>{t.cta.title}</h3>
            <p>{t.cta.text}</p>
            <span className="btn btn-primary">{t.cta.label}<ArrowRight className="btn-arrow" aria-hidden="true" /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
