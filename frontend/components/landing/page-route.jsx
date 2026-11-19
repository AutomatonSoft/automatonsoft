import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/json-ld';
import CompanyView from '@/components/landing/company-view';
import ContactView from '@/components/landing/contact-view';
import ContentView from '@/components/landing/content-view';
import HireView from '@/components/landing/hire-view';
import ServicesView from '@/components/landing/services-view';

const views = { services: ServicesView, contact: ContactView, company: CompanyView, hire: HireView };

// Inner pages in design E that live in the (landing-*) root layouts: /dienstleistungen, /kontakt, /unternehmen, /entwickler-engagieren, the text pages (imprint, privacy, blog) and their EN twins.
export function createPageRoute(locale, page) {
  const View = views[page];
  return {
    generateMetadata: () => buildMetadata(locale, page),
    Page: function InnerPage() {
      return (
        <>
          <JsonLd data={breadcrumbJsonLd(locale, page)} />
          {View ? <View locale={locale} /> : <ContentView locale={locale} page={page} />}
        </>
      );
    },
  };
}
