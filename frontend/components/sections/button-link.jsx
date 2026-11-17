import { ArrowRight } from 'lucide-react';

export default function ButtonLink({ href, variant = 'primary', arrow = false, children }) {
  return <a href={href} className={`btn btn-${variant}`}>{children}{arrow && <ArrowRight className="btn-arrow" aria-hidden="true" />}</a>;
}
