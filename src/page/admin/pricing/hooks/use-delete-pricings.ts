import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePricing } from '../service/delete-pricing';

export const useDeletePricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePricing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPricing'] });
    },
  });
};