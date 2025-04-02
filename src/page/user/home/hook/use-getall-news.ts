import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllNews } from "@/page/user/news/service/get-allnews";

export const useGetAllNews = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam = "" }) => getAllNews(limit, pageParam),
    getNextPageParam: (lastPage) => {
      console.log("hasNextPage từ API:", lastPage.meta?.hasNextPage, "  ahihi ", lastPage?.meta?.nextCreatedAt);
      if (!lastPage?.meta?.hasNextPage) return null;
      return lastPage?.meta?.nextCreatedAt || ""; 
    },
    initialPageParam: "", 
  });
};