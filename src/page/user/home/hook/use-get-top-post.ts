import { useQuery } from '@tanstack/react-query';
import { getTopPosts, type PostItem } from '../service/get-top-post';

export const useTopPosts = () => {
  return useQuery<PostItem[], Error>({
    queryKey: ['topPosts'],
    queryFn: () => getTopPosts(),
  });
};