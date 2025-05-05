import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteNotification } from "../service/delete-notification";


export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Xóa thông báo thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: `${error?.response?.data?.message || "Không thể xóa thông báo"}`,
        variant: "destructive",
      });
    },
  });
};