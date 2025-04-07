import { handleApi } from '@/service';

export const deleteCommentByPost = async (commentId: string): Promise<void> => {
  try {
    const url = `/Comment/${commentId}/deleteComment`;
    const response = await handleApi(url, null, 'DELETE');
    if (response.data && response.data.status === 200) {
    }
    return response.data.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
