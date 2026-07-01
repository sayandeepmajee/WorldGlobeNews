import { Radio } from 'lucide-react';
import { useTickerHeadlines } from '../../hooks/useTickerHeadlines';

/**
 * The dateline ticker — WorldScope's signature element. A continuously
 * scrolling strip of "wire" headlines from around the globe, the way a
 * newsroom teleprinter or lower-third would run. Built by duplicating the
 * content once and animating a translateX loop (see --animate-ticker in
 * index.css), which reads as continuous without any JS animation loop.
 */
export function Ticker() {
  const { data: headlines = [] } = useTickerHeadlines();

  if (headlines.length === 0) return null;

  const items = headlines.map((h) => `${h.countryName}: ${h.headline}`);

  return (
    <div className="relative z-10 flex items-center gap-3 overflow-hidden border-b border-ink-600 bg-ink-800/70 py-2 pl-4">
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-coral-500/15 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-coral-500">
        <Radio className="h-3 w-3 animate-pulse-slow" aria-hidden="true" />
        Live wire
      </span>

      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-ticker gap-10 motion-reduce:animate-none">
          {[...items, ...items].map((text, i) => (
            <span
              key={i}
              className="font-mono text-xs whitespace-nowrap text-mist-300"
              aria-hidden={i >= items.length}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
