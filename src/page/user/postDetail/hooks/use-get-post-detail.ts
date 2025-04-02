import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "../services/get-post-detail";

export const useGetPostDetail = (slug : string) => {
  return useQuery({
    queryKey: ["postDetail", slug],
    queryFn: () => getPostDetail(slug),
    enabled: !!slug,
  });
};