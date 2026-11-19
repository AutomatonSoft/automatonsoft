import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('de', 'privacy');

export const generateMetadata = route.generateMetadata;
export default route.Page;
