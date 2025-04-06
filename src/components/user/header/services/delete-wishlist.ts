import { handleApi } from "@/service";

export const deleteWishlist = async (id: string) => {
    try {
        const url = `/wishlist/removeFromWishlist`;
        const response = await handleApi(url, { postId: id }, "DELETE");
        return response.data.data;
    } catch (error) {
        console.error("Error deleting wishlist:", error);
        throw error; 
    }
}