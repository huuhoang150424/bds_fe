import { useQuery } from '@tanstack/react-query';
import { getPostHabit } from '../services/get-post-habbit';

export const useGetPostHabbit = () => {
  return useQuery({
    queryKey: ['postHabit'],
    queryFn:  getPostHabit,
  });
};
