import { handleApi } from "@/service";

export const approvePosts = async (postIds: string[]) => {
  try {
    const response = await handleApi('/post/bulkApprovePost', { postIds }, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};