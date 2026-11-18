import { createPortfolioRoute } from '@/components/landing/project-route';

const route = createPortfolioRoute('en');

export const generateMetadata = route.generateMetadata;
export default route.Page;
