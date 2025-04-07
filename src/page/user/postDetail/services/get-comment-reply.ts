import { handleApi } from "@/service";

export const getCommentReply = async (parentId: string) => {
  try {
    const response = await handleApi(`/comment/${parentId}/replies`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching comment replies:", error);
    throw error;
  }
}