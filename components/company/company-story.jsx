export default function CompanyStory({ story }) {
  return (
    <div className="company-story">
      <div>
        <div className="eyebrow">{story.eyebrow}</div>
        <h2>{story.title}</h2>
        {story.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
      </div>
      <aside className="case-panel company-facts">
        <p className="industry-label">{story.factsTitle}</p>
        <dl className="case-facts">
          {story.facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </aside>
    </div>
  );
}
