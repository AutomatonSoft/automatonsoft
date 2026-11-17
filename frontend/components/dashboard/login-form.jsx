import { Input } from '@/components/ui/input';
import LanguageSwitch from '@/components/dashboard/language-switch';
import { eyebrow, primaryButton } from '@/components/dashboard/styles';

export default function LoginForm({ t, lang, setLang, notice, onLogin }) {
  return (
    <main className="dark min-h-screen bg-slate-950 p-6 text-slate-100">
      <section className="mx-auto mt-20 max-w-md rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div><p className={eyebrow}>AUTOMATONSOFT</p><h1 className="mt-2 text-3xl font-bold">{t.loginTitle}</h1></div>
          <LanguageSwitch lang={lang} setLang={setLang} />
        </div>
        <p className="mt-2 text-sm text-slate-400">{t.loginHint}</p>
        <form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); onLogin(event.currentTarget); }}>
          <Input name="username" placeholder={t.username} autoComplete="username" required />
          <Input name="password" type="password" placeholder={t.password} autoComplete="current-password" required />
          <button type="submit" className={primaryButton()}>{t.login}</button>
          <p className="text-sm text-red-400" role="alert">{notice}</p>
        </form>
      </section>
    </main>
  );
}
