import { cn } from '@/lib/utils';
import { panel } from '@/components/dashboard/styles';

export function Card({ title, hint, children }) {
  return (
    <section className={cn(panel, 'space-y-4 p-4 sm:p-5')}>
      {title && <h2 className="text-lg font-black text-ink">{title}</h2>}
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      {children}
    </section>
  );
}

// The control inside must carry id={name}, so a click on the label focuses it.
export function Field({ name, label, hint, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Check({ children, ...props }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-2.5 text-sm font-medium">
      <input type="checkbox" className="size-5 shrink-0 accent-primary" {...props} />
      <span>{children}</span>
    </label>
  );
}
