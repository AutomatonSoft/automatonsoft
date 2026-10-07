export default function PageHero({ homeHref, homeLabel, crumb, title, intro }) {
  return (
    <section className="page-hero">
      <div className="hex-pattern" />
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb"><a href={homeHref}>{homeLabel}</a> / {crumb}</nav>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
