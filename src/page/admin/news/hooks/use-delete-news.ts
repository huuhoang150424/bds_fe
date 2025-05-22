import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteNews } from "../service/delete-new";

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newsId }: {newsId: string }) =>  deleteNews( newsId),
    onSuccess: (data) => {
      toast({
        title: "Thành công",
        description: data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ['newsAdmin'],
      });
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