import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { sendVerificationEmail } from '../service/email-verification';

export const useEmailVerification = (email: string) => {
  return useMutation({
    mutationFn: () => sendVerificationEmail({ email }),
    onSuccess: () => {
      toast({
        title: 'Email xác thực đã được gửi',
        description: 'Vui lòng kiểm tra hộp thư của bạn.',
      });
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: error.response?.data?.message || 'Không thể gửi email xác thực',
      }),
  });
};
