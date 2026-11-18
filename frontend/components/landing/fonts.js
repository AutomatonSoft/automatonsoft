import { Onest } from 'next/font/google';

// Design E: one variable font (a single file) for text and headings – Onest, bold and friendly up to weight 900.
// Kept apart from components/layout/fonts.js so the legacy pages do not preload it and vice versa.
const onest = Onest({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const landingFontVariables = onest.variable;
