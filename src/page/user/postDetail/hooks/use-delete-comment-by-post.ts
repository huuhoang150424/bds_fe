import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentByPost } from '../services/delete-comment-by-post';

export const useDeleteCommentByPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; parentId?: string | null }) =>
      deleteCommentByPost(commentId),
    onSuccess: (_, variables) => {
      // Làm mới danh sách comment cấp cao nhất
      queryClient.invalidateQueries({ queryKey: ['commentByPost'] });

      // Nếu comment vừa xóa có parentId, làm mới danh sách replies của comment cha
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