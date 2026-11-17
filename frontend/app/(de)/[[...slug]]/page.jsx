import { createLocaleRoute } from '@/components/pages/locale-page';

const route = createLocaleRoute('de');

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
