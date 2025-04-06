import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../services/post-comment';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { postId: string; content: string; parentId?: string | null }) => addComment(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['commentByPost', data.postId] });

      // Nếu là reply, cũng làm mới các comment con
      if (data.parentId) {
        console.log('Invalidate comment reply for parentId:', data.parentId);
        queryClient.invalidateQueries({ queryKey: ['commentReply', data.parentId] });
      }

      console.log('Comment added successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to add comment:', error);
    },
  });
};