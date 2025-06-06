import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { forgotPassword } from '../service/forgot-password';
import { useAuthModal } from '@/context/auth-modal';

export const useForgotPassword = (
  type?: string,
) => {

  const {openModal,setOtpExpires}=useAuthModal();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Yêu cầu đặt lại mật khẩu đã được gửi',
        description: 'Vui lòng kiểm tra email của bạn để tiếp tục',
      });
      setOtpExpires(data?.data?.otpExpires);
      if (type === 'SEND') {
        openModal('verifyCode');
      }
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi',
      }),
  });
};
