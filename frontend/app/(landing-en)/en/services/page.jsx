import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('en', 'services');

export const generateMetadata = route.generateMetadata;
export default route.Page;
