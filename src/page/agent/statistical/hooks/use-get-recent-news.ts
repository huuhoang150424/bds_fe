import { useQuery } from '@tanstack/react-query';
import { getRecentNews } from '../services/get-recent-news';

export const useGetRecentNews = () => {
  return useQuery({
    queryKey: ['recentNews'],
    queryFn: getRecentNews,
  });
};
