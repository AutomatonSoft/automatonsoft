import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('de', 'blog');

export const generateMetadata = route.generateMetadata;
export default route.Page;
