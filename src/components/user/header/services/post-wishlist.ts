import { handleApi } from "@/service";

export const postWishlist = async (data : { postId : string}) => {
    try {
        const url = `/wishlist/addWishlist`;
        const response = await handleApi(url, data, "POST");
        return response.data.data;
    } catch (error) {
        console.error("Error posting wishlist:", error);
        throw error; 
    }
}