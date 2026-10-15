'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#1fb6c4', '#35d0c6', '#7fe9e2', '#ffd166'];

// Sparks fly off the pointer and burst on click; only for mouse users without reduced motion.
export default function CursorFollower() {
  const canvas = useRef(null);

  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const ctx = canvas.current.getContext('2d');
    const sparks = [];
    let frame = 0, last = 0;

    const resize = () => {
      const dpr = devicePixelRatio || 1;
      canvas.current.width = innerWidth * dpr;
      canvas.current.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (x, y, count, speed) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = speed * (0.4 + Math.random() * 0.6);
        sparks.push({ x, y, vx: Math.cos(angle) * v, vy: Math.sin(angle) * v - 1, life: 1, color: COLORS[(Math.random() * COLORS.length) | 0] });
      }
      if (sparks.length > 300) sparks.splice(0, sparks.length - 300);
      frame ||= requestAnimationFrame(tick);
    };
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.lineCap = 'round';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vx *= 0.94; s.vy = s.vy * 0.94 + 0.15;
        s.life -= 0.022;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.globalAlpha = s.life;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 3 * s.life;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 2.5, s.y - s.vy * 2.5);
        ctx.stroke();
      }
      frame = sparks.length ? requestAnimationFrame(tick) : 0;
    };
    const move = (e) => {
      if (e.timeStamp - last < 16) return;
      last = e.timeStamp;
      spawn(e.clientX, e.clientY, 3, 3.5);
    };
    const click = (e) => spawn(e.clientX, e.clientY, 24, 7);

    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', move, { passive: true });
    addEventListener('pointerdown', click, { passive: true });
    return () => {
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      removeEventListener('pointerdown', click);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvas} className="cursor-sparks" aria-hidden="true" />;
}
