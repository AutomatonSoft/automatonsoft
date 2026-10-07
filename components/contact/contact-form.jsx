'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getAttribution } from '@/lib/attribution';
import FormField from '@/components/contact/form-field';

export default function ContactForm({ locale, t, privacyHref }) {
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

  if (status === 'success') return <div className="badge-note" role="status">{t.success}</div>;

  return (
    <form id="contact-form" className="form-grid" onSubmit={submit}>
      <FormField label={t.name} name="name" autoComplete="name" maxLength={160} required />
      <FormField label={t.emailField} name="email" type="email" autoComplete="email" maxLength={254} required />
      <FormField label={t.company} name="company" autoComplete="organization" maxLength={160} />
      <FormField label={t.phoneField} name="phone" type="tel" autoComplete="tel" maxLength={60} />
      <FormField label={t.message} name="message" as="textarea" maxLength={5000} required full />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <label className="consent field full" style={{ flexDirection: 'row' }}>
        <input type="checkbox" name="consent" required />
        <span>{t.consent} <a href={privacyHref}>{t.privacyLink}</a>.</span>
      </label>
      <div className="field full">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}</button>
        {status === 'error' && <p role="alert" style={{ color: '#c0392b' }}>{t.error}</p>}
      </div>
    </form>
  );
}
