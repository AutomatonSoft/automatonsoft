// Industry catalogue shared by the homepage explorer, the industries page and the footer.
const industries = {
  items: [
    { id: 'ecommerce', summary: 'Product data, orders and marketplaces from a single source.', services: ['process-automation', 'custom-software', 'ai-solutions'], category: 'ecommerce-marketplace-automation', icon: 'ShoppingCart', title: 'E-commerce & marketplaces',
      challenge: 'Product data, prices and orders are maintained by hand across shops and marketplaces – slow, error-prone and hard to scale.',
      solutions: ['Central product information management', 'Marketplace and shop integrations', 'Automated order and stock sync'],
      reference: { name: 'E-Commerce Automation Suite', text: 'Automated product data management for otto.de, kaufland.de, Google Merchant Center and Shopware from one central product database.' } },
    { id: 'workforce', summary: 'Reliable hours, attendance and project time.', services: ['web-mobile', 'custom-software'], category: 'workforce-hr-automation', icon: 'Users', title: 'Workforce & HR',
      challenge: 'Working hours, attendance and project time are collected by hand – with gaps, disputes and slow payroll and invoicing.',
      solutions: ['Automatic time and activity tracking', 'Timesheets and billable hours', 'GPS time tracking for field teams'],
      reference: { name: 'Hubnity', text: 'Time tracking SaaS with hours, project context, attendance and reports in one workspace – on web, desktop and Android.' } },
    { id: 'supply-chain', summary: 'Orders and warehouse processes under control.', services: ['process-automation', 'custom-software'], category: 'supply-chain-warehouse', icon: 'Package', title: 'Supply chain & warehouse',
      challenge: 'Orders arrive through many channels while warehouse processes rely on paper and manual hand-offs.',
      solutions: ['Central order management', 'Warehouse organisation', 'Supplier and channel integration'],
      reference: { name: 'Supply Chain Automation Suite', text: 'Central order management (OrderHub) and structured warehouse organisation (Warehouse Organizer, BerimDepom) in one suite.' } },
    { id: 'hospitality', summary: 'Bookings and availability across every channel.', services: ['web-mobile', 'process-automation'], category: 'hospitality-hotel-software', icon: 'Hotel', title: 'Hospitality',
      challenge: 'Bookings and availability are spread across platforms, which leads to double bookings and manual reconciliation.',
      solutions: ['Booking and availability management', 'Channel and platform integration', 'Guest and property administration'],
      reference: { name: 'Lunanitiz Hotel Software', text: 'Central management of bookings and availability for hotels and short-term rentals, connected to Airbnb.' } },
    { id: 'automotive', summary: 'Vehicle, customer and job data for dealers and workshops.', services: ['custom-software', 'web-mobile'], category: 'automotive-software', icon: 'Car', title: 'Automotive',
      challenge: 'Vehicle, customer and job data are scattered between the back office and the workshop floor.',
      solutions: ['Dealer and workshop management', 'Vehicle and customer records', 'Mobile apps for the workshop'],
      reference: { name: 'AutoCar Software Suite', text: 'Vehicle, customer and order data for dealerships and workshops – in the back office and on mobile.' } },
    { id: 'finance', summary: 'Digital cash books and less manual bookkeeping.', services: ['process-automation', 'custom-software'], category: 'finance-accounting-automation', icon: 'Landmark', title: 'Finance & accounting',
      challenge: 'Cash handling and bookkeeping are still documented on paper and re-entered manually.',
      solutions: ['Digital cash books', 'Accounting interfaces', 'Document and receipt automation'],
      reference: { name: 'Cashbook', text: 'Digital cash book management for small and medium-sized businesses that handle cash.' } },
    { id: 'industrial-ai', summary: 'Production data that drives decisions.', services: ['ai-solutions', 'process-automation'], category: 'industrial-ai-manufacturing', icon: 'Factory', title: 'Industrial AI & manufacturing',
      challenge: 'Production data exists, but is rarely connected and used for decisions on the shop floor.',
      solutions: ['Production data integration', 'AI-assisted quality and process analysis', 'Shop-floor applications'] },
  ],
};

export default industries;
