import RootDocument from '@/components/layout/root-document';
import JsonLd from '@/components/layout/json-ld';
import { siteFontVariables } from '@/components/layout/fonts';
import { siteJsonLd } from '@/lib/seo';

export default function LocaleLayout({ locale, children }) {
  return <RootDocument lang={locale} className={siteFontVariables}><JsonLd data={siteJsonLd(locale)} />{children}</RootDocument>;
}
