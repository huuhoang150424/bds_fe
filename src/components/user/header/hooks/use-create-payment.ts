import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayment } from '../services/create-payment';
import { toast } from '@/hooks/use-toast';

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      
    },
    onError: (error) => {
      toast({
        variant : 'destructive',
        title: ' Thanh toán thất bại'
      })
    },
  });
};
