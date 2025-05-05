import { handleApi } from '@/service';

export const updatePhone = async (data: { userId: string; phone: string }) => {
  try {
    const response = await handleApi('/user/updatePhone', data, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};