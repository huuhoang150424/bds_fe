import { handleApi } from '@/service';

export const getPostHabit = async () => {
  try {
    const url = `/post/getPostHabit`;
    const response = await handleApi(url, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};
