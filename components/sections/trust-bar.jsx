import { Icon } from '@/components/sections/icons';

export default function TrustBar({ label, items }) {
  return (
    <ul className="trust-bar" aria-label={label}>
      {items.map(({ icon, title, text }) => (
        <li key={title}>
          <Icon name={icon} className="trust-icon" />
          <div><b>{title}</b><span>{text}</span></div>
        </li>
      ))}
    </ul>
  );
}
