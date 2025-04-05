import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../services/post-comment';


export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { postId: string; content: string }) => addComment(data),
    onSuccess: (newComment) => {
      // Cập nhật cache của danh sách bình luận sau khi thêm thành công
      queryClient.invalidateQueries({ queryKey: ['commentByPost', newComment.postId] });
      console.log('Comment added successfully:', newComment);
    },
    onError: (error) => {
      console.error('Failed to add comment:', error);
    },
  });
};