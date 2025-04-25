import { useQuery } from '@tanstack/react-query';
import { SearchPost } from '../service/search-post';

export const useSearchPost = (address: string[]) => {
  return useQuery({
    queryKey: ['searchByAddress', address.sort().join(',')],
    queryFn: () => SearchPost(address),
    enabled: address.length > 0
  });
};
