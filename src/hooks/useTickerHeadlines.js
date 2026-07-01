import { useQuery } from '@tanstack/react-query';
import { newsService } from '../api/newsService';

export function useTickerHeadlines() {
  return useQuery({
    queryKey: ['ticker-headlines'],
    queryFn: () => newsService.getTickerHeadlines(),
    staleTime: 10 * 60 * 1000,
  });
}
