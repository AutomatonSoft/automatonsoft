'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Icon } from '@/components/sections/icons';

const nextIndex = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

function IndustryPanel({ item, labels, portfolioHref, active }) {
  return (
    <div role="tabpanel" id={`industry-panel-${item.id}`} aria-labelledby={`industry-tab-${item.id}`} hidden={!active} className="industry-panel">
      <div className="industry-panel-head">
        <div className="icon-badge"><Icon name={item.icon} /></div>
        <h3>{item.title}</h3>
      </div>
      <p className="industry-label">{labels.challenge}</p>
      <p className="industry-challenge">{item.challenge}</p>
      <p className="industry-label">{labels.solutions}</p>
      <ul className="card-points industry-solutions">{item.solutions.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul>
      {item.reference && (
        <div className="industry-reference">
          <p className="industry-label">{labels.reference}</p>
          <b>{item.reference.name}</b>
          <p>{item.reference.text}</p>
          <a href={`${portfolioHref}#${item.category}`}>{labels.viewInPortfolio}<ArrowRight aria-hidden="true" /></a>
        </div>
      )}
    </div>
  );
}

// WAI-ARIA tabs with automatic activation; all panels are server-rendered so search engines see every industry.
export default function IndustryExplorer({ items, labels, portfolioHref }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  const select = (index) => {
    const target = (index + items.length) % items.length;
    setActive(target);
    tabs.current[target]?.focus();
  };
  const onKeyDown = (event) => {
    // Derive the position from the focused tab, not from state, so rapid input never acts on a stale index.
    const current = Math.max(tabs.current.indexOf(event.target), 0);
    if (nextIndex[event.key]) select(current + nextIndex[event.key]);
    else if (event.key === 'Home') select(0);
    else if (event.key === 'End') select(items.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className="industry-explorer">
      <div role="tablist" aria-label={labels.list} aria-orientation="vertical" className="industry-tabs" onKeyDown={onKeyDown}>
        {items.map((item, index) => (
          <button key={item.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`industry-tab-${item.id}`}
            aria-selected={index === active} aria-controls={`industry-panel-${item.id}`} tabIndex={index === active ? 0 : -1}
            className="industry-tab" onClick={() => setActive(index)}>
            <Icon name={item.icon} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      {items.map((item, index) => <IndustryPanel key={item.id} item={item} labels={labels} portfolioHref={portfolioHref} active={index === active} />)}
    </div>
  );
}
