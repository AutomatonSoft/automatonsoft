import '@/app/globals.css';
import { Onest } from 'next/font/google';
import RootDocument from '@/components/layout/root-document';
import { siteIcons } from '@/lib/site-config';

// Same look as the public site (theme-hub, Onest), plus Cyrillic for the Russian dashboard texts.
const onest = Onest({ subsets: ['latin', 'cyrillic'], variable: '--font-sans', display: 'swap' });

export const metadata = { title: 'Admin | AutomatonSoft', robots: { index: false, follow: false }, icons: siteIcons };

export default function AdminLayout({ children }) {
  return <RootDocument lang="de" className={`theme-hub ${onest.variable}`}>{children}</RootDocument>;
}
