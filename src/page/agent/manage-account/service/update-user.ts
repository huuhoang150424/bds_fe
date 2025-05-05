import { handleApi } from '@/service';

export const updateUser = async (userId: string, data: FormData) => {
  try {
    const response = await handleApi(`/user/${userId}/updateUser`, data, 'PUT');
    return response.data;
  } catch (error) {
    throw error;
  }
};