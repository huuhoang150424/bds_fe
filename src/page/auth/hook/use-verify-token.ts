import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { verifyMail } from '../service/verify-mail';

export const useVerifyToken = (email: string, token: string) => {
  return useMutation({
    mutationFn: () => verifyMail({ email, token }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Xác thực email thành công',
        description: 'Bạn có thể đăng nhập ngay bây giờ',
      });
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: error.response?.data?.message || 'Xác thực thất bại',
      }),
  });
};
