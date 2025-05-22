import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../service/get-all-news";
export const useGetAllNewsAdmin = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['newsAdmin',page,pageSize],
    queryFn:()=> getAllNews(page,pageSize),
  });
}
