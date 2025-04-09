import { getCommentReply } from './../services/get-comment-reply';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentReply = (parentId: string, options: any = {}) => {
  return useQuery({
    queryKey: [`commentReply-${parentId}`, parentId],
    queryFn: () => getCommentReply(parentId),
    enabled: !!parentId,
    refetchOnWindowFocus: false,
  });
};