import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../services/get-wishlist";

export const useGetWishlist = () => {
    return useQuery({
        queryKey: ["getWishlist"],
        queryFn: getWishlist,       
    });
}