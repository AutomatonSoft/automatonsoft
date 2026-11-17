'use client';

import { useState } from 'react';
import { RotateCw } from 'lucide-react';

const isTouch = () => window.matchMedia('(hover: none)').matches;

// Hover (mouse) and keyboard focus flip purely via CSS; state only covers taps on touch screens.
export default function FlipCard({ front, back, hintLabel }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-card" data-flipped={flipped} onClick={() => isTouch() && setFlipped(!flipped)}>
      <div className="flip-inner">
        <div className="card flip-face flip-front">
          {front}
          <button type="button" className="flip-hint" aria-expanded={flipped} onClick={(event) => { event.stopPropagation(); setFlipped(!flipped); }}>
            {hintLabel}<RotateCw aria-hidden="true" />
          </button>
        </div>
        <div className="card dark flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
