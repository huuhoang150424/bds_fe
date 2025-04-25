import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllNews } from "../service/get-all-new";


export const useGetAllNews = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["news", limit],
    queryFn: ({ pageParam = "" }) => getAllNews(limit, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.hasNextPage) return undefined;
      return lastPage?.meta?.nextCreatedAt || "";
    },
    initialPageParam: "",
  });
};