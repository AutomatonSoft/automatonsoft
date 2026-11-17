import { ArrowRight, Check } from 'lucide-react';
import { Icon } from '@/components/sections/icons';
import FlipCard from '@/components/sections/flip-card';

function CardHeader({ icon, title, text }) {
  return (
    <>
      {icon && <div className="icon-badge"><Icon name={icon} /></div>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </>
  );
}

function Points({ points }) {
  return <ul className="card-points">{points.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul>;
}

function MoreLink({ label, as: Tag = 'span', href }) {
  return <Tag className="card-more" href={href}>{label}<ArrowRight aria-hidden="true" /></Tag>;
}

function renderCard(card, options) {
  const { linkLabel, flipHint } = options;
  const href = card.href || options.href;
  if (card.details) {
    return (
      <FlipCard key={card.title} hintLabel={flipHint} front={<><CardHeader {...card} />{card.icon && <Icon name={card.icon} className="card-watermark" />}</>} back={(
        <>
          <h3>{card.title}</h3>
          <p>{card.details}</p>
          {card.points && <Points points={card.points} />}
          {href && <MoreLink as="a" href={href} label={linkLabel} />}
        </>
      )} />
    );
  }
  const content = <><CardHeader {...card} />{card.points && <Points points={card.points} />}{href && <MoreLink label={linkLabel} />}</>;
  return href
    ? <a className="card card-link" href={href} key={card.title}>{content}</a>
    : <article className="card" key={card.title}>{content}</article>;
}

// items: strings or { icon?, title, text?, points?, details?, href? }; an item href overrides the grid href. `details` turns a card into a flip card,
// otherwise `href` makes the whole card a link.
export default function CardGrid({ items, href, linkLabel, flipHint }) {
  return (
    <div className="grid grid-3">
      {items.map((item) => renderCard(typeof item === 'string' ? { title: item } : item, { href, linkLabel, flipHint }))}
    </div>
  );
}
