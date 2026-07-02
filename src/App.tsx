import { useState, useEffect } from 'react';

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>;

function getPageName(path: string) {
  return path.replace('./pages/', '').replace('.jsx', '');
}

const pageEntries = Object.entries(pages).map(([path, mod]) => ({
  name: getPageName(path),
  Component: mod.default,
}));

function groupByFolder(entries: typeof pageEntries) {
  const groups: Record<string, typeof pageEntries> = {};
  for (const entry of entries) {
    const slash = entry.name.lastIndexOf('/');
    const folder = slash === -1 ? '' : entry.name.slice(0, slash);
    (groups[folder] ??= []).push(entry);
  }
  return Object.entries(groups).sort(([a], [b]) => {
    if (a === '') return -1;
    if (b === '') return 1;
    return a.localeCompare(b);
  });
}

export default function App() {
  const [current, setCurrent] = useState(window.location.pathname.replace(/^\//, '') || '');

  useEffect(() => {
    const onPop = () => setCurrent(window.location.pathname.replace(/^\//, '') || '');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const page = pageEntries.find((p) => p.name === current);

  if (page) {
    return <page.Component />;
  }

  const groups = groupByFolder(pageEntries);

  return (
    <div className="min-h-screen bg-bg p-12">
      <h1 className="text-3xl font-bold text-text-strong mb-2">Prototypes</h1>
      <p className="text-text-secondary mb-8">
        {pageEntries.length} prototype{pageEntries.length !== 1 ? 's' : ''} available
      </p>
      <div className="max-w-lg space-y-8">
        {groups.map(([folder, entries]) => (
          <div key={folder}>
            {folder && (
              <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                {folder}
              </h2>
            )}
            <div className="grid gap-3">
              {entries.map(({ name }) => {
                const display = name.includes('/') ? name.slice(name.lastIndexOf('/') + 1) : name;
                return (
                  <a
                    key={name}
                    href={`/${name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', `/${name}`);
                      setCurrent(name);
                    }}
                    className="block px-5 py-4 bg-surface rounded-lg border border-border hover:border-accent transition-colors"
                  >
                    <span className="text-lg font-medium text-text-strong">{display}</span>
                    <span className="text-text-tertiary ml-2">.jsx</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
