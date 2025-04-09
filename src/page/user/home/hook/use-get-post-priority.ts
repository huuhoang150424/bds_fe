import { getPostsPriority } from '@/page/user/home/service/get-posts-priority';
import { useQuery } from '@tanstack/react-query';

export const useGetPostsPrioritys = (limit: number, page: number) => {
  return useQuery({
    queryKey: ['postPrioritys', page, limit], 
    queryFn: () => getPostsPriority(page, limit)
  });
};
