import { useQuery } from '@tanstack/react-query';
import { newsService } from '../api/newsService';

/**
 * Fetches (and caches) headlines for a country, optionally narrowed to one
 * category. Disabled until a numericId is provided, so selecting a
 * country on the map is what triggers the first request — not render.
 * `category` is included in the query key so switching filters is its own
 * cache entry (instant to revisit) rather than refetching every toggle.
 */
export function useCountryNews(numericId, category = null) {
  return useQuery({
    queryKey: ['country-news', numericId, category],
    queryFn: () => newsService.getCountryNews(numericId, category),
    enabled: Boolean(numericId),
    staleTime: 5 * 60 * 1000, // 5 min — headlines don't need to refetch on every hover
  });
}