import { cn } from '@/lib/utils';

// A row of filter chips with counts: swipeable single line on phones, wrapping from sm up.
export default function FilterTabs({ options, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto max-sm:-mx-4 max-sm:px-4 max-sm:pb-0.5 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
      {options.map(([id, label, count]) => (
        <button key={id} type="button" aria-pressed={active === id} onClick={() => onChange(id)}
          className={cn('h-9 shrink-0 rounded-full border px-3.5 text-sm font-semibold whitespace-nowrap transition-colors sm:h-10',
            active === id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground')}>
          {label} <span className={cn('ml-0.5 tabular-nums', active === id ? 'text-primary-foreground/80' : 'opacity-70')}>{count}</span>
        </button>
      ))}
    </div>
  );
}
