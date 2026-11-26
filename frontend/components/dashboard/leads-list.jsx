import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { panel } from '@/components/dashboard/styles';

const sourceLabel = ({ utm_source, utm_campaign, gclid, referrer }) =>
  [utm_source, utm_campaign, gclid && 'Google Ads', !utm_source && referrer && new URL(referrer).hostname].filter(Boolean).join(' · ');

export default function LeadsList({ leads, t, lang }) {
  if (!leads.length) return <p className={cn(panel, 'p-8 text-center text-muted-foreground')}>{t.noLeads}</p>;
  return (
    <div className="grid gap-3">
      {leads.map((lead) => (
        <article key={lead.id} className={cn(panel, 'p-4 sm:p-5')}>
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
          {sourceLabel(lead.attribution) && <p className="mt-3 border-t border-border pt-3 text-xs break-words text-muted-foreground">{t.source}: {sourceLabel(lead.attribution)}</p>}
        </article>
      ))}
    </div>
  );
}
