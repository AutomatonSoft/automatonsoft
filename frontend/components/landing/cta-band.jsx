import { ArrowRight } from 'lucide-react';

// The signature turquoise call to action. Rule (docs/TZ.md §6): one per page; besides it only the hero stage may be a large turquoise surface.
export default function CtaBand({ title, text, cta, href }) {
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#35d0c6_0%,#7fe9e2_55%,#35d0c6_100%)] px-7 py-12 text-primary-foreground sm:px-14 sm:py-16">
      <div aria-hidden="true" className="absolute -top-24 -right-16 size-72 rounded-full border-[40px] border-white/20" />
      <div className="relative max-w-[620px]">
        <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.035em]">{title}</h2>
        {text && <p className="mt-3 text-[17px] text-primary-foreground/80">{text}</p>}
      </div>
      <a href={href} className="relative inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#04222b] px-6 py-3 font-semibold text-white shadow-[0_12px_32px_rgba(4,34,43,0.35)] hover:bg-[#073342]">{cta}<ArrowRight aria-hidden="true" className="size-[18px]" /></a>
    </div>
  );
}
