import { LandingLayout } from '@/components/landing/landing-route';

export default function GermanLandingLayout({ children }) {
  return <LandingLayout locale="de">{children}</LandingLayout>;
}
