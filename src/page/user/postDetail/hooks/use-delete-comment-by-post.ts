import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentByPost } from '../services/delete-comment-by-post';

export const useDeleteCommentByPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; parentId?: string | null }) => deleteCommentByPost(commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['commentByPost'] });
      if (variables.parentId) {
        queryClient.invalidateQueries({ queryKey: [`commentReply-${variables.parentId}`] });
      }

      toast({
        title: 'Xóa bình luận thành công',
        variant: 'success',
      });
    },
    onError: (error: any) => {
      toast({
        title: error?.response?.data?.message || 'Bạn không thể xóa comment này',
        variant: 'destructive',
      });
    },
  });
};
