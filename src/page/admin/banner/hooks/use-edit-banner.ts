import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { FormValues } from "../schema/create-banner";
import { editBanner } from "../service/edit-banner";

export const useEditBanner = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, bannerId }: { data: FormValues; bannerId: string }) => editBanner(data, bannerId),
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Cập nhật banner thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["banners"],
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