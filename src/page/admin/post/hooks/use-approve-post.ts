import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approvePosts } from '../services/approve-post';
import { toast } from '@/hooks/use-toast';
export function useApprovePosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postIds: string[]) => approvePosts(postIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        variant: 'success',
        title: 'Duyệt bài đăng thành công',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Duyệt bài đăng thất bại',
      });
    },
  });
}
