import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createBanner } from "../service/create-banner";
import { FormValues } from "../schema/create-banner";

export const useCreateBanner = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: FormValues }) => createBanner(data),
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: 'Tạo mới banner thành công',
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ['banners'],
      });
      window.scrollTo(0, 0);
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