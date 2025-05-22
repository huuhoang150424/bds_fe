import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../services/update-post";
import { toast } from "@/hooks/use-toast";

interface UpdatePostVariables {
  postId: string;
  data: any;
  files: File[];
  deletedImageUrls: string[];
}

interface UpdatePostResponse {
  post: any;
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation<UpdatePostResponse, Error, UpdatePostVariables>({
    mutationKey: ['updatePost'],
    mutationFn: async ({ postId, data, files, deletedImageUrls }) => {
      return updatePost(postId, data, files, deletedImageUrls);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Cập nhật bài viết thành công',
      });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Cập nhật bài viết thất bại',
        description: error.message,
      });
    },
  });
}