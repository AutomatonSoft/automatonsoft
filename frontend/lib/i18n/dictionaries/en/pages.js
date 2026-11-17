const pages = {
  home: { meta: {} },
  portfolio: { eyebrow: 'Portfolio', meta: { title: 'Portfolio: Software & AI Projects', description: 'Software, automation and artificial intelligence – projects by AutomatonSoft.' } },
  company: {
    meta: { title: 'About Us – Software Company from Germany', description: 'AutomatonSoft GmbH from Burgrieden, Germany builds custom software, web and mobile apps, automation and AI – from concept to operations.' },
    eyebrow: 'About us', title: 'Great software is built in dialogue.',
    intro: 'AutomatonSoft builds digital solutions for companies that want to measurably improve their processes.',
    primaryCta: 'Get to know us', secondaryCta: 'View our work',
    story: {
      eyebrow: 'Who we are', title: 'A software company engineered in Germany',
      paragraphs: [
        'AutomatonSoft GmbH is a software company based in Burgrieden, Baden-Württemberg. We design, build and operate custom software, web and mobile applications, process automation and AI solutions for companies that want more than off-the-shelf.',
        'Our products run in very different industries – from time tracking for distributed teams and AI voice assistants to e-commerce, hospitality and automotive. What connects them is the way we work: close to your processes, transparent in every milestone and responsible from the first concept to daily operations.',
      ],
      factsTitle: 'At a glance',
      facts: [
        { label: 'Company', value: 'AutomatonSoft GmbH' },
        { label: 'Headquarters', value: 'Burgrieden, Germany' },
        { label: 'Focus', value: 'Custom software, automation & AI' },
        { label: 'Portfolio', value: '9 solution categories' },
        { label: 'Languages', value: 'German · English' },
      ],
    },
    values: {
      eyebrow: 'What sets us apart', title: 'Principles behind every project',
      text: 'We combine domain understanding, clear communication and solid engineering.',
      items: [
        { icon: 'Handshake', title: 'Direct contact', text: 'You talk to the people who build your software – a dedicated technical contact instead of ticket queues.' },
        { icon: 'Target', title: 'Tailored, not templated', text: 'Solutions are built around your processes instead of forcing your teams into standard workflows.' },
        { icon: 'Workflow', title: 'End-to-end responsibility', text: 'From the first concept to development, launch and operations – one accountable partner.' },
        { icon: 'ChartColumn', title: 'Transparent milestones', text: 'We deliver in clear stages with visible progress, so decisions are based on working software.' },
        { icon: 'ShieldCheck', title: 'Privacy by design', text: 'GDPR requirements are part of the architecture from the first concept.' },
        { icon: 'UsersRound', title: 'Long-term partnership', text: 'We keep operating and developing your software as your business grows.' },
      ],
    },
    products: {
      eyebrow: 'Our work', title: 'Products we have built',
      text: 'Platforms and solutions from our portfolio – each one built by our own engineering team.',
      link: 'View in portfolio',
      items: [
        { name: 'Hubnity', category: 'workforce-hr-automation', tag: 'Time tracking SaaS' },
        { name: 'Lisa', category: 'ai-business-solutions', tag: 'AI voice assistant' },
        { name: 'E-Commerce Automation Suite', category: 'ecommerce-marketplace-automation', tag: 'Marketplace automation' },
        { name: 'Supply Chain Automation Suite', category: 'supply-chain-warehouse', tag: 'Orders & warehouse' },
        { name: 'Lunanitiz Hotel Software', category: 'hospitality-hotel-software', tag: 'Hospitality' },
        { name: 'AutoCar Software Suite', category: 'automotive-software', tag: 'Automotive' },
        { name: 'Cashbook', category: 'finance-accounting-automation', tag: 'Finance' },
        { name: 'KIDOC_Office', category: 'ai-business-solutions', tag: 'AI document processing' },
      ],
    },
    location: {
      eyebrow: 'Location', title: 'Engineered in Germany, working with clients worldwide',
      text: 'From our headquarters in Burgrieden we work with companies in Germany and internationally – in German and English.',
      directions: 'Get directions',
    },
    ctaTitle: 'Let’s talk about your project', ctaText: 'Tell us about your idea – we will get back to you with an initial assessment and a free, no-obligation consultation.', ctaButton: 'Get in touch',
  },
  services: {
    meta: { title: 'Custom Software, AI & Process Automation', description: 'Custom software, web and mobile apps, process automation, AI solutions, UX/UI design and operations – delivered by one engineering team from Germany.' },
    eyebrow: 'Services', title: 'Technology that fits your business.',
    intro: 'From consulting to operations: we build digital products, integrations and automated processes – as one accountable partner.',
    primaryCta: 'Discuss your project', secondaryCta: 'View case studies',
    overviewEyebrow: 'Overview', overviewTitle: 'Six disciplines, one team', overviewText: 'Combine exactly what you need – every service is delivered by the same engineering team.',
    deliverablesLabel: 'What you get', referenceLabel: 'Reference project', referenceLink: 'View in portfolio',
    tech: {
      eyebrow: 'Technology', title: 'A proven technology stack', text: 'The technologies behind the platforms we have built and run in production.',
      groups: [
        { label: 'Frontend', items: ['TypeScript', 'React', 'Next.js'] },
        { label: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'Django'] },
        { label: 'Data & queues', items: ['PostgreSQL', 'Redis', 'BullMQ'] },
        { label: 'Integrations', items: ['Stripe', 'Twilio', 'Afterbuy', 'Shopware', 'Google Merchant Center', 'Airbnb'] },
        { label: 'Infrastructure', items: ['Docker', 'Nginx', 'GitHub Actions'] },
      ],
    },
    ctaTitle: 'Not sure which service you need?', ctaText: 'Describe your challenge – we will recommend the right approach in a free, no-obligation consultation.',
  },
  industries: {
    meta: { title: 'Software for E-commerce, HR, Logistics & More', description: 'Software and automation for e-commerce, workforce management, supply chain, hospitality, automotive, finance and manufacturing – with products running in production.' },
    eyebrow: 'Industries', title: 'Solutions for real workflows.',
    intro: 'Our experience ranges from e-commerce and logistics to manufacturing, hospitality and automotive – backed by products our team has built.',
    primaryCta: 'Discuss your project', secondaryCta: 'View portfolio',
    overview: { eyebrow: 'Overview', title: 'Seven industries, one engineering team', text: 'Select your industry to see typical challenges, what we build and a reference solution from our portfolio.' },
    servicesLabel: 'Services we apply', referenceLabel: 'Reference solution', viewInPortfolio: 'View in portfolio',
    ctaTitle: 'Your industry is not listed?', ctaText: 'Our custom software and automation work beyond these industries. Tell us about your processes – the first consultation is free and without obligation.',
  },
  hire: {
    meta: { title: 'Hire Developers: Dedicated Teams & Specialists', description: 'Dedicated developers and teams from Germany: full-stack, frontend, backend, mobile, AI, DevOps, QA and UI/UX – as a dedicated team or team extension.' },
    eyebrow: 'Teams & specialists', title: 'Engineering expertise whenever you need it.',
    intro: 'Extend your team with experienced specialists for specific projects or long-term initiatives.',
    primaryCta: 'Request specialists', secondaryCta: 'Compare models',
    roles: {
      eyebrow: 'Roles', title: 'Specialists for every part of your product',
      text: 'Engineers from the team that builds and runs our own products – with hands-on experience in the technologies below.',
      items: [
        { icon: 'CodeXml', title: 'Full-stack developer', text: 'End-to-end features from database to interface.', skills: ['TypeScript', 'React', 'Next.js', 'NestJS', 'PostgreSQL'] },
        { icon: 'Monitor', title: 'Frontend developer', text: 'Fast, accessible web interfaces and dashboards.', skills: ['React', 'Next.js', 'TypeScript'] },
        { icon: 'Database', title: 'Backend developer', text: 'APIs, integrations and data processing.', skills: ['Node.js', 'NestJS', 'Python', 'Django', 'Redis', 'BullMQ'] },
        { icon: 'Smartphone', title: 'Mobile developer', text: 'Apps for customers and field teams.', skills: ['Android', 'iOS', 'Progressive web apps'] },
        { icon: 'Sparkles', title: 'AI engineer', text: 'Voice assistants, document processing and AI integrations.', skills: ['Voice AI', 'Document processing', 'Twilio'] },
        { icon: 'ServerCog', title: 'DevOps engineer', text: 'Deployments, CI/CD and reliable operations.', skills: ['Docker', 'Nginx', 'GitHub Actions'] },
        { icon: 'Bug', title: 'QA engineer', text: 'Testing and quality assurance for every release.', skills: ['Test automation', 'Regression testing', 'Release checks'] },
        { icon: 'PenTool', title: 'UI/UX designer', text: 'Research, prototypes and design systems.', skills: ['UX research', 'Prototyping', 'Design systems'] },
      ],
    },
    steps: {
      eyebrow: 'How it works', title: 'From request to productive team',
      text: 'A clear process, so specialists contribute to your product from the first weeks.',
      items: [
        { title: 'Share your requirements', text: 'Tell us about your project, tech stack, team setup and the roles you need.' },
        { title: 'Matching profiles', text: 'We propose specialists whose experience fits your technology and domain.' },
        { title: 'Meet the team', text: 'Talk to the proposed developers before anything is agreed.' },
        { title: 'Onboarding', text: 'Specialists join your tools, processes and communication channels.' },
        { title: 'Scale as you go', text: 'Regular check-ins and the flexibility to adjust the team as priorities change.' },
      ],
    },
    trust: { eyebrow: 'Why AutomatonSoft', title: 'Safe to scale with', text: 'What you can rely on when our specialists join your team.' },
    ctaTitle: 'Tell us which specialists you need', ctaText: 'Describe the roles, stack and timeline – we will get back to you with matching profiles and the next steps.',
  },
  blog: {
    meta: { title: 'Blog: Software & Automation Insights', description: 'Insights into software development, automation and digital products.' },
    eyebrow: 'Blog', title: 'Knowledge for digital decisions.', intro: 'Insights into software development, automation and building sustainable digital products.',
    sections: [
      { title: 'Custom software', text: 'When off-the-shelf software is enough – and when a tailored solution makes the decisive difference.', items: ['Software strategy', 'Business processes', 'Digital products'] },
      { title: 'Automation', text: 'How integrations and well-structured data noticeably reduce repetitive work.', items: ['Workflows', 'Integrations', 'Artificial intelligence'] },
    ],
  },
  contact: {
    meta: { title: 'Contact – Free Initial Consultation', description: 'Contact AutomatonSoft GmbH – free initial consultation for your software project.' },
    eyebrow: 'Contact', title: 'Let’s talk about your project.', intro: 'Briefly describe your idea or challenge. We will get back to you with an initial assessment.',
  },
  imprint: {
    meta: { title: 'Legal Notice', description: 'Legal notice of AutomatonSoft GmbH.' },
    eyebrow: 'Legal', title: 'Legal notice', intro: 'Information pursuant to § 5 TMG (German Telemedia Act).',
    sections: [
      { title: 'Provider', address: true, items: ['Phone: +49 7392 9378410', 'Email: info@automatonsoft.de'] },
      { title: 'Disclaimer', text: 'The content of this website is created with care. We accept no liability for external content we link to.', items: ['Copyright', 'Liability for links'] },
    ],
  },
  privacy: {
    meta: { title: 'Privacy Policy', description: 'Privacy policy of AutomatonSoft GmbH.' },
    eyebrow: 'Legal', title: 'Privacy policy', intro: 'Protecting your personal data is important to us.',
    sections: [
      { title: 'Data controller', address: true, items: ['Contact requests', 'Server log data'] },
      { title: 'Your rights', text: 'You have the right to access, rectification, erasure, restriction of processing, data portability and objection.', items: ['Access', 'Rectification', 'Erasure'] },
    ],
  },
};

export default pages;
