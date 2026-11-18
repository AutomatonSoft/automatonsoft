import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import LandingContactForm from '@/components/landing/landing-contact-form';

// Building blocks of design E (docs/TZ.md §6), shared by the home page and the industry landings:
// huge black headings, rounded blocks, three tones (wave = loud blue, foam = loud light, deep = calm white card).
export const wrap = 'mx-auto w-full max-w-[1200px] px-4 sm:px-6';
export const gap = 'pt-28 sm:pt-36';
export const bigTitle = 'font-black text-[clamp(2.5rem,5.2vw,5.25rem)] leading-[0.95] tracking-[-0.05em] text-balance';
export const pill = 'rounded-full px-3 py-1.5 text-[13px] font-bold';
export const button = 'inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-center text-[17px] font-extrabold transition hover:brightness-110';
export const block = 'rounded-[2.25rem] shadow-[0_1px_2px_rgba(10,15,36,0.05),0_14px_36px_rgba(6,37,135,0.06)]';
export const hover = 'transition hover:-translate-y-1.5';
export const num = (index) => String(index + 1).padStart(2, '0');

export const tone = {
  wave: { card: 'bg-primary text-primary-foreground', tag: 'bg-ink/25', button: 'bg-ink text-white', muted: 'text-primary-foreground', accent: 'text-primary-foreground' },
  foam: { card: 'bg-foam text-ink', tag: 'bg-ink/10', button: 'bg-ink text-white', muted: 'text-ink/75', accent: 'text-ink' },
  deep: { card: 'bg-card text-foreground', tag: 'bg-secondary', button: 'bg-secondary text-foreground', muted: 'text-muted-foreground', accent: 'text-lilac' },
};

// parts: [plain, accent] or one string whose last word becomes the accent.
export function Title({ parts, as: Tag = 'h2', className = '' }) {
  const [head, accent] = Array.isArray(parts) ? parts : [parts.split(' ').slice(0, -1).join(' '), parts.split(' ').slice(-1)[0]];
  return <Tag className={cn(bigTitle, className)}>{head} <span className="text-lilac">{accent}</span></Tag>;
}

export function Section({ id, className, children }) {
  return <section id={id} className={cn(wrap, gap, id && 'scroll-mt-24', className)}>{children}</section>;
}

export function Lead({ children, className }) {
  return <p className={cn('mt-6 max-w-[560px] text-muted-foreground', className)}>{children}</p>;
}

// Card grid with the numbered, tone-coded cards used for problems, steps and models.
export function NumberCards({ items, tones, columns = 'md:grid-cols-3', as: Item = 'div', children }) {
  return (
    <Item className={cn('mt-12 grid gap-4', columns)}>
      {items.map((item, index) => {
        const scheme = tone[tones[index] || 'deep'];
        return (
          <li key={item.title} className={cn(block, 'flex min-h-60 flex-col justify-between gap-8 p-7 sm:p-8', scheme.card)}>
            <span className={cn('text-7xl leading-[0.85] font-black tracking-[-0.05em]', scheme.accent)}>{num(index)}</span>
            <span>
              <h3 className="text-[1.375rem] font-extrabold tracking-[-0.02em]">{item.title}</h3>
              <p className={cn('mt-1.5 text-[15px]', scheme.muted)}>{item.text}</p>
            </span>
          </li>
        );
      })}
      {children}
    </Item>
  );
}

// Native details keep every answer in the static HTML for search engines and work without JavaScript.
export function FaqSection({ title, text, items, extra }) {
  return (
    <Section id="faq">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div>
          <Title parts={title} />
          <Lead className="max-w-[380px]">{text}</Lead>
          {extra}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {items.map((item, index) => (
            <details key={item.q} open={index === 0} className="group rounded-[1.75rem] bg-card px-7 shadow-[0_1px_2px_rgba(10,15,36,0.05)] open:bg-secondary">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 break-words">{item.q}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-open:rotate-45"><Plus aria-hidden="true" className="size-4.5" strokeWidth={2.6} /></span>
              </summary>
              <p className="max-w-[640px] pb-7 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

// contact: { title, text, points, nextTitle?, next, message }; formT: dictionary.contact (field labels).
export function ContactSection({ id, locale, contact, formT, privacyHref }) {
  return (
    <Section id={id} className="pb-24">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className={cn(block, 'bg-card p-8 sm:p-10')}>
          <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95] font-black tracking-[-0.045em]">{contact.title}</h2>
          <p className="mt-5 text-muted-foreground">{contact.text}</p>
          {contact.nextTitle && <p className="mt-8 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{contact.nextTitle}</p>}
          <ol className={cn('grid gap-3', contact.nextTitle ? 'mt-4' : 'mt-8')}>
            {contact.next.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-[1.25rem] bg-secondary p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-black text-primary-foreground">{index + 1}</span>
                <span><span className="block font-extrabold">{step.title}</span><span className="mt-0.5 block text-sm text-muted-foreground">{step.text}</span></span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">{contact.points.join(' · ')}</p>
        </div>
        <div className={cn(block, 'bg-secondary p-6 sm:p-10')}>
          <LandingContactForm locale={locale} t={formT} messageLabel={contact.message} privacyHref={privacyHref} />
        </div>
      </div>
    </Section>
  );
}
