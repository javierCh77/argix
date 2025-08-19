type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'muted';
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  background = 'default'
}: Props) {
  return (
    <section
      id={id}
      className={`${background === 'muted' ? 'bg-gray-50' : ''} ${className}`}
    >
      <div className="container py-14">
        {eyebrow && (
          <span className="inline-block rounded-full border px-3 py-1 text-xs text-[--color-muted]">
            {eyebrow}
          </span>
        )}
        <h2
          className="mt-2 text-3xl font-bold"
          style={{
            background: 'linear-gradient(135deg,var(--accentA),var(--accentB))',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {title}
        </h2>
        {lead && <p className="mt-2 max-w-2xl text-[--color-muted]">{lead}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
