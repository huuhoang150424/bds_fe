import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { editComment } from '../services/edit-comment';

export const useUpdateComment = () => {
  return useMutation({
    mutationFn:  editComment,
    onSuccess: () => {
      toast({
        title: 'Cập nhật bình luận thành công',
        variant: 'success',
      });
    },
    onError: (error: any) => {
      toast({
        title: error?.response?.data?.message || 'Bạn không thể cập nhật comment này',
        variant: 'destructive',
      });
    },
  });
};
