import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../services/get-my-posts";

export const useGetMyPosts = (type:string,page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['myPosts',type,page,pageSize],
    queryFn:()=> getMyPosts(type,page,pageSize),
  });
}