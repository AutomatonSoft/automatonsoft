import { Badge } from '@/components/ui/badge';
import { panel } from '@/components/dashboard/styles';

const sourceLabel = ({ utm_source, utm_campaign, gclid, referrer }) =>
  [utm_source, utm_campaign, gclid && 'Google Ads', !utm_source && referrer && new URL(referrer).hostname].filter(Boolean).join(' · ');

export default function LeadsList({ leads, t, lang }) {
  if (!leads.length) return <p className="text-slate-400">{t.noLeads}</p>;
  return (
    <div className="grid gap-4">
      {leads.map((lead) => (
        <article key={lead.id} className={`${panel} p-4`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">{lead.name}{lead.company && <span className="font-normal text-slate-400"> · {lead.company}</span>}</h3>
              <p className="text-sm text-cyan-300"><a href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone && <> · <a href={`tel:${lead.phone}`}>{lead.phone}</a></>}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {lead.locale && <Badge>{lead.locale.toUpperCase()}</Badge>}
              <time dateTime={lead.created_at}>{new Date(lead.created_at).toLocaleString(lang)}</time>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{lead.message}</p>
          {sourceLabel(lead.attribution) && <p className="mt-3 text-xs text-slate-500">{t.source}: {sourceLabel(lead.attribution)}</p>}
        </article>
      ))}
    </div>
  );
}
