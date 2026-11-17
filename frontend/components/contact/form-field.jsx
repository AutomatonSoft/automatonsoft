export default function FormField({ label, name, as: Control = 'input', full = false, ...props }) {
  return (
    <div className={`field ${full ? 'full' : ''}`}>
      <label htmlFor={`field-${name}`}>{label}</label>
      <Control id={`field-${name}`} name={name} {...props} />
    </div>
  );
}
