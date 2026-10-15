'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Weighted wheel scrolling; touch keeps native scrolling and reduced motion turns smoothing off (Lenis defaults).
export default function SmoothScroll() {
  useEffect(() => {
    // autoToggle pauses Lenis while <html> is overflow:hidden (open mobile menu).
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: true, autoToggle: true, allowNestedScroll: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
