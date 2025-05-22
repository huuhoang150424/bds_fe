import { handleApi } from "@/service";

export const bulkAiApprovePosts = async () => {
  try {
    const response = await handleApi('/post/bulkAiApprovePosts', null, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};