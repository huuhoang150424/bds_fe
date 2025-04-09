import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../services/post-comment';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { postId: string; content: string; parentId?: string | null }) => addComment(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['commentByPost', data.postId] });
    },
    onError: (error) => {
      console.error('Failed to add comment:', error);
    },
  });
};