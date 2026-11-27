import { LoaderCircle } from 'lucide-react';

// Stands in until it is known what to show, so neither the sign-in form nor an empty list flashes by.
// The spinner appears only if that takes longer than a moment.
export default function LoadingScreen({ label }) {
  return (
    <main className="grid min-h-screen place-items-center bg-background" aria-busy="true">
      <div role="status" className="animate-in fade-in fill-mode-backwards delay-300">
        <LoaderCircle className="size-8 animate-spin text-primary" />
        <span className="sr-only">{label}</span>
      </div>
    </main>
  );
}
