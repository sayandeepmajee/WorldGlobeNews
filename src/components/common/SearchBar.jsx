import { useId, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '../../api/newsService';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

/**
 * Country search. Built as a combobox: text input + a listbox of matches,
 * fully keyboard operable (Escape clears, results are `<button>`s so Tab/
 * Enter work without extra handling) and announced via aria-live.
 */
export function SearchBar({ onSelectCountry }) {
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query, 200);
  const listId = useId();

  const { data: results = [], isFetching } = useQuery({
    queryKey: ['country-search', debounced],
    queryFn: () => newsService.searchCountries(debounced),
    enabled: debounced.trim().length > 0,
  });

  const showResults = query.trim().length > 0;

  function handleSelect(country) {
    onSelectCountry(country);
    setQuery('');
  }

  return (
    <div className="relative w-full max-w-xs">
      <label htmlFor="country-search" className="sr-only">
        Search for a country
      </label>
      <div className="flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/80 px-3 py-1.5 focus-within:border-amber-500 transition-colors">
        <Search className="h-4 w-4 text-mist-400 shrink-0" aria-hidden="true" />
        <input
          id="country-search"
          type="text"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Search a country…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
          className="w-full bg-transparent text-sm text-parchment-200 placeholder:text-mist-500 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="text-mist-400 hover:text-parchment-200 shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showResults && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Matching countries"
          className="thin-scroll absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-ink-600 bg-ink-800 shadow-xl shadow-black/40"
        >
          {isFetching && (
            <li className="px-4 py-3 text-xs font-mono text-mist-500">Searching…</li>
          )}
          {!isFetching && results.length === 0 && (
            <li className="px-4 py-3 text-xs text-mist-500">No matching territory found.</li>
          )}
          {results.map((country) => (
            <li key={country.id} role="option" aria-selected="false">
              <button
                type="button"
                onClick={() => handleSelect(country)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-parchment-200 hover:bg-ink-700 focus-visible:bg-ink-700"
              >
                <img
                  src={`https://flagcdn.com/24x18/${country.alpha2}.png`}
                  alt=""
                  width={20}
                  height={15}
                  className="rounded-sm"
                  loading="lazy"
                />
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
