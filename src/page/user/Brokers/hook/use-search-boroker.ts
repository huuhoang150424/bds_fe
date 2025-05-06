import { useQuery } from '@tanstack/react-query';
import { searchProfessionalAgents } from '../service/search-boroker';

export const useSearchProfessionalAgents = (
  query: string,
  page: number = 1,
  limit: number = 10,
  shouldFetch: boolean = false
) => {
  return useQuery({
    queryKey: ['searchProfessionalAgents', query, page, limit],
    queryFn: () => searchProfessionalAgents(query, page, limit),
    enabled: !!query && shouldFetch, 
    staleTime: 0, 
  });
};