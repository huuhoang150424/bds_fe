import { handleApi } from "@/service";

export const addPost = async (data:any) => {
  try {
    const response = await handleApi("/post/createPost", data, "POST");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};