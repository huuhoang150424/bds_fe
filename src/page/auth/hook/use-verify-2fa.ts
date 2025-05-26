import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { verify2FA } from '../service/verify-2fa';

export const useVerify2FA = () => {
  return useMutation({
    mutationFn: (data: { userId: string; token: string }) => verify2FA(data),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Xác thực thành công',
        description: 'Đăng nhập hoàn tất.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: error.response?.data?.message || 'Mã OTP không hợp lệ',
      });
    },
  });
};