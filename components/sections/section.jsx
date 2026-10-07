const tones = { pale: 'bg-pale', navy: 'bg-navy' };

export default function Section({ tone, id, children }) {
  return <section id={id} className={`section-pad ${tones[tone] || ''}`}><div className="container">{children}</div></section>;
}
