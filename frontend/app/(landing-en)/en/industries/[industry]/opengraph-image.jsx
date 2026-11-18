import { createLandingOgImage } from '@/components/landing/og-image';

const image = createLandingOgImage('en');

export { size } from '@/components/landing/og-image';
export const contentType = 'image/png';
export const generateStaticParams = image.generateStaticParams;
export default image.Image;
