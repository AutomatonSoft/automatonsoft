import { MapPin } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { addressLines } from '@/lib/site-config';
import ButtonLink from '@/components/sections/button-link';
import CardGrid from '@/components/sections/card-grid';
import CtaBand from '@/components/sections/cta-band';
import LocalizedPageHero from '@/components/sections/localized-page-hero';
import Section from '@/components/sections/section';
import SectionHead from '@/components/sections/section-head';
import ProcessSteps from '@/components/home/process-steps';
import ContactInfoCard from '@/components/contact/contact-info-card';
import CompanyStory from '@/components/company/company-story';
import ProductList from '@/components/company/product-list';

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLines.join(', '))}`;

export default function CompanyPage({ locale }) {
  const { pages, home, contact } = getDictionary(locale);
  const t = pages.company;
  const portfolioHref = href(locale, 'portfolio');
  return (
    <>
      <LocalizedPageHero locale={locale} page="company" actions={(
        <>
          <ButtonLink href={href(locale, 'contact')} arrow>{t.primaryCta}</ButtonLink>
          <ButtonLink href={portfolioHref} variant="outline">{t.secondaryCta}</ButtonLink>
        </>
      )} />
      <Section><CompanyStory story={t.story} /></Section>
      <Section tone="pale">
        <SectionHead eyebrow={t.values.eyebrow} title={t.values.title} text={t.values.text} center />
        <CardGrid items={t.values.items} />
      </Section>
      <Section>
        <div className="section-head-split">
          <SectionHead eyebrow={t.products.eyebrow} title={t.products.title} text={t.products.text} />
          <ButtonLink href={portfolioHref} variant="outline-dark" arrow>{t.secondaryCta}</ButtonLink>
        </div>
        <ProductList products={t.products} portfolioHref={portfolioHref} />
      </Section>
      <Section tone="navy">
        <SectionHead eyebrow={home.process.eyebrow} title={home.process.title} text={home.process.text} center />
        <ProcessSteps steps={home.process.steps} />
      </Section>
      <Section>
        <div className="split" style={{ alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow={t.location.eyebrow} title={t.location.title} text={t.location.text} />
            <a className="btn btn-outline-dark" href={directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin className="btn-arrow" aria-hidden="true" />{t.location.directions}</a>
          </div>
          <ContactInfoCard t={contact} />
        </div>
      </Section>
      <Section tone="pale">
        <CtaBand title={t.ctaTitle} text={t.ctaText} actions={[{ href: href(locale, 'contact'), label: t.ctaButton }]} />
      </Section>
    </>
  );
}
