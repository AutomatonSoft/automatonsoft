import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getDictionary, href } from '@/lib/i18n';
import { addressLines, siteConfig } from '@/lib/site-config';
import Brand from '@/components/layout/brand';
import LanguageSwitcher from '@/components/layout/language-switcher';
import ButtonLink from '@/components/sections/button-link';

function FooterColumn({ title, className = '', children }) {
  return <nav className={`footer-col ${className}`} aria-label={title}><h4>{title}</h4><ul>{children}</ul></nav>;
}

function ContactItem({ icon: Icon, children }) {
  return <li><Icon aria-hidden="true" /><span>{children}</span></li>;
}

// Service and industry names come from the homepage dictionary, so the footer never drifts from the content.
export default function SiteFooter({ locale, page }) {
  const { footer: t, nav, services, industries } = getDictionary(locale);
  const portfolio = href(locale, 'portfolio');
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand homeHref={href(locale, 'home')} />
            <p>{t.tagline}</p>
            <ButtonLink href={href(locale, 'contact')} arrow>{t.cta}</ButtonLink>
          </div>
          <FooterColumn title={t.services}>
            {services.items.map((item) => <li key={item.id}><a href={href(locale, 'services', item.id)}>{item.title}</a></li>)}
          </FooterColumn>
          <FooterColumn title={t.industries}>
            {industries.items.map((item) => <li key={item.id}><a href={href(locale, 'industries', item.id)}>{item.title}</a></li>)}
          </FooterColumn>
          <FooterColumn title={t.company}>
            <li><a href={href(locale, 'company')}>{t.aboutUs}</a></li>
            <li><a href={portfolio}>{t.portfolio}</a></li>
            <li><a href={href(locale, 'hire')}>{t.hire}</a></li>
            <li><a href={href(locale, 'contact')}>{t.contactPage}</a></li>
          </FooterColumn>
          <FooterColumn title={t.contact} className="footer-contact footer-contact-col">
            <ContactItem icon={Mail}><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></ContactItem>
            <ContactItem icon={Phone}><a href={siteConfig.phone.href}>{siteConfig.phone.display}</a></ContactItem>
            <ContactItem icon={MessageCircle}><a href={siteConfig.whatsapp.href} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></ContactItem>
            <ContactItem icon={MapPin}>{siteConfig.name}<br />{addressLines[0]}<br />{addressLines[1]}</ContactItem>
          </FooterColumn>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}. {t.rights}</span>
          <div className="footer-bottom-links">
            <a href={href(locale, 'imprint')}>{t.imprint}</a>
            <a href={href(locale, 'privacy')}>{t.privacy}</a>
            <a href="/dashboard" rel="nofollow">{nav.login}</a>
            <LanguageSwitcher locale={locale} page={page} label={nav.language} />
            <a className="back-to-top" href="#main" aria-label={t.backToTop}><ArrowUp aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
