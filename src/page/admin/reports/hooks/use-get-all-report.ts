import { useQuery } from "@tanstack/react-query";
import { getAllReport } from "../services/get-all-report";

export const useGetAllReport = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["reports", page, limit],
    queryFn: () => getAllReport(page, limit),
  });
};