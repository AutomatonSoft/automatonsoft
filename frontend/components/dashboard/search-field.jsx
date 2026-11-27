import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { control } from '@/components/dashboard/styles';

export default function SearchField({ value, onChange, label }) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} placeholder={label} className={cn(control, 'pl-9')} />
    </div>
  );
}
