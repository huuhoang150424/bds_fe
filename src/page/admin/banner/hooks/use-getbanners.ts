import { useQuery } from "@tanstack/react-query";
import { getAllBanner } from "../service/get-banners";

export const useGetAllBanners = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["banners", page, limit],
    queryFn: () => getAllBanner(page, limit),
  });
};