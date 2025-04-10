// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { fillPost } from '../service/fill-post';

interface FilterParams {
    keyword?: string[]; 
    bathroom?: number;    
    bedroom?: number;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number; 
    floor?: number;
    direction?: string;  
}

export const useGetPostByFilter = (filters: FilterParams) => {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fillPost(filters),
    staleTime: 1000 * 60 * 5, // 5 phút
    refetchOnWindowFocus: false,
  });
};