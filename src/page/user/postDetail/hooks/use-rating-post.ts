import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { ratingPost } from '../services/rating-post';

export const useRatingPost = (setIsModalOpen:any) => {
  return useMutation({
    mutationFn:  ratingPost,
    onSuccess: () => {
      toast({
        title: 'Đánh giá bài viết thành công',
        variant: 'success',
      });
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: error?.response?.data?.message || 'Bạn không thể đánh giá bài viết này',
        variant: 'destructive',
      });
    },
  });
};
