export default function ProcessSteps({ steps }) {
  return (
    <ol className="process-steps">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
