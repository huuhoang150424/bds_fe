import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { deletePostDraft } from '../services/delete-post-draft';

export const useDeletePostDraft = (typeListPost?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletePostDraft'],
    mutationFn: (postDraftId: string) => deletePostDraft(postDraftId),
    onSuccess: (_, postDraftId) => {
      toast({
        title: 'Xóa bản nháp thành công',
        description: 'Đã xóa bản nháp bất động sản',
      });
      queryClient.invalidateQueries({
        queryKey: ['myPosts', typeListPost],
      });
    },
    onError: () => {
      toast({
        title: 'Lỗi khi xóa bản nháp',
        description: 'Không thể xóa bản nháp bất động sản. Vui lòng thử lại sau.',
        variant: 'destructive',
      });
    },
  });
};