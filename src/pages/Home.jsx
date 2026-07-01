import { useCallback, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Ticker } from '../components/layout/Ticker';
import { WorldMap } from '../components/map/WorldMap';
import { MapHud } from '../components/map/MapHud';
import { CountryPanel } from '../components/panel/CountryPanel';

export function Home() {
  const [activeCountry, setActiveCountry] = useState(null);

  const handleActivate = useCallback((country) => setActiveCountry(country), []);
  const handleClose = useCallback(() => setActiveCountry(null), []);

  return (
    <div className="flex h-dvh flex-col bg-ink-900">
      <Header onSelectCountry={handleActivate} />
      <Ticker />

      <main className="relative flex-1 overflow-hidden">
        <WorldMap
          activeCountryId={activeCountry?.id}
          onCountryActivate={handleActivate}
          onBackgroundClick={handleClose}
        />
        <MapHud activeCountry={activeCountry} />
        <CountryPanel country={activeCountry} onClose={handleClose} />
      </main>
    </div>
  );
}
