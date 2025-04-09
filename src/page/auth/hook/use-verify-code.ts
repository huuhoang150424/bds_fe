import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { verifyCode } from '../service/verify-code';
import { useAuthModal } from '@/context/auth-modal';

export const useVerificationCode = ( ) => {
  const { openModal,setResetToken } = useAuthModal();
  return useMutation({
    mutationFn: (data: { email: string; otpCode: string }) => verifyCode(data),
    onSuccess: (data) => {
      console.log(data);
      toast({ title: 'Mã xác thực hợp lệ', description: 'Bạn có thể đặt lại mật khẩu ngay bây giờ' });
      openModal('resetPassword');
      setResetToken(data?.data?.resetToken);
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi xác thực',
      }),
  });
};
