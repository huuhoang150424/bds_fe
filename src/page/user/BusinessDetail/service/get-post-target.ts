import { handleApi } from '@/service';

export const getPostTarget = async (userId:string) => {
  try {
    const response = await handleApi(`/post/${userId}/getPostTarget`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};
