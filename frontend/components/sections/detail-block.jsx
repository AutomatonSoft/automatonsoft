import { ArrowRight, Check } from 'lucide-react';
import { Icon } from '@/components/sections/icons';

// Numbered, anchorable detail card shared by the services and industries pages:
// free-form body on the left, a checklist on the right and an optional portfolio reference.
export default function DetailBlock({ id, index, icon, title, children, listLabel, list, reference }) {
  return (
    <article id={id} className="service-detail">
      <div className="service-detail-copy">
        <div className="service-detail-head">
          <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="icon-badge"><Icon name={icon} /></div>
        </div>
        <h2>{title}</h2>
        {children}
        {reference && (
          <a className="service-reference" href={reference.href}>
            <span>{reference.label}</span>
            <b>{reference.name}</b>
            {reference.text && <small>{reference.text}</small>}
            <em>{reference.linkLabel}<ArrowRight aria-hidden="true" /></em>
          </a>
        )}
      </div>
      <div className="service-deliverables">
        <p className="industry-label">{listLabel}</p>
        <ul className="card-points">{list.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
      </div>
    </article>
  );
}
