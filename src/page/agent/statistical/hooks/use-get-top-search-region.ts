import { useQuery } from '@tanstack/react-query';
import { getToSearchRegions } from '../services/get-top-search-regions';

export const useGetTopSearchRegions = () => {
  return useQuery({
    queryKey: ['topSearchRegions'],
    queryFn: getToSearchRegions,
  });
};
