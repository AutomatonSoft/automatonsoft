'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { getAttribution } from '@/lib/attribution';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const control = 'h-12 rounded-xl border-muted-foreground/40 bg-background/70 px-3.5 text-[15px] md:text-[15px] dark:bg-background/70';
const card = 'rounded-[2.25rem] p-6 shadow-[0_1px_2px_rgba(10,15,36,0.05),0_14px_36px_rgba(6,37,135,0.06)] sm:p-10';

// Same endpoint and attribution as the main contact form; t = dictionary.contact, messageLabel from the landing.
export default function LandingContactForm({ locale, t, title, messageLabel, privacyHref, className }) {
  const [status, setStatus] = useState('idle');

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus('sending');
    const { ok } = await apiFetch('/contact/', { method: 'POST', json: { ...fields, consent: form.consent.checked, locale, attribution: getAttribution() } })
      .catch(() => ({ ok: false }));
    setStatus(ok ? 'success' : 'error');
    if (ok) form.reset();
  };

  if (status === 'success') {
    return (
      <div role="status" className={cn(card, 'bg-foam text-ink', className)}>
        <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6 stroke-[2.75]" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em] hyphens-none">{t.successTitle}</h2>
        <p className="mt-4 max-w-[460px] text-lg leading-relaxed text-ink/80">{t.success}</p>
        <button type="button" onClick={() => setStatus('idle')}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-extrabold text-white transition-opacity hover:opacity-85">
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className={cn(card, 'bg-secondary', className)}>
      {title && <h2 className="mb-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black tracking-[-0.04em]">{title}</h2>}
      <form onSubmit={submit} className="relative grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-name">{t.name}</Label><Input id="lead-name" name="name" autoComplete="name" maxLength={160} required className={control} /></div>
          <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-email">{t.emailField}</Label><Input id="lead-email" name="email" type="email" autoComplete="email" maxLength={254} required className={control} /></div>
        </div>
        <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-company">{t.company}</Label><Input id="lead-company" name="company" autoComplete="organization" maxLength={160} className={control} /></div>
        <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-message">{messageLabel}</Label><Textarea id="lead-message" name="message" rows={4} maxLength={5000} required className="min-h-28 rounded-xl border-muted-foreground/40 bg-background/70 px-3.5 py-3 text-[15px] md:text-[15px] dark:bg-background/70" /></div>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
        <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
          <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-primary" />
          <span>{t.consent} <a href={privacyHref} className="text-lilac underline underline-offset-2">{t.privacyLink}</a>.</span>
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status === 'sending'} className={cn(buttonVariants({ size: 'xl', className: 'h-auto min-h-12 shrink py-3 whitespace-normal hover:bg-primary hover:opacity-85' }))}>
            {status === 'sending' ? t.sending : t.submit}<ArrowRight aria-hidden="true" />
          </button>
          {status === 'error' && <p role="alert" className="text-sm font-medium text-destructive">{t.error}</p>}
        </div>
      </form>
    </div>
  );
}
