export default function SectionHead({ eyebrow, title, text, center = false, preserveLines = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      {eyebrow && <div className="eyebrow" style={center ? { justifyContent: 'center' } : undefined}>{eyebrow}</div>}
      <h2>{title}</h2>
      {text && <p style={preserveLines ? { whiteSpace: 'pre-line' } : undefined}>{text}</p>}
    </div>
  );
}
