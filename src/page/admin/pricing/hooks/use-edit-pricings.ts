import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPricing } from '../service/edit-pricing';
import { PricingFormData } from '../schema/create-pricing';

export const useEditPricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, pricingData }: { id: string; pricingData: PricingFormData }) =>
      editPricing(id, pricingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPricing'] });
    },
  });
};