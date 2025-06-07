import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { cancelPricing } from '../service/cancel-pricing';
import { selectUser, updateBalance } from '@/redux/authReducer';

export const useCancelPricing = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user=useSelector(selectUser);
  return useMutation({
    mutationFn: (packageId: string) => cancelPricing(packageId),
    onSuccess: (response) => {
      console.log('Cancel Pricing Response:', response);
      dispatch(updateBalance({ balance: ( response.data.refundAmount) }));
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'purchasedPackages',
      });
    },
    onError: (error: any) => {
      console.error('Error canceling pricing package:', error.message || error);
    },
  });
};