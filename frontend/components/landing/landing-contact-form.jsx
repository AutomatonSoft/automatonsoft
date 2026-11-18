'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { getAttribution } from '@/lib/attribution';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const control = 'h-12 rounded-xl bg-background/70 px-3.5 text-[15px] md:text-[15px] dark:bg-background/70';

// Same endpoint and attribution as the main contact form; t = dictionary.contact, messageLabel from the landing.
export default function LandingContactForm({ locale, t, messageLabel, privacyHref }) {
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
    return <p role="status" className="rounded-2xl border border-primary/30 bg-background/60 p-8 text-lg font-semibold">{t.success}</p>;
  }

  return (
    <form onSubmit={submit} className="relative grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-name">{t.name}</Label><Input id="lead-name" name="name" autoComplete="name" maxLength={160} required className={control} /></div>
        <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-email">{t.emailField}</Label><Input id="lead-email" name="email" type="email" autoComplete="email" maxLength={254} required className={control} /></div>
      </div>
      <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-company">{t.company}</Label><Input id="lead-company" name="company" autoComplete="organization" maxLength={160} className={control} /></div>
      <div className="grid gap-1.5"><Label className="text-secondary-foreground" htmlFor="lead-message">{messageLabel}</Label><Textarea id="lead-message" name="message" rows={4} maxLength={5000} required className="min-h-28 rounded-xl bg-background/70 px-3.5 py-3 text-[15px] md:text-[15px] dark:bg-background/70" /></div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
        <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-primary" />
        <span>{t.consent} <a href={privacyHref} className="text-primary underline underline-offset-2">{t.privacyLink}</a>.</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className={cn(buttonVariants({ size: 'xl', className: 'h-auto min-h-12 shrink py-3 whitespace-normal hover:bg-primary hover:brightness-110' }))}>
          {status === 'sending' ? t.sending : t.submit}<ArrowRight aria-hidden="true" />
        </button>
        {status === 'error' && <p role="alert" className="text-sm font-medium text-destructive">{t.error}</p>}
      </div>
    </form>
  );
}
