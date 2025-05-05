import { useQuery } from "@tanstack/react-query";
import { getAllNotification } from "../service/get-notification";


export const useGetNotification = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["allNotifications", page, limit],
    queryFn: () => getAllNotification(page, limit),
  });
};