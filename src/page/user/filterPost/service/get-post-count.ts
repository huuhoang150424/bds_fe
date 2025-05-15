import { handleApi } from '@/service';

export const getPostCountByLocation = async (province?: string) => {
  try {
    const response = await handleApi('/post/postCountByLocation', null, 'GET', {
      province,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};