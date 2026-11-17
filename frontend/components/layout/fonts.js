import { Inter, Poppins } from 'next/font/google';

// Self-hosted at build time by next/font: no request to Google from the visitor's browser (GDPR) and no render-blocking CSS.
const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'], variable: '--font-poppins', display: 'swap' });

export const siteFontVariables = `${inter.variable} ${poppins.variable}`;
