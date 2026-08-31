import { notFound } from 'next/navigation';
import { getStaticPaths, pageMeta } from '@/lib/page-data';
import HomePage from '@/components/home-page';
import MarketingPage from '@/components/marketing-page';
import PortfolioPage from '@/components/portfolio-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticPaths();
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug?.[0];
  return slug ? pageMeta[slug] || {} : { title: 'AutomatonSoft GmbH' };
}

export default async function Page({ params }) {
  const slug = (await params).slug;
  if (!slug?.length) return <HomePage />;
  if (slug?.[0] === 'portfolio') return <PortfolioPage />;
  if (!pageMeta[slug?.[0]]) notFound();
  return <MarketingPage slug={slug[0]} />;
}
