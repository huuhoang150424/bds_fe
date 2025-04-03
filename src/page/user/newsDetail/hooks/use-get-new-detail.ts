import { useQuery } from "@tanstack/react-query";
import { getNewsDetail } from "../services/get-new-detail";


export const useGetNewsDetail = (slug: string) => {
  return useQuery({
    queryKey: ["newsDetail", slug],
    queryFn: () => getNewsDetail(slug),
    enabled: !!slug,
  });
}