import { getDictionary, href } from '@/lib/i18n';
import ContactForm from '@/components/contact/contact-form';
import ContactInfoCard from '@/components/contact/contact-info-card';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';

export default function ContactPage({ locale }) {
  const t = getDictionary(locale).contact;
  return (
    <>
      <LocalizedPageHero locale={locale} page="contact" />
      <Section>
        <div className="split" style={{ alignItems: 'start' }}>
          <div><h2>{t.formTitle}</h2><ContactForm locale={locale} t={t} privacyHref={href(locale, 'privacy')} /></div>
          <ContactInfoCard t={t} />
        </div>
      </Section>
    </>
  );
}
