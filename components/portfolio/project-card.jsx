import { Icon } from '@/components/sections/icons';
import { categoryIcons } from '@/lib/portfolio';

export default function ProjectCard({ project, categoryLabel, preparingLabel, preparing }) {
  return (
    <article className={`project-card ${preparing ? 'is-preparing' : ''}`} data-category={project.category}>
      <div className="project-thumb">
        {project.screenshots[0]
          ? <img src={project.screenshots[0]} alt={project.title} loading="lazy" />
          : <><div className="hex-pattern" /><Icon name={categoryIcons[project.category]} className="project-thumb-icon" /></>}
        {preparing && <span className="project-status">{preparingLabel}</span>}
      </div>
      <div className="project-body">
        <div className="project-tag">{categoryLabel}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {!preparing && (
          <div className="project-meta">
            {project.development_time && project.development_time !== '—' && <span>{project.development_time}</span>}
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}
