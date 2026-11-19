import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/json-ld';
import ContactView from '@/components/landing/contact-view';
import ServicesView from '@/components/landing/services-view';

const views = { services: ServicesView, contact: ContactView };

// Inner pages in design E that live in the (landing-*) root layouts: /dienstleistungen, /kontakt and their EN twins.
export function createPageRoute(locale, page) {
  const View = views[page];
  return {
    generateMetadata: () => buildMetadata(locale, page),
    Page: function InnerPage() {
      return (
        <>
          <JsonLd data={breadcrumbJsonLd(locale, page)} />
          <View locale={locale} />
        </>
      );
    },
  };
}
