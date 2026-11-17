import { panel } from '@/components/dashboard/styles';

export default function StatCards({ stats }) {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, highlight }) => (
        <div key={label} className={highlight ? 'rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4' : `${panel} p-4`}>
          <p className={`text-sm ${highlight ? 'text-cyan-100/70' : 'text-slate-400'}`}>{label}</p>
          <p className={`mt-1 text-3xl font-bold ${highlight ? 'text-cyan-300' : ''}`}>{value}</p>
        </div>
      ))}
    </section>
  );
}
