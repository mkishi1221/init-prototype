// Component library gallery — auto-discovers src/components/*.jsx and renders
// each module's named `Demo` export. Do not list components manually here.
const modules = import.meta.glob('../components/*.jsx', { eager: true });

const entries = Object.entries(modules)
  .map(([path, mod]) => ({
    name: path.replace('../components/', '').replace('.jsx', ''),
    Demo: mod.Demo,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function ComponentGallery() {
  return (
    <div className="min-h-screen bg-bg p-12">
      <h1 className="text-3xl font-bold text-text-strong mb-2">Component Library</h1>
      <p className="text-text-secondary mb-10">
        {entries.length} shared component{entries.length !== 1 ? 's' : ''} — see
        src/components/COMPONENTS.md for the registry
      </p>
      <div className="space-y-12 max-w-4xl">
        {entries.map(({ name, Demo }) => (
          <section key={name}>
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
              {name}
            </h2>
            <div className="bg-surface rounded-lg border border-border p-8">
              {Demo ? (
                <Demo />
              ) : (
                <p className="text-sm text-error">
                  {name}.jsx has no named `Demo` export — add one so it renders here
                </p>
              )}
            </div>
          </section>
        ))}
        {entries.length === 0 && (
          <p className="text-text-tertiary">
            No components yet. Library components are created by /proto-build in
            src/components/.
          </p>
        )}
      </div>
    </div>
  );
}
