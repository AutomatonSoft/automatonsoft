import { createHomeRoute } from '@/components/landing/home-route';

const route = createHomeRoute('en');

export const generateMetadata = route.generateMetadata;
export default route.Page;
