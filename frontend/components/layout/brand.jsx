import { siteConfig } from '@/lib/site-config';

export default function Brand({ homeHref, imageHeight }) {
  return (
    <a href={homeHref} className="brand">
      <img src={siteConfig.icon} alt="AutomatonSoft Logo" style={imageHeight ? { height: imageHeight } : undefined} />
      <span className="brand-name">Automaton<span>Soft</span></span>
    </a>
  );
}
