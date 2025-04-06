import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { deleteCommentByPost } from '../services/delete-comment-by-post';

export const useDeleteCommentByPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (commentId: string) => deleteCommentByPost(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentByPost'] });
    //   toast({
    //     title: 'Xóa bình luận thành công',
    //     variant: 'success',
    //   });
    },
    onError: () => {
    //   toast({
    //     title: 'Xóa bình luận thất bại',
    //     variant: 'destructive',
    //   });
    },
  });
};


