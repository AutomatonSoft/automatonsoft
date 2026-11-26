import { useState } from 'react';

// How close to the top or bottom of the screen the pointer must be for the page to scroll along.
const EDGE = 90;

// Reorder a list by dragging a handle inside its <ul>. Pointer events, so mouse, pen and finger behave the same.
// While dragging nothing moves in the DOM: rows are only shifted visually, and onDrop(from, to) reports the result.
export function useDragOrder(onDrop) {
  const [drag, setDrag] = useState(null);

  const start = (event, from) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const handle = event.currentTarget;
    const rows = [...handle.closest('ul').children].map((row) => {
      const box = row.getBoundingClientRect();
      return { top: box.top + window.scrollY, height: box.height };
    });
    const startY = event.clientY + window.scrollY;
    let pointerY = event.clientY;
    let current = { from, to: from, offset: 0, height: rows[from].height };
    let frame;
    // The row stays inside the list: shifted further it would make the page longer, and scrolling would never end.
    const highest = rows[0].top - rows[from].top;
    const lowest = rows.at(-1).top + rows.at(-1).height - rows[from].top - rows[from].height;

    const update = () => {
      const moved = pointerY + window.scrollY - startY;
      const middle = rows[from].top + rows[from].height / 2 + moved;
      const to = rows.filter((row, index) => index !== from && row.top + row.height / 2 < middle).length;
      current = { ...current, to, offset: Math.min(Math.max(moved, highest), lowest) };
      setDrag(current);
    };
    const scroll = () => {
      const beyond = Math.min(pointerY - EDGE, 0) + Math.max(pointerY - (window.innerHeight - EDGE), 0);
      if (beyond) { window.scrollBy(0, beyond / 5); update(); }
      frame = requestAnimationFrame(scroll);
    };
    const listeners = {
      pointermove: (move) => { pointerY = move.clientY; update(); },
      pointerup: () => finish(true),
      pointercancel: () => finish(false),
    };
    const escape = (key) => { if (key.key === 'Escape') finish(false); };
    function finish(dropped) {
      cancelAnimationFrame(frame);
      Object.entries(listeners).forEach(([type, listener]) => handle.removeEventListener(type, listener));
      window.removeEventListener('keydown', escape);
      setDrag(null);
      if (dropped && current.to !== from) onDrop(from, current.to);
    }

    handle.setPointerCapture(event.pointerId);
    Object.entries(listeners).forEach(([type, listener]) => handle.addEventListener(type, listener));
    window.addEventListener('keydown', escape);
    frame = requestAnimationFrame(scroll);
    setDrag(current);
  };

  // The dragged row follows the pointer; the rows it passes step aside by its height.
  const rowStyle = (index) => {
    if (!drag) return undefined;
    const { from, to, offset, height } = drag;
    if (index === from) return { transform: `translateY(${offset}px)` };
    const step = index > from && index <= to ? -height : index < from && index >= to ? height : 0;
    return { transform: `translateY(${step}px)`, transition: 'transform 150ms' };
  };

  return { start, rowStyle, dragged: drag?.from };
}
