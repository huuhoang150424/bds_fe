import { useQuery } from '@tanstack/react-query';
import { fetchPostTypeConversion } from '../services/post-conversion';

export const useGetPostTypeConversion = (year: number) => {
  return useQuery({
    queryKey: ['postTypeConversion', year],
    queryFn: () => fetchPostTypeConversion(year),
  });
};