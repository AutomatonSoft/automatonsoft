import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import LanguageSwitch from '@/components/dashboard/language-switch';
import { control, eyebrow, panel } from '@/components/dashboard/styles';

export default function LoginForm({ t, lang, setLang, error, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="relative">
            <Input name="password" type={showPassword ? 'text' : 'password'} aria-label={t.password} placeholder={t.password} autoComplete="current-password" className={cn(control, 'pr-10')} required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? t.hidePassword : t.showPassword} aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-r-lg text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {error && <p className="rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm font-medium text-destructive" role="alert">{error}</p>}
          <button type="submit" className={buttonVariants({ size: 'xl' })}>{t.login}</button>
        </form>
        <p className="mt-5">
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> {t.backToSite}</a>
        </p>
      </section>
    </main>
  );
}
