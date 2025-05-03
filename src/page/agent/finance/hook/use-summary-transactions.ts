import { useQuery } from '@tanstack/react-query';
import { getFinancialSummary } from '../service/get-summary-transactions';

export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ['financialSummary'],
    queryFn: getFinancialSummary
  });
};