import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function TopBar({ tagline, languageSwitcher }) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <span className="topbar-tagline"><MapPin aria-hidden="true" />{tagline}</span>
        <div className="topbar-links">
          <a className="topbar-email" href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" />{siteConfig.email}</a>
          <a href={siteConfig.phone.href}><Phone aria-hidden="true" />{siteConfig.phone.display}</a>
          {languageSwitcher}
        </div>
      </div>
    </div>
  );
}
