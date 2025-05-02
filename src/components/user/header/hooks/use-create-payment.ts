import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayment } from '../services/create-payment';
import { toast } from '@/hooks/use-toast';

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
    onSuccess: (response) => {
      toast({
        variant: 'default',
        title: 'Tạo giao dịch thành công',
        description: 'Bạn sẽ được chuyển hướng đến trang thanh toán PayOS.',
      });
      return response;
    },
    onError: () => {
      toast({
        variant : 'destructive',
        title: ' Thanh toán thất bại'
      })
    },
  });
};
