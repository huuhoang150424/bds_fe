import { handleApi } from '@/service';

export const ratingPost = async (data:any) => {
  try {
    const url = '/rating/createRating';
    const response = await handleApi(url, data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};
