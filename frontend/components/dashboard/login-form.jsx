import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import LanguageSwitch from '@/components/dashboard/language-switch';
import { control, eyebrow, panel } from '@/components/dashboard/styles';

export default function LoginForm({ t, lang, setLang, error, onLogin }) {
  return (
    <main lang={lang} className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <section className={cn(panel, 'w-full max-w-md p-6 shadow-xl shadow-ink/5 sm:p-8')}>
        <div className="flex items-start justify-between gap-4">
          <div><p className={eyebrow}>AutomatonSoft</p><h1 className="mt-2 text-3xl font-black text-ink">{t.loginTitle}</h1></div>
          <LanguageSwitch lang={lang} setLang={setLang} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t.loginHint}</p>
        <form className="mt-6 grid gap-3" onSubmit={(event) => { event.preventDefault(); onLogin(event.currentTarget); }}>
          <Input name="username" aria-label={t.username} placeholder={t.username} autoComplete="username" className={control} required />
          <Input name="password" type="password" aria-label={t.password} placeholder={t.password} autoComplete="current-password" className={control} required />
          <button type="submit" className={buttonVariants({ size: 'xl' })}>{t.login}</button>
          <p className="min-h-5 text-sm text-destructive" role="alert">{error}</p>
        </form>
        <p className="mt-2">
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> {t.backToSite}</a>
        </p>
      </section>
    </main>
  );
}
