import { useQuery } from '@tanstack/react-query';
import { newsService } from '../api/newsService';

/**
 * Fetches (and caches) headlines for a country. Disabled until a numericId
 * is provided, so hovering the map doesn't fire requests for `null`.
 */
export function useCountryNews(numericId) {
  return useQuery({
    queryKey: ['country-news', numericId],
    queryFn: () => newsService.getCountryNews(numericId),
    enabled: Boolean(numericId),
    staleTime: 5 * 60 * 1000, // 5 min — headlines don't need to refetch on every hover
  });
}
