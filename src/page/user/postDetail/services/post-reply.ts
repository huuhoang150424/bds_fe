import { handleApi } from "@/service";
import { Comment } from "./get-comment-by-post";



export const addCommentReply = async (data: any) => {
  try {
    const response = await handleApi(`/comment/reply`, data, "POST");
    return response.data;
  } catch (error) {
    console.error("Error adding comment reply:", error);
    throw error;
  }
};