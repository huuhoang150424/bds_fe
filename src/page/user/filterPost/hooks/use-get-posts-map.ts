import { useQuery } from "@tanstack/react-query";
import { getPostsByMapBounds } from "../service/get-posts-map";

export const useGetPostsByMapBounds = (
  page: number,
  limit: number,
  address?: string,
  options = {}
) => {
  return useQuery({
    queryKey: ['postsByMapBounds', page, limit, address],
    queryFn: () => getPostsByMapBounds(page, limit, address),
    placeholderData: (previousData) => previousData,
    ...options
  });
};