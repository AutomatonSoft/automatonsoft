import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('de', 'contact');

export const generateMetadata = route.generateMetadata;
export default route.Page;
