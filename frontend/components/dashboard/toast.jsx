import { useEffect } from 'react';
import { CircleAlert, CircleCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Floating message at the bottom of the screen: success disappears by itself, an error stays until closed.
export default function Toast({ notice, closeLabel, onClose }) {
  useEffect(() => {
    if (!notice || notice.error) return undefined;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [notice, onClose]);

  const Icon = notice?.error ? CircleAlert : CircleCheck;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4" role={notice?.error ? 'alert' : 'status'}>
      {notice && (
        <div className={cn('pointer-events-auto flex max-w-md items-center gap-3 rounded-xl py-2 pr-2 pl-4 text-sm font-medium shadow-lg', notice.error ? 'bg-destructive text-white' : 'bg-ink text-white')}>
          <Icon className="size-5 shrink-0" />
          <span>{notice.text}</span>
          <button type="button" onClick={onClose} aria-label={closeLabel} className="grid size-8 shrink-0 place-items-center rounded-lg hover:bg-white/15"><X className="size-4" /></button>
        </div>
      )}
    </div>
  );
}
