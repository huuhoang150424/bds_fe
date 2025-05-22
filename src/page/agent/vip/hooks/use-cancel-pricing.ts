import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { cancelPricing } from '../service/cancel-pricing';
import { updateBalance } from '@/redux/authReducer';

export const useCancelPricing = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => cancelPricing(),
    onSuccess: (response) => {
      console.log('Cancel Pricing Response:', response);
      if (response.success) {
        dispatch(updateBalance({ balance: response.data.refundAmount }));
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === 'purchasedPackages',
        });
        console.log('Invalidated purchasedPackages queries'); 
      } else {
        console.log('Cancellation failed:', response.message); 
      }
    },
    onError: (error) => {
      console.error('Error canceling pricing package:', error);
    },
  });
};