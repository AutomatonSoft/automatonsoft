import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('en', 'company');

export const generateMetadata = route.generateMetadata;
export default route.Page;
