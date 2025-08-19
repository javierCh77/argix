type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function FeatureCard({title, description, icon}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition will-change-transform hover:-translate-y-0.5">
      {icon ? <div className="mb-2">{icon}</div> : null}
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-[--color-muted]">{description}</p>
    </div>
  );
}
