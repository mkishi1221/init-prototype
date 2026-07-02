// Stub library component proving the gallery + import pipeline. Replace with
// real components as prototypes need them (via /proto-build).
export default function ExampleCard({ title, value }) {
  return (
    <div className="bg-surface rounded-md border border-border p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-1">
        {title}
      </p>
      <p className="text-[32px] font-semibold tracking-[-0.5px] text-text-primary leading-none">
        {value}
      </p>
    </div>
  );
}

export function Demo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ExampleCard title="CV Score" value="82" />
      <ExampleCard title="Completion" value="66%" />
    </div>
  );
}
