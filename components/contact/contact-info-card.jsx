import { addressLines, siteConfig } from '@/lib/site-config';

function ContactRow({ label, children }) {
  return <div className="contact-row"><div><b>{label}</b>{children}</div></div>;
}

export default function ContactInfoCard({ t }) {
  return (
    <aside className="contact-info-card">
      <h3>{t.infoTitle}</h3>
      <ContactRow label={t.phone}><a href={siteConfig.phone.href}>{siteConfig.phone.display}</a></ContactRow>
      <ContactRow label={t.email}><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></ContactRow>
      <ContactRow label={t.whatsapp}><a href={siteConfig.whatsapp.href} target="_blank" rel="noopener noreferrer">{siteConfig.whatsapp.display}</a></ContactRow>
      <ContactRow label={t.address}><span className="val">{siteConfig.name}<br />{addressLines[0]}<br />{addressLines[1]}</span></ContactRow>
    </aside>
  );
}
