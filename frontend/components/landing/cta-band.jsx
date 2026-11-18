import { block, button, gap, wrap } from '@/components/landing/blocks';

// The big blue call to action. Rule (docs/TZ.md §6): one per page. secondary: optional { href, label } (phone).
export default function CtaBand({ title, text, cta, href, secondary }) {
  return (
    <section className={`${wrap} ${gap}`}>
      <div className={`${block} relative overflow-hidden bg-primary p-[clamp(1.5rem,6vw,6rem)] text-primary-foreground`}>
        <div aria-hidden="true" className="absolute -right-30 -bottom-45 size-130 rounded-full border-[90px] border-white/22" />
        <h2 className="relative max-w-[1000px] text-[clamp(3.25rem,8vw,8rem)] leading-[0.9] font-black tracking-[-0.055em]">{title}</h2>
        {text && <p className="relative mt-6 max-w-[560px] text-lg">{text}</p>}
        <div className="relative mt-10 flex flex-wrap gap-3">
          <a href={href} className={`${button} w-full bg-ink text-white max-sm:px-4 max-sm:text-base sm:w-auto`}><span>{cta}&nbsp;→</span></a>
          {secondary && <a href={secondary.href} className={`${button} w-full bg-ink/25 max-sm:text-base sm:w-auto`}>{secondary.label}</a>}
        </div>
      </div>
    </section>
  );
}
