import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleComment } from '../services/tonggle-like-comment';

export const useToggleLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleComment,
    onSuccess: (data, variables) => {
      // if (variables.parentId) {
      //   queryClient.invalidateQueries({ queryKey: [`commentReply-${variables.parentId}`] });
      // }
    },
    onError: (error) => {
      console.error('Failed to toggle like:', error);
    },
  });
};