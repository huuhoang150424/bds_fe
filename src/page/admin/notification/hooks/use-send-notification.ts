import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendNotificationFormData } from "../schema/send-notification";
import { toast } from "@/hooks/use-toast";
import { sendNotification } from "../service/create-notification";

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendNotificationFormData) => sendNotification(data),
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Gửi thông báo thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
    },
    onError: (error: any) => {
      console.error('Send notification error:', error);
      toast({
        title: "Lỗi",
        description: `${error?.response?.data?.message || "Không thể gửi thông báo"}`,
        variant: "destructive",
      });
    },
  });
};