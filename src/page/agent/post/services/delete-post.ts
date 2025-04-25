import { handleApi } from "@/service";

export const deleteMyPost = async (postId:string) => {
  try {
    const response = await handleApi(`/post/${postId}/deletePost`, null, 'DELETE');
    return response.data.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
}