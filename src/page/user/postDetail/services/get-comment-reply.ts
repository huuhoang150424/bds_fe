import { handleApi } from "@/service";
import { Comment } from "./get-comment-by-post";

export const getCommentReply = async (parentId: string): Promise<Comment[]> => {
  try {
    const response = await handleApi(`/comment/${parentId}/replies`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching comment replies:", error);
    throw error;
  }
}