import { useQuery } from "@tanstack/react-query";
import { getAllPricings } from "../service/get-all-pricing";

export const useGetPricings = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["allPricing", page, limit],
    queryFn: () => getAllPricings(page, limit),
  });
};