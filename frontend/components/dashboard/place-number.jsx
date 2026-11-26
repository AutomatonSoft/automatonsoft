import { useState } from 'react';

const box = 'h-9 w-10 shrink-0 rounded-lg text-center text-sm font-bold tabular-nums';

// The place in the list. A click turns it into a field: type a number to send the project there.
export default function PlaceNumber({ place, count, label, onMove }) {
  const [editing, setEditing] = useState(false);

  if (!onMove) return <span className={`${box} grid place-items-center text-muted-foreground`}>{place}</span>;
  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)} aria-label={`${label}: ${place}`} title={label} className={`${box} border border-input bg-card text-ink hover:border-primary hover:text-primary`}>
        {place}
      </button>
    );
  }
  const finish = (event) => {
    setEditing(false);
    const typed = Number.parseInt(event.target.value, 10) || place;
    const next = Math.min(Math.max(typed, 1), count);
    if (next !== place) onMove(next);
  };
  // Enter and Escape only leave the field; leaving it is the one place where the move happens.
  const keys = (event) => {
    if (event.key === 'Escape') event.target.value = place;
    if (event.key === 'Enter' || event.key === 'Escape') event.target.blur();
  };
  return <input autoFocus type="text" inputMode="numeric" defaultValue={place} aria-label={label} onFocus={(event) => event.target.select()} onBlur={finish} onKeyDown={keys}
    className={`${box} border border-primary bg-card text-base outline-none ring-3 ring-ring/50`} />;
}
