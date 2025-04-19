import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "../services/get-all-post";

export const useGetAllPost = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => getAllPost(page, limit),
  });
};