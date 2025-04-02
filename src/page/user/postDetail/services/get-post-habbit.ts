import { handleApi } from "@/service";

export const getPostHabit = async (token: string) => { // Thêm token làm tham số
    try {
        const url = `/post/getPostHabit`;
        const response = await handleApi(url, null, "GET", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching post detail:", error);
        throw error;
    }
};