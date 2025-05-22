import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "../service/get-reports";

export const useGetReports = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["reports", page, limit],
    queryFn: () => getAllReports(page, limit),
  });
};