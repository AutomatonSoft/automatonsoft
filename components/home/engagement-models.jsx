import { ArrowRight, Check } from 'lucide-react';
import { href } from '@/lib/i18n';
import { Icon } from '@/components/sections/icons';

export default function EngagementModels({ locale, models, bestForLabel }) {
  return (
    <div className="grid grid-3 engagement-grid">
      {models.map((model) => (
        <article key={model.id} className="card engagement-card">
          <div className="icon-badge"><Icon name={model.icon} /></div>
          <h3>{model.title}</h3>
          <p className="engagement-best"><span>{bestForLabel}</span>{model.bestFor}</p>
          <ul className="card-points">{model.points.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul>
          <a className="btn btn-outline-dark engagement-cta" href={href(locale, model.target)}>{model.cta}<ArrowRight className="btn-arrow" aria-hidden="true" /></a>
        </article>
      ))}
    </div>
  );
}
