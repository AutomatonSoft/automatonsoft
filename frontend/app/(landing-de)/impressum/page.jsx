import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('de', 'imprint');

export const generateMetadata = route.generateMetadata;
export default route.Page;
