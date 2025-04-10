import { useQuery } from "@tanstack/react-query";
import { getSatisticalByViewAddress } from "../services/get-satistical-by-view-address";

export const useGetSatisticalByViewAddress = () => {
  return useQuery({
    queryKey: ["statisticalByGrowth"],
    queryFn: getSatisticalByViewAddress,
  });
};