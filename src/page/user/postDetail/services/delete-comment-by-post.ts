import { handleApi } from "@/service";

export const deleteCommentByPost = async (commentId: string): Promise<void> => {
    try {
        const url = `/Comment/${commentId}/deleteComment`; 
        const response = await handleApi(url, null, 'DELETE');
        // Kiểm tra xem response có chứa dữ liệu hay không
        if (response.data && response.data.status === 200) {
            console.log("Comment deleted successfully:", response.data.data);
        }
        return response.data.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
}