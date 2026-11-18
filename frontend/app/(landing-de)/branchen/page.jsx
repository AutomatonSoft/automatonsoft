import { createIndustriesRoute } from '@/components/landing/landing-route';

const route = createIndustriesRoute('de');

export const generateMetadata = route.generateMetadata;
export default route.Page;
