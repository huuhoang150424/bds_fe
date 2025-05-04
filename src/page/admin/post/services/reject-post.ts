import { handleApi } from '@/service';

export const rejectPosts = async (postIds: string[], reason: string) => {
  try {
    const response = await handleApi('/post/bulkRejectPost', { postIds, reason }, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};