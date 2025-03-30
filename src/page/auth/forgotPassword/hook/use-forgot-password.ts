
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { forgotPassword } from "../service/forgot-password"; 

export const useForgotPassword = (openModal: any) =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast({
        title: "Yêu cầu đặt lại mật khẩu đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để tiếp tục",
      });
      openModal("verifyCode");
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: "Lỗi",
      }),
  });