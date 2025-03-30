import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { verifyCode } from '../service/verify-code';

export const useVerificationCode = (openModal: any) =>
  useMutation({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      toast({ title: 'Mã xác thực hợp lệ', description: 'Bạn có thể đặt lại mật khẩu ngay bây giờ' });
      openModal('resetPassword');
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi xác thực',
      }),
  });
