import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { forgotPassword } from '../service/forgot-password';

export const useForgotPassword = (openModal: any,setOtpExpires: (otpExpires: string | null) => void,type?:string) =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log(data)
      toast({
        title: 'Yêu cầu đặt lại mật khẩu đã được gửi',
        description: 'Vui lòng kiểm tra email của bạn để tiếp tục',
      });
      setOtpExpires(data?.data?.otpExpires);
      if (type==="SEND") {
        openModal('verifyCode');
      }
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi',
      }),
  });
