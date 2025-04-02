import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { verifyMail } from "../service/verify-mail";

export const useVerifyToken = (email: string, token: string,openModal:any) => {
  return useMutation({
    mutationFn: () => verifyMail({ email, token }),
    onSuccess: () => {
      toast({
        title: "Xác thực email thành công",
        description: "Bạn có thể đăng nhập ngay bây giờ",
      });
      openModal('login');
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error.response?.data?.message || "Xác thực thất bại",
      }),
  });
};