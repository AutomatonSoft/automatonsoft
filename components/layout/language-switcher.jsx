import { getDictionary, locales } from '@/lib/i18n';
import { pageAlternates } from '@/lib/seo';

export default function LanguageSwitcher({ locale, page, label }) {
  const alternates = pageAlternates(page);
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {locales.map((item) => (
        <a key={item} href={alternates[item]} hrefLang={item} lang={item} aria-current={item === locale ? 'true' : undefined} title={getDictionary(item).localeName}>
          {item.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
