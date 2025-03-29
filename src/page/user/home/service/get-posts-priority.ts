import { handleApi } from '@/service';

export const getPostsPriority = async (page: number, limit: number) => {
  try {
    const response = await handleApi('/post/getPostClient', undefined, 'GET', {
      page,
      limit,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
