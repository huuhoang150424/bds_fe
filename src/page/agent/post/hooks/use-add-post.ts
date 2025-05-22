import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost as addPostService } from "../services/add-post";
import { toast } from "@/hooks/use-toast";

export const useAddPost = (resetForm: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, data }: { type: string, data: FormData }) => 
      addPostService(type, data),
    onSuccess: (data) => {
      toast({
        title: "Thành công",
        description: data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ['myPosts'],
      });
      window.scrollTo(0,0);
      resetForm();
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: "Lỗi",
        description: `${error?.response?.data?.message || "Lỗi không xác định"}`,
        variant: "destructive",
      });
    },
  });
};