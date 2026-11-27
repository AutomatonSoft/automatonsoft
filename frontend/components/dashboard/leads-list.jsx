import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import FilterTabs from '@/components/dashboard/filter-tabs';
import LeadCard, { leadStatuses } from '@/components/dashboard/lead-card';
import SearchField from '@/components/dashboard/search-field';
import { panel } from '@/components/dashboard/styles';

export default function LeadsList({ leads, t, lang, onChange, onDelete }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  // Typed notes are held here, not in the cards: a filter can take a card away before its note is saved.
  const [typed, setTyped] = useState({});
  const unsaved = leads.some((lead) => lead.id in typed && typed[lead.id].trim() !== lead.note);

  // Once the server has a note, the typed copy is dropped, so a later change from elsewhere shows.
  useEffect(() => {
    setTyped((current) => Object.fromEntries(Object.entries(current).filter(([id, text]) => leads.find((lead) => String(lead.id) === id)?.note !== text.trim())));
  }, [leads]);

  useEffect(() => {
    if (!unsaved) return undefined;
    const warn = (event) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [unsaved]);

  const needle = query.trim().toLowerCase();
  const visible = leads.filter((lead) => (filter === 'all' || lead.status === filter)
    && [lead.name, lead.email, lead.company, lead.phone, lead.message, lead.note].join(' ').toLowerCase().includes(needle));
  const count = (status) => leads.filter((lead) => lead.status === status).length;

  if (!leads.length) return <p className={cn(panel, 'p-8 text-center text-muted-foreground')}>{t.noLeads}</p>;
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchField value={query} onChange={setQuery} label={t.searchLeads} />
        <FilterTabs active={filter} onChange={setFilter} options={[['all', t.all, leads.length], ...leadStatuses.map((status) => [status, t.leadFilter[status], count(status)])]} />
      </div>
      {visible.length
        ? (
          <div className="grid gap-3">
            {visible.map((lead) => (
              <LeadCard key={lead.id} lead={lead} note={typed[lead.id] ?? lead.note} t={t} lang={lang} onChange={onChange} onDelete={onDelete}
                onType={(text) => setTyped((current) => ({ ...current, [lead.id]: text }))} />
            ))}
          </div>
        )
        : <p className={cn(panel, 'p-8 text-center text-muted-foreground')}>{t.noLeadsFound}</p>}
    </div>
  );
}
