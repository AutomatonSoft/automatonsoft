import { createNotFoundRoute } from '@/components/landing/page-route';

const route = createNotFoundRoute('de');

export const generateMetadata = route.generateMetadata;
export default route.Page;
