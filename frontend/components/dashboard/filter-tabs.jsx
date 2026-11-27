import { cn } from '@/lib/utils';

// A row of filters with their counts: options = [[id, label, count], …].
export default function FilterTabs({ options, active, onChange }) {
  return (
    // More than three do not fit one phone line: they stand in an even grid there.
    <div className={cn('gap-1 rounded-xl border border-border bg-card p-1', options.length > 3 ? 'grid grid-cols-3 sm:flex' : 'flex flex-wrap')}>
      {options.map(([id, label, count]) => (
        <button key={id} type="button" aria-pressed={active === id} onClick={() => onChange(id)}
          className={cn('h-9 flex-auto rounded-lg px-2 text-[13px] font-semibold whitespace-nowrap sm:px-3 sm:text-sm', active === id ? 'bg-secondary text-primary' : 'text-muted-foreground hover:text-foreground')}>
          {label} <span className="ml-0.5 tabular-nums opacity-70">{count}</span>
        </button>
      ))}
    </div>
  );
}
