import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllNews } from "@/page/user/news/service/get-allnews";

export const useGetAllNews = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam = "" }) => getAllNews(limit, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.hasNextPage) return null;
      return lastPage?.meta?.nextCreatedAt || ""; 
    },
    initialPageParam: "", 
  });
};