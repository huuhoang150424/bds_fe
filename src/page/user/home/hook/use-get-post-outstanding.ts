import { useQuery } from '@tanstack/react-query';
import { getPostOutstanding } from '../service/get-post-out-standing';

export const useGetPostOutstanding = () => {
  return useQuery({
    queryKey: ['postOutstanding'], 
    queryFn: getPostOutstanding
  });
};
