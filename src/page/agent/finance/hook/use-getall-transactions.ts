import { useQuery } from '@tanstack/react-query';
import { getAllTransactions } from '../service/get-all-transactions';

export const useGetTransactions = ( page: number, limit: number, type: 'income' | 'expense' ) => {
  return useQuery({
    queryKey: ['transactions', page, limit, type],
    queryFn: () => getAllTransactions({ page, limit, type})
  });
};