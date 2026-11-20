import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { href as pageHref } from '@/lib/i18n';
import { addressLines, siteConfig } from '@/lib/site-config';
import LandingContactForm from '@/components/landing/landing-contact-form';

// Building blocks of design E (docs/TZ.md §6), shared by the home page and the industry landings:
// huge black headings, rounded blocks, three tones (wave = loud blue, foam = loud light, deep = calm white card).
export const wrap = 'mx-auto w-full max-w-[1200px] px-4 sm:px-6';
export const gap = 'pt-28 sm:pt-36';
export const bigTitle = 'font-black text-[clamp(2.5rem,5.2vw,5.25rem)] leading-[0.95] tracking-[-0.05em] text-balance';
export const pill = 'rounded-full px-3 py-1.5 text-[13px] font-bold';
// A row of choices (filters, related links): one swipeable line on phones, wrapping from sm up. Not for tags that must stay readable.
export const chipRow = 'flex gap-2 overflow-x-auto max-sm:-mx-4 max-sm:px-4 max-sm:pb-1 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:flex-wrap sm:gap-2.5 [&>*]:shrink-0 [&>*]:whitespace-nowrap';
export const button = 'inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-center text-[17px] font-extrabold text-balance transition-opacity hover:opacity-85 max-sm:min-h-12 max-sm:px-5 max-sm:py-3 max-sm:text-[15px]';
export const block = 'rounded-[2.25rem] shadow-[0_1px_2px_rgba(10,15,36,0.05),0_14px_36px_rgba(6,37,135,0.06)]';
export const hover = 'transition hover:-translate-y-1.5';
export const num = (index) => String(index + 1).padStart(2, '0');

export const tone = {
  wave: { card: 'bg-primary text-primary-foreground', tag: 'bg-ink/25', button: 'bg-ink text-white', muted: 'text-primary-foreground', accent: 'text-primary-foreground' },
  foam: { card: 'bg-foam text-ink', tag: 'bg-ink/10', button: 'bg-ink text-white', muted: 'text-ink/75', accent: 'text-ink' },
  deep: { card: 'bg-card text-foreground', tag: 'bg-secondary', button: 'bg-secondary text-foreground', muted: 'text-muted-foreground', accent: 'text-lilac' },
};

// parts: [plain, accent], or one string: its last sentence (or last word) becomes the accent.
export function splitTitle(text) {
  const sentences = text.split(/(?<=\.) /);
  if (sentences.length > 1) return [sentences.slice(0, -1).join(' '), sentences.at(-1)];
  const words = text.split(' ');
  return [words.slice(0, -1).join(' '), words.at(-1)];
}

