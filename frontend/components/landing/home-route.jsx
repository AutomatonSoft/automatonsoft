import { buildMetadata } from '@/lib/seo';
import HomeLanding from '@/components/landing/home-landing';

// The home page renders in the (landing-*) root layouts, i.e. in the new design system.
export function createHomeRoute(locale) {
  return {
    generateMetadata: () => buildMetadata(locale, 'home'),
    Page: function Home() {
      return <HomeLanding locale={locale} />;
    },
  };
}
