import { Icon } from '@/components/sections/icons';

export default function RoleGrid({ roles }) {
  return (
    <div className="grid role-grid">
      {roles.map((role) => (
        <article key={role.title} className="card role-card">
          <div className="icon-badge"><Icon name={role.icon} /></div>
          <h3>{role.title}</h3>
          <p>{role.text}</p>
          <ul className="tech-chips tech-chips-light">{role.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}