export function Title({ parts, as: Tag = 'h2', className = '' }) {
  const [head, accent] = Array.isArray(parts) ? parts : splitTitle(parts);
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
// Desktop: one card with the text and the steps next to the form. Phone: the card dissolves (display: contents) into two cards,
// so the order is heading, form, steps.
const phoneCard = 'max-lg:rounded-[2.25rem] max-lg:bg-card max-lg:p-6 max-lg:shadow-[0_1px_2px_rgba(10,15,36,0.05),0_14px_36px_rgba(6,37,135,0.06)] sm:max-lg:p-10';

export function ContactSection({ id, locale, contact, formT, privacyHref }) {
  return (
    <Section id={id} className="pb-24">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className={cn(block, 'bg-card p-6 sm:p-10 max-lg:contents lg:col-start-1 lg:row-start-1')}>
          <div className={cn('max-lg:order-1', phoneCard)}>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95] font-black tracking-[-0.045em]">{contact.title}</h2>
            <p className="mt-5 text-muted-foreground">{contact.text}</p>
          </div>
          <div className={cn('max-lg:order-3', phoneCard)}>
            {contact.nextTitle && <p className="text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase sm:tracking-[0.14em] lg:mt-8">{contact.nextTitle}</p>}
            <ol className={cn('grid grid-cols-1 gap-3', contact.nextTitle ? 'mt-4' : 'lg:mt-8')}>
              {contact.next.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 rounded-[1.25rem] bg-secondary p-3.5 sm:gap-x-4 sm:p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-black text-primary-foreground sm:row-span-2 sm:self-start">{index + 1}</span>
                  <span className="block font-extrabold">{step.title}</span>
                  <span className="col-span-2 block text-sm text-muted-foreground sm:col-span-1 sm:col-start-2">{step.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted-foreground">{contact.points.join(' · ')}</p>
          </div>
        </div>
        <div className={cn(block, 'order-2 bg-secondary p-6 sm:p-10 lg:sticky lg:top-24 lg:order-none lg:col-start-2 lg:row-start-1')}>
          <LandingContactForm locale={locale} t={formT} messageLabel={contact.message} privacyHref={privacyHref} />
        </div>
      </div>
    </Section>
  );
}

// Numbered process steps: first card loud blue, last loud ice, the rest calm white.
export function StepCards({ steps }) {
  return (
    <ol className={cn('mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2', steps.length === 4 ? 'lg:grid-cols-4' : steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-5')}>
      {steps.map((step, index) => {
        const middle = index > 0 && index < steps.length - 1;
        const scheme = tone[index === 0 ? 'wave' : middle ? 'deep' : 'foam'];
        return (
          <li key={step.title} className={cn(block, 'flex min-h-60 min-w-0 flex-col gap-10 p-6', scheme.card)}>
            <span className={cn('text-7xl leading-[0.85] font-black tracking-[-0.05em]', middle && 'text-lilac')}>{num(index)}</span>
            <span>
              <span className="block min-h-[2.5em] text-[1.125rem] leading-tight font-extrabold tracking-[-0.02em] break-words">{step.title}</span>
              <span className={cn('mt-1.5 block text-[15px]', scheme.muted)}>{step.text}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// Ways of working together (project, dedicated team, extension): the middle card is the loud one. t: dictionary home.engagement.
export function ModelCards({ locale, models, bestFor }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
      {models.map((model, index) => {
        const scheme = tone[index === 1 ? 'wave' : 'deep'];
        return (
          <div key={model.id} className={cn(block, 'flex flex-col p-6 sm:p-8', scheme.card)}>
            <h3 className="text-2xl font-black tracking-[-0.03em]">{model.title}</h3>
            <p className={cn('mt-2 text-sm', scheme.muted)}>{bestFor} {model.bestFor}</p>
            <ul className="mt-6 mb-8 grid grid-cols-1 gap-3 text-[15px]">
              {model.points.map((point) => <li key={point} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={2.6} /><span className="min-w-0 break-words">{point}</span></li>)}
            </ul>
            <a href={pageHref(locale, model.target)} className={cn(button, 'mt-auto self-start', scheme.button)}>{model.cta} →</a>
          </div>
        );
      })}
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="rounded-[1.25rem] bg-secondary p-4">
      <dt className="text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase sm:tracking-[0.14em]">{label}</dt>
      <dd className="mt-1 text-lg font-extrabold break-words">{children}</dd>
    </div>
  );
}

// Phone, e-mail, WhatsApp and address. t: dictionary.contact (labels).
export function InfoCard({ t }) {
  const link = 'hover:text-lilac';
  return (
    <div className={cn(block, 'bg-card p-6 sm:p-10')}>
      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{t.infoTitle}</h2>
      <dl className="mt-6 grid grid-cols-1 gap-3">
        <InfoRow label={t.phone}><a href={siteConfig.phone.href} className={link}>{siteConfig.phone.display}</a></InfoRow>
        <InfoRow label={t.email}><a href={`mailto:${siteConfig.email}`} className={link}>{siteConfig.email}</a></InfoRow>
        <InfoRow label={t.whatsapp}><a href={siteConfig.whatsapp.href} target="_blank" rel="noopener noreferrer" className={link}>{siteConfig.whatsapp.display}</a></InfoRow>
        <InfoRow label={t.address}><span className="text-base font-bold">{siteConfig.name}<br />{addressLines[0]}<br />{addressLines[1]}</span></InfoRow>
      </dl>
    </div>
  );
}
