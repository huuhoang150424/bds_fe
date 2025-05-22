import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../service/get-summary";

export const useGetSummary = () => {
  return useQuery({
    queryKey: ["summaryReports"],
    queryFn: getSummary,
  });
};