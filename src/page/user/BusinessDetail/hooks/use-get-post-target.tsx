import { useQuery } from "@tanstack/react-query";
import { getPostTarget } from "../service/get-post-target";

export const usePostTarget = (userId:string ) => {
  return useQuery({
    queryKey: ['postTarget'],
    queryFn: () => getPostTarget(userId)
    
  });
}