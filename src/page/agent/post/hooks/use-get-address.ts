import { useQuery } from "@tanstack/react-query";
import { getProvinces, getDistricts, getWards } from "../services/address";

export const useAddress = () => {
  const provinceQuery = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces
  });

  const useDistrictQuery = (provinceId: string) => {
    return useQuery({
      queryKey: ["districts", provinceId],
      queryFn: () => getDistricts(provinceId),
      enabled: !!provinceId,
    });
  };
  const useWardQuery = (districtId: string) => {
    return useQuery({
      queryKey: ["wards", districtId],
      queryFn: () => getWards(districtId),
    });
  };

  return {
    provinceQuery,
    useDistrictQuery,
    useWardQuery,
  };
};