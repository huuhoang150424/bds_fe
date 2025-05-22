import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../service/get-profile";

export const useProfileUsers = (userId: string) => {
  return useQuery({
    queryKey: ['profileUser', userId], 
    queryFn: () => getProfile(userId),
    enabled: !!userId
  });
};