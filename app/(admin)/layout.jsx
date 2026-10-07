import RootDocument from '@/components/layout/root-document';

export const metadata = { title: 'Admin | AutomatonSoft', robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <RootDocument lang="de">{children}</RootDocument>;
}
