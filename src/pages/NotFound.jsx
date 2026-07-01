import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-ink-900 px-6 text-center">
      <Compass className="h-8 w-8 text-amber-500" aria-hidden="true" />
      <h1 className="font-display text-2xl text-parchment-100">Off the edge of the map</h1>
      <p className="max-w-sm text-sm text-mist-400">
        This route doesn't lead anywhere charted. Head back and pick a country from the globe.
      </p>
      <Link
        to="/"
        className="rounded-full border border-ink-600 px-4 py-2 text-sm text-parchment-200 hover:border-amber-500 hover:text-amber-400"
      >
        Return to the map
      </Link>
    </div>
  );
}
