import home from './home';
import pages from './pages';

const en = {
  localeName: 'English',
  ogLocale: 'en_US',
  meta: {
    title: 'AutomatonSoft GmbH – Custom Software, Web, Mobile & Automation',
    description: 'AutomatonSoft builds custom software, websites, apps, AI solutions and business automation for companies worldwide. Engineered in Germany.',
  },
  nav: {
    tagline: 'Custom software engineered in Germany', skip: 'Skip to content', closeMenu: 'Close menu',
    label: 'Main navigation', company: 'Company', services: 'Services', industries: 'Industries', portfolio: 'Portfolio', hire: 'Hire developers',
    login: 'Log in', cta: 'Get in touch', openMenu: 'Open menu', language: 'Language',
  },
  footer: {
    tagline: 'Custom software development, web, mobile and automation engineered in Germany – for companies with high standards.',
    cta: 'Start a project', services: 'Services', industries: 'Industries', company: 'Company', contact: 'Contact',
    aboutUs: 'About us', portfolio: 'Portfolio', hire: 'Hire developers', contactPage: 'Contact', whatsapp: 'WhatsApp',
    rights: 'All rights reserved.', imprint: 'Legal notice', privacy: 'Privacy', backToTop: 'Back to top',
  },
  common: { home: 'Home', helpTitle: 'How can we help?', helpText: 'We look forward to hearing from you.', helpCta: 'Get in touch' },
  quickContact: { whatsapp: 'Chat on WhatsApp', whatsappText: 'Hello AutomatonSoft, I am interested in a software project.' },
  home,
  portfolio: {
    title: 'Software. Automation. Artificial Intelligence.',
    intro: 'Platforms, automation and AI solutions across nine categories – from e-commerce and workforce management to industrial AI.',
    catalogEyebrow: 'Portfolio', catalogTitle: 'All solutions', catalogText: 'Filter by category to see what we have built in your field.',
    all: 'All', loading: 'Loading projects …', empty: 'No projects have been published in this category yet.', preparing: 'In preparation',
    categories: {
      'ecommerce-marketplace-automation': 'E-commerce & marketplaces', 'workforce-hr-automation': 'Workforce & HR', 'ai-business-solutions': 'AI business solutions',
      'supply-chain-warehouse': 'Supply chain & warehouse', 'industrial-ai-manufacturing': 'Industrial AI & manufacturing', 'hospitality-hotel-software': 'Hospitality',
      'automotive-software': 'Automotive', 'finance-accounting-automation': 'Finance & accounting', 'custom-software-business-automation': 'Custom software',
    },
    ctaTitle: 'Your requirement doesn’t fit a category?', ctaButton: 'Request a project',
    ctaText: 'We build custom software for business processes that go beyond our existing portfolio.',
  },
  contact: {
    infoTitle: 'Reach us directly', phone: 'Phone', email: 'Email', address: 'Address', whatsapp: 'WhatsApp',
    formTitle: 'Request a project', name: 'Name', emailField: 'Email', company: 'Company (optional)', phoneField: 'Phone (optional)',
    message: 'Your message', consent: 'I agree that my details will be stored to process my request. See our',
    privacyLink: 'privacy policy', submit: 'Send request', sending: 'Sending …',
    success: 'Thank you! We have received your request and will get back to you shortly.', error: 'Your request could not be sent. Please email us directly.',
  },
  pages,
};

export default en;
