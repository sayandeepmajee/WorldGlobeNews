import { LocateFixed } from 'lucide-react';
import { formatCoordinates } from '../../utils/formatDate';

/**
 * A small "instrument panel" overlay, echoing a cartographer's readout.
 * Shows guidance until a country is active, then swaps to that country's
 * coordinates — reinforcing the map-as-instrument feel without adding
 * another modal or panel.
 */
export function MapHud({ activeCountry }) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/80 px-3.5 py-2 font-mono text-[11px] text-mist-400 backdrop-blur sm:bottom-6 sm:left-6">
      <LocateFixed className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
      {activeCountry ? (
        <span>
          {activeCountry.name} · {formatCoordinates(activeCountry.lat, activeCountry.lon)}
        </span>
      ) : (
        <span className="hidden sm:inline">Hover a highlighted country to tune in</span>
      )}
      {!activeCountry && <span className="sm:hidden">Tap a country to tune in</span>}
    </div>
  );
}
