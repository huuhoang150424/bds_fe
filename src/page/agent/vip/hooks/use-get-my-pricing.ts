import { useQuery } from '@tanstack/react-query';
import { getPurchasedPackages } from '../service/get-my-pricing';

export const useGetPurchasedPackages = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['purchasedPackages', page, limit],
    queryFn: () => getPurchasedPackages(page, limit),
  });
};