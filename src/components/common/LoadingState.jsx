import { Compass } from 'lucide-react';

/**
 * A small, reusable loading state. Uses `animate-spin` (respecting
 * prefers-reduced-motion globally via index.css) rather than a generic
 * spinner graphic, to stay on the cartography motif.
 */
export function LoadingState({ label = 'Loading coverage…', compact = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 text-mist-400 ${
        compact ? 'py-6' : 'py-16'
      }`}
    >
      <Compass className="h-6 w-6 animate-spin motion-reduce:animate-pulse-slow" aria-hidden="true" />
      <span className="font-mono text-xs tracking-wide uppercase">{label}</span>
    </div>
  );
}
