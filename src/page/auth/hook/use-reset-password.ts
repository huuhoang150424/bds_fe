
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "../service/reset-password"; 
export const useResetPassword = (openModal: any) =>
  useMutation({
    mutationFn:(data: {newPassword:string,resetToken:string,email:string})=> resetPassword(data),
    onSuccess: () => {
      toast({
        title: "Đặt lại mật khẩu thành công",
        description: "Bạn có thể đăng nhập bằng mật khẩu mới",
      });
      openModal("login");
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: "Lỗi",
      }),
  });