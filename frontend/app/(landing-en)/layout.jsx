import { LandingLayout } from '@/components/landing/landing-route';

export default function EnglishLandingLayout({ children }) {
  return <LandingLayout locale="en">{children}</LandingLayout>;
}
