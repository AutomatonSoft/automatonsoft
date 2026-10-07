import { CircleCheck } from 'lucide-react';
import { href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';
import IntegrationHub from '@/components/home/integration-hub';

export default function Hero({ t, locale }) {
  return (
    <section className="hero">
      <div className="hex-pattern" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.titleStart}<span className="text-gradient">{t.titleHighlight}</span></h1>
          <p className="lead">{t.lead}</p>
          <div className="hero-actions">
            <ButtonLink href={href(locale, 'contact')} arrow>{t.primaryCta}</ButtonLink>
            <ButtonLink href={href(locale, 'portfolio')} variant="outline">{t.secondaryCta}</ButtonLink>
          </div>
          <p className="hero-assurance"><CircleCheck aria-hidden="true" />{t.assurance}</p>
        </div>
        <IntegrationHub hub={t.hub} />
      </div>
    </section>
  );
}
