import '@/app/globals.css';
import RootDocument from '@/components/layout/root-document';

export const metadata = { title: '404 | AutomatonSoft', robots: { index: false } };

const button = 'inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-center text-[17px] font-extrabold text-balance transition-opacity hover:opacity-85 max-sm:min-h-12 max-sm:px-5 max-sm:py-3 max-sm:text-[15px]';

// One entry per language: adding a language to the site means adding one line here (its name in its own language and its home page).
const languages = [
  { name: 'Deutsch', href: '/' },
  { name: 'English', href: '/en' },
];

// Bilingual on purpose: a missing page has no locale. No next/font and no shared blocks here:
// global-not-found is bundled into every route, so they would be loaded on every page.
export default function GlobalNotFound() {
  return (
    <RootDocument lang="en" className="theme-hub">
      <main className="grid min-h-screen place-items-center bg-background px-4 py-16 text-center text-foreground antialiased" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
        <div className="mx-auto w-full max-w-[900px]">
          <p className="inline-block rounded-full border-[1.5px] border-lilac px-3.5 py-1.5 text-sm leading-snug font-bold text-lilac">AutomatonSoft</p>
          <h1 className="mt-6 text-[clamp(6rem,26vw,16rem)] leading-[0.85] font-black tracking-[-0.06em] text-lilac">404</h1>
          <p className="mx-auto mt-6 max-w-[560px] text-lg text-muted-foreground">Diese Seite existiert nicht. · This page does not exist.</p>
          <div className="mt-8">
            <a href="/" className={`${button} bg-primary text-primary-foreground`}>Zur Startseite →</a>
          </div>
          <nav aria-label="Sprache · Language" className="mx-auto mt-6 flex max-w-[560px] flex-wrap justify-center gap-x-2 gap-y-1 text-[15px] text-muted-foreground">
            {languages.map(({ name, href }, index) => (
              <span key={href} className="flex gap-2">
                {index > 0 && <span aria-hidden="true">·</span>}
                <a href={href} className="font-semibold underline-offset-4 hover:text-lilac hover:underline">{name}</a>
              </span>
            ))}
          </nav>
        </div>
      </main>
    </RootDocument>
  );
}
