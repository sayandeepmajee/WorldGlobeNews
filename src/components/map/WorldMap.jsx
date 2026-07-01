import { useCallback, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { getCountryByNumericId } from '../../api/mockData/countries';

// TopoJSON of world country borders (110m resolution — light enough to pan/zoom
// smoothly, detailed enough for a global view). Fetched at runtime by the
// browser rather than bundled, which keeps this a plain static asset.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/**
 * The hero. Countries with mock coverage are interactive: hovering only
 * highlights them (a visual cue that they're clickable), while clicking —
 * or tapping on touch, or pressing Enter/Space when focused via keyboard —
 * is what actually opens the news panel. Countries outside the curated
 * registry still render, in a muted "uncharted" fill, so the globe reads
 * as complete rather than full of holes.
 */
export function WorldMap({ activeCountryId, onCountryActivate, onBackgroundClick }) {
  const [pointerHoverId, setPointerHoverId] = useState(null);

  const handleEnter = useCallback((geo) => {
    // Purely visual — highlights the country under the cursor without
    // opening the panel. Touch devices fire a synthetic mouseenter right
    // before click, but since this no longer triggers activation, no
    // guard against touch is needed here.
    setPointerHoverId(geo.id);
  }, []);

  const handleLeave = useCallback(() => setPointerHoverId(null), []);

  const handleClick = useCallback(
    (geo) => {
      const country = getCountryByNumericId(geo.id);
      if (country) onCountryActivate({ id: geo.id, ...country });
    },
    [onCountryActivate]
  );

  return (
    <div className="absolute inset-0" onClick={onBackgroundClick}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 165 }}
        className="h-full w-full"
        role="img"
        aria-label="Interactive world map. Select a country to view its news coverage."
      >
        <ZoomableGroup minZoom={1} maxZoom={5} translateExtent={[[-50, -50], [850, 500]]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const hasCoverage = Boolean(getCountryByNumericId(geo.id));
                const isActive = geo.id === activeCountryId;
                const isHovered = geo.id === pointerHoverId;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={hasCoverage ? 0 : -1}
                    role={hasCoverage ? 'button' : undefined}
                    aria-label={hasCoverage ? `View news for ${getCountryByNumericId(geo.id).name}` : undefined}
                    onMouseEnter={() => handleEnter(geo)}
                    onMouseLeave={handleLeave}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(geo);
                    }}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && hasCoverage) {
                        e.preventDefault();
                        handleClick(geo);
                      }
                    }}
                    style={{
                      default: {
                        fill: hasCoverage ? 'var(--color-ink-600)' : 'var(--color-ink-700)',
                        stroke: 'var(--color-ink-900)',
                        strokeWidth: 0.6,
                        outline: 'none',
                        transition: 'fill 150ms ease',
                      },
                      hover: {
                        fill: hasCoverage ? 'var(--color-amber-500)' : 'var(--color-ink-700)',
                        stroke: 'var(--color-ink-900)',
                        strokeWidth: 0.6,
                        outline: 'none',
                        cursor: hasCoverage ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: 'var(--color-amber-600)',
                        stroke: 'var(--color-ink-900)',
                        strokeWidth: 0.6,
                        outline: 'none',
                      },
                    }}
                    className={isActive || isHovered ? 'drop-shadow-[0_0_6px_rgba(232,163,61,0.5)]' : ''}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}