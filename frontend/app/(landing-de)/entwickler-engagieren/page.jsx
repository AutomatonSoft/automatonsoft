import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('de', 'hire');

export const generateMetadata = route.generateMetadata;
export default route.Page;
