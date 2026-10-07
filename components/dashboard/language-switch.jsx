const languages = ['de', 'ru'];

export default function LanguageSwitch({ lang, setLang }) {
  return (
    <div className="flex rounded-lg border border-white/15 p-1 text-xs font-bold">
      {languages.map((item) => (
        <button key={item} type="button" onClick={() => setLang(item)} className={`rounded px-2 py-1 ${lang === item ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}>{item.toUpperCase()}</button>
      ))}
    </div>
  );
}
