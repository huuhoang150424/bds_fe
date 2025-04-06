import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { sendMessages } from '../service/send-message';

export const useSendMessage = () => {
  // const queryClient=useQueryClient();
  return useMutation({
    mutationFn: sendMessages,
    onSuccess: (data) => {

    },
  
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: 'Lỗi',
      })
  });
};
