import { useQuery } from '@tanstack/react-query';
import { getPostCountByLocation } from '../service/get-post-count';

export const useGetPostCountByLocation = (province?: string) => {
  return useQuery({
    queryKey: ['postCountByLocation', province],
    queryFn: () => getPostCountByLocation(province),
    placeholderData: (previousData) => previousData,
    enabled: !!province,
  });
};