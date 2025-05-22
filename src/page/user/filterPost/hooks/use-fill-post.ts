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
  maxArea?: number;
  floor?: number;
  directions?: string;
  isProfessional?: boolean;
  ratings?: number[];
  status?: string[] | undefined;
  tags?:string[];
  isFurniture?:boolean
}

export const useGetPostByFilter = (filters: FilterParams,options = {}) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
  );
  
  const filtersStableRef = JSON.stringify(cleanFilters);
  return useQuery({
    queryKey: ['filterPosts', filtersStableRef],
    queryFn: () => fillPost(filters),
    placeholderData: undefined,  
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 1,
    gcTime: 1000,
    retry: false,
    notifyOnChangeProps: ['data', 'error', 'isLoading', 'isFetching'],
    ...options
  });
};