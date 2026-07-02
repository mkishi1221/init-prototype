export default function Example() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-strong">Hello, Prototype</h1>
          <p className="mt-2 text-text-secondary">
            This is a dummy page. Replace it with your own design.
          </p>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-body">Status</span>
            <span className="text-sm text-success font-medium">Active</span>
          </div>
          <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-accent rounded-full" />
          </div>
          <p className="text-sm text-text-tertiary">66% complete</p>
        </div>

        <button className="w-full px-4 py-2.5 bg-accent text-accent-fg rounded-lg font-medium hover:bg-accent-hover transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}
