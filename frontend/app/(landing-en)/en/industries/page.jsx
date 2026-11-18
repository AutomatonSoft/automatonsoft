import { createIndustriesRoute } from '@/components/landing/landing-route';

const route = createIndustriesRoute('en');

export const generateMetadata = route.generateMetadata;
export default route.Page;
