import { createPageRoute } from '@/components/landing/page-route';

const route = createPageRoute('en', 'blog');

export const generateMetadata = route.generateMetadata;
export default route.Page;
