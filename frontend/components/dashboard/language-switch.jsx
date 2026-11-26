const languages = ['de', 'ru'];

export default function LanguageSwitch({ lang, setLang }) {
  return (
    <div className="flex shrink-0 rounded-lg border border-input bg-card p-1 text-xs font-bold">
      {languages.map((item) => (
        <button key={item} type="button" aria-pressed={lang === item} onClick={() => setLang(item)} className={`h-8 min-w-8 rounded-md px-1.5 ${lang === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{item.toUpperCase()}</button>
      ))}
    </div>
  );
}
