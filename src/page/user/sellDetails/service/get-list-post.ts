import { handleApi } from '@/service';

export const getListPost = async (page: number, limit: number) => {
  try {
    const response = await handleApi('/post/getPostClient', null, 'GET', {
      page,
      limit,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
