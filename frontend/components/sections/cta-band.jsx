import ButtonLink from '@/components/sections/button-link';

// actions: [{ href, label, variant? }]
export default function CtaBand({ title, text, actions }) {
  return (
    <div className="cta-band">
      <div className="hex-pattern" />
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      <div className="cta-actions">
        {actions.map(({ href, label, variant = 'primary' }) => <ButtonLink key={href} href={href} variant={variant}>{label}</ButtonLink>)}
      </div>
    </div>
  );
}
