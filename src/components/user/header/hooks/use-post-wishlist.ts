import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWishlist } from "../services/post-wishlist";

export const usePostWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { postId: string }) => postWishlist(data),
        onSuccess: (newWishlist) => {
            queryClient.invalidateQueries({ queryKey: ['getWishlist'] });
        },
        
        onError: (error) => {
            console.error("Failed to add wishlist:", error);
        },
    });
};
