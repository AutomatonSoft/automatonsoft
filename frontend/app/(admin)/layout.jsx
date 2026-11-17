import '@/app/globals.css';
import { Geist } from 'next/font/google';
import RootDocument from '@/components/layout/root-document';

// Tailwind and Geist are only needed by the dashboard, so public pages never download them.
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = { title: 'Admin | AutomatonSoft', robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <RootDocument lang="de" className={`font-sans ${geist.variable}`} siteStyles={false}>{children}</RootDocument>;
}
