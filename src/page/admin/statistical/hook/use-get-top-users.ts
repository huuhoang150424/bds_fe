import { useQuery } from "@tanstack/react-query";
import { getTopUsersByPost } from "../service/get-top-users";

export const useGetTopUsersByPost = () => {
  return useQuery({
    queryKey: ["topUsers"],
    queryFn: getTopUsersByPost,
  });
};