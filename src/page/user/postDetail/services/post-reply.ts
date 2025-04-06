import { handleApi } from "@/service";
import { Comment } from "./get-comment-by-post";

interface ReplyData {
  parentId: string;
  content: string;
  postId: string;
}

export const addCommentReply = async (data: ReplyData): Promise<Comment & { postId: string; parentId: string }> => {
  try {
    const url = `/comment/reply`;
    const response = await handleApi(url, {
      parentId: data.parentId,
      content: data.content
    }, "POST");
    
    // Đảm bảo trả về dữ liệu với cấu trúc nhất quán
    const responseData = response.data.data || response.data;
    
    // Đảm bảo trả về thông tin cần thiết cho các invalidateQueries
    return {
      ...responseData,
      postId: data.postId,
      parentId: data.parentId
    };
  } catch (error) {
    console.error("Error adding comment reply:", error);
    throw error;
  }
};