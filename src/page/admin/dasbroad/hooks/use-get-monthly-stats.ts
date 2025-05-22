import { useQuery } from "@tanstack/react-query";
import { getMonthlyStats } from "../service/get-monthly-stats";

export const useGetMonthlyStats = () => {
  return useQuery({
    queryKey: ['monthlyStats'],
    queryFn: getMonthlyStats,
  });
};