import { handleApi } from '@/service';

export const publishPostDraft = async (postDraftId: string) => {
  try {
    const response = await handleApi(`/post/${postDraftId}/publicPostDraft`, null, 'POST');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
