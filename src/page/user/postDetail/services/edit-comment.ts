import { handleApi } from '@/service';

export const editComment = async (data: any) => {
  try {
    const url = `/comment/${data.commentId}/updateComment`;
    const response = await handleApi(url, {content:data.content}, 'PUT');
    return response.data;
  } catch (error) {
    throw error;
  }
};
