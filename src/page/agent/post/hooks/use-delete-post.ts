import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { deleteMyPost } from '../services/delete-post';

export const useDeletePost = (typeListPost?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletePost'],
    mutationFn: (postId: string) => deleteMyPost(postId),
    onSuccess: (_, postId) => {
      toast({
        title: "Xóa thành công",
        description: `Đã xóa bài đăng`,
      });
      queryClient.invalidateQueries({
        queryKey: ['myPosts', typeListPost],
      });
    },
    onError: () => {
      toast({
        title: "Lỗi khi xóa",
        description: "Không thể xóa bất động sản. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    },
  });
};