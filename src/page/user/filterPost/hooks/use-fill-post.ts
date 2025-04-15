import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fillPost } from '../service/fill-post';

interface FilterParams {
  keyword?: string[];
  bathroom?: number;
  bedroom?: number;
  tagIds?: string;
  minSquareMeters?: number;
  maxSquareMeters?:number;
  listingTypeIds?: string[];
  propertyTypeIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  floor?: number;
  direction?: string;
}

export const useGetPostByFilter = (filters: FilterParams) => {
  return useQuery({
    queryKey: ['filterPosts', filters],
    queryFn: () => fillPost(filters),
    placeholderData: keepPreviousData
  });
};
