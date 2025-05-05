import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectPosts } from '../services/reject-post';
import { toast } from '@/hooks/use-toast';

export function useRejectPosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postIds, reason }: { postIds: string[]; reason: string }) => rejectPosts(postIds, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        variant: 'success',
        title: 'Từ chối bài đăng thành công',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Từ chối bài đăng thất bại',
      });
    },
  });
}