import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCommentReply } from '../services/post-reply';

export const usePostCommentReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCommentReply,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`commentReply-${data?.data?.parentId}`] });
      console.log("check phản hồi ",data)
    },
    onError: (error) => {
      console.error('Failed to add comment reply:', error);
    },
  });
};
