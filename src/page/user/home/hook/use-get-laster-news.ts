import { useQuery } from '@tanstack/react-query';
import { getLatestNews } from '../service/get-laster-news';

export const useLatestNews = () => {
  return useQuery({
    queryKey: ['latestNews'],
    queryFn: () => getLatestNews()
  });
};