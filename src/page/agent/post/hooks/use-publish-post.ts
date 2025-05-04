import { useMutation, useQueryClient } from '@tanstack/react-query';
import { publishPostDraft } from '../services/publish-post';
import { toast } from '@/hooks/use-toast';

export const usePublishPostDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postDraftId: string) => publishPostDraft(postDraftId),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Xuất bản thành công, đợi admin duyệt'
      })
      queryClient.invalidateQueries({ queryKey: [ 'myPosts'] });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Xuất bản thất bại'
      })
    },
  });
};