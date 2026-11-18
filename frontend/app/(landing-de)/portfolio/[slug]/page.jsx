import { createProjectRoute } from '@/components/landing/project-route';

const route = createProjectRoute('de');

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
