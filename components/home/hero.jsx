import { CircleCheck, Mail, MousePointer2, Receipt, ShoppingCart } from 'lucide-react';
import { href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';

const flowIcons = [ShoppingCart, Receipt, Mail];

export default function Hero({ t, locale }) {
  return (
    <section className="hero">
      <div className="hex-pattern" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-lines container" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="hero-watermark" aria-hidden="true">AutomatonSoft</div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">{t.eyebrow}</div>
          <h1>{t.titleStart}<br /><span className="hero-highlight">{t.titleHighlight}</span></h1>
          <p className="lead">{t.lead}</p>
          <div className="hero-actions">
            <span className="beam-frame"><ButtonLink href={href(locale, 'contact')} arrow>{t.primaryCta}</ButtonLink></span>
            <ButtonLink href={href(locale, 'portfolio')} variant="outline">{t.secondaryCta}</ButtonLink>
          </div>
          <p className="hero-assurance"><CircleCheck aria-hidden="true" />{t.assurance}</p>
        </div>
      </div>
      <div className="hero-visual">
        <img className="hero-photo" src="/assets/img/hero-human-ai.webp" width="1122" height="1402" alt="" fetchPriority="high" />
        <span className="hero-tag" aria-hidden="true"><MousePointer2 />{t.tag}</span>
        <ol className="hero-flow" aria-label={t.flowLabel}>
          {t.flow.map((step, index) => {
            const FlowIcon = flowIcons[index];
            return (
              <li key={step.title} style={{ '--i': index }}>
                <FlowIcon aria-hidden="true" />
                <span><strong>{step.title}</strong>{step.text}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="hero-ticker" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy}>{t.ticker.map((item) => <li key={item}>{item}</li>)}</ul>
        ))}
      </div>
    </section>
  );
}
