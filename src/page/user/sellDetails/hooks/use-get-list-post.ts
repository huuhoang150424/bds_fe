import { getListPost } from "../service/get-list-post";
import { useQuery } from "@tanstack/react-query";

export const useGetListPosts = (limit: number, page: number) => {
  return useQuery({
    queryKey: ['listPosts', page, limit],
    queryFn: () => getListPost(page, limit)
  });
}