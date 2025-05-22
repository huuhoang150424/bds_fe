import { useQuery } from '@tanstack/react-query';
import { getPostOutstanding } from '../services/get-post-outstanding';

export const useGetPostOutstanding = () => {
  return useQuery({
    queryKey: ['postOutstanding'],
    queryFn: getPostOutstanding,
  });
};
