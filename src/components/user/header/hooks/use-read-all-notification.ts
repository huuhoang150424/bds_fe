import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAllNotification } from '../services/mark-all-notification';

export const useReadAllNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error( error);
    },
  });
};
