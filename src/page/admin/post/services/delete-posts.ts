import { handleApi } from '@/service';

export const deletePosts = async (postIds: string[], reason: string) => {
  try {
    const response = await handleApi('/post/delete', { postIds, reason }, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};