import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../service/get-all-user";

export const useGetAllUser = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getAllUser(page, limit),
  });
};