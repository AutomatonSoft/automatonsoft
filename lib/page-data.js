export const pageSlugs = ['', 'unternehmen', 'dienstleistungen', 'branchen', 'entwickler-engagieren', 'portfolio', 'blog', 'kontakt', 'impressum', 'datenschutz'];

export const pageMeta = {
  'unternehmen': { title: 'Unternehmen | AutomatonSoft GmbH', description: 'Lernen Sie AutomatonSoft kennen.' },
  'dienstleistungen': { title: 'Dienstleistungen | AutomatonSoft GmbH', description: 'Software, Web, Mobile und Automatisierung.' },
  'branchen': { title: 'Branchen | AutomatonSoft GmbH', description: 'Digitale Lösungen für verschiedene Branchen.' },
  'entwickler-engagieren': { title: 'Entwickler engagieren | AutomatonSoft GmbH', description: 'Dedizierte Entwicklungsteams und Spezialisten.' },
  'portfolio': { title: 'Portfolio | AutomatonSoft GmbH', description: 'Software, Automation und Artificial Intelligence.' },
  'blog': { title: 'Blog | AutomatonSoft GmbH', description: 'Einblicke in Softwareentwicklung und Automatisierung.' },
  'kontakt': { title: 'Kontakt | AutomatonSoft GmbH', description: 'Kontaktieren Sie AutomatonSoft GmbH.' },
  'impressum': { title: 'Impressum | AutomatonSoft GmbH', description: 'Impressum von AutomatonSoft GmbH.' },
  'datenschutz': { title: 'Datenschutz | AutomatonSoft GmbH', description: 'Datenschutzerklärung von AutomatonSoft GmbH.' },
};

export function getStaticPaths() {
  return pageSlugs.map((slug) => ({ slug: slug ? [slug] : [] }));
}
