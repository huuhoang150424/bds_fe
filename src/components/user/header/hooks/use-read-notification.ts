import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotification } from '../services/mark-notification';

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { notificationId: string }) => markNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error( error);
    },
  });
};
