import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { panel } from '@/components/dashboard/styles';

export const leadStatuses = ['new', 'active', 'client', 'declined'];

// Everything in `attribution` comes from the public form: it is shown as text, never as a link.
const hostname = (url) => {
  try { return new URL(url).hostname; } catch { return url; }
};
const sourceLabel = ({ utm_source, utm_campaign, gclid, referrer }) =>
  [utm_source, utm_campaign, gclid && 'Google Ads', !utm_source && referrer && hostname(referrer)].filter(Boolean).join(' · ');

// `note` is the text in the field, which can be ahead of the saved lead.note.
export default function LeadCard({ lead, note, t, lang, onType, onChange, onDelete }) {
  const source = sourceLabel(lead.attribution);
  const { landing_page: firstPage } = lead.attribution;

  return (
    <article className={cn(panel, 'p-4 sm:p-5')}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h2 className="text-lg font-bold">{lead.name}{lead.company && <span className="font-normal text-muted-foreground"> · {lead.company}</span>}</h2>
          <p className="flex flex-wrap gap-x-4 text-sm font-medium text-primary">
            <a href={`mailto:${lead.email}`} className="py-1 break-all hover:underline">{lead.email}</a>
            {lead.phone && <a href={`tel:${lead.phone}`} className="py-1 hover:underline">{lead.phone}</a>}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {lead.locale && <Badge variant="accent">{lead.locale.toUpperCase()}</Badge>}
          <time dateTime={lead.created_at}>{new Date(lead.created_at).toLocaleString(lang, { dateStyle: 'medium', timeStyle: 'short' })}</time>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 break-words whitespace-pre-line">{lead.message}</p>
      {(firstPage || source) && (
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs break-all text-muted-foreground">
          {firstPage && <span>{t.firstPage}: {firstPage}</span>}
          {source && <span>{t.source}: {source}</span>}
        </p>
      )}
      <div className="mt-4 space-y-3 border-t border-border pt-4">
        <div role="group" aria-label={t.statusLabel} className="grid grid-cols-4 gap-1 rounded-xl border border-border bg-background p-1 sm:flex sm:w-fit">
          {leadStatuses.map((status) => (
            <button key={status} type="button" aria-pressed={lead.status === status} onClick={() => lead.status !== status && onChange(lead, { status })}
              className={cn('h-9 rounded-lg px-1 text-[13px] font-semibold whitespace-nowrap sm:px-3', lead.status === status ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-card hover:text-foreground')}>
              {t.leadStatus[status]}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          {/* The note saves itself when the field is left. */}
          <Textarea value={note} onChange={(event) => onType(event.target.value)} onBlur={() => note.trim() !== lead.note && onChange(lead, { note: note.trim() })}
            maxLength={2000} rows={1} aria-label={`${t.note}: ${lead.name}`} placeholder={t.notePlaceholder} className="min-h-10 bg-background" />
          <button type="button" onClick={() => onDelete(lead)} aria-label={`${t.deleteButton}: ${lead.name}`} title={t.deleteButton}
            className={cn(buttonVariants({ variant: 'outline' }), 'size-10 bg-card text-destructive hover:bg-destructive/10 hover:text-destructive')}><Trash2 /></button>
        </div>
      </div>
    </article>
  );
}
