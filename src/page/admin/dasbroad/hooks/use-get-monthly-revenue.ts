import { useQuery } from "@tanstack/react-query";
import { getMonthlyRevenue } from "../service/get-monthly-revenue";

export const useGetMonthlyRevenue = (year: number) => {
  return useQuery({
    queryKey: ["monthlyRevenue", year],
    queryFn: () => getMonthlyRevenue(year),
  });
};