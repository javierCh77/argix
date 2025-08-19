type Stat = { label: string; value: string };
type Props = {
  title: string;
  description: string;
  code?: string;
  stats?: Stat[];
};

export function CaseCard({title, description, code, stats = []}: Props) {
  return (
    <div className="grid grid-cols-1 items-center gap-5 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-[--color-muted]">{description}</p>
        {stats.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {stats.map((s) => (
              <div key={s.label} className="min-w-[150px] rounded-xl border bg-white p-3">
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-sm text-[--color-muted]">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-inner">
        <pre className="overflow-auto rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
{code}
        </pre>
      </div>
    </div>
  );
}
