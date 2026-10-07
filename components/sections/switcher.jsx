'use client';

import { useState } from 'react';

// Segmented control over server-rendered panels; inactive panels stay in the HTML for search engines.
export default function Switcher({ label, tabs, children }) {
  const [active, setActive] = useState(0);
  const panels = Array.isArray(children) ? children : [children];
  return (
    <>
      <div className="switcher" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => (
          <button key={tab} type="button" role="tab" id={`switch-tab-${index}`} aria-selected={index === active}
            aria-controls={`switch-panel-${index}`} onClick={() => setActive(index)}>{tab}</button>
        ))}
      </div>
      {panels.map((panel, index) => (
        <div key={tabs[index]} role="tabpanel" id={`switch-panel-${index}`} aria-labelledby={`switch-tab-${index}`} hidden={index !== active} className="switch-panel">{panel}</div>
      ))}
    </>
  );
}
