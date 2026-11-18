import '@/app/globals.css';
import { notFound } from 'next/navigation';
import { landingAlternates, landingFromSlug, landingHref, landingParams, landings } from '@/lib/landings';
import { breadcrumbJsonLd, buildMetadata, siteJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { landingFontVariables } from '@/components/landing/fonts';
import AttributionTracker from '@/components/layout/attribution-tracker';
import JsonLd from '@/components/layout/json-ld';
import RootDocument from '@/components/layout/root-document';
import IndustriesView from '@/components/landing/industries-view';
import LandingPage from '@/components/landing/landing-page';

// Industry landings have their own root layout: Tailwind and design system C only, without the legacy style.css.
export function LandingLayout({ locale, children }) {
  return (
    <RootDocument lang={locale} className={`theme-hub ${landingFontVariables}`} siteStyles={false}>
      <AttributionTracker />
      <JsonLd data={siteJsonLd(locale)} />
      {children}
    </RootDocument>
  );
}

function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function createLandingRoute(locale) {
  const resolve = async (params) => landingFromSlug(locale, (await params).industry) || notFound();
  return {
    generateStaticParams: () => landingParams(locale),
    generateMetadata: async ({ params }) => {
      const id = await resolve(params);
      const metadata = buildMetadata(locale, 'industries', { meta: landings[id].content[locale].meta, path: landingHref(locale, id), languages: landingAlternates(id) });
      // The generated opengraph-image next to this page replaces the site-wide default image.
      delete metadata.openGraph.images;
      delete metadata.twitter.images;
      return metadata;
    },
    Page: async function IndustryLanding({ params }) {
      const id = await resolve(params);
      const t = landings[id].content[locale];
      const path = landingHref(locale, id);
      return (
        <>
          <JsonLd data={breadcrumbJsonLd(locale, 'industries', { name: t.name, path: new URL(path, siteConfig.url).href })} />
          <JsonLd data={faqJsonLd(t.faq.items)} />
          <LandingPage locale={locale} id={id} />
        </>
      );
    },
  };
}

// /branchen (the list of industries) lives next to its landing pages.
export function createIndustriesRoute(locale) {
  return {
    generateMetadata: () => buildMetadata(locale, 'industries'),
    Page: function Industries() {
      return (
        <>
          <JsonLd data={breadcrumbJsonLd(locale, 'industries')} />
          <IndustriesView locale={locale} />
        </>
      );
    },
  };
}
