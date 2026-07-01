import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe2 } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';
import { formatUtcClock } from '../../utils/formatDate';

export function Header({ onSelectCountry }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative z-20 flex items-center justify-between gap-4 border-b border-ink-600 bg-ink-900/95 px-4 py-3 backdrop-blur sm:px-6">
      <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="WorldScope home">
        <Globe2 className="h-6 w-6 text-amber-500" aria-hidden="true" />
        <span className="font-display text-lg font-semibold tracking-tight text-parchment-100">
          World<span className="text-amber-500">Scope</span>
        </span>
      </Link>

      <div className="hidden flex-1 items-center justify-center font-mono text-xs text-mist-500 md:flex">
        <time dateTime={now.toISOString()}>{formatUtcClock(now)}</time>
      </div>

      <SearchBar onSelectCountry={onSelectCountry} />
    </header>
  );
}
