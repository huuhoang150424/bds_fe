import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePosts } from '../services/delete-posts';

interface DeletePostsInput {
  postIds: string[];
  reason: string;
}


export function useDeletePosts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postIds, reason }: DeletePostsInput) => deletePosts(postIds, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      throw error;
    },
  });
}