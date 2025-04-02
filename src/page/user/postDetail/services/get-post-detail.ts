import { handleApi } from "@/service";


export const getPostDetail = async (slug: string) => {
    try {
        console.log("slug:", slug);
        const url = `/post/${slug}/getPost`;
        const response = await handleApi(url, undefined, "GET");
        console.log("API response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching post detail:", error);
        throw error;
    }
}