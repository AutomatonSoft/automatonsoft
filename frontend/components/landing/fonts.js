import { Inter, Space_Grotesk } from 'next/font/google';

// Design B: two variable fonts (one file each) – Inter for text, Space Grotesk for headings.
// Kept apart from components/layout/fonts.js so the legacy pages do not preload these files and vice versa.
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const landingFontVariables = `${sans.variable} ${display.variable}`;
