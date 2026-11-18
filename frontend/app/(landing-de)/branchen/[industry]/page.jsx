import { createLandingRoute } from '@/components/landing/landing-route';

const route = createLandingRoute('de');

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
