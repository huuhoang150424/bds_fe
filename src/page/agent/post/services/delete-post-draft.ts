import { handleApi } from '@/service';

export const deletePostDraft = async (postDraftId: string) => {
  try {
    const response = await handleApi(`/post/${postDraftId}/deletePostDraft`, null, 'DELETE');
    return response.data.data;
  } catch (error) {
    console.error('Error deleting post draft:', error);
    throw error;
  }
};