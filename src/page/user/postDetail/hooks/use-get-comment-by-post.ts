import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCommentByPost } from '../services/get-comment-by-post';


export const useGetCommentByPost = (postId: string, page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['commentByPost', postId, page, pageSize],
    queryFn: () => getCommentByPost(postId, page, pageSize),
    placeholderData: keepPreviousData,
  });
};