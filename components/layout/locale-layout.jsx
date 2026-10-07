import RootDocument from '@/components/layout/root-document';
import JsonLd from '@/components/layout/json-ld';
import { organizationJsonLd } from '@/lib/seo';

export default function LocaleLayout({ locale, children }) {
  return <RootDocument lang={locale}><JsonLd data={organizationJsonLd(locale)} />{children}</RootDocument>;
}
