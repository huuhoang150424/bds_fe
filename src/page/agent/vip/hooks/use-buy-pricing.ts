import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { buyPricing } from '../service/buy-pricing';
import { updateBalance } from '@/redux/authReducer';

export function useBuyPricing() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['purchasedPackages'],
    mutationFn: (pricingId: string) => buyPricing(pricingId),
    onSuccess: (response) => {
      console.log('Buy Pricing Response:', response);
      if (response.data.success) {
        const price = response.data.pricing.price;
        const totalPrice = price;
        dispatch(updateBalance({ balance: -totalPrice }));
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'purchasedPackages',
        });
        queryClient.refetchQueries({
          predicate: (query) => query.queryKey[0] === 'purchasedPackages',
        });
        console.log('Invalidated and refetched purchasedPackages queries');
      } else {
        console.log('Purchase failed:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('Error buying pricing package:', error.message || error);
    },
  });
}