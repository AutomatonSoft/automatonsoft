const pages = {
  home: { meta: {} },
  portfolio: { eyebrow: 'Portfolio', meta: { title: 'Portfolio', description: 'Software, automation and artificial intelligence – projects by AutomatonSoft.' } },
  company: {
    meta: { title: 'Company', description: 'Meet AutomatonSoft – software built in close dialogue with our clients.' },
    eyebrow: 'About us', title: 'Great software is built in dialogue.', intro: 'AutomatonSoft builds digital solutions for companies that want to measurably improve their processes.',
    sections: [
      { title: 'What sets us apart', text: 'We combine domain understanding, clear communication and solid engineering.', items: ['Direct contacts', 'Tailored solutions instead of standard processes', 'From idea to operations'] },
      { title: 'How we work', text: 'We start with your requirements, deliver transparently in milestones and improve continuously.', items: ['Analysis & concept', 'Development & quality assurance', 'Operations & evolution'] },
    ],
  },
  services: {
    meta: { title: 'Services', description: 'Software development, web, mobile, UI/UX and automation by AutomatonSoft.' },
    eyebrow: 'Services', title: 'Technology that fits your business.', intro: 'From consulting to operations: we build digital products, integrations and automated processes.',
    sections: [
      { title: 'Software development', text: 'Tailor-made web, desktop and backend applications for complex business processes.', items: ['Custom business software', 'APIs & integrations', 'Data and process automation'] },
      { title: 'Digital products', text: 'We design and build applications that simply work for employees and customers.', items: ['Web development', 'Mobile apps', 'UI/UX design'] },
    ],
  },
  industries: {
    meta: { title: 'Industries', description: 'Digital solutions for e-commerce, logistics, manufacturing, hospitality and automotive.' },
    eyebrow: 'Industries', title: 'Solutions for real workflows.', intro: 'Our experience ranges from e-commerce and logistics to manufacturing, hospitality and automotive.',
    sections: [
      { title: 'E-commerce & retail', text: 'Reliably connect product data, marketplaces, orders and back-office processes.', items: ['Marketplace automation', 'Product data management', 'Order management'] },
      { title: 'Industry & services', text: 'Digital systems for planning, organisation and continuous improvement.', items: ['Workforce management', 'Industrial AI', 'Finance & accounting'] },
    ],
  },
  hire: {
    meta: { title: 'Hire developers', description: 'Dedicated development teams and specialists for your project.' },
    eyebrow: 'Teams & specialists', title: 'Engineering expertise whenever you need it.', intro: 'Extend your team with experienced specialists for specific projects or long-term initiatives.',
    sections: [
      { title: 'Scale flexibly', text: 'We work as a dedicated team, augment your existing team or take over clearly scoped projects.', items: ['Full-stack development', 'Web & mobile', 'DevOps, QA and UI/UX'] },
      { title: 'Collaborate clearly', text: 'You get transparent communication, traceable results and a dedicated technical contact.', items: ['Direct alignment', 'Predictable milestones', 'Long-term partnership'] },
    ],
  },
  blog: {
    meta: { title: 'Blog', description: 'Insights into software development, automation and digital products.' },
    eyebrow: 'Blog', title: 'Knowledge for digital decisions.', intro: 'Insights into software development, automation and building sustainable digital products.',
    sections: [
      { title: 'Custom software', text: 'When off-the-shelf software is enough – and when a tailored solution makes the decisive difference.', items: ['Software strategy', 'Business processes', 'Digital products'] },
      { title: 'Automation', text: 'How integrations and well-structured data noticeably reduce repetitive work.', items: ['Workflows', 'Integrations', 'Artificial intelligence'] },
    ],
  },
  contact: {
    meta: { title: 'Contact', description: 'Contact AutomatonSoft GmbH – free initial consultation for your software project.' },
    eyebrow: 'Contact', title: 'Let’s talk about your project.', intro: 'Briefly describe your idea or challenge. We will get back to you with an initial assessment.',
  },
  imprint: {
    meta: { title: 'Legal notice', description: 'Legal notice of AutomatonSoft GmbH.' },
    eyebrow: 'Legal', title: 'Legal notice', intro: 'Information pursuant to § 5 TMG (German Telemedia Act).',
    sections: [
      { title: 'Provider', address: true, items: ['Phone: +49 7392 9378410', 'Email: info@automatonsoft.de'] },
      { title: 'Disclaimer', text: 'The content of this website is created with care. We accept no liability for external content we link to.', items: ['Copyright', 'Liability for links'] },
    ],
  },
  privacy: {
    meta: { title: 'Privacy policy', description: 'Privacy policy of AutomatonSoft GmbH.' },
    eyebrow: 'Legal', title: 'Privacy policy', intro: 'Protecting your personal data is important to us.',
    sections: [
      { title: 'Data controller', address: true, items: ['Contact requests', 'Server log data'] },
      { title: 'Your rights', text: 'You have the right to access, rectification, erasure, restriction of processing, data portability and objection.', items: ['Access', 'Rectification', 'Erasure'] },
    ],
  },
};

export default pages;
