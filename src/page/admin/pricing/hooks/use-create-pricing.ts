import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPricing } from '../service/create-pricing';
import { PricingFormData } from '../schema/create-pricing';

export const useCreatePricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PricingFormData) => createPricing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPricing'] });
    },
  });
};