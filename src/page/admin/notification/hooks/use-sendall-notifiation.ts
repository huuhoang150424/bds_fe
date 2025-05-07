import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAllNotification, type SendAllNotificationFormData } from "../service/sendall-notifiation";

export const useSendAllNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendAllNotificationFormData) => sendAllNotification(data),
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Gửi thông báo đến tất cả người dùng thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
    },
    onError: (error: any) => {
      console.error('Send all notification error:', error);
      toast({
        title: "Lỗi",
        description: `${error?.response?.data?.message || "Không thể gửi thông báo đến tất cả người dùng"}`,
        variant: "destructive",
      });
    },
  });
};