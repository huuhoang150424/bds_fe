import { handleApi } from '@/service';

export const getProfile = async (userId:string) => {
  try {
    const response = await handleApi(`/user/${userId}/getUser`, null, 'GET', {
      type: 'profile'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
