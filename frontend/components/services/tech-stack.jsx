export default function TechStack({ groups }) {
  return (
    <dl className="tech-stack">
      {groups.map(({ label, items }) => (
        <div key={label} className="tech-group">
          <dt>{label}</dt>
          <dd><ul className="tech-chips tech-chips-light">{items.map((item) => <li key={item}>{item}</li>)}</ul></dd>
        </div>
      ))}
    </dl>
  );
}
