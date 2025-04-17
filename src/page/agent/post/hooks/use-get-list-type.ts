import { useQuery } from "@tanstack/react-query";
import { getListType } from "../services/get-listType";

export const useGetListType = () => {
  return useQuery({
    queryKey: ['listType'],
    queryFn: getListType,
  });
}