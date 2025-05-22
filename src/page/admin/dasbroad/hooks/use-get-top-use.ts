import { useQuery } from "@tanstack/react-query";
import { getTopUser } from "../service/get-top-user";

export const useGetTopUser = () => {
  return useQuery({
    queryKey: ["topUser"],
    queryFn: getTopUser,
  });
};