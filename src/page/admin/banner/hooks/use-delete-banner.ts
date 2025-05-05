import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteBanner } from "../service/delete-banner";

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bannerId: string) => deleteBanner(bannerId),
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Xóa banner thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["banners"],
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