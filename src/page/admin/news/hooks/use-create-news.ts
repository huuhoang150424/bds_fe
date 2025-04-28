import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createNews } from "../service/create-news";

export const useCreateNews = (resetForm: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: {data: FormData }) => 
      createNews( data),
    onSuccess: (data) => {
      toast({
        title: "Thành công",
        description: data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ['newsAdmin'],
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